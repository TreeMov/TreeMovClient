import { createConfig } from '../helpers/create-config'

export default createConfig(
  'https://api.treemov.ru/crm/openapi.json',
  '@/api/clients/core-client',
  'core'
)
