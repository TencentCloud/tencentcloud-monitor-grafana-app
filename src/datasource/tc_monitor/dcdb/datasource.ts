import {
  DCDBInstanceAliasList,
  DCDBInvalidDemensions,
  namespace,
  templateQueryIdMap,
  modifyDimensons,
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
  InstanceAliasList = DCDBInstanceAliasList;
  InvalidDimensions = DCDBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'dcdb',
    action: 'DescribeDCDBInstances',
    responseField: 'Instances',
  };
  keyInStorage = keyInStorage;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  extraActionMap = {
    DescribeDCDBShards: {
      service: 'dcdb',
      action: 'DescribeDCDBShards',
      responseField: 'Shards',
      pickKey: 'ShardInstanceId',
    },
    DescribeDCDBInstanceNodeInfo: {
      service: 'dcdb',
      action: 'DescribeDCDBInstanceNodeInfo',
      responseField: 'NodesInfo',
      pickKey: 'NodeId',
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion, 入参的region用广州
  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/dcdb',
      },
      'dcdb',
      { action: 'DescribeDCDBSaleInfo', region: 'ap-guangzhou' }
    ).then((response) => {
      return _.map(response.RegionList || [], (item) => {
        return {
          text: t(item.Region),
          value: item.Region,
          RegionState: item.RegionState,
        };
      });
    });
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map((item) => {
        return modifyDimensons(item);
      })
    );
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
      InstanceId: instance[this.templateQueryIdMap.instance],
      Limit: 100,
    };
    if (Object.keys(this.extraActionMap).indexOf(action) !== -1) {
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
