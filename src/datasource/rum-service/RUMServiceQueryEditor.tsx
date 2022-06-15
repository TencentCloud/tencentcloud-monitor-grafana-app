import React, { useMemo, FC } from 'react';
import { css } from 'emotion';
import { QueryEditorProps, GrafanaTheme } from '@grafana/data';
import { InlineLabel, useStyles } from '@grafana/ui';
import { getTemplateSrv } from '@grafana/runtime';
import {
  getAllMeasurementsForTags,
  getAllPolicies,
  getFieldKeysForMeasurement,
  getTagKeysForMeasurementAndTags,
  getTagValues,
} from './RUMMetadataQuery';
import {
  normalizeQuery,
  addNewSelectPart,
  removeSelectPart,
  addNewGroupByPart,
  removeGroupByPart,
  changeSelectPart,
  changeGroupByPart,
} from './queryUtils';
import { getNewSelectPartOptions, getNewGroupByPartOptions, makePartList } from './common/partListUtils';
import { SegmentSection } from './components/SegmentSection';
import { FromSection } from './components/FromSection';
import { TagsSection } from './components/TagsSection';
import { PartListSection } from './components/PartListSection';
import { InputSection } from './components/InputSection';
import { OrderByTimeSection } from './components/OrderByTimeSection';
import { FormatAsSection } from './components/FormatAsSection';
import { useUniqueId } from './common/useUniqueId';
import { DEFAULT_RESULT_FORMAT } from './common/constants';
import { RUMQuery, RUMQueryTag } from './types';
import { defaultQueryInfo, MyDataSourceOptions, QueryInfo } from '../types';
import { clone } from 'lodash';
import { DataSource } from '../DataSource';

type Props = QueryEditorProps<DataSource, QueryInfo, MyDataSourceOptions>;

function getTemplateVariableOptions() {
  return (
    getTemplateSrv()
      .getVariables()
      // we make them regex-params, i'm not 100% sure why.
      // probably because this way multi-value variables work ok too.
      .map((v) => `/^$${v.name}$/`)
  );
}

// helper function to make it easy to call this from the widget-render-code
function withTemplateVariableOptions(optionsPromise: Promise<string[]>): Promise<string[]> {
  return optionsPromise.then((options) => [...getTemplateVariableOptions(), ...options]);
}

function filterTags(parts: RUMQueryTag[], allTagKeys: Set<string>): RUMQueryTag[] {
  return parts.filter((t) => allTagKeys.has(t.key));
}

