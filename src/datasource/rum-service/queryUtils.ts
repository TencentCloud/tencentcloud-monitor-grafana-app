import { cloneDeep } from 'lodash';
import RUMQueryModel from './RUM_query_model';
import { RUMQuery } from './types';

export function normalizeQuery(query: RUMQuery): RUMQuery {
  // we return the original query if there is no need to update it
  if (
    query.policy !== undefined &&
    query.resultFormat !== undefined &&
    query.orderByTime !== undefined &&
    query.tags !== undefined &&
    query.groupBy !== undefined &&
    query.select !== undefined
  ) {
    return query;
  }

  // FIXME: we should move the whole normalizeQuery logic here,
  // and then have RUMQueryModel call this function,
  // to concentrate the whole logic here

  const queryCopy = cloneDeep(query); // the query-model mutates the query
  return new RUMQueryModel(queryCopy).target;
}

export function addNewSelectPart(query: RUMQuery, type: string, index: number): RUMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new RUMQueryModel(queryCopy);
  model.addSelectPart(model.selectModels[index], type);
  return model.target;
}

export function removeSelectPart(query: RUMQuery, partIndex: number, index: number): RUMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new RUMQueryModel(queryCopy);
  const selectModel = model.selectModels[index];
  model.removeSelectPart(selectModel, selectModel[partIndex]);
  return model.target;
}

export function changeSelectPart(
  query: RUMQuery,
  listIndex: number,
  partIndex: number,
  newParams: string[]
): RUMQuery {
  // we need to make shallow copy of `query.select` down to `query.select[listIndex][partIndex]`
  const newSel = [...(query.select ?? [])];
  newSel[listIndex] = [...newSel[listIndex]];
  newSel[listIndex][partIndex] = {
    ...newSel[listIndex][partIndex],
    params: newParams,
  };
  return { ...query, select: newSel };
}

export function addNewGroupByPart(query: RUMQuery, type: string): RUMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new RUMQueryModel(queryCopy);
  model.addGroupBy(type);
  return model.target;
}

export function removeGroupByPart(query: RUMQuery, partIndex: number): RUMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new RUMQueryModel(queryCopy);
  model.removeGroupByPart(model.groupByParts[partIndex], partIndex);
  return model.target;
}

export function changeGroupByPart(query: RUMQuery, partIndex: number, newParams: string[]): RUMQuery {
  // we need to make shallow copy of `query.groupBy` down to `query.groupBy[partIndex]`
  const newGroupBy = [...(query.groupBy ?? [])];
  newGroupBy[partIndex] = {
    ...newGroupBy[partIndex],
    params: newParams,
  };
  return { ...query, groupBy: newGroupBy };
}
