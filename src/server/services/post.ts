import { type Prisma } from '@prisma/client'
import { db } from '~/server/db'

export const createPost = async (data: Prisma.PostCreateInput, select?: Prisma.PostSelect) => {
  return db.post.create({
    data: data,
    select: select,
  })
}