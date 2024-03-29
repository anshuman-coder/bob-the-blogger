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