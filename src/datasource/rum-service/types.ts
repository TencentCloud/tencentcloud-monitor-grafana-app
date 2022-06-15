import { DataSourceJsonData } from '@grafana/data';

export interface RUMOptions extends DataSourceJsonData {
  timeInterval?: string;
  httpMode?: string;

  organization?: string;
  defaultBucket?: string;
  maxSeries?: number;
}

export type ResultFormat = 'time_series' | 'table' | 'logs';

export interface RUMQueryPart {
  type: string;
  params?: Array<string | number>;
  interval?: string;
}

export interface RUMQueryTag {
  key: string;
  operator?: string;
  condition?: string;
  value: string;
}

export interface RUMQuery {
  policy?: string;
  measurement?: string;
  resultFormat?: ResultFormat;
  orderByTime?: string;
  tags?: RUMQueryTag[];
  groupBy?: RUMQueryPart[];
  select?: RUMQueryPart[][];
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
}