import type { Dispatch } from 'react'

export type SubjectsContextType = {
  selectedSubjectsIds: number[]
  setSelectedSubjectsIds: Dispatch<React.SetStateAction<number[]>>
}
