# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SnappRice (snapprice.co) — 跨平台比价引擎。用户输入商品名或上传图片，对比 Amazon / Walmart / eBay / Best Buy / Target 等平台价格。

## Tech Stack

- **前端**: Vanilla HTML + CSS + JavaScript（无框架）
- **后端**: Cloudflare Pages Functions (Workers runtime)
- **部署**: Cloudflare Pages（GitHub Actions 自动部署，**不是 Vercel**）
- **KV 存储**: Cloudflare KV（用户数据、Session）
- **AI 识别**: Claude API / GPT-4o Vision（待接入）
- **比价数据**: SerpAPI（`/api/search` 代理）
- **联盟**: Amazon Associates（`snapprice04-20`）

## Architecture

### 前端 (`index.html` + `src/`)
- 单页应用，所有逻辑在 `src/js/main.js`（~1270 行）
- 搜索 → 调用 `/api/search`（SerpAPI），失败则回退到 mock 数据
- 图片搜索：拍照/相册/拖拽上传（最多 6 张），base64 data URL
- Mock 数据定义了 8 个产品 + 60 个爆款商品，无 API 时自动降级
- 语音搜索、搜索历史（localStorage）、收藏/降价提醒（KV）
- Chart.js 价格走势图
- 响应式 CSS，适配移动端

### 后端 (Cloudflare Pages Functions, `functions/api/`)
- `_middleware.js` — 全站密码保护（硬编码 `124124`，Cookie 有效期 1 天），跳转 `/api/` 和 `/src/` 绕过
- `search.js` — SerpAPI 代理（`google_shopping` 引擎），注意 BOM 字符兼容（PowerShell 管道问题）
- `img.js` — 图片代理（解决 HTTPS 图片跨域 CORS 问题）
- `register.js` / `login.js` — PBKDF2 密码哈希（10 万次迭代），Session 存入 KV（7 天过期）
- `session.js` — 验证 Session 有效性
- `logout.js` — 删除 Session
- `userdata.js` — 读写用户收藏/降价提醒 (`userdata:{email}`)
- `auth/google.js` / `auth/google/callback.js` — Google OAuth 登录

### 数据流（搜索架构）
```
用户搜索 → Promise.all([/api/search, /api/ebay])
  ├─ /api/search (SerpAPI) → Amazon / Walmart / Best Buy / Target + 其他
  │   └─ 过滤掉 eBay（由 eBay API 处理，避免重复 + 节省 SerpAPI 额度）
  ├─ /api/ebay (eBay Browse API) → eBay 真实商品数据
  │   └─ 5000次/天免费，链接带 ePN campid=5339155328
  ├─ 两者都成功 → 合并渲染
  ├─ 任一个失败 → 只显示成功的那个
  └─ 全部失败 → 匹配 MOCK_PRODUCTS → 渲染 mock

未来计划：平台自有API优先，剩余走SerpAPI
  - ✅ eBay → eBay Browse API（已完成）
  - ⏳ Amazon → Amazon API（待接入）
  - ⏳ Walmart / Best Buy / Target → 待申请联盟API或继续走SerpAPI
```

### 用户系统
- 邮箱 + 密码注册（PBKDF2 哈希）
- Google OAuth
- Session 存在 `sessionStorage` + 服务端 KV（7 天 TTL）
- 记住密码/自动登录存在 `localStorage`（base64 编码）

### KV 命名空间
- `user:{email}` — 用户密码哈希 / Google ID
- `session:{token}` — 登录会话（7 天 TTL）
- `userdata:{email}` — 收藏 + 降价提醒数据

## Commands

```bash
# 本地开发（Wrangler + KV）
wrangler pages dev . --kv USERS

# 查看部署列表
wrangler pages deployment list --project-name snapprice

# wrangler 已全局安装，直接 wrangler 不用 npx（npx 每次检查更新慢 3-5 秒）
```

## 部署工作流

```bash
# GitHub 推送 → Cloudflare 自动部署（无需手动 wrangler pages deploy）
git add .
git commit -m "改了什么东西"
git push origin master
# 等待 1-2 分钟，Cloudflare Pages 自动构建部署
```

