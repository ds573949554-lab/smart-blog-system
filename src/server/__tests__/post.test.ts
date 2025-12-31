import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { appRouter } from '../routers/_app';
import { prisma } from '@/lib/prisma';

describe('Post Router (集成测试)', () => {
  const caller = appRouter.createCaller({});

  // 测试数据
  const testUser = {
    email: 'test@integration.com',
    name: '集成测试用户',
  };

  const testPost = {
    title: '集成测试文章',
    content: '这是用于集成测试的文章内容',
    slug: 'integration-test-post',
  };

  let userId: string;
  let postId: string;

  beforeEach(async () => {
    // 创建测试用户
    const user = await prisma.user.create({
      data: testUser,
    });
    userId = user.id;
  });

  afterEach(async () => {
    // 清理测试数据
    await prisma.comment.deleteMany({
      where: { postId },
    });
    await prisma.post.deleteMany({
      where: { authorId: userId },
    });
    await prisma.user.delete({
      where: { id: userId },
    });
  });

  describe('post.create', () => {
    it('应该成功创建文章', async () => {
      const result = await caller.post.create({
        ...testPost,
        authorId: userId,
      });

      expect(result).toBeDefined();
      expect(result.title).toBe(testPost.title);
      expect(result.content).toBe(testPost.content);
      expect(result.slug).toBe(testPost.slug);
      expect(result.authorId).toBe(userId);
      expect(result.published).toBe(false); // 默认未发布

      postId = result.id;
    });

    it('应该拒绝创建重复slug的文章', async () => {
      // 先创建一篇文章
      const first = await caller.post.create({
        ...testPost,
        authorId: userId,
      });
      postId = first.id;

      // 尝试创建相同slug的文章
      await expect(
        caller.post.create({
          ...testPost,
          authorId: userId,
        })
      ).rejects.toThrow();
    });
  });

  describe('post.getAll', () => {
    it('应该返回所有已发布的文章', async () => {
      // 创建两篇文章，一篇发布，一篇未发布
      const published = await prisma.post.create({
        data: {
          title: '已发布文章',
          content: '内容',
          slug: 'published-post',
          published: true,
          authorId: userId,
        },
      });

      const draft = await prisma.post.create({
        data: {
          title: '草稿文章',
          content: '内容',
          slug: 'draft-post',
          published: false,
          authorId: userId,
        },
      });

      const result = await caller.post.getAll();

      // 应该只包含已发布的文章
      expect(result.some((p) => p.id === published.id)).toBe(true);
      expect(result.some((p) => p.id === draft.id)).toBe(false);

      // 清理
      await prisma.post.deleteMany({
        where: { id: { in: [published.id, draft.id] } },
      });
    });

    it('返回的文章应该包含作者信息和评论数', async () => {
      const post = await prisma.post.create({
        data: {
          title: '测试文章',
          content: '内容',
          slug: 'test-post-with-comments',
          published: true,
          authorId: userId,
        },
      });

      // 添加评论
      await prisma.comment.create({
        data: {
          content: '测试评论',
          postId: post.id,
          authorId: userId,
        },
      });

      const result = await caller.post.getAll();
      const foundPost = result.find((p) => p.id === post.id);

      expect(foundPost).toBeDefined();
      expect(foundPost!.author).toBeDefined();
      expect(foundPost!.author.name).toBe(testUser.name);
      expect(foundPost!._count.comments).toBe(1);

      // 清理
      await prisma.comment.deleteMany({ where: { postId: post.id } });
      await prisma.post.delete({ where: { id: post.id } });
    });
  });

  describe('post.getById', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId,
        },
      });
      postId = post.id;
    });

    it('应该根据ID返回文章详情', async () => {
      const result = await caller.post.getById({ id: postId });

      expect(result).toBeDefined();
      expect(result!.id).toBe(postId);
      expect(result!.title).toBe(testPost.title);
      expect(result!.author).toBeDefined();
      expect(result!.comments).toBeDefined();
    });

    it('文章不存在时应该返回null', async () => {
      const result = await caller.post.getById({ id: 'non-existent-id' });
      expect(result).toBeNull();
    });
  });

  describe('post.update', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId,
        },
      });
      postId = post.id;
    });

    it('应该成功更新文章', async () => {
      const updatedData = {
        title: '更新后的标题',
        content: '更新后的内容',
        published: true,
      };

      const result = await caller.post.update({
        id: postId,
        ...updatedData,
      });

      expect(result.title).toBe(updatedData.title);
      expect(result.content).toBe(updatedData.content);
      expect(result.published).toBe(true);
    });
  });

  describe('post.delete', () => {
    beforeEach(async () => {
      const post = await prisma.post.create({
        data: {
          ...testPost,
          authorId: userId,
        },
      });
      postId = post.id;
    });

    it('应该成功删除文章', async () => {
      await caller.post.delete({ id: postId });

      const deleted = await prisma.post.findUnique({
        where: { id: postId },
      });

      expect(deleted).toBeNull();
      postId = ''; // 已删除，清理时不需要再删除
    });

    it('删除文章时应该级联删除评论', async () => {
      // 添加评论
      const comment = await prisma.comment.create({
        data: {
          content: '测试评论',
          postId: postId,
          authorId: userId,
        },
      });

      await caller.post.delete({ id: postId });

      const deletedComment = await prisma.comment.findUnique({
        where: { id: comment.id },
      });

      expect(deletedComment).toBeNull();
      postId = ''; // 已删除
    });
  });
});
