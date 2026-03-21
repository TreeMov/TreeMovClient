import {
  type SelectProps as _SelectProps,
  type SelectValueProps,
} from '@/components/primitives/select'

export type ISelectOption<Values extends string> = {
  value: Values
  label: string
}

export type SelectProps<Values extends string> =
  _SelectProps<Values> & {
    options: ISelectOption<Values>[]
    placeholder?: string
  } & SelectValueProps
