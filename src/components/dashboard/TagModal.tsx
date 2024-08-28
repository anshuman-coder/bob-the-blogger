import React, { useCallback } from 'react'
import type { FC } from 'react'
import { Input, Modal, Button } from '~/components/global'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'

export const CreateTagSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
})
interface TagModalProps {
  isOpen: boolean
  onClose: () => void
}


const TagModal: FC<TagModalProps> = ({ isOpen, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof CreateTagSchema>>({
    resolver: zodResolver(CreateTagSchema),
  })

  const createTag = api.tag.create.useMutation()

  const handleClose = useCallback(() => {
    reset()
    onClose()
  }, [onClose, reset])

  const onSubmit = useCallback((data: z.infer<typeof CreateTagSchema>) => {
    return toast.promise<string>(
      new Promise((res, rej) => {
        createTag.mutate(data, {
          onSuccess: () => res('Tag successfully created 🥳'),
          onError: (err) => {
            rej(err?.message ?? 'Something went wrong!')
          },
          onSettled: () => handleClose(),
        })
      }),
      {
        loading: 'Creating...',
        success: (msg) => `${msg}`,
        error: (err) => `${err}`,
      },
    )
  }, [createTag, handleClose])

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='Create tag'>
      <form
        className='relative flex flex-col items-center justify-center space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name='name'
          render={({ field: { value, onChange } }) => (
            <Input
              type='text'
              containerClass='h-full w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-gray-600'
              className='pl-1 placeholder:text-lg text-xl'
              value={value}
              onChange={onChange}
            />
          )}
        />
        <p className='w-full pb-2 text-left text-sm text-red-500'>
          {errors?.name?.message}
        </p>
        <Controller
          control={control}
          name='description'
          render={({ field: { value, onChange } }) => (
            <Input
              type='text'
              containerClass='h-full w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-gray-600'
              className='pl-1 placeholder:text-lg text-xl'
              value={value}
              onChange={onChange}
            />
          )}
        />
        <p className='w-full pb-2 text-left text-sm text-red-500'>
          {errors?.description?.message}
        </p>
        <div className='sticky w-full bottom-0 left-0 flex justify-end gap-x-4 p-4 bg-white border-t border-gray-300'>
          <Button
            variant='secondary'
            type='button'
            className='py-1.5 px-4'
            circled
            onClick={handleSubmit(onSubmit)}
          >
            Create
          </Button>
          <Button
            className='py-1.5 px-4'
            circled
            type='button'
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default TagModal