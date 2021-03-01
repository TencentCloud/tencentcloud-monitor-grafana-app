import * as _ from 'lodash';
const BillingMode = [
  { text: '按量计费', value: 'postpaid' },
  { text: '包年包月', value: 'prepaid' },
];

const AutoRenew = [
  { text: '手动续费', value: 0 },
  { text: '自动续费', value: 1 },
  { text: '明确不自动续费', value: 2 },
];

const Status = [
  { text: '待初始化', value: 0 },
  { text: '流程执行中', value: 1 },
  { text: '运行中', value: 2 },
  { text: '已隔离', value: -2 },
  { text: '待删除', value: -3 },
];

const TypeVersion = [
  { text: '单机版', value: 1 },
  { text: '主从版', value: 2 },
  { text: '集群版', value: 3 },
];

const OrderBy = [
  { text: 'projectId', value: 'projectId' },
  { text: 'instancename', value: 'instancename' },
  { text: 'createtime', value: 'createtime' },
  { text: 'type', value: 'type' },
  { text: 'curDeadline', value: 'curDeadline' },
];

const OrderType = [
  { text: '升序', value: 0 },
  { text: '降序', value: 1 }
];
const Type = [
  { text: 'Redis老集群版', value: 1 },
  { text: 'Redis 2.8主从版', value: 2 },
  { text: 'CKV主从版', value: 3 },
  { text: 'CKV集群版', value: 4 },
  { text: 'Redis 2.8单机版', value: 5 },
  { text: 'Redis 4.0主从版', value: 6 },
  { text: 'Redis 4.0集群版', value: 7 },
  { text: 'Redis5.0主从版', value: 8 },
  { text: 'Redis5.0集群版', value: 9 }
];

const RedisFields = {
  InstanceId: '',
  OrderBy: '',
  OrderType: null,
  VpcIds: [],
  SubnetIds: [],
  ProjectIds: [],
  SearchKey: '',
  InstanceName: '',
  UniqVpcIds: [],
  UniqSubnetIds: [],
  Status: [],
  TypeVersion: null,
  EngineName: '',
  AutoRenew: null,
  BillingMode: '',
  Type: null
};

const RedisMemFieldsDescriptor = [
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
    key: 'InstanceId',
    enDescriptor: 'InstancesId',
    cnDescriptor: '实例id',
    type: 'input',
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
    key: 'OrderType',
    enDescriptor: 'OrderType',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: OrderType,
  },
  {
    key: 'VpcIds',
    enDescriptor: 'VpcIds',
    cnDescriptor: '私有网络ID数组，数组下标从0开始，如果不传则默认选择基础网络，如：47525',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'SubnetIds',
    enDescriptor: 'SubnetIds',
    cnDescriptor: '子网ID数组，数组下标从0开始，如：56854',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'ProjectIds',
    enDescriptor: 'ProjectIds',
    cnDescriptor: '项目ID 组成的数组',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'SearchKey',
    enDescriptor: 'SearchKey',
    cnDescriptor: '查找实例的ID',
    link: '',
    type: 'input',
  },
  {
    key: 'InstanceName',
    enDescriptor: 'InstanceName',
    cnDescriptor: '实例名称',
    link: '',
    type: 'input',
  },
  {
    key: 'UniqVpcIds',
    enDescriptor: 'UniqVpcIds',
    cnDescriptor: '私有网络ID数组，数组下标从0开始，如果不传则默认选择基础网络，如：vpc-sad23jfdfk',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'UniqSubnetIds',
    enDescriptor: 'UniqSubnetIds',
    cnDescriptor: '子网ID数组，数组下标从0开始，如：subnet-fdj24n34j2',
    link: '',
    type: 'inputMulti',
  },
  {
    key: 'Status',
    enDescriptor: 'Status',
    cnDescriptor: '实例状态',
    multiple: true,
    type: 'select',
    list: Status,
  },
  {
    key: 'TypeVersion',
    enDescriptor: 'TypeVersion',
    cnDescriptor: '类型版本',
    link: '',
    type: 'select',
    list: TypeVersion,
  },
  {
    key: 'EngineName',
    enDescriptor: 'EngineName',
    cnDescriptor: '引擎信息：Redis-2.8，Redis-4.0，CKV',
    link: '',
    type: 'input',
  },
  {
    key: 'AutoRenew',
    enDescriptor: 'AutoRenew',
    cnDescriptor: '续费模式',
    multiple: true,
    type: 'select',
    list: AutoRenew,
  },
  {
    key: 'BillingMode',
    enDescriptor: 'BillingMode',
    cnDescriptor: '计费模式：postpaid-按量计费；prepaid-包年包月',
    link: '',
    type: 'select',
    list: BillingMode
  },
  {
    key: 'Type',
    enDescriptor: 'Type',
    cnDescriptor: '实例类型',
    link: '',
    type: 'select',
    list: Type
  },
];

const REDISMEM_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: Object.assign({}, RedisFields),
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

function isValidMetric(metricObj: any = {}) {
  const dimension = _.get(metricObj, 'Dimensions[0].Dimensions');
  return dimension.length === 1 && _.indexOf(dimension, 'pnodeid') === -1 && _.indexOf(dimension, 'rnodeid') === -1;
}

const REDISMEMInstanceAliasList = ['InstanceId', 'InstanceName'];

const RedisMemInvalidDemensions = {
  'instanceid': 'InstanceId',
};

export default REDISMEM_STATE;
export {
  RedisMemFieldsDescriptor,
  RedisMemInvalidDemensions,
  REDISMEMInstanceAliasList,
  isValidMetric,
  GetInstanceQueryParams as REDISMEMGetInstanceQueryParams,
};
