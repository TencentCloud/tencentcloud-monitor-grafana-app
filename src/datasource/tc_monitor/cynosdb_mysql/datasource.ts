import {
  CYNOSDBMYSQLInstanceAliasList,
  CYNOSDBInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  modifyDimensons,
  checkKeys,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import { t } from '../../../locale';

export default class CYNOSDBMYSQLDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CYNOSDBMYSQLInstanceAliasList;
  InvalidDimensions = CYNOSDBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  checkKeys = checkKeys;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'cynosdb',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.map((item) => modifyDimensons(item));
  }
  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }
}
