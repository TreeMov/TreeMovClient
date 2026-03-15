import type {
  ItemActionsProps,
  ItemContentProps,
  ItemDescriptionProps,
  ItemFooterProps,
  ItemGroupProps,
  ItemHeaderProps,
  ItemMediaProps,
  ItemProps,
  ItemSeparatorProps,
  ItemTitleProps,
} from './types'

import { Slot } from 'radix-ui'
import * as React from 'react'

import { Separator } from '@/components/ui/separator'
import { cn } from '@/utils/helpers//shadcn'

import { itemMediaVariants, itemVariants } from './constants'

const ItemGroup: React.FC<ItemGroupProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn('group/item-group flex flex-col', className)}
      {...props}
    />
  )
}

const ItemSeparator: React.FC<ItemSeparatorProps> = ({
  className,
  ...props
}) => {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn('my-0', className)}
      {...props}
    />
  )
}

const Item: React.FC<ItemProps> = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot.Root : 'div'
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

const ItemMedia: React.FC<ItemMediaProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

const ItemContent: React.FC<ItemContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-content"
      className={cn(
        'flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none',
        className
      )}
      {...props}
    />
  )
}

const ItemTitle: React.FC<ItemTitleProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-title"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium',
        className
      )}
      {...props}
    />
  )
}

const ItemDescription: React.FC<ItemDescriptionProps> = ({
  className,
  ...props
}) => {
  return (
    <p
      data-slot="item-description"
      className={cn(
        'text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  )
}

const ItemActions: React.FC<ItemActionsProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}

const ItemHeader: React.FC<ItemHeaderProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-header"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      {...props}
    />
  )
}

const ItemFooter: React.FC<ItemFooterProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        'flex basis-full items-center justify-between gap-2',
        className
      )}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
