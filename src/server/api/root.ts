import * as routes from '~/server/api/routers'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: routes.postRouter,
  tag: routes.tagRouter,
  user: routes.UserRouter,
  comment: routes.commentRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter;
