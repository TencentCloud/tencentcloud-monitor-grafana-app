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
  { text: '亚太东南(曼谷)', value: 'ap-bangkok' },
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '西南地区(重庆)', value: 'ap-chongqing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '亚太东南（雅加达）', value: 'ap-jakarta' },
  { text: '亚太南部(孟买)', value: 'ap-mumbai' },
  { text: '亚太东北(首尔)', value: 'ap-seoul' },
  { text: '华东地区(南京)', value: 'ap-nanjing' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '亚太东北(东京)', value: 'ap-tokyo' },
  { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
  { text: '欧洲地区(莫斯科)', value: 'eu-moscow' },
  { text: '美国东部(弗吉尼亚)', value: 'na-ashburn' },
  { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
  { text: '北美地区(多伦多)', value: 'na-toronto' },
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
