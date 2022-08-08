import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';
import {
  SCFInstanceAliasList,
  SCFInvalidDemensions,
  regionSupported,
  queryMonitorExtraConfg,
  keyInStorage,
  templateQueryIdMap,
} from './query_def';
import instanceStorage from '../../common/datasourceStorage';
import { t } from '../../../locale';

export default class SCFDatasource extends BaseDatasource {
  InstanceKey: string;
  Namespace: string;
  InstanceAliasList: string[];
  InvalidDimensions: Record<string, string>;
  templateQueryIdMap = templateQueryIdMap;
  queryMonitorExtraConfg = queryMonitorExtraConfg;
  keyInStorage = keyInStorage;
  InstanceReqConfig: { service?: string | undefined; action: string; responseField: string };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);

    this.Namespace = 'QCE/SCF_V2';
    this.InstanceAliasList = SCFInstanceAliasList;
    this.InvalidDimensions = SCFInvalidDemensions;
    this.InstanceReqConfig = {
      service: 'scf',
      action: 'ListFunctions',
      responseField: 'Functions',
    };
  }

  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter(
      (item) =>
        /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含functionName的指标 */
        item.Dimensions?.[0]?.Dimensions?.includes('functionName') &&
        item.Dimensions?.[0]?.Dimensions?.includes('namespace') &&
        !item.MetricName.startsWith('Name')
    );
  }

  getVersions(region, params) {
    const serviceInfo = GetServiceAPIInfo(region, 'scf');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'ListVersionByFunction' }
    ).then((response) => {
      return response.Versions;
    });
  }

  async fetchMetricData(action: string, region: string, instance: any) {
    // console.log({ action, region, instance });
    if (action === 'ListVersionByFunction') {
      const rs = await this.getVersions(region, { FunctionName: instance[this.templateQueryIdMap.instance] });
      const result = rs.map((o) => {
        o._InstanceAliasValue = o[this.templateQueryIdMap.version];
        return {
          text: o[this.templateQueryIdMap.version],
          value: o[this.templateQueryIdMap.version],
        };
      });
      await instanceStorage.setExtraStorage(this.service, this.keyInStorage.version, rs);
      return result;
    }
    return [];
  }
}
