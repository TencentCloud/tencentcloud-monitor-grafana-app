// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/TDMQ';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'tdmqQuery';

const TDMQInvalidDemensions = {
  namespace: 'NamespaceName',
  topic: 'TopicName',
  subscriptionname: 'SubscriptionName',
  tenant: 'tenant',
};

// 需和文件名对应
const TDMQInstanceAliasList = ['NamespaceName', 'NamespaceId'];

const templateQueryIdMap = {
  instance: 'NamespaceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const TDMQFilterFields = {
  Limit: 20,
  Offset: 0,
  EnvironmentId: '',
  ClusterId: '',
};

const TDMQFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'EnvironmentId',
    enDescriptor: 'EnvironmentId',
    cnDescriptor: '命名空间名称',
    link: '',
    type: 'input',
  },
  {
    key: 'ClusterId',
    enDescriptor: 'ClusterId',
    cnDescriptor: 'Pulsar 集群的ID',
    link: '',
    type: 'input',
  },
];

const CDNPROVINCE_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'NamespaceName',
  // 此处key应该是经过TDMQInvalidDemensions处理后的
  TopicName: '',
  subscriptionname: '',
  tenant: '',
  queries: TDMQFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
const regionSupported = [
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
];
export default CDNPROVINCE_STATE;
export {
  TDMQFilterFieldsDescriptor,
  templateQueryIdMap,
  TDMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  queryEditorName,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as TDMQGetInstanceQueryParams,
};