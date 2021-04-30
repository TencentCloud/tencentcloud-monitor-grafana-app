import {
  CEIPSUMMARYInstanceAliasList,
  CEIPInvalidDemensions,
  namespace,
  templateQueryIdMap,
  modifyDimensons,
} from './query_def';
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
    interceptor: {
      request: (params) => {
        const { Filters } = params;
        if (!Filters) {
          params.Filters = [];
        }
        params.Filters.push({
          Name: 'address-type',
          Values: ['AnycastEIP'],
        });
        return params;
      }, // 设置一些请求参数的 默认值
      // response: (data: unknown[]) =>[
      //   {
      //     AddressId: 'AddressId',
      //     AddressIp: '111.22.3.4'
      //   },
      // ],
    },
  };
  MetricReqConfig = {
    resultFilter: modifyDimensons,
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  // async getInstances(region, params = {}) {
  //   const rawSet = await super.getInstances(region, params);
  //   return rawSet.filter((item) => item.AddressType === 'AnycastEIP');
  // }

  // async getVariableInstances(region, query = {}) {
  //   const rawSet = await super.getVariableInstances(region, query);
  //   return rawSet.filter((item) => item.AddressType === 'AnycastEIP');
  // }
}
