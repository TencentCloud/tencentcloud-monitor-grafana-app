import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import { Sign } from '../../utils/sign';
import { CDBInstanceAliasList } from './query_def';
import { FINACE_REGIONS, SERVICES_API_INFO, FINACE_HOST, ReplaceVariable, GetDimensions, ParseQueryResult } from '../../utils/constants';


export default class CDBDatasource implements DatasourceInterface {
  Namespace = 'QCE/CDB';
  servicesMap = _.pick(SERVICES_API_INFO, ['cvm', 'cdb', 'monitor']);
  // finance path and host
  financePathHost = _.pick(FINACE_HOST, ['cvm', 'cdb', 'monitor']);
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  secretKey: string;
  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
    this.secretKey = (instanceSettings.jsonData || {}).secretKey || '';
  }

  // handle template variable query
  metricFindQuery(query: object) {
    // query region list
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    // query cdb instance list
    const instancesQuery = query['action'].match(/^DescribeDBInstances/i) && !!query['region'];
    if (instancesQuery && this.toVariable(query['region'])) {
      return this.getInstances(this.toVariable(query['region'])).then(result => {
        const instanceAlias = CDBInstanceAliasList.indexOf(query['instancealias']) !== -1 ? query['instancealias'] : 'InstanceId';
        const instances: any[] = [];
        _.forEach(result, (item) => {
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
      });
    }
    return [];
  }

  // query data for panel
  query(options: any) {
    const allInstances: any[] = [];
    const queries = _.filter(options.targets, item => {
      // get validated targets
      return (
        item.cdb.hide !== true &&
        !!item.namespace &&
        !!item.cdb.metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scropedVars, item.cdb.region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scropedVars, item.cdb.instance, true))
      );
    }).map(target => {
      let instances = ReplaceVariable(this.templateSrv, options.scropedVars, target.cdb.instance, true);
      const Instances: any[] = [];
      if (_.isArray(instances)) {
        // handle multiple instances
        _.forEach(instances, instance => {
          instance = _.isString(instance) ? JSON.parse(instance) : instance;
          allInstances.push(instance);
          const dimensionObject = target.cdb.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          Instances.push({ Dimensions: GetDimensions(dimensionObject) });
        });
      } else {
        // handle single instance
        instances = _.isString(instances) ? JSON.parse(instances) : instances;
        allInstances.push(instances);
        const dimensionObject = target.cdb.dimensionObject;
        _.forEach(dimensionObject, (__, key) => {
          dimensionObject[key] = { Name: key, Value: instances[key] };
        });
        Instances.push({ Dimensions: GetDimensions(dimensionObject) });
      }
      const region = ReplaceVariable(this.templateSrv, options.scropedVars, target.cdb.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.cdb.period || 300,
        Instances,
        Namespace: target.namespace,
        MetricName: target.cdb.metricName,
      };
      return this.getMonitorData(data, region);
    });

    if (queries.length === 0) {
      return { data: [] };
    }

    return Promise.all(queries)
      .then(responses => {
        return ParseQueryResult(responses, allInstances);
      })
      .catch(error => {
        return { data: [] };
      });
  }

  // get the actual value of template variable
  toVariable(metric: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  // query monitor data
  getMonitorData(params, region) {
    const serviceMap = this.getServiceInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: params,
    }, serviceMap.service, { action: 'GetMonitorData', region });
  }

  // get service detail info by region and service
  getServiceInfo(region, service) {
    return Object.assign({}, this.servicesMap[service] || {}, this.getHostAndPath(region, service));
  }

  // get host and path for finance regions
  getHostAndPath(region, service) {
    if (_.indexOf(FINACE_REGIONS, region) === -1) {
      return {};
    }
    return _.find(_.find(this.financePathHost, (__, key) => key === service), (__, key) => key === region) || {};
  }

  // check whether field is validated or not
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  // get region list
  getRegions() {
    return this.doRequest({
      url: this.url + '/cvm',
    }, 'cvm', { action: 'DescribeRegions' })
      .then(response => {
        // parse response
        return _.filter(
          _.map(response.RegionSet || [], item => {
            return { text: item.RegionName, value: item.Region, RegionState: item.RegionState };
          }),
          item => item.RegionState === 'AVAILABLE'
        );
      });
  }

  // get metric list by region
  getMetrics(region = 'ap-guangzhou') {
    const serviceMap = this.getServiceInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: {
        Namespace: this.Namespace,
      },
    }, serviceMap.service, { region, action: 'DescribeBaseMetrics' })
      .then(response => {
        return _.filter(response.MetricSet || [], item => !(item.Namespace !== this.Namespace || !item.MetricName));
      });
  }

  // get zone list by region
  getZones(region) {
    const serviceMap = this.getServiceInfo(region, 'cvm');
    return this.doRequest({
      url: this.url + serviceMap.path,
    }, serviceMap.service, { region, action: 'DescribeZones' })
      .then(response => {
        return _.filter(
          _.map(response.ZoneSet || [], item => {
            return { text: item.ZoneName, value: item.ZoneId, ZoneState: item.ZoneState, Zone: item.Zone };
          }),
          item => item.ZoneState === 'AVAILABLE'
        );
      });
  }

  // get cdb instances
  getInstances(region, params = {}) {
    params = Object.assign({ Offset: 0, Limit: 2000 }, params);
    const serviceMap = this.getServiceInfo(region, 'cdb');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: params,
    }, serviceMap.service, { region, action: 'DescribeDBInstances' })
      .then(response => {
        return response.Items || [];
      });
  }

  // test connections of cvm, cdb and montior api
  testDatasource() {
    if (!this.isValidConfigField(this.secretId) || !this.isValidConfigField(this.secretKey)) {
      return {
        service: 'cdb',
        status: 'error',
        message: 'The SecretId/SecretKey field is required.',
      };
    }

    return Promise.all([
      this.doRequest(
        {
          url: this.url + '/cvm',
        },
        'cvm',
        { action: 'DescribeRegions' }
      ),
      this.doRequest(
        {
          url: this.url + '/monitor',
          data: {
            Namespace: this.Namespace,
          },
        },
        'monitor',
        { region: 'ap-guangzhou', action: 'DescribeBaseMetrics' }
      ),
      this.doRequest(
        {
          url: this.url + '/cdb',
          data: {
            Offset: 0,
            Limit: 1,
          },
        },
        'cdb',
        { region: 'ap-guangzhou', action: 'DescribeDBInstances' }
      )
    ]).then(responses => {
      const cvmErr = _.get(responses, '[0].Error', {});
      const monitorErr = _.get(responses, '[1].Error', {});
      const cdbErr = _.get(responses, '[2].Error', {});
      const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
      const cdbAuthFail = _.get(cdbErr, 'Code', '').indexOf('AuthFailure') !== -1;
      if (cvmAuthFail || monitorAuthFail || cdbAuthFail) {
        const messages: any[] = [];
        if (cvmAuthFail) {
          messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
        }
        if (monitorAuthFail) {
          messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
        }
        if (cdbAuthFail) {
          messages.push(`${_.get(cdbErr, 'Code')}: ${_.get(cdbErr, 'Message')}`);
        }
        const message = _.join(_.compact(_.uniq(messages)), '; ');
        return {
          service: 'cdb',
          status: 'error',
          message,
        };
      } else {
        return {
          namespace: this.Namespace,
          service: 'cdb',
          status: 'success',
          message: 'Successfully queried the CDB service.',
          title: 'Success',
        };
      }
    })
      .catch(error => {
        let message = 'CDB service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (!!_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (!!_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (!!_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += 'Cannot connect to CDB service.';
        }
        return {
          service: 'CDB',
          status: 'error',
          message: message,
        };
      });
  }

  // request function for tencent cloud monitor
  doRequest(options, service, signObj: any = {}): any {
    const signParams = {
      secretId: this.secretId,
      secretKey: this.secretKey,
      payload: options.data || '',
      ...signObj,
      ...(_.pick(this.getServiceInfo(signObj.region || '', service), ['service', 'host', 'version']) || {}),
    };
    // get signature
    const sign = new Sign(signParams);
    options.headers = Object.assign(options.headers || {}, { ...sign.getHeader() });
    options.method = 'POST';
    return this.backendSrv
      .datasourceRequest(options)
      .then(response => {
        return _.get(response, 'data.Response', {});
      })
      .catch(error => {
        throw error;
      });
  }
}

