import type {
  OnOptionClickParams,
  SelectOptionType,
  SelectValue,
} from '../base-select/types'

import { useEffect, useState } from 'react'

import { BaseSelect } from '../base-select'
import { SelectBaseOption } from '../base-select/components/select-base-option'

import { SelectFooter } from './components/select-footer'
import { getValueLabel } from './helpers'
import { type MultiSelectProps } from './types'

export const MultiSelect: React.FC<MultiSelectProps> = ({
  isClearable = false,
  value,
  options,
  placeholder,
  isLoading,
  valuePrefix,
  isAllButton,
  isAllStatusesButton,
  onChange,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<SelectValue[]>([])

  // синхронизация localValue с value
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(value)
  }, [isLoading, value])

  const hasValue = !!value?.length

  const checkSelected = (option: SelectOptionType) =>
    !!localValue.find(({ value }) => option.value === value)

  const onOptionClick = ({
    isSelected,
    option,
  }: OnOptionClickParams) =>
    setLocalValue(
      isSelected
        ? [...localValue, option]
        : localValue.filter(({ value }) => value !== option.value)
    )

  const onReset = () => {
    setLocalValue([])
    return []
  }

  const renderValue = getValueLabel({
    hasValue,
    value,
    placeholder,
    valuePrefix,
    allOptions: options.length === value.length,
  })

  const isAllSelected = localValue.length === options.length
  const onToggleAll = () => {
    if (!isAllSelected) {
      setLocalValue(options)
    } else {
      setLocalValue([])
    }
  }
  const renderContentTop = (isAllButton || isAllStatusesButton) && (
    <SelectBaseOption
      isSelected={isAllSelected}
      label={isAllStatusesButton ? 'Все статусы' : 'Все'}
      onClick={onToggleAll}
    />
  )

  return (
    <BaseSelect
      value={value}
      hasValue={hasValue}
      options={options}
      isClearable={isClearable}
      isMultiple
      placeholder={placeholder}
      renderValue={renderValue}
      isLoading={isLoading}
      renderContentTop={renderContentTop}
      renderFooter={
        <SelectFooter
          localValue={localValue}
          onChange={setLocalValue}
        />
      }
      onChange={onChange}
      onReset={onReset}
      onOptionClick={onOptionClick}
      checkSelected={checkSelected}
      {...props}
    />
  )
}
