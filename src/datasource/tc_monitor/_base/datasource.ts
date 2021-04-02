import _ from 'lodash';
import moment from 'moment';
import DatasourceInterface from '../../datasource';
import {
  GetRequestParams,
  GetServiceAPIInfo,
  ReplaceVariable,
  GetDimensions,
  ParseQueryResult,
  SliceLength,
} from '../../common/constants';
import { MetricQuery } from './types';
import { getNamesapceFromService } from '../../common/utils';

export interface TemplateQueryIdType {
  instance: string;
  listener?: string;
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
  abstract InstanceAliasList: string[];
  abstract templateQueryIdMap: TemplateQueryIdType; // 必须为标识
  abstract InstanceReqConfig: {
    service?: string;
    action: string;
    responseField: string;
    interceptor?: {
      request?: (params: unknown) => unknown;
      response?: (data: unknown) => unknown;
    };
  };
  abstract InvalidDimensions: Record<string, string> = {};

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

  /* 格式化模板变量上的显示 */
  getAliasValue(instance: Record<string, any>, alias: string) {
    const result = instance[alias];
    // console.log({ result, instance, alias });
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
    const { action, namespace, display } = query;
    let { region, instancealias = this.templateQueryIdMap.instance } = query;

    if (!action || !namespace) {
      return [];
    }

    // 查询地域列表
    const regionQuery = action.match(/^DescribeRegions$/i);
    if (regionQuery) {
      return this.getRegions();
    }

    region = this.getVariable(region); // 将模板转换为真实值

    // 查询实例列表
    if (region && action.match(/^DescribeInstances/i)) {
      const result = await this.getVariableInstances(region, {});
      // 缓存全量实例列表
      this.instanceListCache = result;

      instancealias = this.InstanceAliasList.includes(instancealias) ? instancealias : this.templateQueryIdMap.instance;
      console.log({ instancealias });
      return result.flatMap((item) => {
        item._InstanceAliasValue = item[instancealias]; // FIXME:
        if (!item[instancealias]) return [];
        return [
          {
            text: this.formatVarDisplay(item, display, instancealias),
            value: item[this.templateQueryIdMap.instance],
          },
        ];
      });
    }
    // 在instance实例的基础上查询其他数据
    let instance = this.getVariable(query['instance']);
    if (region && action && instance) {
      try {
        // instance = JSON.parse(instance);
        instance =
          _.cloneDeep(this.instanceListCache.find((item) => item[this.templateQueryIdMap.instance] === instance)) ?? {};
        // eslint-disable-next-line no-empty
      } catch (error) {}
      return this.fetchMetricData(action, region, instance, query);
    }

    return Promise.resolve([]);
  }

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
  query(options: any) {
    const service = this.service!; // 强制声明非空

    const queries = _.filter(options.targets, (item) => {
      // 过滤无效的查询 target
      return (
        item.hide !== true &&
        !!item.namespace &&
        !!item[service].metricName &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item[service].region, false)) &&
        !_.isEmpty(ReplaceVariable(this.templateSrv, options.scopedVars, item[service].instance, true))
      );
    }).map((target) => {
      // 实例 instances 可能为模板变量，需先获取实际值
      // 针对JSON字符串和id的形式，分开做处理
      let instances = ReplaceVariable(this.templateSrv, options.scopedVars, target[service].instance, true);

      // console.log('instanceListCache', this.instanceListCache);
      instances = [].concat(instances).map((inst) => {
        try {
          return JSON.parse(inst); // 兼容json字符串的 形式
        } catch (error) {
          return (
            _.cloneDeep(this.instanceListCache.find((item) => item[this.templateQueryIdMap.instance] === inst)) ?? {}
          );
        }
      });
      const region = ReplaceVariable(this.templateSrv, options.scopedVars, target[service].region, false);
      const data = {
        StartTime: moment(options.range.from).format(),
        EndTime: moment(options.range.to).format(),
        Period: target[service].period || 300,
        Instances: _.flatMap(instances, (instance) => {
          const dimensionObject = target[service].dimensionObject;

          // 处理dimensions的值
          _.forEach(dimensionObject, (__, key) => {
            let keyTmp = key;
            if (_.has(this.InvalidDimensions, key)) {
              // 从【维度中】的字段到【实例中】字段的映射。 { functionName: FunctionName }
              keyTmp = this.InvalidDimensions[key];
              instance[key] = instance[keyTmp];
            }
            // 设置instance，针对额外的维度，需要注意模板变量的值
            instance[key] = instance[keyTmp] ?? this.getVariable(target[service][keyTmp]);
            // 设置维度值，从实例中取，如果取不到，则从界面模型上取

            // cynosdb产品接口返回维度和入参不一致
            if (this.checkKeys.length > 0) {
              this.checkKeys.forEach((Ekey) => {
                instance[Ekey] = instance[key];
              });
            }
            dimensionObject[key] = { Name: key, Value: instance[key] };
          });

          // 没有额外维度，则直接返回
          if (this.extraMetricDims.length === 0) {
            return [{ Dimensions: GetDimensions(dimensionObject) }];
          }

          // 有额外维度，则处理额外的维度, 为了处理维度的多选值，这里比较绕，比较复杂
          return _.flatMap(this.extraMetricDims, (extraDim) => {
            const targetDims = dimensionObject[extraDim]?.Value;
            if (Array.isArray(targetDims)) {
              return targetDims.map((dim) => {
                instance[extraDim] = dim; // 实例上添加对应属性
                return {
                  Dimensions: GetDimensions({
                    ...dimensionObject,
                    [extraDim]: { Name: extraDim, Value: dim },
                  }),
                };
              });
            }

            return [{ Dimensions: GetDimensions(dimensionObject) }];
          });
        }),
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
      return _.filter(
        _.filter(response.MetricSet || [], (item) => !(item.Namespace !== this.namespace || !item.MetricName))
      );
    });
  }

  getInstances(region, params = {}) {
    const { service = this.service, action, responseField: field, interceptor } = this.InstanceReqConfig;
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

    const { service = this.service, action, responseField: field } = this.InstanceReqConfig;

    const serviceInfo = GetServiceAPIInfo(region, service);
    return this.doRequest(
      {
        url: this.url + serviceInfo.path,
        data: params,
      },
      serviceInfo.service,
      { region, action }
    ).then((response) => {
      result = _.get(response, field) ?? _.get(response, `Result.${field}`) ?? [];
      const total = response.TotalCount ?? response.TotalCnt ?? 0;
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
            console.log('result:', result);
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
