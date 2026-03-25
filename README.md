# JobPing AI - AI招聘打招呼与简历优化工具

一个从 0 到 1 的全栈 Web 应用：输入岗位 JD 与简历，一键生成招聘平台打招呼话术、简历优化建议、优化版简历，并支持导出、分享、版本管理。

## 技术栈

- 前端：Next.js (App Router) + TypeScript + TailwindCSS
- 后端：Node.js + Express + REST API
- AI：DeepSeek API（用户前端输入 API Key）
- 存储：SQLite（保存简历版本与分享链接）
- 导出：puppeteer（PDF）+ html-to-image（PNG）
- 安全：API Key 前端使用 `crypto-js` AES 加密后存储在 LocalStorage，不落库不上传持久化

## 目录结构

```text
frontend/
  app/
  pages/
  components/
  utils/
backend/
  routes/
  services/
```

## 功能清单

1. 打招呼生成（3-5 条，不同风格，卡片+复制）
2. 简历优化建议（before/after/reason JSON）
3. 优化版简历生成（可编辑）
4. 实时简历预览（Notion 风格轻量编辑）
5. 导出 PDF 与图片
6. 分享链接（唯一 URL，不包含 API Key）
7. 版本管理（时间线，点击切换）
8. API Key 前端 AES 管理

## 环境要求

- Node.js 18+
- npm 9+

## 快速启动

### 1) 启动后端

```bash
cd backend
npm install
npm run dev
```

后端默认地址：`http://localhost:4000`

### 2) 启动前端

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

前端默认地址：`http://localhost:3000`

### 3) 打开系统

访问 `http://localhost:3000`。

## 前端环境变量

`frontend/.env.example`：

```env
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

## API 概览

- `POST /api/analyze`：输入 JD/简历/API Key，返回打招呼、建议、优化简历并保存版本
- `GET /api/versions`：获取版本时间线
- `GET /api/versions/:id`：获取版本详情
- `POST /api/share`：生成分享 token
- `GET /api/share/:token`：访问分享内容
- `POST /api/export/pdf`：传入 html，导出 PDF

## 注意事项

- DeepSeek API Key 只由浏览器在调用时传给后端进行当次请求，不保存到服务器数据库。
- SQLite 数据文件在 `backend/data/jobping.db`。
- 若在 Linux server 无沙箱环境运行 puppeteer，请保留 `--no-sandbox` 启动参数。
