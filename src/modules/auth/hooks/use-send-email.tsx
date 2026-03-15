import {
  type EmailCodePurpose,
  useSendEmail as useGeneratedSendEmail,
} from '@/api/generated/email'

export const useSendEmail = (
  purpose: EmailCodePurpose,
  email: string
) => {
  const { mutateAsync: sendEmail, ...rest } = useGeneratedSendEmail()

  const handleSendEmail = () =>
    sendEmail({ data: { email, purpose } })

  return { handleSendEmail, ...rest }
}
