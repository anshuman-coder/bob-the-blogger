import { formatDistanceToNow } from 'date-fns'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'
import toast from 'react-hot-toast'
import { Button } from '~/components/global'
import { api, type RouterOutputs } from '~/utils/api'

type CommentProps = RouterOutputs['post']['getComments']['data'][number]

const Comment: FC<CommentProps> = ({
  id,
  user,
  createdAt,
  text,
  likes,
}) => {

  const [isLike, setIsLike] = useState<boolean>(false)

  const likeComment = api.comment.like.useMutation()

  useEffect(() => {
    setIsLike(Boolean(likes.length))
  }, [likes])


  const handleLike = useCallback(() => {
    return toast.promise<string>(
      new Promise((resolve, reject) => {
        const likeReq = { commentId: id }
        likeComment.mutate(likeReq, {
          onSuccess: (_like) => {
            setIsLike(_like)
            resolve(_like ? 'Comment liked!' : 'Comment disliked!')
          },
          onError: (err) => {
            reject(err?.message ?? 'Something went wrong!')
          },
        })
      }),
      {
        loading: 'Liking...',
        success: (msg) => `${msg}`,
        error: (err) => `${err}`,
      },
    )
  }, [id, likeComment])

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
            onClick={handleLike}
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