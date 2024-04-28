import type { Prisma } from '@prisma/client'
import type { Session } from 'next-auth'
import { db } from '~/server/db'
import { LIMIT } from '~/utils/constant'

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

export const getPosts = async (cursor?: string, session?: Session) => {
  console.log(session)
  const data = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    cursor: cursor ? { id: cursor } : undefined,
    take: LIMIT + 1,
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
    //if yes then remove bookmark and return false
    await db.bookmark.delete({
      where: {
        id: checkBookmark.id
      }
    })
    return false
  } else {
    //if no bookmark the post and return true
    await db.bookmark.create({
      data: {
        userId,
        postId
      }
    })

    return true
  }
}