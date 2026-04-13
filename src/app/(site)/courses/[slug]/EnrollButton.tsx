'use client'

import { useActionState, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { enrollAction } from '@/server/actions'

export default function EnrollButton({
  courseSlug,
  isLoggedIn,
}: {
  courseSlug: string
  isLoggedIn: boolean
}) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để đăng ký khóa học')
      // router.push('/signin') // or trigger login modal if possible, but let's just toast and redirect or show message
      return
    }

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

  return (
    <button
      onClick={handleEnroll}
      disabled={isPending}
      className={`inline-block rounded-lg px-8 py-4 text-center font-bold text-white transition ${
        isPending
          ? 'bg-slate-400 cursor-not-allowed'
          : 'bg-primary hover:bg-opacity-90'
      }`}>
      {isPending ? 'Đang xử lý...' : 'Đăng ký ngay'}
    </button>
  )
}
