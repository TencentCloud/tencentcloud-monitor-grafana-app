import _ from 'lodash';
import qs from 'qs';
import { SERVICES } from '../tc_monitor';
import Sign from './sign';
import SignV2 from './signV2';

// the services of tencentcloud monitor api
const FINACE_REGIONS = ['ap-shanghai-fsi', 'ap-shenzhen-fsi'];
const SERVICES_API_INFO = {
  // monitor api info
  monitor: {
    service: 'monitor',
    version: '2018-07-24',
    path: '/monitor',
    host: 'monitor.tencentcloudapi.com',
  },
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
  // pcx api info
  pcx: {
    service: 'pcx',
    version: '',
    path: '/pcx',
    host: 'vpc.api.qcloud.com',
  },
  // vpc api info
  vpc: {
    service: 'vpc',
    version: '2017-03-12',
    path: '/vpc',
    host: 'vpc.tencentcloudapi.com',
  },
  // mongodb api info
  mongodb: {
    service: 'mongodb',
    version: '2019-07-25',
    path: '/mongodb',
    host: 'mongodb.tencentcloudapi.com',
  },
  // 负载均衡 clb
  clb: {
    service: 'clb',
    version: '2018-03-17',
    path: '/clb',
    host: 'clb.tencentcloudapi.com',
  },
  // postgresql api info
  postgres: {
    service: 'postgres',
    version: '2017-03-12',
    path: '/postgres',
    host: 'postgres.tencentcloudapi.com',
  },
  // cdn info
  cdn: {
    service: 'cdn',
    version: '2018-06-06',
    path: '/cdn',
    host: 'cdn.tencentcloudapi.com',
  },
  // redis info
  redis: {
    service: 'redis',
    version: '2018-04-12',
    path: '/redis',
    host: 'redis.tencentcloudapi.com',
  },
  scf: {
    service: 'scf',
    version: '2018-04-16',
    path: '/scf',
    host: 'scf.tencentcloudapi.com',
  },
  cfs: {
    service: 'cfs',
    version: '2019-07-19',
    path: '/cfs',
    host: 'cfs.tencentcloudapi.com',
  },
  ckafka: {
    service: 'ckafka',
    version: '2019-08-19',
    path: '/ckafka',
    host: 'ckafka.tencentcloudapi.com',
  },
  // 专线接入实例列表
  dc: {
    service: 'dc',
    version: '2018-04-10',
    path: '/dc',
    host: 'dc.tencentcloudapi.com',
  },
  // cynosdb实例列表
  cynosdb: {
    service: 'cynosdb',
    version: '2019-01-07',
    path: '/cynosdb',
    host: 'cynosdb.tencentcloudapi.com',
  },
  // sqlserver实例列表
  sqlserver: {
    service: 'sqlserver',
    version: '2018-03-28',
    path: '/sqlserver',
    host: 'sqlserver.tencentcloudapi.com',
  },
  // bm实例列表
  bm: {
    service: 'bm',
    version: '2018-04-23',
    path: '/bm',
    host: 'bm.tencentcloudapi.com',
  },
  bmeip: {
    service: 'bmeip',
    version: '2018-06-25',
    path: '/bmeip',
    host: 'bmeip.tencentcloudapi.com',
  },
  bmvpc: {
    service: 'bmvpc',
    version: '2018-06-25',
    path: '/bmvpc',
    host: 'bmvpc.tencentcloudapi.com',
  },
  bmlb: {
    service: 'bmlb',
    version: '2018-06-25',
    path: '/bmlb',
    host: 'bmlb.tencentcloudapi.com',
  },
  // ES集群实例
  es: {
    service: 'es',
    version: '2018-04-16',
    path: '/es',
    host: 'es.tencentcloudapi.com',
  },
  // MapReduce
  emr: {
    service: 'emr',
    version: '2019-01-03',
    path: '/emr',
    host: 'emr.tencentcloudapi.com',
  },
  // CMQ消息队列
  cmq: {
    service: 'cmq',
    version: '2019-03-04',
    path: '/cmq',
    host: 'cmq.tencentcloudapi.com',
  },
  cbs: {
    service: 'cbs',
    version: '2017-03-12',
    path: '/cbs',
    host: 'cbs.tencentcloudapi.com',
  },
  // tcaplus实例
  tcaplusdb: {
    service: 'tcaplusdb',
    version: '2019-08-23',
    path: '/tcaplusdb',
    host: 'tcaplusdb.tencentcloudapi.com',
  },
  // tcaplus实例
  dcdb: {
    service: 'dcdb',
    version: '2018-04-11',
    path: '/dcdb',
    host: 'dcdb.tencentcloudapi.com',
  },
  // apigateway实例
  apigateway: {
    service: 'apigateway',
    version: '2018-08-08',
    path: '/apigateway',
    host: 'apigateway.tencentcloudapi.com',
  },
  // apigateway实例
  tdmq: {
    service: 'tdmq',
    version: '2020-02-17',
    path: '/tdmq',
    host: 'tdmq.tencentcloudapi.com',
  },
  // 不单独定义lb，因为lb同样用的是vpc的配置，同上
  // lb: {
  //   service: 'lb',
  //   version: '2017-03-12',
  //   path: '/lb',
  //   host: 'vpc.tencentcloudapi.com'
  // }
  // 负载均衡四层协议 lbPrivate
  // lbPrivate: {
  //   service: 'lbPrivate',
  //   version: '2018-03-17',
  //   path: '/clb',
  //   host: 'clb.tencentcloudapi.com',
  // },
};

