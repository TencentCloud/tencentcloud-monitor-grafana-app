import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../MonitorDatasource';
import {
  GetRequestParams,
  GetServiceAPIInfo,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  SliceLength,
} from '../../common/constants';
import instanceStorage from '../../common/datasourceStorage';
import { MetricQuery } from './types';
import { getNamesapceFromService } from '../../common/utils';

export interface TemplateQueryIdType {
  instance: string;
  listener?: string;
}

interface queryConfigType {
  dim_KeyInStorage: string;
  dim_KeyInTarget?: string;
  dim_KeyInIns?: string;
  dim_KeyInMap: string;
}

export abstract class BaseDatasource implements DatasourceInterface {
  Namespace?: string;
  service: string;
  instanceListCache: any[] = [];
  extraMetricDims: string[] = [];
  url: string;
  instanceSettings: any;
  backendSrv: any;
  templateSrv: any;
  secretId: string;
  checkKeys: string[] = [];
  MetricReqConfig: {
    resultFilter?: Function;
  } = {};
  extrasAlias?: string[] = [];
  /*
  一个配置：(用于处理除了InstanceId之外的)(Record中的key是指标修正之后的维度，即通过InvalidDemsion处理后)
  1 dim_KeyInStorage 指标中维度dimension对应的storage中的key，获取缓存列表，sourceMapList、
  2 dim_KeyInTarget 通过getVariable方法获取变量中选中项。比如ListnerId为Lis-xxxx；即：STATE中的key。为空则取即通过InvalidDemsion处理后的key
  3 dim_KeyInMap 保存在模板变量value比如（监听器ID）源自sourceMapList（接口返回内容）的哪个key（ListenerId）。即：templateQueryIdMap中内容。联合上面2的内容筛选出原始sourceMap
  4 通过这个dim和sourceMap获取维度值。即sourceMap[dim]
  */
  queryMonitorExtraConfg: Record<string, queryConfigType> = {};
  CandiateDimensions?: Record<string, string> = {};

  InstanceReqConfig?: {
    service?: string;
    action: string;
    responseField: string;
    interceptor?: {
      request?: (params: unknown) => unknown;
      response?: (data: unknown) => unknown;
    };
  };

  InvalidDimensions?: Record<string, string>;

  abstract InstanceAliasList: string[];
  abstract templateQueryIdMap: TemplateQueryIdType; // 必须为标识

  /** @ngInject */
  constructor(instanceSettings, backendSrv, templateSrv) {
    this.instanceSettings = instanceSettings;
    this.backendSrv = backendSrv;
    this.templateSrv = templateSrv;
    this.url = instanceSettings.url;
    this.secretId = (instanceSettings.jsonData || {}).secretId || '';
  }

  get namespace() {
    // 需要注意的是this.service来自于原型上，在实例中导入时注入
    return this.Namespace || getNamesapceFromService(this.service);
  }

  // 获取额外要显示到图例里的内容
  getOtherAlias(instance: any, target: any): string {
    let result = '';
    const alias = instance._InstanceAliasValue;
    this.extrasAlias?.forEach((extra) => {
      const extraAlia = this.getVariable(target[extra]);
      if (extraAlia && alias.indexOf(extraAlia) === -1) {
        result += ` - ${extraAlia}`;
      }
    });
    return result;
  }

  /* 格式化模板变量上的显示 */
  getAliasValue(instance: Record<string, any>, alias: string) {
    const result = instance[alias];
    return Array.isArray(result) ? result.join() : result;
  }

