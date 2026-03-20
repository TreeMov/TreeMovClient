import { z } from 'zod'

import { requiredComboboxValue } from '@/utils/helpers/validation'

export const schema = z.object({
  subject: requiredComboboxValue,
  teacher: requiredComboboxValue,
  classroom: requiredComboboxValue,
  student_group: requiredComboboxValue,
  comment: z.string().min(1),
})
