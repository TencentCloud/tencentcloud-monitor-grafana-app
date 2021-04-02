// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/CES';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'cesQuery';

const CESInvalidDemensions = {
  uInstanceId: 'InstanceId',
};

const CESInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是类型
const CESFilterFields = {
  Limit: 20,
  Offset: 0,
  InstanceIds: [],
  InstanceNames: [],
  OrderByKey: {},
  OrderByType: {},
  IpList: [],
};

const CESFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '集群实例ID列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'InstanceNames',
    enDescriptor: 'InstanceNames',
    cnDescriptor: '集群实例名称列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'OrderByKey',
    enDescriptor: 'OrderByKey',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: '实例ID', value: 1 },
      { text: '实例名称', value: 2 },
      { text: '可用区', value: 3 },
      { text: '创建时间', value: 4 },
    ],
  },
  {
    key: 'OrderByType',
    enDescriptor: 'OrderByType',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: [
      { text: '升序', value: 0 },
      { text: '降序', value: 1 },
    ],
  },
  {
    key: 'IpList',
    enDescriptor: 'IpList',
    cnDescriptor: '私有网络vip列表',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/845/30631',
  namespace,
  fieldDescriptor: CESFilterFieldsDescriptor,
};

const CES_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: CESFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
export default CES_STATE;
export {
  CESFilterFieldsDescriptor,
  templateQueryIdMap,
  CESInstanceAliasList,
  CESInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as CESGetInstanceQueryParams,
};
