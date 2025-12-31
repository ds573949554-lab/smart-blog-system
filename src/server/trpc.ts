import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

/**
 * 初始化 tRPC
 */
const t = initTRPC.create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 导出可复用的 router 和 procedure
 */
export const router = t.router;
export const publicProcedure = t.procedure;
