import {
  GSEInstanceAliasList,
  GSEInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  keyInStorage,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import instanceStorage from '../../common/datasourceStorage';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = GSEInstanceAliasList;
  InvalidDimensions = GSEInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'gse',
    action: 'DescribeInstances',
    responseField: 'Instances',
  };

  keyInStorage = keyInStorage;

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
    return _.compact(
      rawSet.map((item) => {
        return modifyDimensons(item);
      })
    );
  }
  async getQueueNameList(params: any) {
    const { region } = params;
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
          { region, action: 'DescribeGameServerSessionQueues' }
        );
      },
      {},
      'GameServerSessionQueues'
    );
    const [rs] = res;
    return rs.map((r) => ({ text: r[templateQueryIdMap.queue], value: r[templateQueryIdMap.queue] }));
  }
  async getFleetList(params: any) {
    const { region } = params;
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
          { region, action: 'ListFleets' }
        );
      },
      {},
      'FleetIds'
    );
    const [rs] = res;
    return rs.map((r) => ({ text: r, value: r }));
  }
  async fetchMetricData(action: string, region: string, instance: any) {
    // console.log({ action, region, instance });
    if (action === 'DescribeGameServerSessionQueues') {
      const rs = await this.getQueueNameList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      instanceStorage.setExtraStorage(this.service, this.keyInStorage.queue, rs);
      const result = rs.map((o) => {
        return {
          text: o[this.templateQueryIdMap.queue],
          value: o[this.templateQueryIdMap.queue],
        };
      });
      return result;
    }
    if (action === 'ListFleets') {
      const rs = await this.getFleetList({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      instanceStorage.setExtraStorage(this.service, this.keyInStorage.fleet, rs);
      const result = rs.map((o) => {
        return {
          text: o[this.templateQueryIdMap.fleet],
          value: o[this.templateQueryIdMap.fleet],
        };
      });
      return result;
    }
    return [];
  }
}
