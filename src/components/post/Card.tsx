import React from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'
import { type RouterOutputs } from '~/utils/api'
import { useUpload } from '~/hooks'

type CardProps = RouterOutputs['user']['getReadingList'][0]

const Card: FC<CardProps> = ({
  post: {
    title,
    description,
    featuredImage,
    slug: postSlug,
    createdAt,
    author: {
      name,
      username,
      image
    },
  },
}) => {
  const { getFullPath } = useUpload()
  return (
    <div className='group flex items-center space-x-4'>
      <div className='aspect-square transform h-full w-2/5 rounded-xl bg-gray-300'>
        {
          featuredImage && (
            <Image
              src={getFullPath(featuredImage ?? '')}
              alt={`post-${postSlug}`}
              fill
              className='rounded-xl'
            />
          )
        }
      </div>
      <div className='flex w-3/5 flex-col space-y-2'>
        <div className='text-sm font-semibold decoration-indigo-600 group-hover:underline'>
          {title}
        </div>
        <div className='truncate text-xs'>
          {description}
        </div>
        <div className='flex w-full items-center space-x-2'>
          <div className='relative h-8 w-8 rounded-full bg-gray-300'>
            <Image
              src={image ?? '/avatar.png'}
              fill
              alt={`user-${username}`}
              className='rounded-full'
            />
          </div>
          <div className='text-xs'>
            {name} &#x2022;
          </div>
          <div className='text-xs'>
            {format(createdAt, 'dd/MM/yyyy')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card