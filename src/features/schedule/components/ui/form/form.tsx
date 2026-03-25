import { X } from 'lucide-react'
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
  defaultEventValues,
  defaultLessonValues,
  actions,
  onClose,
  onSubmitEvent,
  onSubmitLesson,
}) => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-end gap-3">
        {actions}
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
            defaultValues={defaultLessonValues}
            onSubmit={onSubmitLesson}
          />
        </TabsContent>
        <TabsContent value={TabsEnum.EVENT}>
          <EventForm
            defaultValues={defaultEventValues}
            onSubmit={onSubmitEvent}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
