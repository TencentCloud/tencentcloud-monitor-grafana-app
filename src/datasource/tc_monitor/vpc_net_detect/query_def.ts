import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/VPC_NET_DETECT';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'vpcNetDetectQuery';

const VPCNETInvalidDemensions = {
  netdetectid: 'NetDetectId',
  netDetectId: 'NetDetectId',
};

const VPCNETDETECTInstanceAliasList = ['NetDetectId', 'NetDetectName'];

const templateQueryIdMap = {
  instance: 'NetDetectId',
};

// select类型需要注意是{},multi后缀是[]
const VPCNETFilterFields = {
  Limit: 20,
  Offset: 0,
  'vpc-id': [],
  'net-detect-id': [],
  'subnet-id': [],
  'net-detect-name': [],
};

const VPCNETFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'vpc-id',
    enDescriptor: 'vpc-id',
    cnDescriptor: 'VPC实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'net-detect-id',
    enDescriptor: 'net-detect-id',
    cnDescriptor: '网络探测实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'subnet-id',
    enDescriptor: 'subnet-id',
    cnDescriptor: '子网实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'net-detect-name',
    enDescriptor: 'net-detect-name',
    cnDescriptor: '网络探测名称',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/215/38696',
  namespace,
  fieldDescriptor: VPCNETFilterFieldsDescriptor,
};

const VPCNET_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'NetDetectId',
  queries: VPCNETFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['netDetectId'];
  });
  return metricTmp;
}
export default VPCNET_STATE;
export {
  VPCNETFilterFieldsDescriptor,
  templateQueryIdMap,
  VPCNETDETECTInstanceAliasList,
  VPCNETInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as VPCNETDETECTGetInstanceQueryParams,
};
