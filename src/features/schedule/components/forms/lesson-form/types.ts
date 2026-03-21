import type z from 'zod'
import type { baseSchema, schema } from './schema'

export enum PeriodEnum {
  _1_WEEK = '7',
  _2_WEEK = '14',
}

export type BaseSchema = z.infer<typeof baseSchema>
export type Schema = z.input<typeof schema>
export type SubmitSchema = z.output<typeof schema>
