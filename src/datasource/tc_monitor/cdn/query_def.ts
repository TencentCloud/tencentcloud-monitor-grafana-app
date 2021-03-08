import * as _ from 'lodash';
const CDNFilterFields = {
  origin: [],
  domain: [],
  resourceId: [],
  status: [],
  serviceType: [],
  projectId: [],
  domainType: [],
  fullUrlCache: [],
  https: [],
  originPullProtocol: [],
  tagKey: [],
};

const CDNFilterFieldsDescriptor = [
  {
    key: 'origin',
    enDescriptor: 'origin',
    cnDescriptor: '主源站',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'domain',
    enDescriptor: 'domain',
    cnDescriptor: '域名',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'resourceId',
    enDescriptor: 'resourceId',
    cnDescriptor: '域名id',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'status',
    enDescriptor: 'status',
    cnDescriptor: '域名状态',
    link: '',
    type: 'select',
    list: [
      { text: 'online', value: 'online' },
      { text: 'offline', value: 'offline' },
      { text: 'processing', value: 'processing' },
    ],
  },
  {
    key: 'serviceType',
    enDescriptor: 'serviceType',
    cnDescriptor: '业务类型',
    link: '',
    type: 'select',
    list: [
      { text: 'web', value: 'web' },
      { text: 'download', value: 'download' },
      { text: 'media', value: 'media' },
    ],
  },
  {
    key: 'projectId',
    enDescriptor: 'projectId',
    cnDescriptor: '项目ID',
    link: '',
    type: 'inputNumbermulti',
  },
  {
    key: 'domainType',
    enDescriptor: 'domainType',
    cnDescriptor: '主源站类型',
    link: '',
    type: 'select',
    list: [
      { text: '自有源', value: 'cname' },
      { text: 'cos接入', value: 'cos' },
    ],
  },
  {
    key: 'fullUrlCache',
    enDescriptor: 'fullUrlCache',
    cnDescriptor: '全路径缓存',
    link: '',
    type: 'select',
    list: [
      { text: '打开', value: 'on' },
      { text: '关闭', value: 'off' },
    ],
  },
  {
    key: 'https',
    enDescriptor: 'https',
    cnDescriptor: '是否配置https',
    link: '',
    type: 'select',
    list: [
      { text: 'on', value: 'on' },
      { text: 'off', value: 'off' },
      { text: 'processing', value: 'processing' },
    ],
  },
  {
    key: 'originPullProtocol',
    enDescriptor: 'originPullProtocol',
    cnDescriptor: '回源协议类型',
    link: '',
    type: 'select',
    list: [
      { text: 'http', value: 'http' },
      { text: 'follow', value: 'follow' },
      { text: 'https', value: 'https' },
    ],
  },
  {
    key: 'tagKey',
    enDescriptor: 'tagKey',
    cnDescriptor: '标签键',
    link: '',
    type: 'inputmulti',
  },
];

const CDN_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'Domain',
  queries: {
    Limit: 20,
    Offset: 0,
    Filters: Object.assign({}, CDNFilterFields),
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    const Filters: any[] = [];
    _.forEach(queries.Filters, (item: any, key) => {
      console.log('item', item, queries);
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          Filters.push({ Name: key, Value: _.uniq(item).slice(0, 5) });
        }
      } else if (_.isObject(item)) {
        if (!_.isEmpty(_.get(item, 'value', []))) {
          Filters.push({ Name: key, Value: _.get(item, 'value', []).slice(0, 5) });
        }
      }
    });
    if (Filters.length > 0) {
      params.Filters = Filters;
    }
  }
  return params;
}

const CDNInstanceAliasList = ['Domain', 'ProjectId'];

const CDNInvalidDemensions = {
  projectId: 'ProjectId',
  domain: 'Domain',
};
const templateQueryIdMap = {
  instance: 'Domain',
};
export default CDN_STATE;
export {
  CDNFilterFieldsDescriptor,
  templateQueryIdMap,
  CDNInstanceAliasList,
  CDNInvalidDemensions,
  GetInstanceQueryParams as CDNGetInstanceQueryParams,
};
