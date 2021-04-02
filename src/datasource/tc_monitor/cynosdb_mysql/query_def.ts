import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/CYNOSDB_MYSQL';

// 按照驼峰方式命名，和SERVICES保持一致，abcDeF会成为angular组件名字<abc-de-f-query />
const queryEditorName = 'cynosdbMysqlQuery';

const cynosdbMysqlFilterFields = {
  Limit: 20,
  Offset: 0,
  OrderBy: {},
  OrderByType: {},
  InstanceIds: [],
  DbType: {},
  // Status: '',
};

const cynosdbMysqlFilterFieldsDescriptor: FildDescriptorType = [
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
    max: 1000,
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '实例id列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: '创建时间', value: 'CREATETIME' },
      { text: '过期时间', value: 'PERIODENDTIME' },
    ],
  },
  {
    key: 'OrderByType',
    enDescriptor: 'OrderByType',
    cnDescriptor: '排序类型',
    link: '',
    type: 'select',
    list: [
      { text: '升序', value: 'ASC' },
      { text: '降序', value: 'DESC' },
    ],
  },
  {
    key: 'DbType',
    enDescriptor: 'DbType',
    cnDescriptor: '引擎类型',
    link: '',
    type: 'select',
    list: [
      { text: 'MYSQL', value: 'MYSQL' },
      { text: 'POSTGRESQL', value: 'POSTGRESQL' },
    ],
  },
  // {
  //   key: 'Status',
  //   enDescriptor: 'Status',
  //   cnDescriptor: '实例状态',
  //   link: '',
  //   type: 'input',
  // },
];
// regions for dropdown
const regionSupported = [
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '华东地区(南京)', value: 'ap-nanjing' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
];
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/1003/48334',
  namespace,
  fieldDescriptor: cynosdbMysqlFilterFieldsDescriptor,
};

const CYNOSDB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: cynosdbMysqlFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, false);
}
// 和文件名字一样CYNOSDBMYSQL
const CYNOSDBMYSQLInstanceAliasList = ['InstanceId', 'InstanceName'];

const templateQueryIdMap = {
  instance: 'InstanceId',
};

const CYNOSDBInvalidDemensions = {
  instanceid: 'InstanceId',
  instanceId: 'InstanceId',
};
const checkKeys = ['instanceId'];
function modifyDimensons(metricItem) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['InstanceId'];
  });
  return metricTmp;
}

export default CYNOSDB_STATE;
export {
  cynosdbMysqlFilterFieldsDescriptor,
  templateQueryIdMap,
  CYNOSDBMYSQLInstanceAliasList,
  CYNOSDBInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regionSupported,
  modifyDimensons,
  checkKeys,
  // params前缀为service的全大写
  GetInstanceQueryParams as CYNOSDBMYSQLGetInstanceQueryParams,
};
