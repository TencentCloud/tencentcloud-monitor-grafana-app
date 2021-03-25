import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/CEIP_SUMMARY';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'ceipSummaryQuery';

const CEIPInvalidDemensions = {
  vip: 'AddressIp',
};

// 要和文件名方式一致，ceip_summary=>CEIPSUMMARY
const CEIPSUMMARYInstanceAliasList = ['AddressId', 'AddressName', 'AddressIp'];

const templateQueryIdMap = {
  instance: 'AddressId',
};

// select类型需要注意是{},multi后缀是[]
const CEIPFilterFields = {
  Limit: 20,
  Offset: 0,
  'address-id': [],
  'address-name': [],
  'address-ip': [],
  'address-status': {},
  'is-arrears': {},
  'address-isp': {},
  'instance-id': [],
  'private-ip-address': [],
  'network-interface-id': [],
};

const CEIPFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'address-id',
    enDescriptor: 'address-id',
    cnDescriptor: ' EIP 的唯一 ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'address-name',
    enDescriptor: 'address-name',
    cnDescriptor: 'EIP 名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'address-ip',
    enDescriptor: 'address-ip',
    cnDescriptor: 'EIP 的 IP 地址',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'address-status',
    enDescriptor: 'address-status',
    cnDescriptor: 'EIP 的状态',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: 'CREATING', value: 'CREATING' },
      { text: 'BINDING', value: 'BINDING' },
      { text: 'BIND', value: 'BIND' },
      { text: 'UNBINDING', value: 'UNBINDING' },
      { text: 'UNBIND', value: 'UNBIND' },
      { text: 'OFFLINING', value: 'OFFLINING' },
      { text: 'BIND_ENI', value: 'BIND_ENI' },
    ],
  },
  {
    key: 'instance-id',
    enDescriptor: 'instance-id',
    cnDescriptor: 'EIP 绑定的实例 ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'private-ip-address',
    enDescriptor: 'private-ip-address',
    cnDescriptor: 'EIP 绑定的内网 IP ',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'network-interface-id',
    enDescriptor: 'network-interface-id',
    cnDescriptor: ' EIP 绑定的弹性网卡 ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'is-arrears',
    enDescriptor: 'is-arrears',
    cnDescriptor: 'EIP 是否欠费',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '欠费状态', value: 'TRUE' },
      { text: '费用状态正常', value: 'FALSE' },
    ],
  },
  {
    key: 'address-isp',
    enDescriptor: 'address-isp',
    cnDescriptor: '运营商类型',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: 'BGP', value: 'BGP' },
      { text: 'CMCC', value: 'CMCC' },
      { text: 'CUCC', value: 'CUCC' },
      { text: 'CTCC', value: 'CTCC' },
    ],
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/215/16702',
  namespace,
  fieldDescriptor: CEIPFilterFieldsDescriptor,
};

const CEIP_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'AddressId',
  queries: CEIPFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
export default CEIP_STATE;
export {
  CEIPFilterFieldsDescriptor,
  templateQueryIdMap,
  CEIPSUMMARYInstanceAliasList,
  CEIPInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  GetInstanceQueryParams as CEIPSUMMARYGetInstanceQueryParams,
};
