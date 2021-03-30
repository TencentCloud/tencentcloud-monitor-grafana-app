[![Tencent Cloud Monitor Grafana App](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/plugin-app.png?raw=true)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app)

[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/TencentCloud/tencentcloud-monitor-grafana-app?sort=semver&color=green)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases)
[![License](https://img.shields.io/github/license/TencentCloud/tencentcloud-monitor-grafana-app?color=blue)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)
[![Change Log](https://img.shields.io/badge/change-log-blue.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CHANGELOG.md)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/TencentCloud/tencentcloud-monitor-grafana-app)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
[![Marketplace](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=marketplace&prefix=v&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.version&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)
[![Downloads](https://img.shields.io/badge/dynamic/json?logo=grafana&color=F47A20&label=downloads&query=%24.items%5B%3F%28%40.slug%20%3D%3D%20%22tencentcloud-monitor-app%22%29%5D.downloads&url=https%3A%2F%2Fgrafana.com%2Fapi%2Fplugins)](https://grafana.com/grafana/plugins/tencentcloud-monitor-app)

# Tencent Cloud Monitor Grafana App

English | [简体中文](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md)

# Table of Contents

  * [Introduction](#introduction)
  * [Get Started](#get-started)
    * [Installation](#installation)
      * [Use Grafana CLI](#use-grafana-cli)
      * [From GitHub Releases](#from-github-releases)
      * [From Source Code](#from-source-code)
    * [Upgrade](#upgrade)
    * [More Options](#more-options)
  * [Configure Datasource](#configure-datasource)
  * [Create Dashboard](#create-dashboard)
    * [Quick Creation](#quick-creation)
    * [Dashboards Manage Page](#dashboards-manage-page)
    * [Import Dashboard Templates](#import-dashboard-templates)
  * [Configure Panel](#configure-panel)
    * [CVM Monitoring](#cvm-monitoring)
    * [CDB Monitoring](#cdb-monitoring)
    * [PostgreSql Monitoring](#postgresql-monitoring)
    * [TencentDB for MongoDB](#tencentdb-for-mongodb)
    * [TencentDB for Redis](#tencentdb-for-redis)
    * [CYNOSDBMYSQL Monitoring](#cynosdbmysql-monitoring)
    * [TcaplusDB Monitoring](#tcaplusdb-monitoring)
    * [SQLServer Monitoring](#sqlserver-monitoring)
    * [Content Delivery Network (CDN)](#content-delivery-network-cdn)
    * [Bandwidth Packet](#bandwidth-packet)
    * [Message Queue CKafka](#message-queue-ckafka)
    * [CLB Monitoring](#clb-monitoring)
    * [Elastic IP](#elastic-ip)
    * [Cloud File Storage (CFS)](#cloud-file-storage-cfs)
    * [Serverless Cloud Function (SCF)](#serverless-cloud-function-scf)
    * [Dedicated Tunnel Monitoring (DCX)](#dedicated-tunnel-monitoring-dcx)
    * [Direct Connection](#direct-connection)
    * [VPN Gateway](#vpn-gateway)
    * [Direct Connect Gateway](#direct-connect-gateway)
    * [CDN Province](#cdn-province)
    * [API Gateway](#api-gateway)
    * [Cloud Block Storage](#cloud-block-storage)
    * [Elasticsearch](#elasticsearch)
    * [CMQ Queue Service](#cmq-queue-service)
    * [CMQ Topic Subscription](#cmq-topic-subscription)
  * [Template Variables](#template-variables)
    * [Create Template Variable](#create-template-variable)
    * [Edit Template Variable](#edit-template-variable)
    * [Use Template Variable](#use-template-variable)
  * [Local Development](#local-development)
    * [Docker Support (Recommended)](#docker-support-recommended)
    * [On Local Grafana](#on-local-grafana)
  * [Contact Us](#contact-us)
  * [Contributors ✨](#contributors)
  * [Contribution Guide](#contribution-guide)
  * [License](#license)

# Introduction

[Tencent Cloud Monitoring]((https://intl.cloud.tencent.com/)) provides users with load and performance monitoring metrics of multiple cloud products such as Cloud Virtual Machine (CVM) and Cloud Databases (CDB). Users can use cloud monitoring consoles, cloud monitoring APIs, and other methods to retrieve relevant monitoring data. Tencent Cloud Monitor Grafana App is an application plugin that adapts to the open-source software Grafana. It retrieves monitoring data by calling [Tencent Cloud Monitoring API 3.0]((https://intl.cloud.tencent.com/document/product/248/33873)), and displays the data on a custom Dashboard.

- Support monitoring [CVM Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/6843);
- Support monitoring [TencentDB for MySQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/11006);
- Support monitoring [TencentDB for PostgreSQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/17945);
- Support monitoring [TencentDB for MongoDB](https://intl.cloud.tencent.com/document/product/248/35671);
- Support monitoring [TencentDB for Redis](https://intl.cloud.tencent.com/document/product/248/39507);
- Support monitoring [TencentDB for TcaplusDB](https://intl.cloud.tencent.com/document/product/248/34592);
- Support monitoring [TencentDB for SQL Server](https://intl.cloud.tencent.com/document/product/248/11008);
- Support monitoring [TencentDB for CYNOSDB_MYSQL](https://intl.cloud.tencent.com/document/product/248/37383);
- Support monitoring [Private Network NAT Gateway Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10991);
- Support monitoring [Private Network Peering Connection Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10986);
- Support monitoring [VPN Gateway Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10988);
- Support monitoring [Direct Connect Gateway](https://intl.cloud.tencent.com/document/product/248/10990);
- Support monitoring [Cloud Load Balancer Public Network Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10997);
- Support monitoring [Cloud Load Balancer Private Network Layer-4 Protocol](https://intl.cloud.tencent.com/document/product/248/39529);
- Support monitoring [Cloud Load Balancer Layer-7 Protocol](https://intl.cloud.tencent.com/document/product/248/39530);
- Support monitoring [Content Delivery Network (CDN)](https://intl.cloud.tencent.com/document/product/248/39554);
- Support monitoring [CDN Province](https://intl.cloud.tencent.com/document/product/248/39556);
- Support monitoring [Bandwidth Packet](https://intl.cloud.tencent.com/document/product/248/34645);
- Support monitoring [Message Queue CKafka](https://intl.cloud.tencent.com/document/product/248/17297);
- Support monitoring [CMQ Queue Service](https://intl.cloud.tencent.com/document/product/248/34643);
- Support monitoring [CMQ Topic Subscription](https://intl.cloud.tencent.com/document/product/248/11013);
- Support monitoring [Elastic IP](https://intl.cloud.tencent.com/document/product/248/34646);
- Support monitoring [Cloud File Storage (CFS)](https://intl.cloud.tencent.com/document/product/248/34644);
- Support monitoring [Serverless Cloud Function (SCF)](https://intl.cloud.tencent.com/document/product/248/34638);
- Support monitoring [Dedicated Tunnel](https://intl.cloud.tencent.com/document/product/248/10995);
- Support monitoring [Direct Connection](https://intl.cloud.tencent.com/document/product/248/10994);
- Support monitoring [API Gateway](https://intl.cloud.tencent.com/document/product/248/19130);
- Support monitoring [Cloud Block Storage](https://intl.cloud.tencent.com/document/product/248/37085);
- Support monitoring [Elasticsearch](https://intl.cloud.tencent.com/document/product/248/34642);
- Provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **CVM Monitoring**, **TencentDB for MySQL Monitoring** and **Cloud Load Balancer** etc.
- More cloud product metrics are being improved.

# Get Started

There are multiple ways to install tencentcloud-monitor-grafana-app, please choose one of the methods below.

> Prerequisites: Tencent Cloud Monitor Grafana App Plugin requires Grafana version > 6.x to run, for Grafana installation, please read [Download Grafana](https://grafana.com/grafana/download).

## Installation
### Use Grafana CLI

Get list of available versions:

```bash
$ grafana-cli plugins list-versions tencentcloud-monitor-app
```

Install the latest plugin:

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```

Restart grafana after installing plugins:

```bash
$ systemctl restart grafana-server
```

Read more about installing plugins in [Grafana plugins installation guide](https://grafana.com/docs/grafana/latest/plugins/installation/).

Warning: The only reliable installation method is grafana-cli. Any other way should be treated as a workaround and doesn't provide any backward-compatibility guaranties.

### From GitHub Releases

1. Go to the [GitHub releases](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases) and find the latest release.
2. Download .zip package with the plugin from release assets (asset name is tencentcloud-monitor-app-[x.x.x].zip) and unpack it into Grafana's plugins folder (`${GRAFANA_HOME}/data/plugins`), see docs [here](https://grafana.com/docs/grafana/latest/administration/configuration/#plugins) if you can't find your plugin folder.
3. Restart Grafana server.
4. Hover **Settings Icon** in the side menu and select `Plugins`. Successfully installed if the `Tencent Cloud Monitor` APP plugin is displayed in the plugin list.
5. Click `Enable` in the plugin config page.

### From Source Code

If you want to build a package yourself, or contribute, read [Contribution Guide](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.en-US.md).

## Upgrade

```bash
$ grafana-cli plugins upgrade tencentcloud-monitor-app
```

Restart grafana after upgrading plugins:

```bash
$ systemctl restart grafana-server
```

### More Options

You can read more options by running help command below:

```bash
$ grafana-cli plugins --help
```

# Configure Datasource
Tencent Cloud Monitor Grafana App Plugin retrieves monitoring data of each cloud product metrics by calling the [Cloud Monitoring API](https://intl.cloud.tencent.com/document/product/248/33873), and configures the data source of the corresponding cloud product through the following steps.

1. Hover **Settings Icon** in the side menu and select `Data Sources`.
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-add.png)
2. Click `Add data source` on the top right corner of the page and select `Tencent Cloud Monitoring` data source.
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-choose.png)
3. `Name` is the data source name, default name is `Tencent Cloud Monitoring`.
4. `SecretId` and `SecretKey` are the security certificate information required to call the Cloud Monitoring API. Both can be retrieved through the Tencent Cloud console [Cloud API key page](https://console.cloud.tencent.com/cam/capi);
5. Toggle Cloud Products to enable/disable.
6. Click `Save & Test` button to test the connection, the data source can be used in the Dashboard after the connection is successful.
  ![Datasource Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-config.png)

# Create Dashboard

There are three ways to create a Dashboard:

## Quick Creation

Hover **Plus Icon** in the side menu and select `+Dashboard`.

## Dashboards Manage Page

Hover **Menu Icon** in the side menu and select `Manage`. Click on the `New Dashboard` button to create a new Dashboard. At the same time, you can perform various management operations on Dashboard on this page, such as creating new folders, moving Dashboard, and importing Dashboard.

## Import Dashboard Templates

Hover **Settings Icon** in the side menu and select `Plugins`. Select the `Tencent Cloud Monitor` plugin, navigate to `Dashboards` tab and import dashboard templates from here.

![Import Plugin Dashboard](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/plugin-dashboard.png)

# Configure Panel
After creating the Dashboard, you can get the corresponding monitoring data monitored by Tencent Cloud by configuring the Panel. Now take a simple Graph as an example to show how to configure Panel information.

## CVM Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/6843).
    - The `Namespace` is for example `QCE/CVM`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`, `As PrivateIpAddress` and `As PublicIpAddress`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/213/33258) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![CVM Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cvm-query.png)

## CDB Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/11006).
    - The `Namespace` is for example `QCE/CDB`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName` and `As Vip`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/236/15872) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![CDB Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cdb-query.png)

## PostgreSql Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/45105).
    - The `Namespace` is for example `QCE/POSTGRES`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As DBInstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/409/16773) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![PostgreSql Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-postgre-query.png)

## TencentDB for MongoDB

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/35671).
    - The `Namespace` is for example `QCE/CMONGO`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/240/34702) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![mongodb Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-mongodb-query.png)

## TencentDB for Redis

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. There are two namespaces in TencentDB for Redis Monitoring: Monitoring Metrics (Memory Edition, 5-Second) (Namespace=QCE/REDIS_MEM) and Monitoring Metrics (CKV/Memory Edition) (Namespace=QCE/REDIS).
4. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/39507).
    - The `Namespace` is for example `QCE/REDIS_MEM`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/239/32065) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![redis Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-redis-query.png)

## CYNOSDBMYSQL Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/37383).
    - The `Namespace` is for example `QCE/CYNOSDB_MYSQL`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/248/37383) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

  ![cynosdbMysql Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cynosdbMysql-query.png)

## TcaplusDB Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34592).
    - The `Namespace` is for example `QCE/TCAPLUS`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/248/34592) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![tcaplus Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-tcaplus-query.png)
    
## SQLServer Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/11008).
    - The `Namespace` is for example `QCE/SQLSERVER`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As Name`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/238/32115) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![sqlserver Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-sqlserver-query.png)

## Content Delivery Network (CDN)

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. There are two namespaces in CDN Monitoring: Chinese Mainland Domain (Namespace=QCE/CDN) and Overseas Domain (Namespace=QCE/OV_CDN).
4. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/39554).
    - The `Namespace` is for example `QCE/CDN`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As Domain`. There are other options such as `As ProjectId`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/228/34020) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

## Bandwidth Packet

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34645).
    - The `Namespace` is for example `QCE/BWP`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As BandwidthPackageId`. There are other options such as `As BandwidthPackageName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/215/36919) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 10`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![BWP Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-bwp-query.png)

## Message Queue CKafka

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/17297).
    - The `Namespace` is for example `QCE/CKAFKA`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/597/35357) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 10`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![ckafka Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-ckafka-query.png)

## CLB Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. There are three namespaces in CLB Monitoring: Cloud Load Balancer Public Network Monitoring (Namespace=QCE/LB_PUBLIC), Cloud Load Balancer Private Network Layer-4 Protocol (Namespace=QCE/LB_PRIVATE) and Cloud Load Balancer Layer-7 Protocol (Namespace=QCE/LOADBALANCE).
4. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/10997).
    - The `Namespace` is for example `QCE/LB_PUBLIC`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As LoadBalancerId`. There are other options such as `As LoadBalancerName` and `As LoadBalancerVips`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/214/33830) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.
    - The `Listener` corresponds to `Listener.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As ListenerId`. There are other options such as `As ListenerName` and `As Port`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/product/214/33831) of how to configure instance params.

![Clb Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-clb-query.png)

## Elastic IP

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34646).
    - The `Namespace` is for example `QCE/LB`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As AddressId`. There are other options such as `As AddressName` and `AddressIp`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/215/16702) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![eip Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-eip-query.png)

## Cloud File Storage (CFS)

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34644).
    - The `Namespace` is for example `QCE/CFS`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As FileSystemId`. There are other options such as `As FsName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/582/34514) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![cfs Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cfs-query.png)

## Serverless Cloud Function (SCF)

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34638).
    - The `Namespace` is for example `QCE/SCF_V2`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As FunctionId`. There are other options such as `As FunctionName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/583/18582) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![scf Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-scf-query.png)

## Dedicated Tunnel Monitoring (DCX)

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/45101).
    - The `Namespace` is for example `QCE/DCX`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As DirectConnectTunnelId`. There are other options such as `As DirectConnectTunnelName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/216/19819) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![dcx Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-dcx-query.png)
    

## Direct Connection

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/10994).
    - The `Namespace` is for example `QCE/DC`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As DirectConnectId`. There are other options such as `As DirectConnectName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/216/34826) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![dc Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-dc-query.png)

## VPN Gateway

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/10994).
    - The `Namespace` is for example `QCE/VPNGW`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As VpnGatewayId`. There are other options such as `As VpnGatewayName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/215/17514) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![vpngw Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-vpngw-query.png)

## Direct Connect Gateway

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/10990).
    - The `Namespace` is for example `QCE/DCG`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As DirectConnectGatewayId`. There are other options such as `As DirectConnectGatewayName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/215/30644) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![dcg Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-dcg-query.png)

## CDN Province

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/10990).
    - The `Namespace` is for example `QCE/CDN_LOG_DATA`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As Domain`. There are other options such as `As ProjectId`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/228/41118) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![cdnProvince Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cdnProvince-query.png)

## API Gateway

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/19130).
    - The `Namespace` is for example `QCE/APIGATEWAY`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As ServiceId`. There are other options such as `As ServiceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/628/45198) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.
    - `EnvironmentName` will retrieve by `Instance`.

![apigateway Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-apigateway-query.png)

## Cloud Block Storage

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/37085).
    - The `Namespace` is for example `QCE/BLOCK_STORAGE`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As DiskId`. There are other options such as `As DiskName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/362/16315) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![cbs Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cbs-query.png)
    

## Elasticsearch

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34642).
    - The `Namespace` is for example `QCE/CES`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/845/30631) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![ces Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-ces-query.png)

## CMQ Queue Service

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/34643).
    - The `Namespace` is for example `QCE/CMQ`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As QueueName`. There are other options such as `As QueueId`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/406/42624) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![cmq Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cmq-query.png)

## CMQ Topic Subscription

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Datasource to `Tencent Cloud Monitoring`.
3. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/11013).
    - The `Namespace` is for example `QCE/CMQTOPIC`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As TopicName`. There are other options such as `As TopicId`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/406/42637) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![cmqTopic Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-cmqTopic-query.png)

# Template Variables
Template Variables is a Dashboard optimization feature provided by Grafana to create highly reusable and interactive Dashboards. The general idea of template variables is to allow Grafana to obtain different metrics from the data source and provide a way to dynamically change it without modifying the dashboard. Tencent Cloud Monitor Grafana App currently provides variables such as region, CVM, and TencentDB for MySQL instances.

Notes: All Instance Queries allow customizing dropdown list values by `display` param, for example: `Namespace=QCE/REDIS&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`. If `display` and `InstanceAlias` appear at the same time, the dropdown list will only show values of `display`.

The template variables that have been provided are shown in the following table:

Variable | Description | Example |
-------- | ----------- | ------- |
Region                                                          | Please refer to [Region API Documents](https://intl.cloud.tencent.com/document/product/213/15708). `Action` is fixed as `DescribeRegions`, `Namespace` is the unique namespace for each cloud products, e.g. `QCE/CVM` `QCE/CDB` etc. Region support single-selected as a template variable, The first region will be selected if multi-selected region or selected `All`. |  Namespace=QCE/CVM&Action=DescribeRegions
CVM instances                                                   | Please refer to [CVM Instance Documents](https://intl.cloud.tencent.com/document/product/213/33258). `Namespace` is fixed as`QCE/CVM`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`PrivateIpAddresses`、`PublicIpAddresses`. CVM instance allow single-selected and multi-selected when using template variable.  |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=PublicIpAddresses
TencentDB for MySQL instances                                   | Please refer to [TencentDB for MySQL Instance Documents](https://intl.cloud.tencent.com/document/api/236/15872). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`Vip`. CDB MySQL instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/CDB&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=InstanceId
 TencentDB for PostgreSQL instances                             | Please refer to [TencentDB for PostgreSQL Instance Documents](https://intl.cloud.tencent.com/document/api/409/16773). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `DBInstanceId`, can be selected as `DBInstanceName`, `PrivateIpAddresses`, `PublicIpAddresses`. CDB PostgreSQL instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/POSTGRES&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=DBInstanceId
Private Network NAT Gateway instances                           | Please refer to [Private Network NAT Gateway Instance Documents](https://intl.cloud.tencent.com/document/api/215/34752). `Namespace` is fixed as`QCE/NAT_GATEWAY`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `NatGatewayId`, can be selected as `NatGatewayName`. Private Network Nat Gateway instance allow single-selected and multi-selected when using template variable.  |  Namespace=QCE/NAT_GATEWAY&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=NatGatewayId
Private Network Peering Connection instances                    | Please refer to [Private Network Peering Connection Instance Documents](https://intl.cloud.tencent.com/document/product/215/2101). `Namespace` is fixed as`QCE/PCX`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `peeringConnectionId`, can be selected as `peeringConnectionName`. Peering Connection instance allow single-selected and multi-selected when using template variable (use multi listeners for Cloud Load Balance).  |  Namespace=QCE/PCX&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=peeringConnectionId
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
Dedicated Tunnel                  | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/216/19819). `Namespace` is fixed as `QCE/DCX`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectTunnelId`, can be selected as `DirectConnectTunnelName`. DCXinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DCX&Region=$region&Action=DescribeInstances
Direct Connection              | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/216/34826). `Namespace` is fixed as `QCE/DC`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectId`, can be selected as `DirectConnectName`. DCinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DC&Region=$region&Action=DescribeInstances
TencentDB for CYNOSDB_MYSQL        | Please refer to [Instance Documents](#). `Namespace` is fixed as `QCE/CYNOSDB_MYSQL`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. CYNOSDBMYSQLinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CYNOSDB_MYSQL&Region=$region&Action=DescribeInstances
TencentDB for TcaplusDB            | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/1003/48334). `Namespace` is fixed as `QCE/TCAPLUS`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. TCAPLUSinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/TCAPLUS&Region=$region&Action=DescribeInstances
TencentDB for SQL Server                  | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/238/19969). `Namespace` is fixed as `QCE/SQLSERVER`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `Name`. SQLSERVERinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/SQLSERVER&Region=$region&Action=DescribeInstances
VPN Gateway                | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/17514). `Namespace` is fixed as `QCE/VPNGW`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `VpnGatewayId`, can be selected as `VpnGatewayName`. VPNGWinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/VPNGW&Region=$region&Action=DescribeInstances
Direct Connect Gateway                | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/215/30644). `Namespace` is fixed as `QCE/DCG`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DirectConnectGatewayId`, can be selected as `DirectConnectGatewayName`. DCGinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/DCG&Region=$region&Action=DescribeInstances
CDN Province Domains                 | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/228/41118). `Namespace` is fixed as `QCE/CDN_LOG_DATA`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `Domain`, can be selected as `ProjectId`.  |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances
CDN Province Map Info                | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/228/31296). `Namespace` is fixed as `QCE/CDN_LOG_DATA`，`Action` is fixed as `DescribeMapInfo`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `Instance` can be a template variable, such as  `$instance`. `Name` is required for retreiving data. |   Namespace=QCE/CDN_LOG_DATA&Region=$region&Action=DescribeInstances&Instance=$instance&Name=isp
API Gateway                | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/628/45194). `Namespace` is fixed as `QCE/APIGATEWAY`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `ServiceId`, can be selected as `ServiceName`.  |   Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances
API Gateway ServiceEnvironment            | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/628/45198). `Namespace` is fixed as `QCE/APIGATEWAY`，`Action` is fixed as `DescribeServiceEnvironmentList`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `Instance`  can be specific value, or a template variable, such as `$instance`.  |   Namespace=QCE/APIGATEWAY&Region=$region&Action=DescribeInstances&Instance=$instance
Cloud Block Storage               | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/362/16315). `Namespace` is fixed as `QCE/BLOCK_STORAGE`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `DiskId`, can be selected as `DiskName`. CBSinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/BLOCK_STORAGE&Region=$region&Action=DescribeInstances
Elasticsearch              | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/845/30631). `Namespace` is fixed as `QCE/CES`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `InstanceId`, can be selected as `InstanceName`. CESinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CES&Region=$region&Action=DescribeInstances
CMQ Queue Service               | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/406/42624). `Namespace` is fixed as `QCE/CMQ`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `QueueName`, can be selected as `QueueId`. CMQinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CMQ&Region=$region&Action=DescribeInstances
CMQ Topic Subscription                 | Please refer to [Instance Documents](https://cloud.tencent.com/document/api/406/42637). `Namespace` is fixed as `QCE/CMQTOPIC`，`Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `TopicName`, can be selected as `TopicId`. CMQTOPICinstance allow single-selected and multi-selected when using template variable. |   Namespace=QCE/CMQTOPIC&Region=$region&Action=DescribeInstances


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

![Variable Region Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-region-config.png)

![Variable Instance Config](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-instance-config.png)

## Use Template Variable
After the variable is created, the variable selection box will be displayed in the upper left corner of the Dashboard page, and the variable value can be switched. There are two kinds of quoting syntax for variables, `$varname` and `[[varname]]`. Variables are often used in Panel query statements. Take cloud server stand-alone monitoring Dashboard as an example to show how to use variables in queries, as shown in the figure below. In addition, variables can also be applied to Panel titles, Text panels, etc.

![Variable Dashboard](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-cvm-dashboard.png)

![Variable Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/variable-panel-query.png)

# Local Development

1. Clone this repository on your local machine
```bash
$ git clone https://github.com/TencentCloud/tencentcloud-monitor-grafana-app.git
```

2. Install dependencies
```bash
$ npm install
```

3. Run the development environmnet
```bash
$ npm run watch
```

## Docker Support (Recommended)
For development and test purpose, we added [*docker-compose.yml*](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/docker-compose.yml) file, simply run:
```bash
$ docker-compose up
```
and visit (http://localhost:3000)

## On Local Grafana
Alternately, you can clone this repository into your Grafana Plugin directory and restart your local Grafana. Please ensure your local Grafana verison is greater than 6.x.

# Contact Us

If you have any questions using this app, you are welcome to [create an issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose) or to scan the QR code below to add QQ group chat:

| QQ Group (861359693) |
| ----------- |
| ![QQ Group](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/QQ-QRCode@v2.png) |

# Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/heriky"><img src="https://avatars.githubusercontent.com/u/12195736?v=4?s=70" width="70px;" alt=""/><br /><sub><b>heriky</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/jamesxwang"><img src="https://avatars.githubusercontent.com/u/36892657?v=4?s=70" width="70px;" alt=""/><br /><sub><b>jamesxwang</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=jamesxwang" title="Code">💻</a> <a href="#" title="Documentation	">📖</a></td>
    <td align="center"><a href="https://github.com/leonlysu"><img src="https://avatars.githubusercontent.com/u/73583724?v=4?s=70" width="70px;" alt=""/><br /><sub><b>leonlysu</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=leonlysu" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/susiezhao"><img src="https://avatars.githubusercontent.com/u/13827192?v=4?s=70" width="70px;" alt=""/><br /><sub><b>susiezhao</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=susiezhao" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/taoran34"><img src="https://avatars.githubusercontent.com/u/9361046?v=4?s=70" width="70px;" alt=""/><br /><sub><b>taoran34</b></sub></a><br /><a href="#" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Cloudlie"><img src="https://avatars.githubusercontent.com/u/7425309?v=4?s=70" width="70px;" alt=""/><br /><sub><b>Cloudlie</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/commits?author=Cloudlie" title="Code">💻</a><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/created_by/Cloudlie">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# Contribution Guide

Welcome everyone to participate in the development of Tencent Cloud Monitoring Grafana App and contribute!

You can choose the following contribution methods:

- [Contribute Dashboard Templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [Contribute your amazing code and create a Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [Report bug(s) and create an Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

We will add you into [our contributor list](#contributors)

Read more in the [Contribution Guide](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.en-US.md) document.

# License
Tencent Cloud Monitor Grafana App is delivered under the [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)
