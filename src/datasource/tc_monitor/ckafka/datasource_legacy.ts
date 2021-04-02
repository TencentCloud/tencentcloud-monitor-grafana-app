import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../../datasource';
import { CKAFKAInstanceAliasList, CKAFKAInvalidDemensions } from './query_def';
import {
  GetRequestParams,
  GetServiceAPIInfo,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  VARIABLE_ALIAS,
  SliceLength,
} from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';

export default class CKAFKADatasource implements DatasourceInterface {
  Namespace = 'QCE/CKAFKA';
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

  /**
   * 获取模板变量的选择项列表，当前支持两种变量：地域、CKAFKA实例
   *
   * @param query 模板变量配置填写的 Query 参数字符串
   */
  metricFindQuery(query: { action: string; namespace: string; region?: string }, regex?: string) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }
    // 查询 CKAFKA实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      // const tagText = _.get(query, 'tag', '');
      // const Filters = ParseMetricRegex(!tagText ? '' : `tag:tag-key=${tagText}`);
      return this.getVariableInstances(region).then((result) => {
        const instanceAlias =
          CKAFKAInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'InstanceId';
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

    let instance = this.getVariable(query['instance']);

    try {
      instance = JSON.parse(instance);
    } catch (error) {}

    return this.fetchAllData(query['action'], region, { InstanceId: instance.InstanceId });
  }

  async fetchAllData(action, region, params = {}) {
    const rs = await this.getConsumerGroups(region, params);
    switch (action) {
      case 'DescribeTopicList':
        return rs.TopicList;
      case 'DescribeGroup':
        return rs.GroupList;
      case 'DescribePartion':
        return rs.PartitionList;
      default:
        return [];
    }
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
        item.ckafka.hide !== true &&
        !!item.namespace &&
        !!item.ckafka.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.ckafka.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.ckafka.instance, true))
      );
    }).map((target) => {
      // 实例 instances 可能为模板变量，需先获取实际值
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target.ckafka.instance, true);

      if (_.isArray(instances)) {
        instances = _.map(instances, (instance) => (_.isString(instance) ? JSON.parse(instance) : instance));
      } else {
        instances = [_.isString(instances) ? JSON.parse(instances) : instances];
      }
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.ckafka.region, false);

      const extraDimList = []; // 额外的维度

      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.ckafka.period || 300,
        Instances: _.flatMap(instances, (instance) => {
          // 多个topicList
          const dimensionObject = target.ckafka.dimensionObject;

          _.forEach(dimensionObject, (__, key) => {
            let keyTmp = key;
            if (_.has(CKAFKAInvalidDemensions, key)) {
              keyTmp = CKAFKAInvalidDemensions[key];
            }
            const extraValue = this.getVariable(target.ckafka[keyTmp]); // 这里要支持额外维度的模板变量
            dimensionObject[key] = { Name: key, Value: instance[keyTmp] ?? extraValue }; // 从实例中取，如果取不到，则从界面模型上取

            // 设置instance
            instance[key] = instance[keyTmp] ?? extraValue;
          });

          if (extraDimList.length === 0) {
            return [{ Dimensions: GetDimensions(dimensionObject) }];
          }

          // 处理额外的维度, 为了处理维度的多选值，这里比较绕，比较复杂
          return _.flatMap(extraDimList, (extraDim) => {
            const targetDims = dimensionObject[extraDim]?.Value;
            if (Array.isArray(targetDims)) {
              return targetDims.map((dim) => {
                instance[extraDim] = dim; // 实例上添加对应属性
                return {
                  Dimensions: GetDimensions({ ...dimensionObject, [extraDim]: { Name: extraDim, Value: dim } }),
                };
              });
            }

            return [{ Dimensions: GetDimensions(dimensionObject) }];
          });
        }),
        Namespace: target.namespace,
        MetricName: target.ckafka.metricName,
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
    const rs = this.templateSrv.replace((metric || '').trim());
    const valStr = rs.match(/\{([\w-,]+)\}/);
    // 判断是否为多选
    if (valStr) {
      return valStr[1].split(',');
    }
    return rs;
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
    const serviceInfo = GetServiceAPIInfo(region, 'ckafka');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeInstances' }
    ).then((response) => {
      return response.Result.InstanceList ?? [];
    });
  }

  getVariableInstances(region, query = {}) {
    let result: any[] = [];
    const params = { ...query, ...{ Offset: 0, Limit: 100 } };
    const serviceInfo = GetServiceAPIInfo(region, 'ckafka');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeInstances' }
    ).then((response) => {
      result = response.Result.InstanceList || [];
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
            console.log('result:', result);
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

  async getConsumerGroups(region, params) {
    const serviceInfo = GetServiceAPIInfo(region, 'ckafka');

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeConsumerGroup' }
        );
      },
      params,
      ['GroupListForMonitor', 'TopicListForMonitor', 'PartitionListForMonitor']
    );

    let [GroupList, TopicList, PartitionList] = rs;

    // @ts-ignore
    TopicList = _.uniqBy(TopicList, (item) => item.TopicId);
    // @ts-ignore
    GroupList = _.uniqBy(GroupList, (item) => item.GroupName);

    // @ts-ignore
    PartitionList = _.uniqBy(PartitionList, (item) => item.Partition);

    return {
      TopicList: TopicList.map((topic) => ({ text: topic.TopicId, value: topic.TopicId, TopicName: topic.TopicName })),
      GroupList: GroupList.map((group) => ({ text: group.GroupName, value: group.GroupName })),
      PartitionList: PartitionList.map((par) => ({ text: par.Partition, value: par.Partition })),
    };
  }

  // 检查某变量字段是否有值
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  testDatasource() {
    if (!this.isValidConfigField(this.secretId) || !this.isValidConfigField(this.secretKey)) {
      return {
        service: 'ckafka',
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
          url: this.url + '/ckafka',
          data: {
            Offset: 0,
            Limit: 1,
          },
        },
        'ckafka',
        { region: 'ap-guangzhou', action: 'DescribeInstances' }
      ),
    ])
      .then((responses) => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const ckafkaErr = _.get(responses, '[2].Error', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const ckafkaAuthFail = _.get(ckafkaErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail || ckafkaAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (ckafkaAuthFail) {
            messages.push(`${_.get(ckafkaErr, 'Code')}: ${_.get(ckafkaErr, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'ckafka',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'ckafka',
            status: 'success',
            message: 'Successfully queried the CKAFKA service.',
            title: 'Success',
          };
        }
      })
      .catch((error) => {
        let message = 'CKAFKA service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to CKAFKA service.';
        }
        return {
          service: 'CKAFKA',
          status: 'error',
          message: message,
        };
      });
  }

  doRequest(options, service, signObj: any = {}): any {
    options = GetRequestParams(options, service, signObj, this.secretId, this.secretKey);
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
