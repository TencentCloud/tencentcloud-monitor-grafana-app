import * as _ from 'lodash';
import { CDNInstanceAliasList, CDNInvalidDemensions } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class CDNDatasource extends BaseDatasource {
  Namespace = 'QCE/CDN';
  InstanceAliasList = CDNInstanceAliasList;
  InvalidDimensions = CDNInvalidDemensions;
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
}
