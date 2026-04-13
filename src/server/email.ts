import nodemailer from 'nodemailer'
import { hasSmtpConfig } from './env'

const transporter = hasSmtpConfig()
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null

export const sendPasswordResetEmail = async (email: string, resetUrl: string) => {
  if (!transporter) {
    console.warn(`SMTP is not configured. Reset link for ${email}: ${resetUrl}`)
    return
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Đặt lại mật khẩu Edu Hub',
    text: `Sử dụng liên kết này để đặt lại mật khẩu: ${resetUrl}`,
  })
}
