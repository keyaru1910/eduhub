import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { contentService } from '@/server/services/content'
import { getAuthSession } from '@/server/auth/session'
import { enrollmentService } from '@/server/services/enrollment'
import withBasePath from '@/utils/basePath'
import { Icon } from '@iconify/react/dist/iconify.js'
import EnrollButton from './EnrollButton'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await contentService.getCourseBySlug(slug)

  if (!course) {
    return { title: 'Không tìm thấy khóa học' }
  }

  return {
    title: `${course.title} | Edu Hub`,
    description: course.description,
  }
}

export const dynamic = 'force-dynamic'

const CourseDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const course = await contentService.getCourseBySlug(slug)

  if (!course) {
    notFound()
  }

  const session = await getAuthSession()
  let isEnrolled = false
  if (session?.user) {
    isEnrolled = await enrollmentService.checkEnrollment(session.user.id, course.id)
  }

  const lessons = await contentService.getLessonsByCourse(course.id)

  return (
    <>
      <section className='pt-24 pb-12 bg-cream dark:bg-slate-900'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div>
              <span className='mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary dark:bg-primary/20'>
                {course.category}
              </span>
              <h1 className='mb-6 text-4xl font-bold leading-tight text-slate-900 dark:text-white sm:text-5xl'>
                {course.title}
              </h1>
              <p className='mb-8 text-lg text-slate-600 dark:text-slate-300'>
                {course.description}
              </p>
              
              <div className='flex flex-wrap gap-6 mb-8'>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:clock-circle-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium'>{course.duration}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:chart-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium'>{course.level}</span>
                </div>
                <div className='flex items-center gap-2 text-slate-700 dark:text-slate-300'>
                  <Icon icon='solar:card-line-duotone' className='text-2xl text-primary' />
                  <span className='font-medium text-success'>{new Intl.NumberFormat('vi-VN').format(course.price)} đ</span>
                </div>
              </div>

              {isEnrolled ? (
                <Link
                  href={`/courses/${course.slug}/lessons`}
                  className='inline-block rounded-lg bg-success px-8 py-4 text-center font-bold text-white transition hover:bg-opacity-90'>
                  Tiếp tục học
                </Link>
              ) : (
                <EnrollButton courseSlug={course.slug} isLoggedIn={!!session?.user} />
              )}
            </div>
            
            <div className='relative h-[400px] w-full overflow-hidden rounded-2xl shadow-xl'>
              <Image
                src={withBasePath(course.image)}
                alt={course.title}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className='py-16'>
        <div className='container mx-auto max-w-4xl px-4'>
          <h2 className='mb-8 text-3xl font-bold text-slate-900 dark:text-white'>Nội dung khóa học</h2>
          
          <div className='overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900'>
            {lessons.length > 0 ? (
              <div className='divide-y divide-slate-200 dark:divide-white/10'>
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className='flex items-center justify-between p-6 transition hover:bg-slate-50 dark:hover:bg-slate-800'>
                    <div className='flex items-center gap-4'>
                      <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary dark:bg-primary/20'>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className='text-lg font-medium text-slate-900 dark:text-white'>{lesson.title}</h4>
                      </div>
                    </div>
                    {isEnrolled && (
                      <Icon icon='solar:play-circle-bold-duotone' className='text-3xl text-primary' />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='p-8 text-center'>
                <p className='text-slate-600 dark:text-slate-400'>Nội dung đang được cập nhật...</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default CourseDetailPage
