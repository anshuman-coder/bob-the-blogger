import React, { useCallback, useMemo, useState } from 'react'
import type { FC, PropsWithChildren } from 'react'
import { Modal, Input, Button } from '~/components/global'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { api } from '~/utils/api'
import toast from 'react-hot-toast'
import TagModal from './TagModal'
import TagAutoCompletion from './TagAutoCompletion'
import { debounce } from 'lodash'
import type { Tag } from '@prisma/client'

interface WriteModalProps extends PropsWithChildren {
  isOpen: boolean
  setIsOpen: (bool: boolean) => void
  onCreate: (bool: boolean, refId?: string) => void
}

export const writeFormSchema = z.object({
  title: z.string().max(20).min(5),
  description: z.string().min(10),
  html: z.string().min(10),
})

export type WriteFormType = z.infer<typeof writeFormSchema>

const WriteModal: FC<WriteModalProps> = ({ isOpen, setIsOpen, onCreate }) => {

  const [openTagForm, setOpenTagForm] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])

  const createPost = api.post.create.useMutation()
  const { data: tags } = api.tag.getTags.useQuery({
    query: searchQuery
  })

  const handleQueryChange = (_query: string) => {
    setSearchQuery(_query)
  }

  const onQueryChange = useMemo(
    () => debounce(handleQueryChange, 350), []
  ) 

  const handleSelectTag = (_tags: Tag[]) => {
    setSelectedTags(_tags)
  }

  const handleRemoveTag = useCallback((tag: Tag) => {
    setSelectedTags((prev) => prev.filter(_tag => _tag.id !== tag.id))
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WriteFormType>({
    resolver: zodResolver(writeFormSchema),
    defaultValues: {
      description: '',
      title: '',
      html: ''
    }
  })

  const handleClose = useCallback(() => {
    reset()
    setIsOpen(false)
    setSelectedTags([])
    setOpenTagForm(false)
  }, [reset, setIsOpen])

  const onSubmit = useCallback((data: WriteFormType) => {
    return toast.promise<string>(
      new Promise((res, rej) => {
        const newData = {
          ...data,
          tags: selectedTags.length > 0 ? selectedTags.map(t => t.id) : []
        }
        createPost.mutate(newData, {
          onSuccess: (post) => {
            onCreate(true, post.id)
            res('Post created successfuly!')
          },
          onError: (err) => {
            rej(err?.message ?? 'Something went wrong!')
          },
          onSettled: () => handleClose()
        })
      }),
      {
        loading: 'Creating...',
        success: (msg) => `${msg}`,
        error: (err) => `${err}`
      }
    )
  }, [createPost, handleClose, onCreate, selectedTags])

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title='Write a post'
    >
      <TagModal isOpen={openTagForm} onClose={() => setOpenTagForm(false)} />
      <div className='my-2 flex w-full items-center gap-x-2'>
        <TagAutoCompletion
          tags={tags ?? []}
          query={searchQuery}
          onQueryChange={onQueryChange}
          onSelected={handleSelectTag}
          selectedTags={selectedTags}
        />
        <Button type='button' variant='secondary' className='px-4 text-nowrap' circled onClick={() => setOpenTagForm(true)}>Create tag</Button>
      </div>
      <div className='w-full flex flex-wrap items-center justify-start'>
        {
          selectedTags?.map((tag) => (<Button key={tag.id} variant='primary' circled className='px-4' onClick={() => handleRemoveTag(tag)}>{tag.name}</Button>))
        }
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-full flex flex-col items-center justify-center space-y-2 pb-20 overflow-y-auto pt-5'>
          <Controller
            name='title'
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type='text'
                containerClass='h-full w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-gray-600'
                className='pl-1 placeholder:text-lg text-xl'
                placeholder='Title of the blog'
                value={value}
                onChange={onChange}
              />
            )}
          />
          <p className='w-full pb-2 text-left text-sm text-red-500'>
            {errors?.title?.message}
          </p>
          <Controller
            control={control}
            name='description'
            render={({ field: { value, onChange } }) => (
              <Input
                type='text'
                containerClass='h-full w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-gray-600'
                className='pl-1 placeholder:text-base'
                placeholder='Short Description about the blog'
                value={value}
                onChange={onChange}
              />
            )}
          />
          <p className='w-full pb-2 text-left text-sm text-red-500'>
            {errors?.description?.message}
          </p>
          <Controller
            name='html'
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className='w-full'>
                <ReactQuill
                  theme='snow'
                  placeholder='Write the blog body here'
                  className='h-32'
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          />
        </div>
        <div className='sticky w-full bottom-0 left-0 flex justify-end gap-x-4 p-4 bg-white border-t border-gray-300'>
          <Button
            variant='secondary'
            type='submit'
            className='py-1.5 px-4'
            circled
            disabled={createPost.isLoading}
          >
            Publish
          </Button>
          <Button
            className='py-1.5 px-4'
            circled
            onClick={handleClose}
            type='button'
            disabled={createPost.isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default WriteModal