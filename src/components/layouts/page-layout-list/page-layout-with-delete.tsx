import type { PageLayoutListProps } from './types'

import React from 'react'

import { GroupSelect } from '@/components/shared/group-select'

import { PageLayout } from '../page-layout/page-layout'

import { Footer } from './components'

export const PageLayoutList: React.FC<
  React.PropsWithChildren<PageLayoutListProps>
> = ({ children, deleteHandler, onDeleteSuccess, ...props }) => {
  return (
    <GroupSelect>
      <PageLayout
        {...props}
        footer={
          <Footer
            deleteHandler={deleteHandler}
            onDeleteSuccess={onDeleteSuccess}
          />
        }
      >
        {children}
      </PageLayout>
    </GroupSelect>
  )
}
