'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { Icon } from '@iconify/react/dist/iconify.js'
import withBasePath from '@/utils/basePath'

type CourseProps = {
  id: string
  title: string
  slug: string
  description: string
  image: string
  price: number
  level: string
  duration: string
  category: string
}

export default function CheckoutForm({ course }: { course: CourseProps }) {
  const [paymentMethod, setPaymentMethod] = useState<'VNPAY' | 'VIETQR'>('VNPAY')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleThanhToan = async () => {
    setIsProcessing(true)
    try {
      const res = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseSlug: course.slug,
          paymentMethod,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        toast.error(data.message || 'Không thể khởi tạo thanh toán.')
        setIsProcessing(false)
        return
      }

      if (data.paymentUrl) {
        toast.success('Đang chuyển hướng tới cổng thanh toán...')
        window.location.href = data.paymentUrl
      } else {
        toast.error('Không tìm thấy liên kết thanh toán.')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Lỗi thanh toán:', error)
      toast.error('Đã xảy ra lỗi trong quá trình kết nối.')
      setIsProcessing(false)
    }
  }

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(course.price)

  return (
    <div className='grid gap-8 lg:grid-cols-12'>
      {/* Cột trái: Chi tiết khóa học & Chọn phương thức thanh toán */}
      <div className='lg:col-span-7 flex flex-col gap-6'>
        {/* Box thông tin khóa học */}
        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <h2 className='mb-4 text-xl font-bold text-slate-900 dark:text-white'>
            Thông tin khóa học đăng ký
          </h2>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='relative h-32 w-full shrink-0 overflow-hidden rounded-2xl sm:w-48'>
              <Image
                src={withBasePath(course.image)}
                alt={course.title}
                fill
                className='object-cover'
              />
            </div>
            <div className='flex flex-col justify-between'>
              <div>
                <span className='inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20'>
                  {course.category}
                </span>
                <h3 className='mt-2 text-lg font-bold text-slate-900 dark:text-white'>
                  {course.title}
                </h3>
                <p className='mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300'>
                  {course.description}
                </p>
              </div>

              <div className='mt-3 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400'>
                <div className='flex items-center gap-1'>
                  <Icon icon='solar:clock-circle-line-duotone' className='text-base text-primary' />
                  <span>{course.duration}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Icon icon='solar:chart-line-duotone' className='text-base text-primary' />
                  <span>{course.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Box chọn phương thức thanh toán */}
        <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <h2 className='mb-4 text-xl font-bold text-slate-900 dark:text-white'>
            Phương thức thanh toán
          </h2>

          <div className='flex flex-col gap-3'>
            {/* Phương thức 1: VNPay */}
            <label
              className={`flex cursor-pointer items-center justify-between rounded-2xl border p-4 transition ${
                paymentMethod === 'VNPAY'
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-white/20'
              }`}>
              <div className='flex items-center gap-4'>
                <input
                  type='radio'
                  name='paymentMethod'
                  value='VNPAY'
                  checked={paymentMethod === 'VNPAY'}
                  onChange={() => setPaymentMethod('VNPAY')}
                  className='h-5 w-5 text-primary focus:ring-primary'
                />
                <div>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-slate-900 dark:text-white'>
                      Cổng thanh toán VNPay
                    </span>
                    <span className='rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'>
                      Khuyên dùng
                    </span>
                  </div>
                  <p className='text-xs text-slate-500 dark:text-slate-400'>
                    Quét mã VNPAY-QR, thẻ ATM nội địa tất cả ngân hàng, thẻ Visa/Mastercard
                  </p>
                </div>
              </div>
              <div className='flex items-center gap-1.5'>
                <div className='flex h-8 items-center rounded bg-slate-100 px-2 font-black text-blue-600 dark:bg-slate-800 text-xs'>
                  VNPAY
                </div>
              </div>
            </label>
          </div>

          <div className='mt-6 rounded-2xl bg-slate-50 p-4 text-xs text-slate-600 dark:bg-slate-800/50 dark:text-slate-300'>
            <div className='flex items-center gap-2 font-semibold text-slate-900 dark:text-white'>
              <Icon icon='solar:shield-check-bold-duotone' className='text-lg text-success' />
              Giao dịch an toàn & Bảo mật 100%
            </div>
            <p className='mt-1 text-slate-500 dark:text-slate-400'>
              Tất cả thông tin giao dịch được mã hóa SSL 256-bit theo chuẩn quốc tế. Khóa học được kích hoạt tự động ngay sau khi thanh toán thành công.
            </p>
          </div>
        </div>
      </div>

      {/* Cột phải: Hóa đơn & Nút thanh toán */}
      <div className='lg:col-span-5'>
        <div className='sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <h2 className='mb-4 text-xl font-bold text-slate-900 dark:text-white'>
            Chi tiết đơn hàng
          </h2>

          <div className='flex flex-col gap-3 border-b border-slate-200 pb-4 text-sm dark:border-white/10'>
            <div className='flex justify-between text-slate-600 dark:text-slate-300'>
              <span>Học phí khóa học:</span>
              <span className='font-semibold text-slate-900 dark:text-white'>
                {formattedPrice} đ
              </span>
            </div>
            <div className='flex justify-between text-slate-600 dark:text-slate-300'>
              <span>Ưu đãi áp dụng:</span>
              <span className='font-semibold text-success'>0 đ</span>
            </div>
          </div>

          <div className='flex items-baseline justify-between py-4'>
            <span className='text-base font-bold text-slate-900 dark:text-white'>
              Tổng thanh toán:
            </span>
            <div className='text-right'>
              <span className='text-2xl font-black text-primary'>
                {formattedPrice} đ
              </span>
              <p className='text-[11px] text-slate-500 dark:text-slate-400'>Đã bao gồm VAT</p>
            </div>
          </div>

          <button
            onClick={handleThanhToan}
            disabled={isProcessing}
            className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white transition duration-300 ${
              isProcessing
                ? 'cursor-not-allowed bg-slate-400'
                : 'bg-primary hover:bg-opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:cursor-pointer'
            }`}>
            {isProcessing ? (
              <>
                <Icon icon='solar:refresh-circle-line-duotone' className='animate-spin text-xl' />
                Đang chuyển tới VNPay...
              </>
            ) : (
              <>
                <Icon icon='solar:card-2-bold-duotone' className='text-xl' />
                Tiến hành thanh toán ngay
              </>
            )}
          </button>

          <p className='mt-4 text-center text-xs text-slate-500 dark:text-slate-400'>
            Nhấn vào nút trên đồng nghĩa với việc bạn đồng ý với{' '}
            <Link href='/#' className='text-primary hover:underline'>
              Điều khoản dịch vụ
            </Link>{' '}
            của Edu Hub.
          </p>

          <div className='mt-6 border-t border-slate-200 pt-4 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 flex flex-col gap-2'>
            <div className='flex items-center gap-2'>
              <Icon icon='solar:check-circle-bold' className='text-success' />
              <span>Kích hoạt quyền truy cập trọn đời bài học</span>
            </div>
            <div className='flex items-center gap-2'>
              <Icon icon='solar:check-circle-bold' className='text-success' />
              <span>Tham gia cộng đồng học viên hỏi đáp</span>
            </div>
            <div className='flex items-center gap-2'>
              <Icon icon='solar:check-circle-bold' className='text-success' />
              <span>Chứng chỉ hoàn thành khóa học sau bài thi cuối khóa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
