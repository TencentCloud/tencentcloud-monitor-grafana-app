import * as _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/ECM';
const queryEditorName = 'ecmQuery';

const ECMInvalidDemensions = {
  // diskId: 'InstanceId',
  uuid: 'UUID',
  // unInstanceId: 'InstanceId',
};

const ECMInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[]
const ECMFilterFields = {
  Limit: 20,
  Offset: 0,
  zone: [],
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

const ECMFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'zone',
    enDescriptor: 'zone',
    cnDescriptor: '可用区英文标识',
    link: '',
    type: 'dropdownMulti',
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
  fieldDescriptor: ECMFilterFieldsDescriptor,
};

const ECM_STATE = {
  region: 'ap-guangzhou',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: ECMFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
// function isValidMetric(metricObj: any = {}) {
//   const dimension = _.get(metricObj, 'Dimensions[0].Dimensions');
//   // console.log('dimension', dimension, dimension.length === 1 && _.indexOf(dimension, 'diskId') !== -1);
//   return dimension.length === 1 &&( _.indexOf(dimension, 'UUID') !== -1 || _.indexOf(dimension, 'uuid') !== -1);
// }

function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['UUID'];
  });
  return metricTmp;
}
export default ECM_STATE;
export {
  ECMFilterFieldsDescriptor,
  templateQueryIdMap,
  ECMInstanceAliasList,
  ECMInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as ECMGetInstanceQueryParams,
};
