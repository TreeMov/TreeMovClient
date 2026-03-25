import type { SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import type { schema } from './schema'

export type Schema = z.infer<typeof schema>
export type InputSchema = z.input<typeof schema>
export type OutputSchema = z.output<typeof schema>

export type EventFormProps = {
  onSubmit: SubmitHandler<OutputSchema>
  defaultValues?: InputSchema
}