  formatVarDisplay(instance: Record<string, any>, displayTpl: string | undefined, instanceAlias: string) {
    // 获取display=aaa${InstanceName}bbb${InstanceId}ccc
    if (displayTpl) {
      return displayTpl.replace(/\$\{(\w+)\}/g, (a, b) => {
        if (!b || !this.InstanceAliasList.includes(b)) {
          return '';
        }
        return this.getAliasValue(instance, b);
      });
    }
    return this.getAliasValue(instance, instanceAlias);
  }
  /**
   * @param query 模板变量配置填写的 Query 参数对象，由顶层将字符串转换为了对象
   */
  async metricFindQuery(query: MetricQuery, regex?: string) {
    const { action, namespace, display, payload = {} } = query;
    let { region, instancealias = this.templateQueryIdMap.instance } = query;
    if (!action || !namespace) {
      return [];
    }

    // 查询地域列表
    const regionQuery = action.match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    region = this.getVariable(region); // 将模板region转换为真实值

    // 查询实例列表
    if (region && action.match(/^DescribeInstances/i)) {
      const result = await this.getVariableInstances(region, payload);
      instancealias = this.InstanceAliasList.includes(instancealias) ? instancealias : this.templateQueryIdMap.instance;

      const res = result.flatMap((item) => {
        const insAlias = this.formatVarDisplay(item, display, instancealias);

        item._InstanceAliasValue = insAlias; // FIXME:
        // console.log(insAlias,item[this.templateQueryIdMap.instance]);

        if (!item[instancealias]) return [];
        return [
          {
            text: insAlias,
            value: item[this.templateQueryIdMap.instance],
          },
        ];
      });

      // 缓存全量实例列表
      await instanceStorage.setInstance(this.service, result);
      return res;
    }

    // 在instance实例的基础上查询其他数据
    let instance = this.getVariable(query['instance']);
    if (_.isArray(instance)) instance = instance[0]; // 有额外维度，仅支持实例单选情况
    if (region && action && instance) {
      try {
        // instance = JSON.parse(instance);
        const instanceCache = await instanceStorage.getInstance(this.service);
        // console.log({ instanceCache });

        instance = _.cloneDeep(instanceCache.find((item) => item[this.templateQueryIdMap.instance] === instance)) ?? {};
        // eslint-disable-next-line no-empty
      } catch (error) {}
      return this.fetchMetricData(action, region, instance, query);
    }

    return Promise.resolve([]);
  }
  // 获取指标数据
  async fetchMetricData(action: string, region: string, instance: any, query?: any) {
    return [];
  }

