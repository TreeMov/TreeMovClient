import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import type { Button } from '@/components/ui/button'
import type { Input } from '@/components/ui/input'
import type { Separator } from '@/components/ui/separator'
import type { TooltipContent } from '@/components/ui/tooltip'
import type { sidebarMenuButtonVariants } from './constants'

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export type SidebarProviderProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type SidebarProps = React.ComponentProps<'div'> & {
  side?: 'left' | 'right'
  variant?: 'sidebar' | 'floating' | 'inset'
  collapsible?: 'offcanvas' | 'icon' | 'none'
}

export type SidebarTriggerProps = React.ComponentProps<typeof Button>

export type SidebarRailProps = React.ComponentProps<'button'>

export type SidebarInsetProps = React.ComponentProps<'main'>

export type SidebarInputProps = React.ComponentProps<typeof Input>

export type SidebarHeaderProps = React.ComponentProps<'div'>

export type SidebarFooterProps = React.ComponentProps<'div'>

export type SidebarSeparatorProps = React.ComponentProps<
  typeof Separator
>

export type SidebarContentProps = React.ComponentProps<'div'>

export type SidebarGroupProps = React.ComponentProps<'div'>

export type SidebarGroupLabelProps = React.ComponentProps<'div'> & {
  asChild?: boolean
}

export type SidebarGroupActionProps =
  React.ComponentProps<'button'> & { asChild?: boolean }

export type SidebarGroupContentProps = React.ComponentProps<'div'>

export type SidebarMenuProps = React.ComponentProps<'ul'>

export type SidebarMenuItemProps = React.ComponentProps<'li'>

export type SidebarMenuButtonProps =
  React.ComponentProps<'button'> & {
    asChild?: boolean
    isActive?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>

export type SidebarMenuActionProps =
  React.ComponentProps<'button'> & {
    asChild?: boolean
    showOnHover?: boolean
  }

export type SidebarMenuBadgeProps = React.ComponentProps<'div'>

export type SidebarMenuSkeletonProps = React.ComponentProps<'div'> & {
  showIcon?: boolean
}

export type SidebarMenuSubProps = React.ComponentProps<'ul'>

export type SidebarMenuSubItemProps = React.ComponentProps<'li'>

export type SidebarMenuSubButtonProps = React.ComponentProps<'a'> & {
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}
