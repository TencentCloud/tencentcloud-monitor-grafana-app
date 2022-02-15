import { IAnalysisColumn, ISearchLogResult, ITopicInfo, TYPES } from '../model';

import { getFieldTypeByPrestoType } from './prestoType';
import { DataFrame, DataFrameDTO, FieldDTO, FieldType, toDataFrame } from '@grafana/data';
import _ from 'lodash';

export function formatSearchLog(param: TYPES.SearchLogResult): ISearchLogResult {
  const { Analysis, AnalysisRecords = [], Columns = [] } = param;

  const analysisColumns: IAnalysisColumn[] = [];
  const analysisRecords: Object[] = [];
  if (Analysis) {
    Columns.forEach((column) => {
      const analysisColumn = getFieldTypeByPrestoType(column.Type);
      analysisColumns.push({
        ...column,
        ...analysisColumn,
      });
    });
    AnalysisRecords.forEach((record) => {
      try {
        analysisRecords.push(JSON.parse(record));
      } catch (e) {
        analysisRecords.push({});
      }
    });

    for (const column of analysisColumns) {
      if (column.processor) {
        analysisRecords.forEach((record) => {
          // eslint-disable-next-line no-param-reassign
          record[column.Name] = column.processor(record[column.Name]);
        });
      }
    }
  }

  return {
    ...param,
    analysisRecords,
    analysisColumns,
  };
}

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
  META = '__META__',
}

function ConvertLogJsonToDataFrameDTO(searchLogResult: ISearchLogResult, topic: Partial<ITopicInfo>): DataFrameDTO {
  const { Results = [] } = searchLogResult;
  // Log场景的处理方式，参考文档
  // Grafana logSeriesToLogsModel方法（https://github.com/grafana/grafana/blob/faca526c169a9a61f119b6fc2819f5a8dfff7ed7/public/app/core/logs_model.ts#L315）
  // Grafana testData数据源 runLogsStream方法（https://github.com/grafana/grafana/blob/faca526c169a9a61f119b6fc2819f5a8dfff7ed7/public/app/plugins/datasource/testdata/runStreams.ts#L131）
  const frameDTO: DataFrameDTO = {
    name: '',
    meta: {
      preferredVisualisationType: 'logs',
    },
    fields: [
      {
        name: LogFieldReservedName.TIMESTAMP,
        type: FieldType.time,
        values: Results.map((result) => result.Time),
      },
      // 可考虑搭配日志主题索引和值内容，进行类型推断，优化日志查询数据展示
      {
        name: LogFieldReservedName.LogJson,
        type: FieldType.other,
        values: Results.map((result) => result.LogJson),
        config: {
          custom: { displayMode: 'json-view' },
        },
      },
      {
        // 用于支持 Explore 功能上下文能力
        name: LogFieldReservedName.META,
        type: FieldType.other,
        labels: { region: topic.region, TopicId: topic.TopicId },
        values: Results.map((result) => JSON.stringify(_.pick(result, ['Source', 'Filename', 'PkgId', 'PkgLogId']))),
      },
    ].filter(Boolean),
  };
  // if (directTableView) {
  //   const logRecords = Results.map((result) => {
  //     try {
  //       return JSON.parse(result.LogJson);
  //     } catch (e) {
  //       return {};
  //     }
  //   });
  //   const firstLogKeys = Object.keys(logRecords[0]);
  //   firstLogKeys.forEach((key) => {
  //     frameDTO.fields.push({
  //       name: key,
  //       type: guessFieldTypeFromValue(logRecords[0][key]),
  //       values: logRecords.map((record) => record[key]),
  //     });
  //   });
  // }

  return frameDTO;
}
