import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'
import { validateMentorInput } from '@/server/validation'

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
    const input = validateMentorInput(formData)
    const data = await adminResources.mentors.update(id, input)
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to update mentor')
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }
    const { id } = await context.params
    const data = await adminResources.mentors.remove(id)
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to delete mentor')
  }
}
