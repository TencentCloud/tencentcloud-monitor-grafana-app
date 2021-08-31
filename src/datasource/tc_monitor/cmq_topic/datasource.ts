import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';
import {
  InvalidDemensions,
  InstanceAliasList,
  templateQueryIdMap,
  keyInStorage,
  queryMonitorExtraConfg,
} from './query_def';
import instanceStorage from '../../common/datasourceStorage';

export default class CmqTopicDatasource extends BaseDatasource {
  Namespace = 'QCE/CMQTOPIC';
  InvalidDimensions: Record<string, string> = InvalidDemensions;
  InstanceAliasList: string[] = InstanceAliasList;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'cmq',
    action: 'DescribeTopicDetail',
    responseField: 'TopicSet',
  };
  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  extraMetricDims = ['subscriptionId']; // 多选

  async fetchAllSubscription(region: string, params: any) {
    const serviceInfo = GetServiceAPIInfo(region, 'cmq');
    // console.log(serviceInfo, 'serviceinfo');

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeSubscriptionDetail' }
        );
      },
      params,
      'SubscriptionSet'
    );

    return rs[0];
  }

  async fetchMetricData(action: string, region: string, instance: any) {
    let result;
    switch (action) {
      case 'DescribeSubscriptionDetail':
        result = await this.fetchAllSubscription(region, { TopicName: instance.TopicName });
        // eslint-disable-next-line no-case-declarations
        const rs = result.map((item) => {
          item._InstanceAliasValue = item.SubscriptionId;
          return { text: item.SubscriptionId, value: item[templateQueryIdMap.subscription] };
        });
        await instanceStorage.setExtraStorage(this.service, this.keyInStorage.subscriptionId, result);
        return rs;
      default:
        return [];
    }
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawMetric = await super.getMetrics(region);
    return rawMetric.map((metric) => {
      let dims = metric.Dimensions[0].Dimensions;
      dims.push('topicId');
      if (['NumOfNotify', 'NumOfSuccNotify'].includes(metric.MetricName)) {
        dims.push('subscriptionId');
      }

      dims = Array.from(new Set(dims));
      metric.Dimensions[0].Dimensions = dims;
      return metric;
    });
  }
}
