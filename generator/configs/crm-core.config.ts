import { createConfig } from '../helpers/create-config'

export default createConfig(
  'http://localhost:8001/openapi.json',
  '@/api/clients/core-client',
  'core'
)
