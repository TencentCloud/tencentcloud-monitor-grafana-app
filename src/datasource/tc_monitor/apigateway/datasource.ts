import {
  APIGATEWAYInstanceAliasList,
  APIGATEWAYInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  keyInStorage,
  queryMonitorExtraConfg,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import instanceStorage from '../../common/datasourceStorage';
import { t } from '../../../locale';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = APIGATEWAYInstanceAliasList;
  InvalidDimensions = APIGATEWAYInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'apigateway',
    action: 'DescribeServicesStatus',
    responseField: 'ServiceSet',
  };

  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }
  async getEnvironmentNameList(params: any) {
    const { region, instanceId } = params;
    const serviceInfo = GetServiceAPIInfo(region, this.service);

    // 从分页数据，获取全量数据
    const res = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeServiceEnvironmentList' }
        );
      },
      {
        ServiceId: instanceId,
      },
      'EnvironmentList'
    );
    const [rs] = res;
    return rs;
  }
  async fetchMetricData(action: string, region: string, instance: any) {
    // console.log({ action, region, instance });
    if (action === 'DescribeServiceEnvironmentList') {
      const rs = await this.getEnvironmentNameList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[this.templateQueryIdMap.environmentName];
        return {
          text: o[this.templateQueryIdMap.environmentName],
          value: o[this.templateQueryIdMap.environmentName],
        };
      });
      await instanceStorage.setExtraStorage(this.service, this.keyInStorage.environmentList, rs);
      return result;
    }
    return [];
  }
}
