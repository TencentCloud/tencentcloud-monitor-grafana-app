// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
import _ from 'lodash';

const namespace = 'QCE/CLS';
const queryEditorName = 'clsQuery';

const CLSInvalidDemensions = {
  // instanceid: 'TopicId',
};

// 需和文件名对应
const CLSInstanceAliasList = ['TopicId', 'TopicName'];

const templateQueryIdMap = {
  instance: 'TopicId',
};

// 需要缓存到storage的内容的key列表
// const keyInStorage = {
//   fleet: 'fleet', // 实例队列
//   queue: 'queueName', // 会话队列
// };
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
// const queryMonitorExtraConfg = {
//   FleetId: {
//     dim_KeyInStorage: keyInStorage.fleet,
//     dim_KeyInTarget: 'FleetId',
//     dim_KeyInMap: templateQueryIdMap.FleetId,
//   },
//   Name: {
//     dim_KeyInStorage: keyInStorage.queue,
//     dim_KeyInTarget: 'Name',
//     dim_KeyInMap: templateQueryIdMap.Name,
//   },
// };
// select类型需要注意是{},multi后缀是[],dropdown是''
const CLSFilterFields = {
  Limit: 20,
  Offset: 0,
  topicName: [],
  topicId: [],
  logsetName: [],
  logsetId: [],
  tagKey: [],
  'tag:tagKey': [],
  storageType: {},
};

const CLSFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'topicName',
    enDescriptor: 'topicName',
    cnDescriptor: '日志主题名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'topicId',
    enDescriptor: 'topicId',
    cnDescriptor: '日志主题ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'logsetName',
    enDescriptor: 'logsetName',
    cnDescriptor: '日志集名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'logsetId',
    enDescriptor: 'logsetId',
    cnDescriptor: '日志集ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'tagKey',
    enDescriptor: 'tagKey',
    cnDescriptor: '标签键',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'tag:tagKey',
    enDescriptor: 'tag - tagKey',
    cnDescriptor: '标签键值对',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'storageType',
    enDescriptor: 'storageType',
    cnDescriptor: '日志主题的存储类型',
    link: '',
    type: 'select',
    list: [
      { text: '实时存储', value: 'hot' },
      { text: '离线存储', value: 'cold' },
    ],
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/614/56454',
  namespace,
  fieldDescriptor: CLSFilterFieldsDescriptor,
};

const CLS_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'TopicId',
  uin: '',
  queries: CLSFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
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
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    // item.Dimensions = item.Dimensions.map((v) => CLSInvalidDemensions[v] || v);
    item.Dimensions = ['uin', 'TopicId'];
  });
  return metricTmp;
}
export default CLS_STATE;
export {
  CLSFilterFieldsDescriptor,
  templateQueryIdMap,
  CLSInstanceAliasList,
  CLSInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regionSupported,
  modifyDimensons,
  // queryMonitorExtraConfg,
  // fleetId,
  // keyInStorage,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as CLSGetInstanceQueryParams,
};
