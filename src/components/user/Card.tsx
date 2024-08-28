import React, { useCallback, useState } from 'react'
import type { FC } from 'react'
import Image from 'next/image'
import { Button } from '~/components/global'
import { api, type RouterOutputs } from '~/utils/api'
import toast from 'react-hot-toast'
import clsx from 'clsx'

type UserProps = RouterOutputs['user']['getUsers'][0]

const Card: FC<UserProps> = ({
  id: userId,
  name,
  image,
  username,
  followings,
}) => {
  const followUser = api.user.follow.useMutation()
  const [following, setFollowing] = useState<boolean>(Boolean(Array.isArray(followings) ? followings.length : false))

  const handleFollow = useCallback(() => {
    followUser.mutate({ followingId: userId }, {
      onSuccess: (data) => {
        toast.success(data ? `You started following ${username}` : `You unfollowed ${username}`)
        setFollowing(data)
      },
      onError: err => {
        toast.error(err.message)
      },
    })
  }, [followUser, userId, username])

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
      <Button
        isLoading={followUser.isLoading}
        onClick={handleFollow}
        className={
          clsx(
            followUser.isLoading ? '!px-6 !py-4' : 'px-4',
          )
        }
      >
        {following ? 'Following' : 'Follow'}
      </Button>
    </div>
  )
}

export default Card