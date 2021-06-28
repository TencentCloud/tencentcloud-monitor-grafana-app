import * as _ from 'lodash';
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import { instanceQueryParamsBaseParse } from '../../common/utils';

const namespace = 'QCE/WAF';
const queryEditorName = 'wafQuery';
const WAFFilterFields = {
  Limit: 20,
  Offset: 0,
  origin: [],
  domain: [],
  resourceId: [],
  status: {},
  serviceType: {},
  projectId: [],
  domainType: {},
  fullUrlCache: {},
  https: {},
  originPullProtocol: {},
  tagKey: [],
};

const WAFFilterFieldsDescriptor: FildDescriptorType = [
  {
    key: 'origin',
    enDescriptor: 'origin',
    cnDescriptor: '主源站',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'domain',
    enDescriptor: 'domain',
    cnDescriptor: '域名',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'resourceId',
    enDescriptor: 'resourceId',
    cnDescriptor: '域名id',
    link: '',
    type: 'inputMulti',
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
    type: 'inputNumberMulti',
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
    type: 'inputMulti',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/228/41118',
  namespace,
  fieldDescriptor: WAFFilterFieldsDescriptor,
};
const WAF_STATE = {
  region: 'ap-guangzhou',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'Domain',
  queries: WAFFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  return instanceQueryParamsBaseParse(queries, true);
}

const WAFInstanceAliasList = ['Domain', 'ProjectId'];

const WAFInvalidDemensions = {
  projectId: 'ProjectId',
  domain: 'Domain',
};
const templateQueryIdMap = {
  instance: 'Domain',
};
export default WAF_STATE;
export {
  WAFFilterFieldsDescriptor,
  templateQueryIdMap,
  WAFInstanceAliasList,
  WAFInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  GetInstanceQueryParams as WAFGetInstanceQueryParams,
};
