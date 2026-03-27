import type { DefinedFields } from '@/types/utility'
import type {
  SerializedEventFields,
  SerializedLessonFields,
} from './types'

import { every, has, isNil } from 'lodash-es'

import { formCommonFields, lessonFormFields } from './constants'

export const isSerializedLesson = (
  fields: SerializedLessonFields | SerializedEventFields
): fields is DefinedFields<SerializedLessonFields> =>
  every(
    lessonFormFields.filter(
      (key) =>
        !formCommonFields.some((commonKey) => commonKey === key)
    ),
    (key) => has(fields, key) && !isNil(fields[key])
  )

export const isSerializedEvent = (
  fields: SerializedLessonFields | SerializedEventFields
): fields is DefinedFields<SerializedEventFields> =>
  !isSerializedLesson(fields)
