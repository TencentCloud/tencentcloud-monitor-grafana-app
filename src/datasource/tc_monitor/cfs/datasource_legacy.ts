import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../../datasource';
import { CFSInstanceAliasList, CFSInvalidDemensions } from './query_def';
import {
  GetRequestParams,
  GetServiceAPIInfo,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  VARIABLE_ALIAS,
  SliceLength,
} from '../../common/constants';

export default class CFSDatasource implements DatasourceInterface {
  Namespace = 'QCE/CFS';
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
  }

  /**
   * 获取模板变量的选择项列表，当前支持两种变量：地域、CFS实例
   *
   * @param query 模板变量配置填写的 Query 参数字符串
   */
  metricFindQuery(query: { action: string; namespace: string; region?: string }, regex?: string) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }
    // 查询 CFS实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      // const tagText = _.get(query, 'tag', '');
      // const Filters = ParseMetricRegex(!tagText ? '' : `tag:tag-key=${tagText}`);
      return this.getVariableInstances(region).then((result) => {
        const instanceAlias =
          CFSInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'FileSystemId';
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
    return Promise.resolve([]);
  }

  /**
   * 根据 Panel 的配置项，获取相应的监控数据
   *
   * @param options Panel 的配置参数
   * @return 返回数据数组，示例如下
   * [
   *   {
   *     "target": "AccOuttraffic - ins-123",
   *     "datapoints": [
   *       [861, 1450754160000],
   *       [767, 1450754220000]
   *     ]
   *   }
   * ]
   */
  query(options: any) {
    const queries = _.filter(options.targets, (item) => {
      // 过滤无效的查询 target
      return (
        item.cfs.hide !== true &&
        !!item.namespace &&
        !!item.cfs.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.cfs.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.cfs.instance, true))
      );
    }).map((target) => {
      // 实例 instances 可能为模板变量，需先获取实际值
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target.cfs.instance, true);

      if (_.isArray(instances)) {
        instances = _.map(instances, (instance) => (_.isString(instance) ? JSON.parse(instance) : instance));
      } else {
        instances = [_.isString(instances) ? JSON.parse(instances) : instances];
      }
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.cfs.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.cfs.period || 300,
        Instances: _.map(instances, (instance) => {
          const dimensionObject = target.cfs.dimensionObject;

          _.forEach(dimensionObject, (__, key) => {
            let keyTmp = key;
            if (_.has(CFSInvalidDemensions, key)) {
              keyTmp = CFSInvalidDemensions[key];
            }
            dimensionObject[key] = { Name: key, Value: instance[keyTmp] };

            // 设置instance
            instance[key] = instance[keyTmp];
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.cfs.metricName,
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
  getVariable(metric?: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  /**
   * 获取 CVM 的监控数据
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
      return _.filter(
        _.filter(response.MetricSet || [], (item) => !(item.Namespace !== this.Namespace || !item.MetricName))
      );
    });
  }

  getInstances(region, params = {}) {
    params = { Offset: 0, Limit: 100, ...params };
    const serviceInfo = GetServiceAPIInfo(region, 'cfs');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeCfsFileSystems' }
    ).then((response) => {
      return response.FileSystems || [];
    });
  }

  getVariableInstances(region, query = {}) {
    let result: any[] = [];
    const params = { ...query, ...{ Offset: 0, Limit: 100 } };
    const serviceInfo = GetServiceAPIInfo(region, 'cfs');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeCfsFileSystems' }
    ).then((response) => {
      result = response.FileSystems || [];
      const total = response.TotalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getInstances(region, { ...item, ...query }));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            // console.log('result:', result);
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  getZones(region) {
    const serviceInfo = GetServiceAPIInfo(region, 'cvm');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
      },
      serviceInfo.service,
      { region, action: 'DescribeZones' }
    ).then((response) => {
      return _.filter(
        _.map(response.ZoneSet || [], (item) => {
          return { text: item.ZoneName, value: item.Zone, ZoneState: item.ZoneState, Zone: item.Zone };
        }),
        (item) => item.ZoneState === 'AVAILABLE'
      );
    });
  }

  // 检查某变量字段是否有值
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  testDatasource() {
    if (!this.isValidConfigField(this.secretId)) {
      return {
        service: 'cfs',
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
          url: this.url + '/cfs',
          data: {
            Offset: 0,
            Limit: 1,
          },
        },
        'cfs',
        { region: 'ap-guangzhou', action: 'DescribeCfsFileSystems' }
      ),
    ])
      .then((responses) => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const cfsErr = _.get(responses, '[2].Error', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const cfsAuthFail = _.get(cfsErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail || cfsAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (cfsAuthFail) {
            messages.push(`${_.get(cfsErr, 'Code')}: ${_.get(cfsErr, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'cfs',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'cfs',
            status: 'success',
            message: 'Successfully queried the CFS service.',
            title: 'Success',
          };
        }
      })
      .catch((error) => {
        let message = 'CFS service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to CFS service.';
        }
        return {
          service: 'CFS',
          status: 'error',
          message: message,
        };
      });
  }

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
}
