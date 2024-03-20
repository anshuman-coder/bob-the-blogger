import React from 'react'
import { RefreshCcw } from 'lucide-react'
import type { FC } from 'react'
import clsx from 'clsx'

interface LoaderProps {
  className?: string
  height?: number
  width?: number
}

const Loader: FC<LoaderProps> = ({ height= 20, width = 20, className = '' }) => {
  return (
    <div className='absolute flex justify-center items-center'>
      <RefreshCcw className={clsx('animate-spin', className)} height={height} width={width} />
    </div>
  )
}

export default Loader