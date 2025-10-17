# datasink-portal

轻量数据看板门户，用于展示网站访问统计（PV/UV 趋势与浏览页面 Top10）。项目基于 Vue 3 + Vite + TypeScript + Chart.js。

## 特性
- PV/UV 折线图：支持最近 24 小时与最近 30 天。
- 浏览页面 Top10：按 PV 排序，支持点击跳转。
- 统一数据代理：通过 `/api/datasink/analysis` 访问后端分析接口。

## 技术栈
- 前端：Vue 3、Vite、TypeScript
- 图表：Chart.js
- 样式：原生 CSS

## 快速开始
- 环境要求：Node.js 18+，推荐使用 `pnpm`
- 安装依赖：`pnpm install`
- 本地开发：`pnpm dev`（默认访问 `http://localhost:5173/`）
- 构建产物：`pnpm build`（输出至 `dist/`）
- 预览构建结果：`pnpm preview`
- 压缩打包：`pnpm zip`

## 配置说明
- API 代理：`vite.config.ts` 中将 `^/api/*` 代理到 `https://www.gausszhou.top/api`，并移除 `/api` 前缀。
- 数据基础路径：`/api/datasink/analysis`
- 主要接口（示例）：
  - `GET /pvuv?date_level=hour|day&end_time=<timestamp>`
  - `GET /top-pages?end_time=<timestamp>`

## 备注
- 代码已组件化（图表与榜单为独立 Vue 组件）。
- 如需加载态/错误态或更细分的构建拆包，可按需扩展。
- 本项目暂未附带开源许可证。
