import { VBCInstanceAliasList, VBCInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = VBCInstanceAliasList;
  InvalidDimensions = VBCInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeCcns',
    responseField: 'CcnSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  getFilterDropdown({ field }) {
    return super.getRegions();
  }
}
