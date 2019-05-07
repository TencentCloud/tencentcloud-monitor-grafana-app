import _ from 'lodash';

const services = [
  { service: 'cvm', label: 'CVM', namespace: 'QCE/CVM', href: 'https://cloud.tencent.com/document/api/213/15688' },
  { service: 'cdb', label: 'CDB', namespace: 'QCE/CDB', href: 'https://cloud.tencent.com/document/api/236/15829' },
];

const finaceRegions = ['ap-shanghai-fsi', 'ap-shenzhen-fsi'];

const cvmInvalidMetrics = ['DcCPUUsage', 'DcMemUsage'];

const cvmInstanceAliasList = ['InstanceId', 'InstanceName', 'PrivateIpAddresses', 'PublicIpAddresses'];

const cdbInstanceAliasList = ['InstanceId', 'InstanceName', 'Vip']

function getServiceFromNamespace(namespace) {
  return _.get(_.find(services, service => service.namespace === namespace), 'service');
}

function parseMetricQuery(query = '') {
  if (!query) {
    return {};
  }
  let result = {};
  const queries = _.split(query, '&');
  _.forEach(queries, item => {
    const str = _.split(item, '=');
    if (_.trim(_.get(str, '0', ''))) {
      result[_.toLower(_.trim(_.get(str, '0', '')))] = _.trim(_.get(str, '1', ''))
    }
  });
  return result;
}

function parseVariableFormat(varname = '') {
  // $varname
  let varFlag = false;
  const  regResult1= varname.match(/^\${?(\w+)}?/);
  if (!!regResult1) {
    varFlag = true;
    varname = `\$\{${regResult1[1]}\:json\}`;
  }
  // [[varname]]
  const regResult2 = varname.match(/^\[\[(\w+)(\:\w+)?\]\]/);
  if (!!regResult2) {
    varFlag = true;
    varname = `\$\{${regResult2[1]}\:json\}`
  }
  return { varname, varFlag };
}

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

function parseQueryResult(responses, instances) {
  const instanceList = instances;
  let result: any[] = [];
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


function parseDataPoint(type = 'graph', dataPoint) {
  const timestamps = _.get(dataPoint, 'Timestamps', []);
  const values = _.get(dataPoint, 'Values', []);
  const result = timestamps.map((timestamp, index) => {
    return [values[index], timestamp * 1000];
  });

  return result;
}

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



export {
  cvmInvalidMetrics,
  services,
  finaceRegions,
  cvmInstanceAliasList,
  cdbInstanceAliasList,
  getServiceFromNamespace,
  parseMetricQuery,
  parseVariableFormat,
  replaceVariable,
  getDimensions,
  parseQueryResult
};

