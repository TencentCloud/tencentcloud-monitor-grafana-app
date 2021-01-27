import * as _ from 'lodash';

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
  { text: '降序', value: 1 }
];

const WithRs = [
  { text: '没有绑定后端服务', value: 0 },
  { text: '绑定后端服务', value: 1 },
  { text: '查询全部', value: -1 },
];
const LBPUBLICFieldsDescriptor = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputnumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1',
    link: '',
    type: 'inputnumber',
    min: 1,
  },
  {
    key: 'LoadBalancerIds',
    enDescriptor: 'LoadBalancer ID',
    cnDescriptor: '实例ID',
    link: '',
    type: 'inputmulti'
  },
  {
    key: 'LoadBalancerName',
    enDescriptor: 'LoadBalancer Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'input'
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
    type: 'input'
  },
  {
    key: 'LoadBalancerVips',
    enDescriptor: 'LoadBalancer Vips',
    cnDescriptor: '负载均衡实例的 VIP 地址',
    link: '',
    type: 'inputmulti'
  },
  {
    key: 'BackendPrivateIps',
    enDescriptor: 'BackendPrivate Ips',
    cnDescriptor: '负载均衡绑定的后端服务的内网 IP',
    link: '',
    type: 'inputmulti'
  },
  {
    key: 'BackendPublicIps',
    enDescriptor: 'BackendPublic Ips',
    cnDescriptor: '负载均衡绑定的后端服务的外网 IP',
    link: '',
    type: 'inputmulti'
  },
  {
    key: 'ProjectId',
    enDescriptor: 'Project ID',
    cnDescriptor: '负载均衡实例所属的项目 ID',
    link: '',
    type: 'inputnumber'
  },
  {
    key: 'VpcId',
    enDescriptor: 'Vpc ID',
    cnDescriptor: '负载均衡实例所属私有网络',
    link: '',
    type: 'input'
  },
  {
    key: 'SecurityGroup',
    enDescriptor: 'Security Group',
    cnDescriptor: '安全组ID',
    link: '',
    type: 'input'
  },
  {
    key: 'MasterZone',
    enDescriptor: 'Master Zone',
    cnDescriptor: '主可用区ID',
    link: '',
    type: 'input'
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

const LBPublicFields = {
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

const LBPUBLIC_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'LoadBalancerId',
  listener: '',
  listenerAlias: 'ListenerId',
  queries: Object.assign({}, LBPublicFields),
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    queries = _.omit(queries, ['Offset', 'Limit']);
    _.forEach(queries, (item: any, key) => {
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          params[key] = _.uniq(item);
        }
      } else if (_.isObject(item)) {
        if (_.isNumber(_.get(item, 'value', undefined)) || !_.isEmpty(_.get(item, 'value', undefined))) {
          params[key] = _.get(item, 'value');
        }
      } else if (_.isNumber(item) || !_.isEmpty(item)) {
        params[key] = item;
      }
    });
  }
  return params;
}

const LBPUBLICInstanceAliasList = ['LoadBalancerId', 'LoadBalancerName', 'LoadBalancerVips'];
const LBPUBLICListenerAliasList = ['ListenerId', 'ListenerName', 'Port'];
const LBPUBLICVALIDDIMENSIONS = {
  vip: 'LoadBalancerVips',
  vpcId: 'NumericalVpcId',
  loadBalancerPort: 'Port',
  protocol: 'Protocol'
};
const LBPUBLICVALIDDIMENSIONOBJECTS = {
  vip: { Name: 'vip', Value: ''},
  loadBalancerPort: { Name: 'loadBalancerPort', Value: ''},
  protocol: { Name: 'protocol', Value: ''},
};
export default LBPUBLIC_STATE;
export {
  LBPUBLICFieldsDescriptor,
  LBPUBLICInstanceAliasList,
  LBPUBLICListenerAliasList,
  LBPUBLICVALIDDIMENSIONS,
  LBPUBLICVALIDDIMENSIONOBJECTS,
  GetInstanceQueryParams as LBPUBLICGetInstanceQueryParams,
};
