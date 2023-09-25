import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';
import {
  CKAFKAInstanceAliasList,
  CKAFKATopicAliasList,
  CKAFKAInvalidDemensions,
  templateQueryIdMap,
  keyInStorage,
  queryMonitorExtraConfg,
} from './query_def';

import instanceStorage from '../../common/datasourceStorage';

export default class CKFKADatasource extends BaseDatasource {
  Namespace = 'QCE/CKAFKA';
  InstanceAliasList = CKAFKAInstanceAliasList;
  TopicAliasList = CKAFKATopicAliasList;
  InvalidDimensions = CKAFKAInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'ckafka',
    action: 'DescribeInstances',
    responseField: 'InstanceList',
  };
  extraMetricDims = ['topicId'];
  // extrasAlias = ['topicId', 'consumerGroup', 'partition'];
  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  consumerGroupCache = {};
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getConsumerGroups(region, params) {
    const serviceInfo = GetServiceAPIInfo(region, 'ckafka');
    let { InstanceId, groupname = '', topicid = '' } = params;
    groupname = this.getVariable(groupname); // 将模板转换为真实值
    topicid = this.getVariable(topicid); // 将模板转换为真实值
    try {
      groupname = JSON.parse(groupname)[templateQueryIdMap.groupName];
      topicid = JSON.parse(topicid)[templateQueryIdMap.topicId];
    } catch (e) {}
    let consumerGoup = this.consumerGroupCache[InstanceId];
    if (!consumerGoup) {
      // 从分页数据，获取全量数据
      consumerGoup = await fetchAllFactory(
        (data) => {
          return this.doRequest(
            {
              url: this.url + serviceInfo.path,
              data,
            },
            serviceInfo.service,
            { region, action: 'DescribeConsumerGroup' }
          );
        },
        _.pick(params, 'InstanceId'),
        ['GroupListForMonitor', 'TopicListForMonitor', 'PartitionListForMonitor', 'GroupList']
      );
      // topick数据从DescribeTopic
      const topicList = await fetchAllFactory(
        (data) => {
          return this.doRequest(
            {
              url: this.url + serviceInfo.path,
              data,
            },
            serviceInfo.service,
            { region, action: 'DescribeTopic' }
          );
        },
        _.pick(params, 'InstanceId'),
        ['TopicList']
      );
      consumerGoup[1] = topicList;
      console.log({ consumerGoup, topicList });
      this.consumerGroupCache[InstanceId] = consumerGoup;
    }

    let [GroupList, TopicList, PartitionList, GroupDetailList] = consumerGoup;
    // 无重复数组
    TopicList = _.uniqBy(TopicList, (item) => (item as any).TopicId);
    GroupList = _.uniqBy(GroupList, (item) => (item as any).GroupName);
    PartitionList = _.uniqBy(PartitionList, (item) => (item as any).PartitionId);
    GroupDetailList = _.uniqBy(GroupDetailList, (item) => (item as any).ConsumerGroupName);
    // 如果传入消费者信息，consumergroupname，获取该用户的订阅信息列表
    const SubscribedInfos = GroupDetailList.find((d) => d.ConsumerGroupName === groupname)?.SubscribedInfo || [];
    // 这里为了兼容PartitonList格式，最后转化为数组对象的方式
    const partitions =
      SubscribedInfos.find((sub) => sub.TopicId === topicid)?.Partition?.map((p) => ({
        [templateQueryIdMap.partition]: p,
      })) || [];
    return {
      GroupList,
      TopicList:
        SubscribedInfos.length > 0
          ? SubscribedInfos.map(({ TopicId, TopicName }) => ({ TopicId, TopicName }))
          : TopicList,
      PartitionList: partitions.length > 0 ? partitions : PartitionList,
    };
  }
  formatTopicVarDisplay(topic: Record<string, any>, displayTpl: string | undefined, topicAlias: string) {
    if (displayTpl) {
      return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
        if (!b || !this.TopicAliasList.includes(b)) {
          return '';
        }
        return this.getAliasValue(topic, b);
      });
    }
    return this.getAliasValue(topic, topicAlias);
  }
  // 查询指标下的数据
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    let { topicalias, groupname, topicid } = query;
    const result = await this.getConsumerGroups(region, {
      InstanceId: instance.InstanceId,
      groupname,
      topicid,
    });
    let { display } = query;
    const { TopicList, GroupList, PartitionList } = result;
    topicalias = this.TopicAliasList.includes(topicalias) ? topicalias : this.templateQueryIdMap.topicId;

    const rs = {
      GroupList: GroupList.map((group) => {
        group._InstanceAliasValue = group.GroupName;
        return {
          text: group.GroupName,
          value: group[templateQueryIdMap.groupName],
        };
      }),
      TopicList: TopicList.map((topic) => {
        const topicAlias = this.formatTopicVarDisplay(topic, display, topicalias);
        topic._InstanceAliasValue = topicAlias || topic[templateQueryIdMap.topicId];
        return {
          text: topicAlias || topic[templateQueryIdMap.topicId],
          value: topic[templateQueryIdMap.topicId], // 为了获取多维度的值，这里完全可以使用JSON.stringify()将整个对象放进去
          TopicName: topic.TopicName,
        };
      }),
      PartitionList: PartitionList.map((par) => {
        par._InstanceAliasValue = par[templateQueryIdMap.partition];
        return {
          text: par[templateQueryIdMap.partition],
          value: par[templateQueryIdMap.partition],
        };
      }),
    };
    await instanceStorage.setExtraStorage(this.service, this.keyInStorage.TopicList, TopicList);
    await instanceStorage.setExtraStorage(this.service, this.keyInStorage.GroupList, GroupList);
    await instanceStorage.setExtraStorage(this.service, this.keyInStorage.PartitionList, PartitionList);
    // console.log({ res1, res2, res3 });
    // console.log({rs});
    // 根据action返回指定的维度数据列表
    switch (action) {
      case 'DescribeTopicList':
        return rs.TopicList;
      case 'DescribeGroup':
        return rs.GroupList;
      case 'DescribePartion':
        return rs.PartitionList;
      default:
        return [];
    }
  }

  // async getOtherAlias(datapoints) {
  //   let dimension;
  //   for(let j = 0; j < datapoints.Dimensions.length; j++){
  //     if(datapoints.Dimensions[j] !== 'InstanceName'){
  //       dimension.push(datapoints.Dimensions[j])
  //     }
  //   }
  //   console.log(dimension);

  //   return dimension
  // }
}
