import { contentService } from '../services/content'

export const getContentService = () => contentService

export const {
  getPublishedCourses,
  getPublishedMentors,
  getPublishedTestimonials,
  getMentorBySlug,
} = contentService
