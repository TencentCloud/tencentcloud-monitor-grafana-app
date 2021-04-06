import { VPNGWInstanceAliasList, VPNGWInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import { GetServiceAPIInfo } from '../../common/constants';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = VPNGWInstanceAliasList;
  InvalidDimensions = VPNGWInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeVpnGateways',
    responseField: 'VpnGatewaySet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  getFilterDropdown({ field, region }) {
    if (field === 'zone') {
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
            return { text: item.ZoneName, value: item.Zone, ZoneState: item.ZoneState, Zone: item.Zone };
          }),
          (item) => item.ZoneState === 'AVAILABLE'
        );
      });
    }
    return [];
  }
}
