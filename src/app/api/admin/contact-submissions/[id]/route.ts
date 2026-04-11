import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'
import { validateContactSubmissionUpdateInput } from '@/server/validation'

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
    const input = validateContactSubmissionUpdateInput(formData)
    const data = await adminResources.contactSubmissions.update(id, input)
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to update contact submission')
  }
}
