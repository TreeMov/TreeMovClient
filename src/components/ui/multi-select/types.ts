import { type Prettify } from '@/types/utility'

import {
  type FormSelectProps,
  type SelectValue,
} from '../base-select/types'

export type SelectFooterProps = {
  localValue: SelectValue[]
  onChange: (value: SelectValue[]) => void
}

export type MultiSelectProps = Prettify<
  Omit<FormSelectProps<SelectValue[]>, 'isModal'>
> & {
  valuePrefix?: string
  isAllButton?: boolean
  isAllStatusesButton?: boolean
}

export type GetValueParams = {
  hasValue: boolean
  placeholder?: string
  valuePrefix?: string
  value: SelectValue[]
  allOptions?: boolean
}
