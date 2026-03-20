import React from 'react'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { DropdownMenuTriggerButton } from '@/components/ui/dropdown-menu'

import { useAppLayout } from '../../hooks'

export const AppUserButton: React.FC = () => {
  const { currentOrg } = useAppLayout()

  return (
    <DropdownMenuTriggerButton>
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          className="grayscale"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span>{currentOrg.role.title}</span>
    </DropdownMenuTriggerButton>
  )
}
