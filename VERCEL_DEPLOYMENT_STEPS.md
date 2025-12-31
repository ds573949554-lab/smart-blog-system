# 🚀 Vercel 部署步骤

## ✅ 已完成
- ✓ GitHub 仓库已创建
- ✓ 代码已推送到 GitHub
- ✓ 仓库地址: https://github.com/ds573949554-lab/smart-blog-system

---

## 📋 Vercel 部署流程（浏览器已打开）

### 步骤1: 登录 Vercel

1. **使用 GitHub 登录**
   - 点击 "Continue with GitHub" 按钮
   - 授权 Vercel 访问你的 GitHub 账号

### 步骤2: 导入项目

1. **选择仓库**
   - 在导入页面搜索：`smart-blog-system`
   - 点击 "Import" 按钮

2. **配置项目**
   - Project Name: `smart-blog-system` (保持默认)
   - Framework Preset: Next.js (自动检测)
   - Root Directory: `./` (保持默认)
   - Build Command: `npm run build` (保持默认)
   - Output Directory: `.next` (保持默认)

### 步骤3: 配置环境变量 ⚠️ 重要

点击 "Environment Variables" 展开，添加：

| Key | Value | 说明 |
|-----|-------|------|
| `DATABASE_URL` | 你的数据库连接字符串 | 必须配置 |

**数据库选项：**

#### 选项A: Vercel Postgres (最简单)
```
1. 在 Vercel 项目页面点击 "Storage"
2. 选择 "Create Database" → "Postgres"
3. 自动生成连接字符串并注入到环境变量
```

#### 选项B: Neon (免费 PostgreSQL)
```
1. 访问: https://neon.tech
2. 使用 GitHub 登录
3. 创建新项目
4. 复制连接字符串（格式如下）：
   postgresql://user:pass@ep-xxx-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require
```

#### 选项C: Supabase (免费 PostgreSQL)
```
1. 访问: https://supabase.com
2. 创建新项目
3. 在 Project Settings → Database 中找到连接字符串
4. 格式：postgresql://postgres:[密码]@db.xxx.supabase.co:5432/postgres
```

### 步骤4: 部署

1. **点击 "Deploy" 按钮**
   - Vercel 开始构建和部署
   - 通常需要 2-3 分钟

2. **等待部署完成**
   - 看到 "🎉 Congratulations" 表示成功
   - 你会获得一个部署 URL：`https://smart-blog-system-xxxx.vercel.app`

### 步骤5: 初始化数据库

部署完成后，需要运行数据库迁移：

```bash
# 在本地终端运行（使用生产数据库）
DATABASE_URL="你的生产数据库URL" npx prisma db push
DATABASE_URL="你的生产数据库URL" npx prisma db seed
```

或者在 Vercel Dashboard：
```
1. 进入项目 → Settings → Functions
2. 添加一个 Serverless Function 运行迁移
```

---

## ✨ 部署完成后

你将获得：
- 🌐 全球 CDN 加速的生产 URL
- 🔒 自动 HTTPS 证书
- 🔄 每次推送到 main 分支自动部署
- 📊 访问统计和日志
- 💾 自动备份

---

## 🎯 访问你的博客

部署完成后访问你的 URL：
```
https://smart-blog-system-xxxx.vercel.app
```

主要页面：
- 首页：`/` - 博客文章列表
- 文章详情：`/posts/[slug]` - 查看文章
- 新建文章：`/posts/new` - 创建文章（需要在代码中添加此页面）

---

## 🐛 故障排除

### 问题1: 构建失败
- 检查 Build Logs 找到具体错误
- 确保 `package.json` 中的依赖完整
- 确认 Node.js 版本 ≥ 20

### 问题2: 运行时错误
- 检查环境变量是否正确配置
- 确保 DATABASE_URL 格式正确
- 查看 Runtime Logs

### 问题3: 数据库连接失败
- 确认数据库 URL 包含 `?sslmode=require` (Neon/Supabase)
- 检查数据库服务是否在线
- 验证连接字符串中的密码正确

---

## 📚 相关文档

- [Vercel 文档](https://vercel.com/docs)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Prisma 生产最佳实践](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

---

🤖 Generated with Claude Code

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
