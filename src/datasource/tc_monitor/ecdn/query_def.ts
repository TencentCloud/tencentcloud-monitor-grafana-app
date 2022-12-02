import { cloneDeep, compact, forEach, get, isArray, isEmpty, isObject, omit, uniq } from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';

const namespace = 'QCE/DSA';
const queryEditorName = 'ecdnQuery';

const ECDNInstanceAliasList = ['Domain'];

const templateQueryIdMap = {
  instance: 'Domain',
};

const ECDNInvalidDemensions = {
  domain: 'Domain',
  projectid: 'ProjectId',
};

const ECDN_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'Domain',
  queries: {
    Limit: 100,
    Offset: 0,
    origin: [],
    domain: [],
    resourceId: [],
    status: [],
    disable: [],
    projectId: [],
    fullUrlCache: [],
    https: [],
    originPullProtocol: [],
    area: [],
    tagKey: [],
  },
};

const ECDNFilterFieldsDescriptor: FildDescriptorType = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputNumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为100',
    link: '',
    type: 'inputNumber',
    min: 1,
    max: 100,
  },
  {
    key: 'origin',
    enDescriptor: 'Origin',
    cnDescriptor: '主源站',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'domain',
    enDescriptor: 'Domain',
    cnDescriptor: '域名',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'resourceId',
    enDescriptor: 'ResourceId',
    cnDescriptor: '域名id',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'status',
    enDescriptor: 'Status',
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
    key: 'disable',
    enDescriptor: 'Disable',
    cnDescriptor: '域名封禁状态',
    link: '',
    type: 'select',
    list: [
      { text: 'normal', value: 'normal' },
      { text: 'unlicensed', value: 'unlicensed' },
    ],
  },
  {
    key: 'projectId',
    enDescriptor: 'ProjectId',
    cnDescriptor: '项目ID',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'fullUrlCache',
    enDescriptor: 'FullUrlCache',
    cnDescriptor: '全路径缓存',
    link: '',
    type: 'select',
    list: [
      { text: 'on', value: 'on' },
      { text: 'off', value: 'off' },
    ],
  },
  {
    key: 'https',
    enDescriptor: 'Https',
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
    enDescriptor: 'OriginPullProtocol',
    cnDescriptor: '回源协议类型',
    link: '',
    type: 'select',
    list: [
      { text: 'http', value: 'http' },
      { text: 'https', value: 'https' },
      { text: 'follow', value: 'follow' },
    ],
  },
  {
    key: 'area',
    enDescriptor: 'Area',
    cnDescriptor: '加速区域',
    link: '',
    type: 'select',
    list: [
      { text: 'mainland', value: 'mainland' },
      { text: 'overseas', value: 'overseas' },
      { text: 'global', value: 'global' },
    ],
  },
  {
    key: 'tagKey',
    enDescriptor: 'TagKey',
    cnDescriptor: '标签键',
    link: '',
    type: 'inputMulti',
  },
];

const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/570/42462',
  namespace,
  fieldDescriptor: ECDNFilterFieldsDescriptor,
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!isEmpty(queries)) {
    params.Limit = get(queries, 'Limit', 20) || 20;
    params.Offset = get(queries, 'Offset', 0) || 0;
    const _queries = omit(queries, ['Offset', 'Limit']);
    const Filters: any[] = [];
    forEach(_queries, (item: any, key) => {
      if (isArray(item)) {
        item = compact(item);
        if (item.length > 0) {
          Filters.push({ Name: key, Value: uniq(item).slice(0, 5) });
        }
      } else if (isObject(item)) {
        if (!isEmpty(get(item, 'value', []))) {
          Filters.push({ Name: key, Value: [get(item, 'value', [])].slice(0, 5) });
        }
      }
    });
    if (Filters.length > 0) {
      params.Filters = Filters.map((item) => {
        if (item.Name === 'domain') {
          return { ...item, Fuzzy: true };
        }
        return item;
      });
      return params;
    }
  }
  return params;
}

function modifyDimensons(metricItem) {
  const metricTmp = cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['domain', 'projectid'];
  });
  return metricTmp;
}

export default ECDN_STATE;

export {
  ECDNFilterFieldsDescriptor,
  templateQueryIdMap,
  ECDNInstanceAliasList,
  ECDNInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  modifyDimensons,
  GetInstanceQueryParams as ECDNGetInstanceQueryParams,
};
