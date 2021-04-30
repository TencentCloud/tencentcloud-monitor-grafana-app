import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/QAAP';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'qaapQuery';

const QAAPInvalidDemensions = {
  channelId: 'InstanceId',
};

const QAAPInstanceAliasList = ['InstanceId'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

// select类型需要注意是{},multi后缀是[]
const QAAPFilterFields = {
  Limit: 20,
  Offset: 0,
  ProjectId: [],
  AccessRegion: [],
  RealServerRegion: [],
  GroupId: [],
};

const QAAPFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'ProjectId',
    enDescriptor: 'ProjectId',
    cnDescriptor: '项目ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'AccessRegion',
    enDescriptor: 'AccessRegion',
    cnDescriptor: '接入地域',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'RealServerRegion',
    enDescriptor: 'RealServerRegion',
    cnDescriptor: '源站地域',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'GroupId',
    enDescriptor: 'GroupId',
    cnDescriptor: '通道组ID',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/608/36963',
  namespace,
  fieldDescriptor: QAAPFilterFieldsDescriptor,
};

const QAAP_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: QAAPFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  // metricTmp.Dimensions.forEach((item) => {
  //   item.Dimensions = ['netDetectId'];
  // });
  return metricTmp;
}
export default QAAP_STATE;
export {
  QAAPFilterFieldsDescriptor,
  templateQueryIdMap,
  QAAPInstanceAliasList,
  QAAPInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as QAAPGetInstanceQueryParams,
};
