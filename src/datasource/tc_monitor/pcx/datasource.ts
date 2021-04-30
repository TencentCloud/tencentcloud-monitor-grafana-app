import { PCXInstanceAliasList, namespace, templateQueryIdMap } from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { GetServiceAPIInfo, GetRequestParamsV2, SliceLength } from '../../common/constants';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = PCXInstanceAliasList;
  InvalidDimensions = {};
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'xx',
    action: 'xx',
    responseField: 'xx',
  };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }

  getInstances(region = 'ap-guangzhou', params = {}) {
    params = { offset: 0, limit: 50, ...params };
    const serviceInfo = GetServiceAPIInfo(region, 'pcx');
    return this.doRequestV2(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcPeeringConnections' }
    ).then((response) => {
      return response.data || [];
    });
  }

  /**
   * 模板变量中获取全量的 PCX 实例列表
   * @param region 地域信息
   */
  getVariableInstances(region, query) {
    let result: any[] = [];
    const params = { Offset: 0, Limit: 50, ...query };
    const serviceInfo = GetServiceAPIInfo(region, 'pcx');
    return this.doRequestV2(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcPeeringConnections' }
    ).then((response) => {
      result = response.data || [];
      const total = response.totalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 50);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getInstances(region, item));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  getVpcId(region, params: any = {}) {
    params = { Offset: 0, Limit: 20, ...params };
    // TODO 等待腾讯云接口查问题
    params.Offset = String(params.Offset);
    params.Limit = String(params.Limit);
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcs' }
    ).then((response) => {
      return _.map(response.VpcSet || [], (item) => ({ text: item.VpcId, value: item.VpcId }));
    });
  }

  getVpcIds(region) {
    let result: any[] = [];
    const params: any = { Offset: 0, Limit: 100 };
    // TODO 等待腾讯云接口查问题
    params.Offset = String(params.Offset);
    params.Limit = String(params.Limit);
    const serviceInfo = GetServiceAPIInfo(region, 'vpc');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action: 'DescribeVpcs' }
    ).then((response) => {
      result = _.map(response.VpcSet || [], (item) => ({ text: item.VpcId, value: item.VpcId }));
      const total = response.TotalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getVpcId(region, item));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  /**
   * 腾讯云 API 2.0 请求接口
   * @param options
   * @param service
   * @param signObj
   */
  async doRequestV2(options, service, signObj: any = {}) {
    options = await GetRequestParamsV2(
      options,
      service,
      signObj,
      this.secretId,
      this.instanceSettings.id,
      this.backendSrv
    );
    return this.backendSrv
      .datasourceRequest(options)
      .then((response) => {
        return _.get(response, 'data', {});
      })
      .catch((error) => {
        throw error;
      });
  }
}
