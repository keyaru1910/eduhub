import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminCoursesPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.courses.list() : []

  return (
    <ResourceManager
      title='Courses'
      description='Quan ly danh sach khoa hoc hien thi tren site va trong landing page.'
      endpoint='/api/admin/courses'
      initialItems={items}
      getInitialValues={() => ({
        title: '',
        slug: '',
        description: '',
        image: '',
        price: '0',
        level: 'Intermediate',
        duration: '12 buoi hoc',
        category: 'webdevelopment',
        published: true,
      })}
      fields={[
        { name: 'title', label: 'Title' },
        { name: 'slug', label: 'Slug' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'image', label: 'Image URL' },
        { name: 'price', label: 'Price', type: 'number' },
        { name: 'level', label: 'Level' },
        { name: 'duration', label: 'Duration' },
        { name: 'category', label: 'Category' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminCoursesPage
