import React from 'react';
import { cx } from 'emotion';
import { SelectableValue } from '@grafana/data';
import { unwrap } from '../common/unwrap';
import { Select } from '@grafana/ui';
import { paddingRightClass } from './styles';

// type Mode = 'string';

const OPTIONS: Array<SelectableValue<string>> = [
  { label: 'ascending', value: 'ASC' },
  { label: 'descending', value: 'DESC' },
  { label: 'service_duration_avg', value: 'service_duration_avg' },
];

const className = cx('width-9', paddingRightClass);

interface Props {
  value: string;
  onChange: (value: string) => void;
  inputId?: string;
}

export const OrderByTimeSection = ({ value, onChange, inputId }: Props): JSX.Element => {
  return (
    <Select<string>
      inputId={inputId}
      className={className}
      onChange={(v) => {
        onChange(unwrap(v.value));
      }}
      value={value}
      options={OPTIONS}
    />
  );
};
