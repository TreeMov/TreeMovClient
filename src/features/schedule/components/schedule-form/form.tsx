import { X } from 'lucide-react'
import React from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { ScheduleDelete } from '../schedule-delete'

import { EventForm, LessonForm } from './components'
import { tabsOptions } from './constants'
import { type FormProps, TabsEnum } from './types'

export const ScheduleForm: React.FC<FormProps> = ({
  onClose,
  onChangeHandler,
  onCreateHandler,
  onCreatePeriodHandler,
  ...event
}) => {
  const { id, type } = event

  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-3">
        <ScheduleDelete id={id} type={type} />
        <button
          className="flex size-6 cursor-pointer items-center justify-center"
          onClick={onClose}
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
          <LessonForm
            onChangeHandler={onChangeHandler}
            onCreateHandler={onCreateHandler}
            onCreatePeriodHandler={onCreatePeriodHandler}
            {...event}
          />
        </TabsContent>
        <TabsContent value={TabsEnum.EVENT}>
          <EventForm
            onChangeHandler={onChangeHandler}
            onCreateHandler={onCreateHandler}
            onCreatePeriodHandler={onCreatePeriodHandler}
            {...event}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
