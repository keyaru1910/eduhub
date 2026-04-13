import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminTestimonialsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.testimonials.list() : []

  return (
    <ResourceManager
      title='Cảm nhận học viên'
      description='Quản lý các phản hồi dùng để tăng độ tin cậy cho landing page và trang cảm nhận.'
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
      emptyStateTitle='Chưa có cảm nhận nào'
      emptyStateDescription='Chuẩn bị ít nhất 4 phản hồi thực tế để phần trust signal của bản demo đủ mạnh.'
      itemTitle={(item) => item.name}
      itemSubtitle={(item) => item.role}
      itemDescription={(item) => item.content}
      itemMeta={(item) => [
        `${item.rating}/5 sao`,
        item.published ? 'Đang hiển thị' : 'Đã ẩn',
      ]}
      imageFieldName='avatar'
      fields={[
        { name: 'name', label: 'Tên học viên' },
        { name: 'role', label: 'Vai trò / nghề nghiệp' },
        { name: 'avatar', label: 'Đường dẫn avatar', description: 'Ưu tiên ảnh trong /public/images/testimonial.' },
        { name: 'content', label: 'Nội dung cảm nhận', type: 'textarea', description: 'Nên viết 2-3 câu, tập trung vào kết quả trước và sau khi học.' },
        { name: 'rating', label: 'Số sao', type: 'number' },
        { name: 'published', label: 'Hiển thị trên site', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminTestimonialsPage
