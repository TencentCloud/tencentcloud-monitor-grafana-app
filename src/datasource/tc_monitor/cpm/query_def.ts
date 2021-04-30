// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
import _ from 'lodash';

const namespace = 'QCE/CPM';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'cpmQuery';

const CPMInvalidDemensions = {
  instanceId: 'InstanceId',
  // uniqid: 'InstanceId',
};

const CPMInstanceAliasList = ['InstanceId', 'Name'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const CPMFilterFields = {
  Limit: 20,
  Offset: 0,
  DeviceClassCode: '',
  InstanceIds: [],
  WanIps: [],
  LanIps: [],
  Alias: '',
  VagueIp: '',
  AutoRenewFlag: {},
  VpcId: '',
  SubnetId: '',
  DeviceType: {},
  IsLuckyDevice: {},
};

const CPMFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'DeviceClassCode',
    enDescriptor: 'DeviceClassCode',
    cnDescriptor: '机型ID',
    link: '',
    type: 'dropdown',
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '设备ID数组',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'WanIps',
    enDescriptor: 'WanIps',
    cnDescriptor: '外网IP数组',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'LanIps',
    enDescriptor: 'LanIps',
    cnDescriptor: '内网IP数组',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Alias',
    enDescriptor: 'Alias',
    cnDescriptor: '设备名称',
    link: '',
    type: 'input',
  },
  {
    key: 'VagueIp',
    enDescriptor: 'VagueIp',
    cnDescriptor: '模糊IP查询',
    link: '',
    type: 'input',
  },
  {
    key: 'AutoRenewFlag',
    enDescriptor: 'AutoRenewFlag',
    cnDescriptor: '自动续费标志',
    link: '',
    type: 'select',
    list: [
      { text: '不自动续费', value: 0 },
      { text: '自动续费', value: 1 },
    ],
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '私有网络唯一ID',
    link: '',
    type: 'input',
  },
  {
    key: 'SubnetId',
    enDescriptor: 'SubnetId',
    cnDescriptor: '子网唯一ID',
    link: '',
    type: 'input',
  },
  {
    key: 'DeviceType',
    enDescriptor: 'DeviceType',
    cnDescriptor: '子网实例ID',
    link: '',
    type: 'select',
    list: [
      { text: '计算型', value: 'compute' },
      { text: '标准型', value: 'standard' },
      { text: '存储型', value: 'storage' },
    ],
  },
  {
    key: 'IsLuckyDevice',
    enDescriptor: 'IsLuckyDevice',
    cnDescriptor: '竞价实例机器过滤',
    link: '',
    type: 'select',
    list: [
      { text: '非竞价实例机器', value: 0 },
      { text: '竞价实例的机器', value: 1 },
    ],
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/386/32904',
  namespace,
  fieldDescriptor: CPMFilterFieldsDescriptor,
};

const CPM_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: CPMFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}

function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['instanceId'];
  });
  return metricTmp;
}
export default CPM_STATE;
export {
  CPMFilterFieldsDescriptor,
  templateQueryIdMap,
  CPMInstanceAliasList,
  CPMInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as CPMGetInstanceQueryParams,
};
