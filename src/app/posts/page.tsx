'use client';

import { trpc } from '@/lib/trpc/client';
import { AnimatedPostCard } from '@/components/AnimatedPostCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function PostsPage() {
  const { t } = useI18n();
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
          <h2 className="text-lg font-semibold text-destructive mb-2">{t.posts.loadFailed}</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t.posts.title}</h1>
          <p className="text-muted-foreground">
            {t.posts.totalCount.replace('{count}', String(posts?.length || 0))}
          </p>
        </div>
        <Button asChild>
          <Link href="/posts/new">{t.posts.createButton}</Link>
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
          <p className="text-muted-foreground mb-4">{t.posts.noCases}</p>
          <Button asChild>
            <Link href="/posts/new">{t.posts.createFirst}</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
