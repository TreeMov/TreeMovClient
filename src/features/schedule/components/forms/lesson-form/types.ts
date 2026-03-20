import type z from 'zod'
import type { schema } from './schema'

export type Schema = z.input<typeof schema>
export type SubmitSchema = z.output<typeof schema>
