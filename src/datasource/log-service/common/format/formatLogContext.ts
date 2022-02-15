import { DescribeLogContextResult } from '../model';
import { DataFrameDTO, FieldType, toDataFrame, DataFrame } from '@grafana/data';

export function ConvertLogContextToDataFrame(logContext: DescribeLogContextResult): DataFrame {
  const { LogContextInfos = [] } = logContext;
  const frameDTO: DataFrameDTO = {
    name: '',
    fields: [
      {
        name: 'ts',
        type: FieldType.time,
        config: { displayName: 'Time' },
        values: LogContextInfos.map((item) => item.BTime),
      },
      {
        name: 'line',
        type: FieldType.string,
        values: LogContextInfos.map((item) => item.Content),
      },
      { name: 'id', type: FieldType.string, config: {}, values: LogContextInfos.map((item) => item.PkgLogId) },
    ],
  };

  return toDataFrame(frameDTO);
}
