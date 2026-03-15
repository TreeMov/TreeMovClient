import type { SignInStepSchema } from '@/modules/auth/types'
import type { SignInStepProps } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useLoginAuth } from '@/api/generated/auth'
import { myOrgsOrganizationsMe } from '@/api/generated/core'
import { session } from '@/api/session'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Link } from '@/components/shared/link'
import { Password } from '@/components/shared/password'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { createConnectForm } from '@/hocs/create-connect-form'
import { paths } from '@/router'

import { useFormValues } from '../../sign-in/hooks'

import { signInSchema } from './schema'

const ConnectForm = createConnectForm<SignInStepSchema>()

export const SignInStep: React.FC<SignInStepProps> = ({ onNext }) => {
  const { email, password } = useFormValues()

  const { mutateAsync: login, isPending } = useLoginAuth({
    mutation: {
      onSuccess: async ({ access_token, refresh_token }) => {
        session.createSession({
          access_token,
          refresh_token,
        })
        const [{ id }] = await myOrgsOrganizationsMe()
        session.changeOrganization(id)
        onNext({ email, password })
      },
    },
  })

  return (
    <AuthLayout
      title="Регистрация"
      description="Для регистрации заполните необходимую информацию"
    >
      <Form
        useFormProps={{
          resolver: zodResolver(signInSchema),
          defaultValues: {
            email: '',
            password: '',
          },
          disabled: isPending,
        }}
        onSubmit={(data) => login({ data })}
      >
        <div className="mb-7.5 w-full">
          <div className="mb-7.5 space-y-5">
            <ConnectForm>
              {({ control }) => (
                <Input
                  inputProps={{
                    size: 'xl',
                    placeholder: 'Электронная почта',
                  }}
                  control={control}
                  name="email"
                />
              )}
            </ConnectForm>
            <ConnectForm>
              {({ control }) => (
                <Password
                  inputProps={{ size: 'xl', placeholder: 'Пароль' }}
                  control={control}
                  name="password"
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
                Войти
              </Button>
            )}
          </ConnectForm>
        </div>

        <div className="flex items-center gap-2.5">
          <Typography variant="grey" size="md">
            <p>Нет аккаунта?</p>
          </Typography>
          <Link
            to={{ path: paths['sign-up'] }}
            className="text-xl text-violet-600 underline underline-offset-2"
          >
            Зарегистрироваться.
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
