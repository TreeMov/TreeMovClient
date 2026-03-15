import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { Button } from '@/components/ui/button'
import type { InputProps } from '../input/types'
import type {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from './constants'

export type InputGroupProps = React.ComponentProps<'div'>

export type InputGroupAddonProps = React.ComponentProps<'div'> &
  VariantProps<typeof inputGroupAddonVariants>

export type InputGroupButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  'size'
> &
  VariantProps<typeof inputGroupButtonVariants>

export type InputGroupTextProps = React.ComponentProps<'span'>

export type InputGroupInputProps = Omit<
  React.ComponentProps<'input'>,
  'size'
> &
  Pick<InputProps, 'size'>

export type InputGroupTextareaProps = React.ComponentProps<'textarea'>
