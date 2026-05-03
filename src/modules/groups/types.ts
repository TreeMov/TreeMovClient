import type { Dispatch } from 'react'

export type GroupsContextType = {
  selectedGroupsIds: Record<number, number>
  setSelectedGroupsIds: Dispatch<React.SetStateAction<number[]>>
  checkSelectedGroup: (id: number) => boolean
}
