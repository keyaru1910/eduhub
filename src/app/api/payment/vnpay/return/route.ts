import { NextRequest, NextResponse } from 'next/server'
import { paymentService } from '@/server/services/payment'
import { getBaseUrl } from '@/server/env'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const vnpParams: Record<string, string> = {}

    searchParams.forEach((value, key) => {
      vnpParams[key] = value
    })

    const ketQua = await paymentService.xuLyReturnUrlVnpay(vnpParams)
    const baseUrl = getBaseUrl()

    const redirectUrl = new URL(`${baseUrl}/checkout/result`)
    if (ketQua.orderCode) {
      redirectUrl.searchParams.set('orderCode', ketQua.orderCode)
    }
    redirectUrl.searchParams.set('status', ketQua.success ? 'success' : 'failed')

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Lỗi khi xử lý VNPay Return:', error)
    const baseUrl = getBaseUrl()
    return NextResponse.redirect(new URL(`${baseUrl}/checkout/result?status=failed`, baseUrl))
  }
}
