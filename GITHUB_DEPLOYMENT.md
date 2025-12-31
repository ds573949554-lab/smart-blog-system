# GitHub + Vercel 部署指南

## 📋 前置条件

- ✅ GitHub 账号
- ✅ Vercel 账号（可以用 GitHub 登录）
- ✅ 项目代码已完成

---

## 第一步：创建 GitHub 仓库

### 方法1: 通过 GitHub 网页创建（推荐）

1. **访问 GitHub**
   - 打开 https://github.com
   - 点击右上角 "+" → "New repository"

2. **配置仓库**
   ```
   Repository name: smart-blog-system
   Description: 基于 Next.js 15 + tRPC + Prisma 的现代化全栈博客系统
   Public/Private: 选择 Public（公开）或 Private（私有）
   
   ⚠️ 不要勾选：
   - Add a README file
   - Add .gitignore
   - Choose a license
   ```

3. **创建完成后**
   - GitHub 会显示快速设置指令
   - 复制 "...or push an existing repository" 部分的命令

---

## 第二步：推送代码到 GitHub

在项目目录执行以下命令：

```bash
# 1. 添加远程仓库（替换成你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/smart-blog-system.git

# 2. 推送代码
git push -u origin main
```

**如果推送失败（需要认证）**：

### 使用 Personal Access Token (推荐)

1. 在 GitHub 创建 Token：
   - Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token (classic)
   - 勾选 `repo` 权限
   - 复制生成的 token

2. 推送时使用 token：
   ```bash
   git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/smart-blog-system.git
   git push -u origin main
   ```

---

## 第三步：连接 Vercel

### 1. 登录 Vercel

- 访问 https://vercel.com
- 点击 "Continue with GitHub"
- 授权 Vercel 访问你的 GitHub

### 2. 导入项目

1. 在 Vercel Dashboard 点击 "Add New..." → "Project"
2. 找到 `smart-blog-system` 仓库
3. 点击 "Import"

### 3. 配置项目

Vercel 会自动检测 Next.js 项目，使用默认配置：

```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**⚠️ 重要：配置环境变量**

在 "Environment Variables" 部分添加：

```
DATABASE_URL = postgresql://user:password@host/database
```

**获取免费 PostgreSQL 数据库：**

推荐使用 Vercel Postgres（免费套餐）：
1. 在 Vercel 项目页面
2. Storage → Create Database → Postgres
3. 复制连接字符串到 `DATABASE_URL`

或使用其他服务：
- Neon (https://neon.tech) - 免费 PostgreSQL
- Supabase (https://supabase.com) - 免费 PostgreSQL
- Railway (https://railway.app) - 免费额度

### 4. 部署

点击 "Deploy" 按钮，Vercel 会：

1. ✅ 克隆代码
2. ✅ 安装依赖
3. ✅ 运行构建
4. ✅ 部署到生产环境

**首次部署可能需要 2-3 分钟**

---

## 第四步：配置生产数据库

部署成功后，需要初始化数据库：

### 方法1: 使用 Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 链接项目
vercel link

# 运行数据库迁移
vercel env pull .env.production
npx prisma db push --schema=./prisma/schema.prisma
npx prisma db seed
```

### 方法2: 使用 Prisma Studio

```bash
# 设置生产数据库 URL
export DATABASE_URL="your-production-database-url"

# 推送数据库模式
npx prisma db push

# 填充示例数据
npx prisma db seed
```

---

## 第五步：验证部署

1. **访问网站**
   - Vercel 会提供一个 URL，类似：
   - `https://smart-blog-system-xxx.vercel.app`

2. **检查功能**
   - ✅ 首页加载
   - ✅ 文章列表显示
   - ✅ 文章详情页面
   - ✅ 创建新文章
   - ✅ 添加评论

3. **查看日志**
   - Vercel Dashboard → 你的项目 → Logs
   - 检查是否有错误

---

## 🔄 后续自动部署

配置完成后，每次推送代码到 GitHub：

```bash
git add .
git commit -m "feat: 添加新功能"
git push
```

Vercel 会自动：
1. 检测到代码变更
2. 运行测试（通过 GitHub Actions）
3. 构建新版本
4. 自动部署

---

## ⚙️ 高级配置

### 1. 自定义域名

在 Vercel 项目设置：
- Settings → Domains
- 添加你的域名
- 配置 DNS 记录

### 2. 环境变量管理

```bash
# 生产环境
DATABASE_URL=postgresql://...

# 预览环境（可选）
PREVIEW_DATABASE_URL=postgresql://...

# 其他变量
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.com
```

### 3. 监控和分析

Vercel 提供：
- Analytics（分析）
- Speed Insights（性能洞察）
- Web Vitals（核心网页指标）

在项目设置中启用。

---

## 🐛 常见问题

### 问题1: 构建失败

**症状**: 部署时显示 "Build Error"

**解决方案**:
1. 检查环境变量是否正确设置
2. 确保 `DATABASE_URL` 已配置
3. 查看构建日志找到具体错误

### 问题2: 数据库连接失败

**症状**: 网站显示 "Database connection error"

**解决方案**:
1. 确认 `DATABASE_URL` 格式正确
2. 检查数据库服务是否运行
3. 运行 `npx prisma db push` 初始化数据库

### 问题3: 404 错误

**症状**: 页面显示 "404 Not Found"

**解决方案**:
1. 清除 Vercel 构建缓存
2. 重新部署项目
3. 检查 Next.js 路由配置

---

## 📊 部署检查清单

部署前确认：

- [ ] 所有代码已提交到 Git
- [ ] 测试全部通过（36/36）
- [ ] 环境变量已配置
- [ ] 数据库已创建
- [ ] GitHub 仓库已创建
- [ ] Vercel 项目已连接

部署后验证：

- [ ] 网站可以访问
- [ ] 首页正常显示
- [ ] 文章功能正常
- [ ] 评论功能正常
- [ ] 没有控制台错误
- [ ] 性能指标良好

---

## 🎉 完成！

你的博客系统现在已经部署到全球 CDN，享受：

✨ 全球边缘网络加速
✨ 自动 HTTPS
✨ 持续部署
✨ 无服务器架构
✨ 99.99% 正常运行时间

---

**需要帮助？**

- Vercel 文档: https://vercel.com/docs
- Next.js 部署: https://nextjs.org/docs/deployment
- Prisma 部署: https://www.prisma.io/docs/guides/deployment

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
