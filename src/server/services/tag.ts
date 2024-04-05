import type { Prisma } from '@prisma/client'
import { db } from '~/server/db'

export const createTag = async (data: Prisma.TagCreateInput, select?: Prisma.TagSelect) => {
  return db.tag.create({
    data,
    select,
  })
}

export const fetchTags = async (select?: Prisma.TagSelect, skip?: number, take?: number) => {
  return db.tag.findMany({
    skip,
    take,
    orderBy: {
      posts: { _count: 'desc' }
    },
    select: select,
  })
}