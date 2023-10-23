import { map, find, filter, indexOf, cloneDeep } from 'lodash';
import queryPart from './query_part';
import kbn from 'grafana/app/core/utils/kbn';
import { APMQuery, APMQueryTag } from './types';
import { ScopedVars } from '@grafana/data';
import { TemplateSrv } from '@grafana/runtime';
import { defaultQueryInfo } from '../types';

export default class APMQueryModel {
  target: APMQuery;
  selectModels: any[] = [];
  queryBuilder: any;
  groupByParts: any;
  templateSrv: any;
  scopedVars: any;
  refId?: string;

  /** @ngInject */
  constructor(target: APMQuery, templateSrv?: TemplateSrv, scopedVars?: ScopedVars) {
    this.target = target;
    this.templateSrv = templateSrv;
    this.scopedVars = scopedVars;

    target.policy = target.policy || defaultQueryInfo.APMServiceParams.policy;
    target.resultFormat = target.resultFormat || defaultQueryInfo.APMServiceParams.resultFormat;
    target.orderBy = target.orderBy || defaultQueryInfo.APMServiceParams.orderBy;
    target.orderType = target.orderType || defaultQueryInfo.APMServiceParams.orderType;
    target.tags = target.tags || cloneDeep(defaultQueryInfo.APMServiceParams.tags);
    target.groupBy = target.groupBy || cloneDeep(defaultQueryInfo.APMServiceParams.groupBy);
    target.select = target.select || cloneDeep(defaultQueryInfo.APMServiceParams.select);

    this.updateProjection();
  }

  updateProjection() {
    this.selectModels = map(this.target.select, (parts: any) => {
      return map(parts, queryPart.create);
    });
    this.groupByParts = map(this.target.groupBy, queryPart.create);
  }

  updatePersistedParts() {
    this.target.select = map(this.selectModels, (selectParts) => {
      return map(selectParts, (part: any) => {
        return { type: part.def.type, params: part.params };
      });
    });
  }

  hasGroupByTime() {
    return find(this.target.groupBy, (g: any) => g.type === 'time');
  }

  hasFill() {
    return find(this.target.groupBy, (g: any) => g.type === 'fill');
  }

  addGroupBy(value: string) {
    let stringParts = value.match(/^(\w+)\((.*)\)$/);

    if (!stringParts || !this.target.groupBy) {
      return;
    }

    const typePart = stringParts[1];
    const arg = stringParts[2];
    const partModel = queryPart.create({ type: typePart, params: [arg] });
    const partCount = this.target.groupBy.length;

    if (partCount === 0) {
      this.target.groupBy.push(partModel.part);
    } else if (typePart === 'time') {
      this.target.groupBy.splice(0, 0, partModel.part);
    } else if (typePart === 'tag') {
      if (this.target.groupBy[partCount - 1].type === 'fill') {
        this.target.groupBy.splice(partCount - 1, 0, partModel.part);
      } else {
        this.target.groupBy.push(partModel.part);
      }
    } else {
      this.target.groupBy.push(partModel.part);
    }

    this.updateProjection();
  }

  removeGroupByPart(part: { def: { type: string } }, index: number) {
    const categories = queryPart.getCategories();

    if (part.def.type === 'time') {
      // remove fill
      this.target.groupBy = filter(this.target.groupBy, (g: any) => g.type !== 'fill');
      // remove aggregations
      this.target.select = map(this.target.select, (s: any) => {
        return filter(s, (part: any) => {
          const partModel = queryPart.create(part);
          if (partModel.def.category === categories.Aggregations) {
            return false;
          }
          if (partModel.def.category === categories.Selectors) {
            return false;
          }
          return true;
        });
      });
    }

    this.target.groupBy!.splice(index, 1);
    this.updateProjection();
  }

  removeSelect(index: number) {
    this.target.select!.splice(index, 1);
    this.updateProjection();
  }

  removeSelectPart(selectParts: any[], part: any) {
    // if we remove the field remove the whole statement
    if (part.def.type === 'field') {
      if (this.selectModels.length > 1) {
        const modelsIndex = indexOf(this.selectModels, selectParts);
        this.selectModels.splice(modelsIndex, 1);
      }
    } else {
      const partIndex = indexOf(selectParts, part);
      selectParts.splice(partIndex, 1);
    }

    this.updatePersistedParts();
  }

  addSelectPart(selectParts: any[], type: string) {
    const partModel = queryPart.create({ type: type });
    partModel.def.addStrategy(selectParts, partModel, this);
    this.updatePersistedParts();
  }

