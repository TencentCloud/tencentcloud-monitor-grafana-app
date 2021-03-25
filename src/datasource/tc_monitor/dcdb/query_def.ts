// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { isArray } from 'lodash';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/DCDB';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'dcdbQuery';

const DCDBInvalidDemensions = {
  uuid: 'InstanceId',
};

// 需和文件名对应
const DCDBInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const DCDBFilterFields = {
  Limit: 20,
  Offset: 0,
  InstanceIds: [],
  SearchName: '',
  SearchKey: '',
  ProjectIds: [],
  // IsFilterVpc
  VpcId: '',
  SubnetId: '',

  OrderBy: {},
  OrderByType: {},
  // IsFilterExcluster: {},
  ExclusterType: {},

  ExclusterIds: [],
  FilterInstanceType: {},
};

const DCDBFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '实例 ID 查询',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'SearchName',
    enDescriptor: 'SearchName',
    cnDescriptor: '搜索的字段名,当前支持的值有：instancename、vip、all',
    link: '',
    type: 'input',
  },
  {
    key: 'SearchKey',
    enDescriptor: 'SearchKey',
    cnDescriptor: '搜索的关键字',
    link: '',
    type: 'input',
  },
  {
    key: 'ProjectIds',
    enDescriptor: 'ProjectIds',
    cnDescriptor: '按项目 ID 查询',
    link: '',
    type: 'inputNumberMulti',
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '私有网络 ID',
    link: '',
    type: 'input',
  },
  {
    key: 'SubnetId',
    enDescriptor: 'SubnetId',
    cnDescriptor: '私有网络的子网 ID',
    link: '',
    type: 'input',
  },
  {
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: 'projectId', value: 'projectId' },
      { text: 'createtime', value: 'createtime' },
      { text: 'instancename', value: 'instancename' },
    ],
  },
  {
    key: 'OrderByType',
    enDescriptor: 'OrderByType',
    cnDescriptor: '私有网络 ID',
    link: '',
    type: 'select',
    list: [
      { text: 'desc', value: 'desc' },
      { text: 'asc', value: 'asc' },
    ],
  },
  {
    key: 'ExclusterType',
    enDescriptor: 'ExclusterType',
    cnDescriptor: '集群类型',
    link: '',
    type: 'select',
    list: [
      { text: '非独享集群', value: 1 },
      { text: '独享集群', value: 2 },
      { text: '全部', value: 0 },
      { text: 'asc', value: 'asc' },
    ],
  },
  {
    key: 'ExclusterIds',
    enDescriptor: 'ExclusterIds',
    cnDescriptor: '独享集群ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'FilterInstanceType',
    enDescriptor: 'FilterInstanceType',
    cnDescriptor: '实例类型过滤',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '独享实例', value: 1 },
      { text: '主实例', value: 2 },
      { text: '灾备实例', value: 3 },
    ],
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/557/16140',
  namespace,
  fieldDescriptor: DCDBFilterFieldsDescriptor,
};

const DCDB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: DCDBFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  const params = instanceQueryParamsBaseParse(queries, false);
  // 特殊处理
  params.IsFilterVpc = false;
  params.IsFilterExcluster = false;
  if (params.VpcId || params.SubnetId) params.IsFilterVpc = true;
  if (params.ExclusterType) params.IsFilterExcluster = true;
  if (isArray(params.FilterInstanceType)) params.FilterInstanceType = params.FilterInstanceType.join(',');
  return params;
}
// 和其他产品的展示保持一致
const regionSupported = [
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '西南地区(重庆)', value: 'ap-chongqing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '亚太南部(孟买)', value: 'ap-mumbai' },
  { text: '华东地区(南京)', value: 'ap-nanjing' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '亚太东北(东京)', value: 'ap-tokyo' },
  { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
  { text: '美国东部(弗吉尼亚)', value: 'na-ashburn' },
  { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
  { text: '北美地区(多伦多)', value: 'na-toronto' },
];
export default DCDB_STATE;
export {
  DCDBFilterFieldsDescriptor,
  templateQueryIdMap,
  DCDBInstanceAliasList,
  DCDBInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as DCDBGetInstanceQueryParams,
};
