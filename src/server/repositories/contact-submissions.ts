import { prisma } from '../db'
import type {
  ContactSubmissionInput,
  ContactSubmissionUpdateInput,
} from '@/types/backend'

export const contactSubmissionsRepository = {
  listAdmin: () =>
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    }),

  create: (data: ContactSubmissionInput) =>
    prisma.contactSubmission.create({
      data,
    }),

  update: (id: string, data: ContactSubmissionUpdateInput) =>
    prisma.contactSubmission.update({
      where: { id },
      data,
    }),

  count: () => prisma.contactSubmission.count(),
}
