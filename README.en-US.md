[![Tencent Cloud Monitor Grafana App](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-app.png?raw=true)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app)

[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)
[![License](https://img.shields.io/github/license/TencentCloud/tencentcloud-monitor-grafana-app?color=blue)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)
[![Change Log](https://img.shields.io/badge/change-log-blue.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CHANGELOG.md)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TencentCloud/tencentcloud-monitor-grafana-app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)

# Tencent Cloud Monitor Grafana App

English | [简体中文](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md)

> Note: This plugin requires Grafana version >= 7.3 to run from version 2.0.0, for Grafana installation, please read [Download Grafana](https://grafana.com/grafana/download).

# Table of Contents

- [Introduction](#introduction)
- [Get Started](#get-started)
  - [Installation](#installation)
    - [Use Grafana CLI](#use-grafana-cli)
    - [From GitHub Releases](#from-github-releases)
    - [From Source Code](#from-source-code)
    - [Upgrade](#upgrade)
      - [From 1.x version](#from-1x-version)
    - [More Options](#more-options)
  - [Enable plugin](#enable-plugin)
  - [Configure Datasource](#configure-datasource)
  - [Create Dashboard](#create-dashboard)
    - [Quick Creation](#quick-creation)
    - [Dashboards Manage Page](#dashboards-manage-page)
    - [Import Dashboard Templates](#import-dashboard-templates)
  - [Configure Panel](#configure-panel)
- [Template Variables](#template-variables)
  - [Create Template Variable](#create-template-variable)
  - [Edit Template Variable](#edit-template-variable)
  - [Use Template Variable](#use-template-variable)
- [Contact Us](#contact-us)
- [Contribution Guide](#contribution-guide)
- [License](#license)

# Introduction

[Tencent Cloud Monitoring](https://intl.cloud.tencent.com/product/cm) provides users with load and performance monitoring metrics of multiple cloud products such as Cloud Virtual Machine (CVM) and Cloud Databases (CDB). Users can use cloud monitoring consoles, cloud monitoring APIs, and other methods to retrieve relevant monitoring data. Tencent Cloud Monitor Grafana App is an application plugin that adapts to the open-source software Grafana. It retrieves monitoring data by calling [Tencent Cloud Monitoring API 3.0](https://intl.cloud.tencent.com/document/product/248/33873), and displays the data on a custom Dashboard.

This plugin provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **CVM Monitoring**, **TencentDB for MySQL Monitoring** and **Cloud Load Balancer** etc.

Support monitoring , more cloud product metrics are being improved.

Product Name | Namespace | Metric Documents | Instance Documents |
------ | ------- | ------- | ------------- |
CVM Monitoring | QCE/CVM | https://intl.cloud.tencent.com/document/product/248/6843 | https://intl.cloud.tencent.com/document/product/213/33258
TencentDB for MySQL | QCE/CDB | https://intl.cloud.tencent.com/document/product/248/11006 | https://intl.cloud.tencent.com/document/product/236/15872
TencentDB for PostgreSQL | QCE/POSTGRES | https://intl.cloud.tencent.com/document/product/248/17945 | https://intl.cloud.tencent.com/document/product/409/16773
TencentDB for MongoDB | QCE/CMONGO | https://intl.cloud.tencent.com/document/product/248/35671 | https://intl.cloud.tencent.com/document/api/240/34702
TencentDB for Redis | QCE/REDIS | https://intl.cloud.tencent.com/document/product/248/34641 | https://intl.cloud.tencent.com/document/product/239/32065
TencentDB for Redis (Memory Edition, 5-Second) | QCE/REDIS_MEM | https://intl.cloud.tencent.com/document/product/248/39507 | https://intl.cloud.tencent.com/document/product/239/32065
TencentDB for TDSQL-C (CynosDB) | QCE/CYNOSDB_MYSQL | https://intl.cloud.tencent.com/document/product/248/37383 | https://intl.cloud.tencent.com/document/product/248/37383
TencentDB for TcaplusDB | QCE/TCAPLUS | https://intl.cloud.tencent.com/document/product/248/34592 | https://intl.cloud.tencent.com/document/product/248/34592
TencentDB for SQL Server | QCE/SQLSERVER | https://intl.cloud.tencent.com/document/product/248/11008 | https://intl.cloud.tencent.com/document/api/238/32115
TDSQL for MySQL | QCE/TDMYSQL | https://intl.cloud.tencent.com/document/product/248/40012 | https://intl.cloud.tencent.com/document/api/1042/34442
Content Delivery Network (CDN) | QCE/CDN | https://intl.cloud.tencent.com/document/product/248/39554 | https://intl.cloud.tencent.com/document/api/228/34020
CDN Province | QCE/CDN_LOG_DATA | https://intl.cloud.tencent.com/document/product/248/39556 | https://intl.cloud.tencent.com/document/api/228/34020
Bandwidth Packet | QCE/BWP | https://intl.cloud.tencent.com/document/product/248/34645 | https://intl.cloud.tencent.com/document/api/215/36919
Message Queue CKafka | QCE/CKAFKA | https://intl.cloud.tencent.com/document/product/248/17297 | https://intl.cloud.tencent.com/document/api/597/35357
Cloud Load Balancer Public Network | QCE/LB_PUBLIC | https://intl.cloud.tencent.com/document/product/248/10997 | https://intl.cloud.tencent.com/document/product/214/33830
Cloud Load Balancer Private Network Layer-4 Protocol | QCE/LB_PRIVATE | https://intl.cloud.tencent.com/document/product/248/39529 | https://intl.cloud.tencent.com/document/product/214/33830
Cloud Load Balancer Layer-7 Protocol | QCE/LOADBALANCE | https://intl.cloud.tencent.com/document/product/248/39530 | https://intl.cloud.tencent.com/document/product/214/33830
Elastic IP | QCE/LB | https://intl.cloud.tencent.com/document/product/248/34646 | https://intl.cloud.tencent.com/document/api/215/16702
Cloud File Storage (CFS) | QCE/CFS | https://intl.cloud.tencent.com/document/product/248/34644 | https://intl.cloud.tencent.com/document/api/582/34514
Serverless Cloud Function (SCF) | QCE/SCF_V2 | https://intl.cloud.tencent.com/document/product/248/34638 | https://intl.cloud.tencent.com/document/api/583/18582
Private Network Dedicated Tunnel | QCE/DCX | https://intl.cloud.tencent.com/document/product/248/10995 | https://intl.cloud.tencent.com/document/api/216/19819
Private Network Direct Connection | QCE/DC | https://intl.cloud.tencent.com/document/product/248/10994 | https://intl.cloud.tencent.com/document/api/216/35330
Private Network VPN Gateway | QCE/VPNGW | https://intl.cloud.tencent.com/document/product/248/10988 | https://intl.cloud.tencent.com/document/api/215/17514
Private Network Direct Connect Gateway | QCE/DCG | https://intl.cloud.tencent.com/document/product/248/10990 | https://intl.cloud.tencent.com/document/api/215/36913
Private Network NAT Gateway | QCE/NAT_GATEWAY | https://intl.cloud.tencent.com/document/product/248/10991 | https://intl.cloud.tencent.com/document/api/215/34752
Private Network Peering Connection | QCE/PCX | https://intl.cloud.tencent.com/document/product/248/10986 | https://cloud.tencent.com/document/api/215/2101?lang=en
Private Network VPN Gateway | QCE/VPNX | https://intl.cloud.tencent.com/document/product/248/10988 | https://intl.cloud.tencent.com/document/api/215/17515
Private Network Anycast EIP | QCE/CEIP_SUMMARY | https://intl.cloud.tencent.com/document/product/248/39552 | https://intl.cloud.tencent.com/document/api/215/16702
Private Network Network Detection | QCE/VPC_NET_DETECT | https://intl.cloud.tencent.com/document/product/248/39557 | https://intl.cloud.tencent.com/document/product/215/34742
Private Network Cloud Connect Network | QCE/VBC | https://intl.cloud.tencent.com/document/product/248/10987 | https://intl.cloud.tencent.com/document/api/215/34787
API Gateway | QCE/APIGATEWAY | https://intl.cloud.tencent.com/document/product/248/19130 | https://intl.cloud.tencent.com/document/api/628/36627
Cloud Block Storage | QCE/BLOCK_STORAGE | https://intl.cloud.tencent.com/document/product/248/37085 | https://intl.cloud.tencent.com/document/api/362/16315
Elasticsearch | QCE/CES | https://intl.cloud.tencent.com/document/product/248/34642 | https://intl.cloud.tencent.com/document/api/845/32214
CMQ Queue Service | QCE/CMQ | https://intl.cloud.tencent.com/document/product/248/34643 | https://intl.cloud.tencent.com/document/api/406/35944
CMQ Topic Subscription | QCE/CMQTOPIC | https://intl.cloud.tencent.com/document/product/248/11013 | https://intl.cloud.tencent.com/document/api/406/35944
Tencent Distributed Message Queue | QCE/TDMQ | https://cloud.tencent.com/document/product/248/51450 | https://cloud.tencent.com/document/api/1179/52183?lang=en
Cloud Physical Machine 1.0 | QCE/CPM | https://cloud.tencent.com/document/product/248/45881 | https://cloud.tencent.com/document/api/386/32904?lang=en
CPM Peering Connection | QCE/BM_PCX | https://cloud.tencent.com/document/product/248/45884 | https://cloud.tencent.com/document/product/1024/36903?lang=en
CPM Load Balancer Public Network | QCE/BM_LB | https://cloud.tencent.com/document/product/248/45886 | https://cloud.tencent.com/document/api/1027/33280?lang=en
CPM Load Balancer Private Network | QCE/BM_INTRA_LB | https://cloud.tencent.com/document/product/248/45885 | https://cloud.tencent.com/document/api/1027/33280?lang=en
Elastic MapReduce(HDFS) | QCE/TXMR_HDFS | https://cloud.tencent.com/document/product/248/44797 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(HBASE) | QCE/TXMR_HBASE | https://cloud.tencent.com/document/product/248/45567 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(HIVE) | QCE/TXMR_HIVE | https://cloud.tencent.com/document/product/248/45569 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(NODE) | QCE/TXMR_NODE | https://cloud.tencent.com/document/product/248/45570 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(PRESTO) | QCE/TXMR_PRESTO | https://cloud.tencent.com/document/product/248/45571 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(SPARK) | QCE/TXMR_SPARK | https://cloud.tencent.com/document/product/248/45572 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(YARN) | QCE/TXMR_YARN | https://cloud.tencent.com/document/product/248/45573 | https://intl.cloud.tencent.com/document/api/1026/31052
Elastic MapReduce(ZOOKEEPER) | QCE/TXMR_ZOOKEEPER | https://cloud.tencent.com/document/product/248/45574 | https://intl.cloud.tencent.com/document/api/1026/31052
Edge Computing Machine Compute Monitor | QCE/ECM | https://cloud.tencent.com/document/product/248/45124 | https://cloud.tencent.com/document/api/1108/42565
Edge Computing Machine Block Storage | QCE/ECM_BLOCK_STORAGE | https://cloud.tencent.com/document/product/248/45123 | https://cloud.tencent.com/document/api/1108/42565
Edge Computing Machine Load Balancer | QCE/ECM_LB | https://cloud.tencent.com/document/product/248/54253 | https://cloud.tencent.com/document/api/1108/48459
Cloud Object Storage | QCE/COS | https://cloud.tencent.com/document/product/248/45140 | https://intl.cloud.tencent.com/document/product/436/8291
Global Application Acceleration Platform | QCE/QAAP | https://cloud.tencent.com/document/product/248/45062 | https://intl.cloud.tencent.com/document/api/608/33101
Game Server Elastic-scaling | QCE/GSE | https://cloud.tencent.com/document/product/248/55273?lang=en | https://intl.cloud.tencent.com/document/api/1055/37120

# Get Started
## Installation

> Prerequisites: Tencent Cloud Monitor Grafana App Plugin requires Grafana version >= 7.3 to run, for Grafana installation, please read [Download Grafana](https://grafana.com/grafana/download).

There are multiple ways to install tencentcloud-monitor-grafana-app, please choose one of the methods below.

### Use Grafana CLI

Get list of available versions:

```bash
$ grafana-cli plugins list-versions tencentcloud-monitor-app
```

Install the latest plugin:

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```
**If customized plugins directory, use the `--pluginsDir` param to overwrite.*

Restart grafana after installing plugins:

```bash
$ systemctl restart grafana-server
```

Read more about installing plugins in [Grafana plugins installation guide](https://grafana.com/docs/grafana/latest/plugins/installation/).

> Warning: The only reliable installation method is grafana-cli. Any other way should be treated as a workaround and doesn't provide any backward-compatibility guaranties.

### From GitHub Releases

1. Go to the [GitHub releases](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases) and find the latest release.
2. Download .zip package with the plugin from release assets (asset name is tencentcloud-monitor-app-[x.x.x].zip) and unpack it into Grafana's plugins folder (`${GRAFANA_HOME}/data/plugins`), see docs [here](https://grafana.com/docs/grafana/latest/administration/configuration/#plugins) if you can't find your plugin folder.
3. Restart Grafana server.

### From Source Code

If you want to build a package yourself, or contribute, read [Contribution Guide](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.en-US.md).

### Upgrade

```bash
$ grafana-cli plugins update tencentcloud-monitor-app
```

Restart grafana after upgrading plugins:

```bash
$ systemctl restart grafana-server
```

#### From 1.x version
```bash
$ grafana-cli plugins upgrade tencentcloud-monitor-app
```
Note: you need to re-configure the datasource after the upgrade.

### More Options

You can read more options by running help command below:

```bash
$ grafana-cli plugins --help
```

## Enable plugin

Hover **Settings Icon** in the side menu and select `Plugins`. Successfully installed if the `Tencent Cloud Monitor` APP plugin is displayed in the plugin list.
![Plugin Search](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-search.png?raw=true)
Click `Enable` in the plugin config page.
![Plugin Enable](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-enable.png?raw=true)

## Configure Datasource
Tencent Cloud Monitor Grafana App Plugin retrieves monitoring data of each cloud product metrics by calling the [Cloud Monitoring API](https://intl.cloud.tencent.com/document/product/248/33873), and configures the data source of the corresponding cloud product through the following steps.

1. Hover **Settings Icon** in the side menu and select `Data Sources`.
  ![Datasource Add](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-add.png?raw=true)
2. Click `Add data source` on the top right corner of the page and select `Tencent Cloud Monitoring` data source.
  ![Datasource Add](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-choose.png?raw=true)
3. `Name` is the data source name, default name is `Tencent Cloud Monitoring`.
4. `SecretId` and `SecretKey` are the security certificate information required to call the Cloud Monitoring API. Both can be retrieved through the Tencent Cloud console [Cloud API key page](https://console.cloud.tencent.com/cam/capi);
5. Toggle Cloud Products to enable/disable.
6. Click `Save & Test` button to test the connection, the data source can be used in the Dashboard after the connection is successful.
  ![Datasource Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/datasource-config.png?raw=true)

## Create Dashboard

There are three ways to create a Dashboard:

### Quick Creation

Hover **Plus Icon** in the side menu and select `+Dashboard`.

### Dashboards Manage Page

Hover **Menu Icon** in the side menu and select `Manage`. Click on the `New Dashboard` button to create a new Dashboard. At the same time, you can perform various management operations on Dashboard on this page, such as creating new folders, moving Dashboard, and importing Dashboard.

### Import Dashboard Templates

Hover **Settings Icon** in the side menu and select `Plugins`. Select the `Tencent Cloud Monitor` plugin, navigate to `Dashboards` tab and import dashboard templates from here.

![Import Plugin Dashboard](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/plugin-dashboard.png?raw=true)

## Configure Panel

![CVM Panel Query](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/panel-cvm-query.png?raw=true)

After creating the Dashboard, you can get the corresponding monitoring data monitored by Tencent Cloud by configuring the Panel. Now take a simple Graph as an example to show how to configure Panel information.

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The `Namespace` is for example `QCE/CVM` for CVM monitoring.
4. The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
5. The `MetricName` list will be retrieved after `Namespace` and `Region` are selected, read documents for each cloud products [here](#introduction).
6. The `Period` list will be retrieved after `MetricName` is selected.
7. The `Instance` corresponds to `Instance.N` in the input params, read documents for each cloud products [here](#introduction).
  -  In order to adapt to the habits of different users, the instance list will be displayed in different fields, default **ID** for each cloud products, respectively.
  - `Show Details` toggle button will only show when not selecting template variables, toggle the button to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
  - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.

# Template Variables
Template Variables is a Dashboard optimization feature provided by Grafana to create highly reusable and interactive Dashboards. The general idea of template variables is to allow Grafana to obtain different metrics from the data source and provide a way to dynamically change it without modifying the dashboard. Tencent Cloud Monitor Grafana App currently provides variables such as region, CVM, and TencentDB for MySQL instances.

Notes: All Instance Queries allow customizing dropdown list values by `display` param, for example: `Namespace=QCE/REDIS&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`. If `display` and `InstanceAlias` appear at the same time, the dropdown list will only show values of `display`.

From version 2.1.0, `payload` is supported for advanced query, for example you can enter the following query for filtering the instances with `zone` equals to `ap-guangzhou-1`:
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
Pay attention that `payload` is a strict JSON string.

The template variables that have been provided are shown in the following table:

Variable | Description | Example |
-------- | ----------- | ------- |
Region                                                          | Please refer to [Region API Documents](https://intl.cloud.tencent.com/document/product/213/15708). `Action` is fixed as `DescribeRegions`, `Namespace` is the unique namespace for each cloud products, e.g. `QCE/CVM` `QCE/CDB` etc. Region support single-selected as a template variable, The first region will be selected if multi-selected region or selected `All`. |  Namespace=QCE/CVM&Action=DescribeRegions
CVM instances                                                   | Please refer to [CVM Instance Documents](https://intl.cloud.tencent.com/document/product/213/33258). `Namespace` is fixed as`QCE/CVM`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`PrivateIpAddresses`、`PublicIpAddresses`. CVM instance allow single-selected and multi-selected when using template variable.  |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=PublicIpAddresses
TencentDB for MySQL instances                                   | Please refer to [TencentDB for MySQL Instance Documents](https://intl.cloud.tencent.com/document/api/236/15872). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`Vip`. CDB MySQL instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/CDB&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=InstanceId
 TencentDB for PostgreSQL instances                             | Please refer to [TencentDB for PostgreSQL Instance Documents](https://intl.cloud.tencent.com/document/api/409/16773). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `DBInstanceId`, can be selected as `DBInstanceName`, `PrivateIpAddresses`, `PublicIpAddresses`. CDB PostgreSQL instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/POSTGRES&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=DBInstanceId
Private Network NAT Gateway instances                           | Please refer to [Private Network NAT Gateway Instance Documents](https://intl.cloud.tencent.com/document/api/215/34752). `Namespace` is fixed as`QCE/NAT_GATEWAY`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `NatGatewayId`, can be selected as `NatGatewayName`. Private Network Nat Gateway instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/NAT_GATEWAY&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=NatGatewayId
Private Network Peering Connection instances                    | Please refer to [Private Network Peering Connection Instance Documents](https://cloud.tencent.com/document/api/215/2101?lang=en). `Namespace` is fixed as`QCE/PCX`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `peeringConnectionId`, can be selected as `peeringConnectionName`. Peering Connection instance allow single-selected and multi-selected when using template variable (use multi listeners for Cloud Load Balance).  |  Namespace=QCE/PCX&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=peeringConnectionId
Cloud Load Balancer Private Network Layer-4 Protocol instances  | Please refer to [Cloud Load Balancer Instance Documents](https://intl.cloud.tencent.com/document/product/214/33830). `Namespace` can be `QCE/LB_PRIVATE`, `QCE/LB_PUBLIC`, `QCE/LOADBALANCE`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias`is default as `LoadBalancerId`, can be selected as `LoadBalancerName`, `LoadBalancerVips`, allowing single-selected and multi-selected.  |  Namespace=QCE/LB_PRIVATE&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
Cloud Load Balancer Private Network Layer-4 Protocol listeners  | Please refer to [Cloud Load Balancer Listener Documents](https://intl.cloud.tencent.com/document/product/214/33831). `Namespace` can be `QCE/LB_PRIVATE`, `QCE/LB_PUBLIC`, `QCE/LOADBALANCE`, `Action` is fixed as`DescribeListeners`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `Instance` is an instance ID, can be specific value such as `lbl-rbw529fz`, or a template variable, such as `$instance`. `listenerAlias` is default as `ListenerId`, can be selected as `ListenerName`, `Port`, allowing single-selected and multi-selected. |  Namespace=QCE/LB_PRIVATE&Action=DescribeListeners&Region=$region&Instance=$instance&listenerAlias=ListenerId
TencentDB for MongoDB                                           | Please refer to [TencentDB for MongoDB Instance Documents](https://intl.cloud.tencent.com/document/api/240/34702). `Namespace` is fixed as `QCE/CMONGO`, `Action` is fixed as `DescribeDBInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. CMONGO instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CMONGO&Region=$region&Action=DescribeDBInstances
TencentDB for Redis                                             | Please refer to [TencentDB for Redis Instance Documents](https://intl.cloud.tencent.com/document/api/213/33258). `Namespace` is fixed as `QCE/REDIS`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. REDIS instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/REDIS&Region=$region&Action=DescribeInstances
Content Delivery Network (CDN)                                  | Please refer to [CDN Instance Documents](https://intl.cloud.tencent.com/document/api/228/34020). `Namespace` is fixed as `QCE/CDN`, `Action` is fixed as `DescribeDomains`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `Domain`, can be selected as `Domain`, `ProjectId`. CDN instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CDN&Region=$region&Action=DescribeDomains
Bandwidth Packet                                                | Please refer to [BWP Instance Documents](https://intl.cloud.tencent.com/document/api/215/36919). `Namespace` is fixed as `QCE/BWP`, `Action` is fixed as `DescribeBandwidthPackages`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `BandwidthPackageId`, can be selected as `BandwidthPackageId`, `BandwidthPackageName`. BWP instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/BWP&Region=$region&Action=DescribeBandwidthPackages
Message Queue CKafka                                            | Please refer to [Message Queue CKafka Instance Documents](https://intl.cloud.tencent.com/document/api/597/35357). `Namespace` is fixed as `QCE/CKAFKA`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. CKAFKA instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CKAFKA&Region=$region&Action=DescribeInstances
Elastic IP                                                      | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/215/16702). `Namespace` is fixed as `QCE/LB`, `Action` is fixed as `DescribeAddresses`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `AddressId`, can be selected as `AddressId`, `AddressName`, `AddressIp`. EIP instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/LB&Region=$region&Action=DescribeAddresses
Cloud File Storage                                              | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/582/34514). `Namespace` is fixed as `QCE/CFS`, `Action` is fixed as `DescribeCfsFileSystems`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `FileSystemId`, can be selected as `FileSystemId`, `FsName`. CFS instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CFS&Region=$region&Action=DescribeCfsFileSystems
Serverless Cloud Function                                       | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/583/18582). `Namespace` is fixed as `QCE/SCF_V2`, `Action` is fixed as `ListFunctions`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `FunctionId`, can be selected as `FunctionId`, `FunctionName`. SCF instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/SCF_V2&Region=$region&Action=ListFunctions
Dedicated Tunnel                  | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/216/19819). `Namespace` is fixed as `QCE/DCX`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectTunnelId`, can be selected as `DirectConnectTunnelName`. DCX instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DCX&Region=$region&Action=DescribeInstances
Direct Connection              | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/216/35330). `Namespace` is fixed as `QCE/DC`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectId`, can be selected as `DirectConnectName`. DC instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DC&Region=$region&Action=DescribeInstances
TencentDB for CYNOSDB_MYSQL        | Please refer to [Instance Documents](#). `Namespace` is fixed as `QCE/CYNOSDB_MYSQL`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. CYNOSDBMYSQLinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CYNOSDB_MYSQL&Region=$region&Action=DescribeInstances
TencentDB for TcaplusDB            | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1003/48334). `Namespace` is fixed as `QCE/TCAPLUS`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. TCAPLUS instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/TCAPLUS&Region=$region&Action=DescribeInstances
TencentDB for SQL Server                  | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/238/32115). `Namespace` is fixed as `QCE/SQLSERVER`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `Name`. SQLSERVER instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/SQLSERVER&Region=$region&Action=DescribeInstances
VPN Gateway                | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/215/17514). `Namespace` is fixed as `QCE/VPNGW`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `VpnGatewayId`, can be selected as `VpnGatewayName`. VPNGW instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/VPNGW&Region=$region&Action=DescribeInstances
Direct Connect Gateway                | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/215/36913). `Namespace` is fixed as `QCE/DCG`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectGatewayId`, can be selected as `DirectConnectGatewayName`. DCGinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DCG&Region=$region&Action=DescribeInstances
CDN Province Domains                 | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/228/34020). `Namespace` is fixed as `QCE/CDN_LOG_DATA`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `Domain`, can be selected as `ProjectId`.  |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances
CDN Province Map Info                | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/228/31729). `Namespace` is fixed as `QCE/CDN_LOG_DATA`, `Action` is fixed as `DescribeMapInfo`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `Instance` can be a template variable, such as  `$instance`. `Name` is required for retreiving data. |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances&Instance=$instance&Name=isp
API Gateway                | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/628/36627). `Namespace` is fixed as `QCE/APIGATEWAY`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `ServiceId`, can be selected as `ServiceName`.  |   Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances
API Gateway ServiceEnvironment            | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/628/36627). `Namespace` is fixed as `QCE/APIGATEWAY`, `Action` is fixed as `DescribeServiceEnvironmentList`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `Instance`  can be specific value, or a template variable, such as `$instance`.  |   Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances&Instance=$instance
Cloud Block Storage               | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/362/16315). `Namespace` is fixed as `QCE/BLOCK_STORAGE`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DiskId`, can be selected as `DiskName`. CBS instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/BLOCK_STORAGE&Region=$region&Action=DescribeInstances
Elasticsearch              | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/845/32214). `Namespace` is fixed as `QCE/CES`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. CES instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CES&Region=$region&Action=DescribeInstances
CMQ Queue Service               | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/406/35944). `Namespace` is fixed as `QCE/CMQ`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `QueueName`, can be selected as `QueueId`. CMQ instance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CMQ&Region=$region&Action=DescribeInstances
CMQ Topic Subscription                 | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/product/406/35931). `Namespace` is fixed as `QCE/CMQTOPIC`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `TopicName`, can be selected as `TopicId`. CMQTOPICinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CMQTOPIC&Region=$region&Action=DescribeInstances
TDSQL for MySQL | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/557/16140). `Namespace` is fixed as QCE/TDMYSQL, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceId`, `InstanceName`. TDMYSQL instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TDMYSQL&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
Private Network VPN Gateway | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/17515). `Namespace` is fixed as QCE/VPNX, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `VpnConnectionId`, can be selected as `VpnConnectionId`, `VpnConnectionName`. VPNX instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/VPNX&Action=DescribeInstances&Region=$region&InstanceAlias=VpnConnectionId
Private Network Anycast EIP | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/16702). `Namespace` is fixed as QCE/CEIP_SUMMARY, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `AddressId`, can be selected as `AddressId`, `AddressName`, `AddressIp`. CEIP_SUMMARY instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CEIP_SUMMARY&Action=DescribeInstances&Region=$region&InstanceAlias=AddressId
Private Network Network Detection | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/38696). `Namespace` is fixed as QCE/VPC_NET_DETECT, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `NetDetectId`, can be selected as `NetDetectId`, `NetDetectName`. VPC_NET_DETECT instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/VPC_NET_DETECT&Action=DescribeInstances&Region=$region&InstanceAlias=NetDetectId
Private Network Cloud Connect Network | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/19199). `Namespace` is fixed as QCE/VBC, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `CcnId`, can be selected as `CcnId`, `CcnName`. VBC instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/VBC&Action=DescribeInstances&Region=$region&InstanceAlias=CcnId
Cloud Object Storage | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/436/8291). `Namespace` is fixed as QCE/COS, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `BucketName`, can be selected as `BucketName`. COS instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/COS&Action=DescribeInstances&Region=$region&InstanceAlias=BucketName
Tencent Distributed Message Queue | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1179/52183). `Namespace` is fixed as QCE/TDMQ, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. TDMQ instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TDMQ&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Cloud Physical Machine 1.0 | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/386/32904). `Namespace` is fixed as QCE/CPM, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceId`, `Name`. CPM instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/CPM&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
CPM Peering Connection | Please refer to [Instance Documents](https://cloud.tencent.com/document/product/1024/36903). `Namespace` is fixed as QCE/BM_PCX, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `VpcPeerConnectionId`, can be selected as `VpcPeerConnectionId`, `VpcPeerConnectionName`. BM_PCX instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/BM_PCX&Action=DescribeInstances&Region=$region&InstanceAlias=VpcPeerConnectionId
CPM Load Balancer Public Network | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1027/33280). `Namespace` is fixed as QCE/BM_LB, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `LoadBalancerId`, can be selected as `LoadBalancerId`, `LoadBalancerVips`, `LoadBalancerName`. BM_LB instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/BM_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
CPM Load Balancer Private Network | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1027/33280). `Namespace` is fixed as QCE/BM_INTRA_LB, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `LoadBalancerId`, can be selected as `LoadBalancerId`, `LoadBalancerVips`, `LoadBalancerName`. BM_INTRA_LB instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/BM_INTRA_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
Elastic MapReduce(HDFS) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_HDFS, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. HDFS instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_HDFS&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(HBASE) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_HBASE, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR HBASE instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_HBASE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(HIVE) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_HIVE, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR HIVE instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_HIVE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(NODE) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_NODE, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR NODE instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_NODE&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(PRESTO) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_PRESTO, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR PRESTO instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_PRESTO&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(SPARK) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_SPARK, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR SPARK instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_SPARK&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(YARN) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_YARN, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR YARN instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_YARN&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Elastic MapReduce(ZOOKEEPER) | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/589/34266). `Namespace` is fixed as QCE/TXMR_ZOOKEEPER, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `ClusterId`, can be selected as `ClusterId`, `ClusterName`. EMR instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/TXMR_ZOOKEEPER&Action=DescribeInstances&Region=$region&InstanceAlias=ClusterId
Global Application Acceleration Platform | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/608/36963). `Namespace` is fixed as QCE/QAAP, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceId`. QAAP instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/QAAP&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
Edge Computing Machine Compute Monitor | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1108/42565). `Namespace` is fixed as QCE/ECM, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceId`, `InstanceName`. ECM instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/ECM&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
Edge Computing Machine Block Storage | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1108/42565). `Namespace` is fixed as QCE/ECM_BLOCK_STORAGE, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceId`, `InstanceName`. ECM_BLOCK_STORAGE instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/ECM_BLOCK_STORAGE&Action=DescribeInstances&Region=$region&InstanceAlias=InstanceId
Edge Computing Machine Load Balancer | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1108/48459). `Namespace` is fixed as QCE/ECM_LB, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `LoadBalancerId`, can be selected as `LoadBalancerId`, `LoadBalancerName`. ECM_LB instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/ECM_LB&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId
Web Application Firewall | Please refer to [Web Instance Documents](https://cloud.tencent.com/document/api/228/41118). `Namespace` is fixed as QCE/WAF, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias` is default as `Domain`, can be selected as `Domain`, `ProjectId`. WAF instance allow single-selected and multi-selected when using template variable. |  Namespace=QCE/WAF&Action=DescribeInstances&Region=$region&InstanceAlias=Domain

## Create Template Variable

1. Hover the **Settings Icon** on the top right corner of any Dashboard Page.
2. Click **Variables** Tab on the left bar and `Add variable`.

## Edit Template Variable

- `Name` is usually an English String.
- `Label` is a custom name for the variable. (e.g. set "region" to `Name` and "地区" to `Label`).
- `Type` is the type to query, here we can only select the `Query` option, as requesting the list from the data source.
- `Data source` is the source you configured in Grafana Datasource Configuration.
- `Refresh` is to define when the variable data is updated.
- `Query` is the variable query statement, please refer to the variable example and description in the above table for details.

After filling in the variable information, you can preview the query variable value at the bottom of the page. If it matches the expected value, click the `Add` button to add the variable. After successfully adding, click `Save` on the right menu to save to the Dashboard configuration.

Take the cloud server stand-alone monitoring Dashboard as an example to show how to configure cascading variables: regional variables and cloud server instance variables, as shown in the figure below.

![Variable Region Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-region-config.png?raw=true)

![Variable Instance Config](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-instance-config.png?raw=true)

## Use Template Variable
After the variable is created, the variable selection box will be displayed in the upper left corner of the Dashboard page, and the variable value can be switched. There are two kinds of quoting syntax for variables, `$varname` and `[[varname]]`. Variables are often used in Panel query statements. Take cloud server stand-alone monitoring Dashboard as an example to show how to use variables in queries, as shown in the figure below. In addition, variables can also be applied to Panel titles, Text panels, etc.

![Variable Dashboard](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-cvm-dashboard.png?raw=true)

![Variable Panel Query](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/variable-panel-query.png?raw=true)

# Contact Us

If you have any questions using this app, you are welcome to [create an issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose) or to scan the QR code below to add QQ group chat:

| QQ Group (861359693) |
| ----------- |
| ![QQ Group](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/src/image/QQ-QRCode.png?raw=true) |

# Contribution Guide

Welcome everyone to participate in the development of Tencent Cloud Monitoring Grafana App and contribute!

You can choose the following contribution methods:

- [Contribute Dashboard Templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [Contribute your amazing code and create a Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [Report bug(s) and create an Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

We will add you into [our contributor list](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app#%E8%B4%A1%E7%8C%AE%E8%80%85-)

Read more in the [Contribution Guide](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.en-US.md) document.

# License
Tencent Cloud Monitor Grafana App is delivered under the [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)
