import _ from 'lodash';
import { Datasources, SERVICES } from './tc_monitor';
import { GetServiceFromNamespace, ParseMetricQuery } from './common/constants';
import { serviceGroupBy } from './common/utils';

export default interface DatasourceInterface {
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  query: (options: any) => any;
  testDatasource: () => any;
  metricFindQuery: (query: any) => any;
  getRegions?: (service: string) => any;
  getMetrics: (service: string, region: string) => any;
  getInstances: (service: string, region: string, params: any) => any;
  getZones?: (service: string, region: string) => any;
}

export class TCMonitorDatasource implements DatasourceInterface {
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    _.forEach(Datasources, (_class: any, key) => {
      this[key] = new _class(this.instanceSettings, this.backendSrv, this.templateSrv);
    });
  }

  // 根据 Datasource Config 配置时勾选的监控服务项，获取相应的命名空间
  getNamespaces() {
    const namespaces: any[] = [];
    _.forEach(SERVICES, (service) => {
      if (this.instanceSettings.jsonData[service.service] === true) {
        // namespaces.push(service.namespace);
        namespaces.push(service);
      }
    });
    return namespaces;
  }

  getCascaderNamespaces() {
    const validServices = SERVICES.filter((service) => this.instanceSettings.jsonData[service.service]);
    return serviceGroupBy(validServices);
  }

  getSelectedServices() {
    const namespaces = this.getNamespaces();
    return _.map(namespaces, ({ namespace }) => {
      return GetServiceFromNamespace(namespace);
    });
  }

  /**
   * 根据 Panel 的配置项，获取相应的监控数据
   *
   * @param options Panel 的配置参数，示例如下
   *  {
   *     cacheTimeout: undefined,
   *     dashboardId: 41,
   *     interval: "30s",
   *     intervalMs: 30000,
   *     maxDataPoints: 554,
   *     panelId: 2,
   *     range: {
   *        from: Moment,
   *        to: Moment,
   *        raw: {from: "now-6h", to: "now"}
   *     },
   *     rangeRaw: {from: "now-6h", to: "now"},
   *     scopedVars: {__interval: {…}, __interval_ms: {…}}
   *     targets: [
   *       {
   *          namespace: "QCE/CVM",
   *          refId: "A",
   *          service: "cvm",
   *          showInstanceDetails: false,
   *          cvm: {
   *            dimensionObject: {InstanceId: {…}}
   *            instance: "",
   *            instanceAlias: "InstanceId",
   *            metricName: "AccOuttraffic",
   *            metricUnit: "MB",
   *            period: 10,
   *            queries: {Filters: {…}, InstanceIds: Array(1), Limit: 20, Offset: 0, filtersChecked: false, …},
   *            region: "ap-beijing"
   *          },
   *          cdb: {},
   *       },
   *     ],
   *     timezone: "browser"
   *   }
   * @return 返回数据对象，示例如下
   * {
   *   data: [
   *     {
   *       "target": "AccOuttraffic - ins-123",
   *       "datapoints": [
   *         [861, 1450754160000],
   *         [767, 1450754220000]
   *       ]
   *     }
   *   ]
   * }
   */
  query(options: any): Record<string, any> {
    const promises: any[] = [];
    const services = this.getSelectedServices();
    _.forEach(services, (service) => {
      const optionsTemp = _.cloneDeep(options);
      const targets = _.filter(optionsTemp.targets, (item) => item.service === service);
      optionsTemp.targets = targets;
      if (optionsTemp.targets.length > 0) {
        const promiseTemp = this[`${_.toUpper(service)}Datasource`].query(optionsTemp);
        if (promiseTemp) {
          promises.push(promiseTemp);
        }
      }
    });
    if (promises.length === 0) {
      return Promise.resolve({ data: [] });
    }
    return Promise.all(promises).then((results) => {
      return { data: _.flatten(results) };
    });
  }

  /**
   * 获取模板变量的选择项列表
   *
   * @param query 模板变量配置填写的 Query 参数字符串
   */
  metricFindQuery(query: string, options?: any) {
    const queries = ParseMetricQuery(query);
    const service = GetServiceFromNamespace(queries['namespace'] || '');

    if (_.isEmpty(queries) || !queries['namespace'] || !queries['action'] || !service) {
      return Promise.resolve([]);
    }
    if (this[`${_.toUpper(service)}Datasource`].metricFindQuery) {
      const result = this[`${_.toUpper(service)}Datasource`].metricFindQuery(
        queries,
        _.get(options, 'variable.regex', undefined)
      );
      if (result) {
        return result;
      }
    }
    return Promise.resolve([]);
  }

  /**
   * 获取地域列表
   * @param service
   */
  getRegions(service) {
    if (this[`${_.toUpper(service)}Datasource`].getRegions) {
      return this[`${_.toUpper(service)}Datasource`].getRegions();
    }
    return [];
  }

  /**
   * 获取监控指标列表
   * @param service
   * @param region
   */
  getMetrics(service, region) {
    return this[`${_.toUpper(service)}Datasource`].getMetrics(region);
  }

  /**
   * 获取可用区列表
   * @param service
   * @param region
   */
  getZones(service, region) {
    if (this[`${_.toUpper(service)}Datasource`].getZones) {
      return this[`${_.toUpper(service)}Datasource`].getZones(region);
    }
    return [];
  }

  /**
   * 获取filter中dropdown列表
   * @param service
   * @param param
   */
  getFilterDropdown(service, param) {
    if (this[`${_.toUpper(service)}Datasource`].getFilterDropdown) {
      return this[`${_.toUpper(service)}Datasource`].getFilterDropdown(param);
    }
    return [];
  }

  /**
   * 获取实例列表
   * @param service
   * @param region
   * @param params
   */
  getInstances(service, region, params) {
    return this[`${_.toUpper(service)}Datasource`].getInstances(region, params);
  }

  /**
   * 获取监听器列表
   * @param service
   * @param region
   * @param params
   */
  getListeners(service, region, instance) {
    if (!this[`${_.toUpper(service)}Datasource`].getListeners) {
      return [];
    }
    return this[`${_.toUpper(service)}Datasource`].getListeners(region, instance);
  }

  /**
   * 获取 私有网络列表
   * @param service
   */
  getVpcIds(service, region) {
    if (this[`${_.toUpper(service)}Datasource`].getVpcIds) {
      return this[`${_.toUpper(service)}Datasource`].getVpcIds(region);
    }
  }

  // 在 Datasource Config 配置时，验证 SerectId、SerectKey 的有效性，并测试勾选的监控服务项的对应 API 连通性
  testDatasource() {
    const promises: any[] = [];
    const services = this.getSelectedServices();
    _.forEach(services, (service) => {
      promises.push(this[`${_.toUpper(service)}Datasource`].testDatasource());
    });
    if (promises.length === 0) {
      return Promise.resolve({
        status: 'error',
        message: `Nothing configured. At least one of the API's services must be configured.`,
        title: 'Error',
      });
    }
    return Promise.all(promises).then((results) => {
      let status = 'success';
      let message = 'Datsource Connection OK';

      const errorMsg = _.reduce(
        results,
        (acc, cur) => {
          if (cur.status === 'error') {
            if (acc === '') acc += 'Oops! Found an error in: ';
            acc += `${cur.service}: ${cur.message}; \n`;
          }
          return acc;
        },
        ''
      );

      if (errorMsg) {
        status = 'error';
        message = errorMsg;
      }

      return {
        status,
        message,
        title: _.upperFirst(status),
      };
    });
  }

  getServiceFn(service, fnName) {
    return (...argu) => {
      if (!this[`${_.toUpper(service)}Datasource`][fnName]) {
        return [];
      }
      return this[`${_.toUpper(service)}Datasource`][fnName](...argu);
    };
  }
}
