import type { SelectProps } from './types'

import {
  Select as USelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/select'

export const Select = <Values extends string>({
  value,
  defaultValue,
  open,
  defaultOpen,
  dir,
  name,
  autoComplete,
  disabled,
  required,
  form,
  options,
  placeholder,
  onValueChange,
  onOpenChange,
  ...props
}: SelectProps<Values>) => {
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
        {value ? <SelectValue {...props} /> : placeholder}
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
