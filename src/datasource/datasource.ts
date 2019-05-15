import * as _ from 'lodash';
import { Datasource, SERVICES } from './tc_monitor';
import { GetServiceFromNamespace, ParseMetricQuery } from './utils/constants';

export default interface DatasourceInterface {
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  query(options: any);
  testDatasource();
  metricFindQuery(query: any);
  getRegions(service: string);
  getMetrics(service: string, region: string);
  getZones(service: string, region: string);
  getInstances(service: string, region: string, params: any);
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
    _.forEach(Datasource, (_class, key) => {
      this[key] = new _class(instanceSettings, this.backendSrv, this.templateSrv);
    });
  }

  // common function
  getNamespaces() {
    const namespaces: string[] = [];
    _.forEach(SERVICES, (service) => {
      if (this.instanceSettings.jsonData[service.service] === true) {
        namespaces.push(service.namespace);
      }
    });
    return namespaces;
  }

  getSelectedSservices() {
    const namespaces = this.getNamespaces();
    return _.map(namespaces, (namespace) => {
      return GetServiceFromNamespace(namespace);
    });
  }

  /*
  * query data for panel
  * input:
  *   {
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
  * output:
  * [{
  *    "target":"upper_75",
  *      "datapoints":[
  *        [622, 1450754160000],
  *        [365, 1450754220000]
  *    ]
  *  }, {
  *      "target":"upper_90",
  *      "datapoints":[
  *        [861, 1450754160000],
  *        [767, 1450754220000]
  *      ]
  *  }]
  */
  query(options: any): object {
    const promises: any[] = [];
    const services = this.getSelectedSservices();
    _.forEach(services, service => {
      const optionsTemp = _.cloneDeep(options);
      optionsTemp.targets = _.filter(optionsTemp.targets, ['service', service]);
      if (optionsTemp.targets.length > 0) {
        const promiseTemp = this[`${_.upperCase(service)}Datasource`].query(optionsTemp);
        if (promiseTemp) {
          promises.push(promiseTemp);
        }
      }
    });
    if (promises.length === 0) {
      return Promise.resolve({ data: [] });
    }
    return Promise.all(promises).then(results => {
      return { data: _.flatten(results) };
    });
  }

  // handle template variable query
  metricFindQuery(query: string) {
    console.log('metricFindQuery:', query);
    const queries = ParseMetricQuery(query);
    const service = GetServiceFromNamespace(queries['namespace'] || '');
    if (_.isEmpty(queries) || !queries['namespace'] || !queries['action'] || !service) {
      return Promise.resolve([]);
    }
    const result = this[`${_.upperCase(service)}Datasource`].metricFindQuery(queries);
    if (result) {
      return result;
    }
    return Promise.resolve([]);
  }

  getRegions(service) {
    return this[`${_.upperCase(service)}Datasource`].getRegions();
  }

  getMetrics(service, region) {
    return this[`${_.upperCase(service)}Datasource`].getMetrics(region);
  }

  getZones(service, region) {
    return this[`${_.upperCase(service)}Datasource`].getZones(region);
  }

  getInstances(service, region, params) {
    return this[`${_.upperCase(service)}Datasource`].getInstances(region, params);
  }

  // test datasource connection
  testDatasource() {
    const promises: any[] = [];
    const services = this.getSelectedSservices();
    _.forEach(services, service => {
      promises.push(this[`${_.upperCase(service)}Datasource`].testDatasource());
    });
    if (promises.length === 0) {
      return Promise.resolve({
        status: 'error',
        message: `Nothing configured. At least one of the API's services must be configured.`,
        title: 'Error',
      });
    }
    return Promise.all(promises).then(results => {
      let status = 'success';
      let message = '';
      for (let i = 0; i < results.length; i++) {
        if (results[i].status !== 'success') {
          status = results[i].status;
        }
        message += `${i + 1}. ${results[i].message} \n`;
      }
      return {
        status: status,
        message: message,
        title: _.upperFirst(status),
      };
    });
  }
}
