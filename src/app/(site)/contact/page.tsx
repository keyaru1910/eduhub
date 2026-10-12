import { Metadata } from 'next'
import Link from 'next/link'
import { Icon } from '@iconify/react'
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
        badge='Kênh hỗ trợ 24/7'
        badgeIcon='solar:chat-round-dots-bold-duotone'
        pageName='Liên hệ'
        pageDescription='Đội ngũ chuyên viên tư vấn luôn sẵn sàng giải đáp mọi thắc mắc và định hướng lộ trình học tập tối ưu cho bạn.'
      />

      <section className='pt-2 pb-6'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-6 lg:grid-cols-[1.25fr_0.85fr]'>
            {/* Khối giới thiệu & cam kết tư vấn */}
            <div className='relative overflow-hidden rounded-[28px] border border-primary/20 bg-gradient-to-br from-cream via-cream/80 to-orange/20 p-8 shadow-sm dark:border-white/10 dark:from-slate-900 dark:via-slate-900 dark:to-primary/10'>
              <div
                aria-hidden='true'
                className='pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary/10 blur-2xl dark:bg-primary/20'
              />

              <div className='relative z-10'>
                <div className='inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:bg-primary/20'>
                  <Icon icon='solar:chat-round-line-bold' className='text-sm text-primary' />
                  <span>Tư vấn lộ trình miễn phí</span>
                </div>

                <h2 className='mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl dark:text-white'>
                  Bạn đang băn khoăn về khóa học, mentor hay lộ trình học?
                </h2>

                <p className='mt-3.5 max-w-2xl text-base leading-relaxed text-slate-700 dark:text-slate-300'>
                  Đừng ngần ngại liên hệ với chúng tôi. Đội ngũ Edu Hub sẽ lắng nghe nhu cầu, kiểm tra trình độ hiện tại và thiết kế kế hoạch học tập phù hợp nhất với quỹ thời gian của bạn.
                </p>

                {/* Các cam kết hỗ trợ */}
                <div className='mt-5 grid gap-2.5 sm:grid-cols-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Phản hồi nhanh trong 2-4 giờ làm việc</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Tư vấn đúng năng lực, không chèo kéo</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Hỗ trợ kết nối mentor chuyên môn sâu</span>
                  </div>
                  <div className='flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200'>
                    <Icon icon='solar:check-circle-bold' className='shrink-0 text-base text-success' />
                    <span>Miễn phí bài kiểm tra đầu vào</span>
                  </div>
                </div>

                {/* Nút hành động */}
                <div className='mt-7 flex flex-wrap items-center gap-3'>
                  <a
                    href='#contact-form-section'
                    className='inline-flex items-center gap-2 rounded-xl border border-primary bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/20 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10'>
                    <span>Gửi lời nhắn ngay bên dưới</span>
                    <Icon icon='solar:arrow-down-line-duotone' className='text-base' />
                  </a>
                  <Link
                    href='/mentors'
                    className='inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-white/70 px-5 py-3 text-sm font-semibold text-primary transition duration-300 hover:border-primary hover:bg-primary hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-primary'>
                    <span>Xem đội ngũ mentor</span>
                    <Icon icon='solar:users-group-two-rounded-line-duotone' className='text-base' />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3 Thẻ thông tin liên lạc nhanh */}
            <div className='grid gap-3.5 sm:grid-cols-3 lg:grid-cols-1'>
              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:phone-calling-rounded-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    Hotline tư vấn
                  </p>
                  <p className='mt-0.5 text-base font-bold text-slate-900 dark:text-white'>
                    1900 6868 - 0987 654 321
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    Hỗ trợ từ 08:00 - 21:00 hàng ngày
                  </p>
                </div>
              </div>

              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:letter-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    Email tuyển sinh
                  </p>
                  <p className='mt-0.5 text-base font-bold text-slate-900 dark:text-white'>
                    tuyensinh@eduhub.vn
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    Phản hồi trong vòng 24 giờ
                  </p>
                </div>
              </div>

              <div className='group flex items-center gap-4 rounded-2xl border border-primary/15 bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20'>
                  <Icon icon='solar:map-point-wave-bold-duotone' className='text-2xl' />
                </div>
                <div>
                  <p className='text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400'>
                    Địa điểm đào tạo
                  </p>
                  <p className='mt-0.5 text-base font-bold text-slate-900 dark:text-white'>
                    Hà Nội & TP. Hồ Chí Minh
                  </p>
                  <p className='text-xs text-slate-600 dark:text-slate-300'>
                    Hỗ trợ offline & online toàn quốc
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id='contact-form-section'>
        <ContactForm />
      </div>
    </>
  )
}

export default ContactPage
