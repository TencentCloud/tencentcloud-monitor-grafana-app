import _ from 'lodash';
import TCMonitorCVMDataSource from './tc_monitor_cvm/tc_monitor_cvm_datasource';
import TCMonitorCDBDatasource from './tc_monitor_cdb/tc_monitor_cdb_datasource';
import { services, getServiceFromNamespace, parseMetricQuery } from './utils/constants';


export class TCMonitorDatasource {
  tcMonitorCVMDatasource: TCMonitorCVMDataSource;
  tcMonitorCDBDatasource: TCMonitorCDBDatasource;
  instanceSettings: any;
  namespaces: string[] = [];

  /** @ngInject */
  constructor(instanceSettings, private backendSrv, private templateSrv) {
    this.instanceSettings = instanceSettings;
    this.tcMonitorCVMDatasource = new TCMonitorCVMDataSource(
      instanceSettings,
      this.backendSrv,
      this.templateSrv,
    );
    this.tcMonitorCDBDatasource = new TCMonitorCDBDatasource(
      instanceSettings,
      this.backendSrv,
      this.templateSrv,
    );
  }

  // query data for panel
  query(options) {
    const promises: any[] = [];
    // get cvm targets and query data
    const cvmOptions = _.cloneDeep(options);
    cvmOptions.targets = _.filter(cvmOptions.targets, ['service', 'cvm']);
    if (cvmOptions.targets.length > 0) {
      const cvmPromise = this.tcMonitorCVMDatasource.query(cvmOptions);
      if (cvmPromise) {
        promises.push(cvmPromise);
      }
    }
    // get cdb targets and query data
    const cdbOptions = _.cloneDeep(options);
    cdbOptions.targets = _.filter(cdbOptions.targets, ['service', 'cdb']);
    if (cdbOptions.targets.length > 0) {
      const cdbPromise = this.tcMonitorCDBDatasource.query(cdbOptions);
      if (cdbPromise) {
        promises.push(cdbPromise);
      }
    }

    if (promises.length === 0) {
      return Promise.resolve({ data: [] });
    }
    return Promise.all(promises).then(results => {
      return { data: _.flatten(results) };
    });
  }
 
  // handle template variable query
  metricFindQuery(query: string) {
    const queries = parseMetricQuery(query);
    const service = getServiceFromNamespace(queries['namespace'] || '');
    if (_.isEmpty(queries) || !queries['namespace'] || !queries['action'] || !service) {
      return Promise.resolve([]);
    }
    switch(service) {
      case 'cvm':
        const cvmResult = this.tcMonitorCVMDatasource.metricFindQuery(queries);
        if (cvmResult) {
          return cvmResult;
        }
        break;
      case 'cdb':
        const cdbResult = this.tcMonitorCDBDatasource.metricFindQuery(queries);
        if (cdbResult) {
          return cdbResult;
        }
        break;
    }
    return Promise.resolve([]);
  }

  // common function
  getNamespaces() {
    const namespaces: string[] = [];
    _.forEach(services, (service) => {
      if (this.instanceSettings.jsonData[service.service] === true) {
        namespaces.push(service.namespace);
      }
    });
    return namespaces;
  }

  // cvm funtions
  getCVMRegions() {
    return this.tcMonitorCVMDatasource.getRegions();
  }

  getCVMMetrics(region) {
    return this.tcMonitorCVMDatasource.getMetrics(region);
  }

  getCVMInstances(region, params) {
    return this.tcMonitorCVMDatasource.getInstances(region, params);
  }

  getCVMZones(region) {
    return this.tcMonitorCVMDatasource.getZones(region);
  }

  // cdb functions
  getCDBRegions() {
    return this.tcMonitorCDBDatasource.getRegions();
  }

  getCDBMetrics(region) {
    return this.tcMonitorCDBDatasource.getMetrics(region);
  }

  getCDBInstances(region, params) {
    return this.tcMonitorCDBDatasource.getInstances(region, params);
  }

  getCDBZones(region) {
    return this.tcMonitorCDBDatasource.getZones(region);
  }

  // test datasource connection 
  testDatasource() {
    const promises: any[] = [];
    if (this.instanceSettings.jsonData.cvm === true) {
      promises.push(this.tcMonitorCVMDatasource.testDatasource());
    }
    if (this.instanceSettings.jsonData.cdb === true) {
      promises.push(this.tcMonitorCDBDatasource.testDatasource());
    }
    if (promises.length === 0) {
      return {
        status: 'error',
        message: `Nothing configured. At least one of the API's services must be configured.`,
        title: 'Error',
      };
    }
    return Promise.all(promises).then(results => {
      let status = 'success';
      let message = '';
      for (let i = 0; i < results.length; i++) {
        if (results[i].status !== 'success') {
          status = results[i].status;
        }
        // get namespaces for query controller
        if (results[i].namespace) {
          this.namespaces.push(results[i].namespace);
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
