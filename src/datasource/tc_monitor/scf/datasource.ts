import _ from 'lodash';
import { FilterKeys, GetServiceAPIInfo, SliceLength } from '../../common/constants';
import { BaseDatasource } from '../_base/datasource';
import { MetricQuery } from '../_base/types';
import { SCFInstanceAliasList, SCFInvalidDemensions, regionSupported } from './query_def';

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

  getRegions() {
    return Promise.resolve(regionSupported);
  }

  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return rawSet.filter(
      (item) =>
        /* hack：这里多加了筛选条件，是因为后端数据不准确，坑啊！ 只拿取包含functionName的指标 */
        item.Dimensions?.[0]?.Dimensions?.includes('functionName') &&
        item.Dimensions?.[0]?.Dimensions?.includes('namespace') &&
        !item.MetricName.startsWith('Name')
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
      { region, action: 'ListVersionByFunction' }
    ).then((response) => {
      return response.Versions.map(({ Version }) => ({ text: Version, value: Version }));
    });
  }

  async metricFindQuery(query: MetricQuery, regex?: string) {
    // 查询地域列表
    const { action, namespace, display, filterkey, filtervalue } = query;
    let { region, instancealias = this.templateQueryIdMap.instance } = query;

    if (!action || !namespace) {
      return [];
    }

    const variableQuery = {};
    if (filterkey && FilterKeys.indexOf(filterkey) !== -1) {
      variableQuery[filterkey] = filtervalue;
    }

    // 查询地域列表
    const regionQuery = action.match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    region = this.getVariable(region); // 将模板转换为真实值

    // 查询实例列表
    if (region && action.match(/^DescribeInstances/i)) {
      const result = await this.getVariableInstances(region, variableQuery);
      // 缓存全量实例列表
      this.instanceListCache = result;

      instancealias = this.InstanceAliasList.includes(instancealias) ? instancealias : this.templateQueryIdMap.instance;
      return result.flatMap((item) => {
        item._InstanceAliasValue = item[instancealias]; // FIXME:
        if (!item[instancealias]) return [];
        return [
          {
            text: this.formatVarDisplay(item, display, instancealias),
            value: item[this.templateQueryIdMap.instance],
          },
        ];
      });
    }
    // 在instance实例的基础上查询其他数据
    let instance = this.getVariable(query['instance']);
    if (region && action && instance) {
      try {
        // instance = JSON.parse(instance);
        instance =
          _.cloneDeep(this.instanceListCache.find((item) => item[this.templateQueryIdMap.instance] === instance)) ?? {};
        // eslint-disable-next-line no-empty
      } catch (error) {}
      return this.fetchMetricData(action, region, instance, query);
    }

    return Promise.resolve([]);
  }

  getVariableInstances(region, query = {}): Promise<any[]> {
    let result: any[] = [];
    const params = { ...{ Offset: 0, Limit: 100 }, ...query };

    const { service = this.service, action, responseField: field } = this.InstanceReqConfig;

    const serviceInfo = GetServiceAPIInfo(region, service);
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action }
    ).then((response) => {
      result = _.get(response, field) ?? _.get(response, `Result.${field}`) ?? [];
      const total = response.TotalCount || 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getInstances(region, { ...item, ...query }));
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
}
