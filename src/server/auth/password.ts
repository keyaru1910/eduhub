import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export const hashPassword = (password: string) => {
  const salt = randomBytes(16).toString('hex')
  const derivedKey = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derivedKey}`
}

export const verifyPassword = (password: string, storedHash: string) => {
  const [salt, hash] = storedHash.split(':')

  if (!salt || !hash) {
    return false
  }

  const derivedKey = scryptSync(password, salt, 64)
  const storedKey = Buffer.from(hash, 'hex')

  return (
    derivedKey.length === storedKey.length &&
    timingSafeEqual(derivedKey, storedKey)
  )
}
