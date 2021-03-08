import * as _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';
import { SCFInstanceAliasList, SCFInvalidDemensions } from './query_def';

export default class SCFDatasource extends BaseDatasource {
  InstanceKey: string;
  Namespace: string;
  InstanceAliasList: string[];
  InvalidDimensions: Record<string, string>;
  templateQueryIdMap = {
    instance: 'FunctionName',
  };
  InstanceReqConfig: { service?: string | undefined; action: string; responseField: string };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);

    this.Namespace = 'QCE/SCF_V2';
    this.InstanceAliasList = SCFInstanceAliasList;
    this.InvalidDimensions = SCFInvalidDemensions;
    this.InstanceReqConfig = {
      service: 'scf',
      action: 'ListFunctions',
      responseField: 'Functions',
    };
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter(
      item =>
        /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含functionName的指标*/
        item.Dimensions?.[0]?.Dimensions?.includes('functionName') &&
        item.Dimensions?.[0]?.Dimensions?.includes('namespace') &&
        !item.MetricName.startsWith('Name'),
    );
  }

  getVersions(region, params) {
    const serviceInfo = GetServiceAPIInfo(region, 'scf');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'ListVersionByFunction' },
    ).then(response => {
      return response.Versions.map(({ Version }) => ({ text: Version, value: Version }));
    });
  }
}
