import * as _ from 'lodash';
import { REDISInstanceAliasList, RedisInvalidDemensions, isValidMetric } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class REDISDatasource extends BaseDatasource {
  Namespace = 'QCE/REDIS';
  InstanceAliasList = REDISInstanceAliasList;
  InvalidDimensions = RedisInvalidDemensions;
  templateQueryIdMap = {
    instance: 'InstanceId',
  };
  InstanceReqConfig = {
    service: 'redis',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter(item => isValidMetric(item));
  }
}
