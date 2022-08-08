import {
  CLSInstanceAliasList,
  CLSInvalidDemensions,
  namespace,
  templateQueryIdMap,
  regionSupported,
  modifyDimensons,
} from './query_def';
import { BaseDatasource } from '../_base/datasource';
import _ from 'lodash';
import { t } from '../../../locale';

export default class DCDatasource extends BaseDatasource {
  Namespace = namespace;
  InstanceAliasList = CLSInstanceAliasList;
  InvalidDimensions = CLSInvalidDemensions;
  templateQueryIdMap = templateQueryIdMap;
  // 此处service是接口的配置参数，需和plugin.json里一致，和constant.ts中SERVICES_API_INFO保持一致
  InstanceReqConfig = {
    service: 'cls',
    action: 'DescribeTopics',
    responseField: 'Topics',
  };

  constructor(instanceSettings, backendSrv, templateSrv) {
    super(instanceSettings, backendSrv, templateSrv);
  }
  // getFilterDropdown({ field }) {
  //   return super.getRegions();
  // }
  getRegions() {
    return Promise.resolve(regionSupported.map(({ value }) => ({ value, text: t(value) })));
  }
  // async getInstances(region, params = {}) {
  //   const superRes = await super.getInstances(region, params);
  //   console.log({ superRes });
  // }
  async getMetrics(region = 'ap-guangzhou') {
    const rawSet = await super.getMetrics(region);
    return _.compact(
      rawSet.map((item) => {
        return modifyDimensons(item);
      })
    );
  }
}
