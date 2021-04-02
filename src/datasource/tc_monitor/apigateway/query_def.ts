// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/APIGATEWAY';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'apigatewayQuery';

const APIGATEWAYInvalidDemensions = {
  serviceId: 'ServiceId',
  environmentName: 'EnvironmentName',
  apiid: 'Apiid',
  apiId: 'Apiid',
};

// 需和文件名对应
const APIGATEWAYInstanceAliasList = ['ServiceId', 'ServiceName'];

const templateQueryIdMap = {
  instance: 'ServiceId',
  environmentName: 'EnvironmentName',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const APIGATEWAYFilterFields = {
  Limit: 20,
  Offset: 0,
  ServiceId: [],
  ServiceName: [],
  NotUsagePlanId: [],
  Environment: [],
  IpVersion: [],
};

const APIGATEWAYFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'ServiceId',
    enDescriptor: 'ServiceId',
    cnDescriptor: '服务id',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'ServiceName',
    enDescriptor: 'ServiceName',
    cnDescriptor: '服务名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'NotUsagePlanId',
    enDescriptor: 'NotUsagePlanId',
    cnDescriptor: 'NotUsagePlanId',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Environment',
    enDescriptor: 'Environment',
    cnDescriptor: '环境名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'IpVersion',
    enDescriptor: 'IpVersion',
    cnDescriptor: 'IP版本',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/628/45198',
  namespace,
  fieldDescriptor: APIGATEWAYFilterFieldsDescriptor,
};

const APIGATEWAY_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'ServiceId',
  EnvironmentName: '',
  queries: APIGATEWAYFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
// regions for dropdown
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
export default APIGATEWAY_STATE;
export {
  APIGATEWAYFilterFieldsDescriptor,
  templateQueryIdMap,
  APIGATEWAYInstanceAliasList,
  APIGATEWAYInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as APIGATEWAYGetInstanceQueryParams,
};
