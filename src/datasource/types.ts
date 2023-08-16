/** 此文件放置通用业务的配置项，用于区分业务类型 */
import { DataQuery, DataSourceJsonData } from '@grafana/data';
import { RUMQuery } from './rum-service/types';
import { t, Language } from '../locale'
import {SearchSyntaxRule} from "./log-service/common/constants";

export const enum ServiceType {
  monitor = 'monitor',
  logService = 'logService',
  RUMService = 'RUMService'
}

export const ServiceTypeOptions = [
  { value: ServiceType.monitor, get label() { return t('cloud_monitor') } },
  { value: ServiceType.logService, get label() { return t('cloud_log_service') }  },
  { value: ServiceType.RUMService, get label() { return t('real_user_monitoring') }  },
];

export interface QueryInfo extends DataQuery {
  /** 数据源Query针对的查询服务，监控 or 日志 */
  serviceType?: ServiceType;
  logServiceParams?: {
    region: string;
    TopicId: string;
    Query: string;
    SyntaxRule: number;
    MaxResultNum?: number;
  };
  RUMServiceParams?: RUMQuery
}

export const defaultQueryInfo: Omit<QueryInfo, 'refId'> = {
  serviceType: ServiceType.logService,
  logServiceParams: {
    region: '',
    TopicId: '',
    Query: '',
    SyntaxRule: SearchSyntaxRule.CQL,
  },
  RUMServiceParams: {
    policy: "default",
    resultFormat: "time_series",
    orderByTime: "ASC",
    tags: [],
    groupBy: [
      {
        type: "time",
        params: ["$__interval"]
      },
      {
        type: "fill",
        params: ["null"]
      }
    ],
    select: [
      [
        {
          type: "field",
          params: ["value"]
        },
        {
          type: "mean",
          params: []
        }
      ]
    ]
  }
};

/** QueryInfo的运行时版本，用于将query中的不合法字段进去移除，保证query是个QueryInfo类型的数据 */
export const queryInfoRuntime: Required<QueryInfo> = {
  refId: '',
  hide: false,
  key: '',
  queryType: '',
  dataTopic: null as any,
  datasource: '',

  serviceType: defaultQueryInfo.serviceType,
  logServiceParams: defaultQueryInfo.logServiceParams,
  RUMServiceParams: defaultQueryInfo.RUMServiceParams,
};

/** 变量数据类型。字符场景为云监控配置，对象场景由内部字段决定 */
export interface VariableQuery {
  serviceType: ServiceType;
  queryString: string;
  logServiceParams?: QueryInfo['logServiceParams'];
};

/**
 * These are options configured for each DataSource instance.
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  secretId?: string;
  /** 控制是否开启日志服务功能 */
  logServiceEnabled?: boolean;
  /** 控制是否开启前端性能监控 */
  RUMServiceEnabled?: boolean;
  /** 根据 product.service 字段，判断云监控功能是否开启。字段混杂，不写入类型声明中 */
  // [product.service]?: boolean
  intranet?: boolean;
  language?: Language;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  secretKey: string;
}
