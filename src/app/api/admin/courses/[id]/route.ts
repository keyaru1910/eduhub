import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'
import { validateCourseInput } from '@/server/validation'

type Context = {
  params: Promise<{ id: string }>
}

export async function PATCH(request: Request, context: Context) {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const { id } = await context.params
    const formData = await request.formData()
    const input = validateCourseInput(formData)
    const data = await adminResources.courses.update(id, input)
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to update course')
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const { id } = await context.params
    const data = await adminResources.courses.remove(id)
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to delete course')
  }
}
