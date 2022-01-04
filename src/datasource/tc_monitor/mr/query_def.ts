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
        if (k.startsWith('host4')) return 'Ip'; // host4***
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
  node: 'Ip',
};

// 需要缓存到storage的内容的key列表
const keyInStorage = {
  node: 'nodeIP',
};

/**
 * 如果有InstanceId额外的维度，原则上都需要传入此map结构配置
 *
 * `key` 的含义：
 *   经过InvalidDemensions处理后的string。topicId => TopicId。
 *   否则认为指标中维度正确，和指标中维度字段保持一致，即topicId
 *
 * `value` 的含义：
 *   @param {1} dim_KeyInStorage  指标中维度dimension对应的storage中的key，获取缓存列表，sourceMapList、
 *   @param {2} dim_KeyInTarget   通过getVariable方法获取变量中选中项。比如ListnerId为Lis-xxxx；即：STATE中的key。
 *                                  默认取通过InvalidDemsion处理后的key
 *   @param {3} dim_KeyInMap      保存在模板变量value比如（监听器ID）源自sourceMapList（接口返回内容）的哪个key（ListenerId）。
 *                                  即：templateQueryIdMap中内容。
 *                                  联合上面 2 的内容筛选出原始sourceMap
 */
const queryMonitorExtraConfg = {
  Ip: {
    dim_KeyInStorage: keyInStorage.node,
    dim_KeyInTarget: 'nodeIP',
    dim_KeyInMap: templateQueryIdMap.node,
  },
};

// 与名称挂钩的变量
const InstanceAliasList = ['ClusterId', 'ClusterName'];
export { InstanceAliasList, GetInstanceQueryParams, queryMonitorExtraConfg, keyInStorage };

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
