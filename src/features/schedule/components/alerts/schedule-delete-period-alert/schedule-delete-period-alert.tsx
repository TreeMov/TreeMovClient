import type { ScheduleDeletePeriodAlertProps } from './types'

import { VisuallyHidden } from 'radix-ui'
import React, { useRef } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { FieldLabel } from '@/components/ui/field'
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group'

import { PeriodAlertEnum } from '../types'

export const ScheduleDeletePeriodAlert: React.FC<
  ScheduleDeletePeriodAlertProps
> = ({ onSubmit, ...props }) => {
  const value = useRef<PeriodAlertEnum>(PeriodAlertEnum.CURRENT)

  const onValueChange = (val: PeriodAlertEnum) => {
    value.current = val
  }

  const onClick = () => {
    onSubmit(value.current)
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Удаление повторяющегося мероприятия
          </AlertDialogTitle>
          <VisuallyHidden.Root>
            <AlertDialogDescription>
              Выберите вариант удаления
            </AlertDialogDescription>
          </VisuallyHidden.Root>
        </AlertDialogHeader>
        <div>
          <RadioGroup
            defaultValue={PeriodAlertEnum.CURRENT}
            onValueChange={onValueChange}
          >
            <FieldLabel>
              <RadioGroupItem value={PeriodAlertEnum.CURRENT} />
              <span>Только это мероприятие</span>
            </FieldLabel>
            <FieldLabel>
              <RadioGroupItem value={PeriodAlertEnum.ALL} />
              <span>Все мероприятия</span>
            </FieldLabel>
          </RadioGroup>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outlined">
            Отмена
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
