import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getAuthSession } from '@/server/auth/session'
import { enrollmentService } from '@/server/services/enrollment'
import { paymentService } from '@/server/services/payment'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import withBasePath from '@/utils/basePath'
import { Icon } from '@iconify/react/dist/iconify.js'

export const metadata: Metadata = {
  title: 'Dashboard | Edu Hub',
  description: 'Quản lý khóa học đã đăng ký và lịch sử đơn hàng',
}

const DashboardPage = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect('/')
  }

  const displayName = session.user.name?.trim() || session.user.email?.split('@')[0] || 'Học viên'
  const email = session.user.email || ''

  // Lấy danh sách khóa học và danh sách đơn hàng đồng thời
  const [enrollments, orders] = await Promise.all([
    enrollmentService.getStudentEnrollments(session.user.id),
    paymentService.layDanhSachDonHangHocVien(session.user.id),
  ])

  return (
    <>
      <Breadcrumb
        pageName='Dashboard Học Viên'
        pageDescription='Chào mừng bạn quay lại. Tiếp tục hành trình học tập của mình nhé.'
      />

      <section className='pb-20 pt-8'>
        <div className='container mx-auto max-w-7xl px-4'>
          {/* Box thông tin cá nhân */}
          <div className='mb-10 rounded-2xl bg-primary/5 p-8 dark:bg-slate-900 border border-primary/10'>
            <div className='flex items-center gap-4'>
              {session.user.image ? (
                <div className='relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary'>
                  <Image
                    src={session.user.image}
                    alt={displayName}
                    fill
                    className='object-cover'
                  />
                </div>
              ) : (
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold'>
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
                  Xin chào, {displayName}
                </h2>
                <p className='text-slate-600 dark:text-slate-300'>{email}</p>
              </div>
            </div>
          </div>

          {/* Khóa học của tôi */}
          <div className='mb-14'>
            <div className='mb-6 flex items-center justify-between'>
              <h3 className='text-2xl font-bold text-slate-900 dark:text-white'>
                Các khóa học của tôi ({enrollments.length})
              </h3>
              <Link
                href='/courses'
                className='text-sm font-semibold text-primary hover:underline flex items-center gap-1'>
                Xem tất cả khóa học <Icon icon='solar:alt-arrow-right-line-duotone' />
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className='rounded-2xl border border-dashed border-primary/20 bg-primary/5 p-12 text-center'>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary'>
                  <Icon icon='solar:book-bookmark-line-duotone' className='text-3xl' />
                </div>
                <h4 className='mb-2 text-xl font-bold dark:text-white'>Bạn chưa đăng ký khóa học nào</h4>
                <p className='mb-6 text-slate-600 dark:text-slate-400'>
                  Hãy khám phá các khóa học nổi bật và bắt đầu hành trình ngay hôm nay.
                </p>
                <Link
                  href='/courses'
                  className='inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white transition hover:bg-opacity-90'>
                  Khám phá khóa học
                </Link>
              </div>
            ) : (
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className='group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-slate-900'>
                    <div className='relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800'>
                      <Image
                        src={withBasePath(enrollment.course.image)}
                        alt={enrollment.course.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    </div>
                    <div className='flex flex-1 flex-col p-6'>
                      <div className='mb-2'>
                        <span className='inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-primary/20'>
                          {enrollment.status === 'ACTIVE' ? 'Đang học' : 'Hoàn thành'}
                        </span>
                      </div>
                      <h4 className='mb-4 min-h-[3.5rem] text-lg font-bold leading-7 text-slate-900 dark:text-white line-clamp-2'>
                        {enrollment.course.title}
                      </h4>
                      <div className='mt-auto pt-4'>
                        <Link
                          href={`/courses/${enrollment.course.slug}/lessons`}
                          className='block w-full rounded-lg bg-primary/10 px-4 py-2.5 text-center font-medium text-primary transition hover:bg-primary hover:text-white dark:bg-primary/20 dark:hover:bg-primary dark:hover:text-white'>
                          Vào học ngay
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Lịch sử đơn hàng & thanh toán */}
          <div>
            <h3 className='mb-6 text-2xl font-bold text-slate-900 dark:text-white'>
              Lịch sử đơn hàng & Thanh toán
            </h3>

            {orders.length === 0 ? (
              <div className='rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 dark:border-white/10 dark:bg-slate-900 dark:text-slate-400'>
                Bạn chưa có đơn hàng nào.
              </div>
            ) : (
              <div className='overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900'>
                <table className='w-full text-left text-sm text-slate-700 dark:text-slate-300'>
                  <thead className='border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-400'>
                    <tr>
                      <th className='px-6 py-4'>Mã đơn</th>
                      <th className='px-6 py-4'>Khóa học</th>
                      <th className='px-6 py-4'>Số tiền</th>
                      <th className='px-6 py-4'>Phương thức</th>
                      <th className='px-6 py-4'>Trạng thái</th>
                      <th className='px-6 py-4'>Ngày tạo</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-100 dark:divide-white/5'>
                    {orders.map((order) => {
                      const isPaid = order.status === 'PAID'
                      return (
                        <tr key={order.id} className='hover:bg-slate-50/50 dark:hover:bg-slate-800/30'>
                          <td className='px-6 py-4 font-mono font-bold text-slate-900 dark:text-white'>
                            {order.orderCode}
                          </td>
                          <td className='px-6 py-4 font-medium text-slate-900 dark:text-white'>
                            {order.course.title}
                          </td>
                          <td className='px-6 py-4 font-bold text-primary'>
                            {new Intl.NumberFormat('vi-VN').format(order.amount)} đ
                          </td>
                          <td className='px-6 py-4'>{order.paymentMethod}</td>
                          <td className='px-6 py-4'>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
                                isPaid
                                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                  : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              }`}>
                              {isPaid ? 'Đã thanh toán' : 'Chờ xử lý'}
                            </span>
                          </td>
                          <td className='px-6 py-4 text-xs text-slate-500 dark:text-slate-400'>
                            {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default DashboardPage
