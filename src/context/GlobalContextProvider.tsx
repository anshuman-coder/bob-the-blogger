import React, { createContext, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { WriteModal } from '~/components/dashboard'

interface GlobalContextSchema {
  isWriteOpen: boolean
  setIsWriteOpen: (bool: boolean) => void
}

export const GlobalContext = createContext<GlobalContextSchema>(null as unknown as GlobalContextSchema)

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWriteOpen, setIsWriteOpen] = useState<boolean>(false)
  return (
    <GlobalContext.Provider value={{ isWriteOpen, setIsWriteOpen }}>
      {children}
      <WriteModal isOpen={isWriteOpen} setIsOpen={setIsWriteOpen} />
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider