import { t } from '../../locale'
// name (产品名称), service（对应的真实service）
interface ServiceType {
  service: string;
  label: string;
  namespace: string;
  href: string;
  groupName?: string;
  hideRegion?: boolean;
}
const SERVICES: ServiceType[] = [
  {
    service: 'cvm',
    get label() {
      return t('CVM')
    },
    namespace: 'QCE/CVM',
    href: 'https://cloud.tencent.com/document/api/213/15688',
  },
  {
    service: 'cdb',
    get label() {
      return t('CDB')
    },
    namespace: 'QCE/CDB',
    href: 'https://cloud.tencent.com/document/api/236/15829',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'mongoDB',
    get label() {
      return t('CMONGO')
    },
    namespace: 'QCE/CMONGO',
    href: 'https://cloud.tencent.com/document/api/240/38568',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'postgres',
    get label() {
      return t('POSTGRES')
    },
    namespace: 'QCE/POSTGRES',
    href: 'https://cloud.tencent.com/document/product/248/45105',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'redis',
    get label() {
      return t('REDIS')
    },
    namespace: 'QCE/REDIS',
    href: 'https://cloud.tencent.com/document/product/248/45110',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'redisMem',
    get label() {
      return t('REDIS_MEM')
    },
    namespace: 'QCE/REDIS_MEM',
    href: 'https://cloud.tencent.com/document/product/248/49729',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'sqlserver',
    get label() {
      return t('SQLSERVER')
    },
    namespace: 'QCE/SQLSERVER',
    href: 'https://cloud.tencent.com/document/product/248/45146',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'cynosdbMysql',
    get label() {
      return t('CYNOSDB_MYSQL')
    },
    namespace: 'QCE/CYNOSDB_MYSQL',
    href: 'https://cloud.tencent.com/document/product/248/45106',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'tcaplus',
    get label() {
      return t('TCAPLUS')
    },
    namespace: 'QCE/TCAPLUS',
    href: 'https://cloud.tencent.com/document/product/248/45107',
    get groupName() {
      return t('cloud_database')
    },
  },
  {
    service: 'dcdb',
    get label() {
      return t('TDMYSQL')
    },
    namespace: 'QCE/TDMYSQL',
    href: 'https://cloud.tencent.com/document/product/248/45108',
  },
  {
    service: 'pcx',
    get label() {
      return t('PCX')
    },
    namespace: 'QCE/PCX',
    href: 'https://cloud.tencent.com/document/product/215/5181',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'bwp',
    get label() {
      return t('BWP')
    },
    namespace: 'QCE/BWP',
    href: 'https://cloud.tencent.com/document/api/215/19209',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'natGateway',
    get label() {
      return t('NAT_GATEWAY')
    },
    namespace: 'QCE/NAT_GATEWAY',
    href: 'https://cloud.tencent.com/document/api/215/36034',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'vpngw',
    get label() {
      return t('VPNGW')
    },
    namespace: 'QCE/VPNGW',
    href: 'https://cloud.tencent.com/document/product/248/45070',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'vpnx',
    get label() {
      return t('VPNX')
    },
    namespace: 'QCE/VPNX',
    href: 'https://cloud.tencent.com/document/product/248/45071',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'dcg',
    get label() {
      return t('DCG')
    },
    namespace: 'QCE/DCG',
    href: 'https://cloud.tencent.com/document/product/248/45072',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'ceipSummary',
    get label() {
      return t('CEIP_SUMMARY')
    },
    namespace: 'QCE/CEIP_SUMMARY',
    href: 'https://cloud.tencent.com/document/product/248/50381',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'vpcNetDetect',
    get label() {
      return t('VPC_NET_DETECT')
    },
    namespace: 'QCE/VPC_NET_DETECT',
    href: 'https://cloud.tencent.com/document/product/248/50384',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'vbc',
    get label() {
      return t('VBC')
    },
    namespace: 'QCE/VBC',
    href: 'https://cloud.tencent.com/document/product/248/45073',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'lb',
    get label() {
      return t('LB')
    },
    namespace: 'QCE/LB',
    href: 'https://cloud.tencent.com/document/product/248/45099',
    get groupName() {
      return t('virtual_private_cloud')
    },
  },
  {
    service: 'lbPublic',
    get label() {
      return t('LB_PUBLIC')
    },
    namespace: 'QCE/LB_PUBLIC',
    href: 'https://cloud.tencent.com/document/product/248/51898',
    get groupName() {
      return `${t('cloud_load_balancer')}(${t('multi_scene')})`
    },
  },
  {
    service: 'lbPrivate',
    get label() {
      return t('LB_PRIVATE')
    },
    namespace: 'QCE/LB_PRIVATE',
    href: 'https://cloud.tencent.com/document/product/248/51899',
    get groupName() {
      return `${t('cloud_load_balancer')}(${t('multi_scene')})`
    },
  },
  {
    service: 'loadBalance',
    get label() {
      return t('LOADBALANCE')
    },
    namespace: 'QCE/LOADBALANCE',
    href: 'https://cloud.tencent.com/document/product/248/51901',
    get groupName() {
      return `${t('cloud_load_balancer')}(${t('multi_scene')})`
    },
  },
  {
    service: 'vClb',
    get label() {
      return `${t('cloud_load_balancer')}(${t('lite')})`
    },
    namespace: 'QCE/V_CLB',
    href: 'https://cloud.tencent.com/document/product/248/51901',
    get groupName() {
      return `${t('cloud_load_balancer')}(${t('lite')})`
    },
  },
  {
    service: 'cdn',
    get label() {
      return t('CDN')
    },
    namespace: 'QCE/CDN',
    hideRegion: true,
    href: 'https://cloud.tencent.com/document/product/248/50386',
    get groupName() {
      return t('content_delivery_network')
    },
  },
  {
    service: 'cdnProvince',
    get label() {
      return t('CDN_LOG_DATA')
    },
    namespace: 'QCE/CDN_LOG_DATA',
    hideRegion: true,
    href: 'https://cloud.tencent.com/document/product/248/50388',
    get groupName() {
      return t('content_delivery_network')
    },
  },
  {
    service: 'ovCdn',
    get label() {
      return t('OV_CDN')
    },
    namespace: 'QCE/OV_CDN',
    hideRegion: true,
    href: 'https://cloud.tencent.com/document/product/248/50387',
    get groupName() {
      return t('content_delivery_network')
    },
  },
  {
    service: 'scf',
    get label() {
      return t('SCF_V2')
    },
    namespace: 'QCE/SCF_V2',
    href: 'https://cloud.tencent.com/document/product/248/45130',
  },
  {
    service: 'cfs',
    get label() {
      return t('CFS')
    },
    namespace: 'QCE/CFS',
    href: 'https://cloud.tencent.com/document/product/248/45143',
  },
  {
    service: 'cos',
    get label() {
      return t('COS')
    },
    namespace: 'QCE/COS',
    href: 'https://cloud.tencent.com/document/product/248/45140',
  },
  {
    service: 'ckafka',
    get label() {
      return t('CKAFKA')
    },
    namespace: 'QCE/CKAFKA',
    href: 'https://cloud.tencent.com/document/product/248/45121',
    get groupName() {
      return t('message_queue')
    },
  },
  {
    service: 'cmq',
    get label() {
      return t('CMQ')
    },
    namespace: 'QCE/CMQ',
    href: 'https://cloud.tencent.com/document/product/248/45114',
    get groupName() {
      return t('message_queue')
    },
  },
  {
    service: 'cmqTopic',
    get label() {
      return t('CMQTOPIC')
    },
    namespace: 'QCE/CMQTOPIC',
    href: 'https://cloud.tencent.com/document/product/248/45113',
    get groupName() {
      return t('message_queue')
    },
  },
  {
    service: 'tdmq',
    get label() {
      return t('TDMQ')
    },
    namespace: 'QCE/TDMQ',
    href: 'https://cloud.tencent.com/document/product/248/51450',
    get groupName() {
      return t('message_queue')
    },
  },
  {
    service: 'dcx',
    get label() {
      return t('DCX')
    },
    namespace: 'QCE/DCX',
    href: 'https://cloud.tencent.com/document/product/248/45101',
    get groupName() {
      return t('direct_connect')
    },
  },
  {
    service: 'dc',
    get label() {
      return t('DC')
    },
    namespace: 'QCE/DC',
    href: 'https://cloud.tencent.com/document/product/248/45102',
    get groupName() {
      return t('direct_connect')
    },
  },
  {
    service: 'cpm',
    get label() {
      return t('CPM')
    },
    namespace: 'QCE/CPM',
    href: 'https://cloud.tencent.com/document/product/248/45881',
    get groupName() {
      return t('cloud_physical_machine')
    },
  },
  {
    service: 'bmPcx',
    get label() {
      return t('BM_PCX')
    },
    namespace: 'QCE/BM_PCX',
    href: 'https://cloud.tencent.com/document/product/248/45884',
    get groupName() {
      return t('cloud_physical_machine')
    },
  },
  {
    service: 'bmLb',
    get label() {
      return t('BM_LB')
    },
    namespace: 'QCE/BM_LB',
    href: 'https://cloud.tencent.com/document/product/248/45886',
    get groupName() {
      return t('cloud_physical_machine')
    },
  },
  {
    service: 'bmIntraLb',
    get label() {
      return t('BM_INTRA_LB')
    },
    namespace: 'QCE/BM_INTRA_LB',
    href: 'https://cloud.tencent.com/document/product/248/45885',
    get groupName() {
      return t('cloud_physical_machine')
    },
  },
  {
    service: 'ces',
    get label() {
      return t('CES')
    },
    namespace: 'QCE/CES',
    href: 'https://cloud.tencent.com/document/product/248/45129',
  },
  {
    service: 'mrHDFS',
    get label() {
      return `${t('elastic_mapReduce')}(HDFS)`
    },
    namespace: 'QCE/TXMR_HDFS',
    href: 'https://cloud.tencent.com/document/product/248/44797',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrHBASE',
    get label() {
      return `${t('elastic_mapReduce')}(HBASE)`
    },
    namespace: 'QCE/TXMR_HBASE',
    href: 'https://cloud.tencent.com/document/product/248/45567',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrHIVE',
    get label() {
      return `${t('elastic_mapReduce')}(HIVE)`
    },
    namespace: 'QCE/TXMR_HIVE',
    href: 'https://cloud.tencent.com/document/product/248/45569',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrNODE',
    get label() {
      return `${t('elastic_mapReduce')}(NODE)`
    },
    namespace: 'QCE/TXMR_NODE',
    href: 'https://cloud.tencent.com/document/product/248/45570',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrPRESTO',
    get label() {
      return `${t('elastic_mapReduce')}(PRESTO)`
    },
    namespace: 'QCE/TXMR_PRESTO',
    href: 'https://cloud.tencent.com/document/product/248/45571',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrSPARK',
    get label() {
      return `${t('elastic_mapReduce')}(SPARK)`
    },
    namespace: 'QCE/TXMR_SPARK',
    href: 'https://cloud.tencent.com/document/product/248/45572',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrYARN',
    get label() {
      return `${t('elastic_mapReduce')}(YARN)`
    },
    namespace: 'QCE/TXMR_YARN',
    href: 'https://cloud.tencent.com/document/product/248/45573',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'mrZOOKEEPER',
    get label() {
      return `${t('elastic_mapReduce')}(ZOOKEEPER)`
    },
    namespace: 'QCE/TXMR_ZOOKEEPER',
    href: 'https://cloud.tencent.com/document/product/248/45574',
    get groupName() {
      return t('elastic_mapReduce')
    },
  },
  {
    service: 'cbs',
    get label() {
      return t('BLOCK_STORAGE')
    },
    namespace: 'QCE/BLOCK_STORAGE',
    href: 'https://cloud.tencent.com/document/product/362/2345',
  },
  {
    service: 'apigateway',
    get label() {
      return t('APIGATEWAY')
    },
    namespace: 'QCE/APIGATEWAY',
    href: 'https://cloud.tencent.com/document/product/248/45127',
  },
  {
    service: 'qaap',
    get label() {
      return t('QAAP')
    },
    namespace: 'QCE/QAAP',
    href: 'https://cloud.tencent.com/document/product/608',
  },
  {
    service: 'ecm',
    get label() {
      return t('ECM')
    },
    hideRegion: true,
    namespace: 'QCE/ECM',
    href: 'https://cloud.tencent.com/document/product/1108',
    get groupName() {
      return t('edge_computing_machine')
    },
  },
  {
    service: 'ecmBlockStorage',
    get label() {
      return t('ECM_BLOCK_STORAGE')
    },
    hideRegion: true,
    namespace: 'QCE/ECM_BLOCK_STORAGE',
    href: 'https://cloud.tencent.com/document/product/1108',
    get groupName() {
      return t('edge_computing_machine')
    },
  },
  {
    service: 'ecmLb',
    get label() {
      return t('ECM_LB')
    },
    hideRegion: true,
    namespace: 'QCE/ECM_LB',
    href: 'https://cloud.tencent.com/document/product/1108',
    get groupName() {
      return t('edge_computing_machine')
    },
  },
  {
    service: 'gse',
    get label() {
      return t('GSE')
    },
    namespace: 'QCE/GSE',
    href: 'https://cloud.tencent.com/document/product/1165',
  },
  {
    service: 'cls',
    get label() {
      return t('CLS')
    },
    namespace: 'QCE/CLS',
    href: 'https://cloud.tencent.com/document/product/614',
  },
  // {
  //   service: 'lighthouse',
  //   label: '轻量应用服务器(LIGHTHOUSE)',
  //   namespace: 'QCE/LIGHTHOUSE',
  //   href: 'https://cloud.tencent.com/document/product/1207',
  // },
  // {
  //   service: 'tsf',
  //   label: ' 微服务平台(TSF)',
  //   namespace: 'QCE/TSF',
  //   href: 'https://cloud.tencent.com/document/product/649',
  // },
  // {
  //   service: 'waf',
  //   label: 'Web 应用防火墙(WAF)',
  //   hideRegion: true,
  //   namespace: 'QCE/WAF',
  //   href: 'https://cloud.tencent.com/document/product/627',
  // },
];
const Datasources = {};
const InitStates = {};
const InstanceAliasList = {};
const GetInstanceQueryParams = {};

