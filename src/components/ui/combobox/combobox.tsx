import type {
  ComboboxProps,
  ComboboxRenderedContentProps,
} from './types'

import React from 'react'

import {
  Combobox as UCombobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  type ComboboxOption,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/primitives/combobox'

import { Button } from '../button'

const ComboboxContentRendered = <Values extends string>({
  placeholder,
}: ComboboxRenderedContentProps<Values>) => {
  return (
    <React.Fragment>
      <ComboboxTrigger
        render={
          <Button variant="outlined" className="justify-start">
            <ComboboxValue placeholder={placeholder} />
          </Button>
        }
      />
      <ComboboxContent>
        <ComboboxEmpty>Ничего не найдено</ComboboxEmpty>
        <ComboboxList<Values, ComboboxOption<Values>>>
          {({ value, label }) => (
            <ComboboxItem key={value} value={value}>
              {label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </React.Fragment>
  )
}

export const Combobox = <Values extends string>(
  props: ComboboxProps<Values>
) => {
  const { options, placeholder } = props

  const renderedOptions: ComboboxRenderedContentProps<Values> = {
    placeholder,
  }

  if (props.multiple) {
    return (
      <UCombobox<Values, true> {...props} items={options}>
        <ComboboxContentRendered {...renderedOptions} />
      </UCombobox>
    )
  }

  return (
    <UCombobox<Values, false> {...props} items={options}>
      <ComboboxContentRendered {...renderedOptions} />
    </UCombobox>
  )
}