  /**
   * 根据 Panel 的配置项，获取相应的监控数据
   *
   * @param options Panel 的配置参数
   * @return 返回数据数组，示例如下
   * [
   *   {
   *     "target": "AccOuttraffic - ins-123",
   *     "datapoints": [
   *       [861, 1450754160000],
   *       [767, 1450754220000]
   *     ]
   *   }
   * ]
   */
  async dimensionsFormat(dimKeys, ins, dimensionObject, target, service, options) {
    for (let key of dimKeys) {
      let keyTmp = key;
      const invalidDim = this.InvalidDimensions || this.getInvalidDimensions(this, target[service]);
      if (invalidDim[key]) {
        // 从【维度中】的字段到【实例中】字段的映射。 { functionName: FunctionName }
        keyTmp = invalidDim[key];
        ins[key] = ins[keyTmp];
      }

      let extraDimValue = this.getVariable(target[service][keyTmp]);
      if (this.queryMonitorExtraConfg[keyTmp]) {
        const {
          dim_KeyInStorage,
          dim_KeyInTarget = keyTmp,
          dim_KeyInMap,
          dim_KeyInIns,
        } = this.queryMonitorExtraConfg[keyTmp];
        let extraIns = ReplaceVariable(this.templateSrv, options.scopedVars, target[service][dim_KeyInTarget], true);
        let extraSourceMap: any = {};
        try {
          extraSourceMap = JSON.parse(extraIns); // 兼容json字符串的 形式
        } catch (error) {
          if (_.isArray(extraIns)) extraIns = extraIns[0]; // 如果多个，取第一个。除了实例ID 暂不支持其他纬度多选
          const extraStorage = await instanceStorage.getExtraStorage(this.service, dim_KeyInStorage);
          // console.log({ extraStorage });
          extraSourceMap =
            extraStorage?.find((item) => {
              if (_.isArray(item[dim_KeyInMap])) {
                return item[dim_KeyInMap][0] === extraIns;
              }
              return item[dim_KeyInMap] === extraIns;
            }) ?? {};
        }
        const isStringOrNumber = _.isString(extraSourceMap) || _.isNumber(extraSourceMap);
        // 增加ins实例之外的alias，填入到ins._InstanceAliasValue
        const insAlias = ins._InstanceAliasValue;
        const otherAlias = isStringOrNumber ? extraSourceMap : extraSourceMap._InstanceAliasValue;
        if (otherAlias && insAlias.indexOf(otherAlias) === -1) {
          ins._InstanceAliasValue += ` - ${otherAlias}`;
        }

        extraDimValue = isStringOrNumber ? extraSourceMap : extraSourceMap?.[dim_KeyInIns || keyTmp];
      } else {
        ins._InstanceAliasValue += this.getOtherAlias(ins, target[service]);
      }
      // 设置instance，针对额外的维度，需要注意模板变量的值
      // ins[key] = ins[keyTmp] ?? extraDimValue;
      ins[key] = this.getDimensionsVal(ins, keyTmp, extraDimValue);
      // cynosdb产品接口返回维度和入参不一致
      if (this.checkKeys.length > 0) {
        this.checkKeys.forEach((Ekey) => {
          ins[Ekey] = ins[key];
        });
      }
      dimensionObject[key] = { Name: key, Value: ins[key] };
    }
    return dimensionObject;
  }
  getDimensionsVal(ins: Record<string, any>, key: string, extraDimValue: string) {
    let dimVal = ins[key];
    if (_.isEmpty(dimVal) && this.CandiateDimensions[key]) {
      dimVal = ins[this.CandiateDimensions[key]];
    }
    return dimVal ?? extraDimValue;
  }
  query(options: any) {
    const service = this.service!; // 强制声明非空
    // console.log('query');

    const queries = _.filter(options.targets, (item) => {
      // 过滤无效的查询 target
      return (
        item.hide !== true &&
        !!item.namespace &&
        !!item[service].metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item[service].region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item[service].instance, true))
      );
    }).map(async (target) => {
      // 实例 instances 可能为模板变量，需先获取实际值
      // 针对JSON字符串和id的形式，分开做处理
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target[service].instance, true);
      const instanceCache = await instanceStorage.getInstance(this.service);
      // console.log({ instanceCache });
      instances = [].concat(instances).map((inst) => {
        try {
          return JSON.parse(inst); // 兼容json字符串的 形式
        } catch (error) {
          return _.cloneDeep(instanceCache.find((item) => item[this.templateQueryIdMap.instance] === inst)) ?? {};
        }
      });
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target[service].region, false);
      const insInReq: any = [];
      for (let ins of instances) {
        const dimensionObject = target[service].dimensionObject;
        // 处理dimensions的值
        const dimKeys = Object.keys(dimensionObject);
        const dimResult = await this.dimensionsFormat(dimKeys, ins, dimensionObject, target, service, options);
        // console.log({dimResult})
        insInReq.push([{ Dimensions: GetDimensions(dimResult) }]);
      }
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target[service].period || 300,
        Instances: _.flatMap(insInReq),
        Namespace: target.namespace,
        MetricName: target[service].metricName,
      };
      return this.getMonitorData(data, region, instances);
    });

    if (queries.length === 0) {
      return [];
    }

    return Promise.all(queries)
      .then((responses) => {
        return _.flatten(responses);
      })
      .catch((error) => {
        return [];
      });
  }
  getInstanceReqConfig(selfIns: any) {
    return {} as any;
  }
  getInvalidDimensions(selfIns: any, target?: any) {
    return {} as any;
  }
  // 获取某个变量的实际值，this.templateSrv.replace() 函数返回实际值的字符串
  getVariable(metric?: string) {
    const rs = this.templateSrv.replace((metric || '').trim());
    const valStr = rs.match(/\{([\w-,]+)\}/);
    // 判断是否为多选
    if (valStr) {
      return valStr[1].split(',');
    }
    return rs;
  }

  /**
   * 获取 监控数据
   * @param params 获取监控数据的请求参数
   * @param region 地域信息
   * @param instances 实例列表，用于对返回结果的匹配解析
   */
  getMonitorData(params, region, instances) {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { action: 'GetMonitorData', region }
    ).then((response) => {
      return ParseQueryResult(response, instances);
      // return this.getOtherAlias(response,instances)
    });
  }

  getRegions(): any {
    return this.doRequest(
      {
        url: this.url + '/cvm',
      },
      'cvm',
      { action: 'DescribeRegions' }
    ).then((response) => {
      return _.filter(
        _.map(response.RegionSet || [], (item) => {
          return {
            text: item.RegionName,
            value: item.Region,
            RegionState: item.RegionState,
          };
        }),
        (item) => item.RegionState === 'AVAILABLE'
      );
    });
  }

  getMetrics(region = 'ap-guangzhou'): Promise<any> {
    const serviceInfo = GetServiceAPIInfo(region, 'monitor');
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: {
          Namespace: this.namespace,
        },
      },
      serviceInfo.service,
      { region, action: 'DescribeBaseMetrics' }
    ).then((response) => {
      const res = _.filter(
        _.filter(response.MetricSet || [], (item) => !(item.Namespace !== this.namespace || !item.MetricName))
      );
      const resFilterFn = this.MetricReqConfig.resultFilter;
      if (resFilterFn) {
        return res.map((item) => resFilterFn(item));
      }
      return res;
    });
  }

  getInstances(region, params = {}) {
    const {
      service = this.service,
      action,
      responseField: field,
      interceptor,
    } = this.InstanceReqConfig || this.getInstanceReqConfig(this);
    params = { Offset: 0, Limit: 100, ...params };
    const serviceInfo = GetServiceAPIInfo(region, service);
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: interceptor?.request ? interceptor.request(params) : params,
      },
      serviceInfo.service,
      { region, action }
    ).then((response) => {
      // 处理异常，则不按正常的情况处理，直接抛出错误
      if (response?.Error) {
        console.error(response.Error);
        return response;
      }

      let result;
      // 先，field处理
      if (field) {
        result = _.get(response, field) ?? _.get(response, `Result.${field}`) ?? [];
      }

      // 后，拦截器处理
      if (interceptor?.response) {
        result = interceptor.response(result);
      }
      return result;
    });
  }

  getVariableInstances(region, query = {}): Promise<any[]> {
    let result: any[] = [];
    const params = { ...query, ...{ Offset: 0, Limit: 100 } };

    const {
      service = this.service,
      action,
      responseField: field,
      interceptor,
    } = this.InstanceReqConfig || this.getInstanceReqConfig(this);

    const serviceInfo = GetServiceAPIInfo(region, service);
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: interceptor?.request ? interceptor.request(params) : params,
      },
      serviceInfo.service,
      { region, action }
    ).then((response) => {
      result = _.get(response, field) ?? _.get(response, `Result.${field}`) ?? [];
      const total = response.TotalCount ?? response.TotalCnt ?? _.get(response, `Result.TotalCount`) ?? 0;
      if (result.length >= total) {
        return result;
      } else {
        const param = SliceLength(total, 100);
        const promises: any[] = [];
        _.forEach(param, (item) => {
          promises.push(this.getInstances(region, { ...item, ...query }));
        });
        return Promise.all(promises)
          .then((responses) => {
            _.forEach(responses, (item) => {
              result = _.concat(result, item);
            });
            return result;
          })
          .catch((error) => {
            return result;
          });
      }
    });
  }

  // 检查某变量字段是否有值
  isValidConfigField(field: string) {
    return field && field.length > 0;
  }

  testDatasource() {
    // const { service = this.service, action } = this.InstanceReqConfig;
    // const serviceInfo = GetServiceAPIInfo('ap-guangzhou', service);

    if (!this.isValidConfigField(this.secretId)) {
      return {
        service: this.service,
        status: 'error',
        message: 'The SecretId/SecretKey field is required.',
      };
    }

    return Promise.all([
      this.getRegions(),
      this.getMetrics(),
      // this.doRequest(
      //   {
      //     url: this.url + serviceInfo.path,
      //     data: {
      //       Offset: 0,
      //       Limit: 1,
      //     },
      //   },
      //   service,
      //   { region: 'ap-guangzhou', action },
      // ),
      this.getInstances('ap-guangzhou', {
        Offset: 0,
        Limit: 1,
      }),
    ])
      .then((responses) => {
        const cvmErr = _.get(responses, '[0].Error', {});
        const monitorErr = _.get(responses, '[1].Error', {});
        const serviceErr = _.get(responses, '[2].Error', {});
        // const cvmAuthFail = _.get(cvmErr, 'Code', '').indexOf('AuthFailure') !== -1;
        // const monitorAuthFail = _.get(monitorErr, 'Code', '').indexOf('AuthFailure') !== -1;
        // const serviceAuthFail = _.get(serviceErr, 'Code', '').indexOf('AuthFailure') !== -1;
        const cvmAuthFail = _.get(cvmErr, 'Code', '');
        const monitorAuthFail = _.get(monitorErr, 'Code', '');
        const serviceAuthFail = _.get(serviceErr, 'Code', '');
        if (cvmAuthFail || monitorAuthFail || serviceAuthFail) {
          const messages: any[] = [];
          if (cvmAuthFail) {
            messages.push(_.get(cvmErr, 'Code'));
          }
          if (monitorAuthFail) {
            messages.push(_.get(monitorErr, 'Code'));
          }
          if (serviceAuthFail) {
            messages.push(_.get(serviceErr, 'Code'));
          }
          const message = _.join(_.compact(_.uniq(messages)), '; ');
          return {
            service: this.service,
            status: 'error',
            message,
          };
        } else {
          return {
            namespace: this.namespace,
            service: this.service,
            status: 'success',
            message: `Successfully queried the ${this.service} service.`,
            title: 'Success',
          };
        }
      })
      .catch((error) => {
        let message = `${this.service} service:`;
        message += error.statusText ? error.statusText + '; ' : '';
        if (_.get(error, 'data.error.code', '')) {
          message += error.data.error.code + '. ' + error.data.error.message;
        } else if (_.get(error, 'data.error', '')) {
          message += error.data.error;
        } else if (_.get(error, 'data', '')) {
          message += error.data;
        } else {
          message += `Cannot connect to ${this.service} service.`;
        }
        return {
          service: this.service,
          status: 'error',
          message: message,
        };
      });
  }

  async doRequest(options, service, signObj: any = {}) {
    options = await GetRequestParams(
      options,
      service,
      signObj,
      this.secretId,
      this.instanceSettings.id,
      this.backendSrv
    );
    return this.backendSrv
      .datasourceRequest(options)
      .then((response) => {
        return _.get(response, 'data.Response', {});
      })
      .catch((error) => {
        throw error;
      });
  }
}
