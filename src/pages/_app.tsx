import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { Inter } from 'next/font/google'

import { api } from '~/utils/api'

import '~/styles/globals.css'
import { Level_1_providers } from '~/components/global'
import clsx from 'clsx'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Level_1_providers>
        <main className={
          clsx(
            'font-sans',
            inter.variable,
          )
        }>
          <Component {...pageProps} />
        </main>
      </Level_1_providers>
    </SessionProvider>
  )
}

export default api.withTRPC(MyApp)
