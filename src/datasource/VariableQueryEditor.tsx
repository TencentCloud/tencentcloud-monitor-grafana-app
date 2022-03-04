import { InlineField, InlineFieldRow, Input, RadioButtonGroup } from '@grafana/ui';
import React, { useCallback } from 'react';
import { defaultQueryInfo, ServiceType, ServiceTypeOptions, VariableQuery } from './types';
import { DataSource } from './DataSource';
import { LogServiceQueryEditor } from './log-service/LogServiceQueryEditor';
import { useLatest } from 'react-use';
import { clone } from 'lodash';

interface VariableQueryProps {
  query: VariableQuery;
  onChange: (v: VariableQuery, definition: string) => void;
  datasource: DataSource;
}

export const VariableQueryEditor: React.FC<VariableQueryProps> = (props) => {
  const propsRef = useLatest(props);
  const { query, datasource } = props;

  const onQueryChange = useCallback(
    (newQuery: VariableQuery) => {
      const { onChange } = propsRef.current;
      let definition;
      if (typeof newQuery === 'string') {
        definition = newQuery;
      } else {
        definition = `SQL:  ${newQuery.logServiceParams?.Query}`;
      }
      onChange?.(newQuery, definition);
    },
    [propsRef]
  );

  const currentServiceType = typeof query === 'string' ? ServiceType.monitor : ServiceType.logService;

  return (
    <>
      <InlineFieldRow>
        <InlineField label="服务类型" labelWidth={20}>
          <RadioButtonGroup
            options={ServiceTypeOptions}
            value={currentServiceType}
            onChange={(type) => {
              if (type === ServiceType.monitor) {
                onQueryChange('');
              } else {
                onQueryChange({
                  serviceType: ServiceType.logService,
                  logServiceParams: clone(defaultQueryInfo.logServiceParams),
                });
              }
            }}
          />
        </InlineField>
      </InlineFieldRow>
      {currentServiceType === ServiceType.logService ? (
        <>
          {/* 复用编辑模式的日志主题输入组件 */}
          <LogServiceQueryEditor
            datasource={datasource}
            query={query as unknown as any}
            onRunQuery={() => {}}
            onChange={(v) => {
              onQueryChange({
                serviceType: ServiceType.logService,
                logServiceParams: v.logServiceParams,
              });
            }}
          />
        </>
      ) : (
        <InlineFieldRow>
          <InlineField label="查询语句" labelWidth={20} grow>
            <Input
              name="query"
              required
              onChange={(e) => onQueryChange(e.currentTarget.value)}
              value={query as unknown as string}
            />
          </InlineField>
        </InlineFieldRow>
      )}
    </>
  );
};

VariableQueryEditor.displayName = 'VariableQueryEditor';
