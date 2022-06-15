import { InlineField, InlineFieldRow, Input, RadioButtonGroup } from '@grafana/ui';
import React, { useCallback } from 'react';
import { defaultQueryInfo, ServiceType, ServiceTypeOptions, VariableQuery } from './types';
import { DataSource } from './DataSource';
import { LogServiceQueryEditor } from './log-service/LogServiceQueryEditor';
import { useLatest } from 'react-use';
import { clone, isString } from 'lodash';

interface VariableQueryProps {
  query: VariableQuery;
  onChange: (v: VariableQuery, definition: string) => void;
  datasource: DataSource;
}

const InfoPopver: React.FC<any> = () => {
  return (
    <a target="_blank" href="https://cloud.tencent.com/document/product/248/54510">
      Click here for more information of query
    </a>
  );
};
export const VariableQueryEditor: React.FC<VariableQueryProps> = (props) => {
  const propsRef = useLatest(props);
  const { query, datasource } = props;

  const onQueryChange = useCallback(
    (newQuery: VariableQuery) => {
      const { onChange } = propsRef.current;
      let definition;
      if (newQuery.serviceType === ServiceType.logService) {
        definition = `SQL:  ${newQuery.logServiceParams?.Query}`;
      } else {
        definition = newQuery.queryString;
      }
      onChange?.(newQuery, definition);
    },
    [propsRef]
  );
  return (
    <>
      <InlineFieldRow>
        <InlineField label="服务类型" labelWidth={20}>
          <RadioButtonGroup
            options={ServiceTypeOptions}
            value={isString(query) ? ServiceType.monitor : query.serviceType}
            onChange={(type) => {
              if (type === ServiceType.monitor) {
                onQueryChange({
                  serviceType: type,
                  queryString: '',
                });
              }
              if (type === ServiceType.logService){
                onQueryChange({
                  serviceType: type,
                  queryString: '',
                  logServiceParams: clone(defaultQueryInfo.logServiceParams),
                });
              }
              if (type === ServiceType.RUMService) {
                onQueryChange({
                  serviceType: type,
                  queryString: '',
                });
              }
            }}
          />
        </InlineField>
      </InlineFieldRow>
      {query.serviceType === ServiceType.logService && (
        <>
          {/* 复用编辑模式的日志主题输入组件 */}
          <LogServiceQueryEditor
            datasource={datasource}
            query={query as unknown as any}
            onRunQuery={() => {}}
            onChange={(v) => {
              onQueryChange({
                serviceType: ServiceType.logService,
                queryString: '',
                logServiceParams: v.logServiceParams,
              });
            }}
          />
        </>
      )}
      {query.serviceType === ServiceType.RUMService && (
        <InlineFieldRow>
          <InlineField label="查询语句" labelWidth={20} grow tooltip={InfoPopver}>
            <Input
              name="query"
              required
              placeholder="metric name or tags query"
              onChange={(e) => onQueryChange({
                serviceType: ServiceType.RUMService,
                queryString: e.currentTarget.value
              })}
              value={isString(query) ? query : query.queryString}
            />
          </InlineField>
        </InlineFieldRow>
      )}
      {(isString(query) || query.serviceType === ServiceType.monitor) && (
        <InlineFieldRow>
          <InlineField label="查询语句" labelWidth={20} grow tooltip={InfoPopver}>
            <Input
              name="query"
              required
              onChange={(e) => onQueryChange({
                serviceType: ServiceType.monitor,
                queryString: e.currentTarget.value
              })}
              value={isString(query) ? query : query.queryString}
            />
          </InlineField>
        </InlineFieldRow>
      )}
    </>
  );
};
VariableQueryEditor.displayName = 'VariableQueryEditor';
