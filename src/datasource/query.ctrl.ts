import { QueryCtrl } from 'grafana/app/plugins/sdk';
import _ from 'lodash';
import './components/multi_condition';
import './components/custom_select_dropdown';
import './css/query_editor.css';
import { cvmInstanceAliasList, cdbInstanceAliasList, getServiceFromNamespace, replaceVariable } from './utils/constants';
import { CDBFieldsDescriptor, CDBFields } from '../datasource/tc_monitor_cdb/constants';
import { CVMFilterFieldsDescriptor, CVMFilterFields } from '../datasource/tc_monitor_cvm/constants';

const queriesRegions = ['zone'];


export class TCMonitorDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = 'datasource/partials/query.editor.html';
  namespaces = [];
  regions = [];
  instanceSet: any[] = [];
  metricSet: any[] = [];
  periodSet: number[] = [];
  dimensionSet: any[] = [];
  instanceAliasSet: any[] = [];
  CDBFieldsDescriptor: any[] = [];
  CVMFilterFieldsDescriptor: any[] = [];
  target: {
    refId: string;
    namespace: string;
    service: string;
    cvm: {
      region: string;
      metricName: string;
      metricUnit: string;
      period: number;
      dimensionObject: object;
      instance: string;
      instanceAlias: string;
      queries: any;
    },
    cdb: {
      region: string;
      metricName: string;
      metricUnit: string;
      period: number;
      dimensionObject: object;
      instance: string;
      instanceAlias: string;
      queries: object;
    }
  }

  defaults = {
    namespace: '',
    service: '',
    cvm: {
      region: '',
      metricName: '',
      metricUnit: '',
      period: undefined,
      dimensionObject: null,
      instance: '',
      instanceAlias: 'InstanceId',
      queries: {
        Limit: 20,
        Offset: 0,
        instanceIdsChecked: false,
        filtersChecked: false,
        InstanceIds: [''],
        Filters: Object.assign({}, CVMFilterFields),
      },
      test: undefined,
    },
    cdb: {
      region: '',
      metricName: '',
      metricUnit: '',
      period: undefined,
      dimensionObject: null,
      instance: '',
      instanceAlias: 'InstanceId',
      queries: Object.assign({}, CDBFields),
    }
  }

  lastQuery: string;
  lastQueryError?: string;

  /** @ngInject */
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);
    this.namespaces = this.datasource.getNamespaces();
    _.defaultsDeep(this.target, this.defaults);
    if (this.namespaces.length > 0) {
      // 命名空间存在的时候
      if (_.indexOf(this.namespaces, this.target.namespace) === -1) {
        this.target.namespace = this.namespaces[0];
      }
      this.target.service = getServiceFromNamespace(this.target.namespace) || '';
      this.instanceAliasSet = this.getInstanceAliasList(this.target.service);
    } else {
      // 命名空间不存在的时候
      this.target.namespace = '';
      this.target.service = '';
      this.instanceAliasSet = [];
    }
    this.CDBFieldsDescriptor = CDBFieldsDescriptor;
    this.CVMFilterFieldsDescriptor = CVMFilterFieldsDescriptor;
    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
  }

  getInstanceAliasList(service) {
    switch (service) {
      case 'cvm':
        return _.map(cvmInstanceAliasList, item => ({ text: `As ${item}`, value: item }));
      case 'cdb':
        return _.map(cdbInstanceAliasList, item => ({ text: `As ${item}`, value: item }));
      default:
        return [];
    }
  }

  onDataReceived(dataList) {
    this.lastQueryError = undefined;
    this.lastQuery = '';

    const anySeriesFromQuery: any = _.find(dataList, { refId: this.target.refId });
    if (anySeriesFromQuery) {
      this.lastQuery = anySeriesFromQuery.query;
    }
  }

  onDataError(err) {
    this.handleQueryCtrlError(err);
  }

  handleQueryCtrlError(err) {
    if (err.query && err.query.refId && err.query.refId !== this.target.refId) {
      return;
    }

    if (err.error && err.error.data && err.error.data.error && err.error.data.error.innererror) {
      if (err.error.data.error.innererror.innererror) {
        this.lastQueryError = err.error.data.error.innererror.innererror.message;
      } else {
        this.lastQueryError = err.error.data.error.innererror.message;
      }
    } else if (err.error && err.error.data && err.error.data.error) {
      this.lastQueryError = err.error.data.error.message;
    } else if (err.error && err.error.data) {
      this.lastQueryError = err.error.data.message;
    } else if (err.data && err.data.error) {
      this.lastQueryError = err.data.error.message;
    } else if (err.data && err.data.message) {
      this.lastQueryError = err.data.message;
    } else {
      this.lastQueryError = err;
    }
  }

  onNamespaceChange() {
    const service = this.target.service;
    this.target[service].region = '';
    this.target[service].metricName = '';
    this.target[service].metricUnit = '';
    this.target[service].period = undefined;
    this.target[service].dimensionObject = null;
    this.target[service].instance = '';
    this.regions = [];
    this.metricSet = [];
    this.periodSet = [];
    this.dimensionSet = [];
    this.instanceSet = [];
    // reset service according to the namespace
    this.target.service = getServiceFromNamespace(this.target.namespace) || '';
    this.instanceAliasSet = this.getInstanceAliasList(this.target.service);
    this.refresh();
  }

  getRegions(query) {
    const service = this.target.service;
    if (!service || _.startsWith('$')) {
      return [];
    }
    if (this.regions.length) {
      return this.regions;
    }
    return this.datasource[`get${_.upperCase(service)}Regions`]()
      .then(list => {
        this.regions = list;
        return list;
      }).catch(this.handleQueryCtrlError.bind(this));
  }

  onRegionChange() {
    const service = this.target.service;
    this.target[service].instance = '';
    this.instanceSet = [];
    _.forEach(this.target[service].dimensionObject, (__, key) => {
      this.target[service].dimensionObject[key] = { Name: key, Value: '' };
    });
    _.forEach(this.target[service].queries, (__, key) => {
      if (_.indexOf(queriesRegions, key) !== -1) {
        this.target[service].queries[key] = '';
      }
    })
    this.refresh();
  }

  replace(variable: string, multiple: boolean) {
    return replaceVariable(this.templateSrv, this.panelCtrl.panel.scopedVars, variable, multiple);
  }

  getMetriNameDesc() {
    const service = this.target.service;
    const index = _.findIndex(this.metricSet, item => item.MetricName === this.target[service].metricName);
    return index !== -1 ? this.metricSet[index].Meaning.Zh : '';
  }

  getMetrics(query) {
    const service = this.target.service;
    const region = this.replace(this.target[service].region, false);

    if (!service || !region) {
      return [];
    }
    if (this.metricSet.length) {
      return _.map(this.metricSet, item => ({ text: item.MetricName, value: item.MetricName }));
    }
    return this.datasource[`get${_.upperCase(service)}Metrics`](region)
      .then(list => {
        this.metricSet = list;
        const index = _.findIndex(this.metricSet, item => item.MetricName === this.target[service].metricName);
        if (index != -1) {
          this.periodSet = _.get(this.metricSet[index], 'Period', []);
          this.dimensionSet = _.get(this.metricSet[index], 'Dimensions.0.Dimensions', []);
        }
        return _.map(list, item => ({ text: item.MetricName, value: item.MetricName }));
      })
      .catch(this.handleQueryCtrlError.bind(this));
  }

  onMetricChange() {
    const service = this.target.service;
    let periodSet = [];
    let dimensionSet = [];
    let dimensionObject: any = {};
    let metricUnit = '';
    const index = _.findIndex(this.metricSet, item => item.MetricName === this.target[service].metricName);
    if (index !== -1) {
      periodSet = _.get(this.metricSet[index], 'Period', []);
      dimensionSet = _.get(this.metricSet[index], 'Dimensions.0.Dimensions', []);
      metricUnit = _.get(this.metricSet[index], 'Unit', '');
    }
    _.forEach(dimensionSet, item => {
      dimensionObject[item] = { Name: item, Value: '' };
    });
    this.periodSet = periodSet;
    this.dimensionSet = dimensionSet;
    this.target[service].period = periodSet.length > 0 ? periodSet[0] : undefined;
    this.target[service].dimensionObject = dimensionObject;
    this.target[service].metricUnit = metricUnit;
    this.refresh();
  }

  getInstanceQuery() {
    const service = this.target.service;
    const queries = this.target[service].queries;
    let params: any = {};
    switch (service) {
      case 'cvm':
        params = _.pick(queries, ['Limit', 'Offset']);
        if (queries.instanceIdsChecked) {
          if (_.isArray(queries.InstanceIds)) {
            const InstanceIds = _.compact(queries.InstanceIds);
            if (_.uniq(InstanceIds).length > 0) {
              params.InstanceIds = _.uniq(InstanceIds).slice(0, 100);
            }
          }
        } else if (queries.filtersChecked) {
          const Filters: any[] = [];
          _.forEach(queries.Filters, (item: any, key) => {
            if (Filters.length > 9) return;
            if (_.isArray(item)) {
              item = _.compact(item);
              if (item.length > 0) {
                Filters.push({ Name: key, Values: _.uniq(item).slice(0, 5) });
              }
            } else if (_.isObject(item)) {
              if (!_.isEmpty(_.get(item, 'value', []))) {
                Filters.push({ Name: key, Values: _.get(item, 'value', []).slice(0, 5) })
              }
            }
          });
          if (Filters.length > 0) {
            params.Filters = Filters;
          }
        }
        break;
      case 'cdb':
        _.forEach(queries, (item: any, key) => {
          if (_.isArray(item)) {
            item = _.compact(item);
            if (item.length > 0) {
              params[key] = _.uniq(item);
            }
          } else if (_.isObject(item)) {
            if (!_.isEmpty(_.get(item, 'value'))) {
              params[key] = _.get(item, 'value');
            }
          } else if (_.isNumber(item) || !_.isEmpty(item)) {
            params[key] = item;
          }
        });
        break;
    }
    return params;

  }

  getInstances() {
    const service = this.target.service;
    const region = this.replace(this.target[service].region, false);
    if (!service || !region) {
      return [];
    }
    const params = this.getInstanceQuery();
    return this.datasource[`get${_.upperCase(service)}Instances`](region, params)
      .then(list => {
        this.instanceSet = list;
        const instanceAlias = this.target[service].instanceAlias;
        let instances: any[] = [];
        _.forEach(list, (item) => {
          const instanceAliasValue = _.get(item, instanceAlias);
          if (instanceAliasValue) {
            if (typeof instanceAliasValue === 'string') {
              instances.push({ text: instanceAliasValue, value: JSON.stringify(item) });
            } else if (_.isArray(instanceAliasValue)) {
              _.forEach(instanceAliasValue, (subItem) => {
                item._InstanceAliasValue = subItem;
                instances.push({ text: subItem, value: JSON.stringify(item) });
              });
            }
          }
        });
        return instances;
      })
      .catch(this.handleQueryCtrlError.bind(this));
  }

  onInstanceChange() {
    this.refresh();
  }

  onInstanceAliasChange() {
    if (!this.isVariable('instance')) {
      const service = this.target.service;
      this.target[service].instance = '';
    }
  }

  onCVMInstanceIdsChecked() {
    if (this.target.cvm.queries.instanceIdsChecked) {
      this.target.cvm.queries.filtersChecked = false;
    }
    this.onInstanceQueryChange();
  }

  onCVMFiltersChecked() {
    if (this.target.cvm.queries.filtersChecked) {
      this.target.cvm.queries.instanceIdsChecked = false;
    }
    this.onInstanceQueryChange();
  }

  getCVMDropdown(field) {
    switch (field) {
      case 'zone':
        return this.getZones();
      default:
        return [];
    }
  }

  getZones() {
    const service = this.target.service;
    const region = this.replace(this.target[service].region, false);
    if (!service || !region) {
      return [];
    }
    return this.datasource[`get${_.upperCase(service)}Zones`](region).catch(this.handleQueryCtrlError.bind(this));
  }

  getCDBDropdown(field) {
    switch (field) {
      case 'ZoneIds':
        return this.getZones();
      default:
        return [];
    }
  }

  onInstanceQueryChange() {
    if (!this.isVariable('instance')) {
      const service = this.target.service;
      this.target[service].instance = '';
      this.instanceSet = [];
      _.forEach(this.target[service].dimensionObject, (__, key) => {
        this.target[service].dimensionObject[key] = { Name: key, Value: '' };
      });
      this.panelCtrl.refresh();
    }
  }

  // check get Instances through Variable Template or not
  isVariable(field) {
    const service = this.target.service;
    const value = this.target[service][field];
    if (value && (value.match(/^\${?(\w+)}?/) || value.match(/^\[\[(\w+)(\:\w+)?\]\]/))) {
      return true;
    }
    return false;
  }

}
