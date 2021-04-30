// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/ECM_BLOCK_STORAGE';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'ecmBlockStorageQuery';

const ECMBLOCKSTORAGEInvalidDemensions = {
  uuid: 'UUID',
};

// 需和文件名对应
const ECMBLOCKSTORAGEInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const ECMBLOCKSTORAGEFilterFields = {
  Limit: 20,
  Offset: 0,
  'zone-name': [],
  'module-id': [],
  'module-name': [],
  'instance-id': [],
  'instance-name': [],
  'ip-address': [],
  'instance-uuid': [],
  'instance-state': {},
  'internet-service-provider': [],
  'instance-family': [],
  'image-id': [],
  'vpc-id': [],
  'subnet-id': [],
};

const ECMBLOCKSTORAGEFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'zone-name',
    enDescriptor: 'zone-name',
    cnDescriptor: '排列顺序',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'module-id',
    enDescriptor: 'module-id',
    cnDescriptor: '模块ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'module-name',
    enDescriptor: 'module-name',
    cnDescriptor: '模块名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'instance-id',
    enDescriptor: 'instance-id',
    cnDescriptor: '实例ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'instance-name',
    enDescriptor: 'instance-name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'ip-address',
    enDescriptor: 'ip-address',
    cnDescriptor: '内网/公网IP',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'instance-uuid',
    enDescriptor: 'instance-uuid',
    cnDescriptor: '实例uuid',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'instance-state',
    enDescriptor: 'instance-state',
    cnDescriptor: '实例状态',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '创建中', value: 'PENDING' },
      { text: '创建失败', value: 'LAUNCH_FAILED' },
      { text: '运行中', value: 'RUNNING' },
      { text: '关机', value: 'STOPPED' },
      { text: '开机中', value: 'STARTING' },
      { text: '关机中', value: 'STOPPING' },
      { text: '重启中', value: 'REBOOTING' },
      { text: '停止待销毁', value: 'SHUTDOWN' },
      { text: '销毁中', value: 'TERMINATING' },
    ],
  },
  {
    key: 'internet-service-provider',
    enDescriptor: 'internet-service-provider',
    cnDescriptor: '公网IP所属的运营商',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'instance-family',
    enDescriptor: 'instance-family',
    cnDescriptor: '机型family',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'image-id',
    enDescriptor: 'image-id',
    cnDescriptor: '镜像ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'vpc-id',
    cnDescriptor: '实例的vpc id',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'subnet-id',
    enDescriptor: 'subnet-id',
    cnDescriptor: '实例的subnet id',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/1108/42565',
  namespace,
  fieldDescriptor: ECMBLOCKSTORAGEFilterFieldsDescriptor,
};

const ECMBLOCKSTORAGE_STATE = {
  region: 'ap-guangzhou',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  diskId: '',
  queries: ECMBLOCKSTORAGEFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
export default ECMBLOCKSTORAGE_STATE;
export {
  ECMBLOCKSTORAGEFilterFieldsDescriptor,
  templateQueryIdMap,
  ECMBLOCKSTORAGEInstanceAliasList,
  ECMBLOCKSTORAGEInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as ECMBLOCKSTORAGEGetInstanceQueryParams,
};
