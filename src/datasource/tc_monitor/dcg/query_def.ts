import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/DCG';
const queryEditorName = 'dcgQuery';

const DCGInvalidDemensions = {
  directConnectGatewayId: 'DirectConnectGatewayId',
};

const DCGInstanceAliasList = ['DirectConnectGatewayId', 'DirectConnectGatewayName'];

const templateQueryIdMap = {
  instance: 'DirectConnectGatewayId',
};

// select类型需要注意是{},multi后缀是[]
const DCGFilterFields = {
  Limit: 20,
  Offset: 0,
  'direct-connect-gateway-id': [],
  'direct-connect-gateway-name': [],
  'direct-connect-gateway-ip': [],
  'gateway-type': {},
  'network-type': {},
  'ccn-id': [],
  'vpc-id': [],
};

const DCGFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'direct-connect-gateway-id',
    enDescriptor: 'direct-connect-gateway-id',
    cnDescriptor: '专线网关唯一ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'direct-connect-gateway-name',
    enDescriptor: 'direct-connect-gateway-name',
    cnDescriptor: '专线网关名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'direct-connect-gateway-ip',
    enDescriptor: 'direct-connect-gateway-ip',
    cnDescriptor: '专线网关IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'gateway-type',
    enDescriptor: 'gateway-type',
    cnDescriptor: '网关类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '普通型', value: 'NORMAL' },
      { text: 'NAT型', value: 'NAT' },
    ],
  },
  {
    key: 'network-type',
    enDescriptor: 'network-type',
    cnDescriptor: '网络类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '私有网络类型', value: 'VPC' },
      { text: '云联网类型', value: 'CCN' },
    ],
  },
  {
    key: 'ccn-id',
    enDescriptor: 'ccn-id',
    cnDescriptor: '专线网关所在云联网ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'vpc-id',
    cnDescriptor: '专线网关所在私有网络ID',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/215/30644',
  namespace,
  fieldDescriptor: DCGFilterFieldsDescriptor,
};

const DCG_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'DirectConnectGatewayId',
  queries: DCGFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
export default DCG_STATE;
export {
  DCGFilterFieldsDescriptor,
  templateQueryIdMap,
  DCGInstanceAliasList,
  DCGInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  GetInstanceQueryParams as DCGGetInstanceQueryParams,
};
