// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/ECM_BLOCK_STORAGE';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'ecmBlockStorageQuery';

const ECMBLOCKSTORAGEInvalidDemensions = {
  uuid: 'UUID',
  diskId: 'DiskId',
};

// 需和文件名对应
const ECMBLOCKSTORAGEInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
  diskId: 'DiskId',
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

// 需要缓存到storage的内容的key列表
const keyInStorage = {
  diskId: 'diskId',
};
/*
如果有InstanceId额外的维度，原则上都需要传入此map结构配置
key的含义：
  经过InvalidDemensions处理后的string。topicId =》TopicId。
  否则认为指标中维度正确，和指标中维度字段保持一致，即topicId
value的含义：
  1 dim_KeyInStorage 指标中维度dimension对应的storage中的key，获取缓存列表，sourceMapList、
  2 dim_KeyInTarget  通过getVariable方法获取变量中选中项。比如ListnerId为Lis-xxxx；即：STATE中的key。
                    默认取通过InvalidDemsion处理后的key
  3 dim_KeyInMap     保存在模板变量value比如（监听器ID）源自sourceMapList（接口返回内容）的哪个key（ListenerId）。
                    即：templateQueryIdMap中内容。
                    联合上面2的内容筛选出原始sourceMap
*/
const queryMonitorExtraConfg = {
  DiskId: {
    dim_KeyInStorage: keyInStorage.diskId,
    dim_KeyInTarget: 'diskId',
    dim_KeyInMap: templateQueryIdMap.diskId,
  },
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
  keyInStorage,
  queryMonitorExtraConfg,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as ECMBLOCKSTORAGEGetInstanceQueryParams,
};
