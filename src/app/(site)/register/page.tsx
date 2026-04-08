import Link from 'next/link'
import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import Newsletter from '@/app/components/Home/Newsletter'

export const metadata: Metadata = {
  title: 'Đăng ký | Edu Hub',
  description: 'Đăng ký nhận cập nhật mới nhất hoặc tạo tài khoản để bắt đầu học trên Edu Hub.',
}

const RegisterPage = () => {
  return (
    <>
      <Breadcrumb
        pageName='Đăng ký'
        pageDescription='Nhận cập nhật mới nhất từ Edu Hub hoặc tạo tài khoản để bắt đầu hành trình học tập.'
      />
      <section className='pb-10'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 lg:grid-cols-[1.1fr_0.9fr]'>
            <div className='rounded-2xl border border-primary/15 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
              <div className='max-w-2xl'>
                <h2 className='text-3xl font-bold tracking-tight text-black dark:text-white'>
                  Tạo tài khoản để tham gia ngay
                </h2>
                <p className='mt-3 text-base text-black/70 dark:text-slate-300'>
                  Nếu bạn muốn học bài bản hơn thay vì chỉ nhận bản tin, hãy chuyển sang trang tạo tài khoản.
                </p>
                <div className='mt-6'>
                  <Link
                    href='/signup'
                    className='inline-flex items-center justify-center rounded-lg border border-primary bg-primary px-6 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary'>
                    Đi tới trang đăng ký tài khoản
                  </Link>
                </div>
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-1'>
              <div className='rounded-2xl bg-cream p-6 dark:bg-slate-800'>
                <p className='text-lg font-semibold text-black dark:text-white'>Nhan ban tin</p>
                <p className='mt-2 text-sm leading-6 text-black/70 dark:text-slate-300'>
                  Phu hop khi ban muon theo doi cap nhat, uu dai va noi dung moi.
                </p>
              </div>
              <div className='rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-lg font-semibold text-black dark:text-white'>Tao tai khoan</p>
                <p className='mt-2 text-sm leading-6 text-black/70 dark:text-slate-300'>
                  Phu hop khi ban san sang theo hoc va tuong tac sau hon trong he thong.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Newsletter />
    </>
  )
}

export default RegisterPage
