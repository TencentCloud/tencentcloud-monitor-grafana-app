import {
  TDMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  modifyDimensons,
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
    action: 'DescribeClusters',
    responseField: 'ClusterSet',
  };
  extraActionMap = {
    topicName: {
      service: 'tdmq',
      action: 'DescribeTopics',
      responseField: 'TopicSets',
      pickKey: 'TopicName',
    },
    environmentId: {
      service: 'tdmq',
      action: 'DescribeEnvironments',
      responseField: 'EnvironmentSet',
      pickKey: 'EnvironmentId',
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

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(rawSet.map((item) => modifyDimensons(item)));
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
    console.log({ rs });
    return rs[0].map((o) => {
      return {
        text: o[pickKey],
        value: o[pickKey],
      };
    });
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const payload: any = {
      Limit: 20,
    };
    let field = 'environmentId';
    if (action === 'DescribeTopics') {
      payload.EnvironmentId = this.getVariable(query['environmentid']);
      field = 'topicName';
    }
    const rs = await this.getConsumerList({ region, field, payload });
    return rs;
  }
}
