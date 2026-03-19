import type { ScheduleEvent } from '../../types'

import { X } from 'lucide-react'
import React, { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { useSchedule } from '../../hooks'
import { EventForm, LessonForm } from '../forms'
import { ScheduleDelete } from '../schedule-delete'

import { TabsEnum, tabsOptions } from './constants'

export const SchedulePopover: React.FC<
  React.PropsWithChildren<ScheduleEvent>
> = ({ children, ...event }) => {
  const { id, type } = event

  const defaultOpen = type === 'create'
  const [open, setOpen] = useState(defaultOpen)
  const [initialState] = useState(event.state)

  const { store } = useSchedule()

  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (open) {
      store.setActiveEvent(id)
    } else {
      store.clearActiveEvent(id, initialState)
    }
  }

  return (
    <Popover modal open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        side="right"
        align="start"
        className="min-w-118 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-end gap-3">
          <ScheduleDelete id={id} type={type} />
          <button
            className="flex size-6 cursor-pointer items-center justify-center"
            onClick={() => setOpen(false)}
          >
            <X />
          </button>
        </div>
        <Tabs defaultValue={TabsEnum.LESSON}>
          <TabsList className="mb-6 flex w-full items-center justify-center gap-3">
            {tabsOptions.map(({ value, label }) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={TabsEnum.LESSON}>
            <LessonForm {...event} />
          </TabsContent>
          <TabsContent value={TabsEnum.EVENT}>
            <EventForm {...event} />
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
