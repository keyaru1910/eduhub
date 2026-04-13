import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import ForgotPassword from '@/app/components/Auth/ForgotPassword'

export const metadata: Metadata = {
  title: 'Quên mật khẩu | Edu Hub',
}

const ForgotPasswordPage = () => {
  return (
    <>
      <Breadcrumb pageName='Quên mật khẩu' pageDescription='Nhập email để nhận liên kết đặt lại mật khẩu.' />
      <ForgotPassword />
    </>
  )
}

export default ForgotPasswordPage
