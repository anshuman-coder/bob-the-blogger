import React from 'react'
import type { FC } from 'react'
import GlobalContextProvider from '~/context/GlobalContextProvider'

const Level_1_providers: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <GlobalContextProvider>
      {children}
    </GlobalContextProvider>
  )
}

export default Level_1_providers