import type { FooterProps } from './types'

import { VisuallyHidden } from 'radix-ui'
import React, { useTransition } from 'react'

import { useGroupSelect } from '@/components/shared/group-select/hooks'
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

export const Footer: React.FC<FooterProps> = ({
  deleteHandler,
  onDeleteSuccess,
}) => {
  const { selectedIds, hasSelectedIds, onReset } = useGroupSelect()

  const [isPending, startTransition] = useTransition()

  const onDelete = () => {
    startTransition(async () => {
      try {
        await Promise.all(selectedIds.map((id) => deleteHandler(id)))
        onReset()
        onDeleteSuccess()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
  }

  return (
    <div className="flex justify-end">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            isPending={isPending}
            disabled={!hasSelectedIds}
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
                Удаление выбранных элементов
              </AlertDialogDescription>
            </VisuallyHidden.Root>
          </AlertDialogHeader>
          <div className="grid grid-cols-2 gap-5">
            <AlertDialogAction
              size="lg"
              variant="dark"
              onClick={onDelete}
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
