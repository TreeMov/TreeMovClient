import {
  type SelectProps as _SelectProps,
  type SelectValueProps,
} from '@/components/primitives/select'

export type ISelectOption = {
  value: string | number
  label: string
}

export type SelectProps = _SelectProps & {
  options: ISelectOption[]
} & SelectValueProps
