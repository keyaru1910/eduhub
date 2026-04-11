import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'
import { validateCourseInput } from '@/server/validation'

export async function GET() {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const data = await adminResources.courses.list()
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to load courses')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const formData = await request.formData()
    const input = validateCourseInput(formData)
    const data = await adminResources.courses.create(input)
    return successResponse(data, 201)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to create course')
  }
}
