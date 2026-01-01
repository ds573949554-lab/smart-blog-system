'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('全局错误:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/60 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-6">⚠️</div>
          <h2 className="text-3xl font-bold mb-4 text-destructive">出错了</h2>
          <p className="text-muted-foreground mb-2">
            抱歉，页面加载时遇到了问题
          </p>
          {error.message && (
            <p className="text-sm text-muted-foreground mb-6 p-4 bg-muted rounded-lg">
              {error.message}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset} className="w-full sm:w-auto">
              重试
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <a href="/">返回首页</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
