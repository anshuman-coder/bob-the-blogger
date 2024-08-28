import React, { useState } from 'react'
import type { FC } from 'react'
import Dropzone from 'react-dropzone'
import type { Accept, DropzoneProps, DropzoneState } from 'react-dropzone'
import toast from 'react-hot-toast'

type ExtendedDropzoneState = DropzoneState & {
  isCropping?: boolean
  newImage?: Blob
  onRemove: () => void
}

interface ImageDropZoneProps extends DropzoneProps {
  onSelected: (blob: Blob) => void
  children(state: ExtendedDropzoneState): JSX.Element;
  accept?: Accept // default: 'image/jpg, image/png, image/jpeg'
}

// 'image/jpg, image/png, image/jpeg',
const ImageDropZone: FC<ImageDropZoneProps> = ({
  onSelected,
  accept = {
    'image/jpg': ['.png', '.jpeg', '.jpg'],
    'image/png': ['.png', '.jpeg', '.jpg'],
    'image/jpeg': ['.png', '.jpeg', '.jpg'],
  },
  children,
  ...props
}) => {

  const [newImage, setNewImage] = useState<Blob>()

  const handleDrop = async (files: File[]) => {
    if(files.length === 0) {
      const acceptedFileTypes =
      accept ?
        typeof accept === 'string' ?
          accept
          :
          Object.keys(accept).join(', ')
        :
        ''
      toast.error(`Please upload valid a file ${acceptedFileTypes}`)
      return
    }

    if(files.length > 1) {
      toast.error('You can upload only one image')
    }

    const _file = files[0]
    if(!_file) {
      toast.error('Invalid file type!')
      return
    }

    _file.arrayBuffer().then(ab => {
      const blob = new Blob([new Uint8Array(ab)], { type: _file.type })
      setNewImage(blob)
      onSelected(blob)
    })
      .catch(err => console.error(err))
  }
  const handleRemove = () => {
    setNewImage(undefined)
  }
  return (
    <Dropzone
      onDrop={handleDrop}
      accept={accept}
      {...props}
    >
      {
        (dropProps) => (
          children({
            ...dropProps,
            newImage,
            onRemove: handleRemove,
          })
        )
      }
    </Dropzone>
  )
}

export default ImageDropZone