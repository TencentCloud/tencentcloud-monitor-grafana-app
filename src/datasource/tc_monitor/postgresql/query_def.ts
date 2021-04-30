import _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';
const namespace = 'QCE/POSTGRES';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'postgresQuery';

const PostgresFields = {
  'db-instance-id': [],
  'db-instance-name': [],
};

const PostgresFieldsDescriptor: FildDescriptorType = [
  {
    key: 'db-instance-id',
    enDescriptor: 'DB Instance ID',
    cnDescriptor: 'DB 实例ID',
    link: '',
    type: 'inputMulti',
    min: 0,
  },
  {
    key: 'db-instance-name',
    enDescriptor: 'DB Instance Name',
    cnDescriptor: 'DB 实例名称',
    link: '',
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/409/16773',
  namespace,
  fieldDescriptor: PostgresFieldsDescriptor,
};
const POSTGRESInstanceAliasList = ['DBInstanceId', 'DBInstanceName'];

const POSTGRES_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'DBInstanceId',
  queries: {
    Limit: 20,
    Offset: 0,
    Filters: { ...PostgresFields },
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['resourceId'];
  });
  return metricTmp;
}
const PostgreInvalidDemensions = {
  uid: 'DBInstanceId',
  resourceId: 'DBInstanceId',
};
const templateQueryIdMap = {
  instance: 'DBInstanceId',
};
export default POSTGRES_STATE;

export {
  PostgresFieldsDescriptor,
  POSTGRESInstanceAliasList,
  templateQueryIdMap,
  modifyDimensons,
  namespace,
  queryEditorName,
  queryEditorConfig,
  PostgreInvalidDemensions,
  GetInstanceQueryParams as POSTGRESGetInstanceQueryParams,
};
