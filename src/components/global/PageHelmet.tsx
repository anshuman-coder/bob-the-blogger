import React from 'react'
import type { FC, ReactNode } from 'react'
import Head from 'next/head';

interface PageHelmetProps {
  title?: string
  children?: ReactNode
}

const PageHelmet: FC<PageHelmetProps> = ({ title = '', children }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content='Blog regarding anything' />
      <link rel='icon' href='/favicon.ico' />
      {children}
    </Head>
  )
}

export default PageHelmet