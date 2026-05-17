import { type SelectBaseOptionItemProps } from '../select-base-option/types'

export type ISelectOptionProps = Omit<
  SelectBaseOptionItemProps,
  'onClick'
>
