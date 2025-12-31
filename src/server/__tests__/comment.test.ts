import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { appRouter } from '../routers/_app';
import { prisma } from '@/lib/prisma';

describe('Comment Router (集成测试)', () => {
  const caller = appRouter.createCaller({});

  let userId: string;
  let postId: string;

  beforeEach(async () => {
    // 创建测试用户
    const user = await prisma.user.create({
      data: {
        email: 'comment-test@example.com',
        name: '评论测试用户',
      },
    });
    userId = user.id;

    // 创建测试文章
    const post = await prisma.post.create({
      data: {
        title: '测试文章',
        content: '内容',
        slug: 'comment-test-post',
        authorId: userId,
      },
    });
    postId = post.id;
  });

  afterEach(async () => {
    // 清理测试数据
    await prisma.comment.deleteMany({ where: { postId } });
    await prisma.post.delete({ where: { id: postId } });
    await prisma.user.delete({ where: { id: userId } });
  });

  describe('comment.create', () => {
    it('应该成功创建评论', async () => {
      const commentData = {
        content: '这是一条测试评论',
        postId,
        authorId: userId,
      };

      const result = await caller.comment.create(commentData);

      expect(result).toBeDefined();
      expect(result.content).toBe(commentData.content);
      expect(result.postId).toBe(postId);
      expect(result.authorId).toBe(userId);
    });

    it('应该拒绝空内容的评论', async () => {
      await expect(
        caller.comment.create({
          content: '',
          postId,
          authorId: userId,
        })
      ).rejects.toThrow();
    });
  });

  describe('comment.getByPostId', () => {
    it('应该返回指定文章的所有评论', async () => {
      // 创建多条评论
      await prisma.comment.createMany({
        data: [
          {
            content: '第一条评论',
            postId,
            authorId: userId,
          },
          {
            content: '第二条评论',
            postId,
            authorId: userId,
          },
          {
            content: '第三条评论',
            postId,
            authorId: userId,
          },
        ],
      });

      const result = await caller.comment.getByPostId({ postId });

      expect(result).toHaveLength(3);
      expect(result[0].author).toBeDefined();
      expect(result[0].author.name).toBe('评论测试用户');
    });

    it('没有评论时应该返回空数组', async () => {
      const result = await caller.comment.getByPostId({ postId });
      expect(result).toEqual([]);
    });

    it('评论应该按创建时间倒序排列', async () => {
      // 创建三条评论，有时间间隔
      const comment1 = await prisma.comment.create({
        data: {
          content: '第一条',
          postId,
          authorId: userId,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      const comment2 = await prisma.comment.create({
        data: {
          content: '第二条',
          postId,
          authorId: userId,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 10));

      const comment3 = await prisma.comment.create({
        data: {
          content: '第三条',
          postId,
          authorId: userId,
        },
      });

      const result = await caller.comment.getByPostId({ postId });

      // 最新的评论应该在最前面
      expect(result[0].id).toBe(comment3.id);
      expect(result[1].id).toBe(comment2.id);
      expect(result[2].id).toBe(comment1.id);
    });
  });

  describe('comment.delete', () => {
    it('应该成功删除评论', async () => {
      const comment = await prisma.comment.create({
        data: {
          content: '待删除的评论',
          postId,
          authorId: userId,
        },
      });

      await caller.comment.delete({ id: comment.id });

      const deleted = await prisma.comment.findUnique({
        where: { id: comment.id },
      });

      expect(deleted).toBeNull();
    });

    it('删除不存在的评论应该抛出错误', async () => {
      await expect(
        caller.comment.delete({ id: 'non-existent-id' })
      ).rejects.toThrow();
    });
  });
});
