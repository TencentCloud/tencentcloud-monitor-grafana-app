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

export default class MrHdfsDatasource extends BaseDatasource {
  InvalidDimensions: Record<string, string> = InvalidDemensions;
  InstanceAliasList: string[] = InstanceAliasList;
  templateQueryIdMap = templateQueryIdMap;
  extrasAlias = [];
  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  InstanceReqConfig = {
    service: 'emr',
    action: 'DescribeInstances',
    responseField: 'ClusterList',
    interceptor: {
      request: (params) => ({
        ...params,
        DisplayStrategy: params.DisplayStrategy || 'monitorManage',
        ProjectId: params.ProjectId || -1,
      }), // 设置一些请求参数的 默认值
      response: (data: unknown[]) => data.map(({ ClusterId, ClusterName }) => ({ ClusterId, ClusterName })),
    },
  };

  async fetchAllNodes(region: string, params: any) {
    const serviceInfo = GetServiceAPIInfo(region, 'emr');

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeClusterNodes' }
        );
      },
      params,
      'NodeList'
    );

    // return rs[0].map((item) => ({ text: item.Ip, value: item.Ip }));
    return rs[0];
  }

  async fetchMetricData(action: string, region: string, instance: any) {
    let result;
    switch (action) {
      case 'DescribeClusterNodes': {
        const resultT = await this.fetchAllNodes(region, { InstanceId: instance.ClusterId, NodeFlag: 'all' });
        result = resultT.map((item) => {
          item._InstanceAliasValue = item[templateQueryIdMap.node];
          return { text: item[templateQueryIdMap.node], value: item[templateQueryIdMap.node] };
        });
        await instanceStorage.setExtraStorage(this.service, this.keyInStorage.node, resultT);

        return result;
      }
      default:
        return [];
    }
  }
}
