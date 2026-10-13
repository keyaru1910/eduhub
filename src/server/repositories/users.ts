import { prisma } from '../db'

export const usersRepository = {
  findByEmail: (email: string) =>
    prisma.user.findUnique({
      where: { email },
    }),

  createStudent: (data: { name: string; email: string; passwordHash: string }) =>
    prisma.user.create({
      data,
    }),

  /**
   * Tạo tài khoản học viên mới từ nhà cung cấp OAuth (Google)
   */
  createOAuthStudent: (data: { name: string; email: string; avatarUrl?: string }) =>
    prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        role: 'STUDENT',
      },
    }),

  /**
   * Cập nhật ảnh đại diện của người dùng
   */
  updateAvatar: (id: string, avatarUrl: string) =>
    prisma.user.update({
      where: { id },
      data: { avatarUrl },
    }),

  updatePassword: (id: string, passwordHash: string) =>
    prisma.user.update({
      where: { id },
      data: { passwordHash },
    }),
}
