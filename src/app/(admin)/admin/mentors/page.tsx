import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminMentorsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.mentors.list() : []

  return (
    <ResourceManager
      title='Mentors'
      description='Quan ly mentor, bio va thong tin hien thi tren trang public.'
      endpoint='/api/admin/mentors'
      initialItems={items}
      getInitialValues={() => ({
        name: '',
        slug: '',
        title: '',
        shortBio: '',
        bio: '',
        image: '',
        expertise: '',
        experience: '',
        yearsOfExperience: '1',
        published: true,
      })}
      fields={[
        { name: 'name', label: 'Name' },
        { name: 'slug', label: 'Slug' },
        { name: 'title', label: 'Title' },
        { name: 'shortBio', label: 'Short bio', type: 'textarea' },
        { name: 'bio', label: 'Bio', type: 'textarea' },
        { name: 'image', label: 'Image URL' },
        { name: 'expertise', label: 'Expertise', type: 'textarea', placeholder: 'One item per line' },
        { name: 'experience', label: 'Experience', type: 'textarea', placeholder: 'One item per line' },
        { name: 'yearsOfExperience', label: 'Years of experience', type: 'number' },
        { name: 'published', label: 'Published', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminMentorsPage
