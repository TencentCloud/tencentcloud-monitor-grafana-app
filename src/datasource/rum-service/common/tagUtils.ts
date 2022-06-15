import { RUMQueryTag } from '../types';

function isRegex(text: string): boolean {
  return /^\/.*\/$/.test(text);
}

// FIXME: sync these to the query-string-generation-code
// probably it's in rum_query_model.ts
export function getOperator(tag: RUMQueryTag): string {
  return tag.operator ?? (isRegex(tag.value) ? '=~' : '=');
}

// FIXME: sync these to the query-string-generation-code
// probably it's in rum_query_model.ts
export function getCondition(tag: RUMQueryTag, isFirst: boolean): string | undefined {
  return isFirst ? undefined : tag.condition ?? 'AND';
}

export function adjustOperatorIfNeeded(currentOperator: string, newTagValue: string): string {
  const isCurrentOperatorRegex = currentOperator === '=~' || currentOperator === '!~';
  const isNewTagValueRegex = isRegex(newTagValue);

  if (isNewTagValueRegex) {
    return isCurrentOperatorRegex ? currentOperator : '=~';
  } else {
    return isCurrentOperatorRegex ? '=' : currentOperator;
  }
}
