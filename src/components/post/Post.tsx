import Image from 'next/image'
import React, { useState } from 'react'
import { format } from 'date-fns'
import { Button } from '~/components/global'
import { BookmarkCheck, BookmarkPlus } from 'lucide-react'

const Post = () => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  return (
    <div
      className='flex flex-col space-y-4 w-full border-b border-gray-300 pb-8 last:border-none'
    >
      {/* This has to be Next link */}
      <div
        className='group flex w-full cursor-pointer items-center space-x-2'
      >
        <div className='relative h-8 w-8 rounded-full bg-gray-400'>
          <Image
            src={'/avatar.png'}
            fill
            // this has to be name of the user
            alt='user-image'
            className='rounded-full'
          />
        </div>
        <div>
          <p className='font-semibold text-sm'>
            <span className='decoration-indigo-600 group-hover:underline'>Anshuman Singh</span>
            &#x2022;
            <span className='mx-1'>
              {format(new Date(), 'dd/MM/yyyy')}
            </span>
          </p>
          <p className='text-xs'>Founder, teacher & developer</p>
        </div>
      </div>
      {/* this has to be NEXT link */}
      <div className='group grid w-full h-44 grid-cols-12 gap-4 overflow-hidden'>
        <div className='col-span-8 flex h-full w-full flex-col gap-y-2'>
          <p className='text-xl font-semibold text-gray-800 decoration-indigo-600 group-hover:underline'>Hello World</p>
          <p className='h-full w-full max-w-lg truncate text-wrap text-xs text-gray-500'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry #&apos s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <div className='col-span-4'>
          <div className='h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer'>
            {/* post image will go here */}
          </div>
        </div>
      </div>
      <div>
        <div className='flex w-full items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            {
              Array.from({ length: 3 })
                .map((_, i) => 
                  (
                    <Button
                      key={i}
                      variant='secondary'
                      circled
                      className='py-1.5 px-4'
                      onClick={() => {
                        //redirect the user to specific tag page, where all the post related to that tag should be shown
                      }}
                    >
                      <p>tag {i}</p>
                    </Button>
                  )
                )
            }
          </div>
          <div className='cursor-pointer' onClick={() => setIsBookmarked(prev => !prev)}>
            {
              isBookmarked ? 
                <BookmarkCheck className='h-6 w-6' /> 
                : 
                <BookmarkPlus className='h-6 w-6' />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post