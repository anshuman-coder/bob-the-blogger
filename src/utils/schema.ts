import { z } from 'zod'

export const getSinglePost = z.object({
  slug: z.string().min(1),
})

export const PostQuery = z.object({
  cursor: z.string().nullish(),
  query: z.string().nullish(),
  tags: z.array(z.string()).min(0).nullish(),
  type: z.enum(['all', 'following']),
})

export const writeFormSchema = z.object({
  title: z.string().max(20).min(5),
  description: z.string().min(10),
  html: z.string().min(10),
})

export const CommentFormSchema = z.object({
  text: z.string().min(3, 'Write atleast a word!'),
})

export const LikeCommentSchema = z.object({
  commentId: z.string().min(1, 'commentId is important!'),
})