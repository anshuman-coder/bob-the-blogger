import { PrismaAdapter } from '@auth/prisma-adapter'
import type { UserRole } from '@prisma/client'
import { type GetServerSidePropsContext } from 'next'
import {
  type DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from 'next-auth'
import { type Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

import { env } from '~/env'
import { db } from '~/server/db'
import * as UserService from '~/server/services/user'
import { genUserName } from '~/utils/genSlug'

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: DefaultSession['user'] & User
  }

  interface User extends DefaultUser {
    id: string;
    role: UserRole
    username: string
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user, account }) => {

      const _user = await UserService
        .getUserByAttribute(
          'email',
          user.email,
          {
            id: true,
            username: true,
            name: true,
            email: true,
            image: true,
            role: true,
          },
        )
      if(!_user) {
        //generate username and add to database
        const username = genUserName(user.name)
        const newUser = await UserService.createUser({
          username: username,
          email: user.email,
          name: user.name,
          image: user.image,
        })
        await UserService.createAccountLink({
          provider: account?.provider ?? '',
          type: account?.type ?? '',
          providerAccountId: account?.providerAccountId ?? '',
          access_token: account?.access_token ?? '',
          expires_at: account?.expires_at,
          scope: account?.scope ?? '',
          token_type: account?.token_type ?? '',
          id_token: account?.id_token ?? '',
          user: { connect: { id: newUser.id } },
        })
        return true
      }
      return true
    },
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        role: user?.role === 'admin' ? 'admin' : 'client',
      },
    }),
  },
  adapter: PrismaAdapter(db) as Adapter,
  secret: env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions)
}
