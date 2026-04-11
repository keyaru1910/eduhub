import { internalError } from '../errors'
import { hasDatabaseUrl } from '../db'
import {
  fallbackCourses,
  fallbackMentors,
  fallbackTestimonials,
} from '../content/fallback'
import {
  courseRepository,
  mentorRepository,
  testimonialRepository,
} from '../repositories/content'

const safeContentQuery = async <T>(query: () => Promise<T>, fallback: T) => {
  if (!hasDatabaseUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
    }

    return fallback
  }

  try {
    return await query()
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw error
    }

    console.warn('Falling back to static content:', error)
    return fallback
  }
}

export const contentService = {
  getPublishedCourses: () =>
    safeContentQuery(() => courseRepository.listPublished(), fallbackCourses),

  getPublishedMentors: () =>
    safeContentQuery(() => mentorRepository.listPublished(), fallbackMentors),

  getPublishedTestimonials: () =>
    safeContentQuery(() => testimonialRepository.listPublished(), fallbackTestimonials),

  async getMentorBySlug(slug: string) {
    if (!hasDatabaseUrl) {
      if (process.env.NODE_ENV === 'production') {
        throw internalError('Database is not configured.', 'DATABASE_NOT_CONFIGURED')
      }

      return fallbackMentors.find((mentor) => mentor.slug === slug) || null
    }

    try {
      return await mentorRepository.findPublishedBySlug(slug)
    } catch (error) {
      if (process.env.NODE_ENV === 'production') {
        throw error
      }

      console.warn('Falling back to static mentor detail:', error)
      return fallbackMentors.find((mentor) => mentor.slug === slug) || null
    }
  },
}
