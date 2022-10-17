# TencentCloud Monitor Grafana App---

## [2.7.5] - 2022-10-17
### Modify
- 更新CYNOSDB_MYSQL地域接口

### Added
- 增加CYNOSDB_MYSQL预设面板
- 增加timeshift对比功能

---

## [2.7.4] - 2022-09-20
### Fixed
- adaptation CDB and CYNOSDB_MYSQL when has no cache

### Modify
- 优化log场景下的tag字段展示
- cls 支持告警功能

---

## [2.7.3] - 2022-08-27
### Fixed

- bufix。

---

## [2.7.1] - 2022-07-27
### Added

- 增加英文版支持，可在创建数据源中切换。

### Modify

- 其他已知问题bug修复。

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.7.0] - 2022-06-07
### Modify

- 增加云监控-性能监控RUM产品。
- GPU维度组合问题修复。
- 全球应用加速产品名称修改。

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.6.4] - 2022-05-11
### Modify

- 模板变量query中payload支持引入其他模板变量。

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.6.3] - 2022-04-08
### Fixed

- Redis 支持节点和proxy维度 (#114)
- CLB 的 vip 支持 ipv6 (#114)
- 模板变量填写提示气泡，链接到 https://cloud.tencent.com/document/product/248/54510。(#114)
- 插件端支持内网 API 设置 (#114)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.6.2] - 2022-03-31
### Fixed

- README 更新 CLS 文档 (#111)
- CLS 检索语句输入框样式优化 (#112)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.6.1] - 2022-03-15
### Fixed

- CLS 检索条件变量替换优化, 预设模板使用云监控变量 (#109)
- API 网关 代理路由匹配问题修复 (#109)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.6.0] - 2022-03-04
### Added

- CLS 日志主题ID (TopicId) 支持下拉选择 (#103)
- lucene 支持多 options 变量值 (#103)
- CLB 支持后台服务器维度和后台服务器端口维度 (#107)
- 云监控接入 CLS (#107)

### Fixed

- 修复 Explorer 下 onBlur 反复执行问题 (#103)
- Bump up dependencies version to fix critical vulnerabilities. (#104)
- ckafka 中 grpu 和 topic 之间联动处理 (#107)
- CDB 检查指标有效性需兼容 `InstanceId` 和 `InstanceType` (#107)
- tdsql用新的接口获取地域信息, 查看[文档](https://cloud.tencent.com/document/product/557/16141) (#107)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.5.0] - 2022-02-15

### Added

插件新增 [日志服务](https://cloud.tencent.com/document/product/614) 数据源，[旧版本数据源](https://github.com/TencentCloud/cls-grafana-datasource/blob/master/README.md) 后续将不再维护。

- 数据源设置页面新增`日志服务`数据源开关，支持与`云监控数据源`同时使用。
- 日志服务支持同时查询不同日志主题ID的数据内容。
- 日志检索分析
   - 检索：用户可通过输入 lucene 语句，查询符合条件的日志内容。相关检索语法与样例见文档 [日志检索](https://cloud.tencent.com/document/product/614/47044) 。
   - 分析：使用日志服务提供的 SQL 统计能力，可将采集的日志进行数据分析并以图表的形式展示分析结果。相关分析语法与样例见文档 [日志分析](https://cloud.tencent.com/document/product/614/44061) 。
   - 分析场景无需输入字段使用定位，根据查询结果的数据类型进行自动推断。

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md) and [日志服务.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/日志服务.md).

---

## [2.4.1] - 2022-01-04

### Added
- Support `nodeIp` template variable and legend display for MapReduce HDFS. (#84)(#85)

### Fixed
- No data if listener not selected on `CLB`. (#83)(#85)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [2.4.0] - 2021-12-01

### Added
- Support Intranet cloud API & service roles (#78)
- Example dashboard support datasource variable (#79)

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---


## [2.3.0] - 2021-11-15

### Added
- Optimized CLB dashboard and namespace. (#76)

### Fixed
- Monitor COS with HTTP. (#73)
- Redirect README links to the official site. (#74)


See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [2.2.2] - 2021-08-27

### Fixed
- Legend name display optimization, support multi-level display.
- Support `topicId` template variable in CKafka monitoring.
- Support select instance through `As WanIp` in Redis monitoring.
- Support template variable `fleet` and `queue` in Game Server Elastic-scaling monitoring, `InstanceAlias` support `PrivateIpAddress` and `IpAddress`.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [2.2.1] - 2021-07-13

### Fixed
- Missing dimensions in lbPrivate.
- Missing metrics `BaseCpuUsage`, `CvmDiskUsage` for CVM monitoring.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [2.2.0] - 2021-06-28

### Added
- Support Monitoring [TencentDB for Redis (Memory Edition, 5-Second)](https://intl.cloud.tencent.com/document/product/248/39507)
- Support Monitoring [Game Server Elastic-scaling](https://intl.cloud.tencent.com/document/product/1055/37120)

### Fixed
- The caching method of the instance list is optimized from *localStorage* to *IndexedDB*.
- Support `listenerAlias` in CLB template variable configuration (#64).
- The CVM regional interface is replaced with api.tencentcloudapi.com.
- Change dimension `instanceId` to `InstanceId` for DCDB monitoring.

### Removed
- Removed [Web Application Firewall](https://cloud.tencent.com/document/product/248/48124) since regional interface is not supported.

See detailed guide in [README.md](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/blob/master/README.md).

---

## [2.1.0] - 2021-05-01

### Added

- Support Monitoring [TDSQL for MySQL](https://intl.cloud.tencent.com/document/product/248/40012)
- Support Monitoring [Private Network VPN Gateway](https://intl.cloud.tencent.com/document/product/248/10988)
- Support Monitoring [Private Network Anycast EIP](https://intl.cloud.tencent.com/document/product/248/39552)
- Support Monitoring [Private Network Network Detection](https://intl.cloud.tencent.com/document/product/248/39557)
- Support Monitoring [Private Network Cloud Connect Network](https://intl.cloud.tencent.com/document/product/248/10987)
- Support Monitoring [Tencent Distributed Message Queue](https://cloud.tencent.com/document/product/248/51450)
- Support Monitoring [Cloud Physical Machine 1.0](https://cloud.tencent.com/document/product/248/45881)
- Support Monitoring [CPM Peering Connection](https://cloud.tencent.com/document/product/248/45884)
- Support Monitoring [CPM Load Balancer Public Network](https://cloud.tencent.com/document/product/248/45886)
- Support Monitoring [CPM Load Balancer Private Network](https://cloud.tencent.com/document/product/248/45885)
- Support Monitoring [Elastic MapReduce(HDFS)](https://cloud.tencent.com/document/product/248/44797)
- Support Monitoring [Elastic MapReduce(HBASE)](https://cloud.tencent.com/document/product/248/45567)
- Support Monitoring [Elastic MapReduce(HIVE)](https://cloud.tencent.com/document/product/248/45569)
- Support Monitoring [Elastic MapReduce(NODE)](https://cloud.tencent.com/document/product/248/45570)
- Support Monitoring [Elastic MapReduce(PRESTO)](https://cloud.tencent.com/document/product/248/45571)
- Support Monitoring [Elastic MapReduce(SPARK)](https://cloud.tencent.com/document/product/248/45572)
- Support Monitoring [Elastic MapReduce(YARN)](https://cloud.tencent.com/document/product/248/45573)
- Support Monitoring [Elastic MapReduce(ZOOKEEPER)](https://cloud.tencent.com/document/product/248/45574)
- Support Monitoring [Edge Computing Machine Compute Monitor](https://cloud.tencent.com/document/product/248/45124)
- Support Monitoring [Edge Computing Machine Block Storage](https://cloud.tencent.com/document/product/248/45123)
- Support Monitoring [Edge Computing Machine Load Balancer](https://cloud.tencent.com/document/product/248/54253)
- Support Monitoring [Web Application Firewall](https://cloud.tencent.com/document/product/248/48124)
- Support Monitoring [Cloud Object Storage](https://cloud.tencent.com/document/product/248/45140)
- Support Monitoring [Global Application Acceleration Platform](https://cloud.tencent.com/document/product/248/45062)
- Namespace dropdown multi-level classification
- Allow `payload` param in template variable. (Advanced function)

### Fixed

- Import preset dashboard templates under "Tencent Cloud Monitor" folder.
- Change CVM template variable value from `PublicIp` to `InstanceId`.
- Known bugs when setting template variable refresh method to `never`.
- `percent` unit in preset dashboard templates.
- `InstanceAlias` display issue on when hovering the graph and in the legend.

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