  getMeasurementAndPolicy(interpolate: any) {
    let policy = this.target.policy;
    let measurement = this.target.measurement || 'measurement';

    if (!measurement.match('^/.*/$')) {
      measurement = '"' + measurement + '"';
    } else if (interpolate) {
      measurement = this.templateSrv.replace(measurement, this.scopedVars, 'regex');
    }

    if (policy !== 'default') {
      policy = '"' + this.target.policy + '".';
    } else {
      policy = '';
    }

    return policy + measurement;
  }

  interpolateQueryStr(value: any[], variable: { multi: any; includeAll: any }, defaultFormatFn: any) {
    // if no multi or include all do not regexEscape
    if (!variable.multi && !variable.includeAll) {
      return value;
    }

    if (typeof value === 'string') {
      return kbn.regexEscape(value);
    }

    const escapedValues = map(value, kbn.regexEscape);
    return '(' + escapedValues.join('|') + ')';
  }

  render(interpolate?: boolean) {
    const target = this.target;

    if (target.rawQuery) {
      if (interpolate) {
        return this.templateSrv.replace(target.query, this.scopedVars, this.interpolateQueryStr);
      } else {
        return target.query;
      }
    }

    let query = 'select ';
    let i;
    let y;
    // 自定义特殊处理
    if (this.selectModels[0][1]?.part.type === 'custom') {
      query += this.selectModels[0][0].params[0];
    } else {
      for (i = 0; i < this.selectModels?.length; i++) {
        const parts = this.selectModels[i];
        let selectText = '';
        for (y = 0; y < parts.length; y++) {
          const part = parts[y];
          selectText = part.render(selectText);
        }

        if (i > 0) {
          query += ', ';
        }
        query += selectText;
      }
    }

    query += ' from ' + this.getMeasurementAndPolicy(interpolate) + ' where ';
    const conditions = map(target.tags, (tag, index) => {
      return this.renderTagCondition(tag, index, interpolate);
    });

    if (conditions.length > 0) {
      query += '(' + conditions.join(' ') + ') and ';
    }

    query += '$timeFilter';

    let groupBySection = '';
    const len = this.groupByParts.length;
    let groupByParts = this.groupByParts;
    if (len > 2) {
      groupByParts = this.groupByParts.filter((item) => item.def.type !== 'time');
    }
    for (i = 0; i < groupByParts.length; i++) {
      const part = groupByParts[i];
      if (i > 0) {
        // for some reason fill has no separator
        groupBySection += part.def.type === 'fill' ? ' ' : ', ';
      }
      groupBySection += part.render('');
    }

    if (groupBySection.length) {
      query += ' group by ' + groupBySection;
    }

    if (target.fill) {
      query += ' fill(' + target.fill + ')';
    }
    if (target.orderType) {
      query += ' order by ' + target.orderType;
    }
    if (target.orderBy) {
      query += ' ' + target.orderBy;
    }

    if (target.limit) {
      query += ' limit ' + target.limit;
    }

    if (target.slimit) {
      query += ' slimit ' + target.slimit;
    }

    if (target.tz) {
      query += " tz('" + target.tz + "')";
    }

    return query;
  }

  renderAdhocFilters(filters: any[]) {
    const conditions = map(filters, (tag, index) => {
      return this.renderTagCondition(tag, index, true);
    });
    return conditions.join(' ');
  }

  private renderTagCondition(tag: APMQueryTag, index: number, interpolate?: boolean) {
    // FIXME: merge this function with query_builder/renderTagCondition
    let str = '';
    let operator = tag.operator;
    let value = tag.value;
    if (index > 0) {
      str = (tag.condition.toLowerCase() || 'and') + ' ';
    }

    if (!operator) {
      if (/^\/.*\/$/.test(value)) {
        operator = '=~';
      } else {
        operator = '=';
      }
    }

    // quote value unless regex
    if (operator !== '=~' && operator !== '!~') {
      if (interpolate) {
        value = this.templateSrv.replace(value, this.scopedVars);
      }
      if (operator !== '>' && operator !== '<') {
        value = "'" + value.replace(/\\/g, '\\\\').replace(/\'/g, "\\'") + "'";
      }
      if (operator === 'in') {
        value = '(' + value + ')';
      }
    } else if (interpolate) {
      value = this.templateSrv.replace(value, this.scopedVars, 'regex');
    }

    return str + '"' + tag.key + '" ' + operator + ' ' + value;
  }
}
