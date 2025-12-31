# Smart Blog System

全栈博客系统 - 使用现代技术栈构建

## 技术栈

### 前端
- **Next.js 15** - React 框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 原子化 CSS
- **shadcn/ui** - UI 组件库
- **Framer Motion** - 动画库
- **React Hook Form** - 表单管理
- **Zod** - 数据验证

### 状态管理
- **Zustand** - 全局状态管理
- **TanStack Query** - 服务端状态管理

### 后端
- **tRPC** - 端到端类型安全 API
- **Prisma** - TypeScript ORM
- **PostgreSQL** - 数据库

## 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接
```

### 3. 初始化数据库
```bash
npm run db:push
```

### 4. 启动开发服务器
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 项目结构

```
smart-blog-system/
├── prisma/              # Prisma schema 和 migrations
├── src/
│   ├── app/            # Next.js App Router 页面
│   ├── components/     # React 组件
│   ├── lib/            # 工具函数和库
│   │   ├── prisma.ts   # Prisma 客户端
│   │   ├── utils.ts    # 工具函数
│   │   └── trpc/       # tRPC 客户端配置
│   └── server/         # 服务端代码
│       ├── trpc.ts     # tRPC 初始化
│       └── routers/    # tRPC 路由
├── components.json     # shadcn/ui 配置
├── tailwind.config.ts  # Tailwind 配置
└── tsconfig.json       # TypeScript 配置
```

## 功能特性

### 已实现
- ✅ 项目脚手架搭建
- ✅ TypeScript 类型系统
- ✅ Tailwind CSS + shadcn/ui 主题
- ✅ tRPC 端到端类型安全
- ✅ Prisma ORM + PostgreSQL
- ✅ 用户、文章、评论数据模型

### 待开发
- ⏳ 用户认证系统
- ⏳ 文章 CRUD 功能
- ⏳ 评论系统
- ⏳ UI 界面
- ⏳ 动画效果
- ⏳ 乐观更新
- ⏳ 性能优化
- ⏳ SEO 优化
- ⏳ 响应式设计
- ⏳ 单元测试
- ⏳ 集成测试
- ⏳ Vercel 部署

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm start` - 启动生产服务器
- `npm run lint` - 运行 ESLint
- `npm run db:push` - 同步 Prisma schema 到数据库
- `npm run db:studio` - 打开 Prisma Studio
- `npm run db:generate` - 生成 Prisma 客户端

## 学习资源

- [Next.js 文档](https://nextjs.org/docs)
- [tRPC 文档](https://trpc.io/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [shadcn/ui 文档](https://ui.shadcn.com/)
- [TanStack Query 文档](https://tanstack.com/query/latest)
- [Framer Motion 文档](https://www.framer.com/motion/)

## License

MIT
