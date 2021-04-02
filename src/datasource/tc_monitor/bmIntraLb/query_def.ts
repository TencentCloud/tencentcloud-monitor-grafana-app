// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/BM_INTRA_LB';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'bmIntraLbQuery';

const BMINTRALBInvalidDemensions = {
  vip: 'LoadBalancerVips',
};

// 要和文件名方式一致，ceip_summary=>CEIPSUMMARY
const BMINTRALBInstanceAliasList = ['LoadBalancerId', 'LoadBalancerVips', 'LoadBalancerName'];

const templateQueryIdMap = {
  instance: 'LoadBalancerId',
};

// select类型需要注意是{},multi后缀是[],dropdown是类型
const BMINTRALBFilterFields = {
  Limit: 20,
  Offset: 0,
  LoadBalancerIds: [],
  LoadBalancerName: [],
  LoadBalancerVips: [],
};

const BMINTRALBFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'LoadBalancerIds',
    enDescriptor: 'LoadBalancerIds',
    cnDescriptor: '负载均衡器ID数组',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'LoadBalancerName',
    enDescriptor: 'LoadBalancerName',
    cnDescriptor: '负载均衡器名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'LoadBalancerVips',
    enDescriptor: 'LoadBalancerVips',
    cnDescriptor: '负载均衡获得的公网IP地址',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/1027/33280',
  namespace,
  fieldDescriptor: BMINTRALBFilterFieldsDescriptor,
};

const BMINTRALB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'LoadBalancerId',
  queries: BMINTRALBFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
export default BMINTRALB_STATE;
export {
  BMINTRALBFilterFieldsDescriptor,
  templateQueryIdMap,
  BMINTRALBInstanceAliasList,
  BMINTRALBInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as BMINTRALBGetInstanceQueryParams,
};
