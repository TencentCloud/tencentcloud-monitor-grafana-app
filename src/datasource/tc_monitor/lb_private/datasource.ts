import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import { LBPRIVATEInstanceAliasList, LBPRIVATEListenerAliasList, LBPRIVATEVALIDDIMENSIONS } from './query_def';
import { GetServiceAPIInfo, GetRequestParams, ReplaceVariable, GetDimensions, ParseQueryResult, VARIABLE_ALIAS, SliceLength } from '../../common/constants';

export default class LBPRIVATEDatasource implements DatasourceInterface {
  Namespace = 'QCE/LB_PRIVATE';
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

    // 查询 clb 实例列表
    const instancesQuery = query['action'].match(/^DescribeLoadBalancers/i) && !!query['region'];
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getVariableInstances(region).then(result => {
        const instanceAlias = LBPRIVATEInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'LoadBalancerId';
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
    // 查询 clb监听器端口 列表
    const clbListenerPortQuery = query['action'].match(/^DescribeListeners/i) && !!query['instance'];
    const instance = this.getVariable(query['instance']);
    if (clbListenerPortQuery && instance) {
      return this.getListeners(region, instance).then(result => {
        const listenerAlias = LBPRIVATEListenerAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'ListenerId';
        const listeners: any[] = [];
        _.forEach(result, (item) => {
          const listenerAliasValue = _.get(item, listenerAlias);
          if (listenerAliasValue) {
            if (typeof listenerAliasValue === 'string') {
              item._InstanceAliasValue = listenerAliasValue;
              listeners.push({ text: listenerAliasValue, value: JSON.stringify(item) });
            } else if (_.isArray(listenerAliasValue)) {
              _.forEach(listenerAliasValue, (subItem) => {
                item._InstanceAliasValue = subItem;
                listeners.push({ text: subItem, value: JSON.stringify(item) });
              });
            }
          }
        });
        return listeners;
      });
    }
    return [];
  }

  query(options: any) {
    const queries = _.filter(options.targets, item => {
      // 过滤无效的查询 target
      return (
        item.lbPrivate.hide !== true &&
        !!item.namespace &&
        !!item.lbPrivate.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.lbPrivate.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.lbPrivate.instance, true)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.lbPrivate.listener, true))
      );
    }).map(target => {
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.lbPrivate.region, false);
      // 实例 instances 可能为模板变量，需先获取实际值
      const instance = ReplaceVariable(this.templateSrv, options.scopedVars, target.lbPrivate.instance, true);
      // 考虑多个监听器端口查询
      let listeners = ReplaceVariable(this.templateSrv, options.scopedVars, target.lbPrivate.listener, false);
      const instanceUnionArray: any = [];
      if (_.isArray(listeners)) {
        listeners = _.map(listeners, listener => _.isString(listener) ? JSON.parse(listener) : listener);
      } else {
        listeners = [_.isString(listeners) ? JSON.parse(listeners) : listeners];
      }
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.lbPrivate.period || 300,
        Instances: _.map(listeners, listener => {
          const dimensionObject = target.lbPrivate.dimensionObject;
          let instanceMap = {};
          try {
            instanceMap = JSON.parse(instance);
          }catch (e) {
            console.log(e);
          }
          const instanceUnionMap = _.assign(listener, instanceMap);
          console.log({instanceUnionMap,listener, instance, dimensionObject});
          instanceUnionArray.push(instanceUnionMap);
          _.forEach(dimensionObject, (__, key) => {
            let keyTmp = key;
            if (_.has(LBPRIVATEVALIDDIMENSIONS,key)) {
              keyTmp = LBPRIVATEVALIDDIMENSIONS[key];
            }
            dimensionObject[key] = { Name: key, Value: instanceUnionMap[keyTmp] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
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
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { action: 'GetMonitorData', region })
      .then(response => {
        console.log({instances});
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
        return _.filter(response.MetricSet || [], item => item.Namespace === this.Namespace && item.MetricName && _.get(item, 'Dimensions[0].Dimensions', []).length>0);
      });
  }

  getInstances(region = 'ap-guangzhou', params = {}) {
    params = Object.assign({ Offset: 0, Limit: 20 }, params);
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeLoadBalancers' })
      .then(response => {
        return response.LoadBalancerSet || [];
      });
  }

  getListeners(region, lbInstanceId) {
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: {
        LoadBalancerId: lbInstanceId
      },
    }, serviceInfo.service, { region, action: 'DescribeListeners' })
      .then(response => {
        return response.Listeners || [];
      });
  }

  /**
   * 模板变量中获取全量的 LBPrivate 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 50 };
    const serviceInfo = GetServiceAPIInfo(region, 'clb');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeLoadBalancers' })
      .then(response => {
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
  // getVpcId(region, params: any = {}) {
  //   params = Object.assign({ Offset: 0, Limit: 20 }, params);
  //   // TODO 等待腾讯云接口查问题
  //   params.Offset = String(params.Offset);
  //   params.Limit = String(params.Limit);
  //   const serviceInfo = GetServiceAPIInfo(region, 'vpc');
  //   return this.doRequest({
  //     url: this.url + serviceInfo.path,
  //     data: params,
  //   }, serviceInfo.service, { region, action: 'DescribeVpcs' })
  //     .then(response => {
  //       return _.map(response.VpcSet || [], item => ({ text: item.VpcId, value: item.VpcId }));
  //     });
  // }

  // getVpcIds(region) {
  //   let result: any[] = [];
  //   const params: any = { Offset: 0, Limit: 100 };
  //   // TODO 等待腾讯云接口查问题
  //   params.Offset = String(params.Offset);
  //   params.Limit = String(params.Limit);
  //   const serviceInfo = GetServiceAPIInfo(region, 'vpc');
  //   return this.doRequest({
  //     url: this.url + serviceInfo.path,
  //     data: params,
  //   }, serviceInfo.service, { region, action: 'DescribeVpcs' })
  //     .then(response => {
  //       result = _.map(response.VpcSet || [], item => ({ text: item.VpcId, value: item.VpcId }));
  //       const total = response.TotalCount || 0;
  //       if (result.length >= total) {
  //         return result;
  //       } else {
  //         const param = SliceLength(total, 100);
  //         const promises: any[] = [];
  //         _.forEach(param, item => {
  //           promises.push(this.getVpcId(region, item));
  //         });
  //         return Promise.all(promises).then(responses => {
  //           _.forEach(responses, item => {
  //             result = _.concat(result, item);
  //           });
  //           return result;
  //         }).catch(error => {
  //           return result;
  //         });
  //       }
  //     });
  // }


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
          url: this.url + '/clb',
          data: {
            Limit: 1,
            Offset: 0,
          },
        },
        'clb',
        { region: 'ap-guangzhou', action: 'DescribeLoadBalancers' }
      ),
    ]).then(responses => {
      const cvmErr = _.get(responses, '[0].Error', {});
      const monitorErr = _.get(responses, '[1].Error', {});
      const lbPrivateErr = _.get(responses, '[2]', {});
      const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const lbPrivateAuthFail = _.get(lbPrivateErr, 'Code', '').indexOf('AuthFailure') !== -1;
      if (cvmAuthFail || monitorAuthFail || lbPrivateAuthFail ) {
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
    }).catch(error => {
      let message = 'LBPrivate service:';
      message += error.statusText ? error.statusText + '; ' : '';
      if (!!_.get(error, 'data.error.code', '')) {
        message += error.data.error.code + '. ' + error.data.error.message;
      } else if (!!_.get(error, 'data.error', '')) {
        message += error.data.error;
      } else if (!!_.get(error, 'data', '')) {
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
