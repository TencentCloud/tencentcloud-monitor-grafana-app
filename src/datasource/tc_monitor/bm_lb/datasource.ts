import { BMLBInstanceAliasList, CPMInvalidDemensions, namespace, templateQueryIdMap, isValidMetric } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = BMLBInstanceAliasList;
  InvalidDimensions = CPMInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'bmlb',
    action: 'DescribeLoadBalancers',
    responseField: 'LoadBalancerSet',
    interceptor: {
      request: (params) => ({
        ...params,
        LoadBalancerType: 'open',
      }), // 设置一些请求参数的 默认值
    },
  };
  RegionMap = {};
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map((item) => {
        if (isValidMetric(item)) {
          return item;
        }
        return null;
      })
    );
  }
  // 重写getRegion
  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/bm',
      },
      'bm',
      { action: 'DescribeRegions', region: 'ap-guangzhou' }
    ).then((response) => {
      // 缓存，后面获取可用区zone
      this.RegionMap = _.keyBy(response.RegionInfoSet, 'Region');
      return _.map(response.RegionInfoSet || [], (item) => {
        return {
          text: item.RegionDescription,
          value: item.Region,
        };
      });
    });
  }
}
