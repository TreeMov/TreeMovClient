import type { OnSubmit } from '../group-form/types'

import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { VisuallyHidden } from 'radix-ui'
import React, { useState } from 'react'

import {
  listStudentGroupsQueryOptions,
  useCreateStudentGroup,
} from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'

import { GroupForm } from '../group-form'

export const CreateDialog: React.FC = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)

  const { mutateAsync: create } = useCreateStudentGroup({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries(
          listStudentGroupsQueryOptions()
        ),
    },
  })

  const onSubmit: OnSubmit = async ({
    selectedStudentsIds,
    ...data
  }) => {
    await create({
      data: { ...data, student_ids: selectedStudentsIds.map(Number) },
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outlined" size="icon-md">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden.Root>
          <DialogDescription>Создать группу</DialogDescription>
        </VisuallyHidden.Root>
        <GroupForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
