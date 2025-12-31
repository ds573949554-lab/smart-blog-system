# Smart Blog System - 部署指南

## 快速部署到 Vercel

### 1. 准备工作

确保你已经：
- 安装了 Git
- 有 GitHub 账号
- 有 Vercel 账号（可以用 GitHub 登录）

### 2. 推送到 GitHub

```bash
# 创建 GitHub 仓库（在 GitHub 网站上创建）
# 然后添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/smart-blog-system.git
git push -u origin main
```

### 3. 部署到 Vercel

1. 访问 https://vercel.com
2. 点击 "Import Project"
3. 选择你的 GitHub 仓库
4. 配置环境变量（如果需要）
5. 点击 "Deploy"

### 4. 环境变量设置

在 Vercel 项目设置中添加以下环境变量：

```
DATABASE_URL=file:./dev.db
NEXTAUTH_SECRET=your-secret-key-change-in-production
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

注意：生产环境建议使用真实的 PostgreSQL 数据库而不是 SQLite。

## 本地开发

```bash
# 安装依赖
npm install

# 生成 Prisma 客户端
npm run db:generate

# 推送数据库 schema
npm run db:push

# 添加种子数据
npm run db:seed

# 启动开发服务器
npm run dev
```

## 构建生产版本

```bash
npm run build
npm start
```

## 数据库迁移到 PostgreSQL

对于生产环境，建议使用 PostgreSQL：

1. 修改 `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. 更新环境变量：

```
DATABASE_URL="postgresql://user:password@host:5432/database"
```

3. 运行迁移：

```bash
npm run db:push
npm run db:seed
```

## 性能优化建议

- 使用 Vercel Analytics
- 启用图片优化
- 配置 CDN
- 使用 Redis 缓存
- 启用数据库连接池

## 监控和日志

- Vercel 自带日志和分析
- 可以集成 Sentry 进行错误追踪
- 使用 Vercel Insights 查看性能指标

## 自定义域名

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的域名
4. 按照指引配置 DNS

## 安全建议

- 生产环境使用强密码
- 启用 HTTPS（Vercel 默认启用）
- 配置 CORS 策略
- 定期更新依赖
- 使用环境变量存储敏感信息

