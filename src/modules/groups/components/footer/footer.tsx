import { useQueryClient } from '@tanstack/react-query'
import { VisuallyHidden } from 'radix-ui'
import React from 'react'

import {
  listStudentGroupsQueryOptions,
  useDeleteStudentGroup,
} from '@/api/generated/core'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { useGroups } from '../../hooks'

export const Footer: React.FC = () => {
  const queryClient = useQueryClient()
  const { selectedGroupsIds } = useGroups()
  const { mutateAsync: deleteGroup } = useDeleteStudentGroup({
    mutation: {
      onSuccess: () =>
        queryClient.invalidateQueries(
          listStudentGroupsQueryOptions()
        ),
    },
  })

  const deleteSelectedGroups = () => {
    for (const id of Object.values(selectedGroupsIds)) {
      deleteGroup({ params: { id } })
    }
  }

  const hasSelected = Object.keys(selectedGroupsIds).length > 0

  return (
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={!hasSelected}
            className="min-w-3xs"
            size="lg"
            variant="dark"
            appendIcon={{ name: 'general:delete' }}
          >
            Удалить
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="justify-center">
            <AlertDialogTitle>Удалить выбранное?</AlertDialogTitle>
            <VisuallyHidden.Root>
              <AlertDialogDescription>
                Удаление выбранных групп
              </AlertDialogDescription>
            </VisuallyHidden.Root>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-5">
            <AlertDialogAction
              size="lg"
              variant="dark"
              onClick={deleteSelectedGroups}
            >
              Удалить
            </AlertDialogAction>
            <AlertDialogCancel size="lg" variant="outlined">
              Отменить
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
