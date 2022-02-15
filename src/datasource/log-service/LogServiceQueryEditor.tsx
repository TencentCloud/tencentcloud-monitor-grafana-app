import { DataSourceApi, QueryEditorProps } from '@grafana/data';
import { defaultQueryInfo, MyDataSourceOptions, QueryInfo, queryInfoRuntime } from '../types';
import React, { FC, useCallback } from 'react';
import { useLatest } from 'react-use';
import { InlineField, QueryField } from '@grafana/ui';
import { TopicSelector } from './components/TopicSelector';
import { TcDataSourceId } from '../common/constants';
import _ from 'lodash';
import './index.less';

type Props = QueryEditorProps<DataSourceApi<any>, QueryInfo, MyDataSourceOptions>;

export const LogServiceQueryEditor: FC<Props> = React.memo((props: Props) => {
  const propsRef = useLatest(props);
  const { query, onRunQuery } = props;
  const logServiceParams = query.logServiceParams || _.clone(defaultQueryInfo.logServiceParams)!;

  const partialOnChange = useCallback(
    (queryInfo: Partial<QueryInfo>) => {
      const { onChange, query } = propsRef.current;
      // 使用queryInfoRuntime作为配置模板，清除其他不存在的配置字段。
      const oldQuery = _.pick(query, Object.keys(queryInfoRuntime));
      onChange(({ ...oldQuery, ...queryInfo } as unknown) as QueryInfo);
    },
    [propsRef]
  );
  return (
    <div>
      <TopicSelector
        value={{ region: logServiceParams.region, TopicId: logServiceParams.TopicId }}
        onChange={(v) => {
          partialOnChange({
            logServiceParams: {
              ...logServiceParams,
              ...v,
            },
          });
        }}
      />
      <InlineField label="检索语句" labelWidth={20} grow>
        <QueryField
          portalOrigin={TcDataSourceId}
          placeholder={`e.g. _SOURCE__: 127.0.0.1 AND "http/1.0"`}
          query={logServiceParams.Query}
          onChange={(v) => {
            partialOnChange({
              logServiceParams: {
                ...logServiceParams,
                Query: v,
              },
            });
          }}
          onBlur={() => {
            onRunQuery();
          }}
        />
      </InlineField>
    </div>
  );
});

LogServiceQueryEditor.displayName = 'LogServiceQueryEditor';
