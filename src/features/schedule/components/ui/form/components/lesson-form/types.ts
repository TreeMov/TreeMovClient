import type { SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import type { baseSchema, schema } from './schema'

export type BaseSchema = z.infer<typeof baseSchema>
export type Schema = z.infer<typeof schema>
export type InputSchema = z.input<typeof schema>
export type OutputSchema = z.output<typeof schema>

export type LessonFormProps = {
  defaultValues?: InputSchema
  startHour: number
  endHour: number
  onSubmit: SubmitHandler<OutputSchema>
}
