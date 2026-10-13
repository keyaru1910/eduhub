import { orderRepository } from '../repositories/orders'
import { courseRepository } from '../repositories/content'
import { enrollmentRepository } from '../repositories/enrollments'
import { kiemTraChuKyVnpay, taoUrlThanhToanVnpay } from '../payment/vnpay'
import { badRequest, conflict, notFound } from '../errors'
import { prisma } from '../db'

export const paymentService = {
  /**
   * Tạo đơn hàng mới và sinh liên kết thanh toán sang cổng VNPay
   */
  async taoDonHangThanhToan({
    userId,
    courseSlug,
    paymentMethod = 'VNPAY',
    ipAddr = '127.0.0.1',
  }: {
    userId: string
    courseSlug: string
    paymentMethod?: string
    ipAddr?: string
  }) {
    const course = await courseRepository.findBySlug(courseSlug)
    if (!course) {
      throw notFound('Không tìm thấy thông tin khóa học.')
    }

    // Kiểm tra học viên đã sở hữu khóa học này chưa
    const daDangKy = await enrollmentRepository.findUnique(userId, course.id)
    if (daDangKy) {
      throw conflict('Bạn đã đăng ký và sở hữu khóa học này rồi.')
    }

    if (course.price <= 0) {
      throw badRequest('Khóa học này hoàn toàn miễn phí, vui lòng đăng ký trực tiếp.')
    }

    // Sinh mã đơn hàng ngẫu nhiên: EDU + timestamp + 3 số ngẫu nhiên
    const maDonHang = `EDU${Date.now()}${Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0')}`

    // Tạo đơn hàng mới trong cơ sở dữ liệu với trạng thái PENDING
    const donHang = await orderRepository.create({
      orderCode: maDonHang,
      userId,
      courseId: course.id,
      amount: course.price,
      status: 'PENDING',
      paymentMethod,
    })

    // Sinh link chuyển hướng sang VNPay
    const paymentUrl = taoUrlThanhToanVnpay({
      orderCode: maDonHang,
      amount: course.price,
      orderInfo: `Thanh toan don hang ${maDonHang} - Khoa hoc ${course.title}`.slice(0, 250),
      ipAddr,
    })

    // Lưu paymentUrl vào bản ghi đơn hàng
    await orderRepository.updatePaymentUrl(donHang.id, paymentUrl)

    return {
      orderCode: maDonHang,
      paymentUrl,
      amount: course.price,
      courseTitle: course.title,
    }
  },

  /**
   * Kích hoạt khóa học và cập nhật đơn hàng thành PAID
   */
  async kichHoatKhoaHocSauThanhToan(orderCode: string, transactionRef?: string) {
    const donHang = await orderRepository.findByOrderCode(orderCode)
    if (!donHang) {
      throw notFound('Không tìm thấy đơn hàng cần kích hoạt.')
    }

    // Nếu đơn hàng đã được xác nhận thanh toán rồi thì không lặp lại
    if (donHang.status === 'PAID') {
      return donHang
    }

    // Sử dụng transaction để cập nhật Order và tạo Enrollment đồng thời
    return await prisma.$transaction(async (tx) => {
      // 1. Cập nhật Order sang PAID
      const updatedOrder = await tx.order.update({
        where: { id: donHang.id },
        data: {
          status: 'PAID',
          transactionRef: transactionRef || donHang.transactionRef,
          paidAt: new Date(),
        },
      })

      // 2. Kích hoạt quyền học (Enrollment) cho học viên
      await tx.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: donHang.userId,
            courseId: donHang.courseId,
          },
        },
        create: {
          userId: donHang.userId,
          courseId: donHang.courseId,
          orderId: donHang.id,
          status: 'ACTIVE',
        },
        update: {
          orderId: donHang.id,
          status: 'ACTIVE',
        },
      })

      return updatedOrder
    })
  },

  /**
   * Xử lý thông báo ngầm từ Webhook IPN của VNPay (Server-to-Server)
   */
  async xuLyKetQuaVnpayIpn(vnpParams: Record<string, string>) {
    // 1. Xác thực chữ ký số
    const hopLe = kiemTraChuKyVnpay(vnpParams)
    if (!hopLe) {
      return { RspCode: '97', Message: 'Invalid Checksum' }
    }

    const orderCode = vnpParams['vnp_TxnRef']
    const donHang = await orderRepository.findByOrderCode(orderCode)

    // 2. Kiểm tra tồn tại đơn hàng
    if (!donHang) {
      return { RspCode: '01', Message: 'Order not found' }
    }

    // 3. Kiểm tra số tiền giao dịch
    const vnpAmount = Number(vnpParams['vnp_Amount'])
    if (donHang.amount * 100 !== vnpAmount) {
      return { RspCode: '04', Message: 'Invalid amount' }
    }

    // 4. Kiểm tra xem đơn hàng đã hoàn tất trước đó chưa
    if (donHang.status === 'PAID') {
      return { RspCode: '02', Message: 'Order already confirmed' }
    }

    // 5. Kiểm tra kết quả giao dịch từ cổng thanh toán
    const responseCode = vnpParams['vnp_ResponseCode']
    const transactionNo = vnpParams['vnp_TransactionNo']

    if (responseCode === '00') {
      // Giao dịch thành công -> kích hoạt đơn hàng & cấp quyền học
      await this.kichHoatKhoaHocSauThanhToan(orderCode, transactionNo)
      return { RspCode: '00', Message: 'Confirm Success' }
    } else {
      // Giao dịch thất bại
      await orderRepository.updateStatus(donHang.id, 'FAILED', {
        transactionRef: transactionNo,
      })
      return { RspCode: '00', Message: 'Confirm Success' }
    }
  },

  /**
   * Xử lý khi người dùng được chuyển hướng về trang Return URL
   */
  async xuLyReturnUrlVnpay(vnpParams: Record<string, string>) {
    const hopLe = kiemTraChuKyVnpay(vnpParams)
    const orderCode = vnpParams['vnp_TxnRef']
    const responseCode = vnpParams['vnp_ResponseCode']
    const transactionNo = vnpParams['vnp_TransactionNo']

    if (hopLe && responseCode === '00' && orderCode) {
      // Đảm bảo kích hoạt quyền học nếu IPN chưa kịp chạy tới
      await this.kichHoatKhoaHocSauThanhToan(orderCode, transactionNo)
      return {
        success: true,
        orderCode,
        message: 'Thanh toán thành công.',
      }
    }

    return {
      success: false,
      orderCode,
      message: 'Giao dịch chưa hoàn tất hoặc bị hủy.',
    }
  },

  /**
   * Lấy chi tiết đơn hàng theo mã đơn
   */
  async layDonHangTheoMa(orderCode: string, userId?: string) {
    const donHang = await orderRepository.findByOrderCode(orderCode)
    if (!donHang) {
      throw notFound('Không tìm thấy đơn hàng.')
    }

    // Nếu truyền userId, đảm bảo chỉ chính chủ hoặc admin mới được xem
    if (userId && donHang.userId !== userId) {
      throw badRequest('Bạn không có quyền truy cập đơn hàng này.')
    }

    return donHang
  },

  /**
   * Lấy danh sách lịch sử đơn hàng của học viên
   */
  async layDanhSachDonHangHocVien(userId: string) {
    return await orderRepository.listByUser(userId)
  },

  /**
   * Lấy toàn bộ đơn hàng cho trang Admin quản lý
   */
  async layDanhSachDonHangAdmin() {
    return await orderRepository.listAllForAdmin()
  },

  /**
   * Thống kê báo cáo doanh thu cho Admin
   */
  async layThongKeDoanhThu() {
    const [tongDoanhThu, soDonThanhCong, soDonChoXuLy, tongSoDon] = await Promise.all([
      orderRepository.sumRevenue(),
      orderRepository.countByStatus('PAID'),
      orderRepository.countByStatus('PENDING'),
      orderRepository.countByStatus(),
    ])

    return {
      tongDoanhThu,
      soDonThanhCong,
      soDonChoXuLy,
      tongSoDon,
    }
  },
}
