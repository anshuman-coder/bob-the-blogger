import React from 'react'
import type { FC } from 'react'
import GlobalContextProvider from '~/context/GlobalContextProvider'
import { Toaster } from 'react-hot-toast'

const Level_1_providers: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GlobalContextProvider>
      <Toaster
        position='top-center'
      />
      {children}
    </GlobalContextProvider>
  )
}

export default Level_1_providers