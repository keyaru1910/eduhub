import { getServerSession } from 'next-auth'
import { authOptions } from './options'
import { unauthorized } from '../errors'

export const getAuthSession = () => getServerSession(authOptions)

export const requireAdminSession = async () => {
  const session = await getAuthSession()

  if (!session?.user || session.user.role !== 'admin') {
    throw unauthorized()
  }

  return session
}
