import React from 'react'

export const Field: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="flex items-center gap-2.5">{children}</div>
}
