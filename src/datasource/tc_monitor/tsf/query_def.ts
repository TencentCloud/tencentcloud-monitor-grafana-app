import { instanceQueryParamsBaseParse } from '../../common/utils';

const ApplicationType = [
  { text: '所有', value: '' },
  { text: '容器应用', value: 'C' },
  { text: '普通应用/虚拟机应用', value: 'V' },
];

const MicroserviceType = [
  { text: '所有', value: '' },
  { text: '普通应用', value: 'N' },
  { text: 'Mesh应用', value: 'M' },
  { text: '微服务网关应用', value: 'G' },
  { text: '原生应用', value: 'NATIVE' },
];

const ApplicationResourceType = [
  { text: '默认资源类型', value: 'DEF' },
  { text: '微服务网关资源', value: 'GW' },
];

const TSFFieldsDescriptor = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputnumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为100',
    link: '',
    type: 'inputnumber',
    min: 1,
    max: 100,
  },
  {
    key: 'SearchWord',
    enDescriptor: 'SearchWord',
    cnDescriptor: '搜索关键字',
    link: '',
    type: 'input',
  },
  {
    key: 'ApplicationIdList',
    enDescriptor: 'ApplicationIdList',
    cnDescriptor: '应用ID 组成的数组',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'ApplicationType',
    enDescriptor: 'ApplicationType',
    cnDescriptor: '应用类型',
    link: '',
    type: 'select',
    list: ApplicationType,
  },
  {
    key: 'MicroserviceType',
    enDescriptor: 'MicroserviceType',
    cnDescriptor: '应用的微服务类型',
    link: '',
    type: 'select',
    list: MicroserviceType,
  },
  {
    key: 'ApplicationResourceTypeList',
    enDescriptor: 'ApplicationResourceTypeList',
    cnDescriptor: '应用资源类型数组',
    link: '',
    type: 'select',
    multiple: true,
    list: ApplicationResourceType,
  },
];

const TSF_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'ApplicationId',
  queries: {
    Limit: 20,
    Offset: 0,
    SearchWord: '',
    OrderBy: '',
    OrderType: null,
    ApplicationType: '',
    MicroserviceType: '',
    ApplicationResourceTypeList: [],
    ApplicationIdList: [],
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}

const TSFInstanceAliasList = ['ApplicationId', 'ApplicationName'];

const TSFInvalidDemensions = {
  applicationid: 'ApplicationId',
};

const templateQueryIdMap = {
  instance: 'ApplicationId',
};

export default TSF_STATE;
export {
  TSFInvalidDemensions,
  templateQueryIdMap,
  TSFInstanceAliasList,
  TSFFieldsDescriptor,
  GetInstanceQueryParams as TSFGetInstanceQueryParams,
};
