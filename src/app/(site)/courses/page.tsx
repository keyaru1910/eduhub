import { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@iconify/react'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import NamesList from '@/app/components/Home/Courses'
import { getPublishedCourses } from '@/server/content/service'

export const metadata: Metadata = {
  title: 'Khóa học | Edu Hub',
  description: 'Khám phá các khóa học nổi bật về web, mobile, data và cloud.',
}

export const dynamic = 'force-dynamic'

const CoursesPage = async () => {
  const courses = await getPublishedCourses()
  const categoryCount = new Set(courses.map((course) => course.category)).size

  return (
    <>
      <Breadcrumb
        badge='Học tập thực chiến'
        badgeIcon='solar:bolt-bold-duotone'
        pageName='Khóa học'
        pageDescription='Tổng hợp các khóa học công nghệ chất lượng cao, giúp bạn làm chủ kỹ năng và bứt phá sự nghiệp.'
      />

      <section className='pt-2 pb-6'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 lg:grid-cols-[1.3fr_0.9fr]'>
            {/* Thẻ banner giới thiệu lộ trình đào tạo */}
            <div className='relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-cream/90 via-cream/60 to-orange/20 p-8 shadow-sm backdrop-blur-sm dark:border-white/10 dark:from-slate-900 dark:via-slate-900/90 dark:to-primary/10'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20'
              />

              <div className='relative z-10'>
                <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:bg-primary/20'>
                  <Icon icon='solar:fire-bold' className='text-sm text-primary' />
                  <span>Lộ trình đào tạo toàn diện</span>
                </div>

                <h2 className='mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white'>
                  Khởi đầu hành trình lập trình vững chắc từ Zero đến Đi làm
                </h2>

                <p className='mt-3.5 max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300'>
                  Chương trình thực hành qua dự án thật, bám sát yêu cầu tuyển dụng thực tế. Tự tin làm chủ Web, Mobile, Data & Cloud với sự kèm cặp từ các chuyên gia.
                </p>

                {/* Các ưu điểm gạch đầu dòng có icon */}
                <div className='mt-5 grid gap-2.5 sm:grid-cols-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Học qua dự án thực tế 100%</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Code review & hỗ trợ 1-1</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Giáo trình chuẩn quốc tế 2025</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Chứng nhận có giá trị hồ sơ</span>
                  </div>
                </div>

                {/* Nút hành động CTA */}
                <div className='mt-7 flex flex-wrap items-center gap-3'>
                  <Link
                    href='/contact'
                    className='inline-flex items-center gap-2 rounded-xl border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10'>
                    <span>Nhận tư vấn lộ trình</span>
                    <Icon icon='solar:arrow-right-line-duotone' className='text-base' />
                  </Link>
                  <Link
                    href='/mentors'
                    className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/70 px-5 py-3 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-primary'>
                    <span>Xem đội ngũ mentor</span>
                    <Icon icon='solar:users-group-two-rounded-line-duotone' className='text-base' />
                  </Link>
                </div>
              </div>
            </div>

            {/* Cột thống kê thông tin nhanh */}
            <div className='grid gap-3.5 sm:grid-cols-3 lg:grid-cols-1'>
              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:folder-with-files-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <div className='flex items-baseline gap-1.5'>
                    <span className='text-2xl font-extrabold text-primary'>{categoryCount}</span>
                    <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>Nhóm chuyên môn</span>
                  </div>
                  <p className='mt-0.5 text-xs text-slate-600 dark:text-slate-300'>
                    Web, Mobile, Khoa học dữ liệu & Điện toán đám mây.
                  </p>
                </div>
              </div>

              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:book-bookmark-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <div className='flex items-baseline gap-1.5'>
                    <span className='text-2xl font-extrabold text-primary'>{courses.length}+</span>
                    <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>Khóa học bài bản</span>
                  </div>
                  <p className='mt-0.5 text-xs text-slate-600 dark:text-slate-300'>
                    Lộ trình chuẩn chỉnh, bài tập thực chiến có chấm điểm.
                  </p>
                </div>
              </div>

              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:star-fall-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <div className='flex items-baseline gap-1.5'>
                    <span className='text-2xl font-extrabold text-primary'>4.9/5</span>
                    <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>Mức độ hài lòng</span>
                  </div>
                  <p className='mt-0.5 text-xs text-slate-600 dark:text-slate-300'>
                    Được đánh giá cao bởi cộng đồng học viên công nghệ.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NamesList
        items={courses.map((course) => ({
          course: course.title,
          slug: course.slug,
          imageSrc: course.image,
          price: String(course.price),
          profession: course.description,
          category: course.category as
            | 'webdevelopment'
            | 'mobiledevelopment'
            | 'datascience'
            | 'cloudcomputing',
        }))}
      />
    </>
  )
}

export default CoursesPage
