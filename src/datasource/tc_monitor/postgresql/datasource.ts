import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import { POSTGRESInstanceAliasList } from './query_def';
import { GetRequestParams, GetServiceAPIInfo, ReplaceVariable, GetDimensions, ParseQueryResult, VARIABLE_ALIAS, SliceLength } from '../../common/constants';


export default class POSTGRESDatasource implements DatasourceInterface {
  Namespace = 'QCE/POSTGRES';
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  secretKey: string;
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.instanceSettings = instanceSettings;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
    this.secretKey = (instanceSettings.jsonData || {}).secretKey || '';
  }

  /**
   * 获取模板变量的选择项列表，当前支持两种变量：地域、POSTGRESQL 实例
   *
   * @param query 模板变量配置填写的 Query 参数字符串
   */
  metricFindQuery(query: object) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // 查询 POSTGRESQL 实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region).then(result => {
        const instanceAlias = POSTGRESInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'DBInstanceId';
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

  /**
   * 根据 Panel 的配置项，获取相应的监控数据
   *
   * @param options Panel 的配置参数
   * @return 返回数据数组，示例如下
   * [
   *   {
   *     "target": "BytesReceived - postgres-123",
   *     "datapoints": [
   *       [861, 1450754160000],
   *       [767, 1450754220000]
   *     ]
   *   }
   * ]
   */
  query(options: any) {
    const queries = _.filter(options.targets, item => {
      // 过滤无效的查询 target
      return (
        item.postgres.hide !== true &&
        !!item.namespace &&
        !!item.postgres.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.postgres.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.postgres.instance, true))
      );
    }).map(target => {
      // 实例 instances 可能为模板变量，需先获取实际值
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target.postgres.instance, true);
      if (_.isArray(instances)) {
        instances = _.map(instances, instance => _.isString(instance) ? JSON.parse(instance) : instance);
      } else {
        instances = [_.isString(instances) ? JSON.parse(instances) : instances];
      }
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.postgres.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.postgres.period || 300,
        Instances: _.map(instances, instance => {
          const dimensionObject = target.postgres.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            // TODO 兼容接口问题
            if (key === 'resourceId') {
              dimensionObject[key] = { Name: key, Value: instance['DBInstanceId'] };
            } else {
              dimensionObject[key] = { Name: key, Value: instance[key] };
            }
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.postgres.metricName,
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
   * 获取 POSTGRESQL 的监控数据
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
          instance.resourceId = instance['DBInstanceId'];
          return instance;
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

  /**
   * 获取 POSTGRESQL 的监控指标
   * @param region  地域信息
   */
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

  /**
   * 获取 POSTGRESQL 实例
   * @param region 地域信息
   * @param params 其他实例查询参数，详情参考 https://cloud.tencent.com/document/api/236/15872
   */
  getInstances(region, params = {}) {
    params = Object.assign({ Offset: 0, Limit: 100 }, params);
    const serviceInfo = GetServiceAPIInfo(region, 'postgres');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeDBInstances' })
      .then(response => {
        return _.map(response.DBInstanceSet || [], item => {
          const privateIpAddress = _.get(_.filter(_.get(item, 'DBInstanceNetInfo', []), ['NetType', 'private']), '[0].Ip');
          const publicIpAddress = _.get(_.filter(_.get(item, 'DBInstanceNetInfo', []), ['NetType', 'public']), '[0].Ip');
          item.PrivateIpAddresses = privateIpAddress;
          item.PublicIpAddresses = publicIpAddress;
          return item;
        });
      });
  }

  /**
   * 模板变量中获取全量的 POSTGRESQL 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 100 };
    const serviceInfo = GetServiceAPIInfo(region, 'postgres');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeDBInstances' })
      .then(response => {
        result = _.map(response.DBInstanceSet || [], item => {
          const privateIpAddress = _.get(_.filter(_.get(item, 'DBInstanceNetInfo', []), ['NetType', 'private']), '[0].Ip');
          const publicIpAddress = _.get(_.filter(_.get(item, 'DBInstanceNetInfo', []), ['NetType', 'public']), '[0].Ip');
          item.PrivateIpAddresses = privateIpAddress;
          item.PublicIpAddresses = publicIpAddress;
          return item;
        });
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

  // 验证 SerectId、SerectKey 的有效性，并测试 cvm、monitor、postgresql 三种 API 的连通性
  testDatasource() {
    if (!this.isValidConfigField(this.secretId) || !this.isValidConfigField(this.secretKey)) {
      return {
        service: 'POSTGRESQL',
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
          url: this.url + '/postgres',
          data: {
            Offset: 0,
            Limit: 1,
          },
        },
        'postgres',
        { region: 'ap-guangzhou', action: 'DescribeDBInstances' }
      )
    ]).then(responses => {
      const cvmErr = _.get(responses, '[0].Error', {});
      const monitorErr = _.get(responses, '[1].Error', {});
      const postgresErr = _.get(responses, '[2].Error', {});
      const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const postgresAuthFail = _.get(postgresErr, 'Code', '').indexOf('AuthFailure') !== -1;
      if (cvmAuthFail || monitorAuthFail || postgresAuthFail) {
        const messages: any[] = [];
        if (cvmAuthFail) {
          messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
        }
        if (monitorAuthFail) {
          messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
        }
        if (postgresAuthFail) {
          messages.push(`${_.get(postgresErr, 'Code')}: ${_.get(postgresErr, 'Message')}`);
        }
        const message = _.join(_.compact(_.uniq(messages)), '; ');
        return {
          service: 'POSTGRESQL',
          status: 'error',
          message,
        };
      } else {
        return {
          namespace: this.Namespace,
          service: 'POSTGRESQL',
          status: 'success',
          message: 'Successfully queried the POSTGRESQL service.',
          title: 'Success',
        };
      }
    })
      .catch(error => {
        let message = 'POSTGRESQL service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (!!_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (!!_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (!!_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to POSTGRESQL service.';
        }
        return {
          service: 'POSTGRESQL',
          status: 'error',
          message: message,
        };
      });
  }

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

