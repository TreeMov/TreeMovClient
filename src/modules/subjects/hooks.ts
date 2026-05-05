import { useContext } from 'react'

import { SubjectsContext } from './context'

export const useSubjects = () => {
  return useContext(SubjectsContext)
}
