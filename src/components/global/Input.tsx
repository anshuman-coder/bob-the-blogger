// import { Search } from 'lucide-react'
import React from 'react'
import type { ReactNode, FC, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean
  startIcon?: ReactNode
  containerClass?: string
  endIcon?: ReactNode
  className?: string
}

const Input: FC<InputProps> = ({
  id,
  containerClass = '',
  fullWidth = true,
  startIcon,
  endIcon,
  className = '',
  ...otherProps
}) => {

  return (
    <label
      htmlFor={id}
      className={
        clsx(
          'relative rounded-3xl border border-gray-800 pl-4',
          containerClass,
          fullWidth ? 'w-full' : 'w-fit',
        )
      }
    >
      {
        startIcon && (
          <div className='absolute top-0 left-2 flex h-full items-center '>
            {startIcon}
          </div>
        )
      }
      <input
        id={id}
        className={
          clsx(
            'w-full rounded-3xl py-1 px-4 pl-7 text-sm outline-none placeholder:text-xs placeholder:text-gray-300',
            className,
          )
        }
        {...otherProps}
      />
      {
        endIcon && (
          <div className='absolute top-0 right-2 flex h-full items-center '>
            {endIcon}
          </div>
        )
      }
    </label>
  )
}

export default Input