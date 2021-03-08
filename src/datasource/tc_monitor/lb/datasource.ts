import * as _ from 'lodash';
import { BaseDatasource } from '../_base/datasource';
import { LBInstanceAliasList, LBInvalidDemensions } from './query_def';

export default class SCFDatasource extends BaseDatasource {
  InstanceKey: string;
  Namespace: string;
  InstanceAliasList: string[];
  InvalidDimensions: Record<string, string>;
  templateQueryIdMap = {
    instance: 'AddressId',
  };
  InstanceReqConfig: { service?: string | undefined; action: string; responseField: string };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);

    this.Namespace = 'QCE/LB';
    this.InstanceAliasList = LBInstanceAliasList;
    this.InvalidDimensions = LBInvalidDemensions;
    this.InstanceReqConfig = {
      service: 'vpc',
      action: 'DescribeAddresses',
      responseField: 'AddressSet',
    };
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter(item =>
      /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含eip的指标*/
      item.Dimensions?.[0]?.Dimensions?.includes('eip'),
    );
  }
}
