import React from 'react'
import { useLocation } from 'react-router'

import { Link } from '@/components/shared/link'
import { Icon } from '@/components/ui/icon'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar'
import { Typography } from '@/components/ui/typography'
import { paths } from '@/router'
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
      <Sidebar className="bg-violet-600 px-5 py-12 text-white">
        <SidebarHeader className="mb-12 flex items-center justify-center">
          <Link
            to={{ path: paths.home }}
            className="flex items-center gap-1.5"
          >
            <Icon name="general:logo" className="size-12" />
            <Typography variant="white" size="xl">
              <p>TreeMov</p>
            </Typography>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <div className="flex flex-col gap-1.5">
              {links.map(({ label, to }) => (
                <SidebarLink
                  key={to}
                  isActive={isMatches(to)}
                  to={to}
                >
                  {label}
                </SidebarLink>
              ))}
            </div>
          </SidebarGroup>
        </SidebarContent>
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
