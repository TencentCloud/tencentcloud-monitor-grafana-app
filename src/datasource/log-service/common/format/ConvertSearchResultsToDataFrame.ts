import { ISearchLogResult, ITopicInfo } from '../model';
import { DataFrame, DataFrameDTO, FieldDTO, FieldType, toDataFrame } from '@grafana/data';
import _ from 'lodash';
import { parseLogJsonStr } from './formatSearchLog';

/** 将SearchResults结果，处理为DataFrame */
export function ConvertSearchResultsToDataFrame(
  searchLogResult: ISearchLogResult,
  topic: Partial<ITopicInfo>
): DataFrame {
  const frameDTO = searchLogResult.Analysis
    ? ConvertAnalysisJsonToDataFrameDTO(searchLogResult)
    : ConvertLogJsonToDataFrameDTO(searchLogResult, topic);
  return toDataFrame(frameDTO);
}

function ConvertAnalysisJsonToDataFrameDTO(searchLogResult: ISearchLogResult): DataFrameDTO {
  const { analysisRecords = [], analysisColumns = [] } = searchLogResult ?? {};

  const fields: FieldDTO[] = analysisColumns.map((column) => {
    const values = analysisRecords.map((r) => r?.[column.Name!]);
    return {
      name: column.Name,
      type: column.fieldType as any,
      values,
    };
  });
  return {
    name: '',
    fields,
  };
}

export const enum LogFieldReservedName {
  TIMESTAMP = '__TIMESTAMP__',
  LogJson = '__LogJson__',
  SOURCE = '__SOURCE__',
  Filename = '__FILENAME__',
  HostName = '__HOSTNAME__',
  META = '__META__',
}

function ConvertLogJsonToDataFrameDTO(searchLogResult: ISearchLogResult, topic: Partial<ITopicInfo>): DataFrameDTO {
  const { Results = [] } = searchLogResult;
  // Log场景的处理方式，参考文档
  // Grafana logSeriesToLogsModel方法（https://github.com/grafana/grafana/blob/faca526c169a9a61f119b6fc2819f5a8dfff7ed7/public/app/core/logs_model.ts#L315）
  // Grafana testData数据源 runLogsStream方法（https://github.com/grafana/grafana/blob/faca526c169a9a61f119b6fc2819f5a8dfff7ed7/public/app/plugins/datasource/testdata/runStreams.ts#L131）

  const timeField: FieldDTO<number> = {
    name: LogFieldReservedName.TIMESTAMP,
    type: FieldType.time,
    values: [],
  };
  const logField: FieldDTO<string> = {
    name: LogFieldReservedName.LogJson,
    // 这里使用字符串类型，标识此内容为 核心日志内容
    type: FieldType.string,
    config: {
      custom: { displayMode: 'json-view' },
    },
    values: [],
  };
  const sourceField: FieldDTO<string> = {
    name: LogFieldReservedName.SOURCE,
    type: FieldType.string,
    values: [],
  };
  const filenameField: FieldDTO<string> = {
    name: LogFieldReservedName.Filename,
    type: FieldType.string,
    values: [],
  };
  const hostnameField: FieldDTO<string> = {
    name: LogFieldReservedName.HostName,
    type: FieldType.string,
    values: [],
  };
  const metaField: FieldDTO<any> = {
    // 用于支持 Explore 功能上下文能力
    name: LogFieldReservedName.META,
    type: FieldType.other,
    config: {
      custom: {
        hidden: true,
      },
    },
    labels: { region: topic.region, TopicId: topic.TopicId },
    values: [],
  };

  Results.forEach((logItem) => {
    (timeField.values as number[]).push(logItem['Time']);
    (sourceField.values as string[]).push(logItem['Source']);
    (filenameField.values as string[]).push(logItem['FileName']);
    (hostnameField.values as string[]).push(logItem['HostName']);
    (metaField.values as any[]).push(JSON.stringify(_.pick(logItem, ['PkgId', 'PkgLogId'])));
    try {
      const logJson = parseLogJsonStr(logItem.LogJson);

      /** 使用 LogsParsers.JSON 进行自动解析
       * 展示问题优化跟踪：https://github.com/grafana/grafana/issues/54959
       */
      // 这里的值可以是 string | object, Grafana内部自动进行序列化处理。
      (logField.values as string[]).push(JSON.stringify(logJson));

      /** 使用 LogsParsers.logfmt 进行自动解析，缩略展示上更友好，但是LogDetail提取会有问题 */
      // let logStr = '';
      // Object.entries(logJson).forEach(([k, v])=>{
      //   logStr += `${k}=${_.isObject(v) ? JSON.stringify(v) : `${v}` } `
      // });
      // (logField.values as string[]).push(logStr);
    } catch (e) {}
  });

  const frameDTO: DataFrameDTO = {
    name: '',
    meta: {
      preferredVisualisationType: 'logs',
      custom: {
        RequestId: (searchLogResult as any).RequestId,
        SamplingRate: searchLogResult.SamplingRate,
      },
      executedQueryString: searchLogResult.Query,
    },
    fields: [timeField, logField, sourceField, filenameField, hostnameField, metaField],
  };
  return frameDTO;
}
