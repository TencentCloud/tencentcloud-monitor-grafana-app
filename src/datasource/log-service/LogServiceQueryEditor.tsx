import { DataSourceApi, QueryEditorProps } from '@grafana/data';
import { defaultQueryInfo, MyDataSourceOptions, QueryInfo, queryInfoRuntime } from '../types';
import React, { FC, useCallback } from 'react';
import { useLatest } from 'react-use';
import { InlineLabel, QueryField } from '@grafana/ui';
import { TopicSelector } from './components/TopicSelector';
import { TcDataSourceId } from '../common/constants';
import _ from 'lodash';
import './index.less';

type Props = QueryEditorProps<DataSourceApi<any>, QueryInfo, MyDataSourceOptions>;

export const LogServiceQueryEditor: FC<Props> = React.memo((props: Props) => {
  const propsRef = useLatest(props);
  const { query, datasource } = props;
  const logServiceParams = query.logServiceParams || _.clone(defaultQueryInfo.logServiceParams)!;

  const partialOnChange = useCallback(
    (queryInfo: Partial<QueryInfo>) => {
      const { onChange, query } = propsRef.current;
      // 使用queryInfoRuntime作为配置模板，清除其他不存在的配置字段。
      const oldQuery = _.pick(query, Object.keys(queryInfoRuntime));
      onChange({ ...oldQuery, ...queryInfo } as unknown as QueryInfo);
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
              ...(propsRef.current?.query?.logServiceParams || ({} as any)),
              ...v,
            },
          });
        }}
        datasource={datasource}
      />
      <div style={{ display: 'flex' }}>
        <InlineLabel width={20}>检索语句</InlineLabel>
        <div style={{ flexGrow: 1 }}>
          <QueryField
            portalOrigin={TcDataSourceId}
            placeholder={`e.g. _SOURCE__: 127.0.0.1 AND "http/1.0"`}
            query={logServiceParams.Query}
            onChange={(v) => {
              partialOnChange({
                logServiceParams: {
                  ...(propsRef.current?.query?.logServiceParams || ({} as any)),
                  Query: v,
                },
              });
            }}
            // By default QueryField calls onChange if onBlur is not defined, this will trigger a rerender
            // And slate will claim the focus, making it impossible to leave the field.
            onBlur={() => {}}
          />
        </div>
      </div>
    </div>
  );
});

LogServiceQueryEditor.displayName = 'LogServiceQueryEditor';
