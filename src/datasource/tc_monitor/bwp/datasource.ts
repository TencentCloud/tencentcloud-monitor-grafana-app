import { BWPInstanceAliasList, BWPInvalidDemensions } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class BWPDatasource extends BaseDatasource {
  Namespace = 'QCE/BWP';
  InstanceAliasList = BWPInstanceAliasList;
  InvalidDimensions = BWPInvalidDemensions;
  templateQueryIdMap = {
    instance: 'BandwidthPackageId',
  };
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeBandwidthPackages',
    responseField: 'BandwidthPackageSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
