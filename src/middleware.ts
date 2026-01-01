export { default } from 'next-auth/middleware';

// 保护需要登录的路由
export const config = {
  matcher: [
    '/posts/new',
    '/posts/edit/:path*',
    '/api/posts/create',
  ],
};
