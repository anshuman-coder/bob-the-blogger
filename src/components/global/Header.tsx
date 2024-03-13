import React from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'

const Header = () => {
  return (
    <header className='flex h-20 w-full flex-row items-center justify-between px-12 border-b-[1px] border-gray-300 bg-white'>
      <div className='cursor-pointer p-2 rounded-lg hover:border-[0.5px] hover:border-gray-900 hover:shadow-sm'>
        <Menu className='text-2xl text-gray-600' />
      </div>
      <Link href={'/'} className='cursor-pointer select-none text-xl font-semibold'>
        Blogger
      </Link>
      <div>
        <button
          className='flex items-center space-x-3 rounded border-[0.5px] border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900'
        >
          Signin
        </button>
      </div>
    </header>
  )
}

export default Header