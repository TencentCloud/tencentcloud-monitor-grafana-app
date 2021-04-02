import { DCXInstanceAliasList, DCXInvalidDemensions, namespace, modifyDimensons } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class DCXDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = DCXInstanceAliasList;
  InvalidDimensions = DCXInvalidDemensions;
  templateQueryIdMap = {
    instance: 'DirectConnectTunnelId',
  };
  InstanceReqConfig = {
    service: 'dc',
    action: 'DescribeDirectConnectTunnels',
    responseField: 'DirectConnectTunnelSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.map((item) => modifyDimensons(item));
  }
}
