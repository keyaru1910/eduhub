import { adminResources } from '@/server/admin'
import { errorResponseFrom, successResponse } from '@/server/api'
import { requireAdminSession } from '@/server/auth/session'
import { hasDatabaseUrl } from '@/server/db'
import { internalError } from '@/server/errors'

export async function GET() {
  try {
    await requireAdminSession()
    if (!hasDatabaseUrl) {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    const data = await adminResources.contactSubmissions.list()
    return successResponse(data)
  } catch (error) {
    return errorResponseFrom(error, 'Unable to load contact submissions')
  }
}
