import * as _ from 'lodash';
const InstanceTypes = [
  { text: '所有实例', value: 0 },
  { text: '正式实例', value: 1 },
  { text: '临时实例', value: 2 },
  { text: '只读实例', value: 3 },
  { text: '正式，只读，灾备实例', value: -1 },
];

const ClusterTypes = [
  { text: '副本集实例', value: 0 },
  { text: '分片实例', value: 1 },
  { text: '所有实例', value: -1 },
];

const Status = [
  { text: '待初始化', value: 0 },
  { text: '流程执行中', value: 1 },
  { text: '实例有效', value: 2 },
  { text: '实例已过期', value: -2 },
];

const PayMode = [
  { text: '按量计费', value: 0 },
  { text: '包年包月', value: 1 },
  { text: '按量包年包月计费', value: -1 },
];

const OrderBy = [
  { text: 'ProjectId', value: 'ProjectId' },
  { text: 'InstanceName', value: 'InstanceName' },
  { text: 'CreateTime', value: 'CreateTime' },
];

const OrderByType = [
  { text: '升序', value: 'ASC' },
  { text: '降序', value: 'DESC' }
];

const MongoDBFields = {
  InstanceIds: [],
  InstanceType: {},
  ClusterType: {},
  Status: [],
  VpcId: '',
  SubnetId: '',
  PayMode: {},
  Limit: 20,
  Offset: 0,
  OrderBy: '',
  OrderByType: '',
};

const MONGODBFieldsDescriptor = [
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
    cnDescriptor: '单次请求返回的数量，默认为20，最大值为100',
    link: '',
    type: 'inputnumber',
    min: 0,
    max: 100,
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'InstancesIds',
    cnDescriptor: '实例名称',
    type: 'inputmulti',
  },
  {
    key: 'InstanceType',
    enDescriptor: 'InstanceType',
    cnDescriptor: '实例类型',
    link: '',
    type: 'select',
    list: InstanceTypes,
  },
  {
    key: 'ClusterType',
    enDescriptor: 'ClusterType',
    cnDescriptor: '集群类型',
    link: '',
    type: 'select',
    list: ClusterTypes,
  },
  {
    key: 'Status',
    enDescriptor: 'Status',
    cnDescriptor: '实例状态',
    link: '',
    multiple: true,
    type: 'select',
    list: Status,
  },
  {
    key: 'VpcId',
    enDescriptor: 'VpcId',
    cnDescriptor: '私有网络的ID',
    link: '',
    type: 'input',
  },
  {
    key: 'SubnetId',
    enDescriptor: 'SubnetId',
    cnDescriptor: '私有网络的子网ID，基础网络则不传该参数。入参设置该参数的同时，必须设置相应的VpcId',
    link: '',
    type: 'input',
  },
  {
    key: 'PayMode',
    enDescriptor: 'PayMode',
    cnDescriptor: '付费类型',
    link: '',
    type: 'select',
    list: PayMode,
  },
  {
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: OrderBy,
  },
  {
    key: 'OrderByType',
    enDescriptor: 'OrderByType',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: OrderByType,
  },
];

const MONGODB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: Object.assign({}, MongoDBFields),
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
      } else if (_.isObject(item)) {   // select 单选
        if (_.get(item, 'value', undefined) !== undefined) {
          params[key] = _.get(item, 'value');
        }
      } else if (_.isNumber(item) || !_.isEmpty(item)) {
        params[key] = item;
      }
    });
  }
  return params;
}

const MONGODBInstanceAliasList = ['InstanceId', 'InstanceName'];

export default MONGODB_STATE;
export {
  MONGODBFieldsDescriptor,
  MONGODBInstanceAliasList,
  GetInstanceQueryParams as MONGODBGetInstanceQueryParams,
};
