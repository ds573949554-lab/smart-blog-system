# Smart Blog System

基于 Next.js 15 构建的现代化全栈博客系统，使用 tRPC 实现类型安全的 API，Prisma 作为 ORM，完整的测试覆盖。

## ✨ 特性

- 🚀 **现代技术栈**: Next.js 15 + React 19 + TypeScript
- 🔒 **类型安全**: 端到端的 TypeScript 类型推导，使用 tRPC
- 💾 **数据库**: Prisma ORM + SQLite (开发) / PostgreSQL (生产)
- 🎨 **优雅 UI**: shadcn/ui + Tailwind CSS
- ✨ **流畅动画**: Framer Motion
- 📝 **表单验证**: React Hook Form + Zod
- 🧪 **完整测试**: Vitest + React Testing Library (36+ 测试用例)
- 🔄 **CI/CD**: GitHub Actions 自动化测试和部署
- 📱 **响应式设计**: 完美适配移动端和桌面端
- 🔍 **SEO 优化**: Next.js metadata API

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 15.1.4 (App Router)
- **UI 库**: React 19
- **样式**: Tailwind CSS 3.4.1
- **组件库**: shadcn/ui (Radix UI + Tailwind)
- **动画**: Framer Motion 12.0.0
- **表单**: React Hook Form 7.69.0
- **验证**: Zod 3.25.76
- **状态管理**: Zustand 5.0.3

### 后端
- **API**: tRPC 11.0.0 (类型安全的 API)
- **ORM**: Prisma 6.1.0
- **数据库**: SQLite (dev) / PostgreSQL (prod)
- **查询**: TanStack Query 5.62.11

### 测试
- **测试框架**: Vitest 4.0.16
- **组件测试**: React Testing Library 16.3.1
- **覆盖率**: 36+ 测试用例，覆盖单元和集成测试

### DevOps
- **CI/CD**: GitHub Actions
- **部署**: Vercel
- **代码质量**: ESLint + TypeScript

## 📦 功能模块

### 文章管理
- ✅ 文章列表展示
- ✅ 文章详情查看
- ✅ 文章创建和发布
- ✅ 文章更新和删除
- ✅ Markdown 支持
- ✅ Slug 自动生成

### 评论系统
- ✅ 发表评论
- ✅ 评论列表
- ✅ 评论删除
- ✅ 实时评论数统计

### UI/UX
- ✅ 响应式布局
- ✅ 流畅的页面动画
- ✅ 加载骨架屏
- ✅ 优化的交互反馈
- ✅ 乐观更新

### SEO
- ✅ 动态 meta 标签
- ✅ Open Graph 支持
- ✅ 结构化数据

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 yarn

### 安装步骤

1. **克隆仓库**
```bash
git clone <your-repo-url>
cd smart-blog-system
```

2. **安装依赖**
```bash
npm install
```

3. **环境配置**
```bash
# 复制环境变量模板
cp .env.example .env

# 编辑 .env 文件
# DATABASE_URL="file:./dev.db"
```

4. **初始化数据库**
```bash
# 生成 Prisma Client
npm run db:generate

# 推送数据库模式
npm run db:push

# 填充示例数据
npm run db:seed
```

5. **启动开发服务器**
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📋 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 数据库
npm run db:push      # 推送数据库模式
npm run db:studio    # 打开 Prisma Studio
npm run db:generate  # 生成 Prisma Client
npm run db:seed      # 填充示例数据

# 测试
npm test             # 运行测试
npm run test:ui      # 运行测试 UI
npm run test:coverage # 生成测试覆盖率报告

# 代码质量
npm run lint         # 运行 ESLint
```

## 🗂️ 项目结构

```
smart-blog-system/
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
│       ├── ci.yml
│       └── pr-checks.yml
├── prisma/
│   ├── schema.prisma     # 数据库模式
│   └── seed.ts           # 数据库种子文件
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── page.tsx      # 首页
│   │   ├── layout.tsx    # 根布局
│   │   └── posts/        # 文章相关页面
│   ├── components/       # React 组件
│   │   ├── ui/           # shadcn/ui 组件
│   │   ├── PostCard.tsx
│   │   ├── CommentForm.tsx
│   │   └── __tests__/    # 组件测试
│   ├── lib/              # 工具库
│   │   ├── prisma.ts     # Prisma Client
│   │   ├── utils.ts      # 工具函数
│   │   └── trpc/         # tRPC 配置
│   ├── server/           # 服务端代码
│   │   ├── trpc.ts       # tRPC 初始化
│   │   ├── routers/      # tRPC 路由
│   │   │   ├── post.ts
│   │   │   ├── comment.ts
│   │   │   └── _app.ts
│   │   └── __tests__/    # API 集成测试
│   └── test/             # 测试工具
│       ├── setup.ts
│       ├── utils.tsx
│       └── mockData.ts
├── .env                  # 环境变量
├── .gitignore
├── next.config.js
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── vitest.config.ts
└── README.md
```

## 🧪 测试

项目包含完整的测试套件：

- **单元测试**: 组件和工具函数测试 (20 个测试用例)
- **集成测试**: tRPC API 端点测试 (16 个测试用例)

运行测试：
```bash
npm test                  # 运行所有测试
npm run test:coverage     # 生成覆盖率报告
```

## 🚀 部署

### Vercel 部署 (推荐)

1. **推送代码到 GitHub**
```bash
git push origin main
```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 导入 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目

3. **配置环境变量**
```
DATABASE_URL=your-production-database-url
```

4. **自动部署**
   - 每次推送到 main 分支，GitHub Actions 会自动部署

详细部署指南请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📊 测试覆盖率

```
Test Files  5 passed (5)
Tests       36 passed (36)
Start at    05:45:56
Duration    851ms
```

- ✅ Button 组件: 7/7 测试通过
- ✅ PostCard 组件: 8/8 测试通过
- ✅ 工具函数: 5/5 测试通过
- ✅ Post Router: 9/9 测试通过
- ✅ Comment Router: 7/7 测试通过

## 🤝 贡献

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 开发规范

### Git 提交规范

```
<类型>(<范围>): <描述>

feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试相关
chore: 构建/工具相关
```

### 代码风格

- 使用 ESLint + Prettier
- 遵循 TypeScript 最佳实践
- 组件使用 PascalCase
- 变量/函数使用 camelCase
- 常量使用 UPPER_SNAKE_CASE

## 📄 许可证

MIT License

## 🙏 致谢

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

---

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
