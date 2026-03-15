import { createConfig } from '../helpers/create-config'

export default createConfig(
  'http://localhost:8002/openapi.json',
  '@/api/clients/email-client',
  'email'
)
