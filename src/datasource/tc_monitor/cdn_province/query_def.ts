// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/CDN_LOG_DATA';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'cdnProvinceQuery';

const CDNPROVINCEInvalidDemensions = {
  domain: 'Domain',
  // isp: 'Isp',
  projectid: 'ProjectId',
  province: 'district',
  appid: 'AppId',
};

// 需和文件名对应
const CDNPROVINCEInstanceAliasList = ['Domain', 'ProjectId'];

const templateQueryIdMap = {
  instance: 'Domain',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const CDNPROVINCEFilterFields = {
  Limit: 20,
  Offset: 0,
  origin: [],
  domain: [],
  resourceId: [],
  status: {},
  serviceType: {},
  projectId: [],
  domainType: {},
  fullUrlCache: {},
  https: {},
  originPullProtocol: {},
  tagKey: [],
};

const CDNPROVINCEFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'origin',
    enDescriptor: 'origin',
    cnDescriptor: '主源站',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'domain',
    enDescriptor: 'domain',
    cnDescriptor: '域名',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'resourceId',
    enDescriptor: 'resourceId',
    cnDescriptor: '域名id',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'status',
    enDescriptor: 'status',
    cnDescriptor: '域名状态',
    link: '',
    type: 'select',
    list: [
      { text: 'online', value: 'online' },
      { text: 'offline', value: 'offline' },
      { text: 'processing', value: 'processing' },
    ],
  },
  {
    key: 'serviceType',
    enDescriptor: 'serviceType',
    cnDescriptor: '业务类型',
    link: '',
    type: 'select',
    list: [
      { text: 'web', value: 'web' },
      { text: 'download', value: 'download' },
      { text: 'media', value: 'media' },
    ],
  },
  {
    key: 'projectId',
    enDescriptor: 'projectId',
    cnDescriptor: '项目ID',
    link: '',
    type: 'inputNumberMulti',
  },
  {
    key: 'domainType',
    enDescriptor: 'domainType',
    cnDescriptor: '主源站类型',
    link: '',
    type: 'select',
    list: [
      { text: '自有源', value: 'cname' },
      { text: 'cos接入', value: 'cos' },
    ],
  },
  {
    key: 'fullUrlCache',
    enDescriptor: 'fullUrlCache',
    cnDescriptor: '全路径缓存',
    link: '',
    type: 'select',
    list: [
      { text: '打开', value: 'on' },
      { text: '关闭', value: 'off' },
    ],
  },
  {
    key: 'https',
    enDescriptor: 'https',
    cnDescriptor: '是否配置https',
    link: '',
    type: 'select',
    list: [
      { text: 'on', value: 'on' },
      { text: 'off', value: 'off' },
      { text: 'processing', value: 'processing' },
    ],
  },
  {
    key: 'originPullProtocol',
    enDescriptor: 'originPullProtocol',
    cnDescriptor: '回源协议类型',
    link: '',
    type: 'select',
    list: [
      { text: 'http', value: 'http' },
      { text: 'follow', value: 'follow' },
      { text: 'https', value: 'https' },
    ],
  },
  {
    key: 'tagKey',
    enDescriptor: 'tagKey',
    cnDescriptor: '标签键',
    link: '',
    type: 'inputMulti',
  },
];

const CDNPROVINCE_STATE = {
  region: 'ap-guangzhou',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'Domain',
  // Isp Province分别在两个接口，单独保存在state
  isp: '',
  district: '',
  queries: CDNPROVINCEFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
// const regionSupported = [
//   { text: '华北地区(北京)', value: 'ap-beijing' },
//   { text: '西南地区(成都)', value: 'ap-chengdu' },
//   { text: '西南地区(重庆)', value: 'ap-chongqing' },
//   { text: '华南地区(广州)', value: 'ap-guangzhou' },
//   { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
//   { text: '亚太南部(孟买)', value: 'ap-mumbai' },
//   { text: '华东地区(南京)', value: 'ap-nanjing' },
//   { text: '华东地区(上海)', value: 'ap-shanghai' },
//   { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
//   { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
//   { text: '亚太东南(新加坡)', value: 'ap-singapore' },
//   { text: '亚太东北(东京)', value: 'ap-tokyo' },
//   { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
//   { text: '美国东部(弗吉尼亚)', value: 'na-ashburn' },
//   { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
//   { text: '北美地区(多伦多)', value: 'na-toronto' },
// ];
export default CDNPROVINCE_STATE;
export {
  CDNPROVINCEFilterFieldsDescriptor,
  templateQueryIdMap,
  CDNPROVINCEInstanceAliasList,
  CDNPROVINCEInvalidDemensions,
  namespace,
  queryEditorName,
  // regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as CDNPROVINCEGetInstanceQueryParams,
};
