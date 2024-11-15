import { Heart, ImagePlus, MessageCircle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Loader, PageBox, PageHelmet } from '~/components/global'
import { useUpload, useWrite } from '~/hooks'
import { api } from '~/utils/api'
import { Interweave } from 'interweave'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { CommentSwiper } from '~/components/post'
import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

export default function Post() {
  const router = useRouter()
  const { openImageUpload } = useWrite()

  const { status, data: authSession } = useSession()
  const { getFullPath } = useUpload()

  const [isLike, setIsLike] = useState<boolean>(false)
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false)
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const { isLoading, data: post, isSuccess, refetch } = api.post.getPost.useQuery({
    slug: (router.query?.slug ?? '') as string,
  })

  const { data: followStatus } = api.user.isFollowing.useQuery({ followingId: post?.authorId ?? '' })

  const follow = api.user.follow.useMutation()

  const updateImage = useCallback(async () => {
    if(post?.id) {
      await openImageUpload(true, post.id, getFullPath(post.featuredImage ?? ''))
      void refetch()
    }
  }, [getFullPath, openImageUpload, post, refetch])

  const likePost = api.post.like.useMutation()

  const handleLike = useCallback(() => {
    if(post?.id) {
      return toast.promise<string>(
        new Promise((resolve, reject) => {
          const likeData = { postId: post.id }
          likePost.mutate(likeData, {
            onSuccess: (like) => {
              setIsLike(like)
              resolve(like ? 'Post Liked!' : 'Post Disliked!')
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
    }
  }, [likePost, post?.id])

  const handleFollow = useCallback((id: string) => {
    if(id) {
      follow.mutate({ followingId: id }, {
        onSuccess: (status) => {
          setIsFollowing(status)
          toast.success(status ? `You started following ${post?.author?.name}` : `You unfollowed ${post?.author?.name}`)
        },
        onError: err => {
          toast.error(err.message)
        },
      })
    }
  }, [follow, post])

  useEffect(() => {
    setIsFollowing(Boolean(followStatus))
    if(Array.isArray(post?.likes)) {
      setIsLike(Boolean(post.likes.length > 0))
    } else {
      setIsLike(Boolean(post?.likes))
    }
  }, [followStatus, post])

  return (
    <>
      <PageHelmet title={`Post | ${router?.query?.slug as string ?? ''}`} />
      <PageBox isLoading={Boolean(status === 'loading')}>
        {
          post?.id && (
            <CommentSwiper
              showComment={isCommentOpen}
              handleClose={() => setIsCommentOpen(false)}
              postId={post.id}
            />
          )
        }
        {
          status === 'authenticated' && isSuccess && (
            <div className='fixed bottom-10 flex w-full items-center justify-center'>
              <div className='group flex items-center justify-center gap-x-2 rounded-full border border-gray-400 bg-white px-3 py-1.5 shadow-xl transition duration-300 hover:border-gray-900'>
                <Button
                  icon
                  variant='unstyled'
                  className='!px-1'
                  onClick={handleLike}
                >
                  <div className='border-r pr-4 border-solid transition duration-300 group-hover:border-gray-900'>
                    {
                      isLike ? (
                        <Heart className='cursor-pointer text-xl text-red-600' fill='#dc2626'/>
                      ) : (
                        <Heart className='cursor-pointer text-xl text-red-600' />
                      )
                    }
                  </div>
                </Button>
                <Button
                  icon
                  variant='unstyled'
                  onClick={() => setIsCommentOpen(p => !p)} className='!px-1'
                >
                  {
                    isCommentOpen ? (
                      <MessageCircle className='cursor-pointer text-xl text-orange-500' fill='#FA7315' />
                    ): (
                      <MessageCircle className='cursor-pointer text-xl text-orange-500' />
                    )
                  }
                </Button>
              </div>
            </div>
          )
        }
        <main className={
          clsx(
            'col-span-12 pb-20',
            isLoading && 'relative',
          )
        }>
          {
            isLoading ? (
              <div className='flex absolute gap-y-4 flex-col w-full h-full justify-center items-center'>
                <Loader/>
                <p className='text-xl text-text-secondary'>Just a sec...</p>
              </div>
            ) : (
              <div className='flex h-full w-full flex-col justify-start items-center p-10'>
                <div className='flex w-full flex-col space-y-6 max-w-screen-lg items-center'>
                  <div className='flex items-center justify-start w-full gap-x-2'>
                    <div className='relative h-8 w-8 rounded-full bg-gray-400'>
                      <Image
                        src={post?.author.image ?? '/avatar.png'}
                        alt={`user-${post?.author.username}`}
                        fill
                        className='rounded-full'
                      />
                    </div>
                    <div className='flex flex-col justify-start items-start'>
                      <div className='flex items-center justify-start gap-x-2'>
                        <Link href={`/user/${post?.author.username}`}><span className='decoration-indigo-600 hover:underline'>{post?.author.name}</span></Link>
                        {
                          (status === 'authenticated' && post?.authorId !== authSession.user?.id) && (
                            <>
                              &#x2022;
                              <span>
                                <Button
                                  className='px-4 py-0.5'
                                  onClick={() => handleFollow(post?.authorId ?? '')}
                                >
                                  {isFollowing ? 'Following' : 'Follow'}
                                </Button>
                              </span>
                            </>
                          )
                        }
                      </div>
                      <div className='flex items-center'>
                        {
                          post?.createdAt && (
                            <p className='text-xs text-text-secondary'>{formatDistanceToNow(post?.createdAt, { addSuffix: true })}</p>
                          )
                        }
                      </div>
                    </div>
                  </div>
                  <div className='relative h-[60vh] w-full rounded-xl bg-gray-300 shadow-lg'>
                    {
                      isSuccess && post?.featuredImage && (
                        <Image
                          src={getFullPath(post?.featuredImage)}
                          alt={`post-${post?.title}`}
                          fill
                          className='rounded-xl w-full'
                        />
                      )
                    }
                    {
                      (authSession?.user?.id === post?.authorId && router.query?.slug) && (
                        <Button onClick={updateImage} variant='unstyled' icon className='absolute top-2 left-2 z-10 cursor-pointer rounded-md bg-black/50 p-2 text-white hover:bg-slate-600'>
                          <ImagePlus className='text-2xl' />
                        </Button>
                      )
                    }
                    <div className='absolute flex h-full w-full items-center justify-center'>
                      <div className='rounded-xl bg-black bg-opacity-25 p-4 text-3xl text-white'>
                        {post?.title}
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col justify-start items-start space-y-6'>
                    <div className='px-6'>
                      <div className='border-l-4 border-gray-800 pl-6'>
                        {post?.description}
                      </div>
                    </div>
                    <div className='prose lg:prose-xl'>
                      <Interweave content={post?.html} />
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </main>
      </PageBox>
    </>
  )
}