import React from 'react'
import type { FC } from 'react'
import Link from 'next/link'
import { Menu, LogIn, SquarePen, Bell, LogOut } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { Button, Loader } from '~/components/global'

const Header: FC = () => {
  const { status } = useSession()
  return (
    <header className='flex h-20 w-full flex-row items-center justify-between px-12 border-b border-gray-300 bg-white'>
      <div className='cursor-pointer p-2 rounded-lg hover:border-[0.5px] hover:border-gray-900 hover:shadow-sm'>
        <Menu className='text-2xl text-gray-600' />
      </div>
      <Link href={'/'} className='cursor-pointer select-none text-xl font-semibold text-gray-600'>
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
      <div className='text-gray-600'>
        <Bell className='w-5 h-5' />
      </div>
      <div>
        <div className='h-8 w-8 rounded-full bg-gray-200' />
      </div>
      <div>
        <Button
          type='button'
          startIcon={<SquarePen className='w-4 h-4' />}
        >
          <p>Write</p>
        </Button>
      </div>
      <div>
        <Button
          type='button'
          startIcon={<LogOut className='w-4 h-4' />}
        >
          <p>Logout</p>
        </Button>
      </div>
    </div>
  )
}

const GeneralSection: FC = () => {
  return (
    <div>
      <Button
        variant='primary'
        type='button'
        startIcon={<LogIn className='w-4 h-4' />}
      >
        <p>Signin</p>
      </Button>
    </div>
  )
}

const Loading: FC = () => {
  return (
    <div className='relative flex justify-center items-center p-5'>
      <Loader loaderContainerClass='absolute' />
    </div>
  )
}

export default Header