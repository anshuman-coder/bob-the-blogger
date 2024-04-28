import React from 'react'
import type { FC } from 'react'
import { Search } from 'lucide-react'
import { Button, DropDown, Input, Loader } from '~/components/global'
import type { Option } from '~/components/global/DropDown'
import { Post } from '~/components/post'
import { api } from '~/utils/api'
import InfiniteScroll from 'react-infinite-scroll-component'

const OPTIONS: Option[] =[
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Following',
    value: 'following',
    isDefault: true
  }
] 

const MainSection: FC = () => {

  const getPosts = api.post.getPosts.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  return (
    <main id='scrollableDiv' className='col-span-8 border-r border-gray-300 px-20 overflow-y-auto pb-40'>
      <div className='w-full flex flex-col space-y-4 py-4'>
        <div className='w-full flex items-center space-x-4'>
          <Input
            id='search'
            startIcon={<Search className='w-6 h-6' />}
            placeholder='Search...'
            type='text'
          />
          <div className='flex w-full items-center justify-end gap-x-4'>
            <p className='text-sm'>My topics:</p>
            <div className='flex items-center space-x-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Button
                  key={i}
                  circled
                  variant='secondary'
                  className='py-1.5 px-4'
                >
                  <p>tag {i} </p>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className='w-full flex justify-between items-center border-b border-gray-300 pb-8'>
          <div>
            Article
          </div>
          <div className='flex justify-center items-center'>
            <DropDown options={OPTIONS} />
          </div>
        </div>
      </div>
      <div className='flex w-full flex-col justify-center'>
        {getPosts.isLoading && (
          <div className='flex h-full w-full items-center justify-center space-x-4'>
            <div>
              <Loader className='animate-spin' />
            </div>
            <div>Loading...</div>
          </div>
        )}
        <InfiniteScroll
          dataLength={
            getPosts.data?.pages.flatMap((page) => page.posts).length ?? 0
          }
          next={getPosts.fetchNextPage}
          hasMore={Boolean(!!getPosts.hasNextPage)}
          loader={
            <div className='flex justify-center items-center w-full h-full'>
              <Loader className='w-4 h-4' />
            </div>
          }
          endMessage={
            <p className='text-center'>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollableTarget='scrollableDiv'
        >
          {
            getPosts.isSuccess &&
              getPosts
              .data?.pages?.flatMap(
                (page) => page.posts?.map((post) => <Post {...post} key={post.id} />)
              )
          
          }
        </InfiniteScroll>
      </div>
    </main>
  )
}

export default MainSection