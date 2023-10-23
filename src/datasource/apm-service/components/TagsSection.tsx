import React from 'react';
import { SelectableValue } from '@grafana/data';
import { Seg } from './Seg';
import { APMQueryTag } from '../types';
import { toSelectableValue } from '../common/toSelectableValue';
import { adjustOperatorIfNeeded, getCondition, getOperator } from '../common/tagUtils';
import { AddButton } from './AddButton';

type KnownOperator = '=' | '!=' | '<>' | '<' | '>' | '=~' | '!~' | 'in';
const knownOperators: KnownOperator[] = ['=', '!=', '<>', '<', '>', '=~', '!~', 'in'];

type KnownCondition = 'AND' | 'OR';
const knownConditions: KnownCondition[] = ['AND', 'OR'];

const operatorOptions: Array<SelectableValue<KnownOperator>> = knownOperators.map(toSelectableValue);
const condititonOptions: Array<SelectableValue<KnownCondition>> = knownConditions.map(toSelectableValue);

interface Props {
  tags: APMQueryTag[];
  onChange: (tags: APMQueryTag[]) => void;
  getTagKeyOptions: () => Promise<string[]>;
  getTagValueOptions: (key: string) => Promise<string[]>;
}

interface TagProps {
  tag: APMQueryTag;
  isFirst: boolean;
  onRemove: () => void;
  onChange: (tag: APMQueryTag) => void;
  getTagKeyOptions: () => Promise<string[]>;
  getTagValueOptions: (key: string) => Promise<string[]>;
}

const loadConditionOptions = () => Promise.resolve(condititonOptions);

const loadOperatorOptions = () => Promise.resolve(operatorOptions);

const Tag = ({ tag, isFirst, onRemove, onChange, getTagKeyOptions, getTagValueOptions }: TagProps): JSX.Element => {
  const operator = getOperator(tag);
  const condition = getCondition(tag, isFirst);

  const getTagKeySegmentOptions = () => {
    return getTagKeyOptions()
      .catch((err) => {
        // in this UI element we add a special item to the list of options,
        // that is used to remove the element.
        // this causes a problem: if `getTagKeyOptions` fails with an error,
        // the remove-filter option is never added to the list,
        // and the UI element can not be removed.
        // to avoid it, we catch any potential errors coming from `getTagKeyOptions`,
        // log the error, and pretend that the list of options is an empty list.
        // this way the remove-item option can always be added to the list.
        console.error(err);
        return [];
      })
      .then((tags) => [{ label: '-- remove filter --', value: undefined }, ...tags.map(toSelectableValue)]);
  };

  const getTagValueSegmentOptions = () => {
    return getTagValueOptions(tag.key).then((tags) => tags.map(toSelectableValue));
  };

  return (
    <div className="gf-form">
      {condition !== undefined && (
        <Seg
          value={condition}
          loadOptions={loadConditionOptions}
          disabled
          onChange={(v) => {
            onChange({ ...tag, condition: v.value });
          }}
        />
      )}
      <Seg
        allowCustomValue
        value={tag.key}
        loadOptions={getTagKeySegmentOptions}
        onChange={(v) => {
          const { value } = v;
          if (value === undefined) {
            onRemove();
          } else {
            onChange({ ...tag, key: value ?? '' });
          }
        }}
      />
      <Seg
        value={operator}
        loadOptions={loadOperatorOptions}
        onChange={(op) => {
          onChange({ ...tag, operator: op.value });
        }}
      />
      <Seg
        allowCustomValue
        value={tag.value}
        loadOptions={getTagValueSegmentOptions}
        onChange={(v) => {
          const value = v.value ?? '';
          onChange({ ...tag, value, operator: adjustOperatorIfNeeded(operator, value) });
        }}
      />
    </div>
  );
};

export const TagsSection = ({ tags, onChange, getTagKeyOptions, getTagValueOptions }: Props): JSX.Element => {
  const onTagChange = (newTag: APMQueryTag, index: number) => {
    const newTags = tags.map((tag, i) => {
      return index === i ? newTag : tag;
    });
    onChange(newTags);
  };

  const onTagRemove = (index: number) => {
    const newTags = tags.filter((t, i) => i !== index);
    onChange(newTags);
  };

  const getTagKeySegmentOptions = () => {
    return getTagKeyOptions().then((tags) => tags.map(toSelectableValue));
  };

  const addNewTag = (tagKey: string, isFirst: boolean) => {
    const minimalTag: APMQueryTag = {
      key: tagKey,
      value: 'select tag value',
    };

    const newTag: APMQueryTag = {
      key: minimalTag.key,
      value: minimalTag.value,
      operator: getOperator(minimalTag),
      condition: getCondition(minimalTag, isFirst),
    };

    onChange([...tags, newTag]);
  };

  return (
    <>
      {tags.map((t, i) => (
        <Tag
          tag={t}
          isFirst={i === 0}
          key={i}
          onChange={(newT) => {
            onTagChange(newT, i);
          }}
          onRemove={() => {
            onTagRemove(i);
          }}
          getTagKeyOptions={getTagKeyOptions}
          getTagValueOptions={getTagValueOptions}
        />
      ))}
      <AddButton
        allowCustomValue
        loadOptions={getTagKeySegmentOptions}
        onAdd={(v) => {
          addNewTag(v, tags.length === 0);
        }}
      />
    </>
  );
};