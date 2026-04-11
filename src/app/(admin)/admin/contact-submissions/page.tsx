import ContactSubmissionsManager from '../_components/ContactSubmissionsManager'
import { adminResources } from '@/server/admin'
import { hasDatabaseUrl } from '@/server/db'

const AdminContactSubmissionsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.contactSubmissions.list() : []

  return <ContactSubmissionsManager initialItems={items} />
}

export default AdminContactSubmissionsPage
