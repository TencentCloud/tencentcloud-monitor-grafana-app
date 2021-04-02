import _ from 'lodash';
import { NATGATEWAYInstanceAliasList, NATInvalidDemensions } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class NATGATEWAYDatasource extends BaseDatasource {
  Namespace = 'QCE/NAT_GATEWAY';
  InstanceAliasList = NATGATEWAYInstanceAliasList;
  InvalidDimensions = NATInvalidDemensions;
  templateQueryIdMap = {
    instance: 'NatGatewayId',
  };
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeNatGateways',
    responseField: 'NatGatewaySet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
}
