# datasink-portal

轻量数据看板门户，用于展示网站访问统计与页面榜单。项目基于 Vue 3 + Vite + TypeScript，使用原生样式与简洁组件实现。

## 特性
- 指标概览：展示浏览次数、浏览人数、会话次数（来自 `metrics` 接口）。
- 浏览页面 Top10：按 PV 排序，条形比例背景清晰对比，支持点击跳转。
- 统一 API 代理：通过 `vite` 代理将 `/api/datasink/analysis` 路由到后端分析服务。

## 技术栈
- 前端：`Vue 3`、`Vite`、`TypeScript`
- 样式：`SCSS`（组件内使用 `lang="scss"`）

## 目录结构
```
├── index.html                # 应用入口模板
├── src/
│   ├── main.ts               # Vue 入口
│   ├── App.vue               # 页面布局与网格容器
│   ├── components/
│   │   ├── Metrics.vue       # 指标概览组件
│   │   └── TopPages.vue      # 页面 Top10 组件
│   ├── api/services/
│   │   └── analysis.ts       # 分析服务 API 封装
│   └── models/index.ts       # 指标模型与帮助函数
├── vite.config.ts            # 构建与开发服务器配置（含代理与别名）
├── scripts/archive.js       # 打包产物压缩为 zip
└── shells/build.sh           # CI/本地构建与压缩脚本
```

## 快速开始
- 环境要求：`Node.js 18+`，推荐使用 `pnpm`
- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`（默认访问 `http://localhost:5173/`）
- 构建产物：`pnpm build`（输出至 `dist/`）
- 预览构建结果：`pnpm preview`
- 压缩打包：`pnpm zip`
