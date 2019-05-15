import * as _ from 'lodash';
import { SERVICES } from '../tc_monitor';

// the services of tencentcloud monitor api


const FINACE_REGIONS = ['ap-shanghai-fsi', 'ap-shenzhen-fsi'];

const SERVICES_API_INFO = {
   // cvm api info
   cvm: {
    service: 'cvm',
    version: '2017-03-12',
    path: '/cvm',
    host: 'cvm.tencentcloudapi.com',
  },
  // cdb api info
  cdb: {
    service: 'cdb',
    version: '2017-03-20',
    path: '/cdb',
    host: 'cdb.tencentcloudapi.com',
  },
  // monitor api info
  monitor: {
    service: 'monitor',
    version: '2018-07-24',
    path: '/monitor',
    host: 'monitor.tencentcloudapi.com',
  }
};

const FINACE_HOST = {
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
  cdb: {
    'ap-shanghai-fsi': {
      path: '/fsi/cdb/shanghai',
      host: 'cdb.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/cdb/shenzhen',
      host: 'cdb.ap-shenzhen-fsi.tencentcloudapi.com',
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





const cvmInvalidMetrics = ['DcCPUUsage', 'DcMemUsage'];

const cvmInstanceAliasList = ['InstanceId', 'InstanceName', 'PrivateIpAddresses', 'PublicIpAddresses'];

const cdbInstanceAliasList = ['InstanceId', 'InstanceName', 'Vip'];

function GetServiceFromNamespace(namespace) {
  return _.get(_.find(SERVICES, service => service.namespace === namespace), 'service');
}

// parse template variable query params
function ParseMetricQuery(query = '') {
  if (!query) {
    return {};
  }
  const result = {};
  const queries = _.split(query, '&');
  _.forEach(queries, item => {
    const str = _.split(item, '=');
    if (_.trim(_.get(str, '0', ''))) {
      result[_.toLower(_.trim(_.get(str, '0', '')))] = _.trim(_.get(str, '1', ''));
    }
  });
  return result;
}

function parseVariableFormat(varname: string) {
  varname = String(varname || '');
  // $varname
  let varFlag = false;
  const regResult1 = varname.match(/^\${?(\w+)}?/);
  if (!!regResult1) {
    varFlag = true;
    varname = `\$\{${regResult1[1]}\:json\}`;
  }
  // [[varname]]
  const regResult2 = varname.match(/^\[\[(\w+)(\:\w+)?\]\]/);
  if (!!regResult2) {
    varFlag = true;
    varname = `\$\{${regResult2[1]}\:json\}`;
  }
  return { varname, varFlag };
}

// get the actual value of template variable
function replaceVariable(templateSrv, scopedVars, field, multiple = false) {
  const { varname, varFlag } = parseVariableFormat(field);
  let replaceVar = templateSrv.replace(varname, scopedVars);
  if (varFlag) {
    replaceVar = JSON.parse(replaceVar);
  }
  if (!multiple && _.isArray(replaceVar))  {
    replaceVar = _.get(replaceVar, '0', '');
  }
  return replaceVar;
}

// get dimensions for instance query param
function getDimensions(obj) {
  if (_.isEmpty(obj)) {
    return [];
  }
  const dimensions: any[] = [];
  _.forEach(obj, item => {
    if (item.Value) {
      dimensions.push({ Name: item.Name, Value: typeof item.Value === 'string' ? item.Value : `${item.Value}` });
    }
  });
  return dimensions;
}

// parse tencent cloud monitor response data to grafana panel data
function parseDataPoint(type = 'graph', dataPoint) {
  const timestamps = _.get(dataPoint, 'Timestamps', []);
  const values = _.get(dataPoint, 'Values', []);
  const result = timestamps.map((timestamp, index) => {
    return [values[index], timestamp * 1000];
  });

  return result;
}

// check whether instance is match or not
function isInstanceMatch(instance, dimensions) {
  let match = true;
  for (let i = 0; i < dimensions.length; i++) {
    if (_.get(instance, dimensions[i].Name) !== dimensions[i].Value) {
      match = false;
      break;
    }
  }
  return match;
}

// parse query data result for panel
function parseQueryResult(responses, instances) {
  const instanceList = instances;
  const result: any[] = [];
  _.forEach(responses, (response) => {
    const dataPoints = _.get(response, 'DataPoints', []);
    if (dataPoints.length === 1) {
      result.push({
        target: response.MetricName,
        datapoints: parseDataPoint('graph', dataPoints[0]),
      });
    } else if (dataPoints.length > 1) {
      _.forEach(dataPoints, (dataPoint) => {
        let instanceAliasValue = _.get(dataPoint, 'Dimensions[0].Value');
        for (let i = 0; i < instanceList.length; i++) {
          if (isInstanceMatch(instanceList[i], _.get(dataPoint, 'Dimensions', []))) {
            instanceAliasValue = instanceList[i]._InstanceAliasValue;
            instanceList.splice(i, 1);
            break;
          }
        }
        result.push({
          target: `${response.MetricName} - ${instanceAliasValue}`,
          datapoints: parseDataPoint('graph', dataPoint),
        });
      });
    }
  });
  return result;
}

export {
  SERVICES_API_INFO,
  FINACE_HOST,
  cvmInvalidMetrics,
  FINACE_REGIONS,
  cvmInstanceAliasList,
  cdbInstanceAliasList,
  GetServiceFromNamespace,
  ParseMetricQuery,
  parseVariableFormat,
  replaceVariable,
  getDimensions,
  parseQueryResult
};

