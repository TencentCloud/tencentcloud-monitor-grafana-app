// import _ from 'lodash';
// import moment from 'moment';
// import DatasourceInterface from '../../datasource';
// import {
//   LOADBALANCEInstanceAliasList,
//   LOADBALANCEListenerAliasList,
//   LOADBALANCEVALIDDIMENSIONS,
//   LOADBALANCE_LISTENER_DIMENSIONOBJECTS,
//   LOADBALANCE_INSTANCE_DIMENSIONOBJECTS,
//   templateQueryIdMap,
// } from './query_def';
// import {
//   GetServiceAPIInfo,
//   GetRequestParams,
//   ReplaceVariable,
//   GetDimensions,
//   ParseQueryResult,
//   VARIABLE_ALIAS,
//   SliceLength,
//   isVariable,
// } from '../../common/constants';
// import instanceStorage from '../../common/datasourceStorage';
// // import { IdKeys } from '..';

// export default class LOADBALANCEDatasource implements DatasourceInterface {
//   Namespace = 'QCE/LOADBALANCE';
//   url: string;
//   instanceSettings: any;
//   backendSrv: any;
//   templateSrv: any;
//   secretId: string;
//   InstanceAliasList = LOADBALANCEInstanceAliasList
//   clbInstanceStorageKey = "clbInstanceStorageKey";
//   clbListenerStorageKey = "clbListenerStorageKey";
//   /** @ngInject */
//   constructor(instanceSettings, backendSrv, templateSrv) {
//     this.instanceSettings = instanceSettings;
//     this.backendSrv = backendSrv;
//     this.templateSrv = templateSrv;
//     this.url = instanceSettings.url;
//     this.secretId = (instanceSettings.jsonData || {}).secretId || '';
//   }

//   /* 格式化模板变量上的显示 */
//   getAliasValue(instance: Record<string, any>, alias: string) {
//     const result = instance[alias];
//     // console.log({ result, instance, alias });
//     return Array.isArray(result) ? result.join() : result;
//   }

//   formatVarDisplay(instance: Record<string, any>, displayTpl: string | undefined, instanceAlias: string) {
//     // 获取display=aaa${InstanceName}bbb${InstanceId}ccc
//     if (displayTpl) {
//       return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
//         if (!b || !this.InstanceAliasList.includes(b)) {
//           return '';
//         }
//         return this.getAliasValue(instance, b);
//       });
//     }
//     return this.getAliasValue(instance, instanceAlias);
//   }

//   metricFindQuery(query: Record<string, any>) {
//     // 查询地域列表
//     const regionQuery = query['action'].match(/^DescribeRegions$/i);
//     if (regionQuery) {
//       return this.getRegions();
//     }

//     // 查询 clb 实例列表
//     const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
//     const region = this.getVariable(query['region']);
//     if (instancesQuery && region) {
//       return this.getVariableInstances(region, query['payload'] || {}).then((result) => {
//         // this.clbInstanceStorageKey = result; // 混存全量实例map
//         const instanceAlias =
//           LOADBALANCEInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'LoadBalancerId';
//         const instances: any[] = [];
//         _.forEach(result, (item) => {
//           const instanceAliasValue = this.formatVarDisplay(item, query['display'], instanceAlias);
//           if (instanceAliasValue) {
//             if (typeof instanceAliasValue === 'string') {
//               item._InstanceAliasValue = instanceAliasValue;
//               instances.push({ text: instanceAliasValue, value: item[templateQueryIdMap.instance] });
//             } else if (_.isArray(instanceAliasValue)) {
//               _.forEach(instanceAliasValue, (subItem) => {
//                 item._InstanceAliasValue = subItem;
//                 instances.push({ text: subItem, value: item[templateQueryIdMap.instance] });
//               });
//             }
//           }
//         });
//         instanceStorage.setInstance(this.clbInstanceStorageKey, result);
//         return instances;
//       });
//     }
//     // 查询 clb监听器端口 列表
//     const clbListenerPortQuery = query['action'].match(/^DescribeListeners/i) && !!query['instance'];
//     const instance = this.getVariable(query['instance']);
//     const instanceListCache = instanceStorage.getInstance(this.clbInstanceStorageKey);
//     const instanceMap:any = _.find(instanceListCache, (o) => o[templateQueryIdMap.instance] === instance);
//     const instanceId = instanceMap?.LoadBalancerId;
//     if (clbListenerPortQuery && instanceId) {
//       return this.getListeners(region, instanceId).then((result) => {
//         // this.clbListenerStorageKey = result;
//         const listenerAlias =
//           LOADBALANCEListenerAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'ListenerId';
//         const listeners: any[] = [];
//         _.forEach(result, (item) => {
//           // const listenerAliasValue = _.get(item, listenerAlias);
//           const listenerAliasValue = this.formatVarDisplay(item, query['display'], listenerAlias);
//           if (listenerAliasValue) {
//             if (typeof listenerAliasValue === 'string') {
//               item._InstanceAliasValue = listenerAliasValue;
//               listeners.push({ text: listenerAliasValue, value: item[templateQueryIdMap.listener] });
//             } else if (_.isArray(listenerAliasValue)) {
//               _.forEach(listenerAliasValue, (subItem) => {
//                 item._InstanceAliasValue = subItem;
//                 listeners.push({ text: subItem, value: item[templateQueryIdMap.listener] });
//               });
//             }
//           }
//         });
//       instanceStorage.setInstance(this.clbListenerStorageKey, result);
//       return listeners;
//       });
//     }
//     return Promise.resolve([]);
//   }

