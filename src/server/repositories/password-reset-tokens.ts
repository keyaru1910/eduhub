import { prisma } from '../db'

export const passwordResetTokensRepository = {
  create: (data: { userId: string; tokenHash: string; expiresAt: Date }) =>
    prisma.passwordResetToken.create({
      data,
    }),

  findByTokenHash: (tokenHash: string) =>
    prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    }),

  markUsed: (id: string) =>
    prisma.passwordResetToken.update({
      where: { id },
      data: { usedAt: new Date() },
    }),

  deleteExpiredAndUsed: () =>
    prisma.passwordResetToken.deleteMany({
      where: {
        OR: [{ usedAt: { not: null } }, { expiresAt: { lt: new Date() } }],
      },
    }),
}
