# Tencent Cloud Monitor Grafana App

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

English | [简体中文](./README.md)

# Table of Contents

   * [Tencent Cloud Monitor Grafana App](#tencent-cloud-monitor-grafana-app)
   * [Introduction](#introduction)
   * [Installation](#installation)
   * [Configure Datasource](#configure-datasource)
   * [Create Dashboard](#create-dashboard)
      * [Quick Creation](#quick-creation)
      * [Dashboards Manage Page](#dashboards-manage-page)
      * [Import Dashboard Templates](#import-dashboard-templates)
   * [Configure Panel](#configure-panel)
      * [CVM Monitoring](#cvm-monitoring)
      * [CDB Monitoring](#cdb-monitoring)
      * [CLB Monitoring](#clb-monitoring)
      * [TencentDB for MongoDB](#tencentdb-for-mongodb)
      * [TencentDB for Redis](#tencentdb-for-redis)
      * [Content Delivery Network (CDN)](#content-delivery-network-cdn)
      * [Bandwidth Packet](#bandwidth-packet)
      * [Message Queue CKafka](#message-queue-ckafka)
      * [Elastic IP](#elastic-ip)
      * [Cloud File Storage (CFS)](#cloud-file-storage-cfs)
      * [Serverless Cloud Function (SCF)](#serverless-cloud-function-scf)
   * [Template Variables](#template-variables)
      * [Create Template Variable](#create-template-variable)
      * [Edit Template Variable](#edit-template-variable)
      * [Use Template Variable](#use-template-variable)
   * [Local Development](#local-development)
      * [Docker Support (Recommended)](#docker-support-recommended)
      * [On Local Grafana](#on-local-grafana)
   * [License](#license)

# Introduction

[Tencent Cloud Monitoring]((https://intl.cloud.tencent.com/)) provides users with load and performance monitoring metrics of multiple cloud products such as Cloud Virtual Machine (CVM) and Cloud Databases (CDB). Users can use cloud monitoring consoles, cloud monitoring APIs, and other methods to retrieve relevant monitoring data. Tencent Cloud Monitor Grafana App is an application plugin that adapts to the open-source software Grafana. It retrieves monitoring data by calling [Tencent Cloud Monitoring API 3.0]((https://intl.cloud.tencent.com/document/product/248/33873)), and displays the data on a custom Dashboard.

- Support monitoring [CVM Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/6843);
- Support monitoring [TencentDB for MySQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/11006);
- Support monitoring [TencentDB for PostgreSQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/17945);
- Support monitoring [Private Network NAT Gateway Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10991);
- Support monitoring [Private Network Peering Connection Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10986);
- Support monitoring [Cloud Load Balancer Public Network Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10997);
- Support monitoring [Cloud Load Balancer Private Network Layer-4 Protocol](https://intl.cloud.tencent.com/document/product/248/39529);
- Support monitoring [Cloud Load Balancer Layer-7 Protocol](https://intl.cloud.tencent.com/document/product/248/39530);
- Support monitoring [TencentDB for MongoDB](https://intl.cloud.tencent.com/document/product/248/35671);
- Support monitoring [TencentDB for Redis](https://intl.cloud.tencent.com/document/product/248/39507);
- Support monitoring [Content Delivery Network (CDN)](https://intl.cloud.tencent.com/document/product/248/39554);
- Support monitoring [Bandwidth Packet](https://intl.cloud.tencent.com/document/product/248/34645);
- Support monitoring [Message Queue CKafka](https://intl.cloud.tencent.com/document/product/248/17297);
- Support monitoring [Elastic IP](https://intl.cloud.tencent.com/document/product/248/34646);
- Support monitoring [Cloud File Storage (CFS)](https://intl.cloud.tencent.com/document/product/248/34644);
- Support monitoring [Serverless Cloud Function (SCF)](https://intl.cloud.tencent.com/document/product/248/34638);
- Provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **CVM Monitoring**, **TencentDB for MySQL Monitoring** and **Cloud Load Balancer** etc.
- More cloud product metrics are being improved.

# Installation

Prerequisites: Tencent Cloud Monitor Grafana App Plugin requires Grafana version > 6.x to run, for Grafana installation, please read [Download Grafana](https://grafana.com/grafana/download).

1. Go to the [GitHub releases](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases) and find the latest release.
2. Download .zip package with the plugin from release assets (asset name is tencentcloud-monitor-app-[x.x.x].zip) and unpack it into Grafana's plugins folder (`${GRAFANA_HOME}/data/plugins`), see docs [here](https://grafana.com/docs/grafana/latest/administration/configuration/#plugins) if you can't find your plugin folder.
3. Restart Grafana server.
4. Hover **Settings Icon** in the side menu and select `Plugins`. Successfully installed if the `Tencent Cloud Monitor` APP plugin is displayed in the plugin list.
  ![Plugin APP](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/plugin-app.png)
5. Click `Enable` in the plugin config page.

# Configure Datasource
Tencent Cloud Monitor Grafana App Plugin retrieves monitoring data of each cloud product metrics by calling the [Cloud Monitoring API](https://intl.cloud.tencent.com/document/product/248/33873), and configures the data source of the corresponding cloud product through the following steps.

1. Hover **Settings Icon** in the side menu and select `Data Sources`.
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-add.png)
2. Click `Add data source` on the top right corner of the page and select `Tencent Cloud Monitor Datasource` data source.
  ![Datasource Add](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/datasource-choose.png)
3. `Name` is the data source name, default name is `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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

## CLB Monitoring

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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

## TencentDB for MongoDB

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
3. There are two namespaces in TencentDB for Redis Monitoring: Monitoring Metrics (Memory Edition, 5-Second) (Namespace=QCE/REDIS_MEM) and Monitoring Metrics (CKV/Memory Edition) (Namespace=QCE/REDIS).
4. The input parameters are aligned with [Tencent Cloud Monitoring API documentation](https://intl.cloud.tencent.com/document/product/248/39507).
    - The `Namespace` is for example `QCE/REDIS_MEM`.
    - The `Region` list will be automatically retrieved according to the `Namespace` seleciton.
    - The `MetricName` list will be retrieved after `Namespace` and `Region` are selected.
    - The `Period` list will be retrieved after `MetricName` is selected.
    - The `Instance` corresponds to `Instance.N` in the input params.
      - In order to adapt to the habits of different users, the instance list will be displayed in different fields, default field is `As InstanceId`. There are other options such as `As InstanceName`.
      - Please refer to [this documentation](https://intl.cloud.tencent.com/document/api/213/33258) of how to configure instance params. Toggle `Show Details` to see detailed instance query parameter. The default params are `Offset = 0` and `Limit = 20`.
      - Note: In this app, a single query of monitoring data is an atomic operation, that is, to query the monitoring data of a certain metric of a certain instance, so the instance can only be single-selected. If you need to query the monitoring data of multiple instances, click on the `Add Query` button in upper right corner of the page.
      - `Show Details` toggle button will only show when not selecting template variables.

![redis Panel Query](https://cdn.jsdelivr.net/gh/TencentCloud/tencentcloud-monitor-grafana-app@master/src/image/panel-redis-query.png)

## Content Delivery Network (CDN)

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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

## Elastic IP

1. Click `Add Query` button in a new panel, navigate to the first `Query` tab.
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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
2. Select Queries to `Tencent Cloud Monitor Datasource`.
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

# Template Variables
Template Variables is a Dashboard optimization feature provided by Grafana to create highly reusable and interactive Dashboards. The general idea of template variables is to allow Grafana to obtain different metrics from the data source and provide a way to dynamically change it without modifying the dashboard. Tencent Cloud Monitor Grafana App currently provides variables such as region, CVM, and TencentDB for MySQL instances. The template variables that have been provided are shown in the following table:

Variable | Example | Description |
-------- | ------- | ----------- |
Region               |  Namespace=QCE/CVM&Action=DescribeRegions | Please refer to [Region API Documents](https://intl.cloud.tencent.com/document/product/213/15708). `Action` is fixed as `DescribeRegions`, `Namespace` is the unique namespace for each cloud products, e.g. `QCE/CVM` `QCE/CDB` etc. Region support single-selected as a template variable, The first region will be selected if multi-selected region or selected `All`.
CVM instances         |   Namespace=QCE/CVM&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=PublicIpAddresses | Please refer to [CVM Instance Documents](https://intl.cloud.tencent.com/document/product/213/33258). `Namespace` is fixed as`QCE/CVM`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`PrivateIpAddresses`、`PublicIpAddresses`. CVM instance allow single-selected and multi-selected when using template variable. 
TencentDB for MySQL instances  |  Namespace=QCE/CDB&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=InstanceId | Please refer to [TencentDB for MySQL Instance Documents](https://intl.cloud.tencent.com/document/api/236/15872). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`、`Vip`. CDB MySQL instance allow single-selected and multi-selected when using template variable. 
 TencentDB for PostgreSQL instances  |  Namespace=QCE/POSTGRES&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=DBInstanceId | Please refer to [TencentDB for PostgreSQL Instance Documents](https://intl.cloud.tencent.com/document/api/409/16773). `Namespace` is fixed as`QCE/CDB`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `DBInstanceId`, can be selected as `DBInstanceName`, `PrivateIpAddresses`, `PublicIpAddresses`. CDB PostgreSQL instance allow single-selected and multi-selected when using template variable. 
Private Network NAT Gateway instances  |  Namespace=QCE/NAT_GATEWAY&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=NatGatewayId | Please refer to [Private Network NAT Gateway Instance Documents](https://intl.cloud.tencent.com/document/api/215/34752). `Namespace` is fixed as`QCE/NAT_GATEWAY`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias` is default as `NatGatewayId`, can be selected as `NatGatewayName`. Private Network Nat Gateway instance allow single-selected and multi-selected when using template variable. 
Private Network Peering Connection instances  |  Namespace=QCE/PCX&Region=ap-beijing&Action=DescribeInstances&InstanceAlias=peeringConnectionId | Please refer to [Private Network Peering Connection Instance Documents](https://intl.cloud.tencent.com/document/product/215/2101). `Namespace` is fixed as`QCE/PCX`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `peeringConnectionId`, can be selected as `peeringConnectionName`. Peering Connection instance allow single-selected and multi-selected when using template variable (use multi listeners for Cloud Load Balance). 
Cloud Load Balancer Private Network Layer-4 Protocol instances  |  Namespace=QCE/LB_PRIVATE&Action=DescribeInstances&Region=$region&InstanceAlias=LoadBalancerId | Please refer to [Cloud Load Balancer Instance Documents](https://intl.cloud.tencent.com/document/product/214/33830). `Namespace` can be `QCE/LB_PRIVATE`, `QCE/LB_PUBLIC`, `QCE/LOADBALANCE`, `Action` is fixed as`DescribeInstances`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `InstanceAlias`is default as `LoadBalancerId`, can be selected as `LoadBalancerName`, `LoadBalancerVips`, allowing single-selected and multi-selected. 
Cloud Load Balancer Private Network Layer-4 Protocol listeners  |  Namespace=QCE/LB_PRIVATE&Action=DescribeListeners&Region=$region&Instance=$instance&listenerAlias=ListenerId | Please refer to [Cloud Load Balancer Listener Documents](https://intl.cloud.tencent.com/document/product/214/33831). `Namespace` can be `QCE/LB_PRIVATE`, `QCE/LB_PUBLIC`, `QCE/LOADBALANCE`, `Action` is fixed as`DescribeListeners`. `Region` can be specific value such as `ap-guangzhou`, or a template variable, such as `$region`. `Instance` is an instance ID, can be specific value such as `lbl-rbw529fz`, or a template variable, such as `$instance`. `listenerAlias` is default as `ListenerId`, can be selected as `ListenerName`, `Port`, allowing single-selected and multi-selected.
TencentDB for MongoDB  |  Namespace=QCE/CMONGO&Region=$region&Action=DescribeDBInstances | Please refer to [TencentDB for MongoDB Instance Documents](https://intl.cloud.tencent.com/document/api/240/34702). `Namespace` is fixed as `QCE/CMONGO`, `Action` is fixed as `DescribeDBInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. CMONGO instance allow single-selected and multi-selected when using template variable.
TencentDB for Redis  |  Namespace=QCE/REDIS&Region=$region&Action=DescribeInstances | Please refer to [TencentDB for Redis Instance Documents](https://intl.cloud.tencent.com/document/api/213/33258). `Namespace` is fixed as `QCE/REDIS`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. REDIS instance allow single-selected and multi-selected when using template variable. 
Content Delivery Network (CDN)  |  Namespace=QCE/CDN&Region=$region&Action=DescribeDomains | Please refer to [CDN Instance Documents](https://intl.cloud.tencent.com/document/api/228/34020). `Namespace` is fixed as `QCE/CDN`, `Action` is fixed as `DescribeDomains`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `Domain`, can be selected as `Domain`, `ProjectId`. CDN instance allow single-selected and multi-selected when using template variable.
Bandwidth Packet  |   Namespace=QCE/BWP&Region=$region&Action=DescribeBandwidthPackages | Please refer to [BWP Instance Documents](https://intl.cloud.tencent.com/document/api/215/36919). `Namespace` is fixed as `QCE/BWP`, `Action` is fixed as `DescribeBandwidthPackages`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`. `InstanceAlias`is default as `BandwidthPackageId`, can be selected as `BandwidthPackageId`, `BandwidthPackageName`. BWP instance allow single-selected and multi-selected when using template variable.
Message Queue CKafka  |  Namespace=QCE/CKAFKA&Region=$region&Action=DescribeInstances | Please refer to [Message Queue CKafka Instance Documents](https://intl.cloud.tencent.com/document/api/597/35357). `Namespace` is fixed as `QCE/CKAFKA`, `Action` is fixed as `DescribeInstances`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `InstanceId`, can be selected as `InstanceName`. CKAFKA instance allow single-selected and multi-selected when using template variable.
Elastic IP  |  Namespace=QCE/LB&Region=$region&Action=DescribeAddresses | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/215/16702). `Namespace` is fixed as `QCE/LB`, `Action` is fixed as `DescribeAddresses`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `AddressId`, can be selected as `AddressId`, `AddressName`, `AddressIp`. EIP instance allow single-selected and multi-selected when using template variable.
Cloud File Storage  |  Namespace=QCE/CFS&Region=$region&Action=DescribeCfsFileSystems | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/582/34514). `Namespace` is fixed as `QCE/CFS`, `Action` is fixed as `DescribeCfsFileSystems`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `FileSystemId`, can be selected as `FileSystemId`, `FsName`. CFS instance allow single-selected and multi-selected when using template variable.
Serverless Cloud Function  |  Namespace=QCE/SCF_V2&Region=$region&Action=ListFunctions | Please refer to [Instance Documents](https://intl.cloud.tencent.com/document/api/583/18582). `Namespace` is fixed as `QCE/SCF_V2`, `Action` is fixed as `ListFunctions`. `Region` can be specific value such as `ap-beijing`, or a template variable, such as `$region`.  `InstanceAlias`is default as `FunctionId`, can be selected as `FunctionId`, `FunctionName`. SCF instance allow single-selected and multi-selected when using template variable.

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
$ npm run analyze
```

## Docker Support (Recommended)
For development and test purpose, we added [*docker-compose.yml*](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/docker-compose.yml) file, simply run:
```bash
$ docker-compose up
```
and visit (http://localhost:3000)

## On Local Grafana
Alternately, you can clone this repository into your Grafana Plugin directory and restart your local Grafana. Please ensure your local Grafana verison is greater than 6.x.

# License
Tencent Cloud Monitor Grafana App is delivered under the [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE)