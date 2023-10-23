import { cloneDeep, isString, map as _map, get } from 'lodash';
import { Observable, of, throwError, from } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getBackendSrv, getTemplateSrv, TemplateSrv } from '@grafana/runtime';
import {
  ArrayVector,
  DataFrame,
  DataQueryError,
  DataQueryRequest,
  DataQueryResponse,
  DataSourceInstanceSettings,
  MetricFindValue,
  dateMath,
  DataSourceApi,
  FieldType,
  QueryResultMeta,
  TIME_SERIES_TIME_FIELD_NAME,
  TIME_SERIES_VALUE_FIELD_NAME,
  TimeSeries,
  LoadingState,
  RawTimeRange,
} from '@grafana/data';
import APMQueryModel from './APM_query_model';
import APMSeries from './APM_series';
import ResponseParser from './response_parser';
import { GetRequestParams, GetServiceAPIInfo } from '../common/constants';
import { MyDataSourceOptions, QueryInfo } from '../types';
import { APMOptions, APMQuery } from './types';
import { APMQueryBuilder } from './query_builder';

// we detect the field type based on the value-array
function getFieldType(values: unknown[]): FieldType {
  // the values-array may contain a lot of nulls.
  // we need the first not-null item
  const firstNotNull = values.find((v) => v !== null);

  if (firstNotNull === undefined) {
    // we could not find any not-null values
    return FieldType.number;
  }

  const valueType = typeof firstNotNull;

  switch (valueType) {
    case 'string':
      return FieldType.string;
    case 'boolean':
      return FieldType.boolean;
    case 'number':
      return FieldType.number;
    default:
      throw new Error(`APM: invalid value type ${valueType}`);
  }
}

// this conversion function is specialized to work with the timeseries
// data returned by getTimeSeries()
function timeSeriesToDataFrame(timeSeries: TimeSeries): DataFrame {
  const times: number[] = [];
  const values: unknown[] = [];

  // the data we process here is not correctly typed.
  // the typescript types say every data-point is number|null,
  // but in fact it can be string or boolean too.

  const points = timeSeries.datapoints;
  for (const point of points) {
    values.push(point[0]);
    times.push(Number(`${point[1]}000`));
  }

  const timeField = {
    name: TIME_SERIES_TIME_FIELD_NAME,
    type: FieldType.time,
    config: {},
    values: new ArrayVector<number>(times),
  };

  const valueField = {
    name: TIME_SERIES_VALUE_FIELD_NAME,
    type: getFieldType(values),
    config: {
      displayNameFromDS: timeSeries.title,
    },
    values: new ArrayVector<unknown>(values),
    labels: timeSeries.tags,
  };

  const fields = [timeField, valueField];

  return {
    name: timeSeries.target,
    refId: timeSeries.refId,
    meta: timeSeries.meta,
    fields,
    length: values.length,
  };
}

export default class APMServiceDataSource extends DataSourceApi<QueryInfo, MyDataSourceOptions> {
  type: string;
  url: string;
  responseParser: any;
  private readonly instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>;
  private readonly templateSrv: TemplateSrv;

  constructor(instanceSettings: DataSourceInstanceSettings<APMOptions>) {
    super(instanceSettings);

    this.instanceSettings = instanceSettings;
    this.templateSrv = getTemplateSrv();
    this.responseParser = new ResponseParser();
    this.type = 'APMService';
  }

  query(request: DataQueryRequest<QueryInfo>): Promise<DataQueryResponse> | Observable<DataQueryResponse> {
    return this.classicQuery(request);
  }

