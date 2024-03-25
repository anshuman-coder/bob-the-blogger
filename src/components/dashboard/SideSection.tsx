import React from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { Card as PostCard } from '~/components/post'

const SideSection: FC = () => {
  return (
    <aside className='col-span-4 flex flex-col space-y-2 items-center p-6 overflow-y-auto'>
      {/* people you may interested in */}
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          People you might be interested
        </h3>
        <div className='flex flex-col gap-y-4'>
          {
            Array.from({ length: 4 })
              .map((user, i) => (
                <PostCard key={i} />
              ))
          }
        </div>
      </div>
      {/* Bookmarked posts */}
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          My Reading List
        </h3>
        <div className='flex flex-col space-y-8'>
          {
            Array.from({ length: 4 })
              .map((post, i) => (
                // this has to be next link
                <div key={i} className='group flex items-center space-x-4'>
                  <div className='aspect-square h-full w-2/5 rounded-xl bg-gray-300' />
                  <div className='flex w-3/5 flex-col space-y-2'>
                    <div className='text-sm font-semibold decoration-indigo-600 group-hover:underline'>
                      Hello World
                    </div>
                    <div className='truncate text-xs'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry #&apos s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </div>
                    <div className='flex w-full items-center space-x-2'>
                      <div className='relative h-8 w-8 rounded-full bg-gray-300'>
                        <Image
                          src={'/avatar.png'}
                          fill
                          alt='user-image'
                          className='rounded-full'
                        />
                      </div>
                      <div className='text-xs'>
                        Anshuman Singh &#x2022;
                      </div>
                      <div className='text-xs'>
                        {format(new Date(), 'dd/MM/yyyy')}
                      </div>
                    </div>
                  </div>
                </div>
              ))
          }
        </div>
      </div>
    </aside>
  )
}

export default SideSection