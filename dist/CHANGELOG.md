# TencentCloud Monitor Grafana App
---

## [2.0.2] - 2021-04-13

### Added

- Plugin signing script.

### Fixed

- Set English as the main readme language in dist/
- Other minor document fixes.

---

## [2.0.1] - 2021-04-07

### Fixed

- Readme display issues on https://grafana.com/grafana/plugins/tencentcloud-monitor-app.
- Update screenshot images.
- Multi backend plugin process.

---

## [2.0.0] - 2021-04-06

### 2.0.0 Feature highlights

We are now officially on [Grafana Plugins](https://grafana.com/grafana/plugins/tencentcloud-monitor-app), the plugin is signed and safer!

### Breaking changes

- Minimum Grafana version is 7.0.
- We are now removing [`tc-monitor-cli`](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/release/1.5.0/bin/tc-monitor-cli) in this version, use [grafana-cli](https://grafana.com/docs/grafana/latest/administration/cli/) instead!

### Added

- Signing the plugin from Grafana, [read more about the signed plugin](https://grafana.com/docs/grafana/latest/plugins/plugin-signatures).
- User guide while enabling the plugin.
- Searching function when configuring the data source.

### Fixed

- Backend datasource for secretId/secretKey authorization (#19).


### Installation

> Prerequisites: Grafana version >= 7.0.

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```


See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---
## [1.5.0] - 2021-04-02

### Added

- Support monitoring [Dedicated Tunnel](https://intl.cloud.tencent.com/document/product/248/10995);
- Support monitoring [Direct Connection](https://intl.cloud.tencent.com/document/product/248/10994);
- Support monitoring [TencentDB for TcaplusDB](https://intl.cloud.tencent.com/document/product/248/34592);
- Support monitoring [TencentDB for SQL Server](https://intl.cloud.tencent.com/document/product/248/11008);
- Support monitoring [TencentDB for CYNOSDB_MYSQL](https://intl.cloud.tencent.com/document/product/248/37383);
- Support monitoring [VPN Gateway](https://intl.cloud.tencent.com/document/product/248/10988);
- Support monitoring [Direct Connect Gateway](https://intl.cloud.tencent.com/document/product/248/10990);
- Support monitoring [CDN Province](https://intl.cloud.tencent.com/document/product/248/39556);
- Support monitoring [API Gateway](https://intl.cloud.tencent.com/document/product/248/19130);
- Support monitoring [Cloud Block Storage](https://intl.cloud.tencent.com/document/product/248/37085);
- Support monitoring [Elasticsearch](https://intl.cloud.tencent.com/document/product/248/34642);
- Support monitoring [CMQ Queue Service](https://intl.cloud.tencent.com/document/product/248/34643);
- Support monitoring [CMQ Topic Subscription](https://intl.cloud.tencent.com/document/product/248/11013);
- User guide while enabling the plugin.
- Searching function when configuring the data source.

### Fixed

- Preset dashboard templates. (#47)
- Remove `$region` in CDN monitoring.
- Other known issues.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.4.4] - 2021-03-23

### Added

- Contributors and Contribution guide in README (#33).

### Fixed

- Allow using variables to get instance data in SCF monitoring (#32) (#37).
- Some minor fix.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.4.3] - 2021-03-10

### Added

- [`tc-monitor-cli`](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/release/1.4.3/bin/tc-monitor-cli) for plugin's installation, upgrade and rollback.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.4.2] - 2021-03-08

### Added

- Add URL for instance Template Variable value, more readable URL for users.
- Add `display` param in query for customizing dropdown list values. For example: `Namespace=QCE/REDIS&Action=DescribeInstances&Region=$region&display=${InstanceId}-${InstanceName}`.  
**Note: if `display` and `InstanceAlias` appear at the same time, the dropdown list will only show values of `display`.**
- Allow search when selecting namespaces.

### Fixed

- Some known errors.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).


---

## [1.4.1] - 2021-03-03

### Fixed

- Fix Redis dashboard

### Removed

- Remove (QCE/REDIS_MEM) namespace

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.4.0] - 2021-03-01

### Added

- Support monitoring [TencentDB for MongoDB](https://intl.cloud.tencent.com/document/product/248/35671);
- Support monitoring [TencentDB for Redis](https://intl.cloud.tencent.com/document/product/248/39507);
- Support monitoring [Content Delivery Network (CDN)](https://intl.cloud.tencent.com/document/product/248/39554);
- Support monitoring [Bandwidth Packet](https://intl.cloud.tencent.com/document/product/248/34645);
- Support monitoring [Message Queue CKafka](https://intl.cloud.tencent.com/document/product/248/17297);
- Support monitoring [Elastic IP](https://intl.cloud.tencent.com/document/product/248/34646);
- Support monitoring [Cloud File Storage (CFS)](https://intl.cloud.tencent.com/document/product/248/34644);
- Support monitoring [Serverless Cloud Function (SCF)](https://intl.cloud.tencent.com/document/product/248/34638);
- Provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **TencentDB for MongoDB**, **TencentDB for Redis**, **Content Delivery Network**, **Message Queue CKafka**, **Elastic IP**, **Cloud File Storage** and **Serverless Cloud Function**;

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.3.1] - 2021-01-29

### Added

- Support monitoring [Cloud Load Balancer Public Network Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10997);
- Support monitoring [Cloud Load Balancer Private Network Layer-4 Protocol](https://intl.cloud.tencent.com/document/product/248/39529);
- Support monitoring [Cloud Load Balancer Layer-7 Protocol](https://intl.cloud.tencent.com/document/product/248/39530);
- Provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **Cloud Load Balancer**;


See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [1.0.0] - 2021-01-22

### 1.0.0 Feature highlights
[Tencent Cloud Monitoring](https://intl.cloud.tencent.com/) provides users with load and performance monitoring metrics of multiple cloud products such as Cloud Virtual Machine (CVM) and Cloud Databases (CDB). Users can use cloud monitoring consoles, cloud monitoring APIs, and other methods to retrieve relevant monitoring data. Tencent Cloud Monitor Grafana App is an application plugin that adapts to the open-source software Grafana. It retrieves monitoring data by calling [Tencent Cloud Monitoring API 3.0](https://intl.cloud.tencent.com/document/product/248/33873), and displays the data on a custom Dashboard.

- Support monitoring [CVM Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/6843);
- Support monitoring [TencentDB for MySQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/11006);
- Support monitoring [TencentDB for PostgreSQL Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/17945);
- Support monitoring [Private Network NAT Gateway Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10991);
- Support monitoring [Private Network Peering Connection Monitoring Metrics](https://intl.cloud.tencent.com/document/product/248/10986);
- Provides representative [Dashboard templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards) for **CVM Monitoring** and **TencentDB for MySQL Monitoring**;
- More cloud product metrics are being improved.

### Added
- Grafana plugin subscription preparation (#21), docker support for development.

### Installation
#### Prerequisites: Tencent Cloud Monitor Grafana App Plugin requires Grafana version > 6.x to run, for Grafana installation, please read [Download Grafana](https://grafana.com/grafana/download).

1. Go to the [GitHub releases](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/releases) and find the latest release.
2. Download .zip package with the plugin from release assets (asset name is tencentcloud-monitor-app-[x.x.x].zip) and unpack it into Grafana's plugins folder (`${GRAFANA_HOME}/data/plugins`), see docs [here](https://grafana.com/docs/grafana/latest/administration/configuration/#plugins) if you can't find your plugin folder.
3. Restart Grafana server.
4. Hover **Settings Icon** in the side menu and select `Plugins`. Successfully installed if the `Tencent Cloud Monitor` APP plugin is displayed in the plugin list.
5. Click `Enable` in the plugin config page.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).
