[![Tencent Cloud Monitor Grafana App](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-app.png?raw=true)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app)

[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)
[![License](https://img.shields.io/github/license/TencentCloud/tencentcloud-monitor-grafana-app?color=blue)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)
[![Change Log](https://img.shields.io/badge/change-log-blue.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CHANGELOG.md)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TencentCloud/tencentcloud-monitor-grafana-app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)

# 腾讯云监控插件 @ Grafana

简体中文 | [English](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.en-US.md)


> 注意：该插件从 2.0.0 版本起的最低运行要求为 Grafana 7.3 或更高的版本上。请优先安装 Grafana 环境，详情参考 [Grafana 安装文档](https://grafana.com/grafana/download)。

# 目录

- [简介](#简介)
- [入门指南](#入门指南)
  - [安装与更新](#安装与更新)
  - [启用插件](#启用插件)
  - [配置数据源](#配置数据源)
  - [创建 Dashboard](#创建-dashboard)
    - [快捷创建](#快捷创建)
    - [管理页面](#管理页面)
    - [导入模板](#导入模板)
  - [配置 Panel 数据](#配置-panel-数据)
- [模板变量](#模板变量)
  - [创建变量](#创建变量)
  - [编辑变量](#编辑变量)
  - [应用变量](#应用变量)
- [FAQs](#faqs)
- [联系我们](#联系我们)
- [贡献者 ✨](#贡献者-)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

# 简介

[腾讯云监控](https://cloud.tencent.com/product/cm) 为用户提供云服务器、云数据库等多个云产品的负载和性能监控指标，用户可以使用云监控控制台、云监控 API 等方式获取相关监控数据。腾讯云监控应用插件 Tencent Cloud Monitor App，是一款适配开源软件 Grafana 的应用插件，通过调用 [腾讯云监控 API 3.0](https://cloud.tencent.com/document/product/248/30342) 的方式获取监控数据，并对数据进行自定义 Dashboard 展示。

该插件提供了云服务器、云数据库 MySQL、负载均衡 等具有代表性的 [Dashboard 预设模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)

支持的云产品监控及文档如下表所示，更多云产品的监控指标数据源在陆续完善中。

产品名称 | 命名空间 | 指标文档 | 实例列表接口文档 |
------ | ------- | ------- | ------------- |
CVM 云服务器 | QCE/CVM | https://cloud.tencent.com/document/api/248/6843 | https://cloud.tencent.com/document/api/213/15728
CDB 云数据库 MySQL | QCE/CDB | https://cloud.tencent.com/document/api/248/45147 | https://cloud.tencent.com/document/api/236/15872
云数据库 PostgreSql | QCE/POSTGRES | https://cloud.tencent.com/document/product/248/45105 | https://cloud.tencent.com/document/api/409/16773
云数据库 MongoDB | QCE/CMONGO | https://cloud.tencent.com/document/product/248/45104 | https://cloud.tencent.com/document/api/240/38568
云数据库 Redis 内存版监控指标 (1分钟) | QCE/REDIS | https://cloud.tencent.com/document/product/248/45111 | https://cloud.tencent.com/document/api/239/20018
云数据库 Redis 内存版监控指标 (5秒) | QCE/REDIS_MEM | https://cloud.tencent.com/document/product/248/49729 | https://cloud.tencent.com/document/api/239/20018
云数据库 TDSQL-C (原CynosDB) | QCE/CYNOSDB_MYSQL | https://cloud.tencent.com/document/product/248/45106 | https://cloud.tencent.com/product/cynosdb
云数据库 TcaplusDB | QCE/TCAPLUS | https://cloud.tencent.com/document/product/248/45107 | https://cloud.tencent.com/document/api/1003/48334
云数据库 SQL Server | QCE/SQLSERVER | https://cloud.tencent.com/document/product/248/45146 | https://cloud.tencent.com/document/api/238/19969
分布式数据库 TDSQL MySQL(TDMYSQL) | QCE/TDMYSQL | https://cloud.tencent.com/document/product/248/54401 | https://cloud.tencent.com/document/api/557/16140
CDN 内容分发式网络 | QCE/CDN | https://cloud.tencent.com/document/product/248/50386 | https://cloud.tencent.com/document/api/228/41118
CDN 省份域名 | QCE/CDN_LOG_DATA | https://cloud.tencent.com/document/product/248/50388 | https://cloud.tencent.com/document/api/228/41118
BWP 带宽包 | QCE/BWP | https://cloud.tencent.com/document/product/248/45098 | https://cloud.tencent.com/document/api/215/19209
CKafka 消息队列 | QCE/CKAFKA | https://cloud.tencent.com/document/product/248/45121 | https://cloud.tencent.com/document/api/597/40835
CLB 公网负载均衡 | QCE/LB_PUBLIC | https://cloud.tencent.com/document/product/248/51898 | https://cloud.tencent.com/document/api/214/30685
CLB 内网负载均衡四层协议 | QCE/LB_PRIVATE | https://cloud.tencent.com/document/product/248/51899 | https://cloud.tencent.com/document/api/214/30685
CLB 负载均衡七层协议 | QCE/LOADBALANCE | https://cloud.tencent.com/document/product/248/51901 | https://cloud.tencent.com/document/api/214/30685
LB 弹性公网IP | QCE/LB | https://cloud.tencent.com/document/product/248/45099 | https://cloud.tencent.com/document/api/215/16702
CFS 文件存储 | QCE/CFS | https://cloud.tencent.com/document/product/248/45143 | https://cloud.tencent.com/document/api/582/38170
SCF 云函数 | QCE/SCF_V2 | https://cloud.tencent.com/document/product/248/45130 | https://cloud.tencent.com/document/api/583/18582
专线接入 专用通道 | QCE/DCX | https://cloud.tencent.com/document/product/248/45101 | https://cloud.tencent.com/document/api/216/19819
专线接入 物理专线 | QCE/DC | https://cloud.tencent.com/document/product/248/45102 | https://cloud.tencent.com/document/api/216/34826
私有网络 VPN 网关 | QCE/VPNGW | https://cloud.tencent.com/document/product/248/45070 | https://cloud.tencent.com/document/api/215/17514
私有网络 专线网关 | QCE/DCG | https://cloud.tencent.com/document/product/248/45072 | https://cloud.tencent.com/document/api/215/30644
私有网络 NAT 网关 | QCE/NAT_GATEWAY | https://cloud.tencent.com/document/product/248/45069 | https://cloud.tencent.com/document/api/215/36034
私有网络 对等连接 | QCE/PCX | https://cloud.tencent.com/document/product/248/45096 | https://cloud.tencent.com/document/product/215/2101
私有网络 VPN 通道 | QCE/VPNX | https://cloud.tencent.com/document/product/248/45071 | https://cloud.tencent.com/document/api/215/17515
私有网络 Anycast弹性公网IP | QCE/CEIP_SUMMARY | https://cloud.tencent.com/document/product/248/50381 | https://cloud.tencent.com/document/api/215/16702
私有网络 网络探测 | QCE/VPC_NET_DETECT | https://cloud.tencent.com/document/product/248/50384 | https://cloud.tencent.com/document/api/215/38696
私有网络 云联网 | QCE/VBC | https://cloud.tencent.com/document/product/248/45073 | https://cloud.tencent.com/document/api/215/19199
API 网关 | QCE/APIGATEWAY | https://cloud.tencent.com/document/product/248/45127 | https://cloud.tencent.com/document/api/628/45198
CBS 云硬盘 | QCE/BLOCK_STORAGE | https://cloud.tencent.com/document/product/248/45411 | https://cloud.tencent.com/document/api/362/16315
Elasticsearch | QCE/CES | https://cloud.tencent.com/document/product/248/45129 | https://cloud.tencent.com/document/api/845/30631
CMQ 消息队列服务 | QCE/CMQ | https://cloud.tencent.com/document/product/248/45114 | https://cloud.tencent.com/document/api/406/42624
CMQ 消息队列主题订阅 | QCE/CMQTOPIC | https://cloud.tencent.com/document/product/248/45113 | https://cloud.tencent.com/document/api/406/42637
消息队列 TDMQ | QCE/TDMQ | https://cloud.tencent.com/document/product/248/51450 | https://cloud.tencent.com/document/api/1179/52183
黑石物理服务器1.0 | QCE/CPM | https://cloud.tencent.com/document/product/248/45881 | https://cloud.tencent.com/document/api/386/32904
黑石物理服务器 黑石对等连接 | QCE/BM_PCX | https://cloud.tencent.com/document/product/248/45884 | https://cloud.tencent.com/document/product/1024/36903
黑石物理服务器 黑石外网负载均衡 | QCE/BM_LB | https://cloud.tencent.com/document/product/248/45886 | https://cloud.tencent.com/document/api/1027/33280
黑石物理服务器 黑石内网负载均衡 | QCE/BM_INTRA_LB | https://cloud.tencent.com/document/product/248/45885 | https://cloud.tencent.com/document/api/1027/33280
弹性 MapReduce（HDFS） | QCE/TXMR_HDFS | https://cloud.tencent.com/document/product/248/44797 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（HBASE） | QCE/TXMR_HBASE | https://cloud.tencent.com/document/product/248/45567 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（HIVE） | QCE/TXMR_HIVE | https://cloud.tencent.com/document/product/248/45569 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（NODE） | QCE/TXMR_NODE | https://cloud.tencent.com/document/product/248/45570 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（PRESTO） | QCE/TXMR_PRESTO | https://cloud.tencent.com/document/product/248/45571 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（SPARK） | QCE/TXMR_SPARK | https://cloud.tencent.com/document/product/248/45572 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（YARN） | QCE/TXMR_YARN | https://cloud.tencent.com/document/product/248/45573 | https://cloud.tencent.com/document/api/589/34266
弹性 MapReduce（ZOOKEEPER） | QCE/TXMR_ZOOKEEPER | https://cloud.tencent.com/document/product/248/45574 | https://cloud.tencent.com/document/api/589/34266
边缘计算机器 计算和网络 | QCE/ECM | https://cloud.tencent.com/document/product/248/45124 | https://cloud.tencent.com/document/api/1108/42565
边缘计算机器 存储 | QCE/ECM_BLOCK_STORAGE | https://cloud.tencent.com/document/product/248/45123 | https://cloud.tencent.com/document/api/1108/42565
边缘计算机器 负载均衡四层协议 | QCE/ECM_LB | https://cloud.tencent.com/document/product/248/54253 | https://cloud.tencent.com/document/api/1108/48459
对象存储 | QCE/COS | https://cloud.tencent.com/document/product/248/45140 | https://cloud.tencent.com/document/api/436/8291
全球应用加速 | QCE/QAAP | https://cloud.tencent.com/document/product/248/45062 | https://cloud.tencent.com/document/api/608/36963
游戏服务器伸缩 | QCE/GSE | https://cloud.tencent.com/document/product/248/55273 ｜ https://cloud.tencent.com/document/api/1165/42076

# 入门指南

## 安装与更新

> 前置条件：腾讯云监控应用插件是运行在 Grafana 7.3 或更高的版本上。请优先安装 Grafana 环境，详情参考 [Grafana 安装文档](https://grafana.com/grafana/download)。

使用 Grafana CLI 安装：

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```

或者[阅读更多安装与更新方式](https://cloud.tencent.com/document/product/248/54506)。

## 启用插件

鼠标悬浮左侧导航栏的 **齿轮** 图标，点击 `Plugins` 选项，进入 Plugins 管理页面，如果插件列表中正常展示 `Tencent Cloud Monitor` APP 插件，表示插件安装成功；

![Plugin Search](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-search.png?raw=true)

进入应用详情页面，点击 `Enable` 按钮，启用成功后，即可在 Grafana 中使用腾讯云监控应用插件。

![Plugin Enable](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-enable.png?raw=true)

## 配置数据源

腾讯云监控应用插件通过调用 [云监控 API](https://cloud.tencent.com/document/product/248/30342) 的方式获取各云产品的监控指标数据，通过以下步骤，配置相应云产品的数据源。    
1. 鼠标悬浮左侧导航栏的 **齿轮** 图标，单击 【Data Sources】选项，进入数据源管理页面；
  ![Datasource Add](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-add.png?raw=true)
2. 点击右上角的 `Add data source` 按钮，然后单击【Tencent Cloud Monitoring】数据源，进入数据源配置页面；
  ![Datasource Choose](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-choose.png?raw=true)
3. `Name` 数据源名称，可以是任意名称，默认为 `Tencent Cloud Monitoring`；  
4. `SecretId` 和 `SecretKey` 是调用云监控 API 必需的安全证书信息，二者可以通过腾讯云控制台 [云 API 密钥页面](https://console.cloud.tencent.com/cam/capi) 获取；
5. 选择需要获取监控数据的云产品；  
6. 单击【Save & Test】按钮，测试数据源的配置信息是否正确，配置成功后，即可以在 Dashboard 中使用该数据源。
  ![Datasource Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-config.png?raw=true)

## 创建 Dashboard

支持快捷创建、管理页面和导入模板三种方式创建 Dashboard。 

### 快捷创建

鼠标悬浮左侧导航栏的 **加号** 图标，单击【Dashboard】选项，即可创建一个新的 Dashboard。

### 管理页面

鼠标悬浮左侧导航栏的 **田字格** 图标，单击【Manage】选项，进入 Dashboard 管理页面，单击【New Dashboard】按钮，即可创建一个新的 Dashboard。同时，在该页面可以对 Dashboard 进行各种管理操作，如新建文件夹、移动 Dashboard、导入 Dashboard 等。

### 导入模板

鼠标悬浮左侧导航栏的 **齿轮** 图标，单击【Plugins】选项，进入 Plugins 管理页面。然后，单击【Tencent Cloud Monitor】应用，进入应用详情页面，切换至 `Dashboards` 选项卡，选择 Dashbboard 模板导入。

![Import Plugin Dashboard](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-dashboard.png?raw=true)


## 配置 Panel 数据

![CVM Panel Query](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/panel-cvm-query.png?raw=true)

创建 Dashboard 之后，通过配置 Panel 信息，即可获取腾讯云监控的相应监控数据。现在以简单的 Graph 为例，展示如何配置 Panel 信息。
1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，选择 上面配置的腾讯云监控数据源。
2. `Namespace` 命名空间，例如云服务器监控的命名空间为 `QCE/CVM`。
3. `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
4. `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。[点击查看](#简介)各个云产品的指标文档。
5. `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
6. `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。[点击查看](#简介)各个云产品的实例列表接口文档。
   - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认以各产品的 **ID** 展示。
   - `Show Details` 按钮仅在选择非模板变量时显示，切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
   - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击底部 `+ Query` 增加新的查询。


# 模板变量

模板变量 [Variables](https://grafana.com/docs/reference/templating/) 是 Grafana 提供的一种 Dashboard 优化特性，用于创建高度可复用和交互式 Dashboard。模板变量的一般思想是允许 Grafana 从数据源获得不同的度量，并提供一种无需修改仪表板就可以动态更改它的方法。腾讯云监控应用目前提供了地域、云服务器实例、云数据库 MySQL 实例 等变量。

所有实例类 Query 支持自定义下拉框选项展示字段，通过 `display` 字段设置，如：`Namespace=QCE/CVM&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`。如果同时存在 `InstanceAlias` 和 `display` 字段，则仅会展示 `display` 的值。

2.1.0 版本起新增 `payload` 参数，支持在模板变量中过滤实例，如：
```
Namespace=QCE/CVM&
Action=DescribeInstances&
Region=ap-guangzhou&
InstanceAlias=InstanceId&
payload={
  "Filters":[
    {
      "Name": "zone",
      "Values": ["ap-guangzhou-1"]
    }
  ]
}
```
可过滤可用区为 `广州一区` 的实例。注意 `payload` 参数为严格 JSON 字符串。


已经提供的模板变量如下表所示：  

变量 | 描述 | 示例 |
---- | --- | --- |
地域 | 参考 [地域接口文档](https://cloud.tencent.com/document/api/213/15708)。`Action` 固定为 `DescribeRegions`，`Namespace` 为云产品对应的命名空间，如 `QCE/CVM` `QCE/CDB`等。地区作为变量模板，只支持单选，如设置成多选或者选中 `All`, 默认选中第一个地区值。 |  Namespace=QCE/CVM&Action=DescribeRegions |
CVM 云服务器实例 | 参考 [云服务器查询实例列表接口文档](https://cloud.tencent.com/document/api/213/15728)。`Namespace` 固定为`QCE/CVM`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`、`PrivateIpAddresses`、`PublicIpAddresses`。云服务器实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=PublicIpAddresses
CDB 云数据库 MySQL 实例 | 参考 [云数据库MySQL查询实例列表接口文档](https://cloud.tencent.com/document/api/236/15872)。`Namespace` 固定为`QCE/CDB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`、`Vip`。云数据库实例作为模板变量，同时支持单选和多选。 |  Namespace=QCE/CDB&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=InstanceId
云数据库 PostgreSql 实例 | 参考 [云数据库PostgreSQL查询实例列表接口文档](https://cloud.tencent.com/document/api/409/16773)。`Namespace` 固定为`QCE/CDB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DBInstanceId`，可选值为 `DBInstanceName`, `PrivateIpAddresses`, `PublicIpAddresses`。云数据库实例作为模板变量，同时支持单选和多选。 |  Namespace=QCE/POSTGRES&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=DBInstanceId
云数据库 MongoDB 实例 | 参考 [CMONGO实例查询实例列表接口文档](https://cloud.tencent.com/document/api/240/38568)。`Namespace` 固定为`QCE/CMONGO`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CMONGO实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CMONGO&Region=$region&Action=DescribeInstances
云数据库 Redis 实例 | 参考 [REDIS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/239/20018)。`Namespace` 固定为`QCE/REDIS`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。REDIS实例作为模板变量，同时支持单选和多选。  |   Namespace=QCE/REDIS&Region=$region&Action=DescribeInstances
云数据库 TDSQL-C (原CynosDB) | 参考 [CYNOSDBMYSQL实例查询实例列表接口文档]()。`Namespace` 固定为`QCE/CYNOSDB_MYSQL`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CYNOSDBMYSQL实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CYNOSDB_MYSQL&Region=$region&Action=DescribeInstances
云数据库 TcaplusDB 实例 | 参考 [TCAPLUS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/1003/48334)。`Namespace` 固定为`QCE/TCAPLUS`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。TCAPLUS实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/TCAPLUS&Region=$region&Action=DescribeInstances
云数据库 SQL Server 实例 | 参考 [SQLSERVER实例查询实例列表接口文档](https://cloud.tencent.com/document/api/238/19969)。`Namespace` 固定为`QCE/SQLSERVER`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `Name`。SQLSERVER实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/SQLSERVER&Region=$region&Action=DescribeInstances
私有网络 NateGateway 实例 | 参考 [私有网络Nat网关查询实例列表接口文档](https://cloud.tencent.com/document/api/215/36034)。`Namespace` 固定为`QCE/NAT_GATEWAY`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `NatGatewayId`，可选值为 `NatGatewayName`。NateGateway 网关实例作为模板变量，同时支持单选和多选。 |  Namespace=QCE/NAT_GATEWAY&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=NatGatewayId
私有网络对等连接实例 | 参考 [私有网络对等连接查询实例列表接口文档](https://cloud.tencent.com/document/api/215/2101)。`Namespace` 固定为`QCE/PCX`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `peeringConnectionId`，可选值为 `peeringConnectionName`。对等连接实例作为模板变量，同时支持单选和多选（如果是负载均衡则不支持多选，可选多个监听器）。 |  Namespace=QCE/PCX&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=peeringConnectionId
CLB 负载均衡实例 | 参考 [负载均衡实例列表接口文档](https://cloud.tencent.com/document/product/214/30685)。`Namespace` 可为`QCE/LB_PRIVATE`，`QCE/LB_PUBLIC`，`QCE/LOADBALANCE`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `LoadBalancerId`，可选值为 `LoadBalancerName`，`LoadBalancerVips`。同时支持单选和多选。 |  Namespace=QCE/LB_PRIVATE&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
负载均衡监听器 | 参考 [负载均衡监听器列表接口文档](https://cloud.tencent.com/document/product/214/30686)。`Namespace` 可为`QCE/LB_PRIVATE`，`QCE/LB_PUBLIC`，`QCE/LOADBALANCE`，`Action` 固定为`DescribeListeners`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`Instance` 为实例id，可以为特定的实例，如 `lbl-rbw529fz`；也可以为变量值，如 `$instance`。`listenerAlias` 为监听器的展示字段，默认为 `ListenerId`，可选值为 `ListenerName`，`Port`。同时支持单选和多选。 |  Namespace=QCE/LB_PRIVATE&Action=DescribeListeners&Region=$region&Instance=$instance&listenerAlias=ListenerId
CDN 内容分发式网络实例| 参考 [CDN实例查询实例列表接口文档](https://cloud.tencent.com/document/api/228/41118)。`Namespace` 固定为`QCE/CDN`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `Domain`，可选值为 `Domain`, `ProjectId`。CDN实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CDN&Region=$region&Action=DescribeInstances 
CDN 省份域名 | 参考 [CDNPROVINCE实例查询实例列表接口文档](https://cloud.tencent.com/document/api/228/41118)。`Namespace` 固定为`QCE/CDN_LOG_DATA`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `Domain`，可选值为 `ProjectId`。 |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances
CDN 省份运营商 | 参考 [CDNPROVINCE的map信息列表接口文档](https://cloud.tencent.com/document/api/228/31296)。`Namespace` 固定为`QCE/CDN_LOG_DATA`，`Action` 固定为`DescribeMapInfo`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`Instance` 为实例,可为变量值，如`$instance`。`Name`为接口必填参数，用于获取运营商或者省份列表，isp-运营商，district-省份。详见参考文档 |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances&Instance=$instance&Name=isp
BWP 带宽包实例 | 参考 [BWP实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/19209)。`Namespace` 固定为`QCE/BWP`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `BandwidthPackageId`，可选值为 `BandwidthPackageId`, `BandwidthPackageName`。BWP实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/BWP&Region=$region&Action=DescribeInstances
CKafka 消息队列实例            | 参考 [CKAFKA实例查询实例列表接口文档](https://cloud.tencent.com/document/api/597/40835)。`Namespace` 固定为`QCE/CKAFKA`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CKAFKA实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CKAFKA&Region=$region&Action=DescribeInstances
CKafka 消息队列实例-topicId     | 参考 [CKAFKA实例查询topic列表接口文档](https://cloud.tencent.com/document/api/597/40841)。`Namespace` 固定为`QCE/CKAFKA`，`Action` 固定为`DescribeTopicList`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`Instance` 为实例参数，可以为特定值，如 `ckafka-018qxxx`；也可以为变量值，如 `$instance` |   Namespace=QCE/CKAFKA&Region=$region&Action=DescribeTopicList&instance=$instance
LB 弹性公网IP 实例 | 参考 [LB实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/16702)。`Namespace` 固定为`QCE/LB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `AddressId`，可选值为 `AddressId`, `AddressName`, `AddressIp`。LB实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/LB&Region=$region&Action=DescribeInstances
CFS 文件存储实例 | 参考 [CFS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/582/38170)。`Namespace` 固定为`QCE/CFS`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `FileSystemId`，可选值为 `FileSystemId`, `FsName`。CFS实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CFS&Region=$region&Action=DescribeInstances
SCF云函数实例 | 参考 [SCF实例查询实例列表接口文档](https://cloud.tencent.com/document/api/583/18582)。`Namespace` 固定为`QCE/SCF_V2`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `FunctionId`，可选值为 `FunctionId`, `FunctionName`。SCF实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/SCF_V2&Region=$region&Action=DescribeInstances
DCX 专线接入-专用通道实例 | 参考 [DCX实例查询实例列表接口文档](https://cloud.tencent.com/document/api/216/19819)。`Namespace` 固定为`QCE/DCX`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DirectConnectTunnelId`，可选值为 `DirectConnectTunnelName`。DCX实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/DCX&Region=$region&Action=DescribeInstances
DC 专线接入-物理专线实例 | 参考 [DC实例查询实例列表接口文档](https://cloud.tencent.com/document/api/216/34826)。`Namespace` 固定为`QCE/DC`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DirectConnectId`，可选值为 `DirectConnectName`。DC实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/DC&Region=$region&Action=DescribeInstances
私有网络-VPN 网关实例 | 参考 [VPNGW实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/17514)。`Namespace` 固定为`QCE/VPNGW`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `VpnGatewayId`，可选值为 `VpnGatewayName`。VPNGW实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/VPNGW&Region=$region&Action=DescribeInstances
私有网络-专线网关实例 | 参考 [DCG实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/30644)。`Namespace` 固定为`QCE/DCG`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DirectConnectGatewayId`，可选值为 `DirectConnectGatewayName`。DCG实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/DCG&Region=$region&Action=DescribeInstances
私有网络-VPN 通道 | 参考 [VPNX实例列表接口文档](https://cloud.tencent.com/document/api/215/17515)。`Namespace` 固定为QCE/VPNX，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `VpnConnectionId`，可选值为 `VpnConnectionId`，`VpnConnectionName`。同时支持单选和多选。 |  Namespace=QCE/VPNX&Action=DescribeInstances&Region=$region&InstanceAlias=VpnConnectionId
私有网络-Anycast弹性公网IP | 参考 [CEIP_SUMMARY实例列表接口文档](https://cloud.tencent.com/document/api/215/16702)。`Namespace` 固定为QCE/CEIP_SUMMARY，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `AddressId`，可选值为 `AddressId`，`AddressName`，`AddressIp`。同时支持单选和多选。 |  Namespace=QCE/CEIP_SUMMARY&Action=DescribeInstances&Region=$region&InstanceAlias=AddressId
私有网络-网络探测 | 参考 [VPC_NET_DETECT实例列表接口文档](https://cloud.tencent.com/document/api/215/38696)。`Namespace` 固定为QCE/VPC_NET_DETECT，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `NetDetectId`，可选值为 `NetDetectId`，`NetDetectName`。同时支持单选和多选。 |  Namespace=QCE/VPC_NET_DETECT&Action=DescribeInstances&Region=$region&InstanceAlias=NetDetectId
私有网络-云联网 | 参考 [VBC实例列表接口文档](https://cloud.tencent.com/document/api/215/19199)。`Namespace` 固定为QCE/VBC，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `CcnId`，可选值为 `CcnId`，`CcnName`。同时支持单选和多选。 |  Namespace=QCE/VBC&Action=DescribeInstances&Region=$region&InstanceAlias=CcnId
API 网关实例 | 参考 [APIGATEWAY实例查询实例列表接口文档](https://cloud.tencent.com/document/api/628/45194)。`Namespace` 固定为`QCE/APIGATEWAY`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ServiceId`，可选值为 `ServiceName`。 | Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances
API 网关服务环境 | 参考 [APIGATEWAY服务环境列表接口文档](https://cloud.tencent.com/document/api/628/45198)。`Namespace` 固定为`QCE/APIGATEWAY`，`Action` 固定为`DescribeServiceEnvironmentList`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`Instance` 为实例，可以为特定的地域值；也可以为变量值，如 `$instance`。 | Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances&Instance=$instance
CBS 云硬盘实例 | 参考 [CBS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/362/16315)。`Namespace` 固定为`QCE/BLOCK_STORAGE`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DiskId`，可选值为 `DiskName`。CBS实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/BLOCK_STORAGE&Region=$region&Action=DescribeInstances
Elasticsearch 实例 | 参考 [CES实例查询实例列表接口文档](https://cloud.tencent.com/document/api/845/30631)。`Namespace` 固定为`QCE/CES`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CES实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CES&Region=$region&Action=DescribeInstances
CMQ 消息队列实例 | 参考 [CMQ实例查询实例列表接口文档](https://cloud.tencent.com/document/api/406/42624)。`Namespace` 固定为`QCE/CMQ`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `QueueName`，可选值为 `QueueId`。CMQ实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CMQ&Region=$region&Action=DescribeInstances
CMQ 消息队列主题订阅实例 | 参考 [CMQTOPIC实例查询实例列表接口文档](https://cloud.tencent.com/document/api/406/42637)。`Namespace` 固定为`QCE/CMQTOPIC`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `TopicName`，可选值为 `TopicId`。CMQTOPIC实例作为模板变量，同时支持单选和多选。 |   Namespace=QCE/CMQTOPIC&Region=$region&Action=DescribeInstances
分布式数据库 TDSQL MySQL(TDMYSQL) | 参考 [分布式数据库 TDSQL MySQL(TDMYSQL)实例列表接口文档](https://cloud.tencent.com/document/api/557/16140)。`Namespace` 固定为QCE/TDMYSQL，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceId`，`InstanceName`。同时支持单选和多选。 |  Namespace=QCE/TDMYSQL&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
对象存储(COS) | 参考 [对象存储(COS)实例列表接口文档](https://cloud.tencent.com/document/api/436/8291)。`Namespace` 固定为QCE/COS，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `BucketName`，可选值为 `BucketName`。同时支持单选和多选。 |  Namespace=QCE/COS&Action=DescribeInstances&Region=$region&InstanceAlias=BucketName
消息队列 TDMQ(TDMQ) | 参考 [消息队列 TDMQ(TDMQ)实例列表接口文档](https://cloud.tencent.com/document/api/1179/52183)。`Namespace` 固定为QCE/TDMQ，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TDMQ&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
黑石物理服务器(CPM) | 参考 [黑石物理服务器(CPM)实例列表接口文档](https://cloud.tencent.com/document/api/386/32904)。`Namespace` 固定为QCE/CPM，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceId`，`Name`。同时支持单选和多选。 |  Namespace=QCE/CPM&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
黑石对等连接(BM_PCX) | 参考 [黑石对等连接(BM_PCX)实例列表接口文档](https://cloud.tencent.com/document/product/1024/36903)。`Namespace` 固定为QCE/BM_PCX，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `VpcPeerConnectionId`，可选值为 `VpcPeerConnectionId`，`VpcPeerConnectionName`。同时支持单选和多选。 |  Namespace=QCE/BM_PCX&Action=DescribeInstances&Region=$region&InstanceAlias=VpcPeerConnectionId
黑石外网负载均衡(BM_LB) | 参考 [黑石外网负载均衡(BM_LB)实例列表接口文档](https://cloud.tencent.com/document/api/1027/33280)。`Namespace` 固定为QCE/BM_LB，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `LoadBalancerId`，可选值为 `LoadBalancerId`，`LoadBalancerVips`，`LoadBalancerName`。同时支持单选和多选。 |  Namespace=QCE/BM_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
黑石内网负载均衡(BM_INTRA_LB) | 参考 [黑石内网负载均衡(BM_INTRA_LB)实例列表接口文档](https://cloud.tencent.com/document/api/1027/33280)。`Namespace` 固定为QCE/BM_INTRA_LB，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `LoadBalancerId`，可选值为 `LoadBalancerId`，`LoadBalancerVips`，`LoadBalancerName`。同时支持单选和多选。 |  Namespace=QCE/BM_INTRA_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
弹性MapReduce(HDFS) | 参考 [弹性MapReduce(HDFS)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_HDFS，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_HDFS&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(HBASE) | 参考 [弹性MapReduce(HBASE)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_HBASE，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_HBASE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(HIVE) | 参考 [弹性MapReduce(HIVE)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_HIVE，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_HIVE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(NODE) | 参考 [弹性MapReduce(NODE)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_NODE，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_NODE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(PRESTO) | 参考 [弹性MapReduce(PRESTO)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_PRESTO，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_PRESTO&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(SPARK) | 参考 [弹性MapReduce(SPARK)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_SPARK，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_SPARK&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(YARN) | 参考 [弹性MapReduce(YARN)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_YARN，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_YARN&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
弹性MapReduce(ZOOKEEPER) | 参考 [弹性MapReduce(ZOOKEEPER)实例列表接口文档](https://cloud.tencent.com/document/api/589/34266)。`Namespace` 固定为QCE/TXMR_ZOOKEEPER，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `ClusterId`，可选值为 `ClusterId`，`ClusterName`。同时支持单选和多选。 |  Namespace=QCE/TXMR_ZOOKEEPER&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
全球应用加速(QAAP) | 参考 [全球应用加速(QAAP)实例列表接口文档](https://cloud.tencent.com/document/api/608/36963)。`Namespace` 固定为QCE/QAAP，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceId`。同时支持单选和多选。 |  Namespace=QCE/QAAP&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
边缘计算和网络监控(ECM) | 参考 [边缘计算和网络监控(ECM)实例列表接口文档](https://cloud.tencent.com/document/api/1108/42565)。`Namespace` 固定为QCE/ECM，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceId`，`InstanceName`。同时支持单选和多选。 |  Namespace=QCE/ECM&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
边缘计算存储监控(ECM_BLOCK_STORAGE) | 参考 [边缘计算存储监控(ECM_BLOCK_STORAGE)实例列表接口文档](https://cloud.tencent.com/document/api/1108/42565)。`Namespace` 固定为QCE/ECM_BLOCK_STORAGE，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceId`，`InstanceName`。同时支持单选和多选。 |  Namespace=QCE/ECM_BLOCK_STORAGE&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
边缘计算负载均衡(ECM_LB) | 参考 [边缘计算负载均衡(ECM_LB)实例列表接口文档](https://cloud.tencent.com/document/api/1108/48459)。`Namespace` 固定为QCE/ECM_LB，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `LoadBalancerId`，可选值为 `LoadBalancerId`，`LoadBalancerName`。同时支持单选和多选。 |  Namespace=QCE/ECM_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
游戏服务器伸缩监控指标(GSE) | 参考 [游戏服务器伸缩监控指标实例列表接口文档](https://cloud.tencent.com/document/api/1165/42604)。`Namespace` 固定为QCE/GSE`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `PrivateIpAddress`，`IpAddress`。同时支持单选和多选。 |  Namespace=QCE/GSE&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
游戏服务器伸缩监控指标(GSE)-舰队列表 | 参考 [游戏服务器伸缩监控指标舰队列表接口文档](https://cloud.tencent.com/document/api/1165/48740)。`Namespace` 固定为`QCE/GSE`。`Action` 固定为`ListFleets`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`instance` 为实例参数，可以为特定的值，如 `ins-9kvpxxx`；也可以为变量值，如 `$instance`。 |  Namespace=QCE/GSE&Action=ListFleets&Region=$region&Instance=$instance
游戏服务器伸缩监控指标(GSE)-会话队列 | 参考 [游戏服务器伸缩监控指标会话队列接口文档](https://cloud.tencent.com/document/api/1165/44552)。`Namespace` 固定为`QCE/GSE`。`Action` 固定为`DescribeGameServerSessionQueues`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`instance` 为实例参数，可以为特定的值，如 `ins-9kvpxxx`；也可以为变量值，如 `$instance`。 |  Namespace=QCE/GSE&Action=DescribeGameServerSessionQueues&Region=$region&Instance=$instance

## 创建变量

1. 进入某一 Dashboard 页面，点击右上角的 **齿轮** 图标，进入 Dashboard 设置页面；
2. 点击左侧 **Variables** 选项，进入变量设置页面，然后点击 `+ Add variable` 按钮，进入变量编辑页面；

## 编辑变量

- `Name` 变量名，一般为英文字符串，在 Dashboard 的编辑中使用该变量名替换原特定值。
- `Label` 变量的可见标签，用于更显式地描述变量名称。例如，`Name` 设置为 "region"，`Lable` 可设置为 "地区"。
- `Type` 变量查询方式，此处只能选择 `Query` 方式，即通过向数据源发送请求获取变量的列表。
- `Data source` 要获取变量列表的数据源，选择已配置的任意腾讯云监控数据源。
- `Refresh`  更新变量的方式，定义变量数据何时被更新。
- `Query` 变量查询语句，详情参见上述表格的变量示例和描述。

变量信息填写完毕，可在页面下方预览查询得到的变量值，如果与期望值相符，点击 `Add` 按钮添加变量。添加成功后，点击右侧菜单的 `Save` 保存至 Dashboard 配置。

以云服务器单机监控 Dashboard 为例，展示如何配置级联变量：地域变量、云服务器实例变量，如下图所示。

![Variable Region Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-region-config.png?raw=true)

![Variable Instance Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-instance-config.png?raw=true)

如需多选实例可将 `Selection Options` 下的 `Multi-value` 激活；地域模板变量仅支持单选；

## 应用变量
创建变量后，在 Dashboard 页面的左上角会展示变量选择框，可以切换变量值。变量有两种引用语法，`$varname` 和 `[[varname]]`。变量常用于 Panel 的查询语句中，以云服务器单机监控 Dashboard 为例，展示如何在查询中使用变量，如下图所示。此外，变量还可以应用在 Panel 标题、Text 文本面板等。

![Variable Dashboard](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-cvm-dashboard.png?raw=true)

![Variable Panel Query](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-panel-query.png?raw=true)

# FAQs
**Q:** 插件支持在同一个 Panel 中多地域查询吗？

**A:** 如果在 Dashboard 中使用 `region` 模板变量，则仅支持单地域查询。多地域实例对比可在同一个 Panel 中建多个 Query Target；
##

**Q:** 插件支持在同地域多个实例对比吗？

**A:** 可以将模板变量中 `Selection Options` 下的 `Multi-value` 设置为 true， Dashboard 中下拉框便可以进行多选实例，如图所示：
![](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/faq-q2-1.png?raw=true)  
![](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/faq-q2-2.png?raw=true)
##

**Q:** 对比多个实例时，模板中报错 `Only queries that return single series/table is supported`。
![](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/faq-q3.png?raw=true)  

**A:** 部分 Panel 类型如`仪表盘`图表仅支持单 query 查询，如需对比多实例请使用折线图 (Line)。
##

**Q:** 模板变量中的实例下拉框的选项显示的是 `InstanceId` ，如何展示 `InstanceName` ？

**A:** 可以在模板变量中使用 `InstanceAlias=InstanceName` ，或者使用 `display` 属性进行拼接，例：
  1. `Namespace=QCE/CVM&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceName`
  2. `Namespace=QCE/CVM&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`

![](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/faq-q4.png?raw=true)  

如果同时存在 `InstanceAlias` 和 `display` 字段，则仅会展示 `display` 的值。

# 联系我们

若在使用过程中遇到任何问题，您可以在此[创建 issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)，或者扫码添加 云监控插件@Grafana 使用交流QQ群，我们将竭诚为您服务！

| QQ 群 (861359693) |
| ----------- |
| ![861359693](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/QQ-QRCode.png?raw=true) |

# 贡献者 ✨

感谢这些可爱的人对此项目的热爱 ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors)

<table>
  <tr>
    <td align="center"><a href="https://github.com/heriky"><img src="https://avatars.githubusercontent.com/u/12195736?v=4?s=70" width="70px;" alt=""/><br /><sub><b>heriky</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jamesxwang"><img src="https://avatars.githubusercontent.com/u/36892657?v=4?s=70" width="70px;" alt=""/><br /><sub><b>jamesxwang</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=jamesxwang" title="Code">💻</a> <a href="#" title="Documentation	">📖</a></td>
    <td align="center"><a href="https://github.com/leonlysu"><img src="https://avatars.githubusercontent.com/u/73583724?v=4?s=70" width="70px;" alt=""/><br /><sub><b>leonlysu</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=leonlysu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/bonnielliu-cloud"><img src="https://avatars.githubusercontent.com/u/85279550?v=4?s=70" width="70px;" alt=""/><br /><sub><b>bonnielliu-cloud</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/smallpath"><img src="https://avatars.githubusercontent.com/u/10809900?v=4?s=70" width="70px;" alt=""/><br /><sub><b>smallpath</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/susiezhao"><img src="https://avatars.githubusercontent.com/u/13827192?v=4?s=70" width="70px;" alt=""/><br /><sub><b>susiezhao</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/taoran34"><img src="https://avatars.githubusercontent.com/u/9361046?v=4?s=70" width="70px;" alt=""/><br /><sub><b>taoran34</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Cloudlie"><img src="https://avatars.githubusercontent.com/u/7425309?v=4?s=70" width="70px;" alt=""/><br /><sub><b>Cloudlie</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=Cloudlie" title="Code">💻</a><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/created_by/Cloudlie">🐛</a></td>
  </tr>
    <td align="center"><a href="https://github.com/woson-wang"><img src="https://avatars.githubusercontent.com/u/34298517?v=4?s=70" width="70px;" alt=""/><br /><sub><b>woson-wang</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/created_by/woson-wang">🐛</a></td>
  <tr>
  
  </tr>
</table>

该项目遵循 [all-contributors](https://github.com/all-contributors/all-contributors) 规范。 欢迎任何形式的贡献！

# 贡献指南

欢迎大家参与到 腾讯云监控插件 @ Grafana 的开发工作，贡献一份力量！

您可以选择如下的贡献方式：

- [贡献 Dashboard 模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [贡献代码，提交 Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [反馈 bug，提交 Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

我们会将您加入 [我们的贡献者名单](#contributors)；

贡献方式请参考 [贡献指南](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.md) 文档。

# 许可证
腾讯云监控应用插件在 [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE) 许可证下提供。
