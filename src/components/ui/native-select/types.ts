import type * as React from 'react'

export type NativeSelectProps = Omit<
  React.ComponentProps<'select'>,
  'size'
> & {
  size?: 'sm' | 'default'
}

export type NativeSelectOptionProps = React.ComponentProps<'option'>

export type NativeSelectOptGroupProps =
  React.ComponentProps<'optgroup'>
