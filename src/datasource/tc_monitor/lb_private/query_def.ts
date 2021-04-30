import _ from 'lodash';

import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/LB_PRIVATE';

const ForwardTypes = [
  { text: '通用的负载均衡', value: 1 },
  { text: '传统的负载均衡', value: 0 },
];

const OrderBy = [
  { text: 'LoadBalancerName', value: 'LoadBalancerName' },
  { text: 'CreateTime', value: 'CreateTime' },
  { text: 'Domain', value: 'Domain' },
  { text: 'LoadBalancerType', value: 'LoadBalancerType' },
];

const OrderType = [
  { text: '升序', value: 0 },
  { text: '降序', value: 1 },
];

const WithRs = [
  { text: '没有绑定后端服务', value: 0 },
  { text: '绑定后端服务', value: 1 },
  { text: '查询全部', value: -1 },
];
const LBPRIVATEFieldsDescriptor: FildDescriptorType = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputNumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1',
    link: '',
    type: 'inputNumber',
    min: 1,
  },
  {
    key: 'LoadBalancerIds',
    enDescriptor: 'LoadBalancer ID',
    cnDescriptor: '实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'LoadBalancerName',
    enDescriptor: 'LoadBalancer Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'input',
  },
  {
    key: 'Forward',
    enDescriptor: 'Forward',
    cnDescriptor: '负载均衡实例类型',
    link: '',
    type: 'select',
    list: ForwardTypes,
  },
  {
    key: 'Domain',
    enDescriptor: 'Domain',
    cnDescriptor: '域名，腾讯云为负载均衡实例分配的域名，本参数仅对传统型公网负载均衡才有意义',
    link: '',
    type: 'input',
  },
  {
    key: 'LoadBalancerVips',
    enDescriptor: 'LoadBalancer Vips',
    cnDescriptor: '负载均衡实例的 VIP 地址',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'BackendPrivateIps',
    enDescriptor: 'BackendPrivate Ips',
    cnDescriptor: '负载均衡绑定的后端服务的内网 IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'BackendPublicIps',
    enDescriptor: 'BackendPublic Ips',
    cnDescriptor: '负载均衡绑定的后端服务的外网 IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'ProjectId',
    enDescriptor: 'Project ID',
    cnDescriptor: '负载均衡实例所属的项目 ID',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'VpcId',
    enDescriptor: 'Vpc ID',
    cnDescriptor: '负载均衡实例所属私有网络',
    link: '',
    type: 'input',
  },
  {
    key: 'SecurityGroup',
    enDescriptor: 'Security Group',
    cnDescriptor: '安全组ID',
    link: '',
    type: 'input',
  },
  {
    key: 'MasterZone',
    enDescriptor: 'Master Zone',
    cnDescriptor: '主可用区ID',
    link: '',
    type: 'input',
  },
  {
    key: 'WithRs',
    enDescriptor: 'WithRs',
    cnDescriptor: '负载均衡是否绑定后端服务',
    link: '',
    type: 'select',
    list: WithRs,
  },
  {
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: OrderBy,
  },
  {
    key: 'OrderType',
    enDescriptor: 'OrderByType',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: OrderType,
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/214/30685',
  namespace,
  fieldDescriptor: LBPRIVATEFieldsDescriptor,
};
const LBFields = {
  LoadBalancerIds: [],
  Forward: undefined,
  LoadBalancerName: '',
  Domain: '',
  LoadBalancerVips: [],
  BackendPublicIps: [],
  BackendPrivateIps: [],
  Limit: 20,
  Offset: 0,
  ProjectId: undefined,
  WithRs: {},
  VpcId: '',
  SecurityGroup: '',
  MasterZone: '',
  OrderBy: {},
  OrderType: {},
};

const LBPRIVATE_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'LoadBalancerId',
  Port: '',
  Protocol: '',
  listener: '',
  // listenerAlias: 'ListenerId',
  queries: LBFields,
};

