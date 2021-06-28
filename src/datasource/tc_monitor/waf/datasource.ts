import _ from 'lodash';
import { WAFInstanceAliasList, WAFInvalidDemensions, templateQueryIdMap, namespace } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class CDNDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = WAFInstanceAliasList;
  InvalidDimensions = WAFInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'cdn',
    action: 'DescribeDomains',
    responseField: 'Domains',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async metricFindQuery(query: any, regex?: string) {
    return super.metricFindQuery({ ...query, ...{ region: 'ap-guangzhou' } }, regex);
  }
}
