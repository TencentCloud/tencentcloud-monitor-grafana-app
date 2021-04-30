import _ from 'lodash';
import { BaseDatasource } from '../_base/datasource';
import { LBInstanceAliasList, LBInvalidDemensions } from './query_def';

export default class SCFDatasource extends BaseDatasource {
  Namespace = 'QCE/LB';
  InstanceAliasList = LBInstanceAliasList;
  InvalidDimensions = LBInvalidDemensions;
  templateQueryIdMap = {
    instance: 'AddressId',
  };
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
          Values: ['EIP'],
        });
        return params;
      }, // 设置一些请求参数的 默认值
    },
  };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter((item) =>
      /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含eip的指标 */
      item.Dimensions?.[0]?.Dimensions?.includes('eip')
    );
  }

  // async getInstances(region, params = {}) {
  //   const rawSet = await super.getInstances(region, params);
  //   /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含eip的指标 */
  //   return rawSet.filter((item) => item.AddressType === 'EIP');
  // }

  // async getVariableInstances(region, query = {}) {
  //   const rawSet = await super.getVariableInstances(region, query);
  //   return rawSet.filter((item) => item.AddressType === 'EIP');
  // }
}
