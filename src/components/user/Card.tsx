import React from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import { Button } from '~/components/global'
import { type RouterOutputs } from '~/utils/api'

type UserProps = RouterOutputs['user']['getUsers'][0]

const Card: FC<UserProps> = ({
  name,
  image,
  username,
}) => {
  return (
    <div
      className='flex flex-row items-center justify-between pr-16'
    >
      <div className='flex flex-row items-center gap-x-6'>
        <div className='relative h-8 w-8 rounded-full bg-gray-300'>
          <Image
            src={image ?? '/avatar.png'}
            fill
            alt={`user-${username}`}
            className='rounded-full'
          />
        </div>
        <div>
          <p className='text-sm font-bold text-gray-900'>{name}</p>
          <p className='text-xs'>{username}</p>
        </div>
      </div>
      <Button className='px-4'>Follow</Button>
    </div>
  )
}

export default Card