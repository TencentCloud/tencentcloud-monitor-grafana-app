import * as _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/ECM_LB';
const queryEditorName = 'ecmLbQuery';

const ECMLBInvalidDemensions = {
  vip: 'LoadBalancerVips',
};

const ECMLBInstanceAliasList = ['LoadBalancerId', 'LoadBalancerName'];

const templateQueryIdMap = {
  instance: 'LoadBalancerId',
};

// select类型需要注意是{},multi后缀是[]
const ECMLBFilterFields = {
  Limit: 20,
  Offset: 0,
  LoadBalancerIds: [],
  LoadBalancerName: [],
  LoadBalancerVips: [],
  BackendPrivateIps: [],
  VpcId: '',
};

const ECMLBFilterFieldsDescriptor: FildDescriptorType = [
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
  {
    key: 'BackendPrivateIps',
    enDescriptor: 'BackendPrivateIps',
    cnDescriptor: '绑定的后端服务的内网 IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '实例所属私有网络唯一ID',
    link: '',
    type: 'input',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/1108/48459',
  namespace,
  fieldDescriptor: ECMLBFilterFieldsDescriptor,
};

const ECM_STATE = {
  region: 'ap-guangzhou',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'LoadBalancerId',
  queries: ECMLBFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
// function isValidMetric(metricObj: any = {}) {
//   const dimension = _.get(metricObj, 'Dimensions[0].Dimensions');
//   // console.log('dimension', dimension, dimension.length === 1 && _.indexOf(dimension, 'diskId') !== -1);
//   return dimension.length === 1 &&( _.indexOf(dimension, 'UUID') !== -1 || _.indexOf(dimension, 'uuid') !== -1);
// }

function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    // item.Dimensions = ['UUID'];
  });
  return metricTmp;
}
export default ECM_STATE;
export {
  ECMLBFilterFieldsDescriptor,
  templateQueryIdMap,
  ECMLBInstanceAliasList,
  ECMLBInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as ECMLBGetInstanceQueryParams,
};
