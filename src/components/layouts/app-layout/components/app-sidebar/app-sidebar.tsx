import React from 'react'
import { useLocation } from 'react-router'

import { Link } from '@/components/shared/link'
import { Icon } from '@/components/ui/icon'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Typography } from '@/components/ui/typography'
import { paths } from '@/router/contract'
import { cn } from '@/utils/helpers/shadcn'

import { SidebarLink } from '../sidebar-link'

import { getLinks } from './helpers'

export const AppSidebar: React.FC = () => {
  const { pathname } = useLocation()
  const { open } = useSidebar()

  const links = getLinks()

  const isMatches = (to: string) =>
    to === paths.home ? pathname === to : pathname.includes(to)

  return (
    <div className="relative">
      <Sidebar collapsible="icon">
        <SidebarHeader className="overflow-hidden">
          <Link
            to={{ path: paths.home }}
            className="mx-auto flex items-center gap-1.5 transition-all group-data-[state=collapsed]:mx-0"
          >
            <Icon name="general:logo" className="size-12 shrink-0" />
            <Typography
              variant="white"
              size="xl"
              className="group-data-[state=collapsed]:invisible"
            >
              <p>TreeMov</p>
            </Typography>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarGroup>
              <div className="flex flex-col gap-1.5">
                {links.map(({ label, to, icon }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isMatches(to)}
                      tooltip={label}
                    >
                      <SidebarLink to={to}>
                        <Icon className="shrink-0" name={icon} />
                        <span className="group-data-[state=collapsed]:hidden">
                          {label}
                        </span>
                      </SidebarLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarGroup>
          </SidebarMenu>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarTrigger
        className={cn(
          'absolute top-[50%] right-0 z-10 translate-y-[-50%]',
          { 'translate-x-full': !open }
        )}
      />
    </div>
  )
}
