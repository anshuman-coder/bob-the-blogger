import type { Prisma } from '@prisma/client'
import type { Session } from 'next-auth'
import { db } from '~/server/db'
import { LIMIT } from '~/utils/constant'
import { type z } from 'zod'

import type * as Schema from '~/utils/schema'

type PostQueryType = z.infer<typeof Schema.PostQuery>

export const createPost = async (data: Prisma.PostCreateInput, select?: Prisma.PostSelect) => {
  return db.post.create({
    data: data,
    select: select,
  })
}

export const getPost = async (id: string, select?: Prisma.PostSelect) => {
  return db.post.findFirst({
    where: { id },
    select: select,
  })
}

export const updatePost = async (id: string, update: Prisma.PostUpdateInput, select?: Prisma.PostSelect) => {
  return db.post.update({
    where: { id },
    data: update,
    select: select,
  })
}

export const getPosts = async (filters: PostQueryType, session?: Session) => {
  const { cursor, query = '', tags = [], type = 'all' } = filters

  const querySeach: Prisma.PostWhereInput[] = [
    {
      title: {
        contains: query ?? '',
        mode: 'insensitive',
      },
    },
    {
      description: {
        contains: query ?? '',
        mode: 'insensitive',
      },
    },
    {
      author: {
        name: {
          contains: query ?? '',
          mode: 'insensitive',
        },
      },
    },
  ]
  const data = await db.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    cursor: cursor ? { id: cursor } : undefined,
    take: LIMIT + 1,
    where: {
      author: type === 'following' && session?.user.id ? {
        followings: {
          some: {
            followerId: session?.user.id,
          },
        },
      }: undefined,
      tags: (tags?.length) ? {
        some: {
          tagId: {
            in: tags,
          },
        },
      } : undefined,
      OR: querySeach,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      description: true,
      createdAt: true,
      featuredImage: true,
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
        },
      },
      bookmarks: session?.user?.id ? {
        where: {
          userId: session?.user.id,
        },
      } : false,
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              slug: true,
              name: true,
            },
          },
        },
      },
    },
  })

  let nextCursor: typeof cursor | undefined = undefined
  if(data.length > LIMIT) {
    const nextItem = data.pop()
    if(nextItem) nextCursor = nextItem.id
  }

  return { posts: data, nextCursor }
}

export const bookmarkPost = async (userId: string, postId: string) => {
  const whereClause: Prisma.BookmarkWhereInput = { userId, postId }
  const checkBookmark = await db.bookmark.findFirst({ where: whereClause })
  if(checkBookmark) {
    await db.bookmark.delete({
      where: {
        id: checkBookmark.id,
      },
    })
    return false
  } else {
    await db.bookmark.create({
      data: {
        userId,
        postId,
      },
    })

    return true
  }
}

export const likePost = async (userId: string, postId: string) => {
  const whereClause: Prisma.LikeWhereInput = { userId, postId, type: 'post' }
  const checkLike = await db.like.findFirst({ where: whereClause })

  if(checkLike) {
    await db.like.delete({
      where: { id: checkLike.id },
    })
    return false
  } else {
    await db.like.create({
      data: {
        userId,
        postId,
      },
    })

    return true
  }
}

export const getPostBySlug = async (slug: string, select: Prisma.PostSelect = {}) => {
  return db.post.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      authorId: true,
      title: true,
      description: true,
      slug: true,
      featuredImage: true,
      html: true,
      text: true,
      createdAt: true,
      updatedAt: true,
      tags: {
        select: {
          tag: {
            select: {
              id: true,
              name: true,
              description: true,
              slug: true,
            },
          },
        },
      },
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          image: true,
          role: true,
        },
      },
      ...select,
    },
  })
}