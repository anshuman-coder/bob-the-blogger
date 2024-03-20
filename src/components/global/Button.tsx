import clsx from 'clsx'
import React, { useMemo } from 'react'
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import Loader from './Loader'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  className?: string
  circled?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  isLoading?: boolean
  size?: 'md' | 'lg'
}

const Button: FC<ButtonProps> = (props) => {
  const {
    variant = 'primary',
    className = '',
    circled = false,
    startIcon,
    endIcon,
    isLoading = false,
    size = 'md',
    children,
    ...otherProps
  } = props

  const classes = useMemo(() => clsx(
    BASIC_CLASS,
    BG_CLASS(variant),
    BORDER_CLASS(variant),
    TEXT_CLASS(variant, size),
    ROUNDED_CLASS(circled),
    className,
  ), [variant, size, circled, className])

  if(isLoading) {
    return (
      <button
        className={clsx(
          classes,
          'relative'
        )}
        {...otherProps}
      >
        <Loader className='w-6 h-6' />
      </button>
    )
  }

  return (
    <button
      className={classes}
      {...otherProps}
    >
      {
        startIcon && (
          <div className='flex justify-center items-start'>
            {startIcon}
          </div>
        )
      }
      {children}
      {
        endIcon && (
          <div className='flex justify-center items-center'>
            {endIcon}
          </div>
        )
      }
    </button>
  )
}

const BASIC_CLASS = 'space-x-1.5 flex justify-center items-center py-2'

const ROUNDED_CLASS = (isCircled: ButtonProps['circled']) => clsx(
  isCircled ? 'rounded-3xl' : 'rounded'
)

const BORDER_CLASS = (variant: ButtonProps['variant']) => clsx(
  variant === 'primary' ? 'border border-gray-200 transition hover:border-gray-900' : 'border-none'
)

const TEXT_CLASS = (variant: ButtonProps['variant'], size: ButtonProps['size']) => clsx(
  variant === 'primary' ? 'hover:text-gray-900' : '',
  size === 'md' ? 'text-sm px-1.5' : 'text-md px-3'
)

const BG_CLASS = (variant: ButtonProps['variant']) => clsx(
  variant === 'secondary' ? 'bg-gray-200/50' : 'bg-inherit'
)

export default Button