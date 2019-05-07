import _ from 'lodash';
import moment from 'moment';
import { Sign } from '../utils/sign';
import { replaceVariable, cvmInvalidMetrics, cvmInstanceAliasList, finaceRegions, getDimensions, parseQueryResult } from '../utils/constants';

export default class TCMonitorCVMDatasource {
  Namespace = 'QCE/CVM';
  servicesMap = {
    // CVM API
    cvm: {
      service: 'cvm',
      version: '2017-03-12',
      path: '/cvm',
      host: 'cvm.tencentcloudapi.com',
    },
    // Monitor API
    monitor: {
      service: 'monitor',
      version: '2018-07-24',
      path: '/monitor',
      host: 'monitor.tencentcloudapi.com',
    },
  };
  // finace path and host
  finacePathHost = {
    cvm: {
      'ap-shanghai-fsi': {
        path: '/fsi/cvm/shanghai',
        host: 'cvm.ap-shanghai-fsi.tencentcloudapi.com',
      },
      'ap-shenzhen-fsi': {
        path: '/fsi/cvm/shenzhen',
        host: 'cvm.ap-shenzhen-fsi.tencentcloudapi.com',
      }
    },
    monitor: {
      'ap-shanghai-fsi': {
        path: '/fsi/monitor/shanghai',
        host: 'monitor.ap-shanghai-fsi.tencentcloudapi.com',
      },
      'ap-shenzhen-fsi': {
        path: '/fsi/monitor/shenzhen',
        host: 'monitor.ap-shenzhen-fsi.tencentcloudapi.com',
      }
    }
  };
  url: string;
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

  metricFindQuery(query: object) {
    const regionQuery = query['action'].match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    const instancesQuery = query['action'].match(/^DescribeInstances/i) && !!query['region'];
    if (instancesQuery && this.toVariable(query['region'])) {
      return this.getInstances(this.toVariable(query['region'])).then(result => {
        const instanceAlias = cvmInstanceAliasList.indexOf(query['instancealias']) !== -1 ? query['instancealias'] : 'InstanceId';
        let instances: any[] = [];
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
  }

  getServiceInfo(region, service) {
    return Object.assign({}, this.servicesMap[service] || {}, this.getHostAndPath(region, service));
  }

  getHostAndPath(region, service) {
    if (_.indexOf(finaceRegions, region) === -1) {
      return {};
    }
    return _.find( _.find(this.finacePathHost, (__, key) => key === service), (__, key) => key === region) || {};
  }

  query(options) {
    let allInstances: any[] = [];
    const queries = _.filter(options.targets, item => {
      return (
        item.cvm.hide !== true &&
        !!item.namespace &&
        !!item.cvm.metricName &&
        !_.isEmpty(replaceVariable(this.templateSrv, options.scropedVars, item.cvm.region, false)) &&
        !_.isEmpty(replaceVariable(this.templateSrv, options.scropedVars, item.cvm.instance, true))
      );
    }).map(target => {
      let instances = replaceVariable(this.templateSrv, options.scropedVars, target.cvm.instance, true);
      const Instances: any[] = [];
      if (_.isArray(instances)) {
        _.forEach(instances, instance => {
          instance = _.isString(instance) ? JSON.parse(instance) : instance;
          allInstances.push(instance);
          const dimensionObject = target.cvm.dimensionObject;
          _.forEach(dimensionObject, (__, key) => {
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });
          Instances.push({ Dimensions: getDimensions(dimensionObject) });
        });
      } else {
        instances = _.isString(instances) ? JSON.parse(instances) : instances;
        allInstances.push(instances);
        const dimensionObject = target.cvm.dimensionObject;
        _.forEach(dimensionObject, (__, key) => {
          dimensionObject[key] = { Name: key, Value: instances[key] };
        });
        Instances.push({ Dimensions: getDimensions(dimensionObject) });
      }
      const region = replaceVariable(this.templateSrv, options.scropedVars, target.cvm.region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target.cvm.period || 300,
        Instances,
        Namespace: target.namespace,
        MetricName: target.cvm.metricName,
      };
      return this.getMonitorData(data, region);
    });

    if (queries.length === 0) {
      return { data: [] };
    }

    return Promise.all(queries)
      .then(responses => {
        return parseQueryResult(responses, allInstances);
      })
      .catch(error => {
        return { data: [] };
      });
  }

  toVariable(metric: string) {
    return this.templateSrv.replace((metric || '').trim());
  }

  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  getMonitorData(params, region) {
    const serviceMap = this.getServiceInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: params,
    }, serviceMap.service, { action: 'GetMonitorData', region });
  }

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

  getMetrics(region = 'ap-guangzhou') {
    const serviceMap = this.getServiceInfo(region, 'monitor');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: {
        Namespace: this.Namespace,
      },
    }, serviceMap.service, { region, action: 'DescribeBaseMetrics' })
      .then(response => {
        return _.filter(_.filter(response.MetricSet || [], item => !(item.Namespace !== this.Namespace || !item.MetricName)), item => _.indexOf(cvmInvalidMetrics, item.MetricName) == -1);
      });
  }

  getInstances(region, params = { }) {
    params = Object.assign({ Offset: 0, Limit: 100 }, params);
    const serviceMap = this.getServiceInfo(region, 'cvm');
    return this.doRequest({
      url: this.url + serviceMap.path,
      data: params,
    }, serviceMap.service, { region, action: 'DescribeInstances' })
      .then(response => {
        return response.InstanceSet || [];
      });
  }

  getZones(region) {
    const serviceMap = this.getServiceInfo(region, 'cvm');
    return this.doRequest({
      url: this.url + serviceMap.path,
    }, serviceMap.service, { region, action: 'DescribeZones' })
      .then(response => {
        return _.filter(
          _.map(response.ZoneSet || [], item => {
            return { text: item.ZoneName, value: item.Zone, ZoneState: item.ZoneState, Zone: item.Zone };
          }),
          item => item.ZoneState === 'AVAILABLE'
        );
      });
  }

  testDatasource() {
    if (!this.isValidConfigField(this.secretId)) {
      return {
        service: 'cvm',
        status: 'error',
        message: 'The SecretId field is required.',
      };
    }

    if (!this.isValidConfigField(this.secretKey)) {
      return {
        service: 'cvm',
        status: 'error',
        message: 'The SecretKey field is required.',
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
    ])
      .then(responses => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        if (cvmAuthFail || monitorAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(`${_.get(cvmErr, 'Code')}: ${_.get(cvmErr, 'Message')}`);
          }
          if (monitorAuthFail) {
            messages.push(`${_.get(monitorErr, 'Code')}: ${_.get(monitorErr, 'Message')}`);
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: 'cvm',
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.Namespace,
            service: 'cvm',
            status: 'success',
            message: 'Successfully queried the CVM service.',
            title: 'Success',
          };
        }
      })
      .catch(error => {
        let message = 'CVM service:';
        message += error.statusText ? error.statusText + '; ' : '';
        if (error.data && error.data.error && error.data.error.code) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (error.data && error.data.error) {
          message += error.data.error;
        } else if (error.data) {
          message += error.data;
        } else {
          message += 'Cannot connect to CVM service.';
        }
        return {
          service: 'cvm',
          status: 'error',
          message: message,
        };
      });
  }

  doRequest(options, service, signObj: any = {}): any {
    const signParams = {
      secretId: this.secretId,
      secretKey: this.secretKey,
      payload: options.data || '',
      ...signObj,
      ...(_.pick(this.getServiceInfo(signObj.region || '', service), ['service', 'host', 'version']) || {}),
    };
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
