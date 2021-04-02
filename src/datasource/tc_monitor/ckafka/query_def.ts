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

const templateQueryIdMap = {
  instance: 'InstanceId',
};
// 向实例里面塞dimensions对应的值，dimension中的key对应到实例中的key
const CKAFKAInvalidDemensions = {
  instanceId: 'InstanceId',
};

export default CKAFKA_STATE;
export {
  CKAFKAInstanceAliasList,
  CKAFKAInvalidDemensions,
  templateQueryIdMap,
  GetInstanceQueryParams as CKAFKAGetInstanceQueryParams,
};
