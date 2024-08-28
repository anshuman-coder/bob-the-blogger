import type { Prisma } from '@prisma/client'
import { db } from '~/server/db'
import { LIMIT } from '~/utils/constant'

export const getCommentsByPostId = async (id: string, select: Prisma.CommentSelect = {}, cursor?: string) => {
  const post = await db.post.findUnique({
    where: {
      id,
    },
    select: {
      _count: {
        select: {
          comments: true,
        },
      },
      comments: {
        orderBy: { createdAt: 'asc' },
        cursor: cursor ? { id: cursor } : undefined,
        take: LIMIT + 1,
        select: {
          id: true,
          text: true,
          user: {
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
        ...select,
      },
    },
  })

  if(!post) throw new Error('Post not found!')

  let nextCursor: typeof cursor | undefined = undefined
  if(post?.comments.length > LIMIT) {
    const nextItem = post?.comments.pop()
    if(nextItem) nextCursor = nextItem.id
  }

  return { data: post.comments ?? [], nextCursor, count: post._count.comments }
}

export const addComment = async (postId: string, userId: string, text: string) => {
  const data = await db.comment.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: postId } },
      text: text,
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
        },
      },
    },
  })

  return data
}