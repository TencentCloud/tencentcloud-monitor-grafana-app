import {
  InstanceAliasList,
  LOADBALANCEListenerAliasList,
  LOADBALANCEServerAliasList,
  LOADBALANCEVALIDDIMENSIONS,
  templateQueryIdMap,
  keyInStorage,
  CANDIATEDIMENSIONS,
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
  ServerAliasList = LOADBALANCEServerAliasList;
  CandiateDimensions = CANDIATEDIMENSIONS;
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
  getInvalidDimensions(selfIns: any, tagret: any) {
    if (selfIns.service === 'lbPrivate' || (selfIns.service === 'lbPublic' && tagret.servers))
      return { ...LOADBALANCEVALIDDIMENSIONS, vpcId: 'NumericalVpcId' };
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
  formatVariableDisplay(data: Record<string, any>, displayTpl: string | undefined, alias: string, aliasList: string[]) {
    if (displayTpl) {
      return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
        if (!b || !aliasList.includes(b)) {
          return '';
        }
        return this.getAliasValue(data, b);
      });
    }
    return this.getAliasValue(data, alias);
  }
  async getServerList(params: any) {
    const { region, instanceId, listenerId } = params;
    const serviceInfo = GetServiceAPIInfo(region, 'clb');

    const res = await this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: { LoadBalancerId: instanceId, ListenerIds: [listenerId] },
      },
      serviceInfo.service,
      { region, action: 'DescribeTargets' }
    );
    const { Listeners } = res;
    const serversList = _.reduce(
      Listeners,
      (prev, item) => {
        const { Rules, Targets } = item;
        if (!_.isEmpty(Rules)) {
          return _.concat(prev, _.flatten(_.map(Rules, (elem) => (_.isEmpty(elem.Targets) ? [] : elem.Targets))));
        }
        if (!_.isEmpty(Targets)) {
          return _.concat(prev, Targets);
        }
        return prev;
      },
      []
    );
    return serversList;
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const { display } = query;
    if (action === 'DescribeListeners') {
      const rs = await this.getListenerList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      let { listeneralias } = query;
      listeneralias = this.ListenerAliasList.includes(listeneralias) ? listeneralias : this.templateQueryIdMap.listener;
      const result = rs.flatMap((o) => {
        const listenAlias = this.formatVariableDisplay(o, display, listeneralias, this.ListenerAliasList);
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
    if (action === 'DescribeServer' || action === 'DescribeServerPort') {
      const { listenerid, serverprivateip, serveralias } = query;
      const serverPrivateIp = this.getVariable(serverprivateip);
      const serversList = await this.getServerList({
        region,
        instanceId: instance[this.templateQueryIdMap.instance],
        listenerId: this.getVariable(listenerid),
      });
      const serverAlias = this.ServerAliasList.includes(serveralias) ? serveralias : this.templateQueryIdMap.servers;
      const result = _.chain(serversList)
        .filter((item) => {
          if (action === 'DescribeServer') {
            return true;
          }
          return serverPrivateIp === _.get(item, 'PrivateIpAddresses.0');
        })
        .map((item) => {
          const alias = this.formatVariableDisplay(item, display, serverAlias, this.ServerAliasList);
          const id = item[this.templateQueryIdMap.servers][0];
          item._InstanceAliasValue = alias || id;
          return action === 'DescribeServer'
            ? {
                text: alias || id,
                value: id,
              }
            : {
                text: `${_.get(item, 'Port')}`,
                value: _.get(item, 'Port'),
              };
        })
        .value();
      await instanceStorage.setExtraStorage(this.service, this.keyInStorage.servers, serversList);
      return action === 'DescribeServer' ? result : _.uniqBy(result, 'text');
    }
    return [];
  }
}
