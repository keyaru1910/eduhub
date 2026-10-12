import Link from 'next/link'
import { Metadata } from 'next'
import { Icon } from '@iconify/react'
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
        badge='Tham gia cộng đồng'
        badgeIcon='solar:user-plus-bold-duotone'
        pageName='Đăng ký'
        pageDescription='Lựa chọn cách thức đồng hành cùng Edu Hub để bắt đầu hành trình nâng tầm kiến thức công nghệ.'
      />

      <section className='pt-2 pb-10'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 md:grid-cols-2'>
            {/* Card 1: Tạo tài khoản học viên (Card nổi bật chính) */}
            <div className='relative flex flex-col justify-between overflow-hidden rounded-[28px] border-2 border-primary bg-gradient-to-br from-cream via-cream/80 to-orange/20 p-8 shadow-md dark:border-primary/50 dark:from-slate-900 dark:via-slate-900 dark:to-primary/10'>
              {/* Badge nổi bật */}
              <div className='absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-xs'>
                Khuyên dùng
              </div>

              <div>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-md shadow-primary/30'>
                  <Icon icon='solar:user-id-bold-duotone' className='text-2xl' />
                </div>

                <h3 className='mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
                  Tài khoản Học viên Edu Hub
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300'>
                  Dành cho bạn muốn theo học bài bản, thực hành dự án và tương tác trực tiếp cùng đội ngũ giảng viên, mentor.
                </p>

                {/* Danh sách đặc quyền */}
                <ul className='mt-6 space-y-3 border-t border-primary/15 pt-5 text-sm dark:border-white/10'>
                  <li className='flex items-start gap-2.5 text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-success' />
                    <span>Truy cập toàn bộ video bài giảng & mã nguồn mẫu</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-success' />
                    <span>Thực hành code có chấm điểm và bài tập kiểm tra</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-success' />
                    <span>Hỏi đáp 1-1 cùng Mentor và cộng đồng học tập</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-success' />
                    <span>Nhận chứng chỉ tốt nghiệp có mã tra cứu hồ sơ</span>
                  </li>
                </ul>
              </div>

              <div className='mt-8'>
                <Link
                  href='/signup'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/25 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10'>
                  <span>Tạo tài khoản học viên ngay</span>
                  <Icon icon='solar:arrow-right-line-duotone' className='text-xl' />
                </Link>
              </div>
            </div>

            {/* Card 2: Nhận bản tin công nghệ (Newsletter) */}
            <div className='relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-primary/20 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900'>
              <div className='absolute right-6 top-6 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-600 dark:bg-slate-800 dark:text-slate-300'>
                Miễn phí
              </div>

              <div>
                <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:letter-bold-duotone' className='text-2xl' />
                </div>

                <h3 className='mt-5 text-2xl font-bold tracking-tight text-slate-900 dark:text-white'>
                  Bản tin Công nghệ hàng tuần
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
                  Dành cho bạn muốn theo dõi xu hướng AI, lập trình, nhận tài liệu học tập và các chương trình học bổng định kỳ.
                </p>

                {/* Danh sách đặc quyền */}
                <ul className='mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm dark:border-white/10'>
                  <li className='flex items-start gap-2.5 text-slate-700 dark:text-slate-300'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-primary' />
                    <span>Cập nhật bài viết chia sẻ kinh nghiệm từ Tech Lead</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-700 dark:text-slate-300'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-primary' />
                    <span>Tải cẩm nang lộ trình học lập trình (Roadmap PDF)</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-700 dark:text-slate-300'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-primary' />
                    <span>Nhận mã ưu đãi học phí độc quyền cho thành viên</span>
                  </li>
                  <li className='flex items-start gap-2.5 text-slate-700 dark:text-slate-300'>
                    <Icon icon='solar:check-circle-bold' className='mt-0.5 shrink-0 text-base text-primary' />
                    <span>Không gửi thư rác, có thể hủy nhận tin bất cứ lúc nào</span>
                  </li>
                </ul>
              </div>

              <div className='mt-8'>
                <a
                  href='#newsletter-section'
                  className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-cream/80 px-6 py-3.5 text-base font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-primary'>
                  <span>Đăng ký nhận tin bên dưới</span>
                  <Icon icon='solar:arrow-down-line-duotone' className='text-xl' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div id='newsletter-section'>
        <Newsletter />
      </div>
    </>
  )
}

export default RegisterPage
