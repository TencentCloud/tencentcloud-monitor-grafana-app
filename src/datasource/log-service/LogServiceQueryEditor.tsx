import { DataSourceApi, QueryEditorProps } from '@grafana/data';
import { defaultQueryInfo, MyDataSourceOptions, QueryInfo, queryInfoRuntime } from '../types';
import React, { FC, useCallback } from 'react';
import { useLatest } from 'react-use';
import {InlineField, InlineLabel, QueryField, Select, InlineFieldRow, Input} from '@grafana/ui';
import { TopicSelector } from './components/TopicSelector';
import { TcDataSourceId } from '../common/constants';
import { t } from '../../locale';
import _ from 'lodash';
import './index.less';
import {SearchSyntaxRule} from "./common/constants";

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
      <InlineFieldRow>
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
      <InlineField label={t('syntax_rule')} labelWidth={20}>
        <Select
          value={logServiceParams.SyntaxRule}
          onChange={(v) => {
            partialOnChange({
              logServiceParams: {
                ...(propsRef.current?.query?.logServiceParams || ({} as any)),
                SyntaxRule: v.value,
              },
            });
          }
        }
          menuPlacement="bottom"
          options={[
            {
              label: 'Lucene',
              value: SearchSyntaxRule.LUCENE
            },
            {
              label: 'CQL',
              value: SearchSyntaxRule.CQL
            },
          ]}
          width={25}
          className="log-service-monospaced-font-family"
        />
      </InlineField>
      </InlineFieldRow>

      <MaxResultNumInput
        value={logServiceParams.MaxResultNum}
        onChange={(val) => {
          partialOnChange({
            logServiceParams: {
              ...(propsRef.current?.query?.logServiceParams || ({} as any)),
              MaxResultNum: val
            },
          })
        }}
      />

      <div style={{ display: 'flex' }}>
        <InlineLabel width={20}>{t('search_statement')}</InlineLabel>
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

interface MaxResultNumInputProps  {
  value: string | number;
  onChange: (value: number | undefined) => void
}


const MaxResultNumInput: FC<MaxResultNumInputProps> = React.memo((props) => {
  const min = 1
  const max = 1000
  const { value,onChange:onChangeFromProps } = props

  const onInputChange = useCallback((e)=>{
    const currVal = Number(e.currentTarget.value) || undefined
    onChangeFromProps(currVal)

  },[onChangeFromProps]);

  return (
    // @ts-ignore  这里报error属性不存在，但应该是存在的。
    <InlineField label={t('max_result_num')} labelWidth={20} invalid={value < min || value > max} error='仅支持返回1～1000条日志'>
      <Input
        type='number'
        min={min}
        max={max}
        value={value}
        onChange={onInputChange}
        width={25}
        className="log-service-monospaced-font-family"
      />
    </InlineField>
  )
})
