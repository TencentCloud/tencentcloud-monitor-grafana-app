import { BaseDatasource } from '../_base/datasource';
import {
  ECDNInstanceAliasList,
  ECDNInvalidDemensions,
  modifyDimensons,
  namespace,
  templateQueryIdMap,
} from './query_def';

export default class ECDNDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = ECDNInstanceAliasList;
  InvalidDimensions = ECDNInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'ecdn',
    action: 'DescribeDomains',
    responseField: 'Domains',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.map((item) => modifyDimensons(item));
  }
}
