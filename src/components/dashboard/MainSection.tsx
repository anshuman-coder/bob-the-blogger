import React from 'react'
import type { FC } from 'react'
import { Search } from 'lucide-react'

const MainSection: FC = () => {
  return (
    <main className='col-span-8 border-r border-gray-300 px-24'>
      <div className='w-full flex flex-col space-y-4 py-4'>
        <div className='w-full flex items-center space-x-4'>
          <label
             htmlFor='search'
             className='relative w-full rounded-3xl border border-gray-800 pl-4'
          >
            <div className='absolute left-2 flex h-full items-center '>
              <Search className='w-6 h-6' />
            </div>
            <input
              type='text'
              name='search'
              id='search'
              className='w-full rounded-3xl py-1 px-4 pl-7 text-sm outline-none placeholder:text-xs placeholder:text-gray-300'
              placeholder='Search...'
            />
          </label>
          <div className='flex w-full items-center justify-end gap-x-4'>
            <p className='text-sm'>My topics:</p>
            <div className='flex items-center space-x-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className='rounded-3xl bg-gray-200/50 px-2 py-1.5 text-sm'>
                  tag {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainSection