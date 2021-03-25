import { BaseDatasource } from '../_base/datasource';
import { InvalidDemensions, InstanceAliasList, templateQueryIdMap } from './query_def';

export default class CmqDatasource extends BaseDatasource {
  InvalidDimensions: Record<string, string> = InvalidDemensions;
  InstanceAliasList: string[] = InstanceAliasList;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'cmq',
    action: 'DescribeQueueDetail',
    responseField: 'QueueSet',
  };

  async getMetrics(region = 'ap-guangzhou') {
    const rawMetric = await super.getMetrics(region);
    return rawMetric.map((metric) => {
      let dims = metric.Dimensions[0].Dimensions;
      dims = Array.from(new Set([...dims, 'queueId', 'queueName']));
      metric.Dimensions[0].Dimensions = dims;
      return metric;
    });
  }
}
