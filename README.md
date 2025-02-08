# Vue2 项目

## 🐑 分支

main------------>基于人人框架 Vue2 集成自己的管理服务并部署到云服务

luckyDev-------->从零搭建的 vue2 项目，留着纪念

test------------>vue2 的各种包和组件测试

## 🐶 环境

node 14 版本

包管理采用 npm 安装

```js
// 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
```

项目中 2 处修改代理，这段 js 中是接口请求来判断是否开启代理并且非生产,直接携带这个后缀，去本地--项目/config/index.js 里走的本地代理
部署到服务器上的生产环境或没开本地代理 就走 window.SITE_CONFIG.baseUrl 里 URL 代理路径,去本地--项目/static/config/index.js
正常本地开启代理，部署到服务器也不需要配置 Nginx

## 🐯 代码提交规范

严格按照如下规范:

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能                   |
| fix      | 修补 bug                 |
| docs     | 文档                     |
| style    | 格式方面的优化           |
| refactor | 重构                     |
| test     | 测试                     |
| chore    | 构建过程或辅助工具的变动 |

比如修复一个 bug 必须是

fix: 修复 bug
中间有:后面有空格

## ⭐️ 开发工具

推荐 VS Code 开发，配合插件如下：

| 插件名   | 功能          |
| :------- | ------------- |
| Vetur    | Vue2 语法支持 |
| Prettier | 代码格式化    |
| ESLint   | 脚本代码检查  |
| DotENV   | env 文件高亮  |

## 🚀 优势

支持 qq 登录

## 🐷 部署

采用 CDN 加速、config 文件夹和 index.html 文件放在 nginx 下,版本文件放在 CDN 加速目录即可
