import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import {
  LBPRIVATEInstanceAliasList,
  LBPRIVATEListenerAliasList,
  LBPRIVATEVALIDDIMENSIONS,
  LBPRIVATE_INSTANCE_DIMENSIONOBJECTS,
  LBPRIVATE_LISTENER_DIMENSIONOBJECTS,
  templateQueryIdMap,
} from './query_def';
import {
  GetServiceAPIInfo,
  GetRequestParams,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  VARIABLE_ALIAS,
  SliceLength,
  isVariable,
} from '../../common/constants';

export default class LBPRIVATEDatasource implements DatasourceInterface {
  Namespace = 'QCE/LB_PRIVATE';
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  secretKey: string;
  allInstanceMap: any[] = [];
  allListenerMap: any[] = [];
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
    this.secretKey = (instanceSettings.jsonData || {}).secretKey || '';
  }

  metricFindQuery(query: Record<string, any>) {
    // 查询地域列表
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // 查询 clb 实例列表
    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region).then(result => {
        this.allInstanceMap = result; // 混存全量实例map
        const instanceAlias =
          LBPRIVATEInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'LoadBalancerId';
        const instances: any[] = [];
        _.forEach(result, item => {
          const instanceAliasValue = _.get(item, instanceAlias);
          if (instanceAliasValue) {
            if (typeof instanceAliasValue === 'string') {
              item._InstanceAliasValue = instanceAliasValue;
              instances.push({ text: instanceAliasValue, value: item[templateQueryIdMap.instance] });
            } else if (_.isArray(instanceAliasValue)) {
              _.forEach(instanceAliasValue, subItem => {
                item._InstanceAliasValue = subItem;
                instances.push({ text: subItem, value: item[templateQueryIdMap.instance] });
              });
            }
          }
        });
        return instances;
      });
    }
    // 查询 clb监听器端口 列表
    const clbListenerPortQuery = query['action'].match(/^DescribeListeners/i) && !!query['instance'];
    const instance = this.getVariable(query['instance']);
    const instanceMap = _.find(this.allInstanceMap, o => o[templateQueryIdMap.instance] === instance);
    const instanceId = instanceMap?.LoadBalancerId;
    if (clbListenerPortQuery && instanceId) {
      return this.getListeners(region, instanceId).then(result => {
        this.allListenerMap = result;
        const listenerAlias =
          LBPRIVATEListenerAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'ListenerId';
        const listeners: any[] = [];
        _.forEach(result, item => {
          const listenerAliasValue = _.get(item, listenerAlias);
          if (listenerAliasValue) {
            if (typeof listenerAliasValue === 'string') {
              item._InstanceAliasValue = listenerAliasValue;
              listeners.push({ text: listenerAliasValue, value: item[templateQueryIdMap.listener] });
            } else if (_.isArray(listenerAliasValue)) {
              _.forEach(listenerAliasValue, subItem => {
                item._InstanceAliasValue = subItem;
                listeners.push({ text: subItem, value: item[templateQueryIdMap.listener] });
              });
            }
          }
        });
        return listeners;
      });
    }
    return Promise.resolve([]);
  }

  query(options: any) {
    const queries = _.filter(options.targets, item => {
      // 过滤无效的查询 target
      return (
        item.lbPrivate.hide !== true &&
        !!item.namespace &&
        !!item.lbPrivate.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.lbPrivate.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.lbPrivate.instance, true))
      );
    }).map(target => {
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.lbPrivate.region, false);
      // 实例 instances 可能为模板变量，需先判断
      let instances = target.lbPrivate.instance;
      if (isVariable(instances)) {
        let templateInsValues = ReplaceVariable(this.templateSrv, options.scopedVars, instances, true);
        if (!_.isArray(templateInsValues)) {
          templateInsValues = [templateInsValues];
        }
        instances = _.map(templateInsValues, instanceId =>
          _.find(this.allInstanceMap, o => o[templateQueryIdMap.instance] === instanceId),
        );
      } else {
        if (_.isArray(instances)) {
          instances = _.map(instances, instance => (_.isString(instance) ? JSON.parse(instance) : instance));
        } else {
          instances = [_.isString(instances) ? JSON.parse(instances) : instances];
        }
      }
      // 考虑多个监听器端口查询 可能为模板变量，需先判断
      let listeners = target.lbPrivate.listener;
      if (isVariable(listeners)) {
        let templateInsValues = ReplaceVariable(this.templateSrv, options.scopedVars, listeners, true);
        if (!_.isArray(templateInsValues)) {
          templateInsValues = [templateInsValues];
        }
        listeners = _.map(templateInsValues, listenerId =>
          _.find(this.allListenerMap, o => o[templateQueryIdMap.listener] === listenerId),
        );
      } else {
        // 按照监听器维度查询；
        if (_.isArray(listeners)) {
          listeners = _.map(listeners, listener => (_.isString(listener) ? JSON.parse(listener) : listener));
        } else {
          listeners = [_.isString(listeners) ? JSON.parse(listeners) : listeners];
        }
      }
      const instanceUnionArray: any[] = [];
      let instanceInRequest: any[] = [];
      // 如果没有选择监听器或者实例为多个，按照实例维度查询,考虑实例选择复选情况；
      if (instances.length > 1 || _.isEmpty(listeners)) {
        instanceInRequest = _.map(instances, instance => {
          const dimensionObject = LBPRIVATE_INSTANCE_DIMENSIONOBJECTS;
          instanceUnionArray.push(instance);
          _.forEach(dimensionObject, (__, key) => {
            if (_.has(LBPRIVATEVALIDDIMENSIONS, key)) {
              const keyTmp = LBPRIVATEVALIDDIMENSIONS[key];
              instance[key] = instance[keyTmp]; // baseMetric的key和getMonitor不对应，写入新旧键值对
            }
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        });
      } else {
        instanceInRequest = _.map(listeners, listener => {
          const dimensionObject = LBPRIVATE_LISTENER_DIMENSIONOBJECTS;
          // _InstanceAliasValue修改为instanceId-listenerId
          const instance = _.cloneDeep(instances[0]);
          instance._InstanceAliasValue += ` - ${listener.ListenerId}`;
          const instanceUnionMap = _.assign(listener, instance);
          // console.log({instanceUnionMap,listener, instance, dimensionObject});
          instanceUnionArray.push(instanceUnionMap);
          _.forEach(dimensionObject, (__, key) => {
            // let keyTmp = key;
            if (_.has(LBPRIVATEVALIDDIMENSIONS, key)) {
              const keyTmp = LBPRIVATEVALIDDIMENSIONS[key];
              instanceUnionMap[key] = instanceUnionMap[keyTmp]; // baseMetric的key和getMonitor不对应，写入新旧键值对
            }
            dimensionObject[key] = { Name: key, Value: instanceUnionMap[key] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        });
      }
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.lbPrivate.period || 300,
        Instances: instanceInRequest,
        Namespace: target.namespace,
        MetricName: target.lbPrivate.metricName,
      };
      return this.getMonitorData(data, region, instanceUnionArray);
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
   * 获取 LBPrivate 的监控数据
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
      { action: 'GetMonitorData', region },
    ).then(response => {
      // console.log({instances});
      return ParseQueryResult(response, instances);
    });
  }

  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/cvm',
      },
      'cvm',
      { action: 'DescribeRegions' },
    ).then(response => {
      return _.filter(
        _.map(response.RegionSet || [], item => {
          return { text: item.RegionName, value: item.Region, RegionState: item.RegionState };
        }),
        item => item.RegionState === 'AVAILABLE',
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
      { region, action: 'DescribeBaseMetrics' },
    ).then(response => {
      return _.filter(
        response.MetricSet || [],
        item =>
          item.Namespace === this.Namespace &&
          item.MetricName &&
          _.get(item, 'Dimensions[0].Dimensions', []).length > 0,
      );
    });
  }

  getInstances(region = 'ap-guangzhou', params = {}) {
    params = Object.assign({ Offset: 0, Limit: 20, LoadBalancerType: 'INTERNAL' }, params);
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeLoadBalancers' },
    ).then(response => {
      return response.LoadBalancerSet || [];
    });
  }

  getListeners(region, lbInstanceId) {
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          LoadBalancerId: lbInstanceId,
        },
      },
      serviceInfo.service,
      { region, action: 'DescribeListeners' },
    ).then(response => {
      return response.Listeners || [];
    });
  }

  /**
   * 模板变量中获取全量的 LBPrivate 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 50, LoadBalancerType: 'INTERNAL' };
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeLoadBalancers' },
    ).then(response => {
      result = response.LoadBalancerSet || [];
      const total = response.totalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 50);
        const promises: any[] = [];
        _.forEach(param, item => {
          promises.push(this.getInstances(region, item));
        });
        return Promise.all(promises)
          .then(responses => {
            _.forEach(responses, item => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch(error => {
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
        service: 'lbPrivate',
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
        { action: 'DescribeRegions' },
      ),
      this.doRequest(
        {
          url: this.url + '/monitor',
          data: {
            Namespace: this.Namespace,
          },
        },
        'monitor',
        { region: 'ap-guangzhou', action: 'DescribeBaseMetrics' },
      ),
      this.doRequest(
        {
          url: this.url + '/clb',
          data: {
            Limit: 1,
            Offset: 0,
          },
        },
        'clb',
        { region: 'ap-guangzhou', action: 'DescribeLoadBalancers' },
      ),
    ])
      .then(responses => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const lbPrivateErr = _.get(responses, '[2]', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const lbPrivateAuthFail = _.get(lbPrivateErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail || lbPrivateAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          if (lbPrivateAuthFail) {
            messages.push(`${_.get(lbPrivateErr, 'code')}: ${_.get(lbPrivateErr, 'codeDesc')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'lbPrivate',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'lbPrivate',
            status: 'success',
            message: 'Successfully queried the LBPrivate service.',
            title: 'Success',
          };
        }
      })
      .catch(error => {
        let message = 'LBPrivate service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to LBPrivate service.';
        }
        return {
          service: 'lbPrivate',
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
