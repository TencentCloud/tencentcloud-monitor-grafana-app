import _ from 'lodash';
import { BaseDatasource } from '../_base/datasource';
import { CFSInstanceAliasList, CFSInvalidDemensions, regionSupported } from './query_def';

export default class CFSDatasource extends BaseDatasource {
  InstanceKey: string;
  Namespace: string;
  InstanceAliasList: string[];
  InvalidDimensions: Record<string, string>;
  templateQueryIdMap = {
    instance: 'FileSystemId',
  };
  InstanceReqConfig: { service?: string | undefined; action: string; responseField: string };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);

    this.Namespace = 'QCE/CFS';
    this.InstanceAliasList = CFSInstanceAliasList;
    this.InvalidDimensions = CFSInvalidDemensions;
    this.InstanceReqConfig = {
      service: 'cfs',
      action: 'DescribeCfsFileSystems',
      responseField: 'FileSystems',
    };
  }
  getRegions() {
    return Promise.resolve(regionSupported);
  }
}
