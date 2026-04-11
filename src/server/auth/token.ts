import { createHash, randomBytes } from 'node:crypto'

export const createResetToken = () => {
  const token = randomBytes(32).toString('hex')
  const tokenHash = createHash('sha256').update(token).digest('hex')

  return { token, tokenHash }
}

export const hashToken = (token: string) =>
  createHash('sha256').update(token).digest('hex')
