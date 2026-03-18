import type { ComboboxRoot } from '@base-ui/react'
import type { ComboboxOption } from '@/components/primitives/combobox'

type ComboboxBaseProps<
  Values extends string,
  Multiple extends boolean | undefined = false,
> = Omit<
  ComboboxRoot.Props<Values, Multiple>,
  'items' | 'multiple' | 'value' | 'defaultValue' | 'onValueChange'
> & {
  options: ComboboxOption<Values>[]
  placeholder?: string
}

export type ComboboxSingleProps<Values extends string> =
  ComboboxBaseProps<Values, false> & {
    multiple?: false
    value?: Values
    defaultValue?: Values
    onValueChange?: (value: Values | null) => void
  }

export type ComboboxMultipleProps<Values extends string> =
  ComboboxBaseProps<Values, true> & {
    multiple: true
    value?: Values[]
    defaultValue?: Values[]
    onValueChange?: (value: Values[] | null) => void
  }

export type ComboboxProps<Values extends string> =
  | ComboboxSingleProps<Values>
  | ComboboxMultipleProps<Values>

export type ComboboxRenderedContentProps<Values extends string> =
  Pick<ComboboxBaseProps<Values>, 'placeholder'>
