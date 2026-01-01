const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 创建测试用户
  const user = await prisma.user.upsert({
    where: { id: 'cmjtxid8r0000xxb32rwvhfhj' },
    update: {},
    create: {
      id: 'cmjtxid8r0000xxb32rwvhfhj',
      email: 'test@example.com',
      name: '测试用户',
      avatar: null,
    },
  });

  console.log('✅ 测试用户创建成功:', user);
}

main()
  .catch((e) => {
    console.error('❌ 错误:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
