import { CEIPSUMMARYInstanceAliasList, CEIPInvalidDemensions, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CEIPSUMMARYInstanceAliasList;
  InvalidDimensions = CEIPInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'vpc',
    action: 'DescribeAddresses',
    responseField: 'AddressSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  // async getMetrics(region = 'ap-guangzhou') {
  //   const rawSet = await super.getMetrics(region);
  //   return rawSet.filter(item =>
  //     /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含eip的指标*/
  //     item.Dimensions?.[0]?.Dimensions?.includes('eip'),
  //   );
  // }

  async getInstances(region, params = {}) {
    const rawSet = await super.getInstances(region, params);
    return rawSet.filter((item) => item.AddressType === 'AnycastEIP');
  }

  async getVariableInstances(region, query = {}) {
    const rawSet = await super.getVariableInstances(region, query);
    return rawSet.filter((item) => item.AddressType === 'AnycastEIP');
  }
}
