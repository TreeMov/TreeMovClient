import type { SubmitHandler } from 'react-hook-form'
import type z from 'zod'
import type { schema } from './schema'

export type Schema = z.infer<typeof schema>

export type StudentFormProps = {
  onSubmit: SubmitHandler<Schema>
}
