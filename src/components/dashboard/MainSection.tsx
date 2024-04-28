import React, { useCallback, useState } from 'react'
import type { FC } from 'react'
import { Search } from 'lucide-react'
import { Button, DropDown, Input, Loader } from '~/components/global'
import type { Option } from '~/components/global/DropDown'
import { Post } from '~/components/post'
import { api } from '~/utils/api'
import InfiniteScroll from 'react-infinite-scroll-component'
import clsx from 'clsx'

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

  const [search, setSearch] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const handleTagClick = useCallback((id: string) => {
    setSelectedTags(prev => {
      if(prev.includes(id)) {
        return prev.filter(t => t !== id)
      } else {
        const newArr = [...prev, id]
        return newArr
      }
    })
  }, [])

  const getTags = api.tag.getMyTags.useQuery()

  const getPosts = api.post.getPosts.useInfiniteQuery(
    {
      query: search,
      tags: selectedTags,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor
    }
  )
  return (
    <main id='scrollableDiv' className='col-span-8 border-r border-gray-300 px-20 overflow-y-auto pb-40'>
      <div className='w-full flex flex-col space-y-4 py-4'>
        <div className='w-full flex flex-col items-center gap-4'>
          <Input
            id='search'
            startIcon={<Search className='w-6 h-6' />}
            placeholder='Search...'
            type='text'
            className='py-2'
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='flex w-full items-center justify-start gap-x-4'>
            <p className='text-sm w-40'>My topics:</p>
            <div className='flex items-center gap-2 flex-wrap'>
              {
                getTags.isSuccess && getTags.data.map((tag) => (
                  <Button
                    key={tag.id}
                    circled
                    variant='secondary'
                    className={
                      clsx(
                        'py-1.5 px-4',
                        selectedTags.includes(tag.id) && '!border !border-solid !border-gray-900'
                      )
                    }
                    onClick={() => handleTagClick(tag.id)}
                  >
                    <p>{tag.name}</p>
                  </Button>
                ))
              }
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