import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';
import { InvalidDemensions, InstanceAliasList, templateQueryIdMap } from './query_def';

export default class CmqTopicDatasource extends BaseDatasource {
  InvalidDimensions: Record<string, string> = InvalidDemensions;
  InstanceAliasList: string[] = InstanceAliasList;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'cmq',
    action: 'DescribeTopicDetail',
    responseField: 'TopicSet',
    // interceptor: {
    //   response: (data: unknown[]) =>
    //     data?.length
    //       ? data
    //       : [
    //           {
    //             Tags: [],
    //             TopicId: 'topic-rga4l1o4',
    //             TopicName: 'ConnTopic',
    //             CreateUin: 20548499,
    //             MsgRetentionSeconds: 10000,
    //             MaxMsgSize: 20000,
    //             Qps: 10000,
    //             FilterType: 1,
    //             CreateTime: 1581516588,
    //             LastModifyTime: 1581563581,
    //             MsgCount: 0,
    //           },
    //           {
    //             Tags: [],
    //             TopicId: 'topic-388k6x98',
    //             TopicName: 'test123',
    //             CreateUin: 20548499,
    //             MsgRetentionSeconds: 86400,
    //             MaxMsgSize: 65536,
    //             Qps: 5000,
    //             FilterType: 1,
    //             CreateTime: 1581493669,
    //             LastModifyTime: 1581495310,
    //             MsgCount: 0,
    //           },
    //         ],
    // },
  };
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

    return rs[0].map((item) => ({ text: item.SubscriptionId, value: item.SubscriptionId }));
  }

  async fetchMetricData(action: string, region: string, instance: any) {
    let result;
    switch (action) {
      case 'DescribeSubscriptionDetail':
        result = await this.fetchAllSubscription(region, { TopicName: instance.TopicName });
        return result;
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
