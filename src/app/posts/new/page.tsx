'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const postSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(10, '内容至少需要10个字符'),
  slug: z.string().min(1, 'Slug 不能为空').regex(/^[a-z0-9-]+$/, 'Slug 只能包含小写字母、数字和横线'),
});

type PostFormData = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const router = useRouter();
  const utils = trpc.useUtils();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const createPost = trpc.post.create.useMutation({
    onSuccess: (data) => {
      utils.post.getAll.invalidate();
      router.push(`/posts/${data.slug}`);
    },
  });

  const onSubmit = async (data: PostFormData) => {
    // 使用测试用户ID（实际项目中应该从认证系统获取）
    await createPost.mutateAsync({
      ...data,
      authorId: 'cmjtvrnvk0000xxkq0z230qjb', // 测试用户ID
    });
  };

  // 自动生成 slug
  const title = watch('title');
  const generateSlug = () => {
    if (!title) return;

    // 简单的中文转拼音映射（常用字）
    const pinyinMap: Record<string, string> = {
      '粤': 'yue', '语': 'yu', '是': 'shi', '最': 'zui', '好': 'hao',
      '测': 'ce', '试': 'shi', '文': 'wen', '章': 'zhang',
      '欢': 'huan', '迎': 'ying', '使': 'shi', '用': 'yong',
      '系': 'xi', '统': 'tong', '博': 'bo', '客': 'ke',
      '新': 'xin', '闻': 'wen', '技': 'ji', '术': 'shu',
    };

    // 转换中文为拼音
    let result = '';
    for (const char of title) {
      if (pinyinMap[char]) {
        result += pinyinMap[char] + '-';
      } else if (/[a-zA-Z0-9]/.test(char)) {
        result += char;
      } else if (char === ' ') {
        result += '-';
      }
    }

    // 如果转换后为空（包含未映射的中文），使用时间戳
    if (!result || result.replace(/-/g, '').length === 0) {
      result = `post-${Date.now()}`;
    }

    // 清理和格式化
    const slug = result
      .toLowerCase()
      .replace(/-+/g, '-')  // 合并多个连字符
      .replace(/^-|-$/g, '') // 移除首尾连字符
      .trim();

    setValue('slug', slug);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>发布新文章</CardTitle>
          <CardDescription>填写文章信息并发布</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">标题 *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder="输入文章标题"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="slug">Slug *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateSlug}
                >
                  自动生成
                </Button>
              </div>
              <Input
                id="slug"
                {...register('slug')}
                placeholder="url-friendly-slug"
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                URL 友好的标识符，只能包含小写字母、数字和横线
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">内容 *</Label>
              <Textarea
                id="content"
                {...register('content')}
                placeholder="输入文章内容（支持 Markdown）"
                rows={15}
                className="font-mono text-sm"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content.message}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '发布中...' : '发布文章'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                取消
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
