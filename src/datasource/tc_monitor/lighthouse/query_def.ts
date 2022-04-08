import _ from 'lodash';

const LighthouseStateType = [
  { text: '创建中', value: 'PENDING' },
  { text: '创建失败', value: 'LAUNCH_FAILED' },
  { text: '运行中', value: 'RUNNING' },
  { text: '关机', value: 'STOPPED' },
  { text: '开机中', value: 'STARTING' },
  { text: '关机中', value: 'STOPPING' },
  { text: '重启中', value: 'REBOOTING' },
  { text: '停止待销毁', value: 'SHUTDOWN' },
  { text: '销毁中', value: 'TERMINATING' },
];

const LighthouseFilterFields = {
  zone: [],
  'instance-name': [],
  'instance-state': {},
  'private-ip-address': [],
  'public-ip-address': [],
};

const LighthouseFilterFieldsDescriptor = [
  {
    key: 'instance-name',
    enDescriptor: 'Instance Name',
    cnDescriptor: '实例名称',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'private-ip-address',
    enDescriptor: 'Private IP Address',
    cnDescriptor: '实例主网卡的内网IP',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'public-ip-address',
    enDescriptor: 'Public IP Address',
    cnDescriptor: '实例主网卡的公网IP',
    link: '',
    type: 'inputmulti',
  },
  {
    key: 'zone',
    enDescriptor: 'Zone',
    cnDescriptor: '可用区',
    link: '',
    type: 'dropdownmulti',
  },
  {
    key: 'instance-state',
    enDescriptor: 'Instance State',
    cnDescriptor: '实例状态',
    link: '',
    type: 'select',
    list: LighthouseStateType,
  },
];

const LIGHTHOUSE_STATE = {
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
    Filters: { ...LighthouseFilterFields },
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
        if (Filters.length > 9) {
          return;
        }
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

const LIGHTHOUSEInstanceAliasList = ['InstanceId', 'InstanceName', 'PrivateIpAddresses', 'PublicIpAddresses'];

const LighthouseInvalidDemensions = {
  instanceid: 'InstanceId',
};

const templateQueryIdMap = {
  instance: 'InstanceId',
};

function modifyDimensons(metricItem: any) {
  const metricTmp = _.cloneDeep(metricItem);
  metricTmp.Dimensions.forEach((item) => {
    item.Dimensions = ['InstanceId'];
  });
  return metricTmp;
}

export default LIGHTHOUSE_STATE;

export {
  LighthouseFilterFieldsDescriptor,
  LIGHTHOUSEInstanceAliasList,
  LighthouseInvalidDemensions,
  templateQueryIdMap,
  modifyDimensons,
  GetInstanceQueryParams as LIGHTHOUSEGetInstanceQueryParams,
};
