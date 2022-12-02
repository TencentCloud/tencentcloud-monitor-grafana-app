// 产品目录名字和service名字匹配即 lb_private(目录名) => lbPrivate(service)
import { FildDescriptorType } from '../_base/types';
import _ from 'lodash';

const namespace = 'QCE/ROCKETMQ';

const TDMQInvalidDemensions = {
  tenant: 'ClusterId',
  namespace: 'NamespaceId',
  group: 'Name',
};

// 需和文件名对应
const TDMQROCKETMQInstanceAliasList = ['ClusterId', 'ClusterName'];

const templateQueryIdMap = {
  instance: 'ClusterId',
  namespace: 'NamespaceId',
  group: 'Name',
};

// select类型需要注意是{},multi后缀是[],dropdown是''
const TDMQFilterFields = {
  Limit: 20,
  Offset: 0,
  instanceIdsChecked: false,
  filtersChecked: true,
  ClusterIdList: [''],
  Filters: {
    includeVip: { text: '是', value: 'true' },
  },
};

const TDMQFilterFieldsDescriptor: FildDescriptorType = [
  {
    key: 'includeVip',
    enDescriptor: 'includeVip',
    cnDescriptor: '包含专享集群',
    link: '',
    type: 'select',
    list: [
      { text: '是', value: 'true' },
      { text: '否', value: 'false' },
    ],
  },
];

const TDMQ_STATE = {
  region: '',
  metricName: '',
  metricUnit: '',
  period: undefined,
  dimensionObject: null,
  instance: '',
  instanceAlias: 'ClusterId',
  // 此处key应该是经过TDMQInvalidDemensions处理后的
  namespace: '',
  group: '',
  queries: TDMQFilterFields,
};

function GetInstanceQueryParams(queries: any = {}) {
  const params: any = {};
  if (!_.isEmpty(queries)) {
    params.Limit = _.get(queries, 'Limit', 20) || 20;
    params.Offset = _.get(queries, 'Offset', 0) || 0;
    if (queries.instanceIdsChecked) {
      if (_.isArray(queries.ClusterIdList)) {
        const ClusterIdList = _.compact(queries.ClusterIdList);
        if (_.uniq(ClusterIdList).length > 0) {
          params.ClusterIdList = _.uniq(ClusterIdList).slice(0, 100);
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
            Filters.push({ Name: key, Values: [_.get(item, 'value', [])].slice(0, 5) });
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
const regionSupported = [
  { value: 'ap-beijing' },
  { value: 'ap-chengdu' },
  { value: 'ap-chongqing' },
  { value: 'ap-guangzhou' },
  { value: 'ap-shenzhen-fsi' },
  { value: 'ap-shanghai' },
  { value: 'ap-shanghai-fsi' },
  { value: 'ap-nanjing' },
  { value: 'ap-hongkong' },
  { value: 'ap-tokyo' },
  { value: 'ap-seoul' },
  { value: 'ap-singapore' },
  { value: 'ap-bangkok' },
  { value: 'ap-jakarta' },
  { value: 'ap-mumbai' },
  { value: 'eu-frankfurt' },
  { value: 'eu-moscow' },
  { value: 'na-ashburn' },
  { value: 'na-siliconvalley' },
  { value: 'na-toronto' },
];

// 需要缓存到storage的内容的key列表
const keyInStorage = {
  namespace: 'NamespaceId',
  group: 'Name',
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
  NamespaceId: {
    dim_KeyInStorage: keyInStorage.namespace,
    dim_KeyInTarget: 'namespace',
    dim_KeyInMap: templateQueryIdMap.namespace,
  },
  Name: {
    dim_KeyInStorage: keyInStorage.group,
    dim_KeyInTarget: 'group',
    dim_KeyInMap: templateQueryIdMap.group,
  },
};
export default TDMQ_STATE;
export {
  TDMQFilterFieldsDescriptor,
  templateQueryIdMap,
  TDMQROCKETMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  queryMonitorExtraConfg,
  keyInStorage,
  regionSupported,
  // 对应产品的service的全大写拼接GetInstanceQueryParams
  GetInstanceQueryParams as TDMQROCKETMQGetInstanceQueryParams,
};
