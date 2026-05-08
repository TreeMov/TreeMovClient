import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import {
  listSubjectsQueryOptions,
  useDeleteSubject,
} from '@/api/generated/core'
import { PageLayoutList } from '@/components/layouts/page-layout-list'

import { Content, Header } from './components'

export const Subjects: React.FC = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteSubject } = useDeleteSubject()

  return (
    <PageLayoutList
      actions={<Header />}
      deleteHandler={(id) => deleteSubject({ params: { id } })}
      onDeleteSuccess={() =>
        queryClient.invalidateQueries(listSubjectsQueryOptions())
      }
    >
      <Content />
    </PageLayoutList>
  )
}
