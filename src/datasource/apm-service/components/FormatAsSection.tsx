import { Select } from '@grafana/ui';
import { cx } from 'emotion';
import { ResultFormat } from '../types';
import React from 'react';
import { unwrap } from '../common/unwrap';
import { RESULT_FORMATS } from '../common/constants';
import { paddingRightClass } from './styles';

interface Props {
  inputId?: string;
  format: ResultFormat;
  onChange: (newFormat: ResultFormat) => void;
}

const className = cx('width-8', paddingRightClass);

export const FormatAsSection = ({ format, inputId, onChange }: Props): JSX.Element => {
  return (
    <Select<ResultFormat>
      inputId={inputId}
      className={className}
      onChange={(v) => {
        onChange(unwrap(v.value));
      }}
      value={format}
      options={RESULT_FORMATS}
    />
  );
};
