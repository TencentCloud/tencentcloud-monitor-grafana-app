import { CDNPROVINCEInstanceAliasList, CDNPROVINCEInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CDNPROVINCEInstanceAliasList;
  InvalidDimensions = CDNPROVINCEInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'cdn',
    action: 'DescribeDomains',
    responseField: 'Domains',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  async metricFindQuery(query: any, regex?: string) {
    return super.metricFindQuery({ ...query, ...{ region: 'ap-guangzhou' } }, regex);
  }
  async getConsumerList(params: any) {
    const { region, field } = params;
    const serviceInfo = GetServiceAPIInfo(region, 'cdn');

    // 从分页数据，获取全量数据
    const rs = await this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Name: field,
        },
      },
      serviceInfo.service,
      { action: 'DescribeMapInfo' }
    );
    return (rs.MapInfoList || []).map((o) => {
      return {
        text: o.Name,
        value: o.Name,
      };
    });
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    if (action === 'DescribeMapInfo') {
      const { name: field } = query;
      const rs = await this.getConsumerList({ region, field });
      return rs;
    }
    return [];
  }
}
