import { prisma } from '../db'
import type { CourseInput, MentorInput, TestimonialInput } from '@/types/backend'

export const courseRepository = {
  listAdmin: () => prisma.course.findMany({ orderBy: { createdAt: 'desc' } }),
  listPublished: () =>
    prisma.course.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    }),
  create: (data: CourseInput) => prisma.course.create({ data }),
  update: (id: string, data: CourseInput) =>
    prisma.course.update({ where: { id }, data }),
  remove: (id: string) => prisma.course.delete({ where: { id } }),
}

export const mentorRepository = {
  listAdmin: () => prisma.mentor.findMany({ orderBy: { createdAt: 'desc' } }),
  listPublished: () =>
    prisma.mentor.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    }),
  findPublishedBySlug: (slug: string) =>
    prisma.mentor.findFirst({
      where: { slug, published: true },
    }),
  create: (data: MentorInput) => prisma.mentor.create({ data }),
  update: (id: string, data: MentorInput) =>
    prisma.mentor.update({ where: { id }, data }),
  remove: (id: string) => prisma.mentor.delete({ where: { id } }),
}

export const testimonialRepository = {
  listAdmin: () => prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } }),
  listPublished: () =>
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    }),
  create: (data: TestimonialInput) => prisma.testimonial.create({ data }),
  update: (id: string, data: TestimonialInput) =>
    prisma.testimonial.update({ where: { id }, data }),
  remove: (id: string) => prisma.testimonial.delete({ where: { id } }),
}
