import { APMQueryTag } from './types';
import { APMQueryBuilder } from './query_builder';
import { ServiceType } from '../types';
import { DataSource } from '../DataSource';

const runExploreQuery = (
  type: string,
  withKey: string | undefined,
  withMeasurementFilter: string | undefined,
  target: { measurement: string | undefined; tags: APMQueryTag[]; policy: string | undefined },
  datasource: DataSource
): Promise<Array<{ text: string }>> => {
  const builder = new APMQueryBuilder(target);
  const q = builder.buildExploreQuery(type, withKey, withMeasurementFilter);
  return datasource.metricFindQuery(
    {
      serviceType: ServiceType.APMService,
      queryString: q,
    },
    undefined
  );
};

export async function getAllPolicies(datasource: DataSource): Promise<string[]> {
  const target = { tags: [], measurement: undefined, policy: undefined };
  const data = await runExploreQuery('RETENTION POLICIES', undefined, undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getAllMeasurementsForTags(
  measurementFilter: string | undefined,
  tags: APMQueryTag[],
  datasource: DataSource
): Promise<string[]> {
  const target = { tags, measurement: undefined, policy: undefined };
  const data = await runExploreQuery('MEASUREMENTS', undefined, measurementFilter, target, datasource);
  return data.map((item) => item.text);
}

export async function getTagKeysForMeasurementAndTags(
  measurement: string | undefined,
  policy: string | undefined,
  tags: APMQueryTag[],
  datasource: DataSource
): Promise<string[]> {
  const target = { tags, measurement, policy };
  const data = await runExploreQuery('TAG_KEYS', undefined, undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getTagValues(
  tagKey: string,
  measurement: string | undefined,
  policy: string | undefined,
  tags: APMQueryTag[],
  datasource: DataSource
): Promise<string[]> {
  const target = { tags, measurement, policy };
  const data = await runExploreQuery('TAG_VALUES', tagKey, undefined, target, datasource);
  return data.map((item) => item.text);
}

export async function getFieldKeysForMeasurement(
  measurement: string,
  policy: string | undefined,
  datasource: DataSource
): Promise<string[]> {
  const target = { tags: [], measurement, policy };
  const data = await runExploreQuery('FIELDS', undefined, undefined, target, datasource);
  return data.map((item) => item.text);
}
