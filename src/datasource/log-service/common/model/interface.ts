import * as TYPES from './types';
import { FieldType } from '@grafana/data';

export interface IApiErrorResponse extends Error {
  Error: {
    Code: string;
    Message: string;
  };
  RequestId: string;
}

export interface IApiError extends Error {
  code: string;
  message: string;
  data?: {
    Response: IApiErrorResponse;
  };
}

/** 格式化处理后的 Sql分析结果的列信息 */
export interface IAnalysisColumn extends TYPES.Column {
  prestoTypeRegex: RegExp;
  fieldType: FieldType;
  /** 用于解析该字段的函数方法，用于类型保证，后端字段格式转化 */
  processor?: (any) => any;
}

/** formatSearchLog函数结果 */
export interface ISearchLogResult extends Omit<TYPES.SearchLogResult, 'ColNames' | 'AnalysisResults'> {
  /** 将分析结果转化为二维表形式，转化过程中自动进行数字类型转化 */
  analysisRecords: Object[];
  analysisColumns: IAnalysisColumn[];
}

export interface ITopicInfo extends TYPES.TopicInfo {
  // regionId?: number;
  region?: string;
}

export type ITopicIdentifier = Pick<ITopicInfo, 'region' | 'TopicId'>;
