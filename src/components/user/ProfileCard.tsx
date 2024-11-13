import React, { FC, useCallback } from 'react'
import { type RouterOutputs } from '~/utils/api'
import {
  Avatar,
  Button,
} from '~/components/global'
import { Share2 } from 'lucide-react'
import { env } from '~/env'
import toast from 'react-hot-toast'

export type UserRouterReturnType = RouterOutputs['user']['getProfile']

interface ProfileCardProp {
  profile: UserRouterReturnType
}

const ProfileCard: FC<ProfileCardProp> = ({
  profile,
}) => {

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(
      `${env.NEXT_PUBLIC_CLIENT_URL}/user/${profile?.username}`,
    )
    toast.success('URL copied 🥳')
  }, [profile])

  return (
    <div className='grid w-full grid-rows-2 rounded-xl bg-white shadow-md'>
      <div className='relative w-full max-h-48 rounded-t-xl bg-gradient-to-tr from-grad-from via-grad-via to-grad-to'>
        <div className='absolute left-10 -bottom-10'>
          <Avatar
            size='l'
            alt={`user-${profile?.username}`}
            url={profile?.image}
          />
        </div>
      </div>
      <div className='w-full flex flex-col justify-start items-start px-12 pt-6 pb-5 space-y-4'>
        <div className='flex justify-center items-end gap-x-10'>
          <p className='text-3xl font-semibold text-gray-800'>{profile?.name}</p>
          <Button
            className='px-4 !py-1'
          >
            Follow
          </Button>
        </div>
        <p className='text-xl text-gray-500'>@{profile?.username}</p>
        <p className='text-base text-gray-500'>{profile?._count?.posts} posts</p>
        <Button
          variant='primary'
          type='button'
          startIcon={<Share2 className='w-4 h-4' />}
          className='text-gray-500 border border-gray-500 hover:border-gray-900 hover:text-gray-900 active:scale-95 transition-all duration-300 transform'
          onClick={handleShare}
        >
          <p>Share profile</p>
        </Button>
      </div>
    </div>
  )
}

export default ProfileCard