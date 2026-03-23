import type { SubmitHandler } from 'react-hook-form'
import type { SignUpStepSchema } from '@/modules/auth/types'
import type { SignUpStepProps } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

import { useRegisterAuth } from '@/api/generated/auth'
import {
  emailCodePurposeEnum,
  useSendEmail,
} from '@/api/generated/email'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { Form } from '@/components/shared/form'
import { Input } from '@/components/shared/input'
import { Link } from '@/components/shared/link'
import { Password } from '@/components/shared/password'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { createConnectForm } from '@/hocs/create-connect-form'
import { paths } from '@/router/contract'

import { signUpSchema } from './schema'

const ConnectForm = createConnectForm<SignUpStepSchema>()

export const SignUpStep: React.FC<SignUpStepProps> = ({ onNext }) => {
  const { mutateAsync: sendEmail, isPending: isPendingSendEmail } =
    useSendEmail()

  const { mutateAsync: register, isPending: isPendingRegister } =
    useRegisterAuth({
      mutation: {
        onSuccess: (_, { data: { email } }) => {
          sendEmail({
            data: {
              email,
              purpose: emailCodePurposeEnum.verify_email,
            },
          })
        },
      },
    })

  const onSubmit: SubmitHandler<SignUpStepSchema> = async (data) => {
    await register({ data })
    onNext(data)
  }

  const isLoading = isPendingRegister || isPendingSendEmail

  return (
    <AuthLayout
      title="Регистрация"
      description="Для регистрации заполните необходимую информацию"
    >
      <Form
        useFormProps={{
          resolver: zodResolver(signUpSchema),
          defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          },
          disabled: isLoading,
        }}
        onSubmit={onSubmit}
      >
        <div className="mb-7.5 w-full">
          <div className="mb-7.5 space-y-5">
            <ConnectForm>
              {({ control }) => (
                <Input
                  inputProps={{
                    size: 'xl',
                    placeholder: 'Имя пользователя',
                  }}
                  control={control}
                  name="username"
                />
              )}
            </ConnectForm>
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
            <ConnectForm>
              {({ control }) => (
                <Password
                  inputProps={{
                    size: 'xl',
                    placeholder: 'Повторите пароль',
                  }}
                  control={control}
                  name="confirmPassword"
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

        <div className="flex items-center gap-2.5">
          <Typography variant="grey" size="md">
            <p>Уже есть аккаунт?</p>
          </Typography>
          <Link
            to={{ path: paths['sign-in'] }}
            className="text-xl text-violet-600 underline underline-offset-2"
          >
            Войти.
          </Link>
        </div>
      </Form>
    </AuthLayout>
  )
}
