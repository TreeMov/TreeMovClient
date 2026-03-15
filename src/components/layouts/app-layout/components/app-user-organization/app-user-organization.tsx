import type React from 'react'

import { useLogoutAuth } from '@/api/generated/auth'
import { useMyOrgsOrganizationsMe } from '@/api/generated/core'
import { session } from '@/api/session'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuTriggerButton,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/components/ui/icon'
import { useNavigate } from '@/hooks/use-navigate'
import { paths } from '@/router'

export const AppUserOrganization: React.FC = () => {
  const navigate = useNavigate()

  const { data, isPending: isPendingOrganizations } =
    useMyOrgsOrganizationsMe()

  const { mutateAsync: logout, isPending: isPendingLogout } =
    useLogoutAuth({
      mutation: {
        onSuccess: () => {
          session.deleteSession()
          navigate({ to: { path: paths['sign-in'] } })
        },
      },
    })

  if (isPendingOrganizations || !data) {
    return null
  }

  const currentOrg = data[0]
  const restOrgs = data.slice(1, data.length)

  const handleLogout = async () => {
    const { refresh_token } = session.getSessionTokens()

    if (!refresh_token) {
      session.deleteSession()
      return navigate({ to: { path: paths['sign-in'] } })
    }

    await logout({
      data: {
        refresh_token,
      },
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuTriggerButton>
          {currentOrg.org.title}
        </DropdownMenuTriggerButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="general:settings" className="size-6" />
            <span>Настройки</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {!!restOrgs.length && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {restOrgs.map(({ org: { title } }) => (
                <DropdownMenuItem key={title}>
                  {title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon name="general:plus" className="size-6" />
            <span>Добавить аккаунт</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPendingLogout}
            onClick={handleLogout}
          >
            <Icon name="general:logout" className="size-6" />
            <span>Выйти</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
