import { createConfig } from '../helpers/create-config'

export default createConfig(
  'https://api.treemov.ru/notify/openapi.json',
  '@/api/clients/email-client',
  'email'
)
