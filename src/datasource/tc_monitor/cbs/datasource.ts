import { CBSInstanceAliasList, CBSInvalidDemensions, namespace, templateQueryIdMap, isValidMetric } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CBSInstanceAliasList;
  InvalidDimensions = CBSInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'cbs',
    action: 'DescribeDisks',
    responseField: 'DiskSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.filter(rawSet, isValidMetric);
  }
}
