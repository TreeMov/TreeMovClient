import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './types'

import { Tabs as TabsPrimitive } from 'radix-ui'
import * as React from 'react'

import { cn } from '@/utils/helpers//shadcn'

import { Button } from '../button'

import { tabsListVariants } from './constants'

const Tabs: React.FC<TabsProps> = ({
  className,
  orientation = 'horizontal',
  ...props
}) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'group/tabs flex gap-2 data-[orientation=horizontal]:flex-col',
        className
      )}
      {...props}
    />
  )
}

const TabsList: React.FC<TabsListProps> = ({
  className,
  variant = 'default',
  ...props
}) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      asChild
      className={cn(
        'data-[state=active]:border-transparent data-[state=active]:bg-violet-200',
        className
      )}
      {...props}
    >
      <Button variant="outlined">{children}</Button>
    </TabsPrimitive.Trigger>
  )
}

const TabsContent: React.FC<TabsContentProps> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
