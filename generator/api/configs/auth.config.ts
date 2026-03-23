import { createConfig } from '../helpers/create-config'

export default createConfig(
  'http://localhost:8000/openapi.json',
  '@/api/clients/auth-client',
  'auth'
)
