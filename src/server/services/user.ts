import type { User, Prisma } from '@prisma/client'
import { db } from '~/server/db'

export const getUserByAttribute = async (attribs: keyof User, value: Prisma.UserWhereInput[keyof Prisma.UserWhereInput], select?: Prisma.UserSelect) => {
  return db.user.findFirst({
    where: {
      [attribs]: value
    },
    select: select,
  })
}

export const createUser = async (data: Prisma.UserCreateInput, select?: Prisma.UserSelect) => {
  return db.user.create({
    data: data,
    select: select
  })
}

export const createAccountLink = async (data: Prisma.AccountCreateInput) => {
  return db.account.create({
    data: data
  }) 
}

export const getUsers = async (where?: Prisma.UserWhereInput, select?: Prisma.UserSelect, orderBy?: Prisma.UserOrderByWithRelationInput, paginate?: {
  skip: number
  take: number
  cursor?: string
}) => {
  return db.user.findMany({
    where: where ?? {},
    select: select ?? {},
    orderBy: orderBy ?? {},
    skip: paginate?.skip ?? undefined,
    take: paginate?.take ?? undefined,
  })
}

export const getUserBookmarks = async (userId: string) => {
  return db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      bookmarks: {
        select: {
          id: true,
          post: {
            select: {
              id: true,
              slug: true,
              title: true,
              description: true,
              featuredImage: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  image: true,
                }
              },
            },
          },
        }
      },
    },
  })
}