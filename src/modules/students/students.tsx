import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import {
  listStudentsQueryOptions,
  useDeleteStudent,
} from '@/api/generated/core'
import { PageLayoutList } from '@/components/layouts/page-layout-list'

import { Content, Header } from './components'

export const Students: React.FC = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteStudent } = useDeleteStudent()

  return (
    <PageLayoutList
      actions={<Header />}
      deleteHandler={(id) => deleteStudent({ params: { id } })}
      onDeleteSuccess={() =>
        queryClient.invalidateQueries(listStudentsQueryOptions())
      }
    >
      <Content />
    </PageLayoutList>
  )
}
