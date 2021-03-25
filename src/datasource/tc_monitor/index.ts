// name (产品名称), service（对应的真实service）
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
    service: 'mongoDB',
    label: '云数据库 MongoDB(CMONGO)',
    namespace: 'QCE/CMONGO',
    href: 'https://cloud.tencent.com/document/api/240/38568',
  },
  {
    service: 'postgres',
    label: '云数据库 PostgreSQL',
    namespace: 'QCE/POSTGRES',
    href: 'https://cloud.tencent.com/document/product/248/45105',
  },
  {
    service: 'redis',
    label: '云数据库 redis(REDIS)',
    namespace: 'QCE/REDIS',
    href: 'https://cloud.tencent.com/document/product/248/45110',
  },
  {
    service: 'sqlserver',
    label: '云数据库sqlserver(SQLSERVER)',
    namespace: 'QCE/SQLSERVER',
    href: 'https://cloud.tencent.com/document/product/248/45146',
  },
  {
    service: 'cynosdbMysql',
    label: '云数据库 CYNOSDB(CYNOSDB_MYSQL)',
    namespace: 'QCE/CYNOSDB_MYSQL',
    href: 'https://cloud.tencent.com/document/product/248/45106',
  },
  {
    service: 'tcaplus',
    label: '云数据库 TcaplusDB(TCAPLUS)',
    namespace: 'QCE/TCAPLUS',
    href: 'https://cloud.tencent.com/document/product/248/45107',
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
    service: 'vpngw',
    label: '私有网络-VPN 网关(VPNGW)',
    namespace: 'QCE/VPNGW',
    href: 'https://cloud.tencent.com/document/product/248/45070',
  },
  // {
  //   service: 'vpnx',
  //   label: '私有网络-VPN 通道(VPNX)',
  //   namespace: 'QCE/VPNX',
  //   href: 'https://cloud.tencent.com/document/product/248/45071',
  // },
  {
    service: 'dcg',
    label: '私有网络-专线网关(DCG)',
    namespace: 'QCE/DCG',
    href: 'https://cloud.tencent.com/document/product/248/45072',
  },
  // {
  //   service: 'ceipSummary',
  //   label: '私有网络-Anycast弹性公网IP(CEIP_SUMMARY)',
  //   namespace: 'QCE/CEIP_SUMMARY',
  //   href: 'https://cloud.tencent.com/document/product/248/50381',
  // },
  // {
  //   service: 'vpcNetDetect',
  //   label: '私有网络-网络探测(VPC_NET_DETECT)',
  //   namespace: 'QCE/VPC_NET_DETECT',
  //   href: 'https://cloud.tencent.com/document/product/248/50384',
  // },
  // {
  //   service: 'vbc',
  //   label: '私有网络云联网(VBC)',
  //   namespace: 'QCE/VBC',
  //   href: 'https://cloud.tencent.com/document/product/248/45073',
  // },
  // {
  //   service: 'dcdb',
  //   label: '分布式数据库 TDSQL MySQL(DCDB)',
  //   namespace: 'QCE/DCDB',
  //   href: 'https://cloud.tencent.com/document/product/248/45108',
  // },
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
    service: 'cdnProvince',
    label: '省份域名(CDN_LOG_DATA)',
    namespace: 'QCE/CDN_LOG_DATA',
    href: 'https://cloud.tencent.com/document/product/248/50388',
  },
  {
    service: 'ovCdn',
    label: '国外域名(OV_CDN)',
    namespace: 'QCE/OV_CDN',
    href: 'https://cloud.tencent.com/document/product/248/50387',
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
    href: 'https://cloud.tencent.com/document/product/248/45121',
  },
  // {
  //   service: 'cos',
  //   label: '对象存储(COS)',
  //   namespace: 'QCE/COS',
  //   href: 'https://cloud.tencent.com/document/product/248/45140',
  // },
  {
    service: 'cmq',
    label: '消息队列CMQ(队列服务监控CMQ)',
    namespace: 'QCE/CMQ',
    href: 'https://cloud.tencent.com/document/product/248/45114',
  },
  {
    service: 'cmqTopic',
    label: '消息队列CMQTOPIC(主题订阅监控)',
    namespace: 'QCE/CMQTOPIC',
    href: 'https://cloud.tencent.com/document/product/248/45113',
  },
  {
    service: 'dcx',
    label: '专线接入-专用通道(DCX)',
    namespace: 'QCE/DCX',
    href: 'https://cloud.tencent.com/document/product/248/45101',
  },
  {
    service: 'dc',
    label: '专线接入-物理专线(DC)',
    namespace: 'QCE/DC',
    href: 'https://cloud.tencent.com/document/product/248/45102',
  },
  // {
  //   service: 'cpm',
  //   label: '黑石物理服务器(CPM)',
  //   namespace: 'QCE/CPM',
  //   href: 'https://cloud.tencent.com/document/product/248/45881',
  // },
  // {
  //   service: 'bmLb',
  //   label: '黑石弹性公网 IP(BM_LB)',
  //   namespace: 'QCE/BM_LB',
  //   href: 'https://cloud.tencent.com/document/product/248/45883',
  // },
  // {
  //   service: 'bmPcx',
  //   label: '黑石对等连接(BM_PCX)',
  //   namespace: 'QCE/BM_PCX',
  //   href: 'https://cloud.tencent.com/document/product/248/45884',
  // },
  // {
  //   service: 'bmIntraLb',
  //   label: '黑石内网负载均衡(BM_INTRA_LB)',
  //   namespace: 'QCE/BM_INTRA_LB',
  //   href: 'https://cloud.tencent.com/document/product/248/45885',
  // },
  {
    service: 'ces',
    label: 'Elasticsearch指标(CES)',
    namespace: 'QCE/CES',
    href: 'https://cloud.tencent.com/document/product/248/45129',
  },
  // {
  //   service: 'mrHDFS',
  //   label: '弹性MapReduce(HDFS)',
  //   namespace: 'QCE/TXMR_HDFS',
  //   href: 'https://cloud.tencent.com/document/product/248/44797',
  // },
  // {
  //   service: 'mrHBASE',
  //   label: '弹性MapReduce(HBASE)',
  //   namespace: 'QCE/TXMR_HBASE',
  //   href: 'https://cloud.tencent.com/document/product/248/45567',
  // },
  // {
  //   service: 'mrHIVE',
  //   label: '弹性MapReduce(HIVE)',
  //   namespace: 'QCE/TXMR_HIVE',
  //   href: 'https://cloud.tencent.com/document/product/248/45569',
  // },
  // {
  //   service: 'mrNODE',
  //   label: '弹性MapReduce(NODE)',
  //   namespace: 'QCE/TXMR_NODE',
  //   href: 'https://cloud.tencent.com/document/product/248/45570',
  // },
  // {
  //   service: 'mrPRESTO',
  //   label: '弹性MapReduce(PRESTO)',
  //   namespace: 'QCE/TXMR_PRESTO',
  //   href: 'https://cloud.tencent.com/document/product/248/45571',
  // },
  // {
  //   service: 'mrSPARK',
  //   label: '弹性MapReduce(SPARK)',
  //   namespace: 'QCE/TXMR_SPARK',
  //   href: 'https://cloud.tencent.com/document/product/248/45572',
  // },
  // {
  //   service: 'mrYARN',
  //   label: '弹性MapReduce(YARN)',
  //   namespace: 'QCE/TXMR_YARN',
  //   href: 'https://cloud.tencent.com/document/product/248/45573',
  // },
  // {
  //   service: 'mrZOOKEEPER',
  //   label: '弹性MapReduce(ZOOKEEPER)',
  //   namespace: 'QCE/TXMR_ZOOKEEPER',
  //   href: 'https://cloud.tencent.com/document/product/248/45574',
  // },
  {
    service: 'cbs',
    label: '云硬盘(BLOCK_STORAGE)',
    namespace: 'QCE/BLOCK_STORAGE',
    href: 'https://cloud.tencent.com/document/product/362/2345',
  },
  {
    service: 'apigateway',
    label: 'API 网关(APIGATEWAY)',
    namespace: 'QCE/APIGATEWAY',
    href: 'https://cloud.tencent.com/document/product/248/45127',
  },
  // {
  //   service: 'tdmq',
  //   label: '消息队列 TDMQ(TDMQ)',
  //   namespace: 'QCE/TDMQ',
  //   href: 'https://cloud.tencent.com/document/product/248/51450',
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
  lb_loadBalance: 'loadBalance',
  postgresql: 'postgres',
  mongodb: 'mongoDB',
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

console.log(Datasources, InitStates, InstanceAliasList, GetInstanceQueryParams);
