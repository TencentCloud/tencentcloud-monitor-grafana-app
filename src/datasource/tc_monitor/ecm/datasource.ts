import {
  ECMInstanceAliasList,
  ECMInvalidDemensions,
  namespace,
  templateQueryIdMap,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = ECMInstanceAliasList;
  InvalidDimensions = ECMInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'ecm',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  MetricReqConfig = {
    resultFilter: modifyDimensons,
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async metricFindQuery(query: any, regex?: string) {
    return super.metricFindQuery({ ...query, ...{ region: 'ap-guangzhou' } }, regex);
  }
}
