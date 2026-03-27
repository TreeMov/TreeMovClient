import type { SubmitHandler } from 'react-hook-form'
import type { CodeStepSchema } from '@/modules/auth/types'
import type { CodeStepProps } from './types'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useRef } from 'react'

import { useLoginAuth } from '@/api/generated/auth'
import {
  emailCodePurposeEnum,
  useVerifyEmail,
} from '@/api/generated/email'
import { session } from '@/api/session'
import { AuthLayout } from '@/components/layouts/auth-layout'
import { CodeResend } from '@/components/shared/auth'
import { Form } from '@/components/shared/form'
import { InputOtp } from '@/components/shared/input-otp'
import { Button } from '@/components/ui/button'
import {
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { createConnectForm } from '@/hocs/create-connect-form'
import { useSendEmail } from '@/modules/auth/hooks'

import { codeSchema } from './schema'

const ConnectForm = createConnectForm<CodeStepSchema>()

export const CodeStep: React.FC<CodeStepProps> = ({
  password,
  email,
  onNext,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { mutateAsync: verifyEmail } = useVerifyEmail()

  const { handleSendEmail, isPending: isPendingSendEmail } =
    useSendEmail(emailCodePurposeEnum.verify_email, email)

  const { mutateAsync: login } = useLoginAuth()

  const onSubmit: SubmitHandler<CodeStepSchema> = async ({
    code,
  }) => {
    await verifyEmail({
      data: {
        code,
        email,
        purpose: emailCodePurposeEnum.verify_email,
      },
    })
    const { access_token, refresh_token } = await login({
      data: { email, password },
    })
    session.createSession({
      access_token,
      refresh_token,
    })
    onNext?.({ code })
  }

  return (
    <AuthLayout
      title="Регистрация"
      description={`Введите код, отправленный на почту ${email}`}
    >
      <Form
        useFormProps={{
          resolver: zodResolver(codeSchema),
          defaultValues: {
            code: '',
          },
        }}
        onSubmit={onSubmit}
      >
        <div className="mb-7.5 w-full">
          <div className="mb-7.5 space-y-5">
            <ConnectForm>
              {({ control }) => (
                <InputOtp
                  control={control}
                  name="code"
                  inputProps={{
                    autoFocus: true,
                    maxLength: 6,
                    containerClassName: 'justify-center',
                    onComplete: () => buttonRef.current?.focus(),
                  }}
                >
                  <InputOTPGroup className="gap-2.5">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <InputOTPSlot key={idx} index={idx} />
                    ))}
                  </InputOTPGroup>
                </InputOtp>
              )}
            </ConnectForm>
          </div>
          <ConnectForm>
            {({ formState: { isSubmitting } }) => (
              <Button
                ref={buttonRef}
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
