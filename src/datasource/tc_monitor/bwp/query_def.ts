import _ from 'lodash';
const networkTypes = [
  { text: 'BGP', value: 'BGP' },
  { text: 'SINGLEISP', value: 'SINGLEISP' },
  { text: 'ANYCAST', value: 'ANYCAST' },
];

const chargeTypes = [
  { text: 'top5计费', value: 'TOP5_POSTPAID_BY_MONTH' },
  { text: '月95计费', value: 'PERCENT95_POSTPAID_BY_MONTH' },
];
const BWPFilterFields = {
  'bandwidth-package_id': [],
  'bandwidth-package-name': [],
  'network-type': [],
  'charge-type': [],
};

const BWPFilterFieldsDescriptor = [
  {
    key: 'bandwidth-package_id',
    enDescriptor: 'BandwidthPackage Id',
    cnDescriptor: '带宽包ID',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'bandwidth-package-name',
    enDescriptor: 'BandwidthPackage Name',
    cnDescriptor: '带宽包名称',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'network-type',
    enDescriptor: 'network type',
    cnDescriptor: '带宽包类型',
    link: '',
    type: 'select',
    list: networkTypes,
  },
  {
    key: 'charge-type',
    enDescriptor: 'charge type',
    cnDescriptor: '带宽包计费类型',
    link: '',
    type: 'select',
    list: chargeTypes,
  },
];

const BWP_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'BandwidthPackageId',
  queries: {
    Limit: 20,
    Offset: 0,
    instanceIdsChecked: false,
    filtersChecked: false,
    BandwidthPackageIds: [''],
    Filters: { ...BWPFilterFields },
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries.BandwidthPackageIds)) {
        const BandwidthPackageIds = _.compact(queries.BandwidthPackageIds);
        if (_.uniq(BandwidthPackageIds).length > 0) {
          params.BandwidthPackageIds = _.uniq(BandwidthPackageIds).slice(0, 100);
        }
      }
    } else if (queries.filtersChecked) {
      const Filters: any[] = [];
      _.forEach(queries.Filters, (item: any, key) => {
        if (Filters.length > 9) {
          return;
        }
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

const BWPInstanceAliasList = ['BandwidthPackageId', 'BandwidthPackageName'];

const templateQueryIdMap = {
  instance: 'BandwidthPackageId',
};

const BWPInvalidDemensions = {
  bandwidthPackageId: 'BandwidthPackageId',
};
export default BWP_STATE;
export {
  BWPFilterFieldsDescriptor,
  templateQueryIdMap,
  BWPInstanceAliasList,
  BWPInvalidDemensions,
  GetInstanceQueryParams as BWPGetInstanceQueryParams,
};
