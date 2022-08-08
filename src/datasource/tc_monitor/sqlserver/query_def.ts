// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
import _ from 'lodash';

const namespace = 'QCE/SQLSERVER';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'sqlserverQuery';

const SQLSERVERInvalidDemensions = {
  resourceId: 'InstanceId',
};

const SQLSERVERInstanceAliasList = ['InstanceId', 'Name'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[]
const SQLSERVERNETFilterFields = {
  Limit: 20,
  Offset: 0,
  ProjectId: null,
  Status: {},
  InstanceIdSet: [],
  PayMode: {},
  VpcId: '',
  SubnetId: '',
  VipSet: [],
  InstanceNameSet: [],
  VersionSet: [],
  Zone: '',
};

const SQLSERVERNETFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'ProjectId',
    enDescriptor: 'ProjectId',
    cnDescriptor: '项目ID',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'Status',
    enDescriptor: 'Status',
    cnDescriptor: '实例状态',
    link: '',
    type: 'select',
    list: [
      { text: '申请中', value: 1 },
      { text: '运行中', value: 2 },
      { text: '受限运行中 (主备切换中)', value: 3 },
      { text: '已隔离', value: 4 },
      { text: '回收中', value: 5 },
      { text: '已回收', value: 6 },
      { text: '任务执行中', value: 7 },
      { text: '已下线', value: 8 },
      { text: '实例扩容中', value: 9 },
      { text: '实例迁移中', value: 10 },
      { text: '只读', value: 11 },
      { text: '重启中', value: 12 },
    ],
  },
  {
    key: 'InstanceIdSet',
    enDescriptor: 'InstanceIdSet',
    cnDescriptor: '实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'PayMode',
    enDescriptor: 'PayMode',
    cnDescriptor: '子网实例ID',
    link: '',
    type: 'select',
    list: [
      { text: '包年包月', value: 1 },
      { text: '按量计费', value: 0 },
    ],
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '实例所属VPC的唯一字符串ID',
    link: '',
    type: 'input',
  },
  {
    key: 'SubnetId',
    enDescriptor: 'SubnetId',
    cnDescriptor: '实例所属子网的唯一字符串ID',
    link: '',
    type: 'input',
  },
  {
    key: 'VipSet',
    enDescriptor: 'VipSet',
    cnDescriptor: '实例内网地址列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'InstanceNameSet',
    enDescriptor: 'InstanceNameSet',
    cnDescriptor: '实例名称列表, 模糊查询',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'VersionSet',
    enDescriptor: 'VersionSet',
    cnDescriptor: '实例版本代号列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Zone',
    enDescriptor: 'Zone',
    cnDescriptor: '实例可用区',
    link: '',
    type: 'dropdown',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/238/19969',
  namespace,
  fieldDescriptor: SQLSERVERNETFilterFieldsDescriptor,
};

// regions for dropdown
const regionSupported = [
  { value: 'ap-beijing' },
  { value: 'ap-chengdu' },
  { value: 'ap-chongqing' },
  { value: 'ap-guangzhou' },
  { value: 'ap-hongkong' },
  { value: 'ap-nanjing' },
  { value: 'ap-seoul' },
  { value: 'ap-shanghai' },
  { value: 'ap-shanghai-fsi' },
  { value: 'ap-shenzhen-fsi' },
  { value: 'ap-singapore' },
  { value: 'ap-tokyo' },
  { value: 'eu-moscow' },
  { value: 'na-siliconvalley' },
];
const SQLSERVER_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: SQLSERVERNETFilterFields,
};

function modifyDimensons(metricItem) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['resourceId'];
  });
  return metricTmp;
}
function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
export default SQLSERVER_STATE;
export {
  SQLSERVERNETFilterFieldsDescriptor,
  templateQueryIdMap,
  SQLSERVERInstanceAliasList,
  SQLSERVERInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regionSupported,
  modifyDimensons,
  // 对应产品的service的全大写拼接InstanceQueryParams
  GetInstanceQueryParams as SQLSERVERGetInstanceQueryParams,
};
