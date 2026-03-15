import { useContext } from 'react'

import { ScheduleContext } from '../context'

export const useSchedule = () => {
  return useContext(ScheduleContext)
}
