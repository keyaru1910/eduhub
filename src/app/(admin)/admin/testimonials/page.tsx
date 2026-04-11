import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminTestimonialsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.testimonials.list() : []

  return (
    <ResourceManager
      title='Testimonials'
      description='Quan ly phan danh gia va trust signals hien thi tren home/testimonials.'
      endpoint='/api/admin/testimonials'
      initialItems={items}
      getInitialValues={() => ({
        name: '',
        role: '',
        avatar: '',
        content: '',
        rating: '5',
        published: true,
      })}
      fields={[
        { name: 'name', label: 'Name' },
        { name: 'role', label: 'Role' },
        { name: 'avatar', label: 'Avatar URL' },
        { name: 'content', label: 'Content', type: 'textarea' },
        { name: 'rating', label: 'Rating', type: 'number' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminTestimonialsPage
