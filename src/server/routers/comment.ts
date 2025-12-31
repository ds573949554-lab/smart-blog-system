import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

/**
 * 评论路由
 */
export const commentRouter = router({
  // 获取文章的所有评论
  getByPostId: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      return await prisma.comment.findMany({
        where: { postId: input.postId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });
    }),

  // 创建评论
  create: publicProcedure
    .input(
      z.object({
        content: z.string().min(1),
        postId: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.comment.create({
        data: input,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      });
    }),

  // 删除评论
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.comment.delete({
        where: { id: input.id },
      });
    }),
});
