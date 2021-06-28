import {
  LOADBALANCEInstanceAliasList,
  LOADBALANCEVALIDDIMENSIONS,
  namespace,
  templateQueryIdMap,
  keyInStorage,
  queryMonitorExtraConfg,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import instanceStorage from '../../common/datasourceStorage';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = LOADBALANCEInstanceAliasList;
  InvalidDimensions = LOADBALANCEVALIDDIMENSIONS;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'clb',
    action: 'DescribeLoadBalancers',
    responseField: 'LoadBalancerSet',
  };

  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  async getListenerList(params: any) {
    const { region, instanceId } = params;
    const serviceInfo = GetServiceAPIInfo(region, 'clb');

    // 从分页数据，获取全量数据
    const res = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeListeners' }
        );
      },
      {
        LoadBalancerId: instanceId,
      },
      'Listeners'
    );
    const [rs] = res;
    return rs;
  }
  async fetchMetricData(action: string, region: string, instance: any) {
    // console.log({ action, region, instance });
    if (action === 'DescribeListeners') {
      const rs = await this.getListenerList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      instanceStorage.setExtraStorage(this.service, this.keyInStorage.listener, rs);
      const result = rs.map((o) => {
        return {
          text: o[this.templateQueryIdMap.listener],
          value: o[this.templateQueryIdMap.listener],
        };
      });
      return result;
    }
    return [];
  }
}
