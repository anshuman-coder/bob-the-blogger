import React from 'react'
import type { ReactNode, FC } from 'react'
import clsx from 'clsx'
import Loader from './Loader'
import Header from './Header'

interface PageBoxProps {
  isLoading?: boolean
  children: ReactNode
}

const PageBox: FC<PageBoxProps> = ({
  isLoading = false,
  children,
}) => {
  return (
    <main className={clsx(
      'flex flex-col h-screen w-full justify-start items-center gap-y-5',
      isLoading && 'relative',
    )}>
      {
        !isLoading ? (
          <>
            <Header />
            <section className='grid grid-cols-12'>
              {
                children
              }
            </section>
          </>
        ) : (
          <Loader />
        )
      }
    </main>
  )
}

export default PageBox