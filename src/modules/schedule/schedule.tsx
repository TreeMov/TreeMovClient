import React from 'react'

import { PageLayout } from '@/components/layouts/page-layout'

import { Content, Header } from './components'
import { useFilters } from './hooks'

export const Schedule: React.FC = () => {
  const filters = useFilters()

  return (
    <PageLayout
      breadcrumbs={['Расписание']}
      actions={<Header />}
      scrollable={false}
    >
      <Content {...filters} />
    </PageLayout>
  )
}
