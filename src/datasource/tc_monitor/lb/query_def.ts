import * as _ from 'lodash';

// export const LBQueryDescriptor = [{
//   key: 'Offset',
//   enDescriptor: 'Offset',
//   cnDescriptor: '偏移量, 例如Offset=20&Limit=20 返回第 20 到 40 项',
//   link: '',
//   type: 'inputnumber',
//   min: 0,
// },
// {
//   key: 'Limit',
//   enDescriptor: 'Limit',
//   cnDescriptor: '单次请求返回的数量，默认为20，最小值为1，最大值为2000',
//   link: '',
//   type: 'inputnumber',
//   min: 1,
//   max: 2000,
// },
// {
//   key: 'AddressId',
//   enDescriptor: 'Address Id',
//   cnDescriptor: '标识 EIP 的唯一 ID ',
//   link: '',
//   type: 'inputmulti',
// }
// ];

export const LBFilterDescriptor = [
  {
    key: 'address-id',
    enDescriptor: 'Address ID',
    cnDescriptor: 'EIP 的唯一 ID ',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'address-name',
    enDescriptor: 'Address Name',
    cnDescriptor: 'EIP 名称 ',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'address-ip',
    enDescriptor: 'Address IP',
    cnDescriptor: 'EIP 的 IP 地址 ',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'address-status',
    enDescriptor: 'Address Status',
    cnDescriptor: 'EIP 的状态',
    link: '',
    type: 'select',
    list: [
      { value: 'CREATING', text: 'CREATING' },
      { value: 'BINDING', text: 'BINDING' },
      { value: 'BIND', text: 'BIND' },
      { value: 'UNBINDING', text: 'UNBINDING' },
      { value: 'UNBIND', text: 'UNBIND' },
      { value: 'OFFLINING', text: 'OFFLINING' },
      { value: 'BIND_ENI', text: 'BIND_ENI' },
    ]
  },
  {
    key: 'instance-id',
    enDescriptor: 'Instance ID',
    cnDescriptor: '实例ID ',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'private-ip-address',
    enDescriptor: 'Private IP Address',
    cnDescriptor: 'EIP 绑定的内网 IP',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'network-interface-id',
    enDescriptor: 'Network Interface ID',
    cnDescriptor: 'EIP 绑定的弹性网卡 ID',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'is-arrears',
    enDescriptor: 'Arrears',
    cnDescriptor: 'EIP 是否欠费 ',
    link: '',
    type: 'select',
    list: [
      { text: '正常', value: 'FALSE' },
      { text: '欠费', value: 'TRUE' },
    ]
  },
   
];

// const LBFilterFields = {
//   "address-id": [],
//   "address-name": [],
//   "address-ip": [],
//   "address-status ": [],
//   "instance-id ": [],
//   "private-ip-address": [],
//   "network-interface-id ": [],
//   "is-arrears ": [],
// };

const InstanceKey = 'AddressIds';
const LB_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'AddressId',
  version: '',
  queries: {
    Offset: 0,
    Limit: 20,
    [InstanceKey]: [''],
    Filters:  {
      "address-id": [],
      "address-name": [],
      "address-ip": [],
      "address-status ": [],
      "instance-id ": [],
      "private-ip-address": [],
      "network-interface-id ": [],
      "is-arrears ": [],
    },
  }
}

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries[InstanceKey])) {
        const InstanceIds = _.compact(queries[InstanceKey]);
        if (_.uniq(InstanceIds).length > 0) {
          params[InstanceKey] = _.uniq(InstanceIds).slice(0, 100);
        }
      }
    } else if (queries.filtersChecked) {
      const Filters: any[] = [];
      _.forEach(queries.Filters, (item: any, key) => {
        if (Filters.length > 9) { return; }
        if (_.isArray(item)) {
          item = _.compact(item);
          if (item.length > 0) {
            Filters.push({ Name: key, Values: _.uniq(item).slice(0, 5) });
          }
        } else if (_.isObject(item)) {
          if (!_.isEmpty(_.get(item, 'value', []))) {
            Filters.push({ Name: key, Values: _.get(item, 'value', []).slice(0, 5) });
          }
        }
      });
      if (Filters.length > 0) {
        params.Filters = Filters;
      }
    }
  }
  return params;
}

const LBInstanceAliasList = ['AddressId', 'AddressName', 'AddressIp'];

// 维度eip对应于实例中的哪个字段？映射
const LBInvalidDemensions = {
  eip: 'AddressIp'
};

// 从monitor维度到LB实例对应字段的映射
// export const metric2Instance = {
//   functionName: 'FunctionName',
//   namespace: 'Namespace'
// };

export default LB_STATE;
export {
  LBInstanceAliasList,
  LBInvalidDemensions,
  GetInstanceQueryParams as LBGetInstanceQueryParams,
};

// monitor监控数据默认支持的维度
// export const LBDefaultDimensionList = ['functionName', 'namespace', 'version'];