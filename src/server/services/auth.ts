import { hasDatabaseUrl } from '../db'
import { getBaseUrl } from '../env'
import { badRequest, conflict, internalError } from '../errors'
import { sendPasswordResetEmail } from '../email'
import { hashPassword, verifyPassword } from '../auth/password'
import { createResetToken, hashToken } from '../auth/token'
import { passwordResetTokensRepository } from '../repositories/password-reset-tokens'
import { usersRepository } from '../repositories/users'

export const authService = {
  async authorizeCredentials(email: string, password: string) {
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const user = await usersRepository.findByEmail(email)

    if (!user || !verifyPassword(password, user.passwordHash)) {
      throw badRequest('Email hoặc mật khẩu không đúng.', 'INVALID_CREDENTIALS')
    }

    return user
  },

  async signup(input: { name: string; email: string; password: string }) {
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const existingUser = await usersRepository.findByEmail(input.email)

    if (existingUser) {
      throw conflict('Email đã được sử dụng.', 'EMAIL_ALREADY_EXISTS')
    }

    await usersRepository.createStudent({
      name: input.name,
      email: input.email,
      passwordHash: hashPassword(input.password),
    })
  },

  async createPasswordReset(email: string) {
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const user = await usersRepository.findByEmail(email)

    if (!user) {
      return
    }

    await passwordResetTokensRepository.deleteExpiredAndUsed()

    const { token, tokenHash } = createResetToken()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30)

    await passwordResetTokensRepository.create({
      userId: user.id,
      tokenHash,
      expiresAt,
    })

    await sendPasswordResetEmail(user.email, `${getBaseUrl()}/reset-password/${token}`)
  },

  async resetPassword(token: string, password: string) {
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const resetToken = await passwordResetTokensRepository.findByTokenHash(hashToken(token))

    if (!resetToken || resetToken.usedAt || resetToken.expiresAt.getTime() < Date.now()) {
      throw badRequest(
        'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
        'INVALID_RESET_TOKEN',
      )
    }

    await usersRepository.updatePassword(resetToken.userId, hashPassword(password))
    await passwordResetTokensRepository.markUsed(resetToken.id)
  },
}
