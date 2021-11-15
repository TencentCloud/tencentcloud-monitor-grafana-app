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


# 简介

[腾讯云监控](https://cloud.tencent.com/product/cm) 为用户提供云服务器、云数据库等多个云产品的负载和性能监控指标，用户可以使用云监控控制台、云监控 API 等方式获取相关监控数据。腾讯云监控应用插件 Tencent Cloud Monitor App，是一款适配开源软件 Grafana 的应用插件，通过调用 [腾讯云监控 API 3.0](https://cloud.tencent.com/document/product/248/30342) 的方式获取监控数据，并对数据进行自定义 Dashboard 展示。

该插件提供了云服务器、云数据库 MySQL、负载均衡 等具有代表性的 [Dashboard 预设模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)

支持的云产品监控及文档请参见[文档](https://cloud.tencent.com/document/product/248/54505)，更多云产品的监控指标数据源在陆续完善中。

# 入门指南

使用 Grafana CLI 安装：

```bash
$ grafana-cli plugins install tencentcloud-monitor-app
```

更多安装方式与入门指南请参见[文档](https://cloud.tencent.com/document/product/248/54506)。

# 模板变量

模板变量 [Variables](https://grafana.com/docs/reference/templating/) 是 Grafana 提供的一种 Dashboard 优化特性，用于创建高度可复用和交互式 Dashboard。模板变量的一般思想是允许 Grafana 从数据源获得不同的度量，并提供一种无需修改仪表板就可以动态更改它的方法。腾讯云监控应用目前提供了地域、云服务器实例、云数据库 MySQL 实例 等变量。

详细文档与示例请参见[文档](https://cloud.tencent.com/document/product/248/54510)。

# FAQs

常见问题请参见 [FAQ](https://cloud.tencent.com/document/product/248/55171)。

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
    <td align="center"><a href="https://github.com/TomatoAres"><img src="https://avatars.githubusercontent.com/u/34213033?v=4?s=70" width="70px;" alt=""/><br /><sub><b>TomatoAres</b></sub></a><br /><a href="https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls?q=author%3ATomatoAres">🐛</a></td>
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
