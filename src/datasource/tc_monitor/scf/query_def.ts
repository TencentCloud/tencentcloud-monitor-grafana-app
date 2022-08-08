import _ from 'lodash';

export const SCFQueryDescriptor = [
  {
    key: 'Offset',
    enDescriptor: 'Offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputnumber',
    min: 0,
  },
  {
    key: 'Limit',
    enDescriptor: 'Limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为100',
    link: '',
    type: 'inputnumber',
    min: 1,
    max: 100,
  },
  {
    key: 'SearchKey',
    enDescriptor: 'SearchKey',
    cnDescriptor: '支持FunctionName模糊匹配',
    link: '',
    type: 'input',
  },
  {
    key: 'Namespace',
    enDescriptor: 'Namespace',
    cnDescriptor: '云函数命名空间',
    link: '',
    type: 'input',
  },
  {
    key: 'Description',
    enDescriptor: 'Description',
    cnDescriptor: '函数描述，支持模糊搜索',
    link: '',
    type: 'input',
  },
  {
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: 'AddTime', value: 'AddTime' },
      { text: 'ModTime', value: 'ModTime' },
      { text: 'FunctionName', value: 'FunctionName' },
    ],
  },
  {
    key: 'Order',
    enDescriptor: 'Order Direction',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: [
      { text: 'ASC', value: 'ASC' },
      { text: 'DESC', value: 'DESC' },
    ],
  },
  // {
  //   key: 'Filters',
  //   enDescriptor: 'Filters',
  //   cnDescriptor: '按照标签键值对进行过滤',
  //   link: '',
  //   type: 'dropdownmulti',
  // },
];

const SCF_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'FunctionName',
  version: '',
  queries: {
    Offset: 0,
    Limit: 20,
    OrderBy: {},
    Order: {},
    SearchKey: '',
    Namespace: '',
    Description: '',
    // Filters:  {},
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    queries = _.omit(queries, ['Offset', 'Limit']);
    _.forEach(queries, (item: any, key) => {
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          params[key] = _.uniq(item);
        }
      } else if (_.isObject(item)) {
        if (_.isNumber(_.get(item, 'value', undefined)) || !_.isEmpty(_.get(item, 'value', undefined))) {
          params[key] = _.get(item, 'value');
        }
      } else if (_.isNumber(item) || !_.isEmpty(item)) {
        params[key] = item;
      }
    });
  }
  return params;
}

const SCFInstanceAliasList = ['FunctionId', 'FunctionName'];

// 向实例里面塞dimensions对应的值，dimension中的key对应到实例中的key
const SCFInvalidDemensions = {
  functionName: 'FunctionName',
  namespace: 'Namespace',
  version: 'Version',
};

const templateQueryIdMap = {
  instance: 'FunctionName',
  version: 'Version',
};
const regionSupported = [
  { value: 'ap-beijing' },
  { value: 'ap-chengdu' },
  { value: 'ap-chongqing' },
  { value: 'ap-guangzhou' },
  { value: 'ap-hongkong' },
  { value: 'ap-mumbai' },
  { value: 'ap-shanghai' },
  { value: 'ap-shanghai-fsi' },
  { value: 'ap-shenzhen-fsi' },
  { value: 'ap-singapore' },
  { value: 'ap-tokyo' },
  { value: 'eu-frankfurt' },
  { value: 'na-siliconvalley' },
  { value: 'na-toronto' },
];
// 需要缓存到storage的内容的key列表
const keyInStorage = {
  version: 'version',
};
/*
如果有InstanceId额外的维度，原则上都需要传入此map结构配置
key的含义：
  经过InvalidDemensions处理后的string。topicId =》TopicId。
  否则认为指标中维度正确，和指标中维度字段保持一致，即topicId
value的含义：
  1 dim_KeyInStorage 指标中维度dimension对应的storage中的key，获取缓存列表，sourceMapList、
  2 dim_KeyInTarget  通过getVariable方法获取变量中选中项。比如ListnerId为Lis-xxxx；即：STATE中的key。
                    默认取通过InvalidDemsion处理后的key
  3 dim_KeyInMap     保存在模板变量value比如（监听器ID）源自sourceMapList（接口返回内容）的哪个key（ListenerId）。
                    即：templateQueryIdMap中内容。
                    联合上面2的内容筛选出原始sourceMap
*/
const queryMonitorExtraConfg = {
  Version: {
    dim_KeyInStorage: keyInStorage.version,
    dim_KeyInTarget: 'version',
    dim_KeyInMap: templateQueryIdMap.version,
  },
};
export default SCF_STATE;
export {
  SCFInstanceAliasList,
  SCFInvalidDemensions,
  queryMonitorExtraConfg,
  regionSupported,
  templateQueryIdMap,
  keyInStorage,
  GetInstanceQueryParams as SCFGetInstanceQueryParams,
};

// monitor监控数据默认支持的维度
export const SCFDefaultDimensionList = ['functionName', 'namespace', 'version'];
