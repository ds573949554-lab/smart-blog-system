import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

/**
 * 文章路由
 */
export const postRouter = router({
  // 获取所有文章
  getAll: publicProcedure.query(async () => {
    return await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: { comments: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }),

  // 根据 ID 获取文章
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.post.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          comments: {
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
          },
        },
      });
    }),

  // 创建文章
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        slug: z.string().min(1),
        authorId: z.string(),
        images: z.string().optional(), // JSON字符串
        videos: z.string().optional(), // JSON字符串
        livePhotos: z.string().optional(), // JSON字符串
        thumbnail: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.post.create({
        data: {
          ...input,
          published: true, // 默认发布
          images: input.images || '[]',
          videos: input.videos || '[]',
          livePhotos: input.livePhotos || '[]',
        },
      });
    }),

  // 更新文章
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        content: z.string().min(1).optional(),
        published: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.post.update({
        where: { id },
        data,
      });
    }),

  // 删除文章
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.post.delete({
        where: { id: input.id },
      });
    }),
});
