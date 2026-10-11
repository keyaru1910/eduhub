import { prisma } from '../db'
import type { OrderInput, OrderStatus } from '@/types/backend'

/**
 * Order Repository - Quản lý thao tác dữ liệu với bảng Order
 */
export const orderRepository = {
  /**
   * Tìm đơn hàng theo mã đơn (orderCode)
   */
  findByOrderCode: (orderCode: string) =>
    prisma.order.findUnique({
      where: { orderCode },
      include: {
        course: true,
        user: {
          select: { id: true, name: true, email: true },
        },
        enrollment: true,
      },
    }),

  /**
   * Tìm đơn hàng theo ID
   */
  findById: (id: string) =>
    prisma.order.findUnique({
      where: { id },
      include: {
        course: true,
        user: {
          select: { id: true, name: true, email: true },
        },
        enrollment: true,
      },
    }),

  /**
   * Tạo đơn hàng mới
   */
  create: (data: OrderInput) =>
    prisma.order.create({
      data: {
        orderCode: data.orderCode,
        userId: data.userId,
        courseId: data.courseId,
        amount: data.amount,
        status: data.status || 'PENDING',
        paymentMethod: data.paymentMethod || 'VNPAY',
        paymentUrl: data.paymentUrl || null,
        transactionRef: data.transactionRef || null,
        paidAt: data.paidAt || null,
      },
      include: {
        course: true,
      },
    }),

  /**
   * Cập nhật trạng thái đơn hàng (ví dụ: PAID, CANCELLED, FAILED)
   */
  updateStatus: (
    id: string,
    status: OrderStatus,
    extraData?: { transactionRef?: string; paidAt?: Date }
  ) =>
    prisma.order.update({
      where: { id },
      data: {
        status,
        ...(extraData?.transactionRef ? { transactionRef: extraData.transactionRef } : {}),
        ...(extraData?.paidAt ? { paidAt: extraData.paidAt } : {}),
      },
    }),

  /**
   * Cập nhật URL thanh toán vào đơn hàng
   */
  updatePaymentUrl: (id: string, paymentUrl: string) =>
    prisma.order.update({
      where: { id },
      data: { paymentUrl },
    }),

  /**
   * Lấy danh sách đơn hàng của một học viên
   */
  listByUser: (userId: string) =>
    prisma.order.findMany({
      where: { userId },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),

  /**
   * Lấy danh sách tất cả đơn hàng cho trang Admin quản lý
   */
  listAllForAdmin: () =>
    prisma.order.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            image: true,
            price: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),

  /**
   * Đếm tổng số đơn hàng theo trạng thái
   */
  countByStatus: (status?: OrderStatus) =>
    prisma.order.count({
      where: status ? { status } : undefined,
    }),

  /**
   * Tính tổng doanh thu từ các đơn hàng đã thanh toán thành công (PAID)
   */
  sumRevenue: async () => {
    const aggregate = await prisma.order.aggregate({
      where: { status: 'PAID' },
      _sum: { amount: true },
    })
    return aggregate._sum.amount || 0
  },
}
