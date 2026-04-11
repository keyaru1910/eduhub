import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'
import { validateTestimonialInput } from '@/server/validation'

export async function GET() {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const data = await adminResources.testimonials.list()
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to load testimonials')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const formData = await request.formData()
    const input = validateTestimonialInput(formData)
    const data = await adminResources.testimonials.create(input)
    return successResponse(data, 201)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to create testimonial')
  }
}
