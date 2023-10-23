import { reduce } from 'lodash';
import kbn from 'grafana/app/core/utils/kbn';

function renderTagCondition(tag: { operator: any; value: string; condition: any; key: string }, index: number) {
  // FIXME: merge this function with APM_query_model/renderTagCondition
  let str = '';
  let operator = tag.operator;
  let value = tag.value;
  if (index > 0) {
    str = (tag.condition.toLowerCase() || 'AND') + ' ';
  }

  if (!operator) {
    if (/^\/.*\/$/.test(tag.value)) {
      operator = '=~';
    } else {
      operator = '=';
    }
  }

  // quote value unless regex or number, or if empty-string
  if (value === '' || (operator !== '=~' && operator !== '!~')) {
    value = "'" + value.replace(/\\/g, '\\\\').replace(/\'/g, "\\'") + "'";
  }

  return str + '"' + tag.key + '" ' + operator + ' ' + value;
}

export class APMQueryBuilder {
  // eslint-disable-next-line @typescript-eslint/no-parameter-properties
  constructor(private target: { measurement: any; tags: any; policy?: any }, private database?: string) {}

  buildExploreQuery(type: string, withKey?: string, withMeasurementFilter?: string): string {
    let query = '';
    let measurement;
    let policy;

    if (type === 'TAG_KEYS') {
      query = 'show tag keys';
      measurement = this.target.measurement;
      policy = this.target.policy;
    } else if (type === 'TAG_VALUES') {
      query = 'show tag values';
      measurement = this.target.measurement;
      policy = this.target.policy;
    } else if (type === 'MEASUREMENTS') {
      query = 'show measurements';
      if (withMeasurementFilter) {
        // we do a case-insensitive regex-based lookup
        query += ' with measurement =~ /(?i)' + kbn.regexEscape(withMeasurementFilter) + '/';
      }
    } else if (type === 'FIELDS') {
      measurement = this.target.measurement;
      policy = this.target.policy;

      if (!measurement.match('^/.*/')) {
        measurement = '"' + measurement + '"';

        if (policy && policy !== 'default') {
          policy = '"' + policy + '"';
          measurement = policy + '.' + measurement;
        }
      }

      return 'show field keys from ' + measurement;
    } else if (type === 'RETENTION POLICIES') {
      query = 'show retention policies on "' + this.database + '"';
      return query;
    }

    if (measurement) {
      if (!measurement.match('^/.*/') && !measurement.match(/^merge\(.*\)/)) {
        measurement = '"' + measurement + '"';
      }

      if (policy && policy !== 'default') {
        policy = '"' + policy + '"';
        measurement = policy + '.' + measurement;
      }

      query += ' from ' + measurement;
    }

    if (withKey) {
      query += ' with key = "' + withKey + '"';
    }

    if (this.target.tags && this.target.tags.length > 0) {
      const whereConditions = reduce(
        this.target.tags,
        (memo, tag) => {
          if (type === 'MEASUREMENTS' && tag.key === 'id') {
            return memo;
          }
          // do not add a condition for the key we want to explore for
          if (tag.key === withKey) {
            return memo;
          }

          // value operators not supported in these types of queries
          if (tag.operator === '>' || tag.operator === '<') {
            return memo;
          }

          memo.push(renderTagCondition(tag, memo.length));
          return memo;
        },
        [] as string[]
      );

      if (whereConditions.length > 0) {
        query += ' where ' + whereConditions.join(' ');
      }
    }

    if (type === 'MEASUREMENTS') {
      query += ' limit 100';
      // Solve issue #2524 by limiting the number of measurements returned
      // LIMIT must be after WITH MEASUREMENT and WHERE clauses
      // This also could be used for TAG KEYS and TAG VALUES, if desired
    }

    return query;
  }
}
