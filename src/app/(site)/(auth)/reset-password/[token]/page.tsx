import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import ResetPassword from '@/app/components/Auth/ResetPassword'

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu | Edu Hub',
}

type ResetPasswordPageProps = {
  params: Promise<{ token: string }>
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { token } = await params

  return (
    <>
      <Breadcrumb pageName='Đặt lại mật khẩu' pageDescription='Nhập mật khẩu mới để hoàn tất quá trình khôi phục tài khoản.' />
      <ResetPassword token={token} />
    </>
  )
}

export default ResetPasswordPage
