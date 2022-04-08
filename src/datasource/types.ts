/** 此文件放置通用业务的配置项，用于区分业务类型 */
import { DataQuery, DataSourceJsonData } from '@grafana/data';

export const enum ServiceType {
  monitor = 'monitor',
  logService = 'logService',
}

export const ServiceTypeOptions = [
  { value: ServiceType.monitor, label: '云监控' },
  { value: ServiceType.logService, label: '日志服务' },
];

export interface QueryInfo extends DataQuery {
  /** 数据源Query针对的查询服务，监控 or 日志 */
  serviceType?: ServiceType;
  logServiceParams?: {
    region: string;
    TopicId: string;
    Query: string;
  };
}

export const defaultQueryInfo: Omit<QueryInfo, 'refId'> = {
  serviceType: ServiceType.logService,
  logServiceParams: {
    region: '',
    TopicId: '',
    Query: '',
  },
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
};

/** 变量数据类型。字符场景为云监控配置，对象场景由内部字段决定 */
export type VariableQuery = string | VariableLogServiceQuery;
export interface VariableLogServiceQuery {
  /** 使用日志数据源获取options数据 */
  serviceType: ServiceType.logService;
  logServiceParams?: QueryInfo['logServiceParams'];
}

/**
 * These are options configured for each DataSource instance.
 */
export interface MyDataSourceOptions extends DataSourceJsonData {
  secretId?: string;
  /** 控制是否开启日志服务功能 */
  logServiceEnabled?: boolean;
  /** 根据 product.service 字段，判断云监控功能是否开启。字段混杂，不写入类型声明中 */
  // [product.service]?: boolean
  intranet?: boolean;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */
export interface MySecureJsonData {
  secretKey: string;
}
