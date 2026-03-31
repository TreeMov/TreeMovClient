import type { SelectProps } from './types'

import {
  Select as USelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/select'

import { Spinner } from '../spinner'

export const Select = <Values extends string>({
  value,
  defaultValue,
  open,
  defaultOpen,
  dir,
  name,
  autoComplete,
  disabled: disabledProp,
  required,
  form,
  options,
  placeholder,
  isLoading,
  onValueChange,
  onOpenChange,
  ...props
}: SelectProps<Values>) => {
  const disabled = disabledProp || isLoading
  const labelFromOptions = options.find(
    (option) => option.value === value
  )
  const hasLabel = !!labelFromOptions

  return (
    <USelect
      value={value}
      defaultValue={defaultValue}
      open={open}
      defaultOpen={defaultOpen}
      dir={dir}
      name={name}
      autoComplete={autoComplete}
      disabled={disabled}
      required={required}
      form={form}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
    >
      <SelectTrigger>
        {hasLabel ? <SelectValue {...props} /> : placeholder}
        {isLoading && <Spinner className="ml-auto size-4" />}
      </SelectTrigger>
      <SelectContent position="popper">
        {options.map(({ value, label }) => (
          <SelectItem key={value} value={`${value}`}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </USelect>
  )
}
