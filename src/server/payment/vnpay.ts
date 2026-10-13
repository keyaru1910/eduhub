import crypto from 'node:crypto'
import { getBaseUrl } from '../env'

/**
 * Cấu hình tham số kết nối VNPay Sandbox
 */
export const vnpayConfig = {
  tmnCode: process.env.VNPAY_TMN_CODE || 'DEMOVNPAY',
  hashSecret: process.env.VNPAY_HASH_SECRET || 'SECRETKEYDEMOVNPAYFORSANDBOX123',
  url: process.env.VNPAY_URL || 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  getReturnUrl: () => process.env.VNPAY_RETURN_URL || `${getBaseUrl()}/api/payment/vnpay/return`,
}

/**
 * Hàm sắp xếp object theo thứ tự alphabet của key (chuẩn quy định từ cổng VNPay)
 */
function sapXepThamSoVnpay(obj: Record<string, any>): Record<string, string> {
  const sorted: Record<string, string> = {}
  const keys: string[] = []

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      keys.push(encodeURIComponent(key))
    }
  }

  keys.sort()

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const originalKey = decodeURIComponent(key)
    const val = obj[originalKey]

    if (val !== undefined && val !== null && val !== '') {
      sorted[key] = encodeURIComponent(String(val)).replace(/%20/g, '+')
    }
  }

  return sorted
}

/**
 * Tạo URL thanh toán chuyển hướng sang cổng VNPay
 */
export function taoUrlThanhToanVnpay({
  orderCode,
  amount,
  orderInfo,
  ipAddr = '127.0.0.1',
}: {
  orderCode: string
  amount: number
  orderInfo: string
  ipAddr?: string
}): string {
  const now = new Date()

  // Format ngày giờ yyyyMMddHHmmss theo múi giờ Việt Nam (GMT+7)
  const pad = (n: number) => n.toString().padStart(2, '0')
  const createDate =
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())

  // VNPay tính đơn vị số tiền nhân với 100
  const vnpAmount = Math.round(amount * 100)

  let vnpParams: Record<string, any> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: vnpayConfig.tmnCode,
    vnp_Locale: 'vn',
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderCode,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'other',
    vnp_Amount: vnpAmount,
    vnp_ReturnUrl: vnpayConfig.getReturnUrl(),
    vnp_IpAddr: ipAddr,
    vnp_CreateDate: createDate,
  }

  const sortedParams = sapXepThamSoVnpay(vnpParams)
  const signData = Object.entries(sortedParams)
    .map(([key, val]) => `${key}=${val}`)
    .join('&')

  const hmac = crypto.createHmac('sha512', vnpayConfig.hashSecret)
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  return `${vnpayConfig.url}?${signData}&vnp_SecureHash=${signed}`
}

/**
 * Kiểm tra tính hợp lệ của chữ ký phản hồi từ VNPay (Return URL hoặc IPN Webhook)
 */
export function kiemTraChuKyVnpay(vnpParams: Record<string, string>): boolean {
  const secureHash = vnpParams['vnp_SecureHash']
  if (!secureHash) {
    return false
  }

  const paramsToVerify: Record<string, string> = {}
  for (const key in vnpParams) {
    if (key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType') {
      paramsToVerify[key] = vnpParams[key]
    }
  }

  const sortedParams = sapXepThamSoVnpay(paramsToVerify)
  const signData = Object.entries(sortedParams)
    .map(([key, val]) => `${key}=${val}`)
    .join('&')

  const hmac = crypto.createHmac('sha512', vnpayConfig.hashSecret)
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  return secureHash.toLowerCase() === signed.toLowerCase()
}
