import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import ContactForm from '@/app/components/Contact/Form'

export const metadata: Metadata = {
  title: 'Liên hệ | Edu Hub',
  description: 'Gửi câu hỏi hoặc yêu cầu tư vấn tới đội ngũ Edu Hub.',
}

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName='Liên hệ'
        pageDescription='Để lại thông tin và nội dung cần hỗ trợ, đội ngũ của chúng tôi sẽ phản hồi sớm.'
      />
      <section className='pb-4'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 lg:grid-cols-[0.9fr_1.1fr]'>
            <div className='rounded-[28px] bg-cream p-8 dark:bg-slate-900'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                Hỗ trợ và tư vấn
              </p>
              <h2 className='mt-3 text-4xl font-bold tracking-tight dark:text-white'>
                Bạn cần tư vấn khóa học, mentor hay cách đăng ký?
              </h2>
              <p className='mt-4 text-base leading-7 text-black/70 dark:text-slate-300'>
                Trang liên hệ này nên đóng vai trò điểm chốt cho người dùng cần trao đổi trước khi quyết định. Vi vay toi bo sung them cac loi di nhanh sang khoa hoc va dang ky.
              </p>
              <div className='mt-6 flex flex-wrap gap-3'>
                <Link
                  href='/courses'
                  className='rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white'>
                  Xem khóa học
                </Link>
                <Link
                  href='/register'
                  className='rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary'>
                  Đi tới trang đăng ký
                </Link>
              </div>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='rounded-2xl border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-lg font-semibold text-black dark:text-white'>Tu van lo trinh</p>
                <p className='mt-2 text-sm leading-6 text-black/70 dark:text-slate-300'>
                  Gửi nhu cầu học tập để đội ngũ phản hồi theo hướng phù hợp.
                </p>
              </div>
              <div className='rounded-2xl border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                <p className='text-lg font-semibold text-black dark:text-white'>Hop tac</p>
                <p className='mt-2 text-sm leading-6 text-black/70 dark:text-slate-300'>
                  Dùng cho các nhu cầu mentor, đối tác nội dung hoặc hỗ trợ sự kiện.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  )
}

export default ContactPage
