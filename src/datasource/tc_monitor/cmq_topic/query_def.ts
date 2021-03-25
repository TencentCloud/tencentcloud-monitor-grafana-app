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
  subscriptionId: 'SubscriptionId',
};

// 因为cmq那边，以TopciName为主键
export const templateQueryIdMap = {
  instance: 'TopicName',
};

// 与名称挂钩的变量
const InstanceAliasList = ['TopicName', 'TopicId'];
export { InstanceAliasList, GetInstanceQueryParams };

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
