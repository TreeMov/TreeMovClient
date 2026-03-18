import type { TabOption } from './types'

export enum TabsEnum {
  LESSON = 'lesson',
  EVENT = 'event',
}

export const tabsOptions: TabOption[] = [
  { value: TabsEnum.LESSON, label: 'Занятия' },
  { value: TabsEnum.EVENT, label: 'Мероприятия' },
]
