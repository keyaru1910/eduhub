'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { enrollAction } from '@/server/actions'

export default function EnrollButton({
  courseSlug,
  isLoggedIn,
  price = 0,
}: {
  courseSlug: string
  isLoggedIn: boolean
  price?: number
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleAction = async () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để tiếp tục.')
      router.push(`/signin?callbackUrl=/courses/${courseSlug}`)
      return
    }

    // Nếu khóa học có phí -> chuyển sang trang thanh toán Checkout
    if (price > 0) {
      router.push(`/checkout/${courseSlug}`)
      return
    }

    // Nếu khóa học miễn phí -> kích hoạt trực tiếp
    setIsPending(true)
    try {
      const result = await enrollAction(courseSlug, {
        success: false,
        message: '',
      })

      if (result.success) {
        toast.success(result.message)
        router.refresh()
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi đăng ký.')
    } finally {
      setIsPending(false)
    }
  }

  const buttonText = isPending
    ? 'Đang xử lý...'
    : price > 0
    ? 'Mua khóa học ngay'
    : 'Đăng ký học miễn phí'

  return (
    <button
      onClick={handleAction}
      disabled={isPending}
      className={`inline-block rounded-lg px-8 py-4 text-center font-bold text-white transition ${
        isPending
          ? 'bg-slate-400 cursor-not-allowed'
          : 'bg-primary hover:bg-opacity-90 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:cursor-pointer'
      }`}>
      {buttonText}
    </button>
  )
}
