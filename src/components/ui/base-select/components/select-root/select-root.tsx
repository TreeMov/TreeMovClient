import React from 'react'

import { Popover } from '@/components/ui/popover'

import { useBaseSelectContext } from '../../hooks'

export const SelectRoot: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { isOpen, isModal, setIsOpen } = useBaseSelectContext()

  return (
    <Popover open={isOpen} modal={isModal} onOpenChange={setIsOpen}>
      {children}
    </Popover>
  )
}
