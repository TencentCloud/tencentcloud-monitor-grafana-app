import { APMQuery, APMQueryPart } from '../types';
import { SelectableValue } from '@grafana/data';
import { PartParams } from '../components/PartListSection';
import APMQueryModel from '../APM_query_model';
import { unwrap } from './unwrap';
import queryPart, { QueryPartDef } from '../query_part';
import { toSelectableValue } from './toSelectableValue';

type Categories = Record<string, QueryPartDef[]>;

export function getNewSelectPartOptions(): SelectableValue[] {
  const categories: Categories = queryPart.getCategories();
  const options: SelectableValue[] = [];

  const keys = Object.keys(categories);

  keys.forEach((key) => {
    const children: SelectableValue[] = categories[key].map((x) => toSelectableValue(x.type));

    options.push({
      label: key,
      options: children,
    });
  });

  return options;
}

export async function getNewGroupByPartOptions(
  query: APMQuery,
  getTagKeys: () => Promise<string[]>
): Promise<Array<SelectableValue<string>>> {
  const tagKeys = await getTagKeys();
  const queryCopy = { ...query }; // the query-model mutates the query
  const model = new APMQueryModel(queryCopy);
  const options: Array<SelectableValue<string>> = [];
  if (!model.hasFill()) {
    options.push(toSelectableValue('fill(null)'));
  }
  if (!model.hasGroupByTime()) {
    options.push(toSelectableValue('time($interval)'));
  }
  tagKeys.forEach((key) => {
    options.push(toSelectableValue(`tag(${key})`));
  });
  return options;
}

interface Part {
  name: string;
  params: PartParams;
}

function getPartParams(part: APMQueryPart, dynamicParamOptions: Map<string, () => Promise<string[]>>): PartParams {
  // NOTE: the way the system is constructed,
  // there always can only be one possible dynamic-lookup
  // field. in case of select it is the field,
  // in case of group-by it is the tag
  const def = queryPart.create(part).def;

  // we switch the numbers to strings, it will work that way too,
  // and it makes the code simpler
  const paramValues = (part.params ?? []).map((p) => p.toString());

  if (paramValues.length !== def.params.length) {
    throw new Error('Invalid query-segment');
  }

  return paramValues.map((val, index) => {
    const defParam = def.params[index];
    if (defParam.dynamicLookup) {
      return {
        value: val,
        options: unwrap(dynamicParamOptions.get(`${def.type}_${index}`)),
      };
    }

    if (defParam.options !== null || defParam.options !== undefined) {
      return {
        value: val,
        options: () => Promise.resolve(defParam.options),
      };
    }

    return {
      value: val,
      options: null,
    };
  });
}

export function makePartList(
  queryParts: APMQueryPart[],
  dynamicParamOptions: Map<string, () => Promise<string[]>>
): Part[] {
  return queryParts.map((qp) => {
    return {
      name: qp.type,
      params: getPartParams(qp, dynamicParamOptions),
    };
  });
}
