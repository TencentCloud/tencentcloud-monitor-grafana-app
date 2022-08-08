import {
  VCLBInstanceAliasList,
  VCLBInvalidDemensions,
  namespace,
  templateQueryIdMap,
  clbNamespaceMap,
  regionSupported,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo } from '../../common/constants';
import { t } from '../../../locale';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = VCLBInstanceAliasList;
  InvalidDimensions = VCLBInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'clb',
    action: 'DescribeLoadBalancers',
    responseField: 'LoadBalancerSet',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }
  async getAllMetrics(region: string) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    const { MetricSet: public_metrics } = await this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Namespace: clbNamespaceMap.public,
        },
      },
      serviceInfo.service,
      { region, action: 'DescribeBaseMetrics' }
    );
    const { MetricSet: private_metrics } = await this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Namespace: clbNamespaceMap.private,
        },
      },
      serviceInfo.service,
      { region, action: 'DescribeBaseMetrics' }
    );
    const res = Object.values(_.keyBy(_.concat(private_metrics, public_metrics), 'MetricName'));
    return res.map((t) => modifyDimensons(t));
  }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await this.getAllMetrics(region);
    return _.compact(rawSet);
  }
}
