# Tencent Cloud Monitor Grafana App Contribution Guide

## Become a contributor

Thanks for your passionate for becoming one of our contributors!

You can choose the following contribution methods:

- [Contribute Dashboard Templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [Contribute your amazing code and create a Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [Report bug(s) and create an Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

We will add you into [our contributor list](#contributors)

## Local Development

1. Install [docker](https://docs.docker.com/get-docker/).

2. Fork this project to your own git account and clone:
```bash
$ git clone https://github.com/${your-git-username}/tencentcloud-monitor-grafana-app.git
```

2. Install dependencies:
```bash
$ npm install
```

3. Start development environment:
```bash
$ npm run analyze
```

4. Run in your command line:

```bash
$ docker-compose up
```
Then visit (http://localhost:3000).

5. After making some amazing changes, create a [Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls) and we will review your contribution!

## Commit Message Format

We follow [Angular Commit message guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) as shown below:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Each commit message consists of a `header`, a `body` and a `footer`. The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters!
