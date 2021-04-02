import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../../datasource';
import { REDISMEMInstanceAliasList, RedisMemInvalidDemensions, isValidMetric, templateQueryIdMap } from './query_def';
import {
  GetRequestParams,
  GetServiceAPIInfo,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  VARIABLE_ALIAS,
  SliceLength,
  isVariable,
} from '../../common/constants';

export default class REDISMEMDatasource implements DatasourceInterface {
  Namespace = 'QCE/REDIS_MEM';
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

  /**
   * 获取模板变量的选择项列表，当前支持两种变量：地域、MongoDB 实例
   *
   * @param query 模板变量配置填写的 Query 参数字符串
   */
  metricFindQuery(query: Record<string, any>) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // 查询 Redis 实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region).then((result) => {
        this.allInstanceMap = _.cloneDeep(result); // 混存全量实例map
        const instanceAlias =
          REDISMEMInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'InstanceId';
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
        item.redisMem.hide !== true &&
        !!item.namespace &&
        !!item.redisMem.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.redisMem.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.redisMem.instance, true))
      );
    }).map((target) => {
      // 实例 instances 可能为模板变量，需先判断
      let instances = target.redisMem.instance;
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
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.redisMem.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.redisMem.period || 300,
        Instances: _.map(instances, (instance) => {
          const dimensionObject = target.redisMem.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            if (_.has(RedisMemInvalidDemensions, key)) {
              const keyTmp = RedisMemInvalidDemensions[key];
              instance[key] = instance[keyTmp];
            }
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.redisMem.metricName,
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
   * 获取 Redis 的监控数据
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
        response.MetricSet || [],
        (item) => !(item.Namespace !== this.Namespace || !item.MetricName) && isValidMetric(item)
      );
    });
  }

  getInstances(region, params = {}) {
    params = { Offset: 0, Limit: 100, ...params };
    const serviceInfo = GetServiceAPIInfo(region, 'redis');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeInstances' }
    ).then((response) => {
      return response.InstanceSet || [];
    });
  }

  getVariableInstances(region) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 100 };
    const serviceInfo = GetServiceAPIInfo(region, 'redis');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeInstances' }
    ).then((response) => {
      result = response.InstanceSet || [];
      const total = response.TotalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
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

  // 检查某变量字段是否有值
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  // 验证 SerectId、SerectKey 的有效性，并测试 mongodb、monitor 两种 API 的连通性
  testDatasource() {
    if (!this.isValidConfigField(this.secretId)) {
      return {
        service: 'redisMem',
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
          url: this.url + '/redis',
          data: {
            Limit: 1,
            Offset: 0,
          },
        },
        'redis',
        { region: 'ap-guangzhou', action: 'DescribeInstances' }
      ),
    ])
      .then((responses) => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const redisErr = _.get(responses, '[2].Error', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const redisAuthFail = _.get(redisErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail || redisAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (redisAuthFail) {
            messages.push(`${_.get(redisErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'redisMem',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'redisMem',
            status: 'success',
            message: 'Successfully queried the Redis service.',
            title: 'Success',
          };
        }
      })
      .catch((error) => {
        let message = 'Redis service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to Redis service.';
        }
        return {
          service: 'redisMem',
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
