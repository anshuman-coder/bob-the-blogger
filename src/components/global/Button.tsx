import clsx from 'clsx'
import React, { useMemo } from 'react'
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react'
import Loader from './Loader'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'unstyled'
  className?: string
  circled?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
  isLoading?: boolean
  size?: 'md' | 'lg'
  icon?: boolean
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
    icon = false,
    ...otherProps
  } = props

  const classes = useMemo(() => clsx(
    clsx(
      className,
      variant !== 'unstyled' && 
      BASIC_CLASS,
      BG_CLASS(variant),
      BORDER_CLASS(variant),
      TEXT_CLASS(variant, size),
      ROUNDED_CLASS(circled)
    ),
  ), [variant, size, circled, className])

  if(isLoading) {
    return (
      <button
        className={clsx(
          classes,
          'relative px-6'
        )}
        {...otherProps}
      >
        <Loader loaderContainerClass='absolute' className='w-6 h-6' />
      </button>
    )
  }

  if(icon) {
    return (
      <button
        className={classes}
        {...otherProps}
      >
        {children}
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

const BASIC_CLASS = 'gap-x-1.5 flex justify-center items-center py-2'

const ROUNDED_CLASS = (isCircled: ButtonProps['circled']) => clsx(
  isCircled ? 'rounded-3xl' : 'rounded'
)

const BORDER_CLASS = (variant: ButtonProps['variant']) => clsx(
  variant === 'primary' ? 'border border-gray-200 transition hover:border-gray-900' : 'border-none'
)

const TEXT_CLASS = (variant: ButtonProps['variant'], size: ButtonProps['size']) => clsx(
  variant === 'primary' ? 'hover:text-gray-900' : '',
  size === 'md' ? 'text-sm px-2' : 'text-md px-3'
)

const BG_CLASS = (variant: ButtonProps['variant']) => clsx(
  variant === 'secondary' ? 'bg-gray-200/50' : 'bg-inherit'
)

export default Button