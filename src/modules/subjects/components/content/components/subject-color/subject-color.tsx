import type { SubjectColorProps } from './types'

import { useQueryClient } from '@tanstack/react-query'
import Color from 'color'
import React, { useState } from 'react'

import {
  listSubjectsQueryOptions,
  useUpdateSubject,
} from '@/api/generated/core'
import { Button } from '@/components/ui/button'
import {
  ColorPicker,
  ColorPickerAlpha,
  ColorPickerEyeDropper,
  ColorPickerFormat,
  ColorPickerHue,
  ColorPickerOutput,
  ColorPickerSelection,
} from '@/components/ui/color-picker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export const SubjectColor: React.FC<SubjectColorProps> = ({
  id,
  color,
}) => {
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] =
    useState<Required<Parameters<typeof Color>>[0]>(color)

  const queryClient = useQueryClient()
  const { mutateAsync: updateSubject, isPending: isPendingUpdate } =
    useUpdateSubject({
      mutation: {
        onSuccess: () =>
          queryClient.invalidateQueries(listSubjectsQueryOptions()),
      },
    })

  const onClick = async () => {
    if (!selectedColor || typeof selectedColor !== 'string') {
      return
    }

    try {
      await updateSubject({ id, data: { color: selectedColor } })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    } finally {
      setOpen(false)
    }
  }

  return (
    <ColorPicker
      value={selectedColor}
      onChange={(value) =>
        typeof value === 'string' && setSelectedColor(value)
      }
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            className="size-11 cursor-pointer rounded-full"
            style={{ backgroundColor: color }}
          />
        </PopoverTrigger>
        <PopoverContent className="z-100">
          <ColorPickerSelection className="h-40 rounded-lg" />
          <ColorPickerHue />
          <ColorPickerAlpha />
          <div className="mb-2.5 flex items-center gap-2">
            <ColorPickerEyeDropper />
            <ColorPickerOutput />
            <ColorPickerFormat />
          </div>
          <Button
            isPending={isPendingUpdate}
            className="w-full"
            onClick={onClick}
          >
            Сохранить
          </Button>
        </PopoverContent>
      </Popover>
    </ColorPicker>
  )
}
