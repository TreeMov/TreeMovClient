import type { SubmitHandler } from 'react-hook-form'
import type { Schema } from '../student-form/types'

import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

import {
  listStudentsQueryOptions,
  useCreateStudent,
} from '@/api/generated/core'
import { session } from '@/api/session'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'

import { StudentForm } from '../student-form'

export const CreateDialog: React.FC = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)

  const { mutateAsync: createStudent } = useCreateStudent({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries(listStudentsQueryOptions()),
    },
  })

  const onSubmit: SubmitHandler<Schema> = async ({
    name,
    surname,
    birthday,
  }) => {
    if (!session.getSessionTokens().X_ORG_MEMBER_ID) {
      throw new Error('отсутствует токен организации')
    }

    await createStudent({
      data: {
        name,
        surname,
        birthday,
        org_mebmer_id: +session.getSessionTokens().X_ORG_MEMBER_ID!,
      },
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
        <StudentForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
