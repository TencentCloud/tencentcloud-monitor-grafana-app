import { DescribeLogContextResult } from '../model';
import { DataFrameDTO, FieldType, toDataFrame, DataFrame, FieldDTO } from '@grafana/data';
import { parseLogJsonStr } from './formatSearchLog';

export function ConvertLogContextToDataFrame(logContext: DescribeLogContextResult): DataFrame {
  const { LogContextInfos = [] } = logContext;

  const timeField: FieldDTO<number> = {
    name: 'ts',
    type: FieldType.time,
    config: { displayName: 'Time' },
    values: [],
  };
  const idField: FieldDTO<string | number> = {
    name: 'id',
    type: FieldType.string,
    values: [],
  };
  const lineField: FieldDTO<string> = {
    name: 'line',
    type: FieldType.string,
    values: [],
  };

  LogContextInfos.forEach((item) => {
    (timeField.values as number[]).unshift(item.BTime);
    (idField.values as (string | number)[]).unshift(item.PkgLogId);
    let contextLog;
    try {
      contextLog = JSON.stringify(parseLogJsonStr(item.Content) as any);
    } catch (e) {
      contextLog = item.Content;
    }
    (lineField.values as string[]).unshift(contextLog);
  });

  const frameDTO: DataFrameDTO = {
    name: '',
    meta: {
      custom: {
        RequestId: (logContext as any).RequestId,
      },
    },
    fields: [timeField, lineField, idField],
  };
  return toDataFrame(frameDTO);
}
