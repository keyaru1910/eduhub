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
    throw unprocessable(`${fieldLabel} khong hop le.`, 'INVALID_NUMBER')
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
    throw unprocessable('Email khong hop le.', 'INVALID_EMAIL')
  }

  return email
}

export const validateContactInput = (formData: FormData): ContactSubmissionInput => {
  const firstName = ensureNonEmpty(asString(formData.get('firstname')), 'Vui long nhap ten.')
  const lastName = ensureNonEmpty(asString(formData.get('lastname')), 'Vui long nhap ho.')
  const email = validateEmailAddress(normalizeEmail(asString(formData.get('email'))))
  const phone = ensureNonEmpty(asString(formData.get('phnumber')), 'Vui long nhap so dien thoai.')
  const message = ensureNonEmpty(asString(formData.get('Message')), 'Vui long nhap noi dung lien he.')

  return { firstName, lastName, email, phone, message }
}

export const validateSignupInput = (formData: FormData) => {
  const name = ensureNonEmpty(asString(formData.get('name')), 'Vui long nhap ten.')
  const email = validateEmailAddress(normalizeEmail(asString(formData.get('email'))))
  const password = asString(formData.get('password'))

  if (password.length < 8) {
    throw unprocessable('Mat khau phai tu 8 ky tu.', 'INVALID_PASSWORD')
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
    throw unprocessable('Mat khau moi phai tu 8 ky tu.', 'INVALID_PASSWORD')
  }

  if (password !== confirmPassword) {
    throw unprocessable('Mat khau nhap lai khong khop.', 'PASSWORD_CONFIRMATION_MISMATCH')
  }

  return { password }
}

export const validateCourseInput = (formData: FormData): CourseInput => {
  const title = ensureNonEmpty(asString(formData.get('title')), 'Title khong duoc de trong.')
  const slug = ensureNonEmpty(
    toSlug(asString(formData.get('slug')) || title),
    'Slug khong hop le.',
  )
  const description = ensureNonEmpty(
    asString(formData.get('description')),
    'Description khong duoc de trong.',
  )
  const image = ensureNonEmpty(asString(formData.get('image')), 'Image URL khong duoc de trong.')
  const price = parseRequiredNumber(asString(formData.get('price')), 'Price')
  const level = ensureNonEmpty(asString(formData.get('level')), 'Level khong duoc de trong.')
  const duration = ensureNonEmpty(
    asString(formData.get('duration')),
    'Duration khong duoc de trong.',
  )
  const category = ensureNonEmpty(
    asString(formData.get('category')),
    'Category khong duoc de trong.',
  )
  const published = toBoolean(formData.get('published'))

  if (price < 0) {
    throw unprocessable('Price phai lon hon hoac bang 0.', 'INVALID_PRICE')
  }

  return { title, slug, description, image, price, level, duration, category, published }
}

export const validateMentorInput = (formData: FormData): MentorInput => {
  const name = ensureNonEmpty(asString(formData.get('name')), 'Name khong duoc de trong.')
  const slug = ensureNonEmpty(toSlug(asString(formData.get('slug')) || name), 'Slug khong hop le.')
  const title = ensureNonEmpty(asString(formData.get('title')), 'Title khong duoc de trong.')
  const shortBio = ensureNonEmpty(
    asString(formData.get('shortBio')),
    'Short bio khong duoc de trong.',
  )
  const bio = ensureNonEmpty(asString(formData.get('bio')), 'Bio khong duoc de trong.')
  const image = ensureNonEmpty(asString(formData.get('image')), 'Image URL khong duoc de trong.')
  const expertise = splitLines(asString(formData.get('expertise')))
  const experience = splitLines(asString(formData.get('experience')))
  const yearsOfExperience = parseRequiredNumber(
    asString(formData.get('yearsOfExperience')),
    'Years of experience',
  )
  const published = toBoolean(formData.get('published'))

  if (yearsOfExperience < 0) {
    throw unprocessable(
      'Years of experience phai lon hon hoac bang 0.',
      'INVALID_EXPERIENCE',
    )
  }

  if (expertise.length === 0 || experience.length === 0) {
    throw unprocessable('Expertise va experience phai co it nhat mot dong.', 'EMPTY_LIST')
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
  const name = ensureNonEmpty(asString(formData.get('name')), 'Name khong duoc de trong.')
  const role = ensureNonEmpty(asString(formData.get('role')), 'Role khong duoc de trong.')
  const avatar = ensureNonEmpty(asString(formData.get('avatar')), 'Avatar URL khong duoc de trong.')
  const content = ensureNonEmpty(asString(formData.get('content')), 'Content khong duoc de trong.')
  const rating = parseRequiredNumber(asString(formData.get('rating')), 'Rating')
  const published = toBoolean(formData.get('published'))

  if (rating < 1 || rating > 5) {
    throw unprocessable('Rating phai nam trong khoang 1 den 5.', 'INVALID_RATING')
  }

  return { name, role, avatar, content, rating, published }
}

export const validateContactSubmissionUpdateInput = (
  formData: FormData,
): ContactSubmissionUpdateInput => {
  const status = asString(formData.get('status')) as ContactSubmissionStatus
  const noteValue = asString(formData.get('note'))

  if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) {
    throw badRequest('Trang thai lead khong hop le.', 'INVALID_CONTACT_STATUS')
  }

  return {
    status,
    note: noteValue || null,
  }
}
