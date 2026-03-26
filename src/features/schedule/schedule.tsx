import type { ScheduleProps } from './types'

import React from 'react'

import { ScheduleContent } from './components/schedule-content'
import { ScheduleProvider } from './provider'

const ScheduleComponent: React.FC<ScheduleProps> = (props) => {
  return (
    <ScheduleProvider {...props}>
      <ScheduleContent />
    </ScheduleProvider>
  )
}

export const Schedule = React.memo(ScheduleComponent)
