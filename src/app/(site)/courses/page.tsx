import { Metadata } from 'next'
import Link from 'next/link'
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

  return (
    <>
      <Breadcrumb
        pageName='Khóa học'
        pageDescription='Tổng hợp các khóa học nổi bật để bạn chọn đúng lộ trình học phù hợp.'
      />
      <section className='pb-4'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 lg:grid-cols-[1.3fr_0.9fr]'>
            <div className='rounded-[28px] bg-cream p-8 dark:bg-slate-900'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                Lộ trình học tập
              </p>
              <h2 className='mt-3 text-4xl font-bold tracking-tight dark:text-white'>
                Chọn khóa học phù hợp và bắt đầu nhanh hơn
              </h2>
              <p className='mt-4 max-w-2xl text-base leading-7 text-black/70 dark:text-slate-300'>
                Danh mục hiện tại tập trung vào web, mobile, data và cloud. ục tiêu là giúp bạn chọn đúng hướng học và có thể đi tiếp sang mentor hoặc đăng ký sau do.
              </p>
              <div className='mt-6 flex flex-wrap gap-3'>
                <Link
                  href='/register'
                  className='rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary'>
                  Đăng ký nhận cập nhật
                </Link>
                <Link
                  href='/mentors'
                  className='rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white'>
                  Xem đội ngũ mentor
                </Link>
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-3 lg:grid-cols-1'>
              <div className='rounded-2xl border border-primary/15 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-3xl font-bold text-primary'>4</p>
                <p className='mt-2 text-sm text-black/70 dark:text-slate-300'>Nhóm nội dung chính để bắt đầu từ cơ bản đến thực hành.</p>
              </div>
              <div className='rounded-2xl border border-primary/15 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-3xl font-bold text-primary'>12</p>
                <p className='mt-2 text-sm text-black/70 dark:text-slate-300'>Mỗi khóa học đã có sẵn khung nội dung và thông tin tổng quan.</p>
              </div>
              <div className='rounded-2xl border border-primary/15 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-3xl font-bold text-primary'>1</p>
                <p className='mt-2 text-sm text-black/70 dark:text-slate-300'>ục tiêu chung: giúp bạn ra quyết định học nhanh và rõ ràng hơn.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NamesList
        items={courses.map((course) => ({
          course: course.title,
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
