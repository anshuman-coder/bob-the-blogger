import type { Prisma } from '@prisma/client'
import { db } from '~/server/db'

export const getCommentsByPostId = async (id: string, select: Prisma.CommentSelect = {}) => {
  return db.post.findUnique({
    where: {
      id
    },
    select: {
      _count: {
        select: {
          comments: true,
        }
      },
      comments: {
        select: {
          id: true,
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
      }
    }
  })
}