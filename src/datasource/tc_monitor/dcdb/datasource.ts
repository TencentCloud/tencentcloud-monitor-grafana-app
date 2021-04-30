import {
  DCDBInstanceAliasList,
  DCDBInvalidDemensions,
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
  InstanceAliasList = DCDBInstanceAliasList;
  InvalidDimensions = DCDBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'dcdb',
    action: 'DescribeDCDBInstances',
    responseField: 'Instances',
  };
  extraActionMap = {
    DescribeDCDBShards: {
      service: 'dcdb',
      action: 'DescribeDCDBShards',
      responseField: 'Shards',
      pickKey: 'ShardInstanceId',
    },
    DescribeInstanceNodeInfo: {
      service: 'dcdb',
      action: 'DescribeInstanceNodeInfo',
      // responseField: 'EnvironmentSet',
      // pickKey: 'EnvironmentId',
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion,无接口，用本地config
  getRegions() {
    return Promise.resolve(regionSupported);
  }
  async getConsumerList(params: any) {
    const { region, action: act, payload } = params;
    const { service, action, responseField, pickKey } = this.extraActionMap[act];

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
    return rs[0].map((o) => {
      return {
        text: o[pickKey],
        value: o[pickKey],
      };
    });
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const payload: any = {
      InstanceId: instance,
      Limit: 20,
    };
    const rs = await this.getConsumerList({ region, action, payload });
    return rs;
  }
}
