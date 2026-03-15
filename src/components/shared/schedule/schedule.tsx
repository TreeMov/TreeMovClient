import type { ScheduleProps } from './types'

import React from 'react'

import { ScheduleContent } from './components/schedule-content'
import { ScheduleProvider } from './provider'

export const Schedule: React.FC<ScheduleProps> = (props) => {
  return (
    <ScheduleProvider {...props}>
      <ScheduleContent />
    </ScheduleProvider>
  )
}
