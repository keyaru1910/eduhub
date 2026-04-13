import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminCoursesPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.courses.list() : []

  return (
    <ResourceManager
      title='Khóa học'
      description='Quản lý danh sách khóa học hiển thị trên landing page và trang khóa học. Ưu tiên nội dung ngắn, rõ, dễ trình bày khi demo.'
      endpoint='/api/admin/courses'
      initialItems={items}
      getInitialValues={() => ({
        title: '',
        slug: '',
        description: '',
        image: '',
        price: '0',
        level: 'Cơ bản đến nâng cao',
        duration: '12 buổi học',
        category: 'webdevelopment',
        published: true,
      })}
      emptyStateTitle='Chưa có khóa học nào'
      emptyStateDescription='Tạo ít nhất 4 khóa học trọng tâm để trang public và luồng demo có nội dung đủ thuyết phục.'
      itemTitle={(item) => item.title}
      itemSubtitle={(item) => item.category}
      itemDescription={(item) => item.description}
      itemMeta={(item) => [
        `${new Intl.NumberFormat('vi-VN').format(item.price)} đ`,
        item.level,
        item.duration,
        item.published ? 'Đang hiển thị' : 'Đã ẩn',
      ]}
      imageFieldName='image'
      fields={[
        { name: 'title', label: 'Tên khóa học', description: 'Tiêu đề hiển thị ở trang chủ và trang danh sách khóa học.' },
        { name: 'slug', label: 'Slug', description: 'Có thể để trống để hệ thống tự tạo từ tiêu đề.' },
        { name: 'description', label: 'Mô tả ngắn', type: 'textarea', description: 'Tóm tắt giá trị cốt lõi của khóa học trong 1-2 câu.' },
        { name: 'image', label: 'Đường dẫn ảnh', description: 'Ưu tiên dùng ảnh trong thư mục public, ví dụ /images/courses/coursesOne.svg.' },
        { name: 'price', label: 'Học phí', type: 'number', description: 'Nhập số nguyên VND, không kèm dấu chấm hoặc ký hiệu tiền tệ.' },
        { name: 'level', label: 'Trình độ' },
        { name: 'duration', label: 'Thời lượng' },
        { name: 'category', label: 'Danh mục', description: 'Giữ theo các nhóm đang dùng trên giao diện: webdevelopment, mobiledevelopment, datascience, cloudcomputing.' },
        { name: 'published', label: 'Hiển thị trên site', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminCoursesPage
