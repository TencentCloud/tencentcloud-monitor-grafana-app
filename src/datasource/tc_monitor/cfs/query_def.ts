import _ from 'lodash';

export const CFSQueryDescriptor = [
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
    key: 'FileSystemId',
    enDescriptor: 'File System Id',
    cnDescriptor: '文件系统 ID',
    link: '',
    type: 'input',
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '私有网络（VPC） ID',
    link: '',
    type: 'input',
  },
  {
    key: 'SubnetId',
    enDescriptor: 'SubnetId',
    cnDescriptor: '子网 ID',
    link: '',
    type: 'input',
  },
];

const CFS_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'FileSystemId',
  version: '',
  queries: {
    Offset: 0,
    Limit: 20,
    FileSystemId: '',
    VpcId: '',
    SubnetId: '',
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

const CFSInstanceAliasList = ['FileSystemId', 'FsName'];

// 向实例里面塞dimensions对应的值，dimension中的key对应到实例中的key
const CFSInvalidDemensions = {
  // functionName: 'FunctionName',
  // namespace: 'Namespace'
};

const regionSupported = [
  { text: '华北地区(北京)', value: 'ap-beijing' },
  { text: '西南地区(成都)', value: 'ap-chengdu' },
  { text: '西南地区(重庆)', value: 'ap-chongqing' },
  { text: '华南地区(广州)', value: 'ap-guangzhou' },
  { text: '港澳台地区(中国香港)', value: 'ap-hongkong' },
  { text: '亚太南部(孟买)', value: 'ap-mumbai' },
  { text: '华东地区(南京)', value: 'ap-nanjing' },
  { text: '亚太东北(首尔)', value: 'ap-seoul' },
  { text: '华东地区(上海)', value: 'ap-shanghai' },
  { text: '华东地区(上海金融)', value: 'ap-shanghai-fsi' },
  { text: '华南地区(深圳金融)', value: 'ap-shenzhen-fsi' },
  { text: '亚太东南(新加坡)', value: 'ap-singapore' },
  { text: '亚太东北(东京)', value: 'ap-tokyo' },
  { text: '欧洲地区(法兰克福)', value: 'eu-frankfurt' },
  { text: '美国西部(硅谷)', value: 'na-siliconvalley' },
  { text: '北美地区(多伦多)', value: 'na-toronto' },
];
const templateQueryIdMap = {
  instance: 'InstanceId',
};
export default CFS_STATE;
export {
  CFSInstanceAliasList,
  CFSInvalidDemensions,
  templateQueryIdMap,
  regionSupported,
  GetInstanceQueryParams as CFSGetInstanceQueryParams,
};

// monitor监控数据默认支持的维度
// export const SCFDefaultDimensionList = ['functionName', 'namespace', 'version'];
