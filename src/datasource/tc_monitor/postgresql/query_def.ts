import * as _ from 'lodash';

const PostgresFields = {
  "db-instance-id": [],
  "db-instance-name": [],
};

const PostgresFieldsDescriptor = [
  {
    key: 'db-instance-id',
    enDescriptor: 'DB Instance ID',
    cnDescriptor: 'DB 实例ID',
    link: '',
    type: 'input',
    min: 0,
  },
  {
    key: 'db-instance-name',
    enDescriptor: 'DB Instance Name',
    cnDescriptor: 'DB 实例名称',
    link: '',
    type: 'input',
  },
];

const POSTGRESInstanceAliasList = ['DBInstanceId', 'DBInstanceName', 'PrivateIpAddresses', 'PublicIpAddresses'];

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
    Filters: Object.assign({}, PostgresFields),
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    queries = _.omit(queries, ['Offset', 'Limit']);
    const Filters: any[] = [];
    _.forEach(queries.Filters, (item: any, key) => {
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          Filters.push({ Name: key, Values: _.uniq(item) });
        }
      }
    });
    if (Filters.length > 0) {
      params.Filters = Filters;
    }
  }
  return params;
}

export default POSTGRES_STATE;

export {
  PostgresFieldsDescriptor,
  POSTGRESInstanceAliasList,
  GetInstanceQueryParams as POSTGRESGetInstanceQueryParams,
};
