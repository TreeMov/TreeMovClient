import {
  type EmailCodePurpose,
  useSendEmailEmailSendPost,
} from '@/api/generated/email'

export const useSendEmail = (
  purpose: EmailCodePurpose,
  email: string
) => {
  const { mutateAsync: sendEmail, ...rest } =
    useSendEmailEmailSendPost()

  const handleSendEmail = () =>
    sendEmail({ data: { email, purpose } })

  return { handleSendEmail, ...rest }
}
