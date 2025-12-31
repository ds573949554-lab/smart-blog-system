import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: '测试用户',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
    },
  });

  console.log('✅ 创建用户:', user.name);

  // 创建测试文章
  const posts = [
    {
      title: '欢迎使用 Smart Blog System',
      content: `这是一个使用 Next.js 15、tRPC、Prisma 和 TypeScript 构建的全栈博客系统。

## 主要特性

- ✨ 现代化的技术栈
- 🚀 服务端渲染 (SSR)
- 🔒 端到端类型安全
- 🎨 精美的 UI 界面
- 📱 响应式设计

希望你喜欢这个博客系统！`,
      slug: 'welcome-to-smart-blog',
      published: true,
      authorId: user.id,
    },
    {
      title: 'Next.js 15 新特性介绍',
      content: `Next.js 15 带来了许多令人兴奋的新特性：

## App Router
全新的 App Router 提供了更好的性能和开发体验。

## React Server Components
默认使用 React Server Components，减少客户端 JavaScript 体积。

## Turbopack
新的打包工具 Turbopack 提供了更快的开发体验。`,
      slug: 'nextjs-15-features',
      published: true,
      authorId: user.id,
    },
    {
      title: 'TypeScript 最佳实践',
      content: `使用 TypeScript 可以让你的代码更加健壮和易于维护。

## 类型推断
充分利用 TypeScript 的类型推断能力，减少手动类型注解。

## 严格模式
启用严格模式可以捕获更多潜在的错误。

## 泛型
合理使用泛型可以让代码更加灵活和可复用。`,
      slug: 'typescript-best-practices',
      published: true,
      authorId: user.id,
    },
  ];

  for (const postData of posts) {
    const post = await prisma.post.upsert({
      where: { slug: postData.slug },
      update: {},
      create: postData,
    });
    console.log('✅ 创建文章:', post.title);

    // 为每篇文章添加评论
    const comment = await prisma.comment.create({
      data: {
        content: '很棒的文章！',
        postId: post.id,
        authorId: user.id,
      },
    });
    console.log('  ↳ 添加评论:', comment.content);
  }

  console.log('\n✨ 数据库种子数据添加完成！');
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
