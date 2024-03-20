import React, { useCallback, useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FC } from 'react'
import { Button } from '~/components/global'
import type { ButtonProps } from '~/components/global/Button'
import { ChevronDown } from 'lucide-react'

export type Option = {
  label: string
  value: string
  isDefault?: boolean
}

interface DropDownProps extends ButtonProps {
  onSelected?: (value : Option) => void
  options?: Option[]
}

const DropDown: FC<DropDownProps> = ({ options = [], onSelected }) => {
  const [selectedOption, setSelectedOption] = useState<Option>()
  const selectRef = useRef<HTMLSelectElement>(null)

  const handleChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const _selected = options[e.target.selectedIndex]
    if(_selected) {
      setSelectedOption(_selected)
      onSelected?.(_selected)
    }
  }, [onSelected, options])

  const handleOnClick = useCallback(() => {
    if(selectRef) {
      selectRef.current?.click()
    }
  }, [])

  useEffect(() => {
    setSelectedOption((prev) => {
      const opt = options.find(op => Boolean(op.isDefault))
      if(opt) {
        onSelected?.(opt)
        return opt
      }
      return prev
    })
  }, [onSelected, options])

  return (
    <div className='relative inline-block'>
      <Button
        variant='primary'
        circled
        endIcon={<ChevronDown className='w-6 h-6' />}
        onClick={handleOnClick}
        className='w-[120px] justify-evenly'
      >
        {selectedOption?.label}
      </Button>
      <select
        ref={selectRef}
        value={selectedOption?.value}
        onChange={handleChange}
        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
      >
        {
          options?.map(({value, label}, i) => (
            <option key={i} value={value}>{label}</option>
          ))
        }
      </select>
    </div>
  )
}

export default DropDown