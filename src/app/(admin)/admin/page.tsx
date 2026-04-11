import { ContactSubmissionStatus } from '@prisma/client'
import { prisma, hasDatabaseUrl } from '@/server/db'

const AdminPage = async () => {
  const [courseCount, mentorCount, testimonialCount, contactCount, newLeadCount, contactedLeadCount] = hasDatabaseUrl
    ? await Promise.all([
        prisma.course.count(),
        prisma.mentor.count(),
        prisma.testimonial.count(),
        prisma.contactSubmission.count(),
        prisma.contactSubmission.count({ where: { status: ContactSubmissionStatus.NEW } }),
        prisma.contactSubmission.count({ where: { status: ContactSubmissionStatus.CONTACTED } }),
      ])
    : [0, 0, 0, 0, 0, 0]

  const stats = [
    { label: 'Courses', value: courseCount },
    { label: 'Mentors', value: mentorCount },
    { label: 'Testimonials', value: testimonialCount },
    { label: 'Contacts', value: contactCount },
    { label: 'New Leads', value: newLeadCount },
    { label: 'Contacted', value: contactedLeadCount },
  ]

  return (
    <section className='rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
        Dashboard
      </p>
      <h2 className='mt-3 text-3xl font-bold text-slate-950 dark:text-white'>
        Tong quan noi dung
      </h2>
      <div className='mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='rounded-2xl border border-slate-200 p-5 dark:border-white/10'
          >
            <p className='text-sm text-slate-500 dark:text-slate-300'>{stat.label}</p>
            <p className='mt-2 text-4xl font-bold text-slate-950 dark:text-white'>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default AdminPage
