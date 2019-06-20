import * as _ from 'lodash';

const NATGATEWAYInstanceAliasList = ['NatGatewayId', 'NatGatewayName'];

const NATGatewayFilterFields = {
  'nat-gateway-id': [],
  'nat-gateway-name': [],
  'vpc-id': [],
};


const NATGatewayFilterFieldsDescriptor = [
  {
    key: 'nat-gateway-id',
    enDescriptor: 'NatGateway ID',
    cnDescriptor: 'NAT网关统一 ID',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'nat-gateway-name',
    enDescriptor: 'NatGateway Name',
    cnDescriptor: 'NatGateway Name',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'VPC ID',
    cnDescriptor: '私有网络 ID',
    link: '',
    type: 'inputmulti',
  },
];

const NATGATEWAY_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'NatGatewayId',
  queries: {
    Limit: 20,
    Offset: 0,
    instanceIdsChecked: false,
    filtersChecked: false,
    NatGatewayIds: [''],
    Filters: Object.assign({}, NATGatewayFilterFields),
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries.NatGatewayIds)) {
        const NatGatewayIds = _.compact(queries.NatGatewayIds);
        if (_.uniq(NatGatewayIds).length > 0) {
          params.InstanceIds = _.uniq(NatGatewayIds).slice(0, 100);
        }
      }
    } else if (queries.filtersChecked) {
      const Filters: any[] = [];
      _.forEach(queries.Filters, (item: any, key) => {
        if (Filters.length > 9) { return; }
        if (_.isArray(item)) {
          item = _.compact(item);
          if (item.length > 0) {
            Filters.push({ Name: key, Values: _.uniq(item).slice(0, 5) });
          }
        } else if (_.isObject(item)) {
          if (!_.isEmpty(_.get(item, 'value', []))) {
            Filters.push({ Name: key, Values: _.get(item, 'value', []).slice(0, 5) });
          }
        }
      });
      if (Filters.length > 0) {
        params.Filters = Filters;
      }
    }
  }
  return params;
}


export default NATGATEWAY_STATE;
export {
  NATGatewayFilterFieldsDescriptor,
  NATGATEWAYInstanceAliasList,
  GetInstanceQueryParams as NATGATEWAYGetInstanceQueryParams,
};
