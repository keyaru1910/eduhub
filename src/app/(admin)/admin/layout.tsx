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
            Admin
          </p>
          <h1 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
            Edu Hub CMS
          </h1>
          <p className='mt-2 text-sm text-slate-600 dark:text-slate-300'>
            Dang nhap voi {session.user.email}
          </p>
          <nav className='mt-8 flex flex-col gap-3'>
            <Link href='/admin' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Tong quan
            </Link>
            <Link href='/admin/courses' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Courses
            </Link>
            <Link href='/admin/mentors' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Mentors
            </Link>
            <Link href='/admin/testimonials' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Testimonials
            </Link>
            <Link href='/admin/contact-submissions' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Contact Leads
            </Link>
            <Link href='/' className='rounded-xl border border-slate-200 px-4 py-3 dark:border-white/10 dark:text-white'>
              Ve trang public
            </Link>
          </nav>
        </aside>
        <main className='min-w-0 flex-1'>{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout
