import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '~/server/api/trpc'
import * as PostService from '~/server/services/post'
import * as UploadService from '~/server/services/upload'
import * as CommentService from '~/server/services/comment'
import { genPostSlug } from '~/utils/genSlug'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import * as Schema from '~/utils/schema'


export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(Schema.writeFormSchema.extend({ tags: z.array(z.string()).min(0) }))
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
        },
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
        featuredImage: true,
      })
      if(!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found!',
        })
      }
      if(user.id !== post?.authorId) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'You are not authorized to edit this post!',
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
            },
          },
          title: true,
          description: true,
          slug: true,
          featuredImage: true,
          html: true,
          text: true,
        })

        const path = post.featuredImage?.replace('feature_image', '')
        if(path) {
          await UploadService.deleteFiles('feature_image', [path])
        }

        return updated
      } catch (error) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Internal server error!',
        })
      }
    }),
  getPosts: publicProcedure
    .input(Schema.PostQuery)
    .query(async ({ input, ctx: { session } }) => {
      const { cursor, query, tags, type } = input
      const result = await PostService.getPosts({
        cursor,
        query,
        tags,
        type,
      }, session ?? undefined)
      return result
    }),
  getPost: publicProcedure
    .input(Schema.getSinglePost)
    .query(async ({ input, ctx }) => {
      const { slug } = input
      const { session } = ctx
      const post = await PostService.getPostBySlug(slug, {
        likes: session?.user?.id ? {
          where: { user: { id: session.user.id } },
        } : false,
      })
      if(!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Post not found!',
        })
      }
      return post
    }),
  bookmark: protectedProcedure
    .input(z.object({
      postId: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const { session: { user } } = ctx
      const { postId } = input

      return PostService.bookmarkPost(user.id, postId)
    }),
  like: protectedProcedure
    .input(z.object({
      postId: z.string().min(1, 'postId is required!'),
    }))
    .mutation(async ({ input, ctx }) => {
      const { postId } = input
      const { session: { user } } = ctx

      return PostService.likePost(user.id, postId)
    }),
  comment: protectedProcedure
    .input(Schema.CommentFormSchema.extend({
      postId: z.string().min(1),
    }))
    .mutation(async ({ input, ctx }) => {
      const { postId, text } = input
      const { session: { user } } = ctx

      return CommentService.addComment(postId, user.id, text)
    }),
  getComments: publicProcedure
    .input(z.object({
      postId: z.string().min(1, 'postId is required!'),
      cursor: z.string().nullish(),
    }))
    .query(async ({ input, ctx }) => {
      const { postId, cursor } = input
      const { session } = ctx

      const data = await CommentService.getCommentsByPostId(postId, {}, session?.user?.id, cursor ?? '')

      return data
    }),
  getCommentCount: publicProcedure
    .input(z.object({
      postId: z.string().min(1, 'postId is required!'),
    }))
    .query(async ({ input }) => {
      const { postId } = input

      const { count } = await CommentService.getCommentsByPostId(postId)
      return count
    }),
})
