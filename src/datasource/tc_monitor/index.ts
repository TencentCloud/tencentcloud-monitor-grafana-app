import CDBDatasource from './cdb/datasource';
import CVMDatasource from './cvm/datasource';
import PCXDatasource from './pcx/datasource';
import NATGATEWAYDatasource from './nat_gateway/datasource';

import CVM_STATE, { CVMInstanceAliasList, CVMGetInstanceQueryParams } from './cvm/query_def';
import CDB_STATE, { CDBInstanceAliasList, CDBGetInstanceQueryParams } from './cdb/query_def';
import PCX_STATE, { PCXInstanceAliasList, PCXGetInstanceQueryParams } from './pcx/query_def';
import NATEGATEWAY_STATE, { NATGATEWAYInstanceAliasList, NATGATEWAYGetInstanceQueryParams } from './nat_gateway/query_def';

// 导入相应产品的 Query 实例查询详情 Directive 指令
import './cvm/query';
import './cdb/query';
import './pcx/query';
import './nat_gateway/query';


const SERVICES = [
  { service: 'cvm', label: '云服务器(CVM)', namespace: 'QCE/CVM', href: 'https://cloud.tencent.com/document/api/213/15688' },
  { service: 'cdb', label: '云数据库 MySQL(CDB)', namespace: 'QCE/CDB', href: 'https://cloud.tencent.com/document/api/236/15829' },
  { service: 'pcx', label: '私有网络对等连接(PCX)', namespace: 'QCE/PCX', href: 'https://cloud.tencent.com/document/product/215/5181' },
  { service: 'natGateway', label: '私有网络NAT网关(NAT_GATEWAY)', namespace: 'QCE/NAT_GATEWAY', href: 'http://10.198.144.46/document/product/215/32054?!preview&!document=1' }
];


const InstanceAliasList = {
  CVMInstanceAliasList,
  CDBInstanceAliasList,
  PCXInstanceAliasList,
  NATGATEWAYInstanceAliasList,
};


const InitStates = {
  cvm: { ...CVM_STATE },
  cdb: { ...CDB_STATE },
  pcx: { ...PCX_STATE },
  natGateway: { ...NATEGATEWAY_STATE },
};

const Datasources = {
  CVMDatasource,
  CDBDatasource,
  PCXDatasource,
  NATGATEWAYDatasource
};

const GetInstanceQueryParams = {
  CVMGetInstanceQueryParams,
  CDBGetInstanceQueryParams,
  PCXGetInstanceQueryParams,
  NATGATEWAYGetInstanceQueryParams,
};

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasources,
  InstanceAliasList,
  GetInstanceQueryParams,
};
