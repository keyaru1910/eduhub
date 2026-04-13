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
import { enrollmentService } from './services/enrollment'
import { getAuthSession } from './auth/session'
import type { ActionState } from '@/types/backend'
import { revalidatePath } from 'next/cache'

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
      message: 'Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Không thể gửi liên hệ lúc này.',
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
      message: 'Đăng ký thành công. Bạn có thể đăng nhập ngay bây giờ.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Đăng ký thất bại.',
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
      message: 'Nếu email tồn tại, chúng tôi đã gửi liên kết đặt lại mật khẩu.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Không thể xử lý yêu cầu.',
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
      message: 'Cập nhật mật khẩu thành công. Hãy đăng nhập lại.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Không thể đặt lại mật khẩu.',
      code: normalized.code,
    }
  }
}

export const enrollAction = async (
  courseSlug: string,
  _prevState: ActionState,
): Promise<ActionState> => {
  try {
    const session = await getAuthSession()
    if (!session?.user?.id) {
      return {
        success: false,
        message: 'Bạn cần đăng nhập để đăng ký khóa học.',
        code: 'UNAUTHORIZED',
      }
    }

    await enrollmentService.enroll(session.user.id, courseSlug)

    revalidatePath(`/courses/${courseSlug}`)
    revalidatePath('/dashboard')

    return {
      success: true,
      message: 'Chúc mừng! Bạn đã đăng ký khóa học thành công.',
    }
  } catch (error) {
    const normalized = normalizeError(error)
    return {
      success: false,
      message: normalized.message || 'Không thể đăng ký khóa học lúc này.',
      code: normalized.code,
    }
  }
}
