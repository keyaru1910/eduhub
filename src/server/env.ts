import { internalError } from './errors'

const requiredServerEnv = ['NEXTAUTH_SECRET'] as const

export const requireServerEnv = (...keys: string[]) => {
  const missing = keys.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw internalError(`Missing required environment variables: ${missing.join(', ')}`, 'MISSING_ENV')
  }
}

export const ensureCoreServerEnv = () => {
  requireServerEnv(...requiredServerEnv)
}

export const getBaseUrl = () =>
  process.env.APP_BASE_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000'

export const hasSmtpConfig = () =>
  Boolean(process.env.SMTP_HOST) &&
  Boolean(process.env.SMTP_PORT) &&
  Boolean(process.env.SMTP_USER) &&
  Boolean(process.env.SMTP_PASS)