export const RUMServiceQueryEditor: FC<Props> = React.memo((props: Props) => {
  const uniqueId = useUniqueId();
  const formatAsId = `rum-qe-format-as-${uniqueId}`;
  const orderByTimeId = `rum-qe-order-by${uniqueId}`;

  const styles = useStyles(getStyles);

  const query = normalizeQuery(props.query.RUMServiceParams || clone(defaultQueryInfo.RUMServiceParams));
  const { datasource } = props;
  const { measurement, policy } = query;

  const allTagKeys = useMemo(() => {
    return getTagKeysForMeasurementAndTags(measurement, policy, [], datasource)
      .then((tags) => {
        return new Set(tags);
      })
      .catch((err) => {
        console.error('getTagKeysForMeasurementAndTags', err);
        return new Set('');
      });
  }, [measurement, policy, datasource]);

  const selectLists = useMemo(() => {
    const dynamicSelectPartOptions = new Map([
      [
        'field_0',
        () => {
          return measurement !== undefined
            ? getFieldKeysForMeasurement(measurement, policy, datasource)
            : Promise.resolve([]);
        },
      ],
    ]);
    return (query.select ?? []).map((sel) => makePartList(sel, dynamicSelectPartOptions));
  }, [measurement, policy, query.select, datasource]);

  // the following function is not complicated enough to memoize, but it's result
  // is used in both memoized and un-memoized parts, so we have no choice
  const getTagKeys = useMemo(() => {
    return () =>
      allTagKeys.then((keys) =>
        getTagKeysForMeasurementAndTags(measurement, policy, filterTags(query.tags ?? [], keys), datasource)
      );
  }, [measurement, policy, query.tags, datasource, allTagKeys]);

  const groupByList = useMemo(() => {
    const dynamicGroupByPartOptions = new Map([['tag_0', getTagKeys]]);

    return makePartList(query.groupBy ?? [], dynamicGroupByPartOptions);
  }, [getTagKeys, query.groupBy]);

  const onAppliedChange = (newQuery: RUMQuery) => {
    props.onChange({
      ...props.query,
      RUMServiceParams: newQuery,
    });
    props.onRunQuery();
  };
  const handleFromSectionChange = (p: string | undefined, m: string | undefined) => {
    onAppliedChange({
      ...query,
      policy: p,
      measurement: m,
    });
  };

  const handleTagsSectionChange = (tags: RUMQueryTag[]) => {
    // we set empty-arrays to undefined
    onAppliedChange({
      ...query,
      tags: tags.length === 0 ? undefined : tags,
    });
  };

  return (
    <div>
      <SegmentSection label="FROM" fill={true}>
        <FromSection
          policy={policy}
          measurement={measurement}
          getPolicyOptions={() => getAllPolicies(datasource)}
          getMeasurementOptions={(filter) =>
            withTemplateVariableOptions(
              allTagKeys.then((keys) =>
                getAllMeasurementsForTags(
                  filter === '' ? undefined : filter,
                  filterTags(query.tags ?? [], keys),
                  datasource
                )
              )
            )
          }
          onChange={handleFromSectionChange}
        />
        <InlineLabel width="auto" className={styles.inlineLabel}>
          WHERE
        </InlineLabel>
        <TagsSection
          tags={query.tags ?? []}
          onChange={handleTagsSectionChange}
          getTagKeyOptions={getTagKeys}
          getTagValueOptions={(key: string) =>
            withTemplateVariableOptions(
              allTagKeys.then((keys) =>
                getTagValues(key, measurement, policy, filterTags(query.tags ?? [], keys), datasource)
              )
            )
          }
        />
      </SegmentSection>
      {selectLists.map((sel, index) => (
        <SegmentSection key={index} label={index === 0 ? 'SELECT' : ''} fill={true}>
          <PartListSection
            parts={sel}
            getNewPartOptions={() => Promise.resolve(getNewSelectPartOptions())}
            onChange={(partIndex, newParams) => {
              const newQuery = changeSelectPart(query, index, partIndex, newParams);
              onAppliedChange(newQuery);
            }}
            onAddNewPart={(type) => {
              onAppliedChange(addNewSelectPart(query, type, index));
            }}
            onRemovePart={(partIndex) => {
              onAppliedChange(removeSelectPart(query, partIndex, index));
            }}
          />
        </SegmentSection>
      ))}
      <SegmentSection label="GROUP BY" fill={true}>
        <PartListSection
          parts={groupByList}
          getNewPartOptions={() => getNewGroupByPartOptions(query, getTagKeys)}
          onChange={(partIndex, newParams) => {
            const newQuery = changeGroupByPart(query, partIndex, newParams);
            onAppliedChange(newQuery);
          }}
          onAddNewPart={(type) => {
            onAppliedChange(addNewGroupByPart(query, type));
          }}
          onRemovePart={(partIndex) => {
            onAppliedChange(removeGroupByPart(query, partIndex));
          }}
        />
      </SegmentSection>
      <SegmentSection label="TIMEZONE" fill={true}>
        <InputSection
          placeholder="(optional)"
          value={query.tz}
          onChange={(tz) => {
            onAppliedChange({ ...query, tz });
          }}
        />
        <InlineLabel htmlFor={orderByTimeId} width="auto" className={styles.inlineLabel}>
          ORDER BY TIME
        </InlineLabel>
        <OrderByTimeSection
          inputId={orderByTimeId}
          value={query.orderByTime === 'DESC' ? 'DESC' : 'ASC' /* FIXME: make this shared with RUM_query_model */}
          onChange={(v) => {
            onAppliedChange({ ...query, orderByTime: v });
          }}
        />
      </SegmentSection>
      <SegmentSection label="LIMIT" fill={true}>
        <InputSection
          placeholder="(optional)"
          value={query.limit?.toString()}
          onChange={(limit) => {
            onAppliedChange({ ...query, limit });
          }}
        />
        <InlineLabel width="auto" className={styles.inlineLabel}>
          SLIMIT
        </InlineLabel>
        <InputSection
          placeholder="(optional)"
          value={query.slimit?.toString()}
          onChange={(slimit) => {
            onAppliedChange({ ...query, slimit });
          }}
        />
      </SegmentSection>
      <SegmentSection htmlFor={formatAsId} label="FORMAT AS" fill={true}>
        <FormatAsSection
          inputId={formatAsId}
          format={query.resultFormat ?? DEFAULT_RESULT_FORMAT}
          onChange={(format) => {
            onAppliedChange({ ...query, resultFormat: format });
          }}
        />
        {query.resultFormat !== 'table' && (
          <>
            <InlineLabel width="auto" className={styles.inlineLabel}>
              ALIAS
            </InlineLabel>
            <InputSection
              isWide
              placeholder="Naming pattern"
              value={query.alias}
              onChange={(alias) => {
                onAppliedChange({ ...query, alias });
              }}
            />
          </>
        )}
      </SegmentSection>
    </div>
  );
});

function getStyles(theme: GrafanaTheme) {
  return {
    inlineLabel: css`
      color: #33a2e5;
    `,
  };
}

RUMServiceQueryEditor.displayName = 'RUMServiceQueryEditor';
