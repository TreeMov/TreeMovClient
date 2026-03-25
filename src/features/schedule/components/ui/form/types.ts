import type { SubmitHandler } from 'react-hook-form'
import type {
  InputSchema as EventInputSchema,
  OutputSchema as EventOutputSchema,
} from './components/event-form/types'
import type {
  InputSchema as LessonInputSchema,
  OutputSchema as LessonOutputSchema,
} from './components/lesson-form/types'
import type { periodSchema } from './schemas'

import { z } from 'zod'

export type PeriodSchema = z.infer<typeof periodSchema>
export type PeriodSchemaOutput = z.output<typeof periodSchema>

export type FormProps = {
  defaultLessonValues?: LessonInputSchema
  defaultEventValues?: EventInputSchema
  actions?: React.ReactNode
  startHour: number
  endHour: number
  onSubmitLesson: SubmitHandler<LessonOutputSchema>
  onSubmitEvent: SubmitHandler<EventOutputSchema>
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
