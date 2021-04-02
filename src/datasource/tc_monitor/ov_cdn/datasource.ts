import _ from 'lodash';
import { OVCDNInstanceAliasList, OVCDNInvalidDemensions } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class OVCDNDatasource extends BaseDatasource {
  Namespace = 'QCE/OV_CDN';
  InstanceAliasList = OVCDNInstanceAliasList;
  InvalidDimensions = OVCDNInvalidDemensions;
  templateQueryIdMap = {
    instance: 'Domain',
  };
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
