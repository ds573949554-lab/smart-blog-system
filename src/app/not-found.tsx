import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="text-8xl mb-6">404</div>
          <h2 className="text-3xl font-bold mb-4">页面未找到</h2>
          <p className="text-muted-foreground mb-8">
            抱歉，您访问的页面不存在
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href="/">返回首页</Link>
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/posts">查看案例</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
