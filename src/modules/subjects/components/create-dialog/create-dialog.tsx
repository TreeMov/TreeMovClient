import type { SubmitHandler } from 'react-hook-form'
import type { Schema } from '../subject-form/types'

import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { VisuallyHidden } from 'radix-ui'
import React, { useState } from 'react'

import {
  listSubjectsQueryOptions,
  useCreateSubject,
} from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'

import { SubjectForm } from '../subject-form'

export const CreateDialog: React.FC = () => {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)

  const { mutateAsync: create } = useCreateSubject({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries(listSubjectsQueryOptions()),
    },
  })

  const onSubmit: SubmitHandler<Schema> = async (data) => {
    await create({ data })
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
          <DialogDescription>Создать предмет</DialogDescription>
        </VisuallyHidden.Root>
        <SubjectForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  )
}
