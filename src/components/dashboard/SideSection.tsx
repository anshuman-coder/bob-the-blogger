import { useSession, signIn } from 'next-auth/react'
import React, { useCallback } from 'react'
import type { FC } from 'react'
import { Card as PostCard } from '~/components/post'
import { Card as UserCard } from '~/components/user'
import { api } from '~/utils/api'
import { Button } from '../global'
import { LogIn } from 'lucide-react'

const SideSection: FC = () => {

  const { isSuccess: isInterestedSuccess, data: interestedUsers } = api.user.getUsers.useQuery()
  const { isSuccess: readingListSuccess, data: readingList } = api.user.getReadingList.useQuery()
  const { status } = useSession()

  const handleGoogleSignIn = useCallback(() => {
    signIn('google')
  }, [])

  return (
    <aside className='col-span-4 flex flex-col space-y-2 items-center p-6 overflow-y-auto pb-40'>
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          People you might be interested
        </h3>
        <div className='flex flex-col gap-y-4'>
          {
            status === 'authenticated' && isInterestedSuccess && interestedUsers.length > 0 && interestedUsers.map((user, i) => (
              <UserCard key={i} {...user} />
            ))
          }
          {
            status === 'unauthenticated' && (
              <div className='w-full flex flex-col justify-center items-center gap-4'>
                <p className='text-sm font-semibold text-orange-600'>Please Sign In to make it more interactive!</p>
                <Button
                  variant='primary'
                  type='button'
                  startIcon={<LogIn className='w-4 h-4' />}
                  onClick={handleGoogleSignIn}
                >
                  <p>Signin</p>
                </Button>
              </div>
            )
          }
        </div>
      </div>
      <div className='w-full m-0 p-0'>
        <h3 className='my-4 text-base font-semibold'>
          My reading list
        </h3>
        <div className='flex flex-col space-y-8'>
          {
            status === 'authenticated' && readingListSuccess && readingList.length > 0 && readingList.map((post, i) => (
              <PostCard key={i} {...post} />
            ))
          }
          {
            status === 'unauthenticated' && (
              <div className='w-full flex flex-col justify-center items-center gap-4'>
                <p className='text-sm font-semibold text-orange-600'>Please Sign In to make it more interactive!</p>
                <Button
                  variant='primary'
                  type='button'
                  startIcon={<LogIn className='w-4 h-4' />}
                  onClick={handleGoogleSignIn}
                >
                  <p>Signin</p>
                </Button>
              </div>
            )
          }
        </div>
      </div>
    </aside>
  )
}

export default SideSection