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

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getConsumerGroups(region, params) {
    const serviceInfo = GetServiceAPIInfo(region, 'ckafka');

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
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
      params,
      ['GroupListForMonitor', 'TopicListForMonitor', 'PartitionListForMonitor']
    );

    let [GroupList, TopicList, PartitionList] = rs;
    // 无重复数组
    TopicList = _.uniqBy(TopicList, (item) => (item as any).TopicId);
    GroupList = _.uniqBy(GroupList, (item) => (item as any).GroupName);
    PartitionList = _.uniqBy(PartitionList, (item) => (item as any).Partition);
    return {
      TopicList,
      GroupList,
      PartitionList,
    };
    // return {
    //   TopicList: TopicList.map((topic) => ({
    //     text: topic.TopicId,
    //     value: topic.TopicId, // 为了获取多维度的值，这里完全可以使用JSON.stringify()将整个对象放进去
    //     TopicName: topic.TopicName,
    //   })),
    //   GroupList: GroupList.map((group) => ({
    //     text: group.GroupName,
    //     value: group.GroupName,
    //   })),
    //   PartitionList: PartitionList.map((par) => ({
    //     text: par.Partition,
    //     value: par.Partition,
    //   })),
    // };
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
    const result = await this.getConsumerGroups(region, {
      InstanceId: instance.InstanceId,
    });
    const { display } = query;
    const { TopicList, GroupList, PartitionList } = result;
    let { topicalias } = query;
    topicalias = this.TopicAliasList.includes(topicalias) ? topicalias : this.templateQueryIdMap.topicId;
    // console.log({ TopicList, GroupList, PartitionList });
    // const res1 = await instanceStorage.setExtraStorage(this.service, this.keyInStorage.TopicList, TopicList);
    // const res2 = await instanceStorage.setExtraStorage(this.service, this.keyInStorage.GroupList, GroupList);
    // const res3 = await instanceStorage.setExtraStorage(this.service, this.keyInStorage.PartitionList, PartitionList);
    // console.log({ res1, res2, res3 });
    const rs = {
      TopicList: TopicList.map((topic) => {
        const topicAlias = this.formatTopicVarDisplay(topic, display, topicalias);
        topic._InstanceAliasValue = topicAlias || topic.TopicId;
        return {
          text: topicAlias || topic.TopicId,
          value: topic[templateQueryIdMap.topicId], // 为了获取多维度的值，这里完全可以使用JSON.stringify()将整个对象放进去
          TopicName: topic.TopicName,
        };
      }),
      GroupList: GroupList.map((group) => {
        group._InstanceAliasValue = group.GroupName;
        return {
          text: group.GroupName,
          value: group[templateQueryIdMap.groupName],
        };
      }),
      PartitionList: PartitionList.map((par) => {
        par._InstanceAliasValue = par.Partition;
        return {
          text: par.Partition,
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
