import type z from 'zod'
import type { baseSchema, schema } from './schema'

export type BaseSchema = z.infer<typeof baseSchema>
export type Schema = z.input<typeof schema>
export type SubmitSchema = z.output<typeof schema>
