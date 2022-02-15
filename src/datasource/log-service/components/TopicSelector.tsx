import React, { FC, useCallback } from 'react';
import { ITopicIdentifier } from '../common/model';
import { InlineField, InlineFieldRow, Input, Select } from '@grafana/ui';
import { LOG_SERVICE_REGION_OPTIONS } from '../common/constants';
import { useEffectOnce } from 'react-use';

interface Props {
  value: ITopicIdentifier;
  onChange: (v: ITopicIdentifier) => void;
  /** 组件首次渲染，且未设置地域和日志主题时，默认使用上次编辑的填写的内容 */
  preferLastValue?: boolean;
}

export const TopicSelector: FC<Props> = React.memo((props) => {
  const { value, preferLastValue = true } = props;
  const onChange = useCallback(
    (v: ITopicIdentifier) => {
      try {
        sessionStorage.setItem('LogServiceTopicSelectorDefaultValue', JSON.stringify(v));
      } catch (e) {}
      props.onChange(v);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffectOnce(() => {
    if (preferLastValue && !value.region && !value.TopicId) {
      try {
        const lastValue: ITopicIdentifier = JSON.parse(sessionStorage.getItem('LogServiceTopicSelectorDefaultValue'));
        if (lastValue?.region && lastValue.TopicId) {
          onChange(lastValue);
        }
      } catch (e) {}
    }
  });

  return (
    <InlineFieldRow>
      <InlineField label="地域" labelWidth={20}>
        <Select
          value={value.region}
          onChange={(option) => {
            onChange({
              region: option.value,
              TopicId: value.TopicId,
            });
          }}
          allowCustomValue={true}
          menuPlacement="bottom"
          options={
            value.region && !LOG_SERVICE_REGION_OPTIONS.find((item) => item.value === value.region)
              ? [{ label: value.region, value: value.region }, ...LOG_SERVICE_REGION_OPTIONS]
              : LOG_SERVICE_REGION_OPTIONS
          }
          width={25}
          placeholder="请选择"
          className="log-service-monospaced-font-family"
        />
      </InlineField>
      <InlineField label="日志主题ID" labelWidth={20}>
        <Input
          className="log-service-monospaced-font-family"
          value={value.TopicId}
          width={50}
          maxLength={36}
          onChange={(e) => {
            onChange({
              region: value.region,
              TopicId: e.currentTarget.value,
            });
          }}
        />
      </InlineField>
    </InlineFieldRow>
  );
});

TopicSelector.displayName = 'TopicSelector';
