import { cloneDeep } from 'lodash';
import APMQueryModel from './APM_query_model';
import { APMQuery } from './types';

export function normalizeQuery(query: APMQuery): APMQuery {
  // we return the original query if there is no need to update it
  if (
    query.policy !== undefined &&
    query.resultFormat !== undefined &&
    query.orderBy !== undefined &&
    query.tags !== undefined &&
    query.groupBy !== undefined &&
    query.select !== undefined
  ) {
    return query;
  }

  // FIXME: we should move the whole normalizeQuery logic here,
  // and then have APMQueryModel call this function,
  // to concentrate the whole logic here

  const queryCopy = cloneDeep(query); // the query-model mutates the query
  return new APMQueryModel(queryCopy).target;
}

export function addNewSelectPart(query: APMQuery, type: string, index: number): APMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new APMQueryModel(queryCopy);
  model.addSelectPart(model.selectModels[index], type);
  return model.target;
}

export function removeSelectPart(query: APMQuery, partIndex: number, index: number): APMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new APMQueryModel(queryCopy);
  const selectModel = model.selectModels[index];
  model.removeSelectPart(selectModel, selectModel[partIndex]);
  return model.target;
}

export function changeSelectPart(query: APMQuery, listIndex: number, partIndex: number, newParams: string[]): APMQuery {
  // we need to make shallow copy of `query.select` down to `query.select[listIndex][partIndex]`
  const newSel = [...(query.select ?? [])];
  newSel[listIndex] = [...newSel[listIndex]];
  newSel[listIndex][partIndex] = {
    ...newSel[listIndex][partIndex],
    params: newParams,
  };
  return { ...query, select: newSel };
}

export function addNewGroupByPart(query: APMQuery, type: string): APMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new APMQueryModel(queryCopy);
  model.addGroupBy(type);
  return model.target;
}

export function removeGroupByPart(query: APMQuery, partIndex: number): APMQuery {
  const queryCopy = cloneDeep(query); // the query-model mutates the query
  const model = new APMQueryModel(queryCopy);
  model.removeGroupByPart(model.groupByParts[partIndex], partIndex);
  return model.target;
}

export function changeGroupByPart(query: APMQuery, partIndex: number, newParams: string[]): APMQuery {
  // we need to make shallow copy of `query.groupBy` down to `query.groupBy[partIndex]`
  const newGroupBy = [...(query.groupBy ?? [])];
  newGroupBy[partIndex] = {
    ...newGroupBy[partIndex],
    params: newParams,
  };
  return { ...query, groupBy: newGroupBy };
}
