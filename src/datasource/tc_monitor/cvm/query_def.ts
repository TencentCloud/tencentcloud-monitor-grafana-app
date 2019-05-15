import * as _ from 'lodash';
const instanceChargeTypes = [
  { text: '预付费', value: 'PREPAID' },
  { text: '后付费', value: 'POSTPAID_BY_HOUR' },
  { text: 'CDH付费', value: 'CDHPAID' },
];

const CVMFilterFields = {
  zone: [],
  "project-id": [],
  "host-id": [],
  "vpc-id": [],
  "subnet-id": [],
  "instance-id": [],
  "security-group-id": [],
  "instance-name": [],
  "instance-charge-type": {},
  "private-ip-address": [],
  "public-ip-address": [],
};

const CVMFilterFieldsDescriptor = [
  {
    key: 'zone',
    enDescriptor: 'Zone',
    cnDescriptor: '可用区',
    link: '',
    type: 'dropdown',
  },
  {
    key: 'project-id',
    enDescriptor: 'Project ID',
    cnDescriptor: '项目ID',
    link: 'https://cloud.tencent.com/document/api/378/4400',
    type: 'inputNumber',
  },
  {
    key: 'host-id',
    enDescriptor: 'CDH ID',
    cnDescriptor: 'CDH ID',
    link: 'https://cloud.tencent.com/document/product/416/19730',
    type: 'input',
  },
  {
    key: 'vpc-id',
    enDescriptor: 'VPC ID',
    cnDescriptor: 'VPC ID',
    link: '',
    type: 'input',
  },
  {
    key: 'subnet-id',
    enDescriptor: 'Subnet ID',
    cnDescriptor: '子网ID',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-id',
    enDescriptor: 'Instance ID',
    cnDescriptor: '实例ID',
    link: '',
    type: 'input',
  },
  {
    key: 'security-group-id',
    enDescriptor: 'Security Group ID',
    cnDescriptor: '安全组ID',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-name',
    enDescriptor: 'Instance Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'input',
  },
  {
    key: 'instance-charge-type',
    enDescriptor: 'Instance Charge Type',
    cnDescriptor: '实例计费模式',
    link: '',
    type: 'select',
    list: instanceChargeTypes,
  },
  {
    key: 'private-ip-address',
    enDescriptor: 'Private IP Address',
    cnDescriptor: '实例主网卡的内网IP',
    link: '',
    type: 'input',
  },
  {
    key: 'public-ip-address',
    enDescriptor: 'Public IP Address',
    cnDescriptor: '实例主网卡的公网IP，包含实例创建时自动分配的IP和实例创建后手动绑定的弹性IP',
    link: '',
    type: 'input',
  },
];

const CVM_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'InstanceId',
  queries: {
    Limit: 20,
    Offset: 0,
    instanceIdsChecked: false,
    filtersChecked: false,
    InstanceIds: [''],
    Filters: Object.assign({}, CVMFilterFields),
  },
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries.InstanceIds)) {
        const InstanceIds = _.compact(queries.InstanceIds);
        if (_.uniq(InstanceIds).length > 0) {
          params.InstanceIds = _.uniq(InstanceIds).slice(0, 100);
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

const CVMInstanceAliasList = ['InstanceId', 'InstanceName', 'PrivateIpAddresses', 'PublicIpAddresses'];

const CVMInvalidMetrics = ['DcCPUUsage', 'DcMemUsage'];

export default CVM_STATE;
export {
  CVMFilterFieldsDescriptor,
  CVMInstanceAliasList,
  CVMInvalidMetrics,
  GetInstanceQueryParams as CVMGetInstanceQueryParams,
};
