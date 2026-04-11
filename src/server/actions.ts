'use server'

import {
  validateContactInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateSignupInput,
} from './validation'
import { normalizeError } from './api'
import { hasDatabaseUrl } from './db'
import { internalError } from './errors'
import { authService } from './services/auth'
import { contactSubmissionsService } from './services/contact-submissions'
import type { ActionState } from '@/types/backend'

export const submitContactAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const input = validateContactInput(formData)

    await contactSubmissionsService.create(input)

    return {
      success: true,
      message: 'Cam on ban da lien he. Chung toi se phan hoi som.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Khong the gui lien he luc nay.',
      code: normalized.code,
    }
  }
}

export const signupAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const input = validateSignupInput(formData)
    await authService.signup(input)

    return {
      success: true,
      message: 'Dang ky thanh cong. Ban co the dang nhap ngay bay gio.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Dang ky that bai.',
      code: normalized.code,
    }
  }
}

export const forgotPasswordAction = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { email } = validateForgotPasswordInput(formData)
    await authService.createPasswordReset(email)

    return {
      success: true,
      message: 'Neu email ton tai, chung toi da gui lien ket dat lai mat khau.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Khong the xu ly yeu cau.',
      code: normalized.code,
    }
  }
}

export const resetPasswordAction = async (
  token: string,
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  try {
    const { password } = validateResetPasswordInput(formData)
    await authService.resetPassword(token, password)

    return {
      success: true,
      message: 'Cap nhat mat khau thanh cong. Hay dang nhap lai.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Khong the dat lai mat khau.',
      code: normalized.code,
    }
  }
}
