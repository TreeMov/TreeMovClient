import React from 'react'

import { useMyProfilesMe } from '@/api/generated/core'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { DropdownMenuTriggerButton } from '@/components/ui/dropdown-menu'

export const AppUserButton: React.FC = () => {
  const { data, isPending } = useMyProfilesMe()

  if (isPending || !data) {
    return null
  }

  const currentProfile = data[0]

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
      <span>{currentProfile.email}</span>
    </DropdownMenuTriggerButton>
  )
}
