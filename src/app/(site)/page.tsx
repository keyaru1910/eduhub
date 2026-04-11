import React from 'react'
import Hero from '@/app/components/Home/Hero'
import Companies from '@/app/components/Home/Companies'
import NamesList from '@/app/components/Home/Courses'
import Mentor from '@/app/components/Home/Mentor'
import Testimonial from '@/app/components/Home/Testimonial'
import Newsletter from '@/app/components/Home/Newsletter'
import { Metadata } from 'next'
import ContactForm from '@/app/components/Contact/Form'
import { companies, courseOptions, hourOptions } from '@/server/marketing-data'
import {
  getPublishedCourses,
  getPublishedMentors,
  getPublishedTestimonials,
} from '@/server/content/service'

export const metadata: Metadata = {
  title: 'Edu Hub - Empowering Education for All',
}

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [courses, mentors, testimonials] = await Promise.all([
    getPublishedCourses(),
    getPublishedMentors(),
    getPublishedTestimonials(),
  ])

  return (
    <main>
      <Hero courseOptions={courseOptions} hourOptions={hourOptions} />
      <Companies items={companies} />
      <NamesList
        items={courses.map((course) => ({
          course: course.title,
          imageSrc: course.image,
          price: String(course.price),
          profession: course.description,
          category: course.category as
            | 'webdevelopment'
            | 'mobiledevelopment'
            | 'datascience'
            | 'cloudcomputing',
        }))}
      />
      <Mentor
        items={mentors.map((mentor) => ({
          slug: mentor.slug,
          name: mentor.name,
          role: mentor.title,
          imageSrc: mentor.image,
          imageAlt: `Anh mentor ${mentor.name}`,
          shortBio: mentor.shortBio,
          fullBio: mentor.bio,
          experience: mentor.experience,
          expertise: mentor.expertise,
          yearsOfExperience: mentor.yearsOfExperience,
        }))}
      />
      <Testimonial
        items={testimonials.map((testimonial) => ({
          profession: testimonial.role,
          name: testimonial.name,
          imgSrc: testimonial.avatar,
          starimg: '/images/testimonial/stars.png',
          detail: testimonial.content,
        }))}
      />
      <ContactForm />
      <Newsletter />
    </main>
  )
}
