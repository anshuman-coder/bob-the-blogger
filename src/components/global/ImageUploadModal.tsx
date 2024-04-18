import React, { useCallback, useState } from 'react'
import type { FC } from 'react'
import { Button, Modal } from '~/components/global'
import ImageDropZone from './ImageDropZone'
import Image from 'next/image'
import { ImageUp, XCircle } from 'lucide-react'

interface ImageUploadModalProps {
  refId?: string
  isOpen: boolean
  onResolve: () => void
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({ isOpen, onResolve }) => {

  const [image, setImage] = useState<Blob>()

  const handleClose = useCallback(() => {
    setImage(undefined)
    onResolve()
  }, [onResolve])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Upload a feature Image'
    >
      <ImageDropZone
        onSelected={(file) => setImage(file)}
      >
        {({ getRootProps, getInputProps, newImage, onRemove }) => (
          <>
            <div
              {...getRootProps()}
              className='w-full h-full flex flex-col justify-center items-center cursor-pointer relative mt-5 pb-5'
            >
              {
                newImage ? 
                  <div className='relative'>
                    <Button
                      variant='unstyled'
                      icon
                      className='absolute -top-2 -right-4 flex justify-center items-center cursor-pointer'
                      onClick={(e) => {
                        e.stopPropagation()
                        setImage(undefined)
                        onRemove()
                      }}
                    >
                      <XCircle className='w-6 h-6' />
                    </Button>
                    <Image src={URL.createObjectURL(newImage)} alt='newImage' width={400} height={200} />
                  </div> 
                : (
                  <div className='w-full flex h-48 rounded-lg border border-solid border-gray-200 justify-center items-center gap-2'>
                    <ImageUp className='w-8 h-8' /> <p className='text-sm font-normal'>Upload Image from device</p>
                  </div>
                )
              }
            </div>
            <input {...getInputProps()} />
          </>
        )}
      </ImageDropZone>
      <div className='sticky w-full bottom-0 left-0 flex justify-end gap-x-4 p-4 bg-white border-t border-gray-300'>
        <Button
          variant='secondary'
          circled
          className='py-1.5 px-4'
          onClick={() => console.log(image)}
        >
          Upload
        </Button>
        <Button
          className='py-1.5 px-4'
          circled
          onClick={handleClose}
        >
          Skip
        </Button>
      </div>
    </Modal>
  )
}

export default ImageUploadModal