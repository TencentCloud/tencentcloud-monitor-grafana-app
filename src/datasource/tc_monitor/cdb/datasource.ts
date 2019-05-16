import * as _ from 'lodash';
import * as moment from 'moment';
import DatasourceInterface from '../../datasource';
import { CDBInstanceAliasList } from './query_def';
import { GetRequestParams, GetServiceAPIInfo, ReplaceVariable, GetDimensions, ParseQueryResult, VARIABLE_ALIAS } from '../../common/constants';


export default class CDBDatasource implements DatasourceInterface {
  Namespace = 'QCE/CDB';
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
    this.instanceSettings = instanceSettings;
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
    const region = this.getVariable(query['region']);
    if (instancesQuery && region) {
      return this.getInstances(region).then(result => {
        const instanceAlias = CDBInstanceAliasList.indexOf(query[VARIABLE_ALIAS]) !== -1 ? query[VARIABLE_ALIAS] : 'InstanceId';
        const instances: any[] = [];
        _.forEach(result, (item) => {
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
      });
    }
    return [];
  }

  // query data for panel
  query(options: any) {
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
      if (_.isArray(instances)) {
        instances = _.map(instances, instance => _.isString(instance) ? JSON.parse(instance) : instance);
      } else {
        instances = [_.isString(instances) ? JSON.parse(instances) : instances];
      }
      const region = ReplaceVariable(this.templateSrv, options.scropedVars, target.cdb.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.cdb.period || 300,
        Instances: _.map(instances, instance => {
          const dimensionObject = target.cdb.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          return { Dimensions: GetDimensions(dimensionObject) };
        }),
        Namespace: target.namespace,
        MetricName: target.cdb.metricName,
      };
      return this.getMonitorData(data, region, instances);
    });

    if (queries.length === 0) {
      return { data: [] };
    }

    return Promise.all(queries)
      .then(responses => {
        return _.flatten(responses);
      })
      .catch(error => {
        return { data: [] };
      });
  }

  // get the actual value of template variable
  getVariable(metric: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  // query monitor data
  getMonitorData(params, region, instances) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { action: 'GetMonitorData', region })
      .then(response => {
        return ParseQueryResult(response, instances);
      });
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
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: {
        Namespace: this.Namespace,
      },
    }, serviceInfo.service, { region, action: 'DescribeBaseMetrics' })
      .then(response => {
        return _.filter(response.MetricSet || [], item => !(item.Namespace !== this.Namespace || !item.MetricName));
      });
  }

  // get zone list by region
  getZones(region) {
    const serviceInfo = GetServiceAPIInfo(region, 'cvm');
    return this.doRequest({
      url: this.url + serviceInfo.path,
    }, serviceInfo.service, { region, action: 'DescribeZones' })
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
    const serviceInfo = GetServiceAPIInfo(region, 'cdb');
    return this.doRequest({
      url: this.url + serviceInfo.path,
      data: params,
    }, serviceInfo.service, { region, action: 'DescribeDBInstances' })
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
    options = GetRequestParams(options, service, signObj, this.secretId, this.secretKey);
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

