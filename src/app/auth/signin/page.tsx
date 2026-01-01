'use client';

import { signIn } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function SignInPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-gradient-text bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {t.auth.signInTitle}
          </CardTitle>
          <CardDescription>
            {t.auth.signInDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* GitHub 登录 - 暂时禁用 */}
          {/* <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => signIn('github', { callbackUrl: '/posts/new' })}
          >
            <Github className="h-5 w-5" />
            使用 GitHub 登录
          </Button> */}

          {/* Google 登录 */}
          <Button
            variant="outline"
            className="w-full gap-2"
            onClick={() => signIn('google', { callbackUrl: '/posts/new' })}
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.auth.signInWithGoogle}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t.auth.morePlatformsComing}
              </span>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>{t.auth.signInAgreement}</p>
            <p className="mt-1">
              <a href="/terms" className="underline hover:text-primary">
                {t.auth.termsOfService}
              </a>
              {' '}
              {t.auth.and}
              {' '}
              <a href="/privacy" className="underline hover:text-primary">
                {t.auth.privacyPolicy}
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
