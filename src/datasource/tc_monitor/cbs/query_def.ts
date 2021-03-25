import * as _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/BLOCK_STORAGE';
const queryEditorName = 'cbsQuery';

const CBSInvalidDemensions = {
  diskId: 'DiskId',
  InstanceId: 'InstanceId',
  diskname: 'DiskName',
  unInstanceId: 'InstanceId',
};

const CBSInstanceAliasList = ['DiskId', 'DiskName'];

const templateQueryIdMap = {
  instance: 'DiskId',
};

// select类型需要注意是{},multi后缀是[]
const CBSFilterFields = {
  Limit: 20,
  Offset: 0,
  DiskIds: [],
  OrderField: [],
  Order: [],
  ReturnBindAutoSnapshotPolicy: false,
};

const CBSFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'DiskIds',
    enDescriptor: 'DiskIds',
    cnDescriptor: '云硬盘ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Order',
    enDescriptor: 'Order',
    cnDescriptor: '排列顺序',
    link: '',
    type: 'select',
    list: [
      { text: '升序排列', value: 'ASC' },
      { text: '降序排列', value: 'DESC' },
    ],
  },
  {
    key: 'OrderField',
    enDescriptor: 'OrderField',
    cnDescriptor: '排序的依据字段',
    link: '',
    type: 'select',
    list: [
      { text: '云盘的创建时间排序', value: 'CREATE_TIME' },
      { text: '云盘的到期时间排序', value: 'DEADLINE' },
    ],
  },
  {
    key: 'ReturnBindAutoSnapshotPolicy',
    enDescriptor: 'ReturnBindAutoSnapshotPolicy',
    cnDescriptor: '否需要返回云盘绑定的定期快照策略ID',
    link: '',
    type: 'switch',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/362/16315',
  namespace,
  fieldDescriptor: CBSFilterFieldsDescriptor,
};

const CBS_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'DiskId',
  queries: CBSFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
function isValidMetric(metricObj: any = {}) {
  const dimension = _.get(metricObj, 'Dimensions[0].Dimensions');
  console.log('dimension', dimension, dimension.length === 1 && _.indexOf(dimension, 'diskId') !== -1);
  return dimension.length === 1 && _.indexOf(dimension, 'diskId') !== -1;
}
export default CBS_STATE;
export {
  CBSFilterFieldsDescriptor,
  templateQueryIdMap,
  CBSInstanceAliasList,
  CBSInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  isValidMetric,
  GetInstanceQueryParams as CBSGetInstanceQueryParams,
};
