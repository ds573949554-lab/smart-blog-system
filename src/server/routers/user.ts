import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

/**
 * 用户路由
 */
export const userRouter = router({
  // 获取所有用户
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
        _count: {
          select: {
            posts: true,
            comments: true,
          },
        },
      },
    });
  }),

  // 根据 ID 获取用户
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input.id },
        include: {
          posts: {
            where: { published: true },
            orderBy: { createdAt: 'desc' },
          },
          _count: {
            select: {
              posts: true,
              comments: true,
            },
          },
        },
      });
    }),

  // 创建用户
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1),
        avatar: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: input,
      });
    }),
});
