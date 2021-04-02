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
};

const templateQueryIdMap = {
  instance: 'FunctionId',
};
const regionSupported = [
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '西南地区(重庆)', value: 'ap-chongqing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '亚太南部(孟买)', value: 'ap-mumbai' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '亚太东北(东京)', value: 'ap-tokyo' },
  { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
  { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
  { text: '北美地区(多伦多)', value: 'na-toronto' },
];
export default SCF_STATE;
export {
  SCFInstanceAliasList,
  SCFInvalidDemensions,
  regionSupported,
  templateQueryIdMap,
  GetInstanceQueryParams as SCFGetInstanceQueryParams,
};

// monitor监控数据默认支持的维度
export const SCFDefaultDimensionList = ['functionName', 'namespace', 'version'];
