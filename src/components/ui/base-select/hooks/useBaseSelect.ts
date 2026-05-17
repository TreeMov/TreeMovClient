import { useState } from 'react'

import { type SelectContextType, type SelectProps } from '../types'

export const useBaseSelect = <T>({
  options,
  noOptionsMessage = 'Ничего не найдено',
  disabled: disabledProp,
  onSearch,
  ...props
}: SelectProps<T>): SelectContextType<T> => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  const [inputValue, setInputValue] = useState('')
  const hasOptions = options.length > 0
  const hasInputValue = inputValue.length > 0

  const disabled = disabledProp || props.isLoading

  return {
    ...props,
    disabled,
    noOptionsMessage,
    options,
    hasInputValue,
    hasOptions,
    inputValue,
    isOpen,
    setIsOpen,
    setInputValue,
    toggleOpen,
    onSearch,
  }
}
