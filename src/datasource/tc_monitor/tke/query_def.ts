import _ from 'lodash';

const TKE_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'ClusterId',
  conditions: [],
  groupBys: '',
  queries: {
    Limit: 20,
    Offset: 0,
    instanceIdsChecked: false,
    filtersChecked: true,
    ClusterIds: [''],
    Filters: {
      ClusterName: [],
      ClusterType: [],
      ClusterStatus: [],
      'tag-key': [],
    },
  },
};

const TKEFilterFieldsDescriptor = [
  {
    key: 'ClusterName',
    enDescriptor: 'Cluster Name',
    cnDescriptor: '集群名',
    link: '',
    type: 'input',
  },
  {
    key: 'ClusterType',
    enDescriptor: 'Cluster Type',
    cnDescriptor: '集群类型',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'ClusterStatus',
    enDescriptor: 'Cluster Status',
    cnDescriptor: '集群状态',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'Tags',
    enDescriptor: 'Tags',
    cnDescriptor: '标签键值对',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'VPC',
    cnDescriptor: 'VPC',
    link: '',
    type: 'input',
  },
  {
    key: 'tag-key',
    enDescriptor: 'Tag Key',
    cnDescriptor: '标签键',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'tag-value',
    enDescriptor: 'Tag Value',
    cnDescriptor: '标签值',
    link: '',
    type: 'inputmulti',
  },
];

const TKEInstanceAliasList = ['ClusterId', 'ClusterName'];

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries.InstanceIds)) {
        const InstanceIds = _.compact(queries.InstanceIds);
        if (_.uniq(InstanceIds).length > 0) {
          params.InstanceIds = _.uniq(InstanceIds).slice(0, 100);
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

export default TKE_STATE;

export { TKEFilterFieldsDescriptor, TKEInstanceAliasList, GetInstanceQueryParams as TKEGetInstanceQueryParams };
