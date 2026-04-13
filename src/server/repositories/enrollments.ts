import { prisma } from '../db'
import type { EnrollmentInput } from '@/types/backend'

export const enrollmentRepository = {
  findUnique: (userId: string, courseId: string) =>
    prisma.enrollment.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    }),

  create: (data: EnrollmentInput) =>
    prisma.enrollment.create({
      data,
    }),

  listByUser: (userId: string) =>
    prisma.enrollment.findMany({
      where: { userId },
      include: {
        course: true,
      },
      orderBy: { createdAt: 'desc' },
    }),

  updateStatus: (id: string, status: string) =>
    prisma.enrollment.update({
      where: { id },
      data: { status },
    }),
}