const FINACE_HOST = {
  scf: {
    'ap-shanghai-fsi': {
      path: '/fsi/scf/shanghai',
      host: 'scf.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/scf/shenzhen',
      host: 'scf.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  cfs: {
    'ap-shanghai-fsi': {
      path: '/fsi/cfs/shanghai',
      host: 'cfs.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/cfs/shenzhen',
      host: 'cfs.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  ckafka: {
    'ap-shanghai-fsi': {
      path: '/fsi/ckafka/shanghai',
      host: 'ckafka.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/ckafka/shenzhen',
      host: 'ckafka.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  clb: {
    'ap-shanghai-fsi': {
      path: '/fsi/clb/shanghai',
      host: 'clb.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/clb/shenzhen',
      host: 'clb.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  mongodb: {
    'ap-shanghai-fsi': {
      path: '/fsi/mongodb/shanghai',
      host: 'mongodb.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/mongodb/shenzhen',
      host: 'mongodb.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  vpc: {
    'ap-shanghai-fsi': {
      path: '/fsi/vpc/shanghai',
      host: 'vpc.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/vpc/shenzhen',
      host: 'vpc.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  cvm: {
    'ap-shanghai-fsi': {
      path: '/fsi/cvm/shanghai',
      host: 'cvm.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/cvm/shenzhen',
      host: 'cvm.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  cdb: {
    'ap-shanghai-fsi': {
      path: '/fsi/cdb/shanghai',
      host: 'cdb.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/cdb/shenzhen',
      host: 'cdb.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  monitor: {
    'ap-shanghai-fsi': {
      path: '/fsi/monitor/shanghai',
      host: 'monitor.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/monitor/shenzhen',
      host: 'monitor.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  postgres: {
    'ap-shanghai-fsi': {
      path: '/fsi/postgres/shanghai',
      host: 'postgres.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/postgres/shenzhen',
      host: 'postgres.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  emr: {
    'ap-shanghai-fsi': {
      path: '/fsi/emr/shanghai',
      host: 'emr.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/emr/shenzhen',
      host: 'emr.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
  cmq: {
    'ap-shanghai-fsi': {
      path: '/fsi/cmq/shanghai',
      host: 'cmq.ap-shanghai-fsi.tencentcloudapi.com',
    },
    'ap-shenzhen-fsi': {
      path: '/fsi/cmq/shenzhen',
      host: 'cmq.ap-shenzhen-fsi.tencentcloudapi.com',
    },
  },
};

// 获取对应业务的 API 接口信息
export function GetServiceAPIInfo(region, service) {
  return { ...(SERVICES_API_INFO[service] || {}), ...getHostAndPath(region, service) };
}

// get host and path for finance regions
function getHostAndPath(region, service) {
  if (_.indexOf(FINACE_REGIONS, region) === -1) {
    return {};
  }
  return (
    _.find(
      _.find(FINACE_HOST, (__, key) => key === service),
      (__, key) => key === region
    ) || {}
  );
}

// 变量替换指定实例按照那个字段展示
export const VARIABLE_ALIAS = 'instancealias';

export function GetServiceFromNamespace(namespace) {
  return _.get(
    _.find(SERVICES, (service) => service.namespace === namespace),
    'service'
  );
}

// parse template variable query params
export function ParseMetricQuery(query = '') {
  if (!query) {
    return {};
  }
  const result = {};
  const queries = _.split(query, '&');
  _.forEach(queries, (item) => {
    const str = _.split(item, '=');
    if (_.trim(_.get(str, '0', ''))) {
      result[_.toLower(_.trim(_.get(str, '0', '')))] = _.trim(_.get(str, '1', ''));
    }
  });
  return result;
}

// parse template variable regex params
export function ParseMetricRegex(regex = '') {
  if (!regex) {
    return [];
  }
  regex = regex.replace(/：/g, ':');
  regex = regex.replace(/，/g, ',');
  const regexParams = ParseMetricQuery(regex);
  const result: any[] = [];
  _.forEach(regexParams, (value, key) => {
    if (key === 'tag:tag-key') {
      const valuesArr = _.split(value, ',');
      _.forEach(valuesArr, (item) => {
        const temp = _.split(item, ':');
        if (temp.length === 2) {
          result.push({ Name: `tag:${temp[0]}`, Values: temp.slice(1) });
        }
      });
    } else {
      result.push({ Name: key, Values: _.split(value, ',') });
    }
  });
  return result;
}

// get the actual value of template variable
function parseVariableFormat(varname: string) {
  varname = String(varname || '');
  // $varname
  let varFlag = false;
  const regResult1 = varname.match(/^\${?(\w+)}?/);
  if (regResult1) {
    varFlag = true;
    varname = `\$\{${regResult1[1]}\:json\}`;
  }
  // [[varname]]
  const regResult2 = varname.match(/^\[\[(\w+)(\:\w+)?\]\]/);
  if (regResult2) {
    varFlag = true;
    varname = `\$\{${regResult2[1]}\:json\}`;
  }
  return { varname, varFlag };
}

export function ReplaceVariable(templateSrv, scopedVars, field, multiple = false) {
  const { varname, varFlag } = parseVariableFormat(field);
  let replaceVar = templateSrv.replace(varname, scopedVars);
  if (varFlag) {
    try {
      replaceVar = JSON.parse(replaceVar);
    } catch (error) {}
  }
  if (!multiple && _.isArray(replaceVar)) {
    replaceVar = _.get(replaceVar, '0', '');
  }
  return replaceVar;
}

// get dimensions for instance query param
export function GetDimensions(obj) {
  if (_.isEmpty(obj)) {
    return [];
  }
  const dimensions: any[] = [];
  _.forEach(obj, (item) => {
    if (item.Value !== null && item.Value !== undefined && item.Value !== '') {
      dimensions.push({ Name: item.Name, Value: typeof item.Value === 'string' ? item.Value : `${item.Value}` });
    }
  });
  return dimensions;
}

// parse query data result for panel
export function ParseQueryResult(response, instances: any[] = []) {
  const instanceList = _.cloneDeep(instances);
  // console.log('parseQueryResult:', response, instances);
  const dataPoints = _.get(response, 'DataPoints', []);
  return _.map(dataPoints, (dataPoint) => {
    let instanceAliasValue = _.get(dataPoint, 'Dimensions[0].Value');
    for (let i = 0; i < instanceList.length; i++) {
      if (isInstanceMatch(instanceList[i], _.get(dataPoint, 'Dimensions', []))) {
        instanceAliasValue = instanceList[i]._InstanceAliasValue;
        // console.log(1123344, instanceAliasValue);
        instanceList.splice(i, 1);
        break;
      }
    }
    return {
      target: `${response.MetricName} - ${instanceAliasValue}`,
      datapoints: parseDataPoint(dataPoint),
    };
  });
}

// parse tencent cloud monitor response data to grafana panel data
function parseDataPoint(dataPoint) {
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
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < dimensions.length; i++) {
    if (_.get(instance, dimensions[i].Name).toString() !== dimensions[i].Value.toString()) {
      match = false;
      break;
    }
  }
  return match;
}

/**
 * 检查某个变量是否模板变量，即是否匹配 ${varnam} 或 [[varname]]
 *
 * @param field 变量字段名
 */
export function isVariable(value) {
  if (value && (value.match(/^\${?(\w+)}?/) || value.match(/^\[\[(\w+)(\:\w+)?\]\]/))) {
    return true;
  }
  return false;
}

/**
 * 腾讯云 API 3.0 接口协议
 * @param options 接口请求对象 { url: string, data?: object }
 * @param service 产品名字 'cvm'
 * @param signObj 接口请求相关信息 { region?: string, action: string }
 * @param secretId
 * @param secretKey
 */
export function GetRequestParams(options, service, signObj: any = {}, secretId, secretKey) {
  const signParams = {
    secretId,
    secretKey,
    payload: options.data || '',
    ...signObj,
    ...(_.pick(GetServiceAPIInfo(signObj.region || '', service), ['service', 'host', 'version']) || {}),
  };
  const sign = new Sign(signParams);
  options.headers = Object.assign(options.headers || {}, { ...sign.getHeader() });
  options.method = 'POST';
  return options;
}

/**
 *  腾讯云 API 2.0 接口协议
 * @param options 接口请求对象 { url: string, data?: object }
 * @param service 产品名字 'cvm'
 * @param signObj 接口请求相关信息 { region?: string, action: string }
 * @param secretId
 * @param secretKey
 */
export function GetRequestParamsV2(options: any = {}, service, signObj: any = {}, secretId, secretKey) {
  const data = options.data || {};
  const signParams = {
    secretId,
    secretKey,
    data,
    ...signObj,
    ...(_.pick(GetServiceAPIInfo(signObj.region || '', service), ['host']) || {}),
  };
  options.method = 'POST';
  const sign = new SignV2(signParams);
  options.headers = Object.assign(options.headers || {}, { 'Content-Type': 'application/x-www-form-urlencoded' });
  const { queryString, path } = sign.generateQueryString();
  options.data = qs.stringify({ ...options.data, ...queryString });
  options.url += path;
  return options;
}

export function SliceLength(total = 0, len = 1) {
  const result: any[] = [];
  const num = Math.ceil(total / len);
  for (let i = 1; i < num; i++) {
    result.push({ Offset: len * i });
  }
  return result;
}

export const FilterKeys = ['Namespace', 'Offset', 'Limit', 'SearchKey', 'Description', 'OrderBy', 'Order'];
