import type {
  SerializedEventFields,
  SerializedLessonFields,
} from './types'

import { every, has, isNil } from 'lodash-es'

import { lessonFormFields } from './constants'

export const isSerializedLesson = (
  fields: SerializedLessonFields | SerializedEventFields
): fields is SerializedLessonFields =>
  every(
    lessonFormFields,
    (key) => has(fields, key) && !isNil(fields[key])
  )

export const isSerializedEvent = (
  fields: SerializedLessonFields | SerializedEventFields
): fields is SerializedEventFields => !isSerializedLesson(fields)
