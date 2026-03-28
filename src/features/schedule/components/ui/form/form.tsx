import React from 'react'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'

import { EventForm, LessonForm } from './components'
import { tabsOptions } from './constants'
import { type FormProps, TabsEnum } from './types'

export const ScheduleForm: React.FC<FormProps> = ({
  defaultTab = TabsEnum.LESSON,
  defaultEventValues,
  defaultLessonValues,
  startHour,
  endHour,
  onSubmitEvent,
  onSubmitLesson,
}) => {
  return (
    <div>
      <Tabs defaultValue={defaultTab}>
        <TabsList className="mb-6 flex w-full items-center justify-center gap-3">
          {tabsOptions.map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="min-w-32"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={TabsEnum.LESSON}>
          <LessonForm
            startHour={startHour}
            endHour={endHour}
            defaultValues={defaultLessonValues}
            onSubmit={onSubmitLesson}
          />
        </TabsContent>
        <TabsContent value={TabsEnum.EVENT}>
          <EventForm
            startHour={startHour}
            endHour={endHour}
            defaultValues={defaultEventValues}
            onSubmit={onSubmitEvent}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
