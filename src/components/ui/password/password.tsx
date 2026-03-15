import type { PasswordProps } from './types'

import React, { useState } from 'react'

import { Input } from '../input'

export const Password: React.FC<PasswordProps> = ({
  type: typeFromProps,
  ...props
}) => {
  const [isShow, setIsShow] = useState(false)
  const type: React.ComponentProps<'input'>['type'] = isShow
    ? typeFromProps
    : 'password'

  const toggleShow = () => setIsShow((prev) => !prev)

  return (
    <Input
      type={type}
      {...props}
      appendIcon={{
        name: isShow
          ? 'general:visibility-off'
          : 'general:visibility-on',
        className: 'cursor-pointer text-grey-500',
        onClick: toggleShow,
      }}
    />
  )
}
