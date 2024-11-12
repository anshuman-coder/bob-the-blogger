import { formatDistanceToNow } from 'date-fns'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import type { FC } from 'react'
import { Button } from '~/components/global'
import type { RouterOutputs } from '~/utils/api'

type CommentProps = RouterOutputs['post']['getComments']['data'][number]

const Comment: FC<CommentProps> = ({
  user,
  createdAt,
  text,
  likes,
}) => {

  const [isLike, setIsLike] = useState<boolean>(false)

  useEffect(() => {
    setIsLike(Boolean(likes.length))
  }, [likes])


  return (
    <div
      className='flex w-full flex-col space-y-2 border-b border-b-gray-300 pb-4 last:border-none'
    >
      <div className='w-full flex justify-between items-start'>
        <div className='flex w-full items-center space-x-2 text-xs'>
          <div className='relative h-8 w-8 rounded-full bg-gray-400'>
            <Image
              src={user.image ?? '/avatar.png'}
              alt={`user-${user.username}`}
              className='rounded-full'
              fill
            />
          </div>
          <div>
            <p className='font-semibold'>{user.name}</p>
            <p>{formatDistanceToNow(createdAt, { addSuffix: true })}</p>
          </div>
        </div>

        <div className='flex justify-center items-center'>
          <Button
            icon
            variant='unstyled'
          >
            {
              isLike ? (
                <Heart className='cursor-pointer text-xs text-red-600' fill='#dc2626'/>
              ) : (
                <Heart className='cursor-pointer text-xs text-red-600' />
              )
            }
          </Button>
        </div>
      </div>
      <div className='text-sm text-gray-600'>
        {text}
      </div>
    </div>
  )
}

export default Comment