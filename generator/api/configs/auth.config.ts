import { createConfig } from '../helpers/create-config'

export default createConfig(
  'https://api.treemov.ru/auth/openapi.json',
  '@/api/clients/auth-client',
  'auth'
)
