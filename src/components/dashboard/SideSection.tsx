import React from 'react'
import type { FC } from 'react'
import { Card as PostCard } from '~/components/post'
import { Card as UserCard } from '~/components/user'

const SideSection: FC = () => {
  return (
    <aside className='col-span-4 flex flex-col space-y-2 items-center p-6 overflow-y-auto pb-40'>
      {/* people you may interested in */}
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          People you might be interested
        </h3>
        <div className='flex flex-col gap-y-4'>
          {
            Array.from({ length: 4 })
              .map((user, i) => (
                <UserCard key={i} />
              ))
          }
        </div>
      </div>
      {/* Bookmarked posts */}
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          My reading list
        </h3>
        <div className='flex flex-col space-y-8'>
          {
            Array.from({ length: 4 })
              .map((post, i) => (
                // this has to be next link
                <PostCard key={i} />
              ))
          }
        </div>
      </div>
    </aside>
  )
}

export default SideSection