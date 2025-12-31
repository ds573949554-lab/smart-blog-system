import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { Button } from '../ui/button';

describe('Button 组件', () => {
  it('应该渲染按钮文本', () => {
    render(<Button>点击我</Button>);
    expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
  });

  it('应该响应点击事件', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>点击</Button>);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('应该支持禁用状态', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        禁用按钮
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('应该应用默认变体样式', () => {
    render(<Button>默认按钮</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('应该应用 outline 变体样式', () => {
    render(<Button variant="outline">轮廓按钮</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('border-input');
  });

  it('应该应用不同尺寸', () => {
    const { rerender } = render(<Button size="sm">小按钮</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');

    rerender(<Button size="lg">大按钮</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
  });

  it('应该支持 asChild 属性', () => {
    render(
      <Button asChild>
        <a href="/test">链接按钮</a>
      </Button>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test');
    expect(link).toHaveTextContent('链接按钮');
  });
});
