import React from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import { Button } from '~/components/global'

const Card: FC = () => {
  return (
    <div
      className='flex flex-row items-center justify-between pr-16'
    >
      <div className='flex flex-row items-center gap-x-6'>
        <div className='relative h-8 w-8 rounded-full bg-gray-300'>
          <Image
            src={'/avatar.png'}
            fill
            alt='user-image'
            className='rounded-full'
          />
        </div>
        <div>
          <p className='text-sm font-bold text-gray-900'>Anshuman</p>
          <p className='text-xs'>anshuman-coder</p>
        </div>
      </div>
      <Button>Follow</Button>
    </div>
  )
}

export default Card