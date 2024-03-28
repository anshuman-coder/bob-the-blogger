import React from 'react'
import type { FC } from 'react'
import { Modal } from '~/components/global'

interface TagModalProps {
  isOpen: boolean
  onClose: () => void
}

const TagModal: FC<TagModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Tag Form'>
      Tag Form
    </Modal>
  )
}

export default TagModal