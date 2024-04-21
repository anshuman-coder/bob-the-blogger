import { type Prisma } from '@prisma/client'
import { db } from '~/server/db'

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