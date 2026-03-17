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
  lesson: {
    id,
    subject,
    teacher,
    date,
    start_time,
    end_time,
    color,
    type,
  },
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        'absolute left-0 z-10 min-w-5/6 cursor-pointer rounded-xl border bg-white p-2.5 shadow-lg transition-shadow',
        {
          'z-15 shadow-2xl': isActive,
          'opacity-60': isDrag,
          'min-w-full': isDrop || type === 'resize',
        },
        className
      )}
      style={{ borderColor: color, ...style }}
      {...props}
    >
      <div>{type}</div>
      <div>{id}</div>
      <div>{subject?.label}</div>
      <div>{teacher?.label}</div>
      <div>
        {format(combineDateAndTime(date, start_time), timeFormat)}-
        {format(combineDateAndTime(date, end_time), timeFormat)}
      </div>

      {children}
    </div>
  )
}
