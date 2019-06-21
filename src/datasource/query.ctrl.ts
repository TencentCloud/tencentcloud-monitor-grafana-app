import { QueryCtrl } from 'grafana/app/plugins/sdk';
import * as _ from 'lodash';

import { GetServiceFromNamespace, ReplaceVariable } from './common/constants';
import { InitServiceState, InstanceAliasList, GetInstanceQueryParams } from './tc_monitor';

import './components/multi_condition';
import './components/custom_select_dropdown';
import './css/query_editor.css';

export class TCMonitorDatasourceQueryCtrl extends QueryCtrl {
  static templateUrl = 'datasource/partials/query.editor.html';
  datasource: any;
  panelCtrl: any;
  namespaces: string[] = [];
  regions: any[] = [];
  instanceList: any[] = [];
  metricList: any[] = [];
  periodList: number[] = [];
  dimensionList: any[] = [];
  instanceAliasList: any[] = [];
  target: {
    refId: string;
    service: string;
    namespace: string;
    showInstanceDetails: boolean;
  };
  defaults = {
    namespace: '',
    service: '',
    showInstanceDetails: false,
    ...InitServiceState,
  };

  lastQuery: string;
  lastQueryError?: string;

  /** @ngInject */
  constructor($scope, $injector, private templateSrv) {
    super($scope, $injector);
    this.namespaces = this.datasource.getNamespaces();
    // 当数据源的命名空间列表存在时，设置相应的默认值
    if (this.namespaces.length > 0) {
      if (_.indexOf(this.namespaces, this.target.namespace) === -1) {
        this.target.namespace = this.namespaces[0];
      }
      this.target.service = GetServiceFromNamespace(this.target.namespace) || '';
    }
    _.defaultsDeep(this.target, this.defaults);
    this.instanceAliasList = this.getInstanceAliasList(this.target.service);
    this.panelCtrl.events.on('data-received', this.onDataReceived.bind(this), $scope);
    this.panelCtrl.events.on('data-error', this.onDataError.bind(this), $scope);
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
    if (_.get(err, 'query.refId') !== this.target.refId) {
      return;
    }

    if (!!_.get(err, 'error.data.error.innererror', undefined)) {
      if (!!_.get(err, 'error.data.error.innererror.innererror', undefined)) {
        this.lastQueryError = _.get(err, 'error.data.error.innererror.innererror.message');
      } else {
        this.lastQueryError = _.get(err, 'error.data.error.innererror.message');
      }
    } else if (!!_.get(err, 'error.data.error', undefined)) {
      this.lastQueryError = _.get(err, 'error.data.error.message');
    } else if (!!_.get(err, 'error.data', undefined)) {
      this.lastQueryError = _.get(err, 'error.data.message');
    } else if (!!_.get(err, 'data.error', undefined)) {
      this.lastQueryError = _.get(err, 'data.error.message');
    } else if (err.data && err.data.message) {
    } else if (!!_.get(err, 'data.message', undefined)) {
      this.lastQueryError = _.get(err, 'data.message');
    } else {
      this.lastQueryError = err;
    }
  }

  /**
   * 获取实例展示字段的选择列表
   *
   * @param service 监控服务名
   */
  getInstanceAliasList(service) {
    if (!service) {
      return [];
    }
    return _.map(InstanceAliasList[`${_.toUpper(service)}InstanceAliasList`] || [], item => ({ text: `As ${item}`, value: item }));
  }

  onNamespaceChange() {
    const service = GetServiceFromNamespace(this.target.namespace) || '';
    this.regions = [];
    this.metricList = [];
    this.periodList = [];
    this.dimensionList = [];
    this.instanceList = [];

    const initState = InitServiceState[service];
    this.target[service] = _.cloneDeep(initState);
    this.target.service = service;

    this.instanceAliasList = this.getInstanceAliasList(service);
    this.refresh();
  }

  /**
   * 获取地域列表
   * output:
   *  [
   *    {
   *      "Region": "ap-beijing",
   *      "RegionName": "华北地区(北京)",
   *      "RegionState": "AVAILABLE"
   *    },
   *    {
   *      "Region": "ap-guangzhou",
   *      "RegionName": "华南地区(广州)",
   *      "RegionState": "AVAILABLE"
   *    }
   *  ]
   */
  getRegions(query) {
    const service = this.target.service;
    if (!service || _.startsWith('$')) {
      return [];
    }
    if (this.regions.length) {
      return this.regions;
    }
    return this.datasource.getRegions(service)
      .then(list => {
        this.regions = list;
        return list;
      }).catch(this.handleQueryCtrlError.bind(this));
  }

  onRegionChange() {
    const service = this.target.service;
    this.target[service].instance = '';
    this.instanceList = [];
    _.forEach(this.target[service].dimensionObject, (__, key) => {
      this.target[service].dimensionObject[key] = { Name: key, Value: '' };
    });
    this.target[service].queries = _.cloneDeep(InitServiceState[service].queries);
    this.refresh();
  }

