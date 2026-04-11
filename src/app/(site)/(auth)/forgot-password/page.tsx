import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import ForgotPassword from '@/app/components/Auth/ForgotPassword'

export const metadata: Metadata = {
  title: 'Quen mat khau | Edu Hub',
}

const ForgotPasswordPage = () => {
  return (
    <>
      <Breadcrumb pageName='Quen mat khau' pageDescription='Nhap email de nhan lien ket dat lai mat khau.' />
      <ForgotPassword />
    </>
  )
}

export default ForgotPasswordPage
