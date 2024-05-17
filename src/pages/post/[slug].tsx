import { Heart, ImagePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Loader, PageBox, PageHelmet } from '~/components/global'
import { useUpload } from '~/hooks'
import { api } from '~/utils/api'
import { Interweave } from 'interweave'
import clsx from 'clsx'
import { useState } from 'react'

export default function Post() {
  const router = useRouter()

  const { status, data: authSession } = useSession()
  const { getFullPath } = useUpload()
  
  const [isLike, setIsLike] = useState<boolean>(false)

  const { isLoading, data: post, isSuccess } = api.post.getPost.useQuery({
    slug: (router.query?.slug ?? '') as string
  })

  return (
    <>
      <PageHelmet title={`Post | ${router?.query?.slug as string ?? ''}`} />
      <PageBox isLoading={Boolean(status === 'loading')}>
        {
          status === 'authenticated' && isSuccess && (
            <div className='fixed bottom-10 flex w-full items-center justify-center'>
              <div className='group flex items-center justify-center gap-x-2 rounded-full border border-gray-400 bg-white px-3 py-1.5 shadow-xl transition duration-300 hover:border-gray-900'>
                <Button onClick={() => setIsLike(p => !p)} icon variant='unstyled'>
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
                <Button icon variant='unstyled'>
                  <Heart className='cursor-pointer text-xl text-red-600' fill='#dc2626'/>
                </Button>
              </div>
            </div>
          )
        }
        <main className={
          clsx(
            'col-span-12 pb-20',
            isLoading && 'relative'
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
                <div className='flex w-full flex-col space-y-6'>
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
                        <Button variant='unstyled' icon className='absolute top-2 left-2 z-10 cursor-pointer rounded-md bg-black/50 p-2 text-white hover:bg-slate-600'>
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
                  <div className='border-l-4 border-gray-800 pl-6'>
                    {post?.description}
                  </div>
                  <div className='prose lg:prose-xl'>
                    <Interweave content={post?.html} />
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