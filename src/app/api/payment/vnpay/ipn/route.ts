import { NextRequest, NextResponse } from 'next/server'
import { paymentService } from '@/server/services/payment'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const vnpParams: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      vnpParams[key] = value
    })

    const ketQua = await paymentService.xuLyKetQuaVnpayIpn(vnpParams)
    return NextResponse.json(ketQua)
  } catch (error) {
    console.error('Lỗi khi xử lý VNPay IPN:', error)
    return NextResponse.json({ RspCode: '99', Message: 'Unknown error' })
  }
}
