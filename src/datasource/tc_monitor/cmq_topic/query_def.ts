import _ from 'lodash';
import { FildDescriptorType } from '../_base/types';

export const InstanceQueryDescriptor: FildDescriptorType = [
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
    cnDescriptor: '单次请求返回的数量，默认为10，最小值为1，最大值为100',
    link: '',
    type: 'inputNumber',
    min: 1,
    max: 50,
  },
  {
    key: 'TopicName',
    enDescriptor: 'TopicName',
    cnDescriptor: '精确匹配TopicName',
    link: '',
    type: 'input',
  },
  {
    key: 'TagKey',
    enDescriptor: 'TagKey',
    cnDescriptor: '标签搜索',
    link: '',
    type: 'input',
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
export const InvalidDemensions = {
  topicId: 'TopicId',
};

// 因为cmq那边，以TopciName为主键
export const templateQueryIdMap = {
  instance: 'TopicName',
  subscription: 'SubscriptionId',
};

// 需要缓存到storage的内容的key列表
const keyInStorage = {
  subscriptionId: 'subscriptionId',
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
  subscriptionId: {
    dim_KeyInStorage: keyInStorage.subscriptionId,
    dim_KeyInTarget: 'subscriptionId',
    dim_KeyInMap: templateQueryIdMap.subscription,
  },
};
// 与名称挂钩的变量
const InstanceAliasList = ['TopicName', 'TopicId'];
export { InstanceAliasList, GetInstanceQueryParams, queryMonitorExtraConfg, keyInStorage };

// 界面状态模型，default
export default {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'TopicName',
  subscriptionId: '',
  queries: {
    Offset: 0,
    Limit: 20,
    TopicName: '',
    TagKey: '',
  },
};
