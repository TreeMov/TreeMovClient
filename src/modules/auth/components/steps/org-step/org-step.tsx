import type { SubmitHandler } from 'react-hook-form'
import type { OrgStepSchema } from '@/modules/auth/types'
import type { OrgStepProps } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useLoginAuth } from '@/api/generated/auth'
import { useInitOrganizationOrganizations } from '@/api/generated/core'
import { emailCodePurposeEnum } from '@/api/generated/email'
import { session } from '@/api/session'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { CodeResend } from '@/components/shared/auth'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Button } from '@/components/ui/button'
import { createConnectForm } from '@/hocs/create-connect-form'
import { useSendEmail } from '@/modules/auth/hooks'

import { orgSchema } from './schema'

const ConnectForm = createConnectForm<OrgStepSchema>()

export const OrgStep: React.FC<OrgStepProps> = ({
  email,
  password,
  onNext,
}) => {
  const { mutateAsync: login } = useLoginAuth()

  const { handleSendEmail, isPending: isPendingSendEmail } =
    useSendEmail(emailCodePurposeEnum.login, email)

  const { mutateAsync: createOrganization } =
    useInitOrganizationOrganizations()

  const onSubmit: SubmitHandler<OrgStepSchema> = async ({
    organization,
  }) => {
    const { access_token, refresh_token } = await login({
      data: { email, password },
    })
    session.createSession({
      access_token,
      refresh_token,
    })

    const { id } = await createOrganization({
      data: { title: organization },
    })
    session.changeOrganization(id)
    onNext?.({ organization })
  }

  return (
    <AuthLayout
      title="Регистрация"
      description="Введите название организации"
    >
      <Form
        useFormProps={{
          resolver: zodResolver(orgSchema),
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
      <CodeResend
        isLoading={isPendingSendEmail}
        onResend={handleSendEmail}
      />
    </AuthLayout>
  )
}
