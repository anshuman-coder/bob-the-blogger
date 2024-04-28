import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'
import { writeFormSchema } from '~/components/dashboard/WriteModal'
import * as PostService from '~/server/services/post'
import { genPostSlug } from '~/utils/genSlug'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const PostQuery = z.object({
  cursor: z.string().nullish(),
  query: z.string().nullish(),
})


export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(writeFormSchema.extend({ tags: z.array(z.string()).min(0) }))
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const slug = genPostSlug(input.title)
      return PostService.createPost(
        {
          author: { connect: { id: user.id } },
          title: input.title,
          description: input.description,
          slug,
          html: input.html,
          tags: input.tags.length > 0 ? {
            createMany: {
              data: input.tags.map(t => ({ tagId: t })),
              skipDuplicates: true,
            },
          } : undefined,
        }
      )
    }),
  updateFeatureImage: protectedProcedure
    .input(z.object({
      postId: z.string().min(1),
      imageUrl: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const { postId, imageUrl } = input
      const post = await PostService.getPost(postId, {
        id: true,
        authorId: true,
      })
      if(!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found!'
        })
      }
      if(user.id !== post?.authorId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to edit this post!'
        })
      }

      try {
        const updated = await PostService.updatePost(post.id, {
          featuredImage: imageUrl,
        }, {
          id: true,
          author: {
            select: {
              id: true,
              name: true,
              username: true,
            }
          },
          title: true,
          description: true,
          slug: true,
          featuredImage: true,
          html: true,
          text: true,
        })

        return updated
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Internal server error!'
        })
      }
    }),
  getPosts: publicProcedure
    .input(PostQuery)
    .query(async ({ input, ctx: { session } }) => {
      const { cursor, query } = input
      const result = await PostService.getPosts({
        cursor,
        query,
      }, session ?? undefined)
      return result
    }),
  bookmark: protectedProcedure
    .input(z.object({
      postId: z.string().min(1)
    }))
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const { postId } = input

      return PostService.bookmarkPost(user.id, postId)
    })
});
