import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import { NATGATEWAYInstanceAliasList } from './query_def';
import { GetServiceAPIInfo, GetRequestParams, ReplaceVariable, GetDimensions, ParseQueryResult, VARIABLE_ALIAS, SliceLength } from '../../common/constants';

export default class NATGATEWAYDatasource implements DatasourceInterface {
  Namespace = 'QCE/NAT_GATEWAY';
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  secretKey: string;
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
    this.secretKey = (instanceSettings.jsonData || {}).secretKey || '';
  }

  metricFindQuery(query: object) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // 查询 NAT_GATEWAY 实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region).then(result => {
        const instanceAlias = NATGATEWAYInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'NatGatewayId';
        const instances: any[] = [];
        _.forEach(result, (item) => {
          const instanceAliasValue = _.get(item, instanceAlias);
          if (instanceAliasValue) {
            if (typeof instanceAliasValue === 'string') {
              item._InstanceAliasValue = instanceAliasValue;
              instances.push({ text: instanceAliasValue, value: JSON.stringify(item) });
            } else if (_.isArray(instanceAliasValue)) {
              _.forEach(instanceAliasValue, (subItem) => {
                item._InstanceAliasValue = subItem;
                instances.push({ text: subItem, value: JSON.stringify(item) });
              });
            }
          }
        });
        return instances;
      });
    }
    return [];
  }

  query(options: any) {
    const queries = _.filter(options.targets, item => {
      // 过滤无效的查询 target
      return (
        item.natGateway.hide !== true &&
        !!item.namespace &&
        !!item.natGateway.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.natGateway.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.natGateway.instance, true))
      );
    }).map(target => {
      // 实例 instances 可能为模板变量，需先获取实际值
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target.natGateway.instance, true);
      if (_.isArray(instances)) {
        instances = _.map(instances, instance => _.isString(instance) ? JSON.parse(instance) : instance);
      } else {
        instances = [_.isString(instances) ? JSON.parse(instances) : instances];
      }
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.natGateway.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.natGateway.period || 300,
        Instances: _.map(instances, instance => {
          const dimensionObject = target.natGateway.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            //  TODO 兼容接口问题
            if (key === 'natId') {
              dimensionObject[key] = { Name: key, Value: instance['NatGatewayId'] };
            } else {
              dimensionObject[key] = { Name: key, Value: instance[key] };
            }
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.natGateway.metricName,
      };
      return this.getMonitorData(data, region, instances);
    });

    if (queries.length === 0) {
      return [];
    }

    return Promise.all(queries)
      .then(responses => {
        return _.flatten(responses);
      })
      .catch(error => {
        return [];
      });
  }

  // 获取某个变量的实际值，this.templateSrv.replace() 函数返回实际值的字符串
  getVariable(metric: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  /**
   * 获取 NAT_GATEWAY 的监控数据
   *
   * @param params 获取监控数据的请求参数
   * @param region 地域信息
   * @param instances 实例列表，用于对返回结果的匹配解析
   */
  getMonitorData(params, region, instances) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { action: 'GetMonitorData', region })
      .then(response => {
        // TODO 兼容接口问题
        instances = _.map(instances, instance => {
          const value = _.omit(instance, 'NatGatewayId');
          value.natId = instance['NatGatewayId'];
          return value;
        });
        return ParseQueryResult(response, instances);
      });
  }

  getRegions() {
    return this.doRequest({
      url: this.url + '/cvm',
    }, 'cvm', { action: 'DescribeRegions' })
      .then(response => {
        return _.filter(
          _.map(response.RegionSet || [], item => {
            return { text: item.RegionName, value: item.Region, RegionState: item.RegionState };
          }),
          item => item.RegionState === 'AVAILABLE'
        );
      });
  }

  getMetrics(region = 'ap-guangzhou') {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: {
        Namespace: this.Namespace,
      },
    }, serviceInfo.service, { region, action: 'DescribeBaseMetrics' })
      .then(response => {
        return _.filter(response.MetricSet || [], item => !(item.Namespace !== this.Namespace || !item.MetricName));
      });
  }

  getInstances(region = 'ap-guangzhou', params: any = {}) {
    params = Object.assign({ Offset: 0, Limit: 100 }, params);
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeNatGateways' })
      .then(response => {
        return response.NatGatewaySet || [];
      });
  }

  /**
   * 模板变量中获取全量的 NatGateway 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region) {
    let result: any[] = [];
    const params: any = { Offset: 0, Limit: 100 };
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeNatGateways' })
      .then(response => {
        result = response.NatGatewaySet || [];
        const total = response.TotalCount || 0;
        if (result.length >= total) {
          return result;
        } else {
          const param = SliceLength(total, 100);
          const promises: any[] = [];
          _.forEach(param, item => {
            promises.push(this.getInstances(region, item));
          });
          return Promise.all(promises).then(responses => {
            _.forEach(responses, item => {
              result = _.concat(result, item);
            });
            return result;
          }).catch(error => {
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
    if (!this.isValidConfigField(this.secretId) || !this.isValidConfigField(this.secretKey)) {
      return {
        service: 'natGateway',
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
      this.doRequest(
        {
          url: this.url + '/vpc',
          data: {
            Limit: 1,
            Offset: 0,
          },
        },
        'vpc',
        { region: 'ap-guangzhou', action: 'DescribeNatGateways' }
      ),
    ]).then(responses => {
      const cvmErr = _.get(responses, '[0].Error', {});
      const monitorErr = _.get(responses, '[1].Error', {});
      const natGatewayErr = _.get(responses, '[2].Error', {});
      const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const natGatewayAuthFail = _.get(natGatewayErr, 'Code', '').indexOf('AuthFailure') !== -1;
      if (cvmAuthFail || monitorAuthFail || natGatewayAuthFail) {
        const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (natGatewayAuthFail) {
            messages.push(`${_.get(natGatewayAuthFail, 'code')}: ${_.get(natGatewayAuthFail, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'natGateway',
            status: 'error',
            message,
          };
      } else {
        return {
          namespace: this.Namespace,
          service: 'natGateway',
          status: 'success',
          message: 'Successfully queried the NAT_GATEWAY service.',
          title: 'Success',
        };
      }
    }).catch(error => {
      let message = 'NAT_GATEWAY service:';
      message += error.statusText ? error.statusText + '; ' : '';
      if (!!_.get(error, 'data.error.code', '')) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else if (!!_.get(error, 'data.error', '')) {
        message += error.data.error;
      } else if (!!_.get(error, 'data', '')) {
        message += error.data;
      } else {
        message += 'Cannot connect to NAT_GATEWAY service.';
      }
      return {
        service: 'natGateway',
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
  doRequest(options, service, signObj: any = {}): any {
    options = GetRequestParams(options, service, signObj, this.secretId, this.secretKey);
    return this.backendSrv
      .datasourceRequest(options)
      .then(response => {
        return _.get(response, 'data.Response', {});
      })
      .catch(error => {
        throw error;
      });
  }

}
