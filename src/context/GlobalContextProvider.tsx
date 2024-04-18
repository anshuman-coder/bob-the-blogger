import React, { createContext, useCallback, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { WriteModal } from '~/components/dashboard'
import ImageUploadModal from '~/components/global/ImageUploadModal'

interface GlobalContextSchema {
  isWriteOpen: boolean
  setIsWriteOpen: (bool: boolean) => void
  isImageOpen: boolean
  openImageUpload: (bool: boolean, refId?: string) => void
}

export const GlobalContext = createContext<GlobalContextSchema>(null as unknown as GlobalContextSchema)

const GlobalContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isWriteOpen, setIsWriteOpen] = useState<boolean>(false)
  const [openImgModal, setOpenImgModal] = useState<boolean>(false)
  const [refImageId, setRefImageId] = useState<string | undefined>('')

  const handleImageModal = useCallback((isOpen: boolean, refId?: string,) => {
    setRefImageId(refId)
    setOpenImgModal(isOpen)
  }, [])

  return (
    <GlobalContext.Provider 
      value={{
        isWriteOpen,
        setIsWriteOpen,
        isImageOpen: openImgModal,
        openImageUpload: handleImageModal 
      }}
    >
      {children}
      <WriteModal isOpen={isWriteOpen} setIsOpen={setIsWriteOpen} onCreate={handleImageModal} />
      <ImageUploadModal
        refId={refImageId}
        isOpen={openImgModal}
        onResolve={() => handleImageModal(false)}
      />
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider