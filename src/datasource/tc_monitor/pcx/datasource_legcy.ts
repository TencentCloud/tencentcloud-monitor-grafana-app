import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../../datasource';
import { PCXInstanceAliasList, templateQueryIdMap } from './query_def';
import {
  GetServiceAPIInfo,
  GetRequestParamsV2,
  GetRequestParams,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  VARIABLE_ALIAS,
  SliceLength,
  isVariable,
} from '../../common/constants';

export default class PCXDatasource implements DatasourceInterface {
  Namespace = 'QCE/PCX';
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;

  allInstanceMap: any[] = [];
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
  }

  metricFindQuery(query: Record<string, any>) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // 查询 PCX 实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region, query['payload'] || {}).then((result) => {
        this.allInstanceMap = _.cloneDeep(result); // 混存全量实例map
        const instanceAlias =
          PCXInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'peeringConnectionId';
        const instances: any[] = [];
        _.forEach(result, (item) => {
          const instanceAliasValue = _.get(item, instanceAlias);
          if (instanceAliasValue) {
            if (typeof instanceAliasValue === 'string') {
              item._InstanceAliasValue = instanceAliasValue;
              instances.push({ text: instanceAliasValue, value: item[templateQueryIdMap.instance] });
            } else if (_.isArray(instanceAliasValue)) {
              _.forEach(instanceAliasValue, (subItem) => {
                item._InstanceAliasValue = subItem;
                instances.push({ text: subItem, value: item[templateQueryIdMap.instance] });
              });
            }
          }
        });
        return instances;
      });
    }
    return Promise.resolve([]);
  }

  query(options: any) {
    const queries = _.filter(options.targets, (item) => {
      // 过滤无效的查询 target
      return (
        item.pcx.hide !== true &&
        !!item.namespace &&
        !!item.pcx.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.pcx.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.pcx.instance, true))
      );
    }).map((target) => {
      // 实例 instances 可能为模板变量，需先判断
      let instances = target.pcx.instance;
      if (isVariable(instances)) {
        let templateInsValues = ReplaceVariable(this.templateSrv, options.scopedVars, instances, true);
        if (!_.isArray(templateInsValues)) {
          templateInsValues = [templateInsValues];
        }
        instances = _.map(templateInsValues, (instanceId) =>
          _.find(this.allInstanceMap, (o) => o[templateQueryIdMap.instance] === instanceId)
        );
      } else {
        if (_.isArray(instances)) {
          instances = _.map(instances, (instance) => (_.isString(instance) ? JSON.parse(instance) : instance));
        } else {
          instances = [_.isString(instances) ? JSON.parse(instances) : instances];
        }
      }
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.pcx.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.pcx.period || 300,
        Instances: _.map(instances, (instance) => {
          const dimensionObject = target.pcx.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.pcx.metricName,
      };
      return this.getMonitorData(data, region, instances);
    });

    if (queries.length === 0) {
      return [];
    }

    return Promise.all(queries)
      .then((responses) => {
        return _.flatten(responses);
      })
      .catch((error) => {
        return [];
      });
  }

  // 获取某个变量的实际值，this.templateSrv.replace() 函数返回实际值的字符串
  getVariable(metric: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  /**
   * 获取 PCX 的监控数据
   *
   * @param params 获取监控数据的请求参数
   * @param region 地域信息
   * @param instances 实例列表，用于对返回结果的匹配解析
   */
  getMonitorData(params, region, instances) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { action: 'GetMonitorData', region }
    ).then((response) => {
      return ParseQueryResult(response, instances);
    });
  }

  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/cvm',
      },
      'cvm',
      { action: 'DescribeRegions' }
    ).then((response) => {
      return _.filter(
        _.map(response.RegionSet || [], (item) => {
          return { text: item.RegionName, value: item.Region, RegionState: item.RegionState };
        }),
        (item) => item.RegionState === 'AVAILABLE'
      );
    });
  }

  getMetrics(region = 'ap-guangzhou') {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Namespace: this.Namespace,
        },
      },
      serviceInfo.service,
      { region, action: 'DescribeBaseMetrics' }
    ).then((response) => {
      return _.filter(response.MetricSet || [], (item) => !(item.Namespace !== this.Namespace || !item.MetricName));
    });
  }

  getInstances(region = 'ap-guangzhou', params = {}) {
    params = { offset: 0, limit: 50, ...params };
    const serviceInfo = GetServiceAPIInfo(region, 'pcx');
    return this.doRequestV2(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcPeeringConnections' }
    ).then((response) => {
      return response.data || [];
    });
  }

  /**
   * 模板变量中获取全量的 PCX 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region, query) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 50, ...query };
    const serviceInfo = GetServiceAPIInfo(region, 'pcx');
    return this.doRequestV2(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcPeeringConnections' }
    ).then((response) => {
      result = response.data || [];
      const total = response.totalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 50);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getInstances(region, item));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  getVpcId(region, params: any = {}) {
    params = { Offset: 0, Limit: 20, ...params };
    // TODO 等待腾讯云接口查问题
    params.Offset = String(params.Offset);
    params.Limit = String(params.Limit);
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcs' }
    ).then((response) => {
      return _.map(response.VpcSet || [], (item) => ({ text: item.VpcId, value: item.VpcId }));
    });
  }

  getVpcIds(region) {
    let result: any[] = [];
    const params: any = { Offset: 0, Limit: 100 };
    // TODO 等待腾讯云接口查问题
    params.Offset = String(params.Offset);
    params.Limit = String(params.Limit);
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcs' }
    ).then((response) => {
      result = _.map(response.VpcSet || [], (item) => ({ text: item.VpcId, value: item.VpcId }));
      const total = response.TotalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getVpcId(region, item));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  // 检查某变量字段是否有值
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  testDatasource() {
    if (!this.isValidConfigField(this.secretId)) {
      return {
        service: 'pcx',
        status: 'error',
        message: 'The SecretId/SecretKey field is required.',
      };
    }

    return Promise.all([
      this.doRequest(
        {
          url: this.url + '/cvm',
        },
        'cvm',
        { action: 'DescribeRegions' }
      ),
      this.doRequest(
        {
          url: this.url + '/monitor',
          data: {
            Namespace: this.Namespace,
          },
        },
        'monitor',
        { region: 'ap-guangzhou', action: 'DescribeBaseMetrics' }
      ),
      this.doRequestV2(
        {
          url: this.url + '/pcx',
          data: {
            limit: 1,
            offset: 0,
          },
        },
        'pcx',
        { region: 'ap-guangzhou', action: 'DescribeVpcPeeringConnections' }
      ),
      this.doRequest(
        {
          url: this.url + '/vpc',
          data: {
            Limit: 1,
            Offset: 0,
          },
        },
        'vpc',
        { region: 'ap-guangzhou', action: 'DescribeVpcs' }
      ),
    ])
      .then((responses) => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const pcxErr = _.get(responses, '[2]', {});
        const vpcErr = _.get(responses, '[3]', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const pcxAuthFail = _.startsWith(_.toString(_.get(pcxErr, 'code')), '4');
        const vpcAuthFail = _.get(vpcErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail || pcxAuthFail || vpcAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (pcxAuthFail) {
            messages.push(`${_.get(pcxErr, 'code')}: ${_.get(pcxErr, 'codeDesc')}`);
          }
          if (vpcAuthFail) {
            messages.push(`${_.get(vpcErr, 'Code')}: ${_.get(vpcErr, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'pcx',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'pcx',
            status: 'success',
            message: 'Successfully queried the PCX service.',
            title: 'Success',
          };
        }
      })
      .catch((error) => {
        let message = 'PCX service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to PCX service.';
        }
        return {
          service: 'pcx',
          status: 'error',
          message: message,
        };
      });
  }

  /**
   * 腾讯云 API 3.0 请求接口
   * @param options
   * @param service
   * @param signObj
   */
  async doRequest(options, service, signObj: any = {}) {
    options = await GetRequestParams(
      options,
      service,
      signObj,
      this.secretId,
      this.instanceSettings.id,
      this.backendSrv
    );
    return this.backendSrv
      .datasourceRequest(options)
      .then((response) => {
        return _.get(response, 'data.Response', {});
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * 腾讯云 API 2.0 请求接口
   * @param options
   * @param service
   * @param signObj
   */
  async doRequestV2(options, service, signObj: any = {}) {
    options = await GetRequestParamsV2(
      options,
      service,
      signObj,
      this.secretId,
      this.instanceSettings.id,
      this.backendSrv
    );
    return this.backendSrv
      .datasourceRequest(options)
      .then((response) => {
        return _.get(response, 'data', {});
      })
      .catch((error) => {
        throw error;
      });
  }
}
