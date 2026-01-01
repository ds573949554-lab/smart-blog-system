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
import { useI18n } from '@/lib/i18n/I18nContext';

export default function NewPostPage() {
  const router = useRouter();
  const utils = trpc.useUtils();
  const { data: session } = useSession();
  const { t, locale } = useI18n();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);

  // 动态构建验证 schema
  const postSchema = z.object({
    title: z.string().min(1, t.post.validation.titleRequired),
    content: z.string().min(10, t.post.validation.contentMinLength),
    slug: z.string().min(1, t.post.validation.slugRequired).regex(/^[a-z0-9-]+$/, t.post.validation.slugFormat),
    images: z.array(z.string()).optional(),
    videos: z.array(z.string()).optional(),
  });

  type PostFormData = z.infer<typeof postSchema>;

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
      setSubmitError(error.message || t.post.errors.publishFailed + '，请重试');
    },
  });

  const onSubmit = async (data: PostFormData) => {
    setSubmitError(null);

    // 检查用户是否登录
    if (!session?.user?.id) {
      setSubmitError(t.post.validation.loginRequired);
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
      setGenerateError(t.post.validation.titleRequiredFirst);
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
        body: JSON.stringify({ title, locale }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t.post.errors.generateFailed);
      }

      const data = await response.json();
      setValue('content', data.content);
    } catch (error) {
      console.error('生成内容失败:', error);
      setGenerateError(error instanceof Error ? error.message : t.post.errors.generateFailedRetry);
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
          <CardTitle>{t.post.title}</CardTitle>
          <CardDescription>{t.post.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">{t.post.fields.title} *</Label>
              <Input
                id="title"
                {...register('title')}
                placeholder={t.post.fields.titlePlaceholder}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="slug">{t.post.fields.slug} *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateSlug}
                >
                  {t.post.buttons.autoGenerateSlug}
                </Button>
              </div>
              <Input
                id="slug"
                {...register('slug')}
                placeholder={t.post.fields.slugPlaceholder}
              />
              {errors.slug && (
                <p className="text-sm text-destructive">{errors.slug.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {t.post.hints.slug}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="content">{t.post.fields.content} *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateContent}
                  disabled={isGenerating || !title}
                >
                  {isGenerating ? t.post.buttons.generating : t.post.buttons.aiGenerate}
                </Button>
              </div>
              {generateError && (
                <p className="text-sm text-destructive">{generateError}</p>
              )}
              <Textarea
                id="content"
                {...register('content')}
                placeholder={t.post.fields.contentPlaceholder}
                rows={20}
                className="font-mono text-sm"
              />
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content.message}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {t.post.hints.content}
              </p>
            </div>

            {/* 多媒体上传 */}
            <div className="space-y-2">
              <Label>{t.post.fields.multimedia}</Label>
              <Tabs defaultValue="images" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="images">
                    {t.post.fields.imagesTab} {uploadedImages.length > 0 && `(${uploadedImages.length})`}
                  </TabsTrigger>
                  <TabsTrigger value="videos">
                    {t.post.fields.videosTab} {uploadedVideos.length > 0 && `(${uploadedVideos.length})`}
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
                            {t.post.errors.videoNotSupported}
                          </video>
                          <button
                            type="button"
                            onClick={() => removeVideo(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {t.post.buttons.deleteVideo}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              <p className="text-sm text-muted-foreground">
                {t.post.hints.multimedia}
              </p>
            </div>

            {submitError && (
              <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                <p className="text-sm text-destructive font-medium">{t.post.errors.publishFailed}：{submitError}</p>
              </div>
            )}

            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting || createPost.isPending}>
                {isSubmitting || createPost.isPending ? t.post.buttons.publishing : t.post.buttons.publish}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                {t.post.buttons.cancel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
