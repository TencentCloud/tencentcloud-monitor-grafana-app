import CDBDatasource from './cdb/datasource';
import CVMDatasource from './cvm/datasource';

import CVM_STATE, { CVMInstanceAliasList, CVMGetInstanceQueryParams } from './cvm/query_def';
import CDB_STATE, { CDBInstanceAliasList, CDBGetInstanceQueryParams } from './cdb/query_def';

// 导入相应产品的 Query 查询控制
import './cvm/query';
import './cdb/query';


const SERVICES = [
  { service: 'cvm', label: 'CVM', namespace: 'QCE/CVM', href: 'https://cloud.tencent.com/document/api/213/15688' },
  { service: 'cdb', label: 'CDB', namespace: 'QCE/CDB', href: 'https://cloud.tencent.com/document/api/236/15829' },
];


const InstanceAliasList = {
  CVMInstanceAliasList,
  CDBInstanceAliasList,
};


const InitStates = {
  cvm: { ...CVM_STATE },
  cdb: { ...CDB_STATE },
};

const Datasources = {
  CVMDatasource,
  CDBDatasource,
};

const GetInstanceQueryParams = {
  CVMGetInstanceQueryParams,
  CDBGetInstanceQueryParams,
};

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasources,
  InstanceAliasList,
  GetInstanceQueryParams,
};
