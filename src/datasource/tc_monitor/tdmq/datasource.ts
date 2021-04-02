import {
  TDMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = TDMQInstanceAliasList;
  InvalidDimensions = TDMQInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'tdmq',
    action: 'DescribeEnvironments',
    responseField: 'EnvironmentSet',
  };
  extraActionMap = {
    TopicName: {
      service: 'tdmq',
      action: 'DescribeTopics',
      responseField: 'TopicSets',
      pickKey: 'TopicName',
    },
    SubscriptionName: {
      service: 'tdmq',
      action: 'DescribeSubscriptions',
      responseField: 'SubscriptionSets',
      pickKey: 'SubscriptionName',
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  getRegions() {
    return Promise.resolve(regionSupported);
  }
  async getConsumerList(params: any) {
    const { region, field, payload } = params;
    const { service, action, responseField, pickKey } = this.extraActionMap[field];

    const serviceInfo = GetServiceAPIInfo(region, service);

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action }
        );
      },
      payload,
      responseField
    );
    return rs.map((o) => {
      return {
        text: o[pickKey],
        value: o[pickKey],
      };
    });
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    if (action in this.extraActionMap) {
      const payload: any = {
        EnvironmentId: instance[templateQueryIdMap.instance],
      };
      let field = 'TopicName';
      if (action === 'DescribeSubscriptions') {
        const topicName = this.getVariable(query['topicname']);
        payload.TopicName = topicName;
        field = 'SubscriptionName';
      }
      const rs = await this.getConsumerList({ region, field, payload });
      return rs;
    }
    return [];
  }
}
