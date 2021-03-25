// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

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
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '西南地区(重庆)', value: 'ap-chongqing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '华东地区(南京)', value: 'ap-nanjing' },
  { text: '亚太东北(首尔)', value: 'ap-seoul' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '亚太东北(东京)', value: 'ap-tokyo' },
  { text: '欧洲地区(莫斯科)', value: 'eu-moscow' },
  { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
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
  // 对应产品的service的全大写拼接InstanceQueryParams
  GetInstanceQueryParams as SQLSERVERGetInstanceQueryParams,
};
