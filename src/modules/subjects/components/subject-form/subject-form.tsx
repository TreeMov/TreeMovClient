import type { GroupFormProps, Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React from 'react'

import { ColorPicker } from '@/components/shared/color-picker'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import {
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
import { createConnectForm } from '@/hocs/create-connect-form'
import { generateRandomHexColor } from '@/utils/helpers/colors'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const SubjectForm: React.FC<GroupFormProps> = ({
  onSubmit,
}) => {
  return (
    <Form
      className="flex flex-col gap-5"
      useFormProps={{
        resolver: zodResolver(schema),
        defaultValues: { title: '', color: generateRandomHexColor() },
      }}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <ConnectForm>
            {({ control }) => (
              <Input
                control={control}
                name="title"
                formItemClassName="grow w-full"
                inputProps={{
                  placeholder: 'Название',
                  autoFocus: true,
                }}
              />
            )}
          </ConnectForm>
          <div className="flex items-center">
            <span className="text-grey-500 inline-block px-2.5 text-sm font-bold">
              Цвет
            </span>
            <ConnectForm>
              {({ control }) => (
                <ColorPicker control={control} name="color">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outlined" size="icon-md">
                        <Plus />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-100">
                      <ColorPickerSelection className="h-40 rounded-lg" />
                      <ColorPickerHue />
                      <ColorPickerAlpha />
                      <div className="flex items-center gap-2">
                        <ColorPickerEyeDropper />
                        <ColorPickerOutput />
                        <ColorPickerFormat />
                      </div>
                    </PopoverContent>
                  </Popover>
                </ColorPicker>
              )}
            </ConnectForm>
          </div>
        </div>
      </div>
      <ConnectForm>
        {({ formState: { isSubmitting } }) => (
          <Button isPending={isSubmitting}>Сохранить</Button>
        )}
      </ConnectForm>
    </Form>
  )
}
