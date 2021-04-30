import {
  CPMInstanceAliasList,
  CPMInvalidDemensions,
  namespace,
  templateQueryIdMap,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import { GetServiceAPIInfo } from '../../common/constants';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CPMInstanceAliasList;
  InvalidDimensions = CPMInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'bm',
    action: 'DescribeDevices',
    responseField: 'DeviceInfoSet',
  };
  RegionMap = {};
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion
  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/bm',
      },
      'bm',
      { action: 'DescribeRegions', region: 'ap-guangzhou' }
    ).then((response) => {
      // 缓存，后面获取可用区zone
      this.RegionMap = _.keyBy(response.RegionInfoSet, 'Region');
      return _.map(response.RegionInfoSet || [], (item) => {
        return {
          text: item.RegionDescription,
          value: item.Region,
        };
      });
    });
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.map((item) => modifyDimensons(item));
  }

  getFilterDropdown({ field, region }) {
    if (field === 'DeviceClassCode') {
      const serviceInfo = GetServiceAPIInfo(region, 'bm');
      return this.doRequest(
        {
          url: this.url + serviceInfo.path,
        },
        'bm',
        { region, action: 'DescribeDeviceClass' }
      ).then((response) => {
        return _.map(response.DeviceClassSet || [], (item) => {
          return { text: item.DeviceClassCode, value: item.DeviceClassCode };
        });
      });
    }
    return [];
  }
}
