'use client';

import { useParams } from 'next/navigation';
import { trpc } from '@/lib/trpc/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CommentForm } from '@/components/CommentForm';
import Link from 'next/link';

export default function PostDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // 由于我们的 API 使用 ID 而不是 slug，这里需要先获取所有文章找到匹配的
  const { data: posts } = trpc.post.getAll.useQuery();
  const post = posts?.find((p) => p.slug === slug);

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
