import _ from 'lodash';
import {
  REDISMEMInstanceAliasList,
  namespace,
  RedisMemInvalidDemensions,
  isValidMetric,
  templateQueryIdMap,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class REDISDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = REDISMEMInstanceAliasList;
  InvalidDimensions = RedisMemInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'redis',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
    interceptor: {
      request: (params) => ({ ...params, MonitorVersion: '5s' }),
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter((item) => isValidMetric(item));
  }
}
