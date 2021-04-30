import _ from 'lodash';
import {
  POSTGRESInstanceAliasList,
  PostgreInvalidDemensions,
  namespace,
  modifyDimensons,
  templateQueryIdMap,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class CDBDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = POSTGRESInstanceAliasList;
  InvalidDimensions = PostgreInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'postgres',
    action: 'DescribeDBInstances',
    responseField: 'DBInstanceSet',
  };

  MetricReqConfig = {
    resultFilter: modifyDimensons,
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
