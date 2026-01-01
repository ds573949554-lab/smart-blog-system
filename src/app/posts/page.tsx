'use client';

import { trpc } from '@/lib/trpc/client';
import { AnimatedPostCard } from '@/components/AnimatedPostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PostsPage() {
  const { data: posts, isLoading, error } = trpc.post.getAll.useQuery();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-destructive/10 border border-destructive rounded-lg p-6">
          <h2 className="text-lg font-semibold text-destructive mb-2">加载失败</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">成功案例</h1>
          <p className="text-muted-foreground">
            共 {posts?.length || 0} 个案例
          </p>
        </div>
        <Button asChild>
          <Link href="/posts/new">发布案例</Link>
        </Button>
      </div>

      {posts && posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <AnimatedPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">还没有案例</p>
          <Button asChild>
            <Link href="/posts/new">发布第一个案例</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
export { metadata } from "./metadata";
