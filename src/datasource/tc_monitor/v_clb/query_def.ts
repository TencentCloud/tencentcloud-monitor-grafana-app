// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
import _ from 'lodash';

const namespace = 'QCE/V_CLB';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'vClbQuery';

const VCLBInvalidDemensions = {
  InstanceId: 'LoadBalancerId',
  // vip: 'LoadBalancerVips',
  // loadBalancerPort: 'Port',
  // protocol: 'Protocol',
};

// 要和文件名方式一致，ceip_summary=>CEIPSUMMARY
const VCLBInstanceAliasList = ['LoadBalancerId', 'LoadBalancerVips', 'LoadBalancerName'];

const templateQueryIdMap = {
  instance: 'LoadBalancerId',
};
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
const VCLBFilterFieldsDescriptor: FildDescriptorType = [
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
  fieldDescriptor: VCLBFilterFieldsDescriptor,
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

const VCLB_STATE = {
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

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}

// regions for dropdown
const regionSupported = [
  { value: 'ap-bangkok' },
  { value: 'ap-beijing' },
  { value: 'ap-chengdu' },
  { value: 'ap-chongqing' },
  { value: 'ap-guangzhou' },
  { value: 'ap-hongkong' },
  { value: 'ap-jakarta' },
  { value: 'ap-mumbai' },
  { value: 'ap-seoul' },
  { value: 'ap-nanjing' },
  { value: 'ap-shanghai' },
  { value: 'ap-shanghai-fsi' },
  { value: 'ap-shenzhen-fsi' },
  { value: 'ap-singapore' },
  { value: 'ap-tokyo' },
  { value: 'eu-frankfurt' },
  { value: 'eu-moscow' },
  { value: 'na-ashburn' },
  { value: 'na-siliconvalley' },
  { value: 'na-toronto' },
];
const clbNamespaceMap = {
  public: 'QCE/LB_PUBLIC',
  private: 'QCE/LB_PRIVATE',
};
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['InstanceId'];
  });
  return metricTmp;
}
export default VCLB_STATE;
export {
  VCLBFilterFieldsDescriptor,
  templateQueryIdMap,
  VCLBInstanceAliasList,
  VCLBInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  clbNamespaceMap,
  modifyDimensons,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as BMLBGetInstanceQueryParams,
};