  /**
   * 获取模板变量的实际值
   *
   * @param variable 模板变量的名字
   * @param multiple 是否允许多选，如果为 false，返回实际值数组的第一个值
   */
  getVariable(variable: string, multiple: boolean) {
    return ReplaceVariable(this.templateSrv, this.panelCtrl.panel.scopedVars, variable, multiple);
  }

  getMetricNameDesc() {
    const service = this.target.service;
    const index = _.findIndex(this.metricList, item => item.MetricName === this.target[service].metricName);
    return index !== -1 ? this.metricList[index].Meaning.Zh : '';
  }

  getMetrics(query) {
    const service = this.target.service;
    const region = this.getVariable(_.get(this.target[service], 'region', ''), false);

    if (!service || !region) {
      return [];
    }
    if (this.metricList.length) {
      return _.map(this.metricList, item => ({ text: item.MetricName, value: item.MetricName }));
    }
    return this.datasource.getMetrics(service, region)
      .then(list => {
        this.metricList = list;
        const index = _.findIndex(this.metricList, item => item.MetricName === this.target[service].metricName);
        if (index !== -1) {
          this.periodList = _.get(this.metricList[index], 'Period', []);
          this.dimensionList = _.get(this.metricList[index], 'Dimensions.0.Dimensions', []);
        }
        return _.map(list, item => ({ text: item.MetricName, value: item.MetricName }));
      })
      .catch(this.handleQueryCtrlError.bind(this));
  }

  onMetricChange() {
    const service = this.target.service;
    let periodList = [];
    let dimensionList = [];
    const dimensionObject: any = {};
    let metricUnit = '';
    const index = _.findIndex(this.metricList, item => item.MetricName === this.target[service].metricName);
    if (index !== -1) {
      periodList = _.get(this.metricList[index], 'Period', []);
      dimensionList = _.get(this.metricList[index], 'Dimensions.0.Dimensions', []);
      metricUnit = _.get(this.metricList[index], 'Unit', '');
    }
    _.forEach(dimensionList, item => {
      dimensionObject[item] = { Name: item, Value: '' };
    });
    this.periodList = periodList;
    this.dimensionList = dimensionList;
    this.target[service].period = periodList.length > 0 ? periodList[0] : undefined;
    this.target[service].dimensionObject = dimensionObject;
    this.target[service].metricUnit = metricUnit;
    this.refresh();
  }

  getInstances() {
    const service = this.target.service;
    const region = this.getVariable(_.get(this.target[service], 'region', ''), false);
    if (!service || !region) {
      return [];
    }
    const params = this.getInstanceQueryParams(service);
    return this.datasource.getInstances(service, region, params)
      .then(list => {
        this.instanceList = list;
        const instanceAlias = this.target[service].instanceAlias;
        const instances: any[] = [];
        _.forEach(list, (item) => {
          // 根据 instanceAlias，确定实例展示字段，并保存至 _InstanceAliasValue，用于 constants.ts 的监控数据解析函数 ParseQueryResult
          const instanceAliasValue = _.get(item, instanceAlias);
          if (instanceAliasValue) {
            if (typeof instanceAliasValue === 'string') {
              item._InstanceAliasValue = instanceAliasValue;
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

  /**
   * 获取实例请求接口的请求参数
   *
   * @param service 监控服务名
   */
  getInstanceQueryParams(service) {
    const queries = this.target[service].queries;
    if (GetInstanceQueryParams[`${_.toUpper(service)}GetInstanceQueryParams`]) {
      return GetInstanceQueryParams[`${_.toUpper(service)}GetInstanceQueryParams`](queries);
    } else {
      return {};
    }
  }

  onInstanceAliasChange() {
    // 仅当 instance 字段不是模板变量时，执行以下操作
    if (!this.isVariable('instance')) {
      const service = this.target.service;
      this.target[service].instance = '';
      this.refresh();
    }
  }

  onInstanceQueryChange() {
    // 仅当 instance 字段不是模板变量时，执行以下操作
    if (!this.isVariable('instance')) {
      const service = this.target.service;
      this.target[service].instance = '';
      this.instanceList = [];
      _.forEach(this.target[service].dimensionObject, (__, key) => {
        this.target[service].dimensionObject[key] = { Name: key, Value: '' };
      });
      this.refresh();
    }
  }

  /**
   * 检查某个变量是否模板变量，即是否匹配 ${varnam} 或 [[varname]]
   *
   * @param field 变量字段名
   */
  isVariable(field) {
    const service = this.target.service;
    const value = this.target[service][field];
    if (value && (value.match(/^\${?(\w+)}?/) || value.match(/^\[\[(\w+)(\:\w+)?\]\]/))) {
      return true;
    }
    return false;
  }

  checkShowDetail(field) {
    return !this.isVariable(field) && this.target.showInstanceDetails;
  }
}
