import {
  TDMQROCKETMQInstanceAliasList,
  TDMQInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  queryMonitorExtraConfg,
  keyInStorage,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import instanceStorage from '../../common/datasourceStorage';
import { t } from '../../../locale';

export default class TDMQDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = TDMQROCKETMQInstanceAliasList;
  InvalidDimensions = TDMQInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  keyInStorage = keyInStorage;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'tdmq',
    action: 'DescribeRocketMQClusters',
    responseField: 'ClusterList',
    interceptor: {
      response: (result) =>
        _.map(result, (item) => ({
          ...item,
          ClusterId: _.get(item, 'Info.ClusterId', ''),
          ClusterName: _.get(item, 'Info.ClusterName', ''),
        })),
    },
  };
  extraActionMap = {
    DescribeRocketMQNamespaces: {
      service: 'tdmq',
      action: 'DescribeRocketMQNamespaces',
      responseField: 'Namespaces',
      pickKey: 'namespace',
    },
    DescribeRocketMQGroups: {
      service: 'tdmq',
      action: 'DescribeRocketMQGroups',
      responseField: 'Groups',
      pickKey: 'group',
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter((item) => !item.Dimensions?.[0]?.Dimensions?.includes('rmqcluster'));
  }

  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }

  async getConsumerList(params: any) {
    const { region, action: act, payload } = params;
    const { service, action, responseField } = this.extraActionMap[act];

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
    return rs[0];
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const payload: any = {
      Limit: 100,
      ClusterId: instance[this.templateQueryIdMap.instance],
    };
    if (Object.keys(this.extraActionMap).indexOf(action) !== -1) {
      if (action === 'DescribeRocketMQGroups') {
        payload.NamespaceId = this.getVariable(query['clusternamespace']);
      }
      const rs = await this.getConsumerList({ region, action, payload });
      const { pickKey } = this.extraActionMap[action];
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[this.templateQueryIdMap[pickKey]];
        return {
          text: o[this.templateQueryIdMap[pickKey]],
          value: o[this.templateQueryIdMap[pickKey]],
        };
      });
      await instanceStorage.setExtraStorage(this.service, this.keyInStorage[pickKey], rs);
      return result;
    }
    return [];
  }
}
