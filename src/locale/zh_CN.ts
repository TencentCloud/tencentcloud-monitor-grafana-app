const zh_CN = {
  language: '语言',
  enable_intranet_API_mode: '开启内网API模式',
  cloud_database: '云数据库',
  cloud_load_balancer: '负载均衡',
  virtual_private_cloud: '私有网络',
  content_delivery_network: '内容分发网络',
  message_queue: '消息队列',
  direct_connect: '专线接入',
  cloud_physical_machine: '黑石物理服务器',
  elastic_mapReduce: '弹性 MapReduce',
  edge_computing_machine: '边缘计算机器',
  // namespace
  RUM: '前端性能监控(RUM)',
  CLS: '日志服务(CLS)',
  CVM: '云服务器(CVM)',
  CDB: '云数据库 MySQL(CDB)',
  CMONGO: '云数据库 MongoDB(CMONGO)',
  POSTGRES: '云数据库 PostgreSQL(POSTGRES)',
  REDIS: '云数据库 Redis(REDIS)',
  REDIS_MEM: '云数据库 Redis内存版(5s)(REDIS_MEM)',
  SQLSERVER: '云数据库 SQL Server(SQLSERVER)',
  CYNOSDB_MYSQL: '云数据库 CYNOSDB_MYSQL(CYNOSDB_MYSQL)',
  TCAPLUS: '云数据库 TcaplusDB(TCAPLUS)',
  TDMYSQL: '分布式数据库 TDSQL MySQL(TDMYSQL)',
  PCX: '私有网络-对等连接(PCX)',
  BWP: '私有网络-带宽包(BWP)',
  NAT_GATEWAY: '私有网络-NAT 网关(NAT_GATEWAY)',
  VPNGW: '私有网络-VPN 网关(VPNGW)',
  VPNX: '私有网络-VPN 通道(VPNX)',
  DCG: '私有网络-专线网关(DCG)',
  CEIP_SUMMARY: '私有网络-Anycast 弹性公网IP(CEIP_SUMMARY)',
  VPC_NET_DETECT: '私有网络-网络探测(VPC_NET_DETECT)',
  VBC: '私有网络-云联网(VBC)',
  LB: '私有网络-弹性公网IP(LB)',
  LB_PUBLIC: '公网负载均衡监控指标(LB_PUBLIC)',
  LB_PRIVATE: '内网负载均衡四层协议监控指标(LB_PRIVATE)',
  LOADBALANCE: '内网负载均衡七层协议监控指标(LOADBALANCE)',
  CDN: '国内域名(CDN)',
  CDN_LOG_DATA: '省份域名(CDN_LOG_DATA)',
  OV_CDN: '国外域名(OV_CDN)',
  SCF_V2: '云函数(SCF)',
  CFS: '文件存储(CFS)',
  COS: '对象存储(COS)',
  CKAFKA: '消息队列 CKafka(CKAFKA)',
  CMQ: '消息队列-队列服务监控(CMQ)',
  CMQTOPIC: '消息队列-主题订阅监控(CMQTOPIC)',
  TDMQ: '消息队列 Pulsar 版(TDMQ)',
  TDMQ_ROCKETMQ: '消息队列 RocketMQ 版(ROCKETMQ)',
  TDMQ_RABBITMQ: '消息队列 RabbitMQ 版(RABBITMQ)',
  DCX: '专线接入-专用通道(DCX)',
  DC: '专线接入-物理专线(DC)',
  CPM: '黑石物理服务器(CPM)',
  BM_PCX: '黑石对等连接(BM_PCX)',
  BM_LB: '黑石外网负载均衡(BM_LB)',
  BM_INTRA_LB: '黑石内网负载均衡(BM_INTRA_LB)',
  CES: 'Elasticsearch指标(CES)',
  BLOCK_STORAGE: '云硬盘(BLOCK_STORAGE)',
  APIGATEWAY: 'API 网关(APIGATEWAY)',
  QAAP: '全球应用加速(GAAP)',
  ECM: '边缘计算和网络监控(ECM)',
  ECM_BLOCK_STORAGE: '边缘计算存储监控(ECM_BLOCK_STORAGE)',
  ECM_LB: '边缘计算负载均衡(ECM_LB)',
  GSE: '游戏服务器伸缩(GSE)',
  TKE: '容器服务(TKE)',
  ECDN: '全站加速网络(ECDN)',
  WAF: 'Web 应用防火墙(WAF)',
  // others
  multi_scene: '多场景版',
  lite: '精简版',
  cloud_monitor: '云监控',
  cloud_log_service: '日志服务',
  real_user_monitoring: '前端性能监控',
  region: '地域',
  log_topic: '日志主题',
  syntax_rule: '语法规则',
  max_result_num: '最大结果条数',
  search_statement: '检索语句',
  time_unit: 'Time unit',
  seconds: 'seconds',
  search_description: '按照具体的查询条件搜索实例，默认拉取前 20 条实例',
  // region
  'ap-guangzhou': '华南地区(广州)',
  'ap-shenzhen-fsi': '华南地区(深圳金融)',
  'ap-guangzhou-open': '华南地区(广州OPEN)',
  'ap-shenzhen': '华南地区(深圳)',
  'ap-qingyuan': '华南地区(清远)',
  'ap-shanghai': '华东地区(上海)',
  'ap-shanghai-fsi': '华东地区(上海金融)',
  'ap-jinan-ec': '华东地区(济南)',
  'ap-hangzhou-ec': '华东地区(杭州)',
  'ap-nanjing': '华东地区(南京)',
  'ap-fuzhou-ec': '华东地区(福州)',
  'ap-hefei-ec': '华东地区(合肥)',
  'ap-beijing': '华北地区(北京)',
  'ap-tianjin': '华北地区(天津)',
  'ap-beijing-fsi': '华北地区(北京金融)',
  'ap-shijiazhuang-ec': '华北地区(石家庄)',
  'ap-wuhan-ec': '华中地区(武汉)',
  'ap-changsha-ec': '华中地区(长沙)',
  'ap-zhengzhou-ec': '华中地区(郑州)',
  'ap-chengdu': '西南地区(成都)',
  'ap-chongqing': '西南地区(重庆)',
  'ap-xian-ec': '西北地区(西安)',
  'ap-shenyang-ec': '东北地区(沈阳)',
  'ap-taipei': '港澳台地区(中国台北)',
  'ap-hongkong': '港澳台地区(中国香港)',
  'ap-seoul': '亚太东北(首尔)',
  'ap-tokyo': '亚太东北(东京)',
  'ap-singapore': '亚太东南(新加坡)',
  'ap-bangkok': '亚太东南(曼谷)',
  'ap-jakarta': '亚太东南(雅加达)',
  'na-siliconvalley': '美国西部(硅谷)',
  'eu-frankfurt': '欧洲地区(法兰克福)',
  'eu-moscow': '欧洲地区(莫斯科)',
  'ap-mumbai': '亚太南部(孟买)',
  'na-ashburn': '美国东部(弗吉尼亚)',
  'sa-saopaulo': '南美地区(圣保罗)',
  'na-toronto': '北美地区(多伦多)',
};
export default zh_CN;
