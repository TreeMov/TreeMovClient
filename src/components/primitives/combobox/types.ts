import type { Combobox as ComboboxPrimitive } from '@base-ui/react'
import type * as React from 'react'

export type ComboboxOption<T extends string> = {
  value: T
  label: string
}

export type ComboboxValueProps = ComboboxPrimitive.Value.Props

export type ComboboxTriggerProps = ComboboxPrimitive.Trigger.Props

export type ComboboxClearProps = ComboboxPrimitive.Clear.Props

export type ComboboxInputProps = ComboboxPrimitive.Input.Props & {
  showTrigger?: boolean
  showClear?: boolean
}

export type ComboboxContentProps = ComboboxPrimitive.Popup.Props &
  Pick<
    ComboboxPrimitive.Positioner.Props,
    'side' | 'align' | 'sideOffset' | 'alignOffset' | 'anchor'
  >

export type ComboboxListProps<
  Values extends string,
  Item extends ComboboxOption<Values>,
> = Omit<ComboboxPrimitive.List.Props, 'children'> & {
  children?:
    | React.ReactNode
    | ((item: Item, index: number) => React.ReactNode)
}

export type ComboboxItemProps = ComboboxPrimitive.Item.Props

export type ComboboxGroupProps = ComboboxPrimitive.Group.Props

export type ComboboxLabelProps = ComboboxPrimitive.GroupLabel.Props

export type ComboboxCollectionProps =
  ComboboxPrimitive.Collection.Props

export type ComboboxEmptyProps = ComboboxPrimitive.Empty.Props

export type ComboboxSeparatorProps = ComboboxPrimitive.Separator.Props

export type ComboboxChipsProps = React.ComponentPropsWithRef<
  typeof ComboboxPrimitive.Chips
> &
  ComboboxPrimitive.Chips.Props

export type ComboboxChipProps = ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean
}

export type ComboboxChipsInputProps = ComboboxPrimitive.Input.Props
