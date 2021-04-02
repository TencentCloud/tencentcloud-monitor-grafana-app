import {
  DCDBInstanceAliasList,
  DCDBInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = DCDBInstanceAliasList;
  InvalidDimensions = DCDBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'dcdb',
    action: 'DescribeDCDBInstances',
    responseField: 'Instances',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // 重写getRegion,无接口，用本地config
  getRegions() {
    return Promise.resolve(regionSupported);
  }
}
