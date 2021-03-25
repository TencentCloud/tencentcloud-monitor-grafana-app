import _ from 'lodash';
import { MONGODBInstanceAliasList, MONGODBInvalidDemensions } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class MONGODBDatasource extends BaseDatasource {
  Namespace = 'QCE/CMONGO';
  InstanceAliasList = MONGODBInstanceAliasList;
  InvalidDimensions = MONGODBInvalidDemensions;
  templateQueryIdMap = {
    instance: 'InstanceId',
  };
  InstanceReqConfig = {
    service: 'mongodb',
    action: 'DescribeDBInstances',
    responseField: 'InstanceDetails',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
