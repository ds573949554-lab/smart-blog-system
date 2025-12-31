import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn (className utility)', () => {
  it('应该合并类名', () => {
    const result = cn('text-red-500', 'bg-blue-500');
    expect(result).toContain('text-red-500');
    expect(result).toContain('bg-blue-500');
  });

  it('应该处理条件类名', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('base-class');
    expect(result).toContain('active-class');
  });

  it('应该过滤掉 falsy 值', () => {
    const result = cn('class1', false, null, undefined, 'class2');
    expect(result).toContain('class1');
    expect(result).toContain('class2');
    expect(result).not.toContain('false');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
  });

  it('应该处理 Tailwind 冲突类', () => {
    // tailwind-merge 应该处理冲突的类
    const result = cn('p-4', 'p-8');
    // 应该只保留最后的 padding 类
    expect(result).toBe('p-8');
  });

  it('应该接受数组形式的类名', () => {
    const result = cn(['class1', 'class2']);
    expect(result).toContain('class1');
    expect(result).toContain('class2');
  });
});
