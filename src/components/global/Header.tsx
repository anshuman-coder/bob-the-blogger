import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import { Menu, LogIn, SquarePen, Bell, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Loader from './Loader'

const Header: FC = () => {
  const { status } = useSession()
  return (
    <header className='flex h-20 w-full flex-row items-center justify-between px-12 border-b-[1px] border-gray-300 bg-white'>
      <div className='cursor-pointer p-2 rounded-lg hover:border-[0.5px] hover:border-gray-900 hover:shadow-sm'>
        <Menu className='text-2xl text-gray-600' />
      </div>
      <Link href={'/'} className='cursor-pointer select-none text-xl font-semibold'>
        Blogger
      </Link>
      {
        status === 'authenticated' ? <AuthSection /> : status === 'loading' ? <Loading /> : <GeneralSection />
      }
    </header>
  )
}

const AuthSection: FC = () => {
  return (
    <div className='flex items-center space-x-4'>
      <div>
        <Bell className='text-2xl text-gray-600' />
      </div>
      <div>
        <div className='h-5 w-5 rounded-full bg-gray-600' />
      </div>
      <div>
        <button
          className='flex items-center space-x-2 rounded border border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900'
        >
          <div>
            <SquarePen className='w-4 h-4' />
          </div>
          <div>Write</div>
        </button>
      </div>
      <div>
        <button
          className='flex items-center space-x-2 rounded border border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900'
        >
          <div>
            <LogOut className='w-4 h-4' />
          </div>
          <div>Logout</div>
        </button>
      </div>
    </div>
  )
}

const GeneralSection: FC = () => {
  return (
    <div>
      <button
        className='flex items-center space-x-2 rounded border-[0.5px] border-gray-200 px-4 py-2 transition hover:border-gray-900 hover:text-gray-900'
      >
        <LogIn className='w-4 h-4' />
        <p>Signin</p>
      </button>
    </div>
  )
}

const Loading: FC = () => {
  return (
    <div className='relative flex justify-center items-center p-5'>
      <Loader />
    </div>
  )
}

export default Header