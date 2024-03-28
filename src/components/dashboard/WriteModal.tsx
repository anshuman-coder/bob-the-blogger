import React from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Modal } from '~/components/global'

interface WriteModalProps extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
}

const WriteModal: FC<WriteModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title='Write a post'>
      Anshuman
    </Modal>
  )
}

export default WriteModal