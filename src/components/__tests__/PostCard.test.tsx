import { describe, it, expect } from 'vitest';
import { render, screen } from '@/test/utils';
import { PostCard } from '../PostCard';
import { mockPost } from '@/test/mockData';

describe('PostCard 组件', () => {
  it('应该渲染文章标题', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  });

  it('应该渲染文章摘要', () => {
    render(<PostCard post={mockPost} />);
    const content = mockPost.content.slice(0, 100);
    expect(screen.getByText(new RegExp(content))).toBeInTheDocument();
  });

  it('应该渲染作者信息', () => {
    render(<PostCard post={mockPost} />);
    // 作者名称在 "由 XXX 发布于" 这个文本中
    const authorText = screen.getByText(/由.*测试用户.*发布于/);
    expect(authorText).toBeInTheDocument();
  });

  it('应该渲染评论数量', () => {
    render(<PostCard post={mockPost} />);
    const commentCount = screen.getByText(/3 条评论/);
    expect(commentCount).toBeInTheDocument();
  });

  it('应该渲染创建日期', () => {
    render(<PostCard post={mockPost} />);
    // 日期会根据系统时区格式化，查找包含日期的文本
    const dateText = screen.getByText(/发布于.*202[34]/);
    expect(dateText).toBeInTheDocument();
  });

  it('应该包含指向文章详情的链接', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link', { name: /阅读全文/ });
    expect(link).toHaveAttribute('href', `/posts/${mockPost.slug}`);
  });

  it('应该显示作者和发布日期信息', () => {
    render(<PostCard post={mockPost} />);
    // PostCard 组件显示作者名和日期，但不包含头像
    const description = screen.getByText(/由.*测试用户.*发布于.*202[34]/);
    expect(description).toBeInTheDocument();
  });

  it('应该在内容过长时显示省略号', () => {
    const longPost = {
      ...mockPost,
      content: 'a'.repeat(200),
    };

    render(<PostCard post={longPost} />);
    const contentElement = screen.getByText(/a+\.\.\./);
    expect(contentElement).toBeInTheDocument();
  });
});