  classicQuery(options: any): Observable<DataQueryResponse> {
    let timeFilter = this.getTimeFilter(options);
    const scopedVars = options.scopedVars;
    const targets = cloneDeep(options.targets);
    const queryTargets: any[] = [];

    let i;
    let y;

    let allQueries = _map(targets, (target) => {
      if (target.hide) {
        return '';
      }
      if (target.APMServiceParams.custom) {
        return target.APMServiceParams.custom;
      }
      target.APMServiceParams = this.fixTimePeriod(target.APMServiceParams, options);
      queryTargets.push(target);

      // backward compatibility
      scopedVars.interval = scopedVars.__interval;

      return new APMQueryModel(target.APMServiceParams, this.templateSrv, scopedVars).render(true);
    }).reduce((acc, current) => {
      if (current !== '') {
        acc += ';' + current;
      }
      return acc;
    });

    if (allQueries === '') {
      return of({ data: [] });
    }

    // add global adhoc filters to timeFilter
    // @ts-ignore
    const adhocFilters = this.templateSrv.getAdhocFilters(this.name);
    if (adhocFilters.length > 0) {
      const tmpQuery = new APMQueryModel({}, this.templateSrv, scopedVars);
      timeFilter += ' AND ' + tmpQuery.renderAdhocFilters(adhocFilters);
    }

    // replace grafana variables
    scopedVars.timeFilter = { value: timeFilter };

    // replace templated variables
    allQueries = this.templateSrv.replace(allQueries, scopedVars);

    return this._seriesQuery(allQueries, options).pipe(
      map((data: any) => {
        if (!data || !data.results) {
          return { data: [] };
        }

        const seriesList = [];
        for (i = 0; i < data.results.length; i++) {
          const result = data.results[i];
          if (!result || !result.series) {
            continue;
          }

          const target = queryTargets[i];
          let alias = target.APMServiceParams.alias;
          if (alias) {
            alias = this.templateSrv.replace(target.APMServiceParams.alias, options.scopedVars);
          }

          const meta: QueryResultMeta = {
            executedQueryString: data.executedQueryString,
          };

          const apmSeries = new APMSeries({
            refId: target.refId,
            series: data.results[i].series,
            alias: alias,
            meta,
          });

          switch (target.APMServiceParams.resultFormat) {
            case 'logs':
              meta.preferredVisualisationType = 'logs';
            // eslint-disable-next-line no-fallthrough
            case 'table': {
              seriesList.push(apmSeries.getTable());
              break;
            }
            default: {
              const timeSeries = apmSeries.getTimeSeries();
              for (y = 0; y < timeSeries.length; y++) {
                seriesList.push(timeSeriesToDataFrame(timeSeries[y]));
              }
              break;
            }
          }
        }

        return { data: seriesList, state: LoadingState.Done };
      })
    );
  }

  async metricFindQuery(query: string, options?: any): Promise<MetricFindValue[]> {
    const interpolated = this.templateSrv.replace(query, undefined, 'regex');

    return this._seriesQuery(interpolated, options)
      .toPromise()
      .then((resp) => {
        return this.responseParser.parse(query, resp);
      });
  }

  _seriesQuery(query: string, options?: any) {
    if (!query) {
      return of({ results: [] });
    }

    if (options?.range) {
      const timeFilter = this.getTimeFilter({ rangeRaw: options.range, timezone: options.timezone });
      query = query.replace('$timeFilter', timeFilter);
    }

    return this._APMRequest(query);
  }

  _APMRequest(query) {
    const serviceType = 'apm';
    const serviceInfo = GetServiceAPIInfo('', serviceType);

    return from(
      GetRequestParams(
        { url: this.instanceSettings.url + serviceInfo.path, data: { Query: btoa(query) } },
        serviceType,
        { action: 'DescribeGrafanaMetricData' },
        '',
        this.instanceSettings.id,
        getBackendSrv()
      )
    ).pipe(
      mergeMap((requestOptions) => {
        return getBackendSrv()
          .fetch(requestOptions)
          .pipe(
            map((result: any) => {
              if (get(result, 'data.Response.Error')) {
                // eslint-disable-next-line no-throw-literal
                throw {
                  message: 'APM Error: ' + get(result, 'data.Response.Error.Message'),
                  data: result.data,
                  cancelled: true,
                };
              }
              const res = get(result, 'data.Response.Result');
              const buf = Buffer.from(res, 'base64').toString();
              const data = JSON.parse(buf);
              data.executedQueryString = query;

              if (data) {
                if (data.Response.Error) {
                  // eslint-disable-next-line no-throw-literal
                  throw {
                    message: 'APM Error: ' + data.Response.Error.Code + ': ' + data.Response.Error.Message,
                    data,
                  };
                }
                if (data.Response.Result) {
                  const errors = data.Response.Result.results.filter((elem: any) => elem.error);

                  if (errors.length > 0) {
                    // eslint-disable-next-line no-throw-literal
                    throw {
                      message: 'APM Error: ' + errors[0].error,
                      data,
                    };
                  }
                }
              }
              return data.Response.Result;
            }),
            catchError((err) => {
              if (err.cancelled) {
                return of(err);
              }

              return throwError(this.handleErrors(err));
            })
          );
      })
    );
  }