// function GetInstanceQueryParams(queries: any = {}) {
//   const params: any = {};
//   if (!_.isEmpty(queries)) {
//     params.Limit = _.get(queries, 'Limit', 20) || 20;
//     params.Offset = _.get(queries, 'Offset', 0) || 0;
//     queries = _.omit(queries, ['Offset', 'Limit']);
//     _.forEach(queries, (item: any, key) => {
//       if (_.isArray(item)) {
//         item = _.compact(item);
//         if (item.length > 0) {
//           params[key] = _.uniq(item);
//         }
//       } else if (_.isObject(item)) {
//         if (_.isNumber(_.get(item, 'value', undefined)) || !_.isEmpty(_.get(item, 'value', undefined))) {
//           params[key] = _.get(item, 'value');
//         }
//       } else if (_.isNumber(item) || !_.isEmpty(item)) {
//         params[key] = item;
//       }
//     });
//   }
//   return params;
// }

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
const LBPRIVATEInstanceAliasList = ['LoadBalancerId', 'LoadBalancerName', 'LoadBalancerVips'];
// const LBPRIVATEListenerAliasList = ['ListenerId', 'ListenerName', 'Port'];
const LBPRIVATEVALIDDIMENSIONS = {
  vip: 'LoadBalancerVips',
  vpcId: 'NumericalVpcId',
  loadBalancerPort: 'Port',
  protocol: 'Protocol',
};
// dimensionObject[item] = { Name: item, Value: '' };
// const LBPRIVATE_INSTANCE_DIMENSIONOBJECTS = {
//   vip: { Name: 'vip', Value: '' },
// };
// const LBPRIVATE_LISTENER_DIMENSIONOBJECTS = {
//   vip: { Name: 'vip', Value: '' },
//   loadBalancerPort: { Name: 'loadBalancerPort', Value: '' },
//   protocol: { Name: 'protocol', Value: '' },
// };
const templateQueryIdMap = {
  instance: 'LoadBalancerId',
  listener: 'ListenerId',
};
// 需要缓存到storage的内容的key列表
const keyInStorage = {
  listener: 'ListenerList',
};
/*
如果有InstanceId额外的维度，原则上都需要传入此map结构配置
key的含义：
  经过InvalidDemensions处理后的string。topicId =》TopicId。
  否则认为指标中维度正确，和指标中维度字段保持一致，即topicId
value的含义：
  1 dim_KeyInStorage 指标中维度dimension对应的storage中的key，获取缓存列表，sourceMapList、
  2 dim_KeyInTarget  通过getVariable方法获取变量中选中项。比如ListnerId为Lis-xxxx；即：STATE中的key。
                    默认取通过InvalidDemsion处理后的key
  3 dim_KeyInMap     保存在模板变量value比如（监听器ID）源自sourceMapList（接口返回内容）的哪个key（ListenerId）。
                    即：templateQueryIdMap中内容。
                    联合上面2的内容筛选出原始sourceMap
*/
const queryMonitorExtraConfg = {
  Port: {
    dim_KeyInStorage: keyInStorage.listener,
    dim_KeyInTarget: 'listener',
    dim_KeyInMap: templateQueryIdMap.listener,
  },
  Protocol: {
    dim_KeyInStorage: keyInStorage.listener,
    dim_KeyInTarget: 'listener',
    dim_KeyInMap: templateQueryIdMap.listener,
  },
};
export default LBPRIVATE_STATE;
export {
  LBPRIVATEFieldsDescriptor,
  LBPRIVATEInstanceAliasList,
  // LBPRIVATEListenerAliasList,
  LBPRIVATEVALIDDIMENSIONS,
  templateQueryIdMap,
  // LBPRIVATE_LISTENER_DIMENSIONOBJECTS,
  // LBPRIVATE_INSTANCE_DIMENSIONOBJECTS,
  queryMonitorExtraConfg,
  keyInStorage,
  queryEditorConfig,
  namespace,
  GetInstanceQueryParams as LBPRIVATEGetInstanceQueryParams,
};
