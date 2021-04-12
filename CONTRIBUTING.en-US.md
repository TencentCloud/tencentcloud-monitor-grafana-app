# Tencent Cloud Monitor Grafana App Contribution Guide

## Become a contributor

Thanks for your passionate for becoming one of our contributors!

You can choose the following contribution methods:

- [Contribute Dashboard Templates](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/tree/master/src/dashboards)
- [Contribute your amazing code and create a Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls)
- [Report bug(s) and create an Issue](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/issues/new/choose)

We will add you into [our contributor list]([#contributors](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app#%E8%B4%A1%E7%8C%AE%E8%80%85-))

## Local Development

1. Environment preparation
- [Docker](https://docs.docker.com/get-docker/)
- [Magefile](https://magefile.org/) >= 1.11
- [Go](https://golang.org/dl/) >=1.16
- [Node.js](https://nodejs.org/en/download/) >= 14

2. Fork this project to your own git account and clone:
```bash
$ git clone https://github.com/${your-git-username}/tencentcloud-monitor-grafana-app.git
```

2. Install dependencies:
```bash
$ npm install
$ go mod vendor
```

3. Start frontend development environment:
```bash
$ npm run watch
```

4. Start backend development environment
```bash
$ mage -v
```

5. Run in your command line:

```bash
$ docker-compose up
```
Then visit (http://localhost:3000).

6. After making some amazing changes, create a [Pull Request](https://github.com/TencentCloud/tencentcloud-monitor-grafana-app/pulls) and we will review your contribution!

## Commit Message Format

We follow [Converntional Commit message guidelines](https://conventionalcommits.org/) as shown below:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Each commit message consists of a `header`, a `body` and a `footer`. The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters!

`type` can be one of the followings:

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
