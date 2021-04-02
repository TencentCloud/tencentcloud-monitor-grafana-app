import { DCInstanceAliasList, DCInvalidDemensions, namespace, modifyDimensons } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = DCInstanceAliasList;
  InvalidDimensions = DCInvalidDemensions;
  templateQueryIdMap = {
    instance: 'DirectConnectId',
  };
  InstanceReqConfig = {
    service: 'dc',
    action: 'DescribeDirectConnects',
    responseField: 'DirectConnectSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.map((item) => modifyDimensons(item));
  }
}
