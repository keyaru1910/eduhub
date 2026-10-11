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

export type EnrollmentInput = {
  userId: string
  courseId: string
  status: string
  orderId?: string | null
}

export type LessonInput = {
  courseId: string
  title: string
  slug: string
  content: string
  videoUrl?: string
  order: number
  published: boolean
}

export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED' | 'FAILED'

export type OrderInput = {
  orderCode: string
  userId: string
  courseId: string
  amount: number
  status?: OrderStatus
  paymentMethod?: string
  transactionRef?: string | null
  paymentUrl?: string | null
  paidAt?: Date | null
}

export type OrderListItem = {
  id: string
  orderCode: string
  amount: number
  status: OrderStatus
  paymentMethod: string
  paidAt: Date | null
  createdAt: Date
  course: {
    id: string
    title: string
    slug: string
    image: string
    price: number
  }
}

export type OrderAdminItem = OrderListItem & {
  user: {
    id: string
    name: string
    email: string
  }
}

