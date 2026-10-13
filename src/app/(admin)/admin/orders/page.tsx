import { Metadata } from 'next'
import { paymentService } from '@/server/services/payment'
import { Icon } from '@iconify/react/dist/iconify.js'

export const metadata: Metadata = {
  title: 'Quản lý đơn hàng & Doanh thu | Edu Hub Admin',
  description: 'Theo dõi đơn hàng và doanh thu khóa học',
}

export default async function AdminOrdersPage() {
  const [stats, orders] = await Promise.all([
    paymentService.layThongKeDoanhThu(),
    paymentService.layDanhSachDonHangAdmin(),
  ])

  const formattedRevenue = new Intl.NumberFormat('vi-VN').format(stats.tongDoanhThu)

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <h2 className='text-2xl font-bold text-slate-900 dark:text-white'>
          Quản lý đơn hàng & Doanh thu
        </h2>
        <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
          Theo dõi các giao dịch thanh toán từ học viên qua các cổng thanh toán.
        </p>
      </div>

      {/* 4 Cards thống kê doanh thu */}
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>
              Tổng doanh thu
            </span>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'>
              <Icon icon='solar:wallet-money-bold-duotone' className='text-2xl' />
            </div>
          </div>
          <div className='mt-3 text-2xl font-black text-slate-900 dark:text-white'>
            {formattedRevenue} đ
          </div>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>Từ các đơn đã thanh toán</p>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>
              Đơn thành công
            </span>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'>
              <Icon icon='solar:check-circle-bold-duotone' className='text-2xl' />
            </div>
          </div>
          <div className='mt-3 text-2xl font-black text-slate-900 dark:text-white'>
            {stats.soDonThanhCong}
          </div>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>Đã mở khóa học cho học viên</p>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>
              Đang chờ xử lý
            </span>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'>
              <Icon icon='solar:hourglass-line-bold-duotone' className='text-2xl' />
            </div>
          </div>
          <div className='mt-3 text-2xl font-black text-slate-900 dark:text-white'>
            {stats.soDonChoXuLy}
          </div>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>Chờ thanh toán từ VNPay</p>
        </div>

        <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900'>
          <div className='flex items-center justify-between'>
            <span className='text-xs font-semibold uppercase text-slate-500 dark:text-slate-400'>
              Tổng số đơn
            </span>
            <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'>
              <Icon icon='solar:document-text-bold-duotone' className='text-2xl' />
            </div>
          </div>
          <div className='mt-3 text-2xl font-black text-slate-900 dark:text-white'>
            {stats.tongSoDon}
          </div>
          <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>Toàn bộ giao dịch khởi tạo</p>
        </div>
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div className='rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900'>
        <div className='border-b border-slate-200 p-6 dark:border-white/10'>
          <h3 className='text-lg font-bold text-slate-900 dark:text-white'>
            Danh sách đơn hàng ({orders.length})
          </h3>
        </div>

        {orders.length === 0 ? (
          <div className='p-12 text-center text-slate-500 dark:text-slate-400'>
            Chưa có đơn hàng nào được tạo.
          </div>
        ) : (
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm text-slate-700 dark:text-slate-300'>
              <thead className='border-b border-slate-200 bg-slate-50 text-xs font-bold uppercase text-slate-500 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-400'>
                <tr>
                  <th className='px-6 py-4'>Mã đơn</th>
                  <th className='px-6 py-4'>Học viên</th>
                  <th className='px-6 py-4'>Khóa học</th>
                  <th className='px-6 py-4'>Số tiền</th>
                  <th className='px-6 py-4'>Cổng TT</th>
                  <th className='px-6 py-4'>Trạng thái</th>
                  <th className='px-6 py-4'>Thời gian</th>
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
                      <td className='px-6 py-4'>
                        <div className='font-semibold text-slate-900 dark:text-white'>
                          {order.user.name}
                        </div>
                        <div className='text-xs text-slate-500 dark:text-slate-400'>
                          {order.user.email}
                        </div>
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
                          {isPaid ? 'PAID' : 'PENDING'}
                        </span>
                      </td>
                      <td className='px-6 py-4 text-xs text-slate-500 dark:text-slate-400'>
                        {new Date(order.createdAt).toLocaleString('vi-VN')}
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
  )
}
