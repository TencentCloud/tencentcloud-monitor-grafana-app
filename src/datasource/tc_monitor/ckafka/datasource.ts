import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';
import {
  CKAFKAInstanceAliasList,
  CKAFKAInvalidDemensions,
  templateQueryIdMap,
  keyInStorage,
  queryMonitorExtraConfg,
} from './query_def';

import instanceStorage from '../../common/datasourceStorage';

export default class CKFKADatasource extends BaseDatasource {
  Namespace = 'QCE/CKAFKA';
  InstanceAliasList = CKAFKAInstanceAliasList;
  InvalidDimensions = CKAFKAInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'ckafka',
    action: 'DescribeInstances',
    responseField: 'InstanceList',
  };
  extraMetricDims = ['topicId'];

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

  async fetchMetricData(action: string, region: string, instance: any) {
    const result = await this.getConsumerGroups(region, {
      InstanceId: instance.InstanceId,
    });
    const { TopicList, GroupList, PartitionList } = result;
    instanceStorage.setExtraStorage(this.service, this.keyInStorage.TopicList, TopicList);
    instanceStorage.setExtraStorage(this.service, this.keyInStorage.GroupList, GroupList);
    instanceStorage.setExtraStorage(this.service, this.keyInStorage.PartitionList, PartitionList);

    const rs = {
      TopicList: TopicList.map((topic) => ({
        text: topic.TopicId,
        value: topic[templateQueryIdMap.topicId], // 为了获取多维度的值，这里完全可以使用JSON.stringify()将整个对象放进去
        TopicName: topic.TopicName,
      })),
      GroupList: GroupList.map((group) => ({
        text: group.GroupName,
        value: group[templateQueryIdMap.groupName],
      })),
      PartitionList: PartitionList.map((par) => ({
        text: par.Partition,
        value: par[templateQueryIdMap.partition],
      })),
    };
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
}
