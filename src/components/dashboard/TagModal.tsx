import React from 'react'
import type { FC } from 'react'
import { Modal } from '~/components/global'
import { z } from 'zod'

export const CreateTagSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10)
})
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