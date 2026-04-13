import type {
  ContactSubmissionInput,
  ContactSubmissionStatus,
  ContactSubmissionUpdateInput,
  CourseInput,
  MentorInput,
  TestimonialInput,
} from '@/types/backend'
import { validateEmail } from '@/utils/validateEmail'
import { badRequest, unprocessable } from './errors'

const asString = (value: FormDataEntryValue | null) =>
  typeof value === 'string' ? value.trim() : ''

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const toBoolean = (value: FormDataEntryValue | null) =>
  value === 'true' || value === 'on'

const splitLines = (value: string) =>
  value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean)

const parseRequiredNumber = (value: string, fieldLabel: string) => {
  const parsed = Number(value)

  if (!value || Number.isNaN(parsed)) {
    throw unprocessable(`${fieldLabel} không hợp lệ.`, 'INVALID_NUMBER')
  }

  return parsed
}

const ensureNonEmpty = (value: string, message: string) => {
  if (!value) {
    throw unprocessable(message, 'REQUIRED_FIELD')
  }

  return value
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase()

const validateEmailAddress = (email: string) => {
  if (!validateEmail(email)) {
    throw unprocessable('Email không hợp lệ.', 'INVALID_EMAIL')
  }

  return email
}

export const validateContactInput = (formData: FormData): ContactSubmissionInput => {
  const firstName = ensureNonEmpty(asString(formData.get('firstname')), 'Vui lòng nhập tên.')
  const lastName = ensureNonEmpty(asString(formData.get('lastname')), 'Vui lòng nhập họ.')
  const email = validateEmailAddress(normalizeEmail(asString(formData.get('email'))))
  const phone = ensureNonEmpty(asString(formData.get('phnumber')), 'Vui lòng nhập số điện thoại.')
  const message = ensureNonEmpty(asString(formData.get('Message')), 'Vui lòng nhập nội dung liên hệ.')

  return { firstName, lastName, email, phone, message }
}

export const validateSignupInput = (formData: FormData) => {
  const name = ensureNonEmpty(asString(formData.get('name')), 'Vui lòng nhập tên.')
  const email = validateEmailAddress(normalizeEmail(asString(formData.get('email'))))
  const password = asString(formData.get('password'))

  if (password.length < 8) {
    throw unprocessable('Mật khẩu phải từ 8 ký tự.', 'INVALID_PASSWORD')
  }

  return { name, email, password }
}

export const validateForgotPasswordInput = (formData: FormData) => {
  const email = validateEmailAddress(normalizeEmail(asString(formData.get('email'))))

  return { email }
}

export const validateResetPasswordInput = (formData: FormData) => {
  const password = asString(formData.get('newPassword'))
  const confirmPassword = asString(formData.get('confirmPassword'))

  if (password.length < 8) {
    throw unprocessable('Mật khẩu mới phải từ 8 ký tự.', 'INVALID_PASSWORD')
  }

  if (password !== confirmPassword) {
    throw unprocessable('Mật khẩu nhập lại không khớp.', 'PASSWORD_CONFIRMATION_MISMATCH')
  }

  return { password }
}

export const validateCourseInput = (formData: FormData): CourseInput => {
  const title = ensureNonEmpty(asString(formData.get('title')), 'Tiêu đề không được để trống.')
  const slug = ensureNonEmpty(
    toSlug(asString(formData.get('slug')) || title),
    'Slug không hợp lệ.',
  )
  const description = ensureNonEmpty(
    asString(formData.get('description')),
    'Mô tả không được để trống.',
  )
  const image = ensureNonEmpty(asString(formData.get('image')), 'URL ảnh không được để trống.')
  const price = parseRequiredNumber(asString(formData.get('price')), 'Price')
  const level = ensureNonEmpty(asString(formData.get('level')), 'Trình độ không được để trống.')
  const duration = ensureNonEmpty(
    asString(formData.get('duration')),
    'Thời lượng không được để trống.',
  )
  const category = ensureNonEmpty(
    asString(formData.get('category')),
    'Danh mục không được để trống.',
  )
  const published = toBoolean(formData.get('published'))

  if (price < 0) {
    throw unprocessable('Học phí phải lớn hơn hoặc bằng 0.', 'INVALID_PRICE')
  }

  return { title, slug, description, image, price, level, duration, category, published }
}

export const validateMentorInput = (formData: FormData): MentorInput => {
  const name = ensureNonEmpty(asString(formData.get('name')), 'Tên không được để trống.')
  const slug = ensureNonEmpty(toSlug(asString(formData.get('slug')) || name), 'Slug không hợp lệ.')
  const title = ensureNonEmpty(asString(formData.get('title')), 'Chức danh không được để trống.')
  const shortBio = ensureNonEmpty(
    asString(formData.get('shortBio')),
    'Mô tả ngắn không được để trống.',
  )
  const bio = ensureNonEmpty(asString(formData.get('bio')), 'Tiểu sử không được để trống.')
  const image = ensureNonEmpty(asString(formData.get('image')), 'URL ảnh không được để trống.')
  const expertise = splitLines(asString(formData.get('expertise')))
  const experience = splitLines(asString(formData.get('experience')))
  const yearsOfExperience = parseRequiredNumber(
    asString(formData.get('yearsOfExperience')),
    'Years of experience',
  )
  const published = toBoolean(formData.get('published'))

  if (yearsOfExperience < 0) {
    throw unprocessable(
      'Số năm kinh nghiệm phải lớn hơn hoặc bằng 0.',
      'INVALID_EXPERIENCE',
    )
  }

  if (expertise.length === 0 || experience.length === 0) {
    throw unprocessable('Kỹ năng và kinh nghiệm phải có ít nhất một dòng.', 'EMPTY_LIST')
  }

  return {
    name,
    slug,
    title,
    shortBio,
    bio,
    image,
    expertise,
    experience,
    yearsOfExperience,
    published,
  }
}

export const validateTestimonialInput = (formData: FormData): TestimonialInput => {
  const name = ensureNonEmpty(asString(formData.get('name')), 'Tên không được để trống.')
  const role = ensureNonEmpty(asString(formData.get('role')), 'Vai trò không được để trống.')
  const avatar = ensureNonEmpty(asString(formData.get('avatar')), 'URL avatar không được để trống.')
  const content = ensureNonEmpty(asString(formData.get('content')), 'Nội dung không được để trống.')
  const rating = parseRequiredNumber(asString(formData.get('rating')), 'Rating')
  const published = toBoolean(formData.get('published'))

  if (rating < 1 || rating > 5) {
    throw unprocessable('Đánh giá phải nằm trong khoảng 1 đến 5.', 'INVALID_RATING')
  }

  return { name, role, avatar, content, rating, published }
}

export const validateContactSubmissionUpdateInput = (
  formData: FormData,
): ContactSubmissionUpdateInput => {
  const status = asString(formData.get('status')) as ContactSubmissionStatus
  const noteValue = asString(formData.get('note'))

  if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
    throw badRequest('Trạng thái lead không hợp lệ.', 'INVALID_CONTACT_STATUS')
  }

  return {
    status,
    note: noteValue || null,
  }
}
