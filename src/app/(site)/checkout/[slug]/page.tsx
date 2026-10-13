import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { getAuthSession } from '@/server/auth/session'
import { courseRepository } from '@/server/repositories/content'
import { enrollmentRepository } from '@/server/repositories/enrollments'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import CheckoutForm from './CheckoutForm'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await courseRepository.findBySlug(slug)

  if (!course) {
    return { title: 'Không tìm thấy khóa học | Edu Hub' }
  }

  return {
    title: `Thanh toán khóa học: ${course.title} | Edu Hub`,
    description: `Hoàn tất đăng ký khóa học ${course.title} tại Edu Hub`,
  }
}

export default async function CheckoutPage({ params }: Props) {
  const session = await getAuthSession()
  const { slug } = await params

  // Yêu cầu đăng nhập trước khi thanh toán
  if (!session?.user?.id) {
    redirect(`/signin?callbackUrl=/checkout/${slug}`)
  }

  const course = await courseRepository.findBySlug(slug)
  if (!course) {
    notFound()
  }

  // Nếu người dùng đã sở hữu khóa học thì chuyển hướng vào học luôn
  const daDangKy = await enrollmentRepository.findUnique(session.user.id, course.id)
  if (daDangKy) {
    redirect(`/courses/${course.slug}/lessons`)
  }

  return (
    <>
      <Breadcrumb
        pageName='Thanh toán khóa học'
        pageDescription={`Xác nhận đơn hàng và kích hoạt quyền học khóa học: ${course.title}`}
      />

      <section className='pb-20 pt-8'>
        <div className='container mx-auto max-w-7xl px-4'>
          <CheckoutForm course={course} />
        </div>
      </section>
    </>
  )
}
