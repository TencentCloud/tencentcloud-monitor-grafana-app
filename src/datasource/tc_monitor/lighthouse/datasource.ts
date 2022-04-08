import _ from 'lodash';
import {
  LIGHTHOUSEInstanceAliasList,
  templateQueryIdMap,
  LighthouseInvalidDemensions,
  modifyDimensons,
} from './query_def';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';

export default class LighthouseDatasource extends BaseDatasource {
  Namespace = 'QCE/LIGHTHOUSE';
  InstanceAliasList = LIGHTHOUSEInstanceAliasList;
  InvalidDimensions = LighthouseInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'lighthouse',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/api',
        data: { Product: 'lighthouse' },
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
        data: { Product: 'lighthouse' },
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

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map((item) => {
        return modifyDimensons(item);
      })
    );
  }
}
