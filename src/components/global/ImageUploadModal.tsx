import React, { useCallback, useState } from 'react'
import type { FC } from 'react'
import { Button, Modal } from '~/components/global'
import ImageDropZone from './ImageDropZone'
import Image from 'next/image'
import { ImageUp, XCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '~/utils/api'
import { useUpload } from '~/hooks'
import clsx from 'clsx'

interface ImageUploadModalProps {
  refId?: string
  imageUrl?: string
  isOpen: boolean
  onResolve: (url: string) => void
}

const ImageUploadModal: FC<ImageUploadModalProps> = ({
  isOpen, onResolve, refId, imageUrl = '',
}) => {

  const { upload, isLoading: isUploading } = useUpload()

  const uploadFeatureImage = api.post.updateFeatureImage.useMutation()

  const [image, setImage] = useState<Blob>()

  const handleClose = useCallback((url?: string) => {
    setImage(undefined)
    onResolve(url ?? '')
  }, [onResolve])

  const handleUpload = async (_image: Blob | undefined) => {
    if(_image && refId) {

      await upload({
        _file: _image,
        _for: 'post',
        _refId: refId,
      }, async ({ data: imageData, error }) => {
        if(error) {
          toast.error(error.message)
          return
        }

        await toast.promise<string>(
          new Promise((res, rej) => {
            const edit = {
              postId: refId,
              imageUrl: imageData.fullPath,
            }
            uploadFeatureImage.mutate(edit, {
              onSuccess: (post) => {
                res('Image uploaded successfully!')
                handleClose(post.featuredImage ?? '')
              },
              onError: (err) => {
                rej(err.message)
              },
            })
          }),
          {
            loading: 'Uploading...',
            success: (msg) => `${msg}`,
            error: (err) => `${err}`,
          },
        )
      })
      return
    }
    toast.error('No image selected!')
    return
  }

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
                    <Image src={URL.createObjectURL(newImage) ?? imageUrl} alt='newImage' width={400} height={200} />
                  </div>
                  : (
                    <div className={clsx(
                      !imageUrl && 'w-full flex h-48 rounded-lg border border-solid border-gray-200 justify-center items-center gap-2',
                      imageUrl && 'relative',
                    )}>
                      {
                        imageUrl ? (
                          <Image src={imageUrl} alt='newImage' width={400} height={200} />
                        ) : (
                          <>
                            <ImageUp className='w-8 h-8' /> <p className='text-sm font-normal'>Upload Image from device</p>
                          </>
                        )
                      }
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
          onClick={() => handleUpload(image)}
          isLoading={isUploading}
        >
          Upload
        </Button>
        <Button
          className='py-1.5 px-4'
          circled
          onClick={() => handleClose()}
          isLoading={isUploading}
        >
          {imageUrl ? 'Cancel' : 'Skip'}
        </Button>
      </div>
    </Modal>
  )
}

export default ImageUploadModal