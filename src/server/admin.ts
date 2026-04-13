import type {
  ContactSubmissionUpdateInput,
  CourseInput,
  MentorInput,
  TestimonialInput,
} from '@/types/backend'
import {
  courseRepository,
  mentorRepository,
  testimonialRepository,
} from './repositories/content'
import { lessonRepository } from './repositories/lessons'
import { contactSubmissionsRepository } from './repositories/contact-submissions'
import type { LessonInput } from '@/types/backend'

export const adminResources = {
  courses: {
    list: () => courseRepository.listAdmin(),
    create: (data: CourseInput) => courseRepository.create(data),
    update: (id: string, data: CourseInput) =>
      courseRepository.update(id, data),
    remove: (id: string) => courseRepository.remove(id),
  },
  mentors: {
    list: () => mentorRepository.listAdmin(),
    create: (data: MentorInput) => mentorRepository.create(data),
    update: (id: string, data: MentorInput) =>
      mentorRepository.update(id, data),
    remove: (id: string) => mentorRepository.remove(id),
  },
  testimonials: {
    list: () => testimonialRepository.listAdmin(),
    create: (data: TestimonialInput) => testimonialRepository.create(data),
    update: (id: string, data: TestimonialInput) =>
      testimonialRepository.update(id, data),
    remove: (id: string) => testimonialRepository.remove(id),
  },
  contactSubmissions: {
    list: () => contactSubmissionsRepository.listAdmin(),
    update: (id: string, data: ContactSubmissionUpdateInput) =>
      contactSubmissionsRepository.update(id, data),
  },
  lessons: {
    list: () => lessonRepository.listAdmin(),
    create: (data: LessonInput) => lessonRepository.create(data),
    update: (id: string, data: LessonInput) => lessonRepository.update(id, data),
    remove: (id: string) => lessonRepository.remove(id),
  }
}
