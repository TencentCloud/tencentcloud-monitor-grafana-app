import { DataSourceJsonData } from '@grafana/data';

export interface APMOptions extends DataSourceJsonData {
  timeInterval?: string;
  httpMode?: string;

  organization?: string;
  defaultBucket?: string;
  maxSeries?: number;
}

export type ResultFormat = 'time_series' | 'table' | 'logs';

export interface APMQueryPart {
  type: string;
  params?: Array<string | number>;
  interval?: string;
}

export interface APMQueryTag {
  key: string;
  operator?: string;
  condition?: string;
  value: string;
}

export interface APMQuery {
  policy?: string;
  measurement?: string;
  resultFormat?: ResultFormat;
  orderByTime?: string;
  tags?: APMQueryTag[];
  groupBy?: APMQueryPart[];
  select?: APMQueryPart[][];
  limit?: string | number;
  slimit?: string | number;
  tz?: string;
  // NOTE: `fill` is not used in the query-editor anymore, and is removed
  // if any change happens in the query-editor. the query-generation still
  // supports it for now.
  fill?: string;
  rawQuery?: boolean;
  query?: string;
  alias?: string;
  custom?: string;
  orderBy?: string;
  orderType?: string;
}
