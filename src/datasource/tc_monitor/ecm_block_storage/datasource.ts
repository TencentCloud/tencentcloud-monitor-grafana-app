import {
  ECMBLOCKSTORAGEInstanceAliasList,
  ECMBLOCKSTORAGEInvalidDemensions,
  namespace,
  templateQueryIdMap,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import instanceStorage from '../../common/datasourceStorage';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = ECMBLOCKSTORAGEInstanceAliasList;
  InvalidDimensions = ECMBLOCKSTORAGEInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'ecm',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  async getDiskList(params: any) {
    const { payload } = params;
    const { InstanceId } = payload;
    const instanceCache = instanceStorage.getInstance(this.service);
    const instanceObj: any =
      _.cloneDeep(instanceCache.find((item) => item[this.templateQueryIdMap.instance] === InstanceId)) ?? {};
    const { DataDisks: dataDisks } = instanceObj;
    return dataDisks.map((o) => {
      return {
        text: o.DiskId,
        value: o.DiskId,
      };
    });
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    const payload: any = {
      InstanceId: instance,
      Limit: 20,
    };
    const rs = await this.getDiskList({ region, action, payload });
    return rs;
  }
}
