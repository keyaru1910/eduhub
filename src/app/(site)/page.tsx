import React from 'react'
import Hero from '@/app/components/Home/Hero'
import Companies from '@/app/components/Home/Companies'
import NamesList from '@/app/components/Home/Courses'
import Mentor from '@/app/components/Home/Mentor'
import Testimonial from '@/app/components/Home/Testimonial'
import Newsletter from '@/app/components/Home/Newsletter'
import { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/app/components/Contact/Form'
import { companies, courseOptions, hourOptions } from '@/server/marketing-data'
import {
  getPublishedCourses,
  getPublishedMentors,
  getPublishedTestimonials,
} from '@/server/content/service'

export const metadata: Metadata = {
  title: 'Edu Hub | Nền tảng giới thiệu khóa học và mentor',
  description:
    'Khám phá khóa học, chọn mentor phù hợp và gửi yêu cầu tư vấn ngay trên một luồng trải nghiệm thống nhất.',
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
      <section className='pb-6'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='grid gap-4 rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 lg:grid-cols-[1.2fr_0.8fr] lg:items-center'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                Demo flow
              </p>
              <h2 className='mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white'>
                Bắt đầu từ khóa học, đối chiếu mentor và chốt tư vấn trong một hành trình rõ ràng
              </h2>
              <p className='mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300'>
                Đây là luồng chính của Edu Hub trong bản demo: xem nội dung nổi bật, xác định người đồng hành phù hợp và để lại nhu cầu để đội ngũ xử lý ngay trong admin.
              </p>
            </div>
            <div className='flex flex-wrap gap-3 lg:justify-end'>
              <Link
                href='/courses'
                className='rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary'
              >
                Xem khóa học
              </Link>
              <Link
                href='/mentors'
                className='rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white'
              >
                Xem mentor
              </Link>
              <Link
                href='/contact'
                className='rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 transition duration-300 hover:border-primary hover:text-primary dark:border-white/10 dark:text-slate-200'
              >
                Gửi yêu cầu tư vấn
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Companies items={companies} />
      <NamesList
        items={courses.map((course) => ({
          course: course.title,
          slug: course.slug,
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
          imageAlt: `Ảnh mentor ${mentor.name}`,
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