### 远程仓库
- **GitHub** (origin)：`git push origin master`（SSH 免密，推送 → 自动部署到 Cloudflare Pages）
- **Gitee** (gitee)：`git push gitee master`（HTTPS，仅代码备份）
- 两个远程并存，分别推送

## 工作规则

1. **启动时先了解项目**: 每次进入项目时，先读取 CLAUDE.md 和关键文件（`index.html`、`src/js/main.js`、`functions/`），确认当前项目状态后再开始工作。不跳过此步骤。
2. **直接执行**: 收到明确指令后直接执行，不再确认。
3. **Mock 优先**: 新功能先加 mock 数据兜底，确保无 API 时也能演示。
4. **改后必检 + 自动部署**: 任何修改完成后必须：
   - a. 逐行审查所有改动，确认代码正确、无语法错误
   - b. 检查改动是否与已有功能冲突或产生副作用（包括 mock 数据、API 路由、前端渲染逻辑、用户系统等）
   - c. 确认无问题后运行 `git add . && git commit -m "描述改动"`，然后 `git push origin master` 推送到 GitHub
   - d. Cloudflare Pages 会基于 GitHub 推送自动构建部署（约 1-2 分钟），无需手动 wrangler pages deploy
   - e. 如部署失败，分析原因并修复后重新推送，直至成功

5. **老外优先**: 比价网面向海外用户（欧美），所有设计、审美、交互、文案必须符合老外习惯。如果用户指令不符合老外习惯，必须用"这不符合老外审美或习惯"提醒。

6. **code-review 节点**: 以下情况修改后执行 `/code-review`（内置 skill，直接使用）：
   - 改动 `functions/api/*`（后端 API 逻辑、鉴权、KV 读写）
   - 改动 `src/js/main.js`（前端状态管理、搜索渲染、数据降级路径）
   - 可指定 effort 级别：`/code-review high`（深入检查）或 `/code-review low`（快速扫描）
   - 普通 CSS 调整、HTML 结构变动不需要跑

7. **language: zh-CN**: 与我交流始终使用中文。
8. **feedback: false**: 不要发送反馈或满意度调查。

## Key Patterns & Gotchas

1. **Mock 数据兜底**: 所有功能先用 mock 实现（`MOCK_PRODUCTS`、`POPULAR_POOL`、`MOCK_COUPONS`），API 不通时自动降级。新功能也应遵循此模式。

2. **SerpAPI BOM 处理**: `search.js:15-16` 有 `charCodeAt(0) === 0xFEFF` 的 BOM 剥离逻辑，因为 PowerShell 管道会注入 BOM。

3. **密码保护**: `_middleware.js` 硬编码密码 `124124`，所有非 API/静态资源请求需要 `site_pw` Cookie。

4. **图片代理**: 所有商品图片经 `/api/img?url=` 代理，解决跨域问题。`proxyImg()` 函数在 JS 中统一处理。

5. **定价货币**: 所有价格单位为 USD。Amazon 链接带 Amazon Associates tag `snapprice04-20`。

6. **搜索匹配**: `findProduct()` 支持中英文多语言关键字匹配（`LANG_KEYWORDS` 字典）。

7. **环境变量**: 
   - `SEARCH_ENGINE` — 搜索引擎（当前使用 `serper`，可选 `serpapi` / `valueserp`）
   - `SERPAPI_KEY` — SerpAPI 密钥（`SEARCH_ENGINE=serpapi` 时必填）
   - `VALUESERP_KEY` — ValueSERP 密钥（`SEARCH_ENGINE=valueserp` 时必填）
   - `SERPER_KEY` — Serper 密钥（当前搜索引擎，`SEARCH_ENGINE=serper` 时必填，https://serper.dev）
   - `ASA_KEY` — Amazon Scraper API 密钥（`/api/amazon` 用，https://amazonscraperapi.com）
   - `EBAY_APP_ID` / `EBAY_CERT_ID` — eBay Browse API OAuth 凭证（已配置）
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`（可选，OAuth）。

8. **价格历史**: 目前是模拟数据（`generatePriceHistory()` 基于随机游走），待接真实数据源。
