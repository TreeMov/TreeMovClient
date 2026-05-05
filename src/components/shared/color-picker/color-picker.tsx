import type { ColorPickerFormProps } from './types'

import { type FieldPath, type FieldValues } from 'react-hook-form'

import { ColorPicker as UColorPicker } from '@/components/ui/color-picker'

import { FormWrapper } from '../form-wrapper'

export const ColorPicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  inputProps,
  children,
  ...props
}: React.PropsWithChildren<
  ColorPickerFormProps<TFieldValues, TName>
>) => {
  return (
    <FormWrapper {...props}>
      {({ field }) => (
        <UColorPicker {...inputProps} {...field}>
          {children}
        </UColorPicker>
      )}
    </FormWrapper>
  )
}
