import { NextRequest, NextResponse } from 'next/server'
import { getAuthSession } from '@/server/auth/session'
import { paymentService } from '@/server/services/payment'
import { AppError } from '@/server/errors'

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng đăng nhập để thực hiện thanh toán.' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { courseSlug, paymentMethod } = body

    if (!courseSlug) {
      return NextResponse.json(
        { success: false, message: 'Thiếu thông tin khóa học.' },
        { status: 400 }
      )
    }

    // Lấy địa chỉ IP của client gửi request
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ipAddr = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : req.headers.get('x-real-ip') || '127.0.0.1'

    const ketQua = await paymentService.taoDonHangThanhToan({
      userId: session.user.id,
      courseSlug,
      paymentMethod: paymentMethod || 'VNPAY',
      ipAddr,
    })

    return NextResponse.json({
      success: true,
      paymentUrl: ketQua.paymentUrl,
      orderCode: ketQua.orderCode,
      amount: ketQua.amount,
      courseTitle: ketQua.courseTitle,
    })
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { success: false, message: error.message, code: error.code },
        { status: error.status }
      )
    }

    console.error('Lỗi khi tạo đơn hàng thanh toán:', error)
    return NextResponse.json(
      { success: false, message: 'Không thể tạo đơn hàng thanh toán lúc này.' },
      { status: 500 }
    )
  }
}
