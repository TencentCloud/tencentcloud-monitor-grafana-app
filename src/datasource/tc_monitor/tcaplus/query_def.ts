// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { DetailQueryConfig, FildDescriptorType } from '../_base/types';
import _ from 'lodash';

const namespace = 'QCE/TCAPLUS';

// 组件名称。这里名字要和index.ts中的SERVICES对应，后面会根据SERVICES中service字段拼接这个query组件名称
const queryEditorName = 'tcaplusQuery';

const TCAPLUSInvalidDemensions = {
  // TableInstanceId: 'TableInstanceId',
  // ClusterId: 'ClusterId',
};

// 需和文件名对应
const TCAPLUSInstanceAliasList = ['TableInstanceId', 'TableName'];

const templateQueryIdMap = {
  instance: 'TableInstanceId',
};

// select类型需要注意是{},multi后缀是[],dropdown是类型
const TCAPLUSFilterFields = {
  Limit: 20,
  Offset: 0,
  ClusterId: '',
  TableGroupIds: [],

  TableName: '',
  TableInstanceId: '',
  TableIdlType: {},
  TableType: {},
  ListElementNum: null,
  ReservedVolume: null,
  ReservedReadQps: null,
  ReservedWriteQps: null,
  Memo: '',
  FileName: '',
  FileExtType: '',
  FileSize: null,
  FileContent: '',
};

const TCAPLUSFilterFieldsDescriptor: FildDescriptorType = [
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
    key: 'ClusterId',
    enDescriptor: 'ClusterId',
    cnDescriptor: '表格所属集群ID',
    link: '',
    type: 'input',
  },
  {
    key: 'TableGroupIds',
    enDescriptor: 'TableGroupIds',
    cnDescriptor: '表格组ID列表',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'TableName',
    enDescriptor: 'TableName',
    cnDescriptor: '表格名称',
    link: '',
    type: 'input',
  },
  {
    key: 'TableInstanceId',
    enDescriptor: 'TableInstanceId',
    cnDescriptor: '表实例ID',
    link: '',
    type: 'input',
  },
  {
    key: 'TableIdlType',
    enDescriptor: 'TableIdlType',
    cnDescriptor: '表格描述语言类型',
    link: '',
    type: 'select',
    list: [
      { text: 'PROTO', value: 'PROTO' },
      { text: 'TDR', value: 'TDR' },
    ],
  },
  {
    key: 'TableType',
    enDescriptor: 'TableType',
    cnDescriptor: '表格数据结构类型',
    link: '',
    type: 'select',
    list: [
      { text: 'GENERIC', value: 'GENERIC' },
      { text: 'LIST', value: 'LIST' },
    ],
  },
  {
    key: 'ListElementNum',
    enDescriptor: 'ListElementNum',
    cnDescriptor: 'LIST表元素个数',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'ReservedVolume',
    enDescriptor: 'ReservedVolume',
    cnDescriptor: '表格预留容量（GB）',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'ReservedReadQps',
    enDescriptor: 'ReservedReadQps',
    cnDescriptor: '表格预留读CU',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'ReservedWriteQps',
    enDescriptor: 'ReservedWriteQps',
    cnDescriptor: '表格预留写CU',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'Memo',
    enDescriptor: 'Memo',
    cnDescriptor: '表格备注信息',
    link: '',
    type: 'input',
  },
  {
    key: 'FileName',
    enDescriptor: 'FileName',
    cnDescriptor: 'Key回档文件名，回档专用',
    link: '',
    type: 'input',
  },
  {
    key: 'FileExtType',
    enDescriptor: 'FileExtType',
    cnDescriptor: 'Key回档文件扩展名，回档专用',
    link: '',
    type: 'input',
  },
  {
    key: 'FileSize',
    enDescriptor: 'FileSize',
    cnDescriptor: 'Key回档文件大小，回档专用',
    link: '',
    type: 'inputNumber',
  },
  {
    key: 'FileContent',
    enDescriptor: 'FileContent',
    cnDescriptor: 'Key回档文件内容，回档专用',
    link: '',
    type: 'input',
  },
];

// 各产品实例列表detail配置
const queryEditorConfig: DetailQueryConfig = {
  instanceDocUrl: 'https://cloud.tencent.com/document/api/596/39664',
  namespace,
  fieldDescriptor: TCAPLUSFilterFieldsDescriptor,
};

const TCAPLUS_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'TableInstanceId',
  queries: TCAPLUSFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  params.Limit = _.get(queries, 'Limit', 20) || 20;
  params.Offset = _.get(queries, 'Offset', 0) || 0;
  params.ClusterId = _.get(queries, 'ClusterId', '') || '';
  params.TableGroupIds = _.get(queries, 'TableGroupIds', []) || [];
  queries = _.omit(queries, ['Offset', 'Limit', 'TableGroupIds', 'ClusterId']);
  const SelectedTables: any[] = [];
  _.forEach(queries, (item: any, key) => {
    if (_.isArray(item)) {
      item = _.compact(item);
      if (item.length > 0) {
        SelectedTables[key] = _.uniq(item);
      }
    } else if (_.isObject(item)) {
      if (_.isNumber(_.get(item, 'value', undefined)) || !_.isEmpty(_.get(item, 'value', undefined))) {
        SelectedTables[key] = _.get(item, 'value');
      }
    } else if (_.isNumber(item) || !_.isEmpty(item)) {
      SelectedTables[key] = item;
    }
  });
  params.SelectedTables = SelectedTables;
  return params;
}
// 和其他产品的展示保持一致
const regonsMap = {
  'ap-beijing': '华北地区(北京)',
  'ap-guangzhou': '华南地区(广州)',
  'ap-hongkong': '港澳台地区(中国香港)',
  'ap-seoul': '亚太东北(首尔)',
  'ap-shanghai': '华东地区(上海)',
  'ap-singapore': '亚太东南(新加坡)',
  'ap-tokyo': '亚太东北(东京)',
  'eu-frankfurt': '欧洲地区(法兰克福)',
  'na-ashburn': '美国东部(弗吉尼亚)',
  'na-siliconvalley': '美国西部(硅谷)',
};
export default TCAPLUS_STATE;
export {
  TCAPLUSFilterFieldsDescriptor,
  templateQueryIdMap,
  TCAPLUSInstanceAliasList,
  TCAPLUSInvalidDemensions,
  namespace,
  queryEditorName,
  queryEditorConfig,
  regonsMap,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as TCAPLUSGetInstanceQueryParams,
};
