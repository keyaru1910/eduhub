import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { orderRepository } from '@/server/repositories/orders'
import { Icon } from '@iconify/react/dist/iconify.js'
import withBasePath from '@/utils/basePath'

export const metadata: Metadata = {
  title: 'Kết quả thanh toán | Edu Hub',
  description: 'Chi tiết kết quả giao dịch thanh toán khóa học tại Edu Hub',
}

type Props = {
  searchParams: Promise<{
    orderCode?: string
    status?: string
  }>
}

export default async function CheckoutResultPage({ searchParams }: Props) {
  const { orderCode, status } = await searchParams

  if (!orderCode) {
    return (
      <div className='flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center'>
        <Icon icon='solar:danger-circle-bold-duotone' className='text-6xl text-amber-500' />
        <h1 className='mt-4 text-2xl font-bold dark:text-white'>Không tìm thấy thông tin đơn hàng</h1>
        <p className='mt-2 text-slate-600 dark:text-slate-400'>
          Đường dẫn không hợp lệ hoặc thiếu mã giao dịch.
        </p>
        <Link
          href='/courses'
          className='mt-6 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-opacity-90'>
          Khám phá khóa học
        </Link>
      </div>
    )
  }

  const donHang = await orderRepository.findByOrderCode(orderCode)
  if (!donHang) {
    notFound()
  }

  const isSuccess = status === 'success' || donHang.status === 'PAID'
  const formattedAmount = new Intl.NumberFormat('vi-VN').format(donHang.amount)

  return (
    <section className='min-h-[75vh] py-16'>
      <div className='container mx-auto max-w-2xl px-4'>
        <div className='overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-slate-900'>
          {/* Header kết quả */}
          <div
            className={`p-8 text-center ${
              isSuccess
                ? 'bg-gradient-to-b from-emerald-500/10 to-transparent'
                : 'bg-gradient-to-b from-rose-500/10 to-transparent'
            }`}>
            <div
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${
                isSuccess
                  ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                  : 'bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400'
              }`}>
              <Icon
                icon={isSuccess ? 'solar:check-circle-bold' : 'solar:close-circle-bold'}
                className='text-5xl'
              />
            </div>

            <h1 className='mt-4 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl'>
              {isSuccess ? 'Thanh toán thành công!' : 'Giao dịch chưa hoàn tất'}
            </h1>
            <p className='mt-2 text-sm text-slate-600 dark:text-slate-400'>
              {isSuccess
                ? 'Chúc mừng bạn! Khóa học đã được mở khóa tự động, bạn có thể bắt đầu học ngay bây giờ.'
                : 'Thanh toán bị hủy hoặc không thành công từ ngân hàng. Khóa học chưa được kích hoạt.'}
            </p>
          </div>

          {/* Chi tiết đơn hàng */}
          <div className='border-t border-slate-100 p-8 dark:border-white/10'>
            <div className='rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60'>
              <div className='flex items-center gap-4'>
                <div className='relative h-16 w-24 shrink-0 overflow-hidden rounded-xl'>
                  <Image
                    src={withBasePath(donHang.course.image)}
                    alt={donHang.course.title}
                    fill
                    className='object-cover'
                  />
                </div>
                <div>
                  <h3 className='font-bold text-slate-900 dark:text-white line-clamp-1'>
                    {donHang.course.title}
                  </h3>
                  <span className='text-xs text-slate-500 dark:text-slate-400'>
                    Cấp độ: {donHang.course.level} • {donHang.course.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className='mt-6 flex flex-col gap-3 text-sm'>
              <div className='flex justify-between py-1 border-b border-slate-100 dark:border-white/5'>
                <span className='text-slate-500 dark:text-slate-400'>Mã đơn hàng:</span>
                <span className='font-mono font-bold text-slate-900 dark:text-white'>
                  {donHang.orderCode}
                </span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-100 dark:border-white/5'>
                <span className='text-slate-500 dark:text-slate-400'>Số tiền thanh toán:</span>
                <span className='font-bold text-primary'>{formattedAmount} đ</span>
              </div>
              <div className='flex justify-between py-1 border-b border-slate-100 dark:border-white/5'>
                <span className='text-slate-500 dark:text-slate-400'>Cổng thanh toán:</span>
                <span className='font-medium text-slate-900 dark:text-white'>
                  {donHang.paymentMethod}
                </span>
              </div>
              {donHang.transactionRef && (
                <div className='flex justify-between py-1 border-b border-slate-100 dark:border-white/5'>
                  <span className='text-slate-500 dark:text-slate-400'>Mã giao dịch cổng:</span>
                  <span className='font-mono text-slate-700 dark:text-slate-300'>
                    {donHang.transactionRef}
                  </span>
                </div>
              )}
              <div className='flex justify-between py-1'>
                <span className='text-slate-500 dark:text-slate-400'>Trạng thái:</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    isSuccess
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                  }`}>
                  {isSuccess ? 'Đã thanh toán (PAID)' : 'Chờ xử lý / Thất bại'}
                </span>
              </div>
            </div>

            {/* Các nút hành động */}
            <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
              {isSuccess ? (
                <>
                  <Link
                    href={`/courses/${donHang.course.slug}/lessons`}
                    className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-opacity-90'>
                    <Icon icon='solar:play-circle-bold' className='text-xl' />
                    Vào học ngay
                  </Link>
                  <Link
                    href='/dashboard'
                    className='flex flex-1 items-center justify-center rounded-xl border border-slate-200 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800'>
                    Về trang Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/checkout/${donHang.course.slug}`}
                    className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-white shadow-lg shadow-primary/30 transition hover:bg-opacity-90'>
                    <Icon icon='solar:refresh-circle-bold' className='text-xl' />
                    Thử thanh toán lại
                  </Link>
                  <Link
                    href='/contact'
                    className='flex flex-1 items-center justify-center rounded-xl border border-slate-200 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-200 dark:hover:bg-slate-800'>
                    Liên hệ hỗ trợ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
