import { type Prettify } from '@/types/utility'

import { type SelectOptionType } from '../../types'

export type SelectBaseOptionProps = Prettify<
  Omit<SelectOptionType, 'value'> & {
    isSelected: boolean
    onClick: () => void
  }
>

export type SelectBaseOptionItemProps = Omit<
  SelectBaseOptionProps,
  'onClick'
>
