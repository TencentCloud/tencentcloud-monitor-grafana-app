import * as _ from 'lodash';

const PCXFields = {
  limit: 20,
  offset: 0,
  peeringConnectionId: '',
  peeringConnectionName: '',
  vpcId: '',
  state: undefined,
};

const PCX_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'peeringConnectionId',
  queries: Object.assign({}, PCXFields),
};

const StateTypes = [
  { text: '申请中',    value: 0 },
  { text: '连接成功',  value: 1 },
  { text: '已过期',    value: 2 },
  { text: '对端已拒绝', value: 3 },
  { text: '对端已删除', value: 4 }
];

const PCXFieldsDescriptor = [
  {
    key: 'offset',
    enDescriptor: 'offset',
    cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
    link: '',
    type: 'inputnumber',
    min: 0,
  },
  {
    key: 'limit',
    enDescriptor: 'limit',
    cnDescriptor: '单次请求返回的数量，默认为20，最大值为50',
    link: '',
    type: 'inputnumber',
    min: 0,
    max: 50,
  },
  {
    key: 'peeringConnectionId',
    enDescriptor: 'PeeringConnection Id',
    cnDescriptor: '私有网络对等连接 ID',
    link: '',
    type: 'input'
  },
  {
    key: 'peeringConnectionName',
    enDescriptor: 'PeeringConnection Name',
    cnDescriptor: '对等连接名称',
    link: '',
    type: 'input'
  },
  {
    key: 'vpcId',
    enDescriptor: 'vpcId',
    cnDescriptor: '发起方私有网络 ID 值',
    link: 'https://cloud.tencent.com/document/api/215/1372',
    type: 'dropdown'
  },
  {
    key: 'state',
    enDescriptor: 'state',
    cnDescriptor: '连接状态',
    link: '',
    type: 'select',
    list: StateTypes,
  },
];


const PCXInstanceAliasList = ['peeringConnectionId', 'peeringConnectionName'];

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.limit = _.get(queries, 'limit', 20) || 20;
    params.offset = _.get(queries, 'offset', 0) || 0;
    queries = _.omit(queries, ['offset', 'limit']);
    _.forEach(queries, (item: any, key) => {
      if (_.isArray(item)) {
        item = _.compact(item);
        if (item.length > 0) {
          params[key] = _.uniq(item);
        }
      } else if (_.isObject(item)) {
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

export default PCX_STATE;

export {
  PCXInstanceAliasList,
  PCXFieldsDescriptor,
  GetInstanceQueryParams as PCXGetInstanceQueryParams,
};
