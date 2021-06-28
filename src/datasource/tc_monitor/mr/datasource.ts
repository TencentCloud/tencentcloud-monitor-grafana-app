import { GetServiceAPIInfo } from '../../common/constants';
import { fetchAllFactory } from '../../common/utils';
import { BaseDatasource } from '../_base/datasource';
import { InvalidDemensions, InstanceAliasList, templateQueryIdMap } from './query_def';

export default class MrHdfsDatasource extends BaseDatasource {
  InvalidDimensions: Record<string, string> = InvalidDemensions;
  InstanceAliasList: string[] = InstanceAliasList;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    service: 'emr',
    action: 'DescribeInstances',
    responseField: 'ClusterList',
    interceptor: {
      request: (params) => ({
        ...params,
        DisplayStrategy: params.DisplayStrategy || 'monitorManage',
        ProjectId: params.ProjectId || -1,
      }), // 设置一些请求参数的 默认值
      response: (data: unknown[]) => data.map(({ ClusterId, ClusterName }) => ({ ClusterId, ClusterName })),
      // response: (data: unknown[]) =>
      //   data?.length
      //     ? data
      //     : [
      //         {
      //           AddTime: '2019-09-16 16:48:01',
      //           AlarmInfo: '',
      //           AppId: 251008830,
      //           ChargeType: 1,
      //           ClusterId: 'emr-p9f700x8',
      //           ClusterName: 'beckwu_包年勿删',
      //           Config: {
      //             ChargeType: 1,
      //             ComNodeSize: 0,
      //             ComResource: {
      //               Cpu: 0,
      //               DiskSize: 0,
      //               DiskType: '',
      //               MemSize: 0,
      //               RootSize: 0,
      //               Spec: '',
      //               SpecName: '',
      //               StorageType: 0,
      //             },
      //             CoreNodeSize: 2,
      //             CoreResource: {
      //               Cpu: 2,
      //               DiskSize: 100,
      //               DiskType: 'CLOUD_BASIC',
      //               MemSize: 8192,
      //               RootSize: 0,
      //               Spec: 'CVM.S2',
      //               SpecName: 'EMR标准型S2',
      //               StorageType: 2,
      //             },
      //             MasterNodeSize: 1,
      //             MasterResource: {
      //               Cpu: 2,
      //               DiskSize: 100,
      //               DiskType: 'CLOUD_BASIC',
      //               MemSize: 8192,
      //               RootSize: 0,
      //               Spec: 'CVM.S2',
      //               SpecName: 'EMR标准型S2',
      //               StorageType: 2,
      //             },
      //             OnCos: false,
      //             SoftInfo: ['zookeeper-3.4.9', 'hadoop-3.1.2', 'knox-1.2.0', 'sys-1.0'],
      //             TaskNodeSize: 1,
      //             TaskResource: {
      //               Cpu: 2,
      //               DiskSize: 100,
      //               DiskType: 'CLOUD_BASIC',
      //               MemSize: 8192,
      //               RootSize: 0,
      //               Spec: 'CVM.S2',
      //               SpecName: 'EMR标准型S2',
      //               StorageType: 2,
      //             },
      //           },
      //           EmrVersion: 'EMR-V3.0.0',
      //           Ftitle: '集群运行中',
      //           Id: 19541,
      //           IsTradeCluster: 0,
      //           MasterIp: '--',
      //           ProjectId: 0,
      //           RegionId: 1,
      //           ResourceOrderId: 0,
      //           RunTime: '0天2小时48分钟55秒',
      //           Status: 2,
      //           SubnetId: 1230738,
      //           TradeVersion: 1,
      //           Uin: '1875765535',
      //           VpcId: 78518,
      //           ZoneId: 100002,
      //         },
      //       ],
    },
  };

  async fetchAllNodes(region: string, params: any) {
    const serviceInfo = GetServiceAPIInfo(region, 'emr');

    // 从分页数据，获取全量数据
    const rs = await fetchAllFactory(
      (data) => {
        return this.doRequest(
          {
            url: this.url + serviceInfo.path,
            data,
          },
          serviceInfo.service,
          { region, action: 'DescribeClusterNodes' }
        );
      },
      params,
      'NodeList'
    );

    return rs[0].map((item) => ({ text: item.Ip, value: item.Ip }));
  }

  async fetchMetricData(action: string, region: string, instance: any) {
    let result;
    switch (action) {
      case 'DescribeClusterNodes':
        result = await this.fetchAllNodes(region, { InstanceId: instance.ClusterId, NodeFlag: 'all' });
        return result;
      default:
        return [];
    }
  }
}
