import { type Prettify } from '@/types/utility'

import { type FormSelectProps } from '../base-select/types'

export type SingleSelectProps = Prettify<
  FormSelectProps<string | null>
>
