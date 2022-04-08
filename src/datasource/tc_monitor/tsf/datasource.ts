import _ from 'lodash';
import { TSFInvalidDemensions, TSFInstanceAliasList, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class TSFDatasource extends BaseDatasource {
  Namespace = 'QCE/TSF';
  InstanceAliasList = TSFInstanceAliasList;
  InvalidDimensions = TSFInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'tsf',
    action: 'DescribeApplications',
    responseField: 'Content',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
