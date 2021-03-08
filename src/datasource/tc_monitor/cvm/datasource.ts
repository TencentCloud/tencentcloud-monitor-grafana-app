import * as _ from 'lodash';
import { CVMInstanceAliasList, isValidMetric, modifyDimensons } from './query_def';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';

export default class CVMDatasource extends BaseDatasource {
  Namespace = 'QCE/CVM';
  InstanceAliasList = CVMInstanceAliasList;
  templateQueryIdMap = {
    instance: 'InstanceId',
  };
  InstanceReqConfig = {
    service: 'cvm',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map(item => {
        if (isValidMetric(item)) {
          return modifyDimensons(item);
        }
        return null;
      }),
    );
  }

  getZones(region) {
    const serviceInfo = GetServiceAPIInfo(region, 'cvm');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
      },
      serviceInfo.service,
      { region, action: 'DescribeZones' },
    ).then(response => {
      return _.filter(
        _.map(response.ZoneSet || [], item => {
          return { text: item.ZoneName, value: item.Zone, ZoneState: item.ZoneState, Zone: item.Zone };
        }),
        item => item.ZoneState === 'AVAILABLE',
      );
    });
  }
}
