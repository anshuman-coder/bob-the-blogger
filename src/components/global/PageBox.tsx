import React from 'react'
import type { ReactNode, FC } from 'react'
import clsx from 'clsx'
import Loader from './Loader'

interface PageBoxProps {
  isLoading?: boolean
  children: ReactNode
  header?: ReactNode
}

const PageBox: FC<PageBoxProps> = ({
  isLoading = false,
  children,
  header,
}) => {
  return (
    <main className={ clsx(
      'flex flex-col h-screen w-full justify-start items-center gap-y-5',
      isLoading && 'relative',
    ) }>
      {
        !isLoading ? (
          <>
            <header className='flex w-full h-20'>
              { header }
            </header>
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