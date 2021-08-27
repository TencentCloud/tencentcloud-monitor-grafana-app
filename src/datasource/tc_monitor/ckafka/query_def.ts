import _ from 'lodash';

export const CKAFKAQueryDescriptor = [
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
    key: 'InstanceId',
    enDescriptor: 'InstanceId',
    cnDescriptor: '按照实例ID过滤',
    link: '',
    type: 'input',
  },
  {
    key: 'SearchWord',
    enDescriptor: 'SearchWord',
    cnDescriptor: '按照实例名称过滤，支持模糊查询',
    link: '',
    type: 'input',
  },
  {
    key: 'TagKey',
    enDescriptor: 'TagKey',
    cnDescriptor: '匹配标签key值',
    link: '',
    type: 'input',
  },
  {
    key: 'Status',
    enDescriptor: 'Status',
    cnDescriptor: '实例的状态，不填默认返回全部',
    link: '',
    type: 'select',
    multiple: true,
    list: [
      { text: '创建中', value: 0 },
      { text: '运行中', value: 1 },
      { text: '删除中', value: 2 },
    ],
  },
];

const CKAFKA_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  topicId: '',
  topicName: '',
  consumerGroup: '',
  partition: '',
  queries: {
    Offset: 0,
    Limit: 10,
    Status: [],
    InstanceId: '',
    SearchWord: '',
    TagKey: '',
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

const CKAFKAInstanceAliasList = ['InstanceId', 'InstanceName'];
const CKAFKATopicAliasList = ['TopicId', 'TopicName'];
// 保存在模板变量value中的key
const templateQueryIdMap = {
  instance: 'InstanceId',
  topicId: 'TopicId',
  groupName: 'GroupName',
  partition: 'Partition',
};
// 向实例里面塞dimensions对应的值，dimension中的key对应到实例中的key
const CKAFKAInvalidDemensions = {
  instanceId: 'InstanceId',
  topicId: 'TopicId',
  topicName: 'TopicName',
  consumerGroup: 'GroupName',
  partition: 'PartitionId',
};
// 需要缓存到storage的内容的key列表
const keyInStorage = {
  TopicList: 'TopicList',
  GroupList: 'GroupList',
  PartitionList: 'PartitionList',
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
  TopicId: {
    dim_KeyInStorage: keyInStorage.TopicList,
    dim_KeyInTarget: 'topicId',
    dim_KeyInMap: templateQueryIdMap.topicId,
  },
  // topicName和topicId是同一个storage中的source，所以根据topicId帅选
  TopicName: {
    dim_KeyInStorage: keyInStorage.TopicList,
    dim_KeyInTarget: 'topicId',
    dim_KeyInMap: templateQueryIdMap.topicId,
  },
  GroupName: {
    dim_KeyInStorage: keyInStorage.GroupList,
    dim_KeyInTarget: 'consumerGroup',
    dim_KeyInMap: templateQueryIdMap.groupName,
  },
  Partition: {
    dim_KeyInStorage: keyInStorage.PartitionList,
    dim_KeyInTarget: 'partition',
    dim_KeyInMap: templateQueryIdMap.partition,
  },
};
export default CKAFKA_STATE;
export {
  CKAFKAInstanceAliasList,
  CKAFKATopicAliasList,
  CKAFKAInvalidDemensions,
  templateQueryIdMap,
  keyInStorage,
  queryMonitorExtraConfg,
  GetInstanceQueryParams as CKAFKAGetInstanceQueryParams,
};
