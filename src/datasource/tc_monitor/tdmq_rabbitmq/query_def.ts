// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
import _ from 'lodash';

const namespace = 'QCE/RABBITMQ';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'tdmqQuery';

const TDMQInvalidDemensions = {
  instanceid: 'InstanceId',
  node: 'NodeName',
};

// 需和文件名对应
const TDMQRABBITMQInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
  node: 'NodeName',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const TDMQFilterFields = {
  Limit: 20,
  Offset: 0,
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
];

const TDMQ_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  // 此处key应该是经过TDMQInvalidDemensions处理后的
  node: '',
  queries: TDMQFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
const regionSupported = [
  { value: 'ap-beijing' },
  { value: 'ap-chengdu' },
  { value: 'ap-chongqing' },
  { value: 'ap-guangzhou' },
  { value: 'ap-shenzhen-fsi' },
  { value: 'ap-shanghai' },
  { value: 'ap-shanghai-fsi' },
  { value: 'ap-nanjing' },
  { value: 'ap-hongkong' },
  { value: 'ap-tokyo' },
  { value: 'ap-seoul' },
  { value: 'ap-singapore' },
  { value: 'ap-bangkok' },
  { value: 'ap-jakarta' },
  { value: 'ap-mumbai' },
  { value: 'eu-frankfurt' },
  { value: 'eu-moscow' },
  { value: 'na-ashburn' },
  { value: 'na-siliconvalley' },
  { value: 'na-toronto' },
];

// 需要缓存到storage的内容的key列表
const keyInStorage = {
  node: 'NodeName',
};
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
const queryMonitorExtraConfg = {
  NodeName: {
    dim_KeyInStorage: keyInStorage.node,
    dim_KeyInTarget: 'node',
    dim_KeyInMap: templateQueryIdMap.node,
  },
};
export default TDMQ_STATE;
export {
  TDMQFilterFieldsDescriptor,
  templateQueryIdMap,
  TDMQRABBITMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  queryEditorName,
  queryMonitorExtraConfg,
  keyInStorage,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as TDMQGetInstanceQueryParams,
};
