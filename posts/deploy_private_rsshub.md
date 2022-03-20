---
title: "私有化部署 RSSHub 服务" 
date: "2022/03/20"
excerpt: "本文主要介绍了如何私有化部署支持无头浏览器及代理的 RSSHub 服务。"
keywords: "RSSHub,RSS,browerless"
draft: "false"
---

## 为什么要私有化部署 RSSHub 服务？

> RSSHub 是一个开源、简单易用、易于扩展的 RSS 生成器，可以给任何奇奇怪怪的内容生成 RSS 订阅源。RSSHub 借助于开源社区的力量快速发展中，目前已适配数百家网站的上千项内容

[RSSHub](https://docs.rsshub.app/) 已经适配了许多开箱即用的 RSS 源，但是对于下面这些情境，相比于使用官方或第三方提供的 RSSHub 服务，私有化部署 RSSHub 服务可能是更好的选择：

1. 源会限制频繁访问的 IP 地址

2. 源需要提供登录信息

3. 自己实现了不希望公开的源

本文的主要内容除了说明 RSSHub 官方提供的部署方法外，还添加了如何为部署的服务添加代理的相关内容。完整的服务及调用关系如下图所示。

![nodes](/images/deploy_private_rsshub/nodes.svg)

## 部署基础版本的 RSSHub

对于私有化部署，RSSHub 官方对各种不同的方式都提供了说明，本文中使用的是基于 `docker-compose` 的部署方式，如果希望以其他的形式部署，请参考[官方文档](https://docs.rsshub.app/install)。

一个完整的 RSSHub 服务主要由三个部分组成：

1. 提供 RSS 订阅的 RSSHub

2. 用于缓存内容的 Redis

3. 用于提供无头浏览器的 Browserless

执行下面的脚本进行部署：

```bash
#!/bin/bash

# 获取最新的 compose 文件
wget https://raw.githubusercontent.com/DIYgod/RSSHub/master/docker-compose.yml

# 初始化 volume
docker volume ls | grep -o "rss"
if [ ! -z $_ ]; then 
docker volume create rss_redis-data
fi

# 更新官方镜像
docker pull diygod/rsshub
# 停止运行中的容器
docker ps -a | grep -o "rsshub"
if [ !-z $_ ]; then
docker-compose down
fi
docker-compose up -d
```

如果希望对 RSSHub 进行更细致的配置，需要在 `docker-compose` 文件中设置相应的环境变量。RSSHub 中支持设置的环境变量在[官方文档](https://docs.rsshub.app/install/#pei-zhi)中有详细的说明，请按需进行配置。

## 添加代理服务

在私有部署的时候，为了访问某些源，可能需要为 RSSHub 服务配置代理，如果已经有公网可访问的代理资源，可以直接设置 RSSHub 的 `PROXY_URI`（或其他相关的变量 - `PROXY_`）通过代理访问源。

如果手头上的代理并不支持以 `http`/`https`/`socks` 的协议使用，则可以使用 [clash](https://github.com/Dreamacro/clash) 在服务器上架设代理隧道进行使用。

根据 [官方 Wiki](https://github.com/Dreamacro/clash/wiki/clash-as-a-daemon#docker) 的说明，可以使用以下 compose 文件部署一个简单的 clash 容器：

```yaml
version: '3'
services:
  clash:
    image: dreamacro/clash
    container_name: clash
    volumes:
      - ./config.yaml:/root/.config/clash/config.yaml
    ports:
      - "7890:7890"
    restart: unless-stopped
    network_mode: "bridge"
```

可以通过在 RSSHub 的 `docker-compose.yml` 文件中添加 `clash` 服务让 RSSHub 相关的服务也能使用代理隧道。

```yaml
version: "3"
services:
    rsshub:
        image: rsshub
        restart: always
        ports:
            - "1200:1200"
        environment:
            # other envs
            PROXY_URI: "http://proxy:7890" # 代理服务
            PROXY_URL_REGEX: "https?:\\/\\/(.*)(twitter|facebook|youtube|hitomi)(.*)\\.(.*)"
            # other envs
        depends_on:
            - proxy
            - browserless
            - redis
    browserless:
        image: browserless/chrome
        restart: always
        environment:
            # other envs
            DEFAULT_LAUNCH_ARGS: '["--window-size=375,820","--proxy-server=http://proxy:7890"]' # 代理服务 
            # other envs
        ulimits:
            core:
                hard: 0
                soft: 0
        depends_on:
            - proxy
    redis:
        image: redis:alpine
        restart: always
        volumes:
            - redis-data:/data
    proxy:
        image: dreamacro/clash
        restart: always
        ports:
            - "7890:7890"
        volumes:
            - ./.artifacts/proxy.yaml:/root/.config/clash/config.yaml

volumes:
    redis-data:
```

在 RSSHub 中，如果检测到了代理设置，则会覆盖 node.js 原生 http 和 https 模块的 `get` 和 `request` 方法。
覆盖后的 `get` 和 `request` 方法会根据 `PROXY_URL_REGEX` 匹配需要代理的请求，如果需要代理，则在请求时会使用由 [node-tunnel](https://github.com/koichik/node-tunnel) 实现的支持隧道代理的 Agent 进行请求。

由于 `websocket` 是基于 HTTP 协议实现的，因此如果在使用代理的同时也配置了 `PUPPETEER_WS_ENDPOINT` 环境变量，为了避免通过代理连接 `browserless` 服务，则需要配置形如 `https?:\\/\\/(.*)(twitter|facebook|youtube|hitomi)(.*)\\.(.*)` 的 `PROXY_URL_REGEX` 变量。

## 示例代码

完整的代码可以从 [github]([ezirmusitua/deploy_private_rsshub (github.com)](https://github.com/ezirmusitua/deploy_private_rsshub)) 或 [gitee](https://gitee.com/ezirmusitua/deploy_private_rsshub) 获取。

clone 代码后执行：

```bash
cd /path/to/repo
# 不指定在服务器上的位置（默认位置为 /root/rsshub)
bash .scripts/deploy.sh root@server
# 制定在服务器上的位置
bash .scripts/deploy.sh root@server path/to/rsshub
```