/**
 * 由于目录命名不规范，导致需要使用额外逻辑保证正确性。从目录到具体service的映射
 */
const hackModuleName = {
  // lb_loadBalance: 'loadBalance',
  postgresql: 'postgres',
  mongodb: 'mongoDB',
  clb: ['lbPrivate', 'lbPublic', 'loadBalance'],
  mr: ['mrHDFS', 'mrHBASE', 'mrHIVE', 'mrNODE', 'mrPRESTO', 'mrSPARK', 'mrYARN', 'mrZOOKEEPER'],
};

const requireModule = (require as any).context('./', true, /^\.\/[a-zA-Z]\w+\/(datasource)|(query(_def)?)\.ts$/);

requireModule.keys().forEach((filePath) => {
  let [, moduleName, fileName] = filePath.split('/');

  // hack： 这里是由于产品目录命名不规范,所以才会多这么一段代码
  moduleName = hackModuleName[moduleName] ?? moduleName;

  // 目录与模块的映射关系，不管是一对一还是一对多，均按数组进行统一处理
  [].concat(moduleName).forEach((module: string) => {
    // 这个service就是产品配置中的service，需要注意这里的service是根据目录名称算出来的，因此目录名称一定要和service对应
    const service = module.replace(/_([a-zA-Z])/g, (_, b) => b.toUpperCase());
    const prefix = service.toUpperCase(); // 命名规则

    // datasource
    if (fileName === 'datasource.ts') {
      const Cls = require(`${filePath}`).default;

      // 想办法为实例注入service，不能为prototype或则类本身注入，因为会造成互相污染，详尽mrDatasource
      Datasources[`${prefix}Datasource`] = class {
        constructor(...params) {
          const target = new Cls(...params, service);
          target.service = service;
          // eslint-disable-next-line no-constructor-return
          return target;
        }
      };
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

      InitStates[service] = target.default; // FIXME: 这里需不需要深拷贝？
      InstanceAliasList[alias] = target[alias] ?? target['InstanceAliasList'];
      GetInstanceQueryParams[getParams] = target[getParams] ?? target['GetInstanceQueryParams'];
    }
  });
});

export {
  InitStates as InitServiceState,
  SERVICES,
  Datasources,
  InstanceAliasList,
  GetInstanceQueryParams,
  // DefaultDimensions
};

// console.log(Datasources, InitStates, InstanceAliasList, GetInstanceQueryParams);
