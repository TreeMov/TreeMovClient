import { VisuallyHidden } from 'radix-ui'
import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  SCHEDULE_END_HOUR,
  SCHEDULE_START_HOUR,
} from '@/utils/constants/schedule'

import { useFormActions } from '../../hooks'
import { ScheduleForm } from '../ui/form'

export const ScheduleDialog: React.FC<
  React.PropsWithChildren<Parameters<typeof useFormActions>[0]>
> = ({ children, ...props }) => {
  const { onSubmitEvent, onSubmitLesson } = useFormActions(props)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <VisuallyHidden.Root>
          <DialogTitle>создание события</DialogTitle>
          <DialogDescription>создать событие</DialogDescription>
        </VisuallyHidden.Root>
        <ScheduleForm
          startHour={SCHEDULE_START_HOUR}
          endHour={SCHEDULE_END_HOUR}
          onClose={() => {}}
          onSubmitEvent={onSubmitEvent}
          onSubmitLesson={onSubmitLesson}
        />
      </DialogContent>
    </Dialog>
  )
}
