'use client';

import { useState } from 'react';
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
import { MediaUploader } from '@/components/MediaUploader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSession } from 'next-auth/react';

const postSchema = z.object({
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(10, '内容至少需要10个字符'),
  slug: z.string().min(1, 'Slug 不能为空').regex(/^[a-z0-9-]+$/, 'Slug 只能包含小写字母、数字和横线'),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
});

type PostFormData = z.infer<typeof postSchema>;

export default function NewPostPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      images: [],
      videos: [],
    },
  });

  const [submitError, setSubmitError] = useState<string | null>(null);

  const createPost = trpc.post.create.useMutation({
    onSuccess: (data) => {
      utils.post.getAll.invalidate();
      router.push(`/posts/${data.slug}`);
    },
    onError: (error) => {
      console.error('发布失败:', error);
      setSubmitError(error.message || '发布失败，请重试');
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setSubmitError(null);

    // 检查用户是否登录
    if (!session?.user?.id) {
      setSubmitError('请先登录后再发布案例');
      return;
    }

    try {
      await createPost.mutateAsync({
        ...data,
        images: JSON.stringify(uploadedImages),
        videos: JSON.stringify(uploadedVideos),
        authorId: session.user.id, // 使用真实用户ID
      });
    } catch (err) {
      // 错误已在 onError 中处理
    }
  };

  // 处理图片上传完成
  const handleImagesUpload = (urls: string[]) => {
    const newImages = [...uploadedImages, ...urls];
    setUploadedImages(newImages);
    setValue('images', newImages);
  };

  // 处理视频上传完成
  const handleVideosUpload = (urls: string[]) => {
    const newVideos = [...uploadedVideos, ...urls];
    setUploadedVideos(newVideos);
    setValue('videos', newVideos);
  };

  // 删除已上传的图片
  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    setValue('images', newImages);
  };

  // 删除已上传的视频
  const removeVideo = (index: number) => {
    const newVideos = uploadedVideos.filter((_, i) => i !== index);
    setUploadedVideos(newVideos);
    setValue('videos', newVideos);
  };

  // 自动生成内容（使用智谱 AI）
  const title = watch('title');

  const generateContent = async () => {
    if (!title) {
      setGenerateError('请先输入标题');
      return;
    }

    setIsGenerating(true);
    setGenerateError(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '生成失败');
      }

      const data = await response.json();
      setValue('content', data.content);
    } catch (error) {
      console.error('生成内容失败:', error);
      setGenerateError(error instanceof Error ? error.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  // 自动生成 slug
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
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <Card>
        <CardHeader>
          <CardTitle>发布成功案例</CardTitle>
          <CardDescription>分享你的精彩案例，支持图片、视频和大量文字</CardDescription>
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
              <div className="flex justify-between items-center">
                <Label htmlFor="content">内容 *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateContent}
                  disabled={isGenerating || !title}
                >
                  {isGenerating ? '生成中...' : '🤖 AI 自动生成'}
                </Button>
              </div>
              {generateError && (
                <p className="text-sm text-destructive">{generateError}</p>
              )}
              <Textarea
                id="content"
                {...register('content')}
                placeholder="输入案例内容，支持大量文字（支持 Markdown 格式）或点击上方按钮使用 AI 自动生成"
                rows={20}
                className="font-mono text-sm"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                💡 提示：支持大量文字内容，可以详细描述你的案例过程和成果
              </p>
            </div>

            {/* 多媒体上传 */}
            <div className="space-y-2">
              <Label>多媒体内容</Label>
              <Tabs defaultValue="images" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="images">
                    📷 图片 {uploadedImages.length > 0 && `(${uploadedImages.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="videos">
                    🎬 视频 {uploadedVideos.length > 0 && `(${uploadedVideos.length})`}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="images" className="mt-4">
                  <MediaUploader
                    onUploadComplete={handleImagesUpload}
                    maxFiles={20}
                    acceptImages={true}
                    acceptVideos={false}
                  />
                  {uploadedImages.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={`图片 ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="videos" className="mt-4">
                  <MediaUploader
                    onUploadComplete={handleVideosUpload}
                    maxFiles={5}
                    acceptImages={false}
                    acceptVideos={true}
                  />
                  {uploadedVideos.length > 0 && (
                    <div className="mt-4 space-y-4">
                      {uploadedVideos.map((url, index) => (
                        <div key={index} className="relative group">
                          <video
                            src={url}
                            controls
                            className="w-full max-h-96 rounded-lg"
                          >
                            您的浏览器不支持视频播放
                          </video>
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            删除视频
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              <p className="text-sm text-muted-foreground">
                💡 支持上传图片和视频来展示你的案例成果。图片最大10MB，视频最大60MB（约1分钟）
              </p>
            </div>

            {submitError && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-sm text-destructive font-medium">发布失败：{submitError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting || createPost.isPending}>
                {isSubmitting || createPost.isPending ? '发布中...' : '发布文章'}
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
