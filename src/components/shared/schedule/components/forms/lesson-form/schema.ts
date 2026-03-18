import { z } from 'zod'

// todo пошаманить над схемой или формой: нужно, чтобы была возможность устанавливать нулевые значения для уроков с типом create
// но сделать их обязательными для сабмита
export const schema = z.object({
  subject: z.string(),
  teacher: z.string(),
  classroom: z.string(),
  student_group: z.string(),
  comment: z.string().min(1),
})
