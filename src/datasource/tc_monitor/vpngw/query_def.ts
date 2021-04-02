import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/VPNGW';
const queryEditorName = 'vpngwQuery';

const VPNGWInvalidDemensions = {
  vpnGwId: 'VpnGatewayId',
};

const VPNGWInstanceAliasList = ['VpnGatewayId', 'VpnGatewayName'];

const templateQueryIdMap = {
  instance: 'VpnGatewayId',
};

// select类型需要注意是{},multi后缀是[]
const VPNGWFilterFields = {
  Limit: 20,
  Offset: 0,
  'vpc-id': [],
  'vpn-gateway-id': [],
  'vpn-gateway-name': [],
  type: {},
  'public-ip-address': [],
  'renew-flag': {},
  zone: [],
};

const VPNGWFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'vpn-gateway-name',
    enDescriptor: 'vpn-gateway-name',
    cnDescriptor: 'VPN实例名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'type',
    enDescriptor: 'type',
    cnDescriptor: 'VPN网关类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: 'IPSEC', value: 'IPSEC' },
      { text: 'SSL', value: 'SSL' },
    ],
  },
  {
    key: 'public-ip-address',
    enDescriptor: 'public-ip-address',
    cnDescriptor: '公网IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'renew-flag',
    enDescriptor: 'renew-flag',
    cnDescriptor: '网关续费类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '手动续费', value: 'NOTIFY_AND_MANUAL_RENEW' },
      { text: '自动续费', value: 'NOTIFY_AND_AUTO_RENEW' },
    ],
  },
  {
    key: 'zone',
    enDescriptor: 'zone',
    cnDescriptor: 'VPN所在可用区',
    link: '',
    type: 'dropdownMulti',
  },
];

const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/215/17514',
  namespace,
  fieldDescriptor: VPNGWFilterFieldsDescriptor,
};

const VPNGW_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'VpnGatewayId',
  queries: VPNGWFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
export default VPNGW_STATE;
export {
  VPNGWFilterFieldsDescriptor,
  templateQueryIdMap,
  VPNGWInstanceAliasList,
  VPNGWInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  GetInstanceQueryParams as VPNGWGetInstanceQueryParams,
};
