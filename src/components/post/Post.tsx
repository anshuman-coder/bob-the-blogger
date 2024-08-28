import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import type { FC } from 'react'
import { format } from 'date-fns'
import { Button } from '~/components/global'
import { BookmarkCheck, BookmarkPlus } from 'lucide-react'
import { api, type RouterOutputs } from '~/utils/api'
import { useUpload } from '~/hooks'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'

type PostProps = RouterOutputs['post']['getPosts']['posts'][number]

const Post: FC<PostProps> = ({
  id: postId,
  author,
  createdAt,
  title,
  slug,
  description,
  featuredImage,
  tags,
  bookmarks,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(Boolean(Array.isArray(bookmarks) ? bookmarks.length : false))
  const { getFullPath } = useUpload()
  const router = useRouter()
  const { data: session } = useSession()

  const bookmarkAPI = api.post.bookmark.useMutation()

  const handleBookmark = useCallback(() => {
    if(!session?.user.id) {
      toast.error('Oops! It looks like you need to be signed in to bookmark this post.')
      return
    }
    bookmarkAPI.mutate({ postId })
    setIsBookmarked(prev => !prev)
  }, [bookmarkAPI, postId, session?.user.id])

  const redirectToTag = useCallback(async (_slug: string) => {
    await router.push(`/tag/$${_slug}`)
  }, [router])
  return (
    <div
      className='flex flex-col space-y-4 w-full border-b border-gray-300 my-8 pb-8 last:border-none'
    >
      <Link
        href={`/user/${author.username}`}
        className='group flex w-full cursor-pointer items-center space-x-2'
      >
        <div className='relative h-8 w-8 rounded-full bg-gray-400'>
          <Image
            src={author.image ?? '/avatar.png'}
            fill
            alt={`user-${author.username}`}
            className='rounded-full'
          />
        </div>
        <div>
          <p className='font-semibold text-sm'>
            <span className='decoration-indigo-600 group-hover:underline'>{author.name}</span>
            &#x2022;
            <span className='mx-1'>
              {format(createdAt, 'dd/MM/yyyy')}
            </span>
          </p>
          <p className='text-xs'>Founder, teacher & developer</p>
        </div>
      </Link>
      <Link
        href={`/post/${slug}`}
        className='group grid w-full h-44 grid-cols-12 gap-4 overflow-hidden'
      >
        <div className='col-span-8 flex h-full w-full flex-col gap-y-2'>
          <p className='text-xl font-semibold text-gray-800 decoration-indigo-600 group-hover:underline'>{title}</p>
          <p className='h-full w-full max-w-lg truncate text-wrap text-xs text-gray-500'>
            {description}
          </p>
        </div>
        <div className='col-span-4'>
          <div className='h-full w-full transform rounded-xl bg-gray-300 transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer'>
            {
              featuredImage && (
                <Image
                  src={getFullPath(featuredImage)}
                  alt={`post-${title}`}
                  fill
                  className='rounded-xl'
                />
              )
            }
          </div>
        </div>
      </Link>
      <div>
        <div className='flex w-full items-center justify-between space-x-2'>
          <div className='flex items-center space-x-2'>
            {
              tags?.map(({ tag: { name, slug: tagSlug } }, i) => (
                <Button
                  key={i}
                  variant='secondary'
                  circled
                  className='py-1.5 px-4'
                  onClick={() => redirectToTag(tagSlug)}
                >
                  <p>{name}</p>
                </Button>
              ))
            }
          </div>
          <Button
            variant='unstyled'
            icon
            onClick={handleBookmark}
          >
            {
              isBookmarked ?
                <BookmarkCheck className='h-6 w-6' />
                :
                <BookmarkPlus className='h-6 w-6' />
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Post