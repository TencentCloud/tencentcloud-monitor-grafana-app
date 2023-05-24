import _ from 'lodash';
import {
  WAFInstanceAliasList,
  WAFInvalidDemensions,
  templateQueryIdMap,
  namespace,
  regionSupported,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import { t } from '../../../locale';

export default class CDNDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = WAFInstanceAliasList;
  InvalidDimensions = WAFInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  InstanceReqConfig = {
    // service: 'waf',
    action: 'DescribeDomains',
    responseField: 'Domains',
  };
  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }
  async metricFindQuery(query: any, regex?: string) {
    return super.metricFindQuery({ ...query, ...{ region: 'ap-guangzhou' } }, regex);
  }

  getOwnDimenion(dimensionObject: any) {
    return {
      ...dimensionObject,
      edition: {
        Name: 'edition',
        Value: 0,
      },
    };
  }
}
