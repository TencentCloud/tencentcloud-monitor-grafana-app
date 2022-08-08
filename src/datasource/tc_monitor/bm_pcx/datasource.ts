import {
  BMPCXInstanceAliasList,
  BMPCXInvalidDemensions,
  namespace,
  templateQueryIdMap,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { t } from '../../../locale';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = BMPCXInstanceAliasList;
  InvalidDimensions = BMPCXInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'bmvpc',
    action: 'DescribeVpcPeerConnections',
    responseField: 'VpcPeerConnectionSet',
  };
  MetricReqConfig = {
    resultFilter: modifyDimensons,
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
          text: t(item.Region),
          value: item.Region,
        };
      });
    });
  }
}
