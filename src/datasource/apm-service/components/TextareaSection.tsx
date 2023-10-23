import React from 'react';
import { cx } from 'emotion';
import { TextArea } from '@grafana/ui';
import { useShadowedState } from '../common/useShadowedState';
import { paddingRightClass } from './styles';

interface Props {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
}

export const TextareaSection = ({ value, onChange, placeholder }: Props): JSX.Element => {
  const [currentValue, setCurrentValue] = useShadowedState(value);

  const onBlur = () => {
    // we send empty-string as undefined
    const newValue = currentValue === '' ? undefined : currentValue;
    onChange(newValue);
  };

  return (
    <TextArea
      placeholder={placeholder}
      className={cx(paddingRightClass)}
      type="text"
      spellCheck={false}
      onBlur={onBlur}
      onChange={(e) => {
        setCurrentValue(e.currentTarget.value);
      }}
      value={currentValue ?? ''}
    />
  );
};
