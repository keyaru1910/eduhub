import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/server/auth/session'
import { enrollmentService } from '@/server/services/enrollment'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import withBasePath from '@/utils/basePath'
import { Icon } from '@iconify/react/dist/iconify.js'

export const metadata: Metadata = {
  title: 'Dashboard | Edu Hub',
  description: 'Quản lý khóa học đã đăng ký',
}

const DashboardPage = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/')
  }

  const enrollments = await enrollmentService.getStudentEnrollments(session.user.id)

  return (
    <>
      <Breadcrumb
        pageName='Dashboard Học Viên'
        pageDescription='Chào mừng bạn quay lại. Tiếp tục hành trình học tập của mình nhé.'
      />

      <section className='pb-16 pt-8'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='mb-8 rounded-2xl bg-primary/5 p-8 dark:bg-slate-900 border border-primary/10'>
            <div className='flex items-center gap-4'>
              <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold'>
                {(session.user.name || session.user.email || 'U').charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                  Xin chào, {session.user.name || 'Học viên'}
                </h2>
                <p className='text-slate-600 dark:text-slate-300'>{session.user.email}</p>
              </div>
            </div>
          </div>

          <h3 className='mb-6 text-2xl font-bold dark:text-white'>Các khóa học của tôi</h3>

          {enrollments.length === 0 ? (
            <div className='rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-12 text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Icon icon='solar:book-bookmark-line-duotone' className='text-3xl' />
              </div>
              <h4 className='mb-2 text-xl font-bold dark:text-white'>Bạn chưa đăng ký khóa học nào</h4>
              <p className='mb-6 text-slate-600 dark:text-slate-400'>
                Hãy khám phá các khóa học nổi bật và bắt đầu hành trình ngay hôm nay.
              </p>
              <Link
                href='/courses'
                className='inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-opacity-90'>
                Khám phá khóa học
              </Link>
            </div>
          ) : (
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className='group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                  <div className='relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800'>
                    <Image
                      src={withBasePath(enrollment.course.image)}
                      alt={enrollment.course.title}
                      fill
                      className='object-cover transition-transform duration-500 group-hover:scale-110'
                    />
                  </div>
                  <div className='flex flex-1 flex-col p-6'>
                    <div className='mb-2'>
                      <span className='inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20'>
                        {enrollment.status === 'ACTIVE' ? 'Đang học' : 'Hoàn thành'}
                      </span>
                    </div>
                    <h4 className='mb-4 text-lg font-bold text-slate-900 dark:text-white line-clamp-2'>
                      {enrollment.course.title}
                    </h4>
                    <div className='mt-auto pt-4'>
                      <Link
                        href={`/courses/${enrollment.course.slug}/lessons`}
                        className='block w-full rounded-lg bg-primary/10 px-4 py-2.5 text-center font-medium text-primary transition hover:bg-primary hover:text-white dark:bg-primary/20 dark:hover:bg-primary dark:hover:text-white'>
                        Vào học ngay
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default DashboardPage
