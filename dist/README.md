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

# Introduction

[Tencent Cloud Monitoring](https://intl.cloud.tencent.com/product/cm) provides users with load and performance monitoring metrics of multiple cloud products such as Cloud Virtual Machine (CVM) and Cloud Databases (CDB). Users can use cloud monitoring consoles, cloud monitoring APIs, and other methods to retrieve relevant monitoring data.

[Tencent Cloud Log Service](https://intl.cloud.tencent.com/product/cls) is a one-stop solution that offers real-time log collection, storage, search, analysis, consuming and shipping, enabling businesses to meet their operational, security, regulatory and analytical needs. Requiring just five minutes to deploy, this reliable logging service overcomes the traditional headaches of resource provisioning and scaling.

Tencent Cloud Monitor Grafana App is an application plugin that adapts to the open-source software Grafana. It retrieves monitoring and log data by calling [Tencent Cloud Monitoring API 3.0](https://intl.cloud.tencent.com/document/product/248/33873) and [Tencent Cloud Log Service API 3.0](https://intl.cloud.tencent.com/document/product/614/42757), and displays the data on a custom Dashboard.

For supported cloud products monitoring, please read this [document](https://intl.cloud.tencent.com/document/product/248/40019). More cloud product metrics are being improved.

This plugin provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **CVM Monitoring**, **TencentDB for MySQL Monitoring** and **Cloud Load Balancer** etc.

# Get Started

Install the latest plugin using Grafana CLI:

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```

Read more about plugins installation and configuration in this [monitor document](https://intl.cloud.tencent.com/document/product/248/40020) and [log service document](https://cloud.tencent.com/document/product/614/52102).


# Template Variables
Template Variables is a Dashboard optimization feature provided by Grafana to create highly reusable and interactive Dashboards. The general idea of template variables is to allow Grafana to obtain different metrics from the data source and provide a way to dynamically change it without modifying the dashboard. Tencent Cloud Monitor Grafana App currently provides variables such as region, CVM, and TencentDB for MySQL instances.

Please read this [document](https://intl.cloud.tencent.com/document/product/248/40024) for more detailed information and examples.

# Contact Us

If you have any questions using this app, you are welcome to [create an issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose).

# Contribution Guide

Welcome everyone to participate in the development of Tencent Cloud Monitoring Grafana App and contribute!

You can choose the following contribution methods:

- [Contribute Dashboard Templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [Contribute your amazing code and create a Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [Report bug(s) and create an Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

We will add you into [our contributor list](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app#%E8%B4%A1%E7%8C%AE%E8%80%85-)

Read more in the [Contribution Guide](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/CONTRIBUTING.en-US.md) document.

# License
Tencent Cloud Monitor Grafana App is delivered under the [Apache License 2.0](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/LICENSE).
