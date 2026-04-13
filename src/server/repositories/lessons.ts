import { prisma } from '../db'
import type { LessonInput } from '@/types/backend'

export const lessonRepository = {
  listAdmin: () =>
    prisma.lesson.findMany({
      orderBy: { createdAt: 'desc' },
      include: { course: true }
    }),

  listByCourse: (courseId: string) =>
    prisma.lesson.findMany({
      where: { courseId, published: true },
      orderBy: { order: 'asc' },
    }),

  listByCourseAdmin: (courseId: string) =>
    prisma.lesson.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    }),

  findBySlug: (courseId: string, slug: string) =>
    prisma.lesson.findUnique({
      where: {
        courseId_slug: { courseId, slug },
      },
    }),

  create: (data: LessonInput) =>
    prisma.lesson.create({
      data,
    }),

  update: (id: string, data: LessonInput) =>
    prisma.lesson.update({
      where: { id },
      data,
    }),

  remove: (id: string) =>
    prisma.lesson.delete({
      where: { id },
    }),
}
