import type { Prisma } from '@prisma/client'
import { db } from '~/server/db'
import { LIMIT } from '~/utils/constant'

export const getCommentsByPostId = async (id: string, select: Prisma.CommentSelect = {}, userId?: string, cursor?: string) => {
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
          likes: userId ? {
            where: {
              user: {
                id: userId,
              },
              type: 'comment',
            },
          } : false,
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

export const likeComment = async (userId: string, commentId: string) => {
  const whereClause: Prisma.LikeWhereInput = {
    userId,
    commentId,
    type: 'comment',
  }

  const checkLike = await db.like.findFirst({ where: whereClause })
  if(checkLike) {
    await db.like.delete({
      where: { id: checkLike.id },
    })
    return false
  } else {
    await db.like.create({
      data: {
        user: { connect: { id: userId } },
        comment: { connect: { id: commentId } },
        type: 'comment',
      },
    })

    return true
  }
}