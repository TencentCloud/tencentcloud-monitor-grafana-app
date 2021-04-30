import _ from 'lodash';

export const InstanceQueryDescriptor = [
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
    cnDescriptor: '单次请求返回的数量，默认为10，最小值为1，最大值为100',
    link: '',
    type: 'inputnumber',
    min: 1,
    max: 100,
  },
  {
    key: 'InstanceIds',
    enDescriptor: 'InstanceIds',
    cnDescriptor: '按照一个或者多个实例ID查询。实例ID形如: emr-xxxxxxxx ',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'OrderField',
    enDescriptor: 'OrderBy',
    cnDescriptor: '排序字段',
    link: '',
    type: 'select',
    list: [
      { text: '实例ID', value: 'clusterId' },
      { text: '创建时间', value: 'addTime' },
      { text: '状态', value: 'status' },
    ],
  },
  {
    key: 'Asc',
    enDescriptor: 'Order Direction',
    cnDescriptor: '排序方式',
    link: '',
    type: 'select',
    list: [
      { text: '降序', value: 0 },
      { text: '升序', value: 1 },
    ],
  },
  {
    key: 'ProjectId',
    enDescriptor: 'ProjectId',
    cnDescriptor: '实例所属项目ID',
    link: '',
    type: 'inputnumber',
  },
  {
    key: 'DisplayStrategy',
    enDescriptor: 'DisplayStrategy',
    cnDescriptor: '集群筛选策略',
    link: '',
    type: 'select',
    list: [
      { text: '未销毁的实例', value: 'clusterList' },
      { text: '正常运行的实例', value: 'monitorManage' },
    ],
  },
];

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

// 向实例里面塞dimensions对应的值，dimension中的key对应到实例中的key
export const InvalidDemensions = new Proxy(
  {},
  {
    get(target, k, receiver) {
      if (typeof k === 'string') {
        if (k.startsWith('id4')) return 'ClusterId'; // id4****
        if (k.startsWith('host4')) return 'nodeIP'; // host4***
      }
      return Reflect.get(target, k, receiver);
    },
    has(target, propKey) {
      return true;
    },
  }
);

export const templateQueryIdMap = {
  instance: 'ClusterId',
};

// 与名称挂钩的变量
const InstanceAliasList = ['ClusterId', 'ClusterName'];
export { InstanceAliasList, GetInstanceQueryParams };

// 界面状态模型，default
export default {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'ClusterId',
  nodeIP: '',
  queries: {
    Offset: 0,
    Limit: 10,
    DisplayStrategy: '',
    OrderBy: {},
    Order: {},
    InstanceIds: [],
    ProjectId: -1,
    OrderField: '',
    Asc: '',
  },
};
