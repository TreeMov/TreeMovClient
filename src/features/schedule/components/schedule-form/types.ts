import type { useSchedule } from '../../hooks'
import type { ScheduleEvent } from '../../types'
import type { periodSchema } from './schemas'

import { z } from 'zod'

export type PeriodSchema = z.infer<typeof periodSchema>
export type PeriodSchemaOutput = z.output<typeof periodSchema>

export type FormActions = Pick<
  ReturnType<typeof useSchedule>,
  'onCreatePeriodHandler' | 'onCreateHandler' | 'onChangeHandler'
>

export type FormProps = ScheduleEvent &
  FormActions & {
    onClose: () => void
  }

export type TabOption = {
  value: string
  label: string
}

export enum PeriodEnum {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  WEEKDAYS = 'weekdays',
}

export enum TabsEnum {
  LESSON = 'lesson',
  EVENT = 'event',
}
