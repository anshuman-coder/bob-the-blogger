import {
  createTRPCRouter,
  protectedProcedure,
} from '~/server/api/trpc'
import * as UserService from '~/server/services/user'

export const UserRouter = createTRPCRouter({
  getUsers: protectedProcedure
    .query(async ({ ctx }) => {
      const { session: { user } } = ctx
      const data = await UserService.getUsers({
        id: {
          not: user.id
        },
        //following condition,
      }, {
        id: true,
        name: true,
        image: true,
        username: true,
      }, { posts: { _count: 'desc' } }, { skip: 0, take: 4 })
      return data ?? []
    }),
  getReadingList: protectedProcedure
    .query(async ({ ctx }) => {
      const { session: { user } } = ctx
      const data = await UserService.getUserBookmarks(user.id)

      return data?.bookmarks ?? []
    })
})