import ResourceManager from '../_components/ResourceManager'
import { hasDatabaseUrl } from '@/server/db'
import { adminResources } from '@/server/admin'

const AdminMentorsPage = async () => {
  const items = hasDatabaseUrl ? await adminResources.mentors.list() : []

  return (
    <ResourceManager
      title='Mentor'
      description='Quản lý hồ sơ mentor dùng cho trang danh sách, trang chi tiết và phần giới thiệu trên trang chủ.'
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
      emptyStateTitle='Chưa có mentor nào'
      emptyStateDescription='Bản demo nên có tối thiểu 6 mentor thật để trang /mentors không phải dùng placeholder.'
      itemTitle={(item) => item.name}
      itemSubtitle={(item) => item.title}
      itemDescription={(item) => item.shortBio}
      itemMeta={(item) => [
        `${item.yearsOfExperience}+ năm kinh nghiệm`,
        `${item.expertise.length} kỹ năng`,
        item.published ? 'Đang hiển thị' : 'Đã ẩn',
      ]}
      imageFieldName='image'
      fields={[
        { name: 'name', label: 'Tên mentor' },
        { name: 'slug', label: 'Slug', description: 'Có thể để trống để hệ thống tự tạo từ tên mentor.' },
        { name: 'title', label: 'Chức danh' },
        { name: 'shortBio', label: 'Giới thiệu ngắn', type: 'textarea', description: 'Đoạn tóm tắt hiển thị trong card mentor.' },
        { name: 'bio', label: 'Tiểu sử chi tiết', type: 'textarea', description: 'Nội dung hiển thị ở trang chi tiết mentor.' },
        { name: 'image', label: 'Đường dẫn ảnh', description: 'Ưu tiên ảnh dọc trong /public/images/mentor.' },
        { name: 'expertise', label: 'Kỹ năng nổi bật', type: 'textarea', placeholder: 'UX Research\nDesign Systems\nUsability Testing', description: 'Mỗi dòng là một kỹ năng.' },
        { name: 'experience', label: 'Kinh nghiệm nổi bật', type: 'textarea', placeholder: '8 năm làm sản phẩm SaaS\nMentor portfolio cho học viên', description: 'Mỗi dòng là một ý sẽ hiển thị ở trang chi tiết.' },
        { name: 'yearsOfExperience', label: 'Số năm kinh nghiệm', type: 'number' },
        { name: 'published', label: 'Hiển thị trên site', type: 'checkbox' },
      ]}
    />
  )
}

export default AdminMentorsPage
