interface ImportMetaEnv {
  readonly VITE_AUTH_ENDPOINT: string
  readonly VITE_CORE_ENDPOINT: string
  readonly VITE_EMAIL_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
