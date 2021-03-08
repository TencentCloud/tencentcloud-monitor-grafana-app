/* eslint-disable prefer-const */
// import CDBDatasource from './cdb/datasource';
// import CVMDatasource from './cvm/datasource';
// import PCXDatasource from './pcx/datasource';
// import NATGATEWAYDatasource from './nat_gateway/datasource';
// import MONGODBDatasource from './mongodb/datasource';
// import LBPUBLICDatasource from './lb_public/datasource';
// import POSTGRESDatasource from './postgresql/datasource';
// import LBPRIVATEDatasource from './lb_private/datasource';
// import LOADBALANCEDatasource from './lb_loadBalance/datasource';
// import SCFDatasource from './scf/datasource';
// import BWPDatasource from './bwp/datasource';
// import CDNDatasource from './cdn/datasource';
// import OVCDNDatasource from './ov_cdn/datasource';
// import REDISDatasource from './redis/datasource';
// // import REDISMEMDatasource from './redis_mem/datasource';
// import LBDatasource from './lb/datasource';
// import CFSDatasource from './cfs/datasource';
// import CKAFKADatasource from './ckafka/datasource';

// import CVM_STATE, { CVMInstanceAliasList, CVMGetInstanceQueryParams } from './cvm/query_def';
// import CDB_STATE, { CDBInstanceAliasList, CDBGetInstanceQueryParams } from './cdb/query_def';
// import PCX_STATE, { PCXInstanceAliasList, PCXGetInstanceQueryParams } from './pcx/query_def';
// import NATEGATEWAY_STATE, { NATGATEWAYInstanceAliasList, NATGATEWAYGetInstanceQueryParams } from './nat_gateway/query_def';
// import MONGODB_STATE, { MONGODBInstanceAliasList, MONGODBGetInstanceQueryParams } from './mongodb/query_def';
// import { LBPUBLICListenerAliasList } from './lb_public/query_def';
// import POSTGRES_STATE, { POSTGRESInstanceAliasList, POSTGRESGetInstanceQueryParams } from './postgresql/query_def';
// import { LBPRIVATEListenerAliasList } from './lb_private/query_def';
// import {  LOADBALANCEListenerAliasList } from './lb_loadBalance/query_def';
// import { SCFDefaultDimensionList } from './scf/query_def';
// import BWP_STATE, { BWPInstanceAliasList, BWPGetInstanceQueryParams } from './bwp/query_def';
// import CDN_STATE, { CDNInstanceAliasList, CDNGetInstanceQueryParams } from './cdn/query_def';
// import OVCDN_STATE, { OVCDNInstanceAliasList, OVCDNGetInstanceQueryParams } from './ov_cdn/query_def';
// import REDIS_STATE, { REDISInstanceAliasList, REDISGetInstanceQueryParams } from './redis/query_def';
// // import REDISMEM_STATE, { REDISMEMInstanceAliasList, REDISMEMGetInstanceQueryParams } from './redis_mem/query_def';
// import LB_STATE, { LBInstanceAliasList, LBGetInstanceQueryParams } from './lb/query_def';
// import CFS_STATE, { CFSInstanceAliasList, CFSGetInstanceQueryParams } from './cfs/query_def';
// import CKAFKA_STATE, { CKAFKAInstanceAliasList, CKAFKAGetInstanceQueryParams } from './ckafka/query_def';

// 导入相应产品的 Query 实例查询详情 Directive 指令
// import './cvm/query';
// import './cdb/query';
// import './pcx/query';
// import './nat_gateway/query';
// import './mongodb/query';
// import './lb_public/query';
// import './postgresql/query';
// import './lb_private/query';
// import './lb_loadBalance/query';
// import './scf/query';
// import './bwp/query';
// import './lb/query';
// import './cfs/query';
// import './ckafka/query';
// import './cdn/query';
// import './ov_cdn/query';
// import './redis/query';

