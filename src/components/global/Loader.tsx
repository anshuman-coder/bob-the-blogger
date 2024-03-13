import React from 'react'
import { RefreshCcw } from 'lucide-react'
import type { FC } from 'react'

interface LoaderProps {
  height?: number
  width?: number
}

const Loader: FC<LoaderProps> = ({ height= 20, width = 20 }) => {
  return (
    <div className='absolute flex justify-center items-center'>
      <RefreshCcw className='animate-spin' height={height} width={width} />
    </div>
  )
}

export default Loader