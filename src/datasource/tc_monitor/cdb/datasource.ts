import _ from 'lodash';
import { CDBInstanceAliasList, CDBInvalidDemensions, isValidMetric, modifyDimensons, templateQueryIdMap } from './query_def';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';

export default class CDBDatasource extends BaseDatasource {
  Namespace = 'QCE/CDB';
  InstanceAliasList = CDBInstanceAliasList;
  InvalidDimensions = CDBInvalidDemensions;
  templateQueryIdMap = {
    instance: 'InstanceId',
  };
  InstanceReqConfig = {
    service: 'cdb',
    action: 'DescribeDBInstances',
    responseField: 'Items',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map((item) => {
        if (isValidMetric(item)) {
          return modifyDimensons(item);
        }
        return null;
      })
    );
  }
  /**
   * 获取 可用区
   * @param region 地域信息
   */
  getZones(region) {
    const serviceInfo = GetServiceAPIInfo(region, 'cvm');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
      },
      serviceInfo.service,
      { region, action: 'DescribeZones' }
    ).then((response) => {
      return _.filter(
        _.map(response.ZoneSet || [], (item) => {
          return { text: item.ZoneName, value: item.ZoneId, ZoneState: item.ZoneState, Zone: item.Zone };
        }),
        (item) => item.ZoneState === 'AVAILABLE'
      );
    });
  }
  // 仅对维度组合是InstanceId和InstanceType的指标，其他指标不支持
  getDefaultInsObj(ins: string) {
    return {
      [templateQueryIdMap.instance]: ins,
      InstanceType: 1,
    }
  }
}
