'use client';

import { useParams } from 'next/navigation';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentForm } from '@/components/CommentForm';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';

export default function PostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [copied, setCopied] = useState(false);
  const [showShareCard, setShowShareCard] = useState(false);

  // 由于我们的 API 使用 ID 而不是 slug，这里需要先获取所有文章找到匹配的
  const { data: posts } = trpc.post.getAll.useQuery();
  const post = posts?.find((p) => p.slug === slug);

  // 解析多媒体内容
  const images = (post as any)?.images ? JSON.parse((post as any).images) as string[] : [];
  const videos = (post as any)?.videos ? JSON.parse((post as any).videos) as string[] : [];

  // 复制链接功能
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { data: comments, isLoading: commentsLoading } = trpc.comment.getByPostId.useQuery(
    { postId: post?.id || '' },
    { enabled: !!post?.id }
  );

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>文章未找到</CardTitle>
            <CardDescription>抱歉，找不到这篇文章</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/posts">返回文章列表</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/posts">← 返回列表</Link>
      </Button>

      <article className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 not-prose">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name || ''}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{post.author.name || post.author.email}</span>
          </div>
          <span>•</span>
          <time dateTime={new Date(post.createdAt).toISOString()}>
            {new Date(post.createdAt).toLocaleDateString('zh-CN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>{comments?.length || 0} 条评论</span>
        </div>

        <div className="whitespace-pre-wrap">{post.content}</div>

        {/* 多媒体内容展示 */}
        {(images.length > 0 || videos.length > 0) && (
          <div className="mt-12 not-prose">
            {/* 图片展示 */}
            {images.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">案例图片</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((url, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <img
                        src={url}
                        alt={`案例图片 ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 视频展示 */}
            {videos.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">案例视频</h3>
                <div className="space-y-6">
                  {videos.map((url, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden shadow-lg">
                      <video
                        src={url}
                        controls
                        className="w-full max-h-[600px] bg-black"
                        preload="metadata"
                      >
                        您的浏览器不支持视频播放
                      </video>
                      <p className="text-sm text-muted-foreground mt-2">视频 {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 分享按钮 */}
        <div className="mt-8 not-prose border-t pt-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={copyLink}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    复制链接
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowShareCard(!showShareCard)}
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                分享到社交平台
              </Button>
            </div>
          </div>

          {/* 社交分享预览卡片 */}
          {showShareCard && (
            <Card className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50">
              <h4 className="font-bold mb-3 text-lg">社交分享预览</h4>
              <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-md">
                {images.length > 0 && (
                  <div className="aspect-video bg-gray-100">
                    <img
                      src={images[0]}
                      alt="预览图"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h5 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h5>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.content.substring(0, 150)}...
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                💡 复制链接分享到微信、微博、朋友圈等社交平台，会自动生成精美预览卡片
              </p>
            </Card>
          )}
        </div>
      </article>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">评论 ({comments?.length || 0})</h2>

        <div className="mb-8">
          <CommentForm postId={post.id} />
        </div>

        {commentsLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg" />
            ))}
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {comment.author.avatar && (
                      <img
                        src={comment.author.avatar}
                        alt={comment.author.name || ''}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    <CardDescription>
                      {comment.author.name} •{' '}
                      {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">还没有评论</p>
        )}
      </div>
    </div>
  );
}
