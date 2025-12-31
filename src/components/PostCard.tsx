'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    slug: string;
    createdAt: Date;
    author: {
      id: string;
      name: string | null;
      email: string;
    };
    _count?: {
      comments: number;
    };
  };
}

export function PostCard({ post }: PostCardProps) {
  const excerpt = post.content.length > 150
    ? post.content.substring(0, 150) + '...'
    : post.content;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/posts/${post.slug}`} className="hover:text-primary">
            {post.title}
          </Link>
        </CardTitle>
        <CardDescription>
          由 {post.author.name || post.author.email} 发布于{' '}
          {new Date(post.createdAt).toLocaleDateString('zh-CN')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          {post._count?.comments || 0} 条评论
        </span>
        <Button variant="ghost" asChild>
          <Link href={`/posts/${post.slug}`}>阅读全文 →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
