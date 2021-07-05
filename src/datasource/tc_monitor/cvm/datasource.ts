import _ from 'lodash';
import { CVMInstanceAliasList, isValidMetric, modifyDimensons } from './query_def';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';

export default class CVMDatasource extends BaseDatasource {
  Namespace = 'QCE/CVM';
  InstanceAliasList = CVMInstanceAliasList;
  InvalidDimensions = {};
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
      rawSet.map((item) => {
        if (isValidMetric(item)) {
          return modifyDimensons(item);
        }
        return null;
      })
    );
  }

  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/api',
        data: { Product: 'cvm' },
      },
      'api',
      { action: 'DescribeRegions' }
    ).then((response) => {
      return _.filter(
        _.map(response.RegionSet || [], (item) => {
          return {
            text: item.RegionName,
            value: item.Region,
            RegionState: item.RegionState,
          };
        }),
        (item) => item.RegionState === 'AVAILABLE'
      );
    });
  }

  getZones(region) {
    const serviceInfo = GetServiceAPIInfo(region, 'api');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: { Product: 'cvm' },
      },
      serviceInfo.service,
      { region, action: 'DescribeZones' }
    ).then((response) => {
      return _.filter(
        _.map(response.ZoneSet || [], (item) => {
          return { text: item.ZoneName, value: item.Zone, ZoneState: item.ZoneState, Zone: item.Zone };
        }),
        (item) => item.ZoneState === 'AVAILABLE'
      );
    });
  }
}
