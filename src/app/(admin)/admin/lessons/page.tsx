import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'
import { courseRepository } from '@/server/repositories/content'

const AdminLessonsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.lessons.list() : []
  const courses = hasDatabaseUrl ? await courseRepository.listAdmin() : []

  // Ensure course items are stringified correctly for select options,
  // Or we could just let the user input courseId as string.
  // Actually, ResourceManager supports `select` field type if we add it, but normally it just takes a string. Let's just use string field and provide the IDs in description.
  const courseOptionsInfo = courses
    .map(c => `${c.title} (ID: ${c.id})`)
    .join(' | ')

  return (
    <ResourceManager
      title='Bài học'
      description='Quản lý các bài học thuộc về từng khóa học. Đảm bảo bạn nhập đúng courseId của khóa học tương ứng.'
      endpoint='/api/admin/lessons'
      initialItems={items}
      getInitialValues={() => ({
        courseId: '',
        title: '',
        slug: '',
        content: '<p>Nội dung bài học...</p>',
        videoUrl: '',
        order: '0',
        published: true,
      })}
      emptyStateTitle='Chưa có bài học nào'
      emptyStateDescription='Hãy thêm bài học cho ít nhất 1 khóa học để học viên có nội dung trải nghiệm.'
      itemTitle={(item) => item.title}
      itemSubtitle={(item) => item.course?.title || item.courseId}
      itemDescription={(item) => item.slug}
      itemMeta={(item) => [
        `Thứ tự: ${item.order}`,
        item.published ? 'Đang hiển thị' : 'Đã ẩn',
      ]}
      fields={[
        { name: 'courseId', label: 'Course ID', description: `ID Khóa Học. Tham khảo: ${courseOptionsInfo || 'Chưa có khóa học nào.'}` },
        { name: 'title', label: 'Tên bài học' },
        { name: 'slug', label: 'Slug', description: 'Để trống để tự tạo từ tên' },
        { name: 'videoUrl', label: 'Link Video (Option)', description: 'URL dạng embed (VD: Youtube embed link)' },
        { name: 'content', label: 'Nội dung HTML', type: 'textarea' },
        { name: 'order', label: 'Thứ tự', type: 'number', description: 'Số thứ tự hiển thị' },
        { name: 'published', label: 'Hiển thị trên site', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminLessonsPage
