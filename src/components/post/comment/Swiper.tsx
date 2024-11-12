import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { MessageCircle, X } from 'lucide-react'
import React, { Fragment, useCallback, type FC } from 'react'
import { Button, Loader } from '~/components/global'
import { api } from '~/utils/api'

import InfiniteScroll from 'react-infinite-scroll-component'
import { CommentFormSchema } from '~/utils/schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import toast from 'react-hot-toast'
import Comment from './Comment'

interface SwiperProps {
  showComment: boolean
  handleClose: () => void
  postId: string
}

const Swiper: FC<SwiperProps> = ({
  showComment,
  handleClose,
  postId,
}) => {

  const { handleSubmit, control, reset } = useForm<z.infer<typeof CommentFormSchema>>({
    resolver: zodResolver(CommentFormSchema),
  })
  const getComments = api.post.getComments.useInfiniteQuery({ postId }, { getNextPageParam: (lastPage) => lastPage.nextCursor })
  const comment = api.post.comment.useMutation()

  const { data: commentCount, refetch: countRefetch } = api.post.getCommentCount.useQuery({ postId })

  const handleComment = useCallback((data: z.infer<typeof CommentFormSchema>) => {
    return toast.promise<string>(
      new Promise((resolve, reject) => {
        const request = { ...data, postId }
        comment.mutate(request, {
          onSuccess: () => {
            reset()
            void getComments.refetch()
            void countRefetch()
            resolve('Comment added successfully 🥳!')
          },
          onError: (err) => {
            reject(err?.message ?? 'Something went wrong!')
          },
        })
      }),
      {
        loading: 'Adding comment...',
        success: (msg) => `${msg}`,
        error: (msg) => `${msg}`,
      },
    )
  }, [comment, countRefetch, getComments, postId, reset])

  return (
    <Transition.Root show={showComment} as={Fragment}>
      <Dialog as='div' onClose={handleClose}>
        <div className='fixed z-swiper right-0 top-0'>
          <Transition.Child
            enter='transition duration-1000 shadow-lg'
            leave='transition duration-500 shadow-none'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <Dialog.Panel className='relative h-screen w-[200px] bg-white shadow-md sm:w-[400px]'>
              <div id='commentScrollDiv' className='flex h-full w-full flex-col px-6 overflow-scroll'>
                <div className='mt-10 mb-5 flex items-center justify-between text-xl'>
                  <h2 className='font-medium'>Responses ({commentCount})</h2>
                  <Button variant='unstyled' icon className='!px-1' onClick={handleClose}>
                    <X />
                  </Button>
                </div>

                <form
                  className='my-6 flex flex-col items-end space-y-5'
                  onSubmit={handleSubmit(handleComment)}
                >
                  <Controller
                    control={control}
                    name='text'
                    render={({ field: { onChange, value } }) => (
                      <textarea
                        id='comment'
                        rows={3}
                        className='w-full rounded-xl border border-gray-300 p-4 shadow-lg outline-none focus:border-gray-600'
                        placeholder='What are your thoughts?'
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Button
                    type='submit'
                    startIcon={<MessageCircle className='w-4 h-4'/>}
                  >
                    Comment
                  </Button>
                </form>
                <InfiniteScroll
                  dataLength={
                    getComments.data?.pages?.flatMap((page) => page.data).length ?? 0
                  }
                  next={getComments.fetchNextPage}
                  hasMore={Boolean(!!getComments.hasNextPage)}
                  loader={<Loader className='w-4 h-4' />}
                  scrollableTarget='commentScrollDiv'
                  className='w-full !overflow-hidden'
                >
                  <div className={clsx(
                    'flex flex-col w-full items-center justify-start gap-y-6 overflow-hidden',
                  )}>
                    {
                      getComments.isSuccess &&
                      getComments
                        .data?.pages?.flatMap(
                          page => page.data.map(comment => (<Comment key={comment.id} {...comment} />)),
                        )
                    }
                  </div>
                </InfiniteScroll>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Swiper