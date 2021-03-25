// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/BM_PCX';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'bmPcxQuery';

const BMPCXInvalidDemensions = {
  peeringConnectionId: 'VpcPeerConnectionId',
};

// 要和文件名方式一致，ceip_summary=>CEIPSUMMARY
const BMPCXInstanceAliasList = ['VpcPeerConnectionId', 'VpcPeerConnectionName'];

const templateQueryIdMap = {
  instance: 'VpcPeerConnectionId',
};

// select类型需要注意是{},multi后缀是[],dropdown是类型
const BMPCXFilterFields = {
  Limit: 20,
  Offset: 0,
  VpcPeerConnectionIds: [],
};

const BMPCXFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'VpcPeerConnectionIds',
    enDescriptor: 'VpcPeerConnectionIds',
    cnDescriptor: '对等连接实例ID',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/product/1024/36903',
  namespace,
  fieldDescriptor: BMPCXFilterFieldsDescriptor,
};

const BMPCX_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: BMPCXFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
export default BMPCX_STATE;
export {
  BMPCXFilterFieldsDescriptor,
  templateQueryIdMap,
  BMPCXInstanceAliasList,
  BMPCXInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as BMPCXGetInstanceQueryParams,
};
