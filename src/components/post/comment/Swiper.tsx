import { Dialog, Transition } from '@headlessui/react'
import { MessageCircle, X } from 'lucide-react'
import React, { Fragment, type FC } from 'react'
import { Button } from '~/components/global'

interface SwiperProps {
  showComment: boolean
  handleClose: () => void
  postId: string
}

const Swiper: FC<SwiperProps> = ({
  showComment,
  handleClose,
}) => {
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
              <div className='flex h-full w-full flex-col overflow-scroll px-6'>
                <div className='mt-10 mb-5 flex items-center justify-between text-xl'>
                  <h2 className='font-medium'>Responses (4)</h2>
                  <Button variant='unstyled' icon className='!px-1' onClick={handleClose}>
                    <X />
                  </Button>
                </div>

                {/* form to give comments */}
                <form
                  className='my-6 flex flex-col items-end space-y-5'
                >
                  <textarea
                    id='comment-input'
                    rows={3}
                    className='w-full rounded-xl border border-gray-300 p-4 shadow-lg outline-none focus:border-gray-600'
                    placeholder='What are your thoughts?'
                  />
                  <Button
                    type='submit'
                    startIcon={<MessageCircle className='w-4 h-4'/>}
                  >
                    Comment
                  </Button>
                </form>

                <div className='flex flex-col items-center justify-center gap-y-6'>
                  {
                    Array.from({ length: 4 }).map((value, i) => (
                      <div
                        key={i}
                        className='flex w-full flex-col space-y-2 border-b border-b-gray-300 pb-4 last:border-none'
                      >
                        <div className='flex w-full items-center space-x-2 text-xs'>
                          <div className='relative h-8 w-8 rounded-full bg-gray-400'></div>
                          <div>
                            <p className='font-semibold'>{`user ${i}`}</p>
                            <p>4 mins ago</p>
                          </div>
                        </div>
                        <div className='text-sm text-gray-600'>
                          Hello world!
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Swiper