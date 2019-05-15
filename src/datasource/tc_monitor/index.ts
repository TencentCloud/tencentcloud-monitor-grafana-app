import CDBDatasource from './cdb/datasource';
import CVMDatasource from './cvm/datasource';

const SERVICES = [
  { service: 'cvm', label: 'CVM', namespace: 'QCE/CVM', href: 'https://cloud.tencent.com/document/api/213/15688' },
  { service: 'cdb', label: 'CDB', namespace: 'QCE/CDB', href: 'https://cloud.tencent.com/document/api/236/15829' },
];

const InitStates = {
  cvm: {
    region: '',
    metricName: '',
    metricUnit: '',
    period: undefined,
    dimensionObject: null,
    instance: '',
    instanceAlias: 'InstanceId',
    queries: {
      Limit: 20,
      Offset: 0,
      instanceIdsChecked: false,
      filtersChecked: false,
      InstanceIds: [''],
      // Filters: Object.assign({}, CVMFilterFields),
    },
  },
  cdb: {
    region: '',
    metricName: '',
    metricUnit: '',
    period: undefined,
    dimensionObject: null,
    instance: '',
    instanceAlias: 'InstanceId',
    // queries: Object.assign({}, CDBFields),
  }
};

const Datasource = {
  CVMDatasource,
  CDBDatasource,
};

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasource,
};
