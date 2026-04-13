import { ContactSubmissionStatus } from '@prisma/client'
import { prisma, hasDatabaseUrl } from '@/server/db'

const AdminPage = async () => {
  const [courseCount, mentorCount, testimonialCount, contactCount, newLeadCount, contactedLeadCount] = hasDatabaseUrl
    ? await Promise.all([
        prisma.course.count(),
        prisma.mentor.count(),
        prisma.testimonial.count(),
        prisma.contactSubmission.count(),
        prisma.contactSubmission.count({ where: { status: ContactSubmissionStatus.NEW } }),
        prisma.contactSubmission.count({ where: { status: ContactSubmissionStatus.CONTACTED } }),
      ])
    : [0, 0, 0, 0, 0, 0]

  const stats = [
    { label: 'Courses', value: courseCount },
    { label: 'Mentors', value: mentorCount },
    { label: 'Testimonials', value: testimonialCount },
    { label: 'Contacts', value: contactCount },
    { label: 'New Leads', value: newLeadCount },
    { label: 'Contacted', value: contactedLeadCount },
  ]

  return (
    <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
        Dashboard
      </p>
      <h2 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
        Tổng quan nội dung demo
      </h2>
      <p className='mt-2 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300'>
        Theo dõi nhanh các khối nội dung chính của Edu Hub và kiểm tra xem luồng demo từ trang public sang quản trị lead đã đủ dữ liệu hay chưa.
      </p>
      <div className='mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-2xl border border-slate-200 p-5 dark:border-white/10'
          >
            <p className='text-sm text-slate-500 dark:text-slate-300'>{stat.label}</p>
            <p className='mt-2 text-4xl font-bold text-slate-950 dark:text-white'>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className='mt-8 grid gap-4 lg:grid-cols-2'>
        <div className='rounded-2xl bg-primary/5 p-5'>
          <h3 className='text-lg font-semibold text-slate-950 dark:text-white'>
            Luồng demo đề xuất
          </h3>
          <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
            Trang chủ → Khóa học hoặc Mentor → Liên hệ → Admin thấy lead mới → cập nhật trạng thái xử lý.
          </p>
        </div>
        <div className='rounded-2xl bg-slate-50 p-5 dark:bg-slate-950'>
          <h3 className='text-lg font-semibold text-slate-950 dark:text-white'>
            Kiểm tra trước khi thuyết trình
          </h3>
          <p className='mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300'>
            Bảo đảm mỗi mục đều có dữ liệu đã publish và ít nhất một lead mẫu để màn quản trị không bị trống.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AdminPage