  handleErrors(err: any) {
    const error: DataQueryError = {
      message: err?.status || err?.message || 'Unknown error during query transaction. Please check JS console logs.',
    };

    if ((Number.isInteger(err.status) && err.status !== 0) || err.status >= 300) {
      if (err.data?.error) {
        error.message = 'APM Error: ' + err.data.error;
        error.data = err.data;
        // @ts-ignore
        error.config = err.config;
      } else {
        error.message = 'Network Error: ' + err.statusText + '(' + err.status + ')';
        error.data = err.data;
        // @ts-ignore
        error.config = err.config;
      }
    }

    return error;
  }

  getTimeFilter(options: any) {
    const from = this.getAPMTime(options.rangeRaw.from, false, options.timezone);
    const until = this.getAPMTime(options.rangeRaw.to, true, options.timezone);

    return 'time >= ' + from + ' and time <= ' + until;
  }

  getAPMTime(date: any, roundUp: any, timezone: any) {
    if (isString(date)) {
      if (date === 'now') {
        return 'now()';
      }

      const parts = /^now-(\d+)([dhms])$/.exec(date);
      if (parts) {
        const amount = parseInt(parts[1], 10);
        const unit = parts[2];
        return 'now() - ' + amount + unit;
      }
      date = dateMath.parse(date, roundUp, timezone);
    }

    return date.valueOf() + 'ms';
  }

  fixTimePeriod(target: any, options: any) {
    const period = this.getTimePeriod(options.rangeRaw, options.timezone);

    target.groupBy?.forEach((groupBy: any) => {
      if (groupBy.type === 'time' && groupBy.params[0] !== '1d') {
        target = this.modifyTime(target, period);
      }
    });
    return target;
  }

  getTimePeriod(rangeRaw: RawTimeRange, timezone: string): string {
    const from = dateMath.parse(rangeRaw.from, false, timezone)?.valueOf();
    const until = dateMath.parse(rangeRaw.to, true, timezone)?.valueOf();
    const oneHour = 1000 * 60 * 60;
    let range = 0;
    let period = '1m';
    if (from && until) {
      range = until - from;
    }
    // 12h
    if (range <= oneHour * 12) {
      period = '1m';
    }
    // 3d
    else if (range <= oneHour * 24 * 2) {
      period = '5m';
    }
    // 7d
    else if (range <= oneHour * 24 * 7) {
      period = '1h';
    } else {
      period = '1d';
    }
    return period;
  }

  // 修改查询聚合周期
  modifyTime(query: APMQuery, period: string): APMQuery {
    if (!query.groupBy) {
      return query;
    }
    for (const item of query.groupBy) {
      if (item.type === 'time') {
        const compareResult = this.periodCompare(String(item.params?.[0]) || '', period);
        const isPeriodInparamsSmaller = compareResult && compareResult < 0;
        // !compareResult代表输入的时间粒度无效
        if (!compareResult || isPeriodInparamsSmaller) {
          item.params = [period];
        }
        return query;
      }
    }
    return query;
  }
  /**
   * @param pre_period 粒度
   * @param period 粒度
   * @return 负数代表小于；0代表=；正数代表大于; null代表无效
   */
  periodCompare(pre_period: string, period: string): number | null {
    const units = ['s', 'm', 'h', 'd'];
    const reg = new RegExp(`(^\\d+)([${units.join('')}]$)`);
    const pre = reg.exec(pre_period);
    const per = reg.exec(period);
    if (!pre || !per) {
      return null;
    }
    if (units.indexOf(pre[2]) - units.indexOf(per[2])) {
      return units.indexOf(pre[2]) - units.indexOf(per[2]);
    }
    return Number(pre[1]) - Number(per[1]);
  }

  testDatasource(): Promise<any> {
    if (!this.instanceSettings.jsonData['APMServiceEnabled']) {
      return null;
    }
    const queryBuilder = new APMQueryBuilder({ measurement: '', tags: [] }, '');
    const query = queryBuilder.buildExploreQuery('MEASUREMENTS');

    return this._seriesQuery(query)
      .toPromise()
      .then((res: any) => {
        const error = get(res, 'data.Response.Error');
        if (error) {
          return { status: 'error', message: error?.Message };
        }
        return { status: 'success', message: 'Data source is working' };
      })
      .catch((err: any) => {
        return { status: 'error', message: err.message };
      });
  }
}
