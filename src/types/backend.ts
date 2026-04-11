export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export type UserRole = 'admin' | 'student'

export type SessionUser = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type ActionState = {
  success: boolean
  message: string
  code?: string
}

export type ContactSubmissionStatus = 'NEW' | 'CONTACTED' | 'CLOSED'

export type CourseInput = {
  title: string
  slug: string
  description: string
  image: string
  price: number
  level: string
  duration: string
  category: string
  published: boolean
}

export type MentorInput = {
  name: string
  slug: string
  title: string
  shortBio: string
  bio: string
  image: string
  expertise: string[]
  experience: string[]
  yearsOfExperience: number
  published: boolean
}

export type TestimonialInput = {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  published: boolean
}

export type ContactSubmissionInput = {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export type ContactSubmissionUpdateInput = {
  status: ContactSubmissionStatus
  note: string | null
}

export type ContactSubmissionAdminItem = ContactSubmissionInput & {
  id: string
  status: ContactSubmissionStatus
  note: string | null
  createdAt: Date
}
