// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/BM_LB';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'bmLbQuery';

const CPMInvalidDemensions = {
  vip: 'Eip',
};

// 要和文件名方式一致，ceip_summary=>CEIPSUMMARY
const BMLBInstanceAliasList = ['EipId', 'Eip', 'EipName'];

const templateQueryIdMap = {
  instance: 'EipId',
};

// select类型需要注意是{},multi后缀是[],dropdown是类型
const CPMFilterFields = {
  Limit: 20,
  Offset: 0,
  EipIds: [],
  Eips: [],
  InstanceIds: [],
  SearchKey: [],
  OrderField: {},
  Order: {},
  PayMode: {},
  VpcId: '',
  BindTypes: [],
  ExclusiveTag: {},
  AclId: '',
  BindAcl: {},
};

const CPMFilterFieldsDescriptor: FildDescriptorType = [
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
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为100',
    link: '',
    type: 'inputNumber',
    min: 1,
    max: 100,
  },
  {
    key: 'EipIds',
    enDescriptor: 'EipIds',
    cnDescriptor: 'EIP实例ID列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Eips',
    enDescriptor: 'Eips',
    cnDescriptor: 'EIP IP 列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '主机实例ID 列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'SearchKey',
    enDescriptor: 'SearchKey',
    cnDescriptor: 'EIP名称,模糊匹配',
    link: '',
    type: 'input',
  },
  {
    key: 'OrderField',
    enDescriptor: 'OrderField',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: 'EipId', value: 'EipId' },
      { text: 'Eip', value: 'Eip' },
      { text: 'Status', value: 'Status' },
      { text: 'InstanceId', value: 'InstanceId' },
      { text: 'CreatedAt', value: 'CreatedAt' },
    ],
  },
  {
    key: 'Order',
    enDescriptor: 'Order',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: [
      { text: '递增', value: 0 },
      { text: '递减', value: 1 },
    ],
  },
  {
    key: 'PayMode',
    enDescriptor: 'PayMode',
    cnDescriptor: '计费模式',
    link: '',
    type: 'select',
    list: [
      { text: '流量', value: 'flow' },
      { text: '带宽', value: 'bandwidth' },
    ],
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: 'EIP归属VpcId',
    link: '',
    type: 'input',
  },
  {
    key: 'BindTypes',
    enDescriptor: 'BindTypes',
    cnDescriptor: '绑定类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '未绑定', value: -1 },
      { text: '物理机', value: 0 },
      { text: 'nat网关', value: 1 },
      { text: '虚拟IP', value: 2 },
      { text: '托管机器', value: 3 },
    ],
  },
  {
    key: 'ExclusiveTag',
    enDescriptor: 'ExclusiveTag',
    cnDescriptor: '独占标志',
    link: '',
    type: 'select',
    list: [
      { text: '共享', value: 0 },
      { text: '独占', value: 1 },
    ],
  },
  {
    key: 'BindAcl',
    enDescriptor: 'BindAcl',
    cnDescriptor: '是否绑定了EIP ACL',
    link: '',
    type: 'select',
    list: [
      { text: '未绑', value: 0 },
      { text: '绑定', value: 1 },
    ],
  },
  {
    key: 'AclId',
    enDescriptor: 'AclId',
    cnDescriptor: 'EIP ACL实例ID',
    link: '',
    type: 'input',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/1028/32853',
  namespace,
  fieldDescriptor: CPMFilterFieldsDescriptor,
};

const CPM_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: CPMFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
export default CPM_STATE;
export {
  CPMFilterFieldsDescriptor,
  templateQueryIdMap,
  BMLBInstanceAliasList,
  CPMInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as BMLBGetInstanceQueryParams,
};
