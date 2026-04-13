import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getAuthSession } from '@/server/auth/session'

type AdminLayoutProps = {
  children: React.ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/signin')
  }

  if (session.user.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className='min-h-screen bg-slate-100 dark:bg-slate-950'>
      <div className='mx-auto flex max-w-7xl gap-8 px-4 py-10 lg:px-8'>
        <aside className='w-full max-w-xs rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900'>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
            Demo CMS
          </p>
          <h1 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
            Edu Hub Admin
          </h1>
          <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
            Đăng nhập với {session.user.email}
          </p>
          <p className='mt-4 rounded-2xl bg-primary/5 px-4 py-3 text-sm leading-6 text-slate-600 dark:text-slate-300'>
            Khu vực này phục vụ nhập liệu nhanh cho bản demo: cập nhật khóa học, mentor, cảm nhận và theo dõi lead từ form liên hệ.
          </p>
          <nav className='mt-8 flex flex-col gap-3'>
            <Link href='/admin' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Tổng quan
            </Link>
            <Link href='/admin/courses' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Khóa học
            </Link>
            <Link href='/admin/lessons' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Bài học
            </Link>
            <Link href='/admin/mentors' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Mentor
            </Link>
            <Link href='/admin/testimonials' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Cảm nhận
            </Link>
            <Link href='/admin/contact-submissions' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Lead liên hệ
            </Link>
            <Link href='/' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Về trang public
            </Link>
          </nav>
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