const SERVICES = [
  {
    service: 'cvm',
    label: '云服务器(CVM)',
    namespace: 'QCE/CVM',
    href: 'https://cloud.tencent.com/document/api/213/15688',
  },
  {
    service: 'cdb',
    label: '云数据库 MySQL(CDB)',
    namespace: 'QCE/CDB',
    href: 'https://cloud.tencent.com/document/api/236/15829',
  },
  {
    service: 'pcx',
    label: '私有网络对等连接(PCX)',
    namespace: 'QCE/PCX',
    href: 'https://cloud.tencent.com/document/product/215/5181',
  },
  {
    service: 'bwp',
    label: '私有网络带宽包(BWP)',
    namespace: 'QCE/BWP',
    href: 'https://cloud.tencent.com/document/api/215/19209',
  },
  {
    service: 'natGateway',
    label: '私有网络NAT网关(NAT_GATEWAY)',
    namespace: 'QCE/NAT_GATEWAY',
    href: 'https://cloud.tencent.com/document/api/215/36034',
  },
  {
    service: 'mongoDB',
    label: '云数据库 MongoDB(CMONGO)',
    namespace: 'QCE/CMONGO',
    href: 'https://cloud.tencent.com/document/api/240/38568',
  },
  {
    service: 'postgres',
    label: '云数据库 PostgreSQL',
    namespace: 'QCE/POSTGRES',
    href: 'https://cloud.tencent.com/document/api/409/16760',
  },
  {
    service: 'lbPublic',
    label: '公网负载均衡(LB_PUBLIC)',
    namespace: 'QCE/LB_PUBLIC',
    href: 'https://cloud.tencent.com/document/product/248/51898',
  },
  {
    service: 'lbPrivate',
    label: '内网负载均衡四层协议(LB_PRIVATE)',
    namespace: 'QCE/LB_PRIVATE',
    href: 'https://cloud.tencent.com/document/product/248/51899',
  },
  {
    service: 'loadBalance',
    label: '七层协议监控指标(LOADBALANCE)',
    namespace: 'QCE/LOADBALANCE',
    href: 'https://cloud.tencent.com/document/product/248/51901',
  },
  {
    service: 'cdn',
    label: '国内域名(CDN)',
    namespace: 'QCE/CDN',
    href: 'https://cloud.tencent.com/document/product/248/50386',
  },
  {
    service: 'ovCdn',
    label: '国外域名(OV_CDN)',
    namespace: 'QCE/OV_CDN',
    href: 'https://cloud.tencent.com/document/product/248/50387',
  },
  {
    service: 'redis',
    label: 'redis(REDIS)',
    namespace: 'QCE/REDIS',
    href: 'https://cloud.tencent.com/document/product/248/45110',
  },
  // { service: 'redisMem', label: 'redis内存版（5s）(REDIS_MEM)', namespace: 'QCE/REDIS_MEM', href: 'https://cloud.tencent.com/document/product/248/49729' },
  {
    service: 'scf',
    label: '云函数(SCF)',
    namespace: 'QCE/SCF_V2',
    href: 'https://cloud.tencent.com/document/product/248/45130',
  },
  {
    service: 'lb',
    label: '弹性公网IP(LB)',
    namespace: 'QCE/LB',
    href: 'https://cloud.tencent.com/document/product/248/45099',
  },
  {
    service: 'cfs',
    label: '文件存储(CFS)',
    namespace: 'QCE/CFS',
    href: 'https://cloud.tencent.com/document/product/248/45143',
  },
  {
    service: 'ckafka',
    label: '消息队列(CKAFKA)',
    namespace: 'QCE/CKAFKA',
    href: 'https://cloud.tencent.com/document/product/248/45143',
  },
]; // name (产品名称), service（对应的真实service）

// const InstanceAliasList = {
//   CVMInstanceAliasList,
//   CDBInstanceAliasList,
//   PCXInstanceAliasList,
//   NATGATEWAYInstanceAliasList,
//   MONGODBInstanceAliasList,
//   LBPUBLICInstanceAliasList,
//   POSTGRESInstanceAliasList,
//   LBPRIVATEInstanceAliasList,
//   LOADBALANCEInstanceAliasList,
//   SCFInstanceAliasList,
//   BWPInstanceAliasList,
//   CDNInstanceAliasList,
//   OVCDNInstanceAliasList,
//   REDISInstanceAliasList,
//   // REDISMEMInstanceAliasList,
//   LBInstanceAliasList,
//   CFSInstanceAliasList,
//   CKAFKAInstanceAliasList
// };
// const ListenerAliasList = {
//   LBPRIVATEListenerAliasList,
//   LOADBALANCEListenerAliasList,
//   LBPUBLICListenerAliasList
// };
// export const IdKeys = {
//   lbPublic: 'LoadBalancerId',
//   lbPrivate: 'LoadBalancerId',
//   loadBalance: 'LoadBalancerId',
// };

