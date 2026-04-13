import data from '../../../public/data/data.json'
import { mentors } from '@/data/mentors'

export const fallbackCourses = data.CourseDetailData.map((course) => ({
  id: course.course.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  title: course.course,
  slug: course.course.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  description: course.profession,
  image: course.imageSrc,
  price: Number(course.price),
  level: 'Intermediate',
  duration: '12 buổi học',
  category: course.category,
  published: true,
}))

export const fallbackMentors = mentors.map((mentor) => ({
  id: mentor.slug,
  name: mentor.name,
  slug: mentor.slug,
  title: mentor.role,
  bio: mentor.fullBio,
  shortBio: mentor.shortBio,
  image: mentor.imageSrc,
  expertise: mentor.expertise,
  experience: mentor.experience,
  yearsOfExperience: mentor.yearsOfExperience,
  published: true,
}))

export const fallbackTestimonials = data.TestimonialData.map((item, index) => ({
  id: `testimonial-${index + 1}`,
  name: item.name,
  role: item.profession,
  avatar: item.imgSrc,
  content: item.detail,
  rating: 5,
  published: true,
}))
