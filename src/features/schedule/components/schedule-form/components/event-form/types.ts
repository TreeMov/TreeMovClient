import type z from 'zod'
import type { schema } from './schema'

export type Schema = z.infer<typeof schema>
