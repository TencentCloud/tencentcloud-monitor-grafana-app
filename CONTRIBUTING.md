# 腾讯云监控插件@Grafana 开发贡献指南

## 成为贡献者

感谢您有兴趣成为 腾讯云监控插件@Grafana 社区贡献者！

您可以选择如下的贡献方式：

- [贡献 Dashboard 模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [贡献代码，提交 Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [反馈 bug，提交 Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

我们会将您加入 [我们的贡献者名单](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app#%E8%B4%A1%E7%8C%AE%E8%80%85-)

## 本地开发

1. 环境准备
- [Docker](https://docs.docker.com/get-docker/)
- [Magefile](https://magefile.org/) >= 1.11
- [Go](https://golang.org/dl/) >=1.16
- [Node.js](https://nodejs.org/en/download/) >= 14

2. Fork 此项目后克隆到本地：
```bash
$ git clone https://github.com/${your-git-username}/tencentcloud-monitor-grafana-app.git
```

2. 安装依赖：
```bash
$ npm install
$ go mod vendor
```

3. 启动前端开发环境：
```bash
$ npm run watch
```

4. 启动后端开发环境：
```bash
$ mage -v
```

5. 在命令行中运行：

```bash
$ docker-compose up
```
然后访问 (http://localhost:3000)。

6. 开发完成后通过 [Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls) 的方法提交代码请求合并。

## 提交代码规范

遵循 Converntional [提交信息规范](https://conventionalcommits.org/)。

提交格式如下：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

每次提交可以包含页眉(header)、正文(body)和页脚(footer)，每次提交必须包含页眉内容

每次提交的信息不超过100个字符

`type` 可为如下选择之一：

- build
- ci
- chore
- docs
- feat
- fix
- perf
- refactor
- revert
- style
- test
