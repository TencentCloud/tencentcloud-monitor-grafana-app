import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/VPNX';
const queryEditorName = 'vpnxQuery';

const VPNXInvalidDemensions = {
  vpnConnId: 'VpnConnectionId',
};

const VPNXInstanceAliasList = ['VpnConnectionId', 'VpnConnectionName'];

const templateQueryIdMap = {
  instance: 'VpnConnectionId',
};

// select类型需要注意是{},multi后缀是[]
const VPNXFilterFields = {
  Limit: 20,
  Offset: 0,
  'vpc-id': [],
  'vpn-gateway-id': [],
  'customer-gateway-id': [],
  'vpn-connection-name': [],
  'vpn-connection-id': [],
};

const VPNXFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'vpn-gateway-id',
    enDescriptor: 'vpn-gateway-id',
    cnDescriptor: 'VPN实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'customer-gateway-id ',
    enDescriptor: 'customer-gateway-id ',
    cnDescriptor: '对端网关实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'vpn-connection-name',
    enDescriptor: 'vpn-connection-name',
    cnDescriptor: '通道名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'vpn-connection-id',
    enDescriptor: 'vpn-connection-id',
    cnDescriptor: '通道实例ID',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/215/17515',
  namespace,
  fieldDescriptor: VPNXFilterFieldsDescriptor,
};

const VPNX_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'VpnConnectionId',
  queries: VPNXFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
export default VPNX_STATE;
export {
  VPNXFilterFieldsDescriptor,
  templateQueryIdMap,
  VPNXInstanceAliasList,
  VPNXInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  GetInstanceQueryParams as VPNXGetInstanceQueryParams,
};
