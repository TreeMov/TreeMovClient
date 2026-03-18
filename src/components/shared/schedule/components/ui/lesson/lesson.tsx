import type { LessonProps } from './types'

import { format } from 'date-fns'
import React from 'react'

import { cn } from '@/utils/helpers/shadcn'

import { timeFormat } from '../../../constants'
import { combineDateAndTime } from '../../../helpers'

export const Lesson: React.FC<LessonProps> = ({
  className,
  isActive,
  isDrag,
  isDrop,
  children,
  lesson,
  style,
  ...props
}) => {
  const { id, date, start_time, end_time, color, state, ...rest } =
    lesson

  return (
    <div
      className={cn(
        'absolute left-0 z-10 min-w-5/6 cursor-pointer rounded-xl border bg-white p-2.5 shadow-lg transition-shadow',
        {
          'z-15 shadow-2xl': isActive,
          'opacity-60': isDrag,
          'min-w-full': isDrop || state === 'resize',
        },
        className
      )}
      style={{ borderColor: color, ...style }}
      {...props}
    >
      <div>{lesson.state}</div>
      <div>{lesson.type}</div>
      <div>{id}</div>
      {rest.type === 'create' ? (
        <div>Добавление</div>
      ) : (
        <React.Fragment>
          <div>{rest.subject?.label}</div>
          <div>{rest.teacher?.label}</div>
        </React.Fragment>
      )}

      <div>
        {format(combineDateAndTime(date, start_time), timeFormat)}-
        {format(combineDateAndTime(date, end_time), timeFormat)}
      </div>

      {children}
    </div>
  )
}
