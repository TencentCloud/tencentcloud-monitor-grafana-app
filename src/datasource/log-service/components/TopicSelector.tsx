import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { DescribeRegions, DescribeTopics, Filter, IRegionItem, ITopicIdentifier } from '../common/model';
import { InlineField,   Select, AsyncSelect } from '@grafana/ui';
import {  uuidRegex } from '../common/constants';
import { useEffectOnce } from 'react-use';
import { DataSourceApi, SelectableValue } from '@grafana/data';
import { getStringVariableNameOptions } from '../common/utils';
import { t } from '../../../locale';

interface Props {
  value: ITopicIdentifier;
  onChange: (v: ITopicIdentifier) => void;
  datasource: DataSourceApi;
  /** 组件首次渲染，且未设置地域和日志主题时，默认使用上次编辑的填写的内容 */
  preferLastValue?: boolean;
}

export const TopicSelector: FC<Props> = React.memo((props) => {
  const { value, preferLastValue = true, datasource } = props;

  const onChange = useCallback(
    (v: ITopicIdentifier) => {
      try {
        localStorage.setItem('LogServiceTopicSelectorDefaultValue', JSON.stringify(v));
      } catch (e) {}
      props.onChange(v);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  useEffectOnce(() => {
    if (preferLastValue && !value.region && !value.TopicId) {
      try {
        const lastValue: ITopicIdentifier = JSON.parse(localStorage.getItem('LogServiceTopicSelectorDefaultValue'));
        if (lastValue?.region && lastValue.TopicId) {
          onChange(lastValue);
        }
      } catch (e) {}
    }
  });
  const topicSelectOptionsRef = useRef<SelectableValue<string>>([]);
  const [regionList, setRegionList] = useState<IRegionItem[]>([]);
  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = useCallback(async () => {
    try {
      const { regionList } = await DescribeRegions({ instanceSettings: (datasource as any).instanceSettings });
      setRegionList(regionList);
    } catch (e) {}
  }, []);

  return (
    <>
      <InlineField label={t('region')} labelWidth={20}>
        <Select
          value={value.region}
          onChange={(option) => {
            const region = option.value;
            DescribeTopics({ Limit: 1 }, region, { instanceSettings: (datasource as any).instanceSettings })
              .then((result) => {
                topicSelectOptionsRef.current = result.Topics?.map((item) => ({
                  value: item.TopicId,
                  label: `${item.TopicName} (${item.TopicId})`,
                }));
                onChange({
                  region: option.value,
                  TopicId: result.Topics?.[0]?.TopicId || '',
                });
              })
              .catch((e) => {
                onChange({
                  region: option.value,
                  TopicId: '',
                });
              });
          }}
          menuPlacement="bottom"
          options={[
            ...regionList.map((item) => ({
              label: `${item.area}(${item.regionName})`,
              value: item.region,
            })),
            ...getStringVariableNameOptions()
          ]}
          width={25}
          className="log-service-monospaced-font-family"
        />
      </InlineField>
      <InlineField label={t('log_topic')} labelWidth={20}>
        <AsyncSelect<string>
          // 地域变更时，自动重新出发请求
          key={value.region}
          width={50}
          defaultOptions
          cacheOptions={false}
          loadOptions={async (filterStr) => {
            const filters: Filter[] = [];
            if (filterStr) {
              if (uuidRegex.test(filterStr)) {
                filters.push({ Key: 'topicId', Values: [filterStr] });
              } else {
                filters.push({ Key: 'topicName', Values: [filterStr] });
              }
            }
            const options = await DescribeTopics({ Filters: filters, Limit: 100 }, value.region, {
              instanceSettings: (datasource as any).instanceSettings,
            }).then((result) => {
              return result.Topics.map((item) => ({
                value: item.TopicId,
                label: `${item.TopicName} (${item.TopicId})`,
              }));
            });
            const optionsWithVariables = [
              ...options,
              ...getStringVariableNameOptions().filter((item) => item.value?.includes(filterStr)),
            ];
            topicSelectOptionsRef.current = optionsWithVariables;
            return optionsWithVariables;
          }}
          value={
            topicSelectOptionsRef?.current?.find((item) => item.value === value.TopicId) || {
              value: value.TopicId,
              label: value.TopicId,
            }
          }
          onChange={(e) => {
            onChange({
              region: value.region,
              TopicId: e.value,
            });
          }}
          className="log-service-monospaced-font-family"
        />
      </InlineField>
    </>
  );
});

TopicSelector.displayName = 'TopicSelector';
