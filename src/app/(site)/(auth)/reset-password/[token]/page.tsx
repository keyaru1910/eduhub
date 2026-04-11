import { Metadata } from 'next'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import ResetPassword from '@/app/components/Auth/ResetPassword'

export const metadata: Metadata = {
  title: 'Dat lai mat khau | Edu Hub',
}

type ResetPasswordPageProps = {
  params: Promise<{ token: string }>
}

const ResetPasswordPage = async ({ params }: ResetPasswordPageProps) => {
  const { token } = await params

  return (
    <>
      <Breadcrumb pageName='Dat lai mat khau' pageDescription='Nhap mat khau moi de hoan tat qua trinh khoi phuc tai khoan.' />
      <ResetPassword token={token} />
    </>
  )
}

export default ResetPasswordPage
