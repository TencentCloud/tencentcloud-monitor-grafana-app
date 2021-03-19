# 腾讯云监控插件@Grafana 开发贡献指南

## 成为贡献者

感谢您有兴趣成为 腾讯云监控插件@Grafana 社区贡献者！

您可以选择如下的贡献方式：

- [贡献 Dashboard 模板](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [贡献代码，提交 Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [反馈 bug，提交 Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

我们会将您加入 [我们的贡献者名单](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app#contributors)

## 本地开发

1. 安装 [docker](https://docs.docker.com/get-docker/)。

2. fork 此项目后克隆到本地：
```bash
$ git clone https://github.com/${your-git-username}/tencentcloud-monitor-grafana-app.git
```

2. 安装依赖：
```bash
$ npm install
```

3. 启动开发环境：
```bash
$ npm run analyze
```

4. 在命令行中运行：

```bash
$ docker-compose up
```
然后访问 (http://localhost:3000)。

5. 开发完成后通过 [Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls) 的方法提交代码请求合并。

## 提交代码规范

遵循Angular提出的Angular [提交信息规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)。

提交格式如下：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

每次提交可以包含页眉(header)、正文(body)和页脚(footer)，每次提交必须包含页眉内容

每次提交的信息不超过100个字符

