import { enrollmentRepository } from '../repositories/enrollments'
import { courseRepository } from '../repositories/content'
import { internalError, notFound } from '../errors'

export const enrollmentService = {
  async enroll(userId: string, courseSlug: string) {
    const course = await courseRepository.findBySlug(courseSlug)
    if (!course) {
      throw notFound('Course not found')
    }

    const existing = await enrollmentRepository.findUnique(userId, course.id)
    if (existing) {
      return existing
    }

    return await enrollmentRepository.create({
      userId,
      courseId: course.id,
      status: 'ACTIVE',
    })
  },

  async getStudentEnrollments(userId: string) {
    return await enrollmentRepository.listByUser(userId)
  },

  async checkEnrollment(userId: string, courseId: string) {
    const enrollment = await enrollmentRepository.findUnique(userId, courseId)
    return !!enrollment
  },
}
