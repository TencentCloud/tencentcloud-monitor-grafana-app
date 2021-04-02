import { DCGInstanceAliasList, DCGInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = DCGInstanceAliasList;
  InvalidDimensions = DCGInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeDirectConnectGateways',
    responseField: 'DirectConnectGatewaySet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
