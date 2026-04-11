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

  updatePassword: (id: string, passwordHash: string) =>
    prisma.user.update({
      where: { id },
      data: { passwordHash },
    }),
}
