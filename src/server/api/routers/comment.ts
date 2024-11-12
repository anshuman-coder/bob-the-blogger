import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import * as Schema from '~/utils/schema'
import * as CommentService from '~/server/services/comment'

export const commentRouter = createTRPCRouter({
  like: protectedProcedure
    .input(Schema.LikeCommentSchema)
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const { commentId } = input
      return CommentService.likeComment(user.id, commentId)
    }),
})