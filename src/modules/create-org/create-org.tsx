import type { SubmitHandler } from 'react-hook-form'
import type { Schema } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useOrganizationInit } from '@/api/generated/core'
import { session } from '@/api/session'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'

import { schema } from './schema'

const ConnectForm = createConnectForm<Schema>()

export const CreateOrg: React.FC = () => {
  const { mutateAsync: createOrganization } = useOrganizationInit()

  const onSubmit: SubmitHandler<Schema> = async ({
    organization,
  }) => {
    const { id } = await createOrganization({
      data: { title: organization },
    })
    session.changeOrg(id)
  }

  return (
    <AuthLayout
      title="Регистрация"
      description="Введите название организации"
    >
      <Form
        useFormProps={{
          resolver: zodResolver(schema),
          defaultValues: {
            organization: '',
          },
        }}
        onSubmit={onSubmit}
      >
        <div className="mb-7.5 w-full">
          <div className="mb-7.5 space-y-5">
            <ConnectForm>
              {({ control }) => (
                <Input
                  control={control}
                  name="organization"
                  inputProps={{ size: 'xl', variant: 'underline' }}
                />
              )}
            </ConnectForm>
          </div>
          <ConnectForm>
            {({ formState: { isSubmitting } }) => (
              <Button
                size="xl"
                isPending={isSubmitting}
                className="w-full"
              >
                Зарегистрироваться
              </Button>
            )}
          </ConnectForm>
        </div>
      </Form>
    </AuthLayout>
  )
}
