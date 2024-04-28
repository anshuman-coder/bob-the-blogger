import { TRPCError } from '@trpc/server'
import { z } from 'zod'
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
        followings: user.id ? {
          where: {
            follower: { id: user.id }
          }
        } : false
      }, { posts: { _count: 'desc' } }, { skip: 0, take: 4 })
      return data ?? []
    }),
  getReadingList: protectedProcedure
    .query(async ({ ctx }) => {
      const { session: { user } } = ctx
      const data = await UserService.getUserBookmarks(user.id)

      return data?.bookmarks ?? []
    }),
  follow: protectedProcedure
    .input(z.object({
      followingId: z.string().min(1)
    }))
    .mutation(async ({ input, ctx }) => {
      const { followingId } = input
      const { session: { user } } = ctx
      if(user.id === followingId) {
        throw new TRPCError({ code: 'CONFLICT', message: 'User can\'t follow itself!' })
      }

      return UserService.followUser(user.id, followingId)
    })
})