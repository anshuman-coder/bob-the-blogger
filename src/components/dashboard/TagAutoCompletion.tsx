import { Combobox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ChevronsUpDown, CheckCircle } from 'lucide-react'
import clsx from 'clsx'
import type { Tag } from '@prisma/client'
import type { FC } from 'react'

interface TagAutoCompletionProps {
  tags: Tag[]
  onQueryChange: (query: string) => void
  onSelected: (tags: Tag[]) => void
  query?: string
  selectedTags: Tag[]
}

const TagAutoCompletion: FC<TagAutoCompletionProps> = ({ tags = [], onQueryChange, query = '', onSelected, selectedTags }) => {
  return (
    <Combobox
      value={selectedTags}
      onChange={onSelected}
      multiple
    >
      <div className='relative mt-1 w-full'>
        <div className='relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm'>
          <Combobox.Input
            className='w-full border-gray-400 px-4 py-2 pr-10 text-sm leading-5 text-gray-900 outline-none focus:ring-0'
            type='text'
            onChange={(e) => onQueryChange(e.target.value)}
            displayValue={(tag: { name: string }) => tag.name}
          />
          <Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
            <ChevronsUpDown className='h-5 w-5 text-gray-400' aria-hidden='true' />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Combobox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {
              tags?.length === 0 && query && (
                <p className='relative cursor-default select-none py-2 px-4 text-gray-700'>
                  No Record found
                </p>
              )
            }
            {
              tags?.filter(t => !selectedTags?.map(st => st.id)?.includes(t.id))?.map((tag, i) => (
                <Combobox.Option
                  key={i}
                  className={({ active }) => clsx(
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                    active ? 'bg-teal-600 text-white' : 'text-gray-900',
                  )}
                  value={tag}
                >
                  {
                    ({ selected, active }) => (
                      <>
                        <span className={clsx(
                          'block truncate',
                          selected ? 'font-medium' : 'font-normal'
                        )}>
                          <p>{tag.name}</p>
                        </span>
                        {
                          selected && (
                            <span className={
                              clsx(
                                'absolute inset-y-0 left-0 flex items-center pl-3',
                                active ? 'text-white' : 'text-teal-600'
                              )
                            }>
                              <CheckCircle className='w-5 h-5' aria-hidden='true' />
                            </span>
                          )
                        }
                      </>
                    )
                  }
                </Combobox.Option>
              ))
            }
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  )
}

export default TagAutoCompletion