//   query(options: any) {
//     const queries = _.filter(options.targets, (item) => {
//       // 过滤无效的查询 target
//       return (
//         item.loadBalance.hide !== true &&
//         !!item.namespace &&
//         !!item.loadBalance.metricName &&
//         !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.loadBalance.region, false)) &&
//         !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item.loadBalance.instance, true))
//       );
//     }).map((target) => {
//       const region = ReplaceVariable(this.templateSrv, options.scopedVars, target.loadBalance.region, false);
//       // 实例 instances 可能为模板变量，需先判断
//       let instances = target.loadBalance.instance;
//       if (isVariable(instances)) {
//         let templateInsValues = ReplaceVariable(this.templateSrv, options.scopedVars, instances, true);
//         if (!_.isArray(templateInsValues)) {
//           templateInsValues = [templateInsValues];
//         }
//         const instanceCache = instanceStorage.getInstance(this.clbInstanceStorageKey);
//         instances = _.map(templateInsValues, (instanceId) =>
//           _.find(instanceCache, (o) => o[templateQueryIdMap.instance] === instanceId)
//         );
//       } else {
//         if (_.isArray(instances)) {
//           instances = _.map(instances, (instance) => (_.isString(instance) ? JSON.parse(instance) : instance));
//         } else {
//           instances = [_.isString(instances) ? JSON.parse(instances) : instances];
//         }
//       }
//       // 考虑多个监听器端口查询 可能为模板变量，需先判断
//       let listeners = target.loadBalance.listener;
//       if (isVariable(listeners)) {
//         let templateInsValues = ReplaceVariable(this.templateSrv, options.scopedVars, listeners, true);
//         if (!_.isArray(templateInsValues)) {
//           templateInsValues = [templateInsValues];
//         }
//         const listenerCache = instanceStorage.getInstance(this.clbListenerStorageKey);
//         listeners = _.map(templateInsValues, (listenerId) =>
//           _.find(listenerCache, (o) => o[templateQueryIdMap.listener] === listenerId)
//         );
//       } else {
//         // 按照监听器维度查询；
//         if (_.isArray(listeners)) {
//           listeners = _.map(listeners, (listener) => (_.isString(listener) ? JSON.parse(listener) : listener));
//         } else {
//           try {
//             listeners = [_.isString(listeners) ? JSON.parse(listeners) : listeners];
//           } catch (e) {
//             listeners = [];
//           }
//         }
//       }

//       const instanceUnionArray: any = [];
//       let instanceInRequest: any[] = [];
//       // 如果没有选择监听器或者实例为多个，按照实例维度查询,考虑实例选择复选情况；
//       if (instances.length > 1 || _.isEmpty(listeners)) {
//         instanceInRequest = _.map(instances, (instance) => {
//           const dimensionObject = LOADBALANCE_INSTANCE_DIMENSIONOBJECTS;
//           instanceUnionArray.push(instance);
//           _.forEach(dimensionObject, (__, key) => {
//             if (_.has(LOADBALANCEVALIDDIMENSIONS, key)) {
//               const keyTmp = LOADBALANCEVALIDDIMENSIONS[key];
//               instance[key] = instance[keyTmp]; // baseMetric的key和getMonitor不对应，写入新旧键值对
//             }
//             dimensionObject[key] = { Name: key, Value: instance[key] };
//           });
//           return { Dimensions: GetDimensions(dimensionObject) };
//         });
//       } else {
//         instanceInRequest = _.map(listeners, (listener) => {
//           const dimensionObject = LOADBALANCE_LISTENER_DIMENSIONOBJECTS;
//           // _InstanceAliasValue修改为instanceId-listenerId
//           const instance = _.cloneDeep(instances[0]);
//           instance._InstanceAliasValue += ` - ${listener._InstanceAliasValue}`;
//           const instanceUnionMap = _.assign(listener, instance);
//           // console.log({instanceUnionMap,listener, instance, dimensionObject});
//           instanceUnionArray.push(instanceUnionMap);
//           _.forEach(dimensionObject, (__, key) => {
//             // let keyTmp = key;
//             if (_.has(LOADBALANCEVALIDDIMENSIONS, key)) {
//               const keyTmp = LOADBALANCEVALIDDIMENSIONS[key];
//               instanceUnionMap[key] = instanceUnionMap[keyTmp]; // baseMetric的key和getMonitor不对应，写入新旧键值对
//             }
//             dimensionObject[key] = { Name: key, Value: instanceUnionMap[key] };
//           });
//           return { Dimensions: GetDimensions(dimensionObject) };
//         });
//       }
//       const data = {
//         StartTime: moment(options.range.from).format(),
//         EndTime: moment(options.range.to).format(),
//         Period: target.loadBalance.period || 300,
//         Instances: instanceInRequest,
//         Namespace: target.namespace,
//         MetricName: target.loadBalance.metricName,
//       };
//       return this.getMonitorData(data, region, instanceUnionArray);
//     });

//     if (queries.length === 0) {
//       return [];
//     }

//     return Promise.all(queries)
//       .then((responses) => {
//         return _.flatten(responses);
//       })
//       .catch((error) => {
//         return [];
//       });
//   }

//   // 获取某个变量的实际值，this.templateSrv.replace() 函数返回实际值的字符串
//   getVariable(metric: string) {
//     return this.templateSrv.replace((metric || '').trim());
//   }

//   /**
//    * 获取 loadBalance 的监控数据
//    *
//    * @param params 获取监控数据的请求参数
//    * @param region 地域信息
//    * @param instances 实例列表，用于对返回结果的匹配解析
//    */
//   getMonitorData(params, region, instances) {
//     const serviceInfo = GetServiceAPIInfo(region, 'monitor');
//     return this.doRequest(
//       {
//         url: this.url + serviceInfo.path,
//         data: params,
//       },
//       serviceInfo.service,
//       { action: 'GetMonitorData', region }
//     ).then((response) => {
//       // console.log({instances});
//       return ParseQueryResult(response, instances);
//     });
//   }

//   getRegions() {
//     return this.doRequest(
//       {
//         url: this.url + '/cvm',
//       },
//       'cvm',
//       { action: 'DescribeRegions' }
//     ).then((response) => {
//       return _.filter(
//         _.map(response.RegionSet || [], (item) => {
//           return { text: item.RegionName, value: item.Region, RegionState: item.RegionState };
//         }),
//         (item) => item.RegionState === 'AVAILABLE'
//       );
//     });
//   }

//   getMetrics(region = 'ap-guangzhou') {
//     const serviceInfo = GetServiceAPIInfo(region, 'monitor');
//     return this.doRequest(
//       {
//         url: this.url + serviceInfo.path,
//         data: {
//           Namespace: this.Namespace,
//         },
//       },
//       serviceInfo.service,
//       { region, action: 'DescribeBaseMetrics' }
//     ).then((response) => {
//       return _.filter(
//         response.MetricSet || [],
//         (item) =>
//           item.Namespace === this.Namespace && item.MetricName && _.get(item, 'Dimensions[0].Dimensions', []).length > 0
//       );
//     });
//   }

//   getInstances(region = 'ap-guangzhou', params = {}) {
//     params = { Offset: 0, Limit: 20, ...params };
//     const serviceInfo = GetServiceAPIInfo(region, 'clb');
//     return this.doRequest(
//       {
//         url: this.url + serviceInfo.path,
//         data: params,
//       },
//       serviceInfo.service,
//       { region, action: 'DescribeLoadBalancers' }
//     ).then((response) => {
//       return response.LoadBalancerSet || [];
//     });
//   }

//   getListeners(region, lbInstanceId) {
//     const serviceInfo = GetServiceAPIInfo(region, 'clb');
//     return this.doRequest(
//       {
//         url: this.url + serviceInfo.path,
//         data: {
//           LoadBalancerId: lbInstanceId,
//         },
//       },
//       serviceInfo.service,
//       { region, action: 'DescribeListeners' }
//     ).then((response) => {
//       return response.Listeners || [];
//     });
//   }

