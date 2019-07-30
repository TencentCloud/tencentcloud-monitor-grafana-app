import CDBDatasource from './cdb/datasource';
import CVMDatasource from './cvm/datasource';
import PCXDatasource from './pcx/datasource';
import NATGATEWAYDatasource from './nat_gateway/datasource';
import MONGODBDatasource from './mongodb/datasource';
import LBPUBLICDatasource from './lb_public/datasource';

import CVM_STATE, { CVMInstanceAliasList, CVMGetInstanceQueryParams } from './cvm/query_def';
import CDB_STATE, { CDBInstanceAliasList, CDBGetInstanceQueryParams } from './cdb/query_def';
import PCX_STATE, { PCXInstanceAliasList, PCXGetInstanceQueryParams } from './pcx/query_def';
import NATEGATEWAY_STATE, { NATGATEWAYInstanceAliasList, NATGATEWAYGetInstanceQueryParams } from './nat_gateway/query_def';
import MONGODB_STATE, { MONGODBInstanceAliasList, MONGODBGetInstanceQueryParams } from './mongodb/query_def';
import LBPUBLIC_STATE, { LBPUBLICInstanceAliasList, LBPUBLICGetInstanceQueryParams } from './lb_public/query_def';

// 导入相应产品的 Query 实例查询详情 Directive 指令
import './cvm/query';
import './cdb/query';
import './pcx/query';
import './nat_gateway/query';
import './mongodb/query';
import './lb_public/query';

const SERVICES = [
  { service: 'cvm', label: '云服务器(CVM)', namespace: 'QCE/CVM', href: 'https://cloud.tencent.com/document/api/213/15688' },
  { service: 'cdb', label: '云数据库 MySQL(CDB)', namespace: 'QCE/CDB', href: 'https://cloud.tencent.com/document/api/236/15829' },
  { service: 'pcx', label: '私有网络对等连接(PCX)', namespace: 'QCE/PCX', href: 'https://cloud.tencent.com/document/product/215/5181' },
  { service: 'natGateway', label: '私有网络NAT网关(NAT_GATEWAY)', namespace: 'QCE/NAT_GATEWAY', href: 'https://cloud.tencent.com/document/api/215/36034' },
  // { service: 'mongoDB', label: '云数据库 MongoDB(CMONGO)', namespace: 'QCE/CMONGO', href: 'https://cloud.tencent.com/document/api/240/35769' },
  // { service: 'lbPublic', label: '公网负载均衡(LB_PUBLIC)', namespace: 'QCE/LB_PUBLIC', href: 'https://cloud.tencent.com/document/api/214/30667' }
];


const InstanceAliasList = {
  CVMInstanceAliasList,
  CDBInstanceAliasList,
  PCXInstanceAliasList,
  NATGATEWAYInstanceAliasList,
  MONGODBInstanceAliasList,
  LBPUBLICInstanceAliasList
};


const InitStates = {
  cvm: { ...CVM_STATE },
  cdb: { ...CDB_STATE },
  pcx: { ...PCX_STATE },
  natGateway: { ...NATEGATEWAY_STATE },
  mongoDB: { ...MONGODB_STATE },
  lbPublic: { ...LBPUBLIC_STATE },
};

const Datasources = {
  CVMDatasource,
  CDBDatasource,
  PCXDatasource,
  NATGATEWAYDatasource,
  MONGODBDatasource,
  LBPUBLICDatasource,
};

const GetInstanceQueryParams = {
  CVMGetInstanceQueryParams,
  CDBGetInstanceQueryParams,
  PCXGetInstanceQueryParams,
  NATGATEWAYGetInstanceQueryParams,
  MONGODBGetInstanceQueryParams,
  LBPUBLICGetInstanceQueryParams
};

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasources,
  InstanceAliasList,
  GetInstanceQueryParams,
};
