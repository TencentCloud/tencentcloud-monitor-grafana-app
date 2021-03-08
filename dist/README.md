# 腾讯云监控应用插件

<p>
  <a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases">
    <img src="https://img.shields.io/github/v/release/TencentCloud/tencentcloud-monitor-grafana-app?sort=semver&color=green" alt="GitHub release (latest SemVer)">
  </a>
  <a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/TencentCloud/tencentcloud-monitor-grafana-app?color=blue" alt="License">
  </a>
  <a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CHANGELOG.md">
    <img src="https://img.shields.io/badge/change-log-blue.svg" alt="Change Log">
  </a>
  <a href="#">
    <img src="https://img.shields.io/github/languages/code-size/TencentCloud/tencentcloud-monitor-grafana-app" alt="GitHub code size in bytes">
  </a>
</p>

简体中文 | [English](./README.en-US.md)


# 目录

   * [腾讯云监控应用插件](#腾讯云监控应用插件)
   * [简介](#简介)
   * [插件安装方式](#插件安装方式)
   * [配置数据源](#配置数据源)
   * [创建 Dashboard](#创建-dashboard)
      * [快捷创建](#快捷创建)
      * [管理页面](#管理页面)
      * [导入模板](#导入模板)
   * [配置 Panel 数据](#配置-panel-数据)
      * [CVM 云服务器监控](#cvm-云服务器监控)
      * [CDB 云数据库MySQL监控](#cdb-云数据库mysql监控)
      * [CLB 负载均衡监控](#clb-负载均衡监控)
      * [MonogoDB 云数据库](#monogodb-云数据库)
      * [Redis 云数据库](#redis-云数据库)
      * [CDN 内容分发式网络](#cdn-内容分发式网络)
      * [BWP 带宽包](#bwp-带宽包)
      * [CKAFKA 消息队列](#ckafka-消息队列)
      * [LB 弹性公网IP](#lb-弹性公网ip)
      * [CFS 文件存储](#cfs-文件存储)
      * [SCF 云函数](#scf-云函数)
   * [模板变量](#模板变量)
      * [创建变量](#创建变量)
      * [编辑变量](#编辑变量)
      * [应用变量](#应用变量)
   * [本地开发](#本地开发)
      * [Docker 支持 (推荐)](#docker-支持-推荐)
      * [在本地 Grafana上运行](#在本地-grafana上运行)
   * [许可证](#许可证)

# 简介

[腾讯云监控](https://cloud.tencent.com/product/cm) 为用户提供云服务器、云数据库等多个云产品的负载和性能监控指标，用户可以使用云监控控制台、云监控 API 等方式获取相关监控数据。腾讯云监控应用插件 Tencent Cloud Monitor App，是一款适配开源软件 Grafana 的应用插件，通过调用 [腾讯云监控 API 3.0](https://cloud.tencent.com/document/product/248/30342) 的方式获取监控数据，并对数据进行自定义 Dashboard 展示。

- 支持 [云服务器](https://cloud.tencent.com/document/product/248/6843) 监控指标数据源
- 支持 [云数据库 MySQL](https://cloud.tencent.com/document/product/248/45147) 监控指标数据源
- 支持 [云数据库 PostgreSQL](https://cloud.tencent.com/document/product/248/45105) 监控指标数据源
- 支持 [私有网络 NAT 网关](https://cloud.tencent.com/document/product/248/45069) 监控指标数据源
- 支持 [私有网络对等连接](https://cloud.tencent.com/document/product/248/45096) 监控指标数据源
- 支持 [公网负载均衡](https://cloud.tencent.com/document/product/248/51898) 监控指标数据源
- 支持 [内网负载均衡四层协议](https://cloud.tencent.com/document/product/248/51899) 监控指标数据源
- 支持 [负七层协议](https://cloud.tencent.com/document/product/248/51901) 监控指标数据源
- 支持 [MonogoDB 云数据库](https://cloud.tencent.com/document/product/248/45104) 监控指标数据源
- 支持 [Redis 云数据库](https://cloud.tencent.com/document/product/248/49729) 监控指标数据源
- 支持 [CDN 内容分发式网络](https://cloud.tencent.com/document/product/248/50386) 监控指标数据源
- 支持 [带宽包](https://cloud.tencent.com/document/product/248/45098) 监控指标数据源
- 支持 [CKAFKA 消息队列](https://cloud.tencent.com/document/product/248/45121) 监控指标数据源
- 支持 [LB 弹性公网IP](https://cloud.tencent.com/document/product/248/45099) 监控指标数据源
- 支持 [CFS 文件存储](https://cloud.tencent.com/document/product/248/45143) 监控指标数据源
- 支持 [SCF 云函数](https://cloud.tencent.com/document/product/248/45130) 监控指标数据源
- 提供了云服务器、云数据库 MySQL、负载均衡 等具有代表性的 [Dashboard 模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- 更多云产品的监控指标数据源在陆续完善中

# 插件安装方式

前置条件：腾讯云监控应用插件是运行在 Grafana 6.x 或更新的版本上，请优先安装 Grafana 环境，详情参考 [Grafana 安装文档](https://grafana.com/grafana/download)。

1. 确保本地的 Grafana 是 6.x 或更新的版本上；  
2. 在 [GitHub Releases](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases) 中下载最新版本的腾讯云监控应用插件代码，（资源名为`tencentcloud-monitor-app-[x.x.x].zip`），并将解压后的代码放置在 Grafana 的插件目录下 (`${GRAFANA_HOME}/data/plugins`), 点击[这里](https://grafana.com/docs/grafana/latest/administration/configuration/#plugins)查看关于插件目录的更多文档；
3. 重启 Grafana 服务；
4. 鼠标悬浮左侧导航栏的 **齿轮** 图标，点击 `Plugins` 选项，进入 Plugins 管理页面，如果插件列表中正常展示 `Tencent Cloud Monitor` APP 插件，表示插件安装成功；
  ![Plugin APP](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/plugin-app.png?raw=true)
5. 进入应用详情页面，点击 `Enable` 按钮，启用成功后，即可在 Grafana 中使用腾讯云监控应用插件。

# 配置数据源

腾讯云监控应用插件通过调用[云监控 API](https://cloud.tencent.com/document/product/248/30342) 的方式获取各云产品的监控指标数据，通过以下步骤，配置相应云产品的数据源。    
1. 鼠标悬浮左侧导航栏的 **齿轮** 图标，点击 `Data Sources` 选项，进入数据源管理页面；
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-add.png?raw=true)
2. 点击右上角的 `Add data source` 按钮，然后点击 `Tencent Cloud Monitor Datasource` 数据源，进入数据源配置页面；
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-choose.png?raw=true)
3. `Name` 数据源名称，可以是任意名称，默认为 `Tencent Cloud Monitor Datasource`；  
4. `SecretId` 和 `SecretKey` 是调用云监控 API 必需的安全证书信息，二者可以通过腾讯云控制台 [云 API 密钥页面](https://console.cloud.tencent.com/cam/capi) 获取；
5. 选择需要获取监控数据的云产品；  
6. 点击 `Save & Test` 按钮，测试数据源的配置信息是否正确，配置成功后，即可以在 Dashboard 中使用该数据源。
  ![Datasource Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-config.png?raw=true)

# 创建 Dashboard

创建 Dashboard 有以下三种方式： 

## 快捷创建

鼠标悬浮左侧导航栏的 **加号** 图标，点击 `+Dashboard` 选项，即可创建一个新的 Dashboard。

## 管理页面

鼠标悬浮左侧导航栏的 **田字格** 图标，点击 `Manage` 选项，进入 Dashboard 管理页面，点击 `New Dashboard` 按钮，即可创建一个新的 Dashboard。同时，在该页面可以对 Dashboard 进行各种管理操作，如新建文件夹、移动 Dashboard、导入 Dashboard 等。

## 导入模板

鼠标悬浮左侧导航栏的 **齿轮** 图标，点击 `Plugins` 选项，进入 Plugins 管理页面。然后，点击 `Tencent Cloud Monitor` 应用，进入应用详情页面，切换至 `Dashboards` 选项卡，选择 Dashbboard 模板导入。

![Import Plugin Dashboard](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/plugin-dashboard.png?raw=true)


# 配置 Panel 数据
创建 Dashboard 之后，通过配置 Panel 信息，即可获取腾讯云监控的相应监控数据。现在以简单的 Graph 为例，展示如何配置 Panel 信息。

## CVM 云服务器监控

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云 CVM 云服务器的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 CVM 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考 [云服务器监控接口文档](https://cloud.tencent.com/document/api/248/30385)，更好地理解各配置项。
    - `Namespace` 命名空间，云服务器监控的命名空间为 `QCE/CVM`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例ID** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称、`As PrivateIpAddress` 主网卡的内网IP、 `As PublicIpAddress` 主网卡的公网IP。
      - 可实例列表的获取可参考 [云服务器查询实例列表接口文档](https://cloud.tencent.com/document/api/213/15728)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。
      - `Show Details` 按钮仅在选择非模板变量时显示。

![CVM Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cvm-query.png)

## CDB 云数据库MySQL监控

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云数据库 MySQL 的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 CDB 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云数据库MySQL监控接口的输入参数，可参考 [云数据库MySQL监控接口文档](https://cloud.tencent.com/document/api/248/30386)，更好地理解各配置项。
    - `Namespace` 命名空间，云服务器监控的命名空间为 `QCE/CDB`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例ID** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称、 `As Vip` 内网IP。
      - 实例列表的获取可参考 [云数据库MySQL查询实例列表接口文档](https://cloud.tencent.com/document/api/236/15872)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![CDB Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cdb-query.png)

## CLB 负载均衡监控

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云 负载均衡的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 CLB 监控服务的腾讯云监控数据源。
3. 负载均衡指标分三个命名空间：公网负载均衡监控指标（Namespace=QCE/LB_PUBLIC），内网负载均衡四层协议监控指标（Namespace=QCE/LB_PRIVATE）， 七层协议监控指标（Namespace=QCE/LOADBALANCE），可根据自己需要在`Namespace`选择。
4. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考 [负载均衡云监控接口文档](https://cloud.tencent.com/document/product/248/51898)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/LB_PUBLIC`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As LoadBalancerId`，以 **实例ID** 展示实例列表。此外，可以选择 `As LoadBalancerName` 实例名称、`As LoadBalancerVips` 网络ip。
      - 实例列表的获取可参考 [负载均衡实例列表接口文档](https://cloud.tencent.com/document/api/214/30685)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。
    - `Listener` 【可选】监听器，可不选择，这时采用实例维度请求，对应输入参数的 `Listener.N` 字段，列表会自动获取。
      - 为了适应不同用户的习惯，监听器列表会以不同的字段展示，默认为 `As ListenerId`，以 **监听器ID** 展示实例列表。此外，可以选择 `As ListenerName` 监听器名称、`As Port` 端口。
      - 监听器列表的获取可参考 [负载均衡监听器列表接口文档](https://cloud.tencent.com/document/api/214/30686)。

![Clb Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-clb-query.png)

## MonogoDB 云数据库

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云 负载均衡的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 mongodb 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考 [mongodb云监控接口文档](https://cloud.tencent.com/document/product/248/45104)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/CMONGO`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例id** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称。
      - 实例列表的获取可参考 [mongodb列表接口文档](https://cloud.tencent.com/document/api/240/38568)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![mongodb Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-mongodb-query.png)

## Redis 云数据库

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云 负载均衡的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 redis 监控服务的腾讯云监控数据源。
3. 负载均衡指标分两个命名空间：内存版（5秒）（Namespace=QCE/REDIS_MEM），ckv版和内存版（1分钟）（Namespace=QCE/REDIS）可根据自己需要在`Namespace`选择。
4. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考 [Redis云监控接口文档](https://cloud.tencent.com/document/product/248/49729)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/REDIS_MEM`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例id** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称。
      - 实例列表的获取可参考 [Redis实例列表接口文档](https://cloud.tencent.com/document/api/239/20018)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![redis Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-redis-query.png)

## CDN 内容分发式网络

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云 负载均衡的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 CDN 监控服务的腾讯云监控数据源。
3. 负载均衡指标分两个命名空间：国内域名（Namespace=QCE/CDN），国外域名（Namespace=QCE/OV_CDN）可根据自己需要在`Namespace`选择。
4. 配置项的内容对齐腾讯云服务器监控接口的输入参数，可参考 [CDN云监控接口文档](https://cloud.tencent.com/document/product/248/50386)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/CDN`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As Domain`，以 **域名** 展示实例列表。此外，可以选择 `As ProjectId` 项目id。
      - 域名列表的获取可参考 [CDN域名列表接口文档](https://cloud.tencent.com/document/api/228/41118)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

## BWP 带宽包

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云BWP的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 BWP 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯云BWP监控接口的输入参数，可参考 [BWP云监控接口文档](https://cloud.tencent.com/document/product/248/45098)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/BWP`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为`As BandwidthPackageId`，以 **宽度包id** 展示实例列表。此外，可以选择 `As BandwidthPackageName` 名称。
      - 域名列表的获取可参考 [BWP域名列表接口文档](https://cloud.tencent.com/document/api/215/19209)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![BWP Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-bwp-query.png)

## CKAFKA 消息队列

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云ckafka消息队列的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 ckafka 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯ckafka监控接口的输入参数，可参考 [ckafka云监控接口文档](https://cloud.tencent.com/document/product/248/45121)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/CKAFKA`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As InstanceId`，以 **实例id** 展示实例列表。此外，可以选择 `As InstanceName` 实例名称。
      - 实例列表的获取可参考 [ckafka列表接口文档](https://cloud.tencent.com/document/api/597/40835)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 10`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![ckafka Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-ckafka-query.png)

## LB 弹性公网IP

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云lb弹性公网ip的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 lb 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯lb监控接口的输入参数，可参考 [lb云监控接口文档](https://cloud.tencent.com/document/product/248/45099)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/LB`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As AddressId`，以 **实例地址id** 展示实例列表。此外，可以选择 `As AddressName`地址名称和`As AddressIp` 地址IP。
      - 实例列表的获取可参考 [lb列表接口文档](https://cloud.tencent.com/document/api/215/16702)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![eip Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-eip-query.png)

## CFS 文件存储

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云cfs文件存储的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 cfs 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯cfs监控接口的输入参数，可参考 [cfs云监控接口文档](https://cloud.tencent.com/document/product/248/45143)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/CFS`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As FileSystemId`，以 **文件系统id** 展示实例列表。此外，可以选择 `As FsName` 函数名称。
      - 实例列表的获取可参考 [CFS列表接口文档](https://cloud.tencent.com/document/api/582/38170)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![cfs Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cfs-query.png)

## SCF 云函数

1. 点击 **New Panel** 面板的 **Add Query** 选项，进入 Panel 配置页面。在左侧第一个 `Query` 选项卡，通过配置选项获取腾讯云scf云函数的监控数据。
2. `Queries to` 数据源列表，选择已配置的包含 scf 监控服务的腾讯云监控数据源。
3. 配置项的内容对齐腾讯scf监控接口的输入参数，可参考 [scf云监控接口文档](https://cloud.tencent.com/document/product/248/45130)，更好地理解各配置项。
    - `Namespace` 命名空间，比如 `QCE/SCF_V2`。
    - `Region` 地域，地域列表会根据 `Namespace` 选项自动获取，单击选择某一地域。
    - `MetricName` 指标名称，指标列表会根据 `Namespace` 和 `Region` 选项自动获取，单击选择某一指标。
    - `Period` 监控统计周期，周期列表会根据 `MetricName` 选项自动获取，单击选择某一统计周期。
    - `Instance` 实例，对应输入参数的 `Instances.N` 字段，实例列表会自动获取。
      - 为了适应不同用户的习惯，实例列表会以不同的字段展示，默认为 `As FunctionId`，以 **函数id** 展示实例列表。此外，可以选择 `As FunctionName` 函数名称。
      - 实例列表的获取可参考 [SCF列表接口文档](https://cloud.tencent.com/document/api/583/18582)。切换 `Show Details` 为 `true`，可展示实例请求参数，默认参数为`Offset = 0` 和 `Limit = 20`。如果需要变更实例查询条件，可参考接口文档，配置相应参数。
      - **注意：** 在本应用中，监控数据的单次查询为原子操作，即查询某一实例的某一指标的监控数据，故实例只能单选，如需查询多实例的监控数据，点击右上角的 `Add Query` 增加新的查询。  
      - `Show Details` 按钮仅在选择非模板变量时显示。

![scf Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-scf-query.png)

# 模板变量

模板变量 [Variables](https://grafana.com/docs/reference/templating/) 是 Grafana 提供的一种 Dashboard 优化特性，用于创建高度可复用和交互式 Dashboard。模板变量的一般思想是允许 Grafana 从数据源获得不同的度量，并提供一种无需修改仪表板就可以动态更改它的方法。腾讯云监控应用目前提供了地域、云服务器实例、云数据库 MySQL 实例 等变量。

注：所有实例类 Query 支持自定义下拉框选项展示字段，通过 `display` 字段设置，如：`Namespace=QCE/REDIS&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`。如果同时存在 `InstanceAlias` 和 `display` 字段，则仅会展示 `display` 的值。

已经提供的模板变量如下表所示：  

变量 | 示例 | 描述 |
---- | --- | --- |
地域               |  Namespace=QCE/CVM&Action=DescribeRegions | 参考 [地域接口文档](https://cloud.tencent.com/document/api/213/15708)。`Action` 固定为 `DescribeRegions`，`Namespace` 为云产品对应的命名空间，如 `QCE/CVM` `QCE/CDB`等。地区作为变量模板，只支持单选，如设置成多选或者选中 `All`, 默认选中第一个地区值。
云服务器实例         |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=PublicIpAddresses | 参考 [云服务器查询实例列表接口文档](https://cloud.tencent.com/document/api/213/15728)。`Namespace` 固定为`QCE/CVM`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`、`PrivateIpAddresses`、`PublicIpAddresses`。云服务器实例作为模板变量，同时支持单选和多选。
云数据库 MySQL 实例  |  Namespace=QCE/CDB&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=InstanceId | 参考 [云数据库MySQL查询实例列表接口文档](https://cloud.tencent.com/document/api/236/15872)。`Namespace` 固定为`QCE/CDB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`、`Vip`。云数据库实例作为模板变量，同时支持单选和多选。
 云数据库 PostgreSQL 实例  |  Namespace=QCE/POSTGRES&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=DBInstanceId | 参考 [云数据库PostgreSQL查询实例列表接口文档](https://cloud.tencent.com/document/api/409/16773)。`Namespace` 固定为`QCE/CDB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `DBInstanceId`，可选值为 `DBInstanceName`, `PrivateIpAddresses`, `PublicIpAddresses`。云数据库实例作为模板变量，同时支持单选和多选。
私有网络 NateGateway 实例  |  Namespace=QCE/NAT_GATEWAY&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=NatGatewayId | 参考 [私有网络Nat网关查询实例列表接口文档](https://cloud.tencent.com/document/api/215/36034)。`Namespace` 固定为`QCE/NAT_GATEWAY`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `NatGatewayId`，可选值为 `NatGatewayName`。NateGateway 网关实例作为模板变量，同时支持单选和多选。
私有网络对等连接实例  |  Namespace=QCE/PCX&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=peeringConnectionId | 参考 [私有网络对等连接查询实例列表接口文档](https://cloud.tencent.com/document/api/215/2101)。`Namespace` 固定为`QCE/PCX`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `peeringConnectionId`，可选值为 `peeringConnectionName`。对等连接实例作为模板变量，同时支持单选和多选（如果是负载均衡则不支持多选，可选多个监听器）。
负载均衡实例  |  Namespace=QCE/LB_PRIVATE&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId | 参考 [负载均衡实例列表接口文档](https://cloud.tencent.com/document/product/214/30685)。`Namespace` 可为`QCE/LB_PRIVATE`，`QCE/LB_PUBLIC`，`QCE/LOADBALANCE`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `LoadBalancerId`，可选值为 `LoadBalancerName`，`LoadBalancerVips`。同时支持单选和多选。
负载均衡监听器  |  Namespace=QCE/LB_PRIVATE&Action=DescribeListeners&Region=$region&Instance=$instance&listenerAlias=ListenerId | 参考 [负载均衡监听器列表接口文档](https://cloud.tencent.com/document/product/214/30686)。`Namespace` 可为`QCE/LB_PRIVATE`，`QCE/LB_PUBLIC`，`QCE/LOADBALANCE`，`Action` 固定为`DescribeListeners`。`Region` 为地域参数，可以为特定的地域值，如 `ap-guangzhou`；也可以为变量值，如 `$region`。`Instance` 为实例id，可以为特定的实例，如 `lbl-rbw529fz`；也可以为变量值，如 `$instance`。`listenerAlias` 为监听器的展示字段，默认为 `ListenerId`，可选值为 `ListenerName`，`Port`。同时支持单选和多选。
mongoDB数据库         |   Namespace=QCE/CMONGO&Region=$region&Action=DescribeInstances  | 参考 [CMONGO实例查询实例列表接口文档](https://cloud.tencent.com/document/api/240/38568)。`Namespace` 固定为`QCE/CMONGO`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CMONGO实例作为模板变量，同时支持单选和多选。
redis数据库        |   Namespace=QCE/REDIS&Region=$region&Action=DescribeInstances | 参考 [REDIS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/239/20018)。`Namespace` 固定为`QCE/REDIS`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。REDIS实例作为模板变量，同时支持单选和多选。
cdn内容分发网络        |   Namespace=QCE/CDN&Region=$region&Action=DescribeInstances | 参考 [CDN实例查询实例列表接口文档](https://cloud.tencent.com/document/api/228/41118)。`Namespace` 固定为`QCE/CDN`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `Domain`，可选值为 `Domain`, `ProjectId`。CDN实例作为模板变量，同时支持单选和多选。
bwp带宽包        |   Namespace=QCE/BWP&Region=$region&Action=DescribeInstances | 参考 [BWP实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/19209)。`Namespace` 固定为`QCE/BWP`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `BandwidthPackageId`，可选值为 `BandwidthPackageId`, `BandwidthPackageName`。BWP实例作为模板变量，同时支持单选和多选。
ckafka消息队列         |   Namespace=QCE/CKAFKA&Region=$region&Action=DescribeInstances | 参考 [CKAFKA实例查询实例列表接口文档](https://cloud.tencent.com/document/api/597/40835)。`Namespace` 固定为`QCE/CKAFKA`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `InstanceId`，可选值为 `InstanceName`。CKAFKA实例作为模板变量，同时支持单选和多选。
LB弹性公网IP         |   Namespace=QCE/LB&Region=$region&Action=DescribeInstances | 参考 [LB实例查询实例列表接口文档](https://cloud.tencent.com/document/api/215/16702)。`Namespace` 固定为`QCE/LB`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `AddressId`，可选值为 `AddressId`, `AddressName`, `AddressIp`。LB实例作为模板变量，同时支持单选和多选。
CFS文件存储         |   Namespace=QCE/CFS&Region=$region&Action=DescribeInstances | 参考 [CFS实例查询实例列表接口文档](https://cloud.tencent.com/document/api/582/38170)。`Namespace` 固定为`QCE/CFS`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `FileSystemId`，可选值为 `FileSystemId`, `FsName`。CFS实例作为模板变量，同时支持单选和多选。
SCF云函数        |   Namespace=QCE/SCF_V2&Region=$region&Action=DescribeInstances | 参考 [SCF实例查询实例列表接口文档](https://cloud.tencent.com/document/api/583/18582)。`Namespace` 固定为`QCE/SCF_V2`，`Action` 固定为`DescribeInstances`。`Region` 为地域参数，可以为特定的地域值，如 `ap-beijing`；也可以为变量值，如 `$region`。`InstanceAlias` 为实例的展示字段，默认为 `FunctionId`，可选值为 `FunctionId`, `FunctionName`。SCF实例作为模板变量，同时支持单选和多选。



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

![Variable Region Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-region-config.png)

![Variable Instance Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-instance-config.png)

## 应用变量
创建变量后，在 Dashboard 页面的左上角会展示变量选择框，可以切换变量值。变量有两种引用语法，`$varname` 和 `[[varname]]`。变量常用于 Panel 的查询语句中，以云服务器单机监控 Dashboard 为例，展示如何在查询中使用变量，如下图所示。此外，变量还可以应用在 Panel 标题、Text 文本面板等。

![Variable Dashboard](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-cvm-dashboard.png)

![Variable Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-panel-query.png)


# 本地开发

1. 克隆此项目到本地：
```bash
$ git clone https://github.com/TencentCloud/tencentcloud-monitor-grafana-app.git
```

2. 安装依赖：
```bash
$ npm install
```

3. 启动开发环境：
```bash
$ npm run analyze
```

## Docker 支持 (推荐)

为了更快地开发与测试，添加了 [docker-compose.yml](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/docker-compose.yml) 文件，只需运行：
```bash
$ docker-compose up
```
然后访问 (http://localhost:3000)


## 在本地 Grafana上运行
此外，你也可以将本项目克隆至本地 Grafana 的插件目录，重启本地 Grafana。请确保本地 Grafana 版本 大于 6.x。

# 许可证
腾讯云监控应用插件在 [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE) 许可证下提供。