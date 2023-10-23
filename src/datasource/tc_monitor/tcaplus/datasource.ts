import { TCAPLUSInstanceAliasList, TCAPLUSInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { t } from '../../../locale';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = TCAPLUSInstanceAliasList;
  InvalidDimensions = TCAPLUSInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'tcaplusdb',
    action: 'DescribeTables',
    responseField: 'TableInfos',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion
  getRegions() {
    return this.doRequest(
      {
        url: this.url + '/tcaplusdb',
      },
      'tcaplusdb',
      { action: 'DescribeRegions', region: 'ap-guangzhou' }
    ).then((response) => {
      return _.map(response.RegionInfos || [], (item) => {
        return {
          text: t(item.RegionName),
          value: item.RegionName,
        };
      });
    });
  }
}