// const InitStates = {
//   cvm: { ...CVM_STATE },
//   cdb: { ...CDB_STATE },
//   pcx: { ...PCX_STATE },
//   natGateway: { ...NATEGATEWAY_STATE },
//   mongoDB: { ...MONGODB_STATE }, ????
//   lbPublic: { ...LBPUBLIC_STATE },
//   postgres: { ...POSTGRES_STATE },
//   lbPrivate: { ...LBPRIVATE_STATE },
//   loadBalance: { ...LOADBALANCE_STATE },
//   bwp: { ...BWP_STATE},
//   cdn: { ...CDN_STATE},
//   ovCdn: { ...OVCDN_STATE},
//   redis: { ...REDIS_STATE},
//   // redisMem: { ...REDISMEM_STATE},
//   scf: { ...SCF_STATE },
//   lb: { ...LB_STATE },
//   cfs: { ...CFS_STATE },
//   ckafka: { ...CKAFKA_STATE }
// };

// const Datasources = {
//   CVMDatasource,
//   CDBDatasource,
//   PCXDatasource,
//   NATGATEWAYDatasource,
//   MONGODBDatasource,
//   LBPUBLICDatasource,
//   POSTGRESDatasource,
//   LBPRIVATEDatasource,
//   LOADBALANCEDatasource,
//   SCFDatasource,
//   BWPDatasource,
//   CDNDatasource,
//   OVCDNDatasource,
//   REDISDatasource,
//   // REDISMEMDatasource,
//   LBDatasource,
//   CFSDatasource,
//   CKAFKADatasource
// };

// const GetInstanceQueryParams = {
//   CVMGetInstanceQueryParams,
//   CDBGetInstanceQueryParams,
//   PCXGetInstanceQueryParams,
//   NATGATEWAYGetInstanceQueryParams,
//   MONGODBGetInstanceQueryParams,
//   LBPUBLICGetInstanceQueryParams,
//   POSTGRESGetInstanceQueryParams,
//   LBPRIVATEGetInstanceQueryParams,
//   LOADBALANCEGetInstanceQueryParams,
//   BWPGetInstanceQueryParams,
//   CDNGetInstanceQueryParams,
//   OVCDNGetInstanceQueryParams,
//   REDISGetInstanceQueryParams,
//   // REDISMEMGetInstanceQueryParams,
//   SCFGetInstanceQueryParams,
//   LBGetInstanceQueryParams,
//   CFSGetInstanceQueryParams,
//   CKAFKAGetInstanceQueryParams
// };

// const DefaultDimensions = {
//   scf: SCFDefaultDimensionList
// };

const Datasources = {};
const InitStates = {};
const InstanceAliasList = {};
const GetInstanceQueryParams = {};

/**
 * 由于目录命名不规范，导致需要使用额外逻辑保证正确性
 */
const hackModuleName = {
  lb_loadBalance: 'loadBalance',
  postgresql: 'postgres',
  mongodb: 'mongoDB',
};

const requireModule = (require as any).context('./', true, /^\.\/[a-zA-Z]\w+\/(datasource)|(query(_def)?)\.ts$/);
requireModule.keys().forEach(filePath => {
  console.log({ filePath });
  let [, moduleName, fileName] = filePath.split('/');

  // hack： 这里是由于产品目录命名不规范,所以才会多这么一段代码
  moduleName = hackModuleName[moduleName] ?? moduleName;

  const prefix = moduleName.replace('_', '').toUpperCase(); // 命名规则
  const camelCase = moduleName.replace(/_([a-zA-Z])/g, (_, b) => b.toUpperCase());

  // datasource
  if (fileName === 'datasource.ts') {
    Datasources[`${prefix}Datasource`] = require(`${filePath}`).default;
  }
  // query
  if (fileName === 'query.ts') {
    require(`${filePath}`);
  }
  // query_def
  if (fileName === 'query_def.ts') {
    const alias = `${prefix}InstanceAliasList`;
    const getParams = `${prefix}GetInstanceQueryParams`;

    const target = require(`${filePath}`);

    InitStates[camelCase] = target.default; // FIXME: 这里需不需要深拷贝？
    InstanceAliasList[alias] = target[alias];
    GetInstanceQueryParams[getParams] = target[getParams];
  }
});

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasources,
  InstanceAliasList,
  GetInstanceQueryParams,
  // DefaultDimensions
};

console.log(Datasources, InitStates, InstanceAliasList, GetInstanceQueryParams);
