import { router } from '../trpc';
import { postRouter } from './post';
import { userRouter } from './user';
import { commentRouter } from './comment';

/**
 * 主路由 - 合并所有子路由
 */
export const appRouter = router({
  post: postRouter,
  user: userRouter,
  comment: commentRouter,
});

// 导出路由类型
export type AppRouter = typeof appRouter;
