import {
  InstanceAliasList,
  LOADBALANCEListenerAliasList,
  LOADBALANCEVALIDDIMENSIONS,
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
  // Namespace = namespace;
  InstanceAliasList = InstanceAliasList;
  ListenerAliasList = LOADBALANCEListenerAliasList;
  // InvalidDimensions = LOADBALANCEVALIDDIMENSIONS;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  // InstanceReqConfig = {
  //   service: 'clb',
  //   action: 'DescribeLoadBalancers',
  //   responseField: 'LoadBalancerSet',
  // };
  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  getInvalidDimensions(selfIns: any) {
    if (selfIns.service === 'lbPrivate') return { ...LOADBALANCEVALIDDIMENSIONS, vpcId: 'NumericalVpcId' };
    return LOADBALANCEVALIDDIMENSIONS;
  }
  getInstanceReqConfig(selfIns: any) {
    const res: any = {
      service: 'clb',
      action: 'DescribeLoadBalancers',
      responseField: 'LoadBalancerSet',
    };
    if (selfIns.service === 'lbPrivate' || selfIns.service === 'loadBalance') {
      res.interceptor = {
        request: (param) => ({ ...param, LoadBalancerType: 'INTERNAL' }),
      };
    }
    if (selfIns.service === 'lbPublic') {
      res.interceptor = {
        request: (param) => ({ ...param, LoadBalancerType: 'OPEN' }),
      };
    }
    return res;
  }
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
  formatListenerVarDisplay(listener: Record<string, any>, displayTpl: string | undefined, listenerAlias: string) {
    if (displayTpl) {
      return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
        if (!b || !this.ListenerAliasList.includes(b)) {
          return '';
        }
        return this.getAliasValue(listener, b);
      });
    }
    return this.getAliasValue(listener, listenerAlias);
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const { display } = query;
    // console.log({ action, region, instance });
    if (action === 'DescribeListeners') {
      const rs = await this.getListenerList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      let { listeneralias } = query;
      listeneralias = this.ListenerAliasList.includes(listeneralias) ? listeneralias : this.templateQueryIdMap.listener;
      const result = rs.flatMap((o) => {
        const listenAlias = this.formatListenerVarDisplay(o, display, listeneralias);
        const lisId = o[this.templateQueryIdMap.listener];
        o._InstanceAliasValue = listenAlias || lisId;
        // if (!o[listeneralias]) return [];
        return {
          text: listenAlias || lisId,
          value: lisId,
        };
      });
      await instanceStorage.setExtraStorage(this.service, this.keyInStorage.listener, rs);
      return result;
    }
    return [];
  }
}
