---
title: 'browse: 使用浏览器查看动态 webp 图片'
date: '2022/03/12'
excerpt: '由于 MacOS 下的 preview 工具无法查看动态 webp 图片, 因此使用 Node.js 实现使用浏览器查看图片的工具.'
cover_image: 'https://images.unsplash.com/photo-1581273154768-0a9a16887d2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3312&q=80'
keywords: 'animated webp,pkg,MacOS,Node.js'
---

由于 MacOS 下的 preview 无法查看动态 webp 文件, 因此开发了 [browse](https://github.com/ezirmusitua/browse), 借助浏览器浏览这类文件.

## 基本功能

这个工具的核心目标是实现图片浏览, 第一版本实现了以下功能:

1. 在浏览器中查看特定文件夹中的图片(按文件名称升序排列);

2. 使用 `左方向键` 和 `右方向键` 切换图片;

3. 使用侧边导航栏跳转到特定图片.

## 开发思路

基本思路是实现一个 B/S 架构的应用, 接收目标文件夹路径并读取其中的文件信息后构建基本浏览器界面, 启动一个简易的 HTTP 服务器用于 host 静态内容(基本界面和图片).

<a target="_blank" href="/images/project_browse_notes/modeling.svg" style="width: 100%;">
<img alt="C4 Modeling" src="/images/project_browse_notes/modeling.svg" style="object-fit: contain; object-position: center">
</a>

## 基本流程

1. 读取用户指定路径

2. 检查路径并读取图片基本信息

3. 基于图片基本信息构建界面 html

4. 使用 [http](https://nodejs.org/en/knowledge/HTTP/servers/how-to-serve-static-files/) 模块实现一个简易的文件服务器用于 host 界面 html 和图片

## 编译

1. 按需安装 Node.js

2. 安装依赖: `yarn` 或 `npm install`

3. 使用 [pkg](https://github.com/vercel/pkg) 打包可执行文件: `yarn build` 或 `npm run build`

## 使用

1. (可选)创建软连接: `ln -sf /path/to/project/build/browse /usr/local/bin`

2. 在 shell 中打开目标文件夹: `browse /absolute/path/to/directory`

## 改进思路

- 打开嵌套的文件夹

- 自动在浏览器中打开页面

- 使用右键打开

- 添加 gallery 模式

- 优化样式

- 添加放大/缩小快捷键

- 添加放大/缩小控件

- 添加旋转图片快捷键

- 添加旋转图片控件

- 添加自动播放快捷键

- 添加自动播放控件

- 缓存文件 metadata

- 提高安全性