import _ from 'lodash';

const InstanceTypes = [
  { text: '主实例', value: 1 },
  { text: '备灾实例', value: 2 },
  { text: '只读实例', value: 3 },
];

const Status = [
  { text: '创建中', value: 0 },
  { text: '运行中', value: 1 },
  { text: '隔离中', value: 4 },
  { text: '已隔离', value: 5 },
];

const PayTypes = [
  { text: '包年包月', value: 0 },
  { text: '小时计费', value: 1 },
];

const TaskStatus = [
  { text: '没有任务', value: 0 },
  { text: '升级中', value: 1 },
  { text: '数据导入中', value: 2 },
  { text: '开放Slave中', value: 3 },
  { text: '外网访问开通中', value: 4 },
  { text: '批量操作执行中', value: 5 },
  { text: '回档中', value: 6 },
  { text: '外网访问关闭中', value: 7 },
  { text: '密码修改中', value: 8 },
  { text: '实例名修改中', value: 9 },
  { text: '重启中', value: 10 },
  { text: '自建迁移中', value: 12 },
  { text: '删除库表中', value: 13 },
  { text: '灾备实例创建同步中', value: 14 },
  { text: '升级待切换', value: 15 },
  { text: '升级切换中', value: 16 },
  { text: '升级切换完成', value: 17 },
];

const EngineVersions = [
  { text: '5.1', value: '5.1' },
  { text: '5.5', value: '5.5' },
  { text: '5.6', value: '5.6' },
  { text: '5.7', value: '5.7' },
];

const OrderBy = [
  { text: 'InstanceId', value: 'InstanceId' },
  { text: 'InstanceName', value: 'InstanceName' },
  { text: 'CreateTime', value: 'CreateTime' },
  { text: 'DeadlineTime', value: 'DeadlineTime' },
];

const OrderDirection = [
  { text: 'ASC', value: 'ASC' },
  { text: 'DESC', value: 'DESC' },
];

const InitFlag = [
  { text: '未初始化', value: 0 },
  { text: '初始化', value: 1 },
];

const CdbErrors = [
  { text: '未锁定', value: 0 },
  { text: '锁定', value: 1 },
];

const CDBFields = {
  ProjectId: '',
  InstanceTypes: {},
  Vips: [],
  Status: {},
  Offset: 0,
  Limit: 20,
  SecurityGroupId: '',
  PayTypes: {},
  InstanceNames: [],
  TaskStatus: {},
  EngineVersions: {},
  VpcIds: [],
  ZoneIds: [],
  SubnetIds: [],
  CdbErrors: {},
  OrderBy: {},
  OrderDirection: {},
  InstanceIds: [],
  InitFlag: {},
};

const CDBFieldsDescriptor = [
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
    key: 'InstanceNames',
    enDescriptor: 'Instance Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'Instance ID',
    cnDescriptor: '实例ID',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'ZoneIds',
    enDescriptor: 'Zone ID',
    cnDescriptor: '可用区的ID',
    link: '',
    type: 'dropdownmulti',
  },
  {
    key: 'InstanceTypes',
    enDescriptor: 'Instance Type',
    cnDescriptor: '实例类型',
    link: '',
    multiple: true,
    type: 'select',
    list: InstanceTypes,
  },
  {
    key: 'EngineVersions',
    enDescriptor: 'Engine Version',
    cnDescriptor: '实例数据库引擎版本',
    link: '',
    multiple: true,
    type: 'select',
    list: EngineVersions,
  },
  {
    key: 'TaskStatus',
    enDescriptor: 'Task Status',
    cnDescriptor: '实例任务',
    link: '',
    multiple: true,
    type: 'select',
    list: TaskStatus,
  },
  {
    key: 'InitFlag',
    enDescriptor: 'Init Flag',
    cnDescriptor: '实例初始化状态',
    link: '',
    multiple: true,
    type: 'select',
    list: InitFlag,
  },
  {
    key: 'PayTypes',
    enDescriptor: 'Pay Type',
    cnDescriptor: '付费类型',
    link: '',
    multiple: true,
    type: 'select',
    list: PayTypes,
  },
  {
    key: 'CdbErrors',
    enDescriptor: 'CDB Errors',
    cnDescriptor: '实例锁定标记',
    link: '',
    multiple: true,
    type: 'select',
    list: CdbErrors,
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
    key: 'OrderBy',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: OrderBy,
  },
  {
    key: 'OrderDirection',
    enDescriptor: 'Order Direction',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: OrderDirection,
  },
  {
    key: 'Vips',
    enDescriptor: 'Vip',
    cnDescriptor: '实例内网IP地址',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'VpcIds',
    enDescriptor: 'Vpc ID',
    cnDescriptor: '私有网络ID',
    link: 'https://cloud.tencent.com/document/api/215/15778',
    type: 'inputmulti',
  },
  {
    key: 'SubnetIds',
    enDescriptor: 'Subnet ID',
    cnDescriptor: '子网ID',
    link: 'https://cloud.tencent.com/document/api/215/15784',
    type: 'inputmulti',
  },
  {
    key: 'ProjectId',
    enDescriptor: 'Project ID',
    cnDescriptor: '项目ID',
    link: 'https://cloud.tencent.com/document/product/378/4400',
    type: 'input',
  },
  {
    key: 'SecurityGroupId',
    enDescriptor: 'Security Group ID',
    cnDescriptor: '安全组ID',
    link: 'https://cloud.tencent.com/document/api/236/15854',
    type: 'input',
  },
];

const CDB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: { ...CDBFields },
};

const CDBInstanceAliasList = ['InstanceId', 'InstanceName', 'Vip'];

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
function isValidMetric(metricObj: any = {}) {
  const dimension = _.get(metricObj, 'Dimensions[0].Dimensions');
  return dimension.length === 2 && _.indexOf(dimension, 'instanceid') !== -1 && _.indexOf(dimension, 'insttype') !== -1;
}
function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = item.Dimensions.map((i) => CDBInvalidDemensions[i] || i);
  });
  return metricTmp;
}
const CDBInvalidDemensions = {
  instanceid: 'InstanceId',
  insttype: 'InstanceType',
  region: 'Region',
};
const templateQueryIdMap = {
  instance: 'InstanceId',
};
export default CDB_STATE;

export {
  CDBFieldsDescriptor,
  CDBInstanceAliasList,
  templateQueryIdMap,
  CDBInvalidDemensions,
  isValidMetric,
  modifyDimensons,
  GetInstanceQueryParams as CDBGetInstanceQueryParams,
};
