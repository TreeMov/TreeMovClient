import { BaseSelect } from '../base-select'
import {
  type OnOptionClickParams,
  type SelectOptionType,
} from '../base-select/types'

import { type SingleSelectProps } from './types'

export const SingleSelect: React.FC<SingleSelectProps> = ({
  isClearable = false,
  value,
  placeholder,
  options,
  onChange,
  ...props
}) => {
  const hasValue = !!value?.length
  const label = options.find(
    (option) => option.value === value
  )?.label
  const renderedValue = hasValue ? label : placeholder

  const checkSelected = (option: SelectOptionType) =>
    option.value === value

  const onOptionClick = ({
    isSelected,
    option: { value },
  }: OnOptionClickParams) => onChange(isSelected ? value : null)

  const onReset = () => null

  return (
    <BaseSelect
      value={value}
      hasValue={hasValue}
      renderValue={renderedValue}
      placeholder={placeholder}
      options={options}
      onReset={onReset}
      isClearable={isClearable}
      checkSelected={checkSelected}
      onOptionClick={onOptionClick}
      onChange={onChange}
      {...props}
    />
  )
}
