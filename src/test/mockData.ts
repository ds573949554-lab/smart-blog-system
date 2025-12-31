// 模拟用户数据
export const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: '测试用户',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

// 模拟文章数据
export const mockPost = {
  id: 'post-1',
  title: '测试文章标题',
  content: '这是一篇测试文章的内容，用于单元测试。',
  slug: 'test-post',
  published: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  authorId: mockUser.id,
  author: mockUser,
  _count: {
    comments: 3,
  },
};

// 模拟多篇文章
export const mockPosts = [
  mockPost,
  {
    id: 'post-2',
    title: '第二篇测试文章',
    content: '第二篇文章的内容。',
    slug: 'test-post-2',
    published: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    authorId: mockUser.id,
    author: mockUser,
    _count: {
      comments: 5,
    },
  },
  {
    id: 'post-3',
    title: '第三篇测试文章',
    content: '第三篇文章的内容。',
    slug: 'test-post-3',
    published: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    authorId: mockUser.id,
    author: mockUser,
    _count: {
      comments: 1,
    },
  },
];

// 模拟评论数据
export const mockComment = {
  id: 'comment-1',
  content: '这是一条测试评论',
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
  postId: mockPost.id,
  authorId: mockUser.id,
  author: mockUser,
};

// 模拟多条评论
export const mockComments = [
  mockComment,
  {
    id: 'comment-2',
    content: '第二条评论',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    postId: mockPost.id,
    authorId: mockUser.id,
    author: mockUser,
  },
  {
    id: 'comment-3',
    content: '第三条评论',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    postId: mockPost.id,
    authorId: mockUser.id,
    author: mockUser,
  },
];

// 模拟带评论的完整文章
export const mockPostWithComments = {
  ...mockPost,
  comments: mockComments,
};
