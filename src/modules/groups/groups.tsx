import { useQueryClient } from '@tanstack/react-query'
import React from 'react'

import {
  listStudentGroupsQueryOptions,
  useDeleteStudentGroup,
} from '@/api/generated/core'
import { PageLayoutList } from '@/components/layouts/page-layout-list'

import { Content, Header } from './components'

export const Groups: React.FC = () => {
  const queryClient = useQueryClient()
  const { mutateAsync: deleteGroup } = useDeleteStudentGroup()

  return (
    <PageLayoutList
      actions={<Header />}
      deleteHandler={(id) => deleteGroup({ id })}
      onDeleteSuccess={() =>
        queryClient.invalidateQueries(listStudentGroupsQueryOptions())
      }
    >
      <Content />
    </PageLayoutList>
  )
}
