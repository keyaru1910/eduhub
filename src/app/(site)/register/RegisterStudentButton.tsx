'use client'

import { Icon } from '@iconify/react'
import { useAuthModal } from '@/app/components/Auth/AuthModalContext'

/**
 * Nút hành động mở khung đăng ký tài khoản học viên trực tiếp
 */
export default function RegisterStudentButton() {
  const { openSignUpModal } = useAuthModal()

  return (
    <button
      type='button'
      onClick={openSignUpModal}
      className='inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/25 transition duration-300 hover:bg-transparent hover:text-primary dark:hover:bg-primary/10 hover:cursor-pointer'>
      <span>Tạo tài khoản học viên ngay</span>
      <Icon icon='solar:arrow-right-line-duotone' className='text-xl' />
    </button>
  )
}