//   /**
//    * 模板变量中获取全量的 loadBalance 实例列表
//    * @param region 地域信息
//    */
//   getVariableInstances(region, query) {
//     let result: any[] = [];
//     const params = { Offset: 0, Limit: 50, ...query };
//     const serviceInfo = GetServiceAPIInfo(region, 'clb');
//     return this.doRequest(
//       {
//         url: this.url + serviceInfo.path,
//         data: params,
//       },
//       serviceInfo.service,
//       { region, action: 'DescribeLoadBalancers' }
//     ).then((response) => {
//       result = response.LoadBalancerSet || [];
//       const total = response.totalCount || 0;
//       if (result.length >= total) {
//         return result;
//       } else {
//         const param = SliceLength(total, 50);
//         const promises: any[] = [];
//         _.forEach(param, (item) => {
//           promises.push(this.getInstances(region, item));
//         });
//         return Promise.all(promises)
//           .then((responses) => {
//             _.forEach(responses, (item) => {
//               result = _.concat(result, item);
//             });
//             return result;
//           })
//           .catch((error) => {
//             return result;
//           });
//       }
//     });
//   }

//   // 检查某变量字段是否有值
//   isValidConfigField(field: string) {
//     return field && field.length > 0;
//   }

//   testDatasource() {
//     if (!this.isValidConfigField(this.secretId)) {
//       return {
//         service: 'loadBalance',
//         status: 'error',
//         message: 'The SecretId/SecretKey field is required.',
//       };
//     }

//     return Promise.all([
//       this.doRequest(
//         {
//           url: this.url + '/cvm',
//         },
//         'cvm',
//         { action: 'DescribeRegions' }
//       ),
//       this.doRequest(
//         {
//           url: this.url + '/monitor',
//           data: {
//             Namespace: this.Namespace,
//           },
//         },
//         'monitor',
//         { region: 'ap-guangzhou', action: 'DescribeBaseMetrics' }
//       ),
//       this.doRequest(
//         {
//           url: this.url + '/clb',
//           data: {
//             Limit: 1,
//             Offset: 0,
//           },
//         },
//         'clb',
//         { region: 'ap-guangzhou', action: 'DescribeLoadBalancers' }
//       ),
//     ])
//       .then((responses) => {
//         const cvmErr = _.get(responses, '[0].Error', {});
//         const monitorErr = _.get(responses, '[1].Error', {});
//         const loadBalanceErr = _.get(responses, '[2]', {});
//         const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
//         const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
//         const loadBalanceAuthFail = _.get(loadBalanceErr, 'Code', '').indexOf('AuthFailure') !== -1;
//         if (cvmAuthFail || monitorAuthFail || loadBalanceAuthFail) {
//           const messages: any[] = [];
//           if (cvmAuthFail) {
//             messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
//           }
//           if (monitorAuthFail) {
//             messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
//           }
//           if (loadBalanceAuthFail) {
//             messages.push(`${_.get(loadBalanceErr, 'code')}: ${_.get(loadBalanceErr, 'codeDesc')}`);
//           }
//           const message = _.join(_.compact(_.uniq(messages)), '; ');
//           return {
//             service: 'loadBalance',
//             status: 'error',
//             message,
//           };
//         } else {
//           return {
//             namespace: this.Namespace,
//             service: 'loadBalance',
//             status: 'success',
//             message: 'Successfully queried the loadBalance service.',
//             title: 'Success',
//           };
//         }
//       })
//       .catch((error) => {
//         let message = 'loadBalance service:';
//         message += error.statusText ? error.statusText + '; ' : '';
//         if (_.get(error, 'data.error.code', '')) {
//           message += error.data.error.code + '. ' + error.data.error.message;
//         } else if (_.get(error, 'data.error', '')) {
//           message += error.data.error;
//         } else if (_.get(error, 'data', '')) {
//           message += error.data;
//         } else {
//           message += 'Cannot connect to loadBalance service.';
//         }
//         return {
//           service: 'loadBalance',
//           status: 'error',
//           message: message,
//         };
//       });
//   }

//   /**
//    * 腾讯云 API 3.0 请求接口
//    * @param options
//    * @param service
//    * @param signObj
//    */
//   async doRequest(options, service, signObj: any = {}) {
//     options = await GetRequestParams(
//       options,
//       service,
//       signObj,
//       this.secretId,
//       this.instanceSettings.id,
//       this.backendSrv
//     );
//     return this.backendSrv
//       .datasourceRequest(options)
//       .then((response) => {
//         return _.get(response, 'data.Response', {});
//       })
//       .catch((error) => {
//         throw error;
//       });
//   }
// }
