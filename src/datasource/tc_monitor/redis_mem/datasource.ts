import _ from 'lodash';
import {
  REDISMEMInstanceAliasList,
  namespace,
  RedisMemInvalidDemensions,
  templateQueryIdMap,
  NodeType,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';

export default class REDISDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = REDISMEMInstanceAliasList;
  InvalidDimensions = RedisMemInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  extrasAlias = [RedisMemInvalidDemensions.pnodeid, RedisMemInvalidDemensions.rnodeid];
  InstanceReqConfig = {
    service: 'redis',
    action: 'DescribeInstances',
    responseField: 'InstanceSet',
    interceptor: {
      request: (params) => ({ ...params, MonitorVersion: '5s' }),
    },
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  async getInstanceNodeInfo(params: any) {
    const { region, instanceId } = params;
    const serviceInfo = GetServiceAPIInfo(region, 'redis');

    const res = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeInstanceNodeInfo' }
        );
      },
      {
        InstanceId: instanceId,
      },
      NodeType
    );

    return res;
  }
  async fetchMetricData(action: string, region: string, instance: any, query: any) {
    if (action === 'DescribeInstanceNodeInfo') {
      const rs = await this.getInstanceNodeInfo({ region, instanceId: instance[this.templateQueryIdMap.instance] });
      const { nodetype } = query;
      const ndoeTypeIndex = NodeType.indexOf(nodetype);
      return ndoeTypeIndex === -1
        ? []
        : _.map(rs[ndoeTypeIndex], (item) => ({ text: item.NodeId, value: item.NodeId }));
    }
    return [];
  }
}
