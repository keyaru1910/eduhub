import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { contentService } from '@/server/services/content'
import { getAuthSession } from '@/server/auth/session'
import { enrollmentService } from '@/server/services/enrollment'
import { Icon } from '@iconify/react/dist/iconify.js'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = await contentService.getCourseBySlug(slug)

  if (!course) {
    return { title: 'Không tìm thấy khóa học' }
  }

  return {
    title: `Học ${course.title} | Edu Hub`,
  }
}

export const dynamic = 'force-dynamic'

const LessonsPage = async ({ params, searchParams }: Props) => {
  const { slug } = await params
  const { lesson: lessonSlug } = await searchParams

  const session = await getAuthSession()
  if (!session?.user) {
    redirect('/')
  }

  const course = await contentService.getCourseBySlug(slug)
  if (!course) {
    notFound()
  }

  const isEnrolled = await enrollmentService.checkEnrollment(session.user.id, course.id)
  if (!isEnrolled) {
    redirect(`/courses/${course.slug}`)
  }

  const lessons = await contentService.getLessonsByCourse(course.id)
  
  if (lessons.length === 0) {
    return (
      <div className='flex min-h-[60vh] items-center justify-center bg-cream dark:bg-slate-900'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold dark:text-white'>Chưa có bài học nào</h2>
          <p className='mt-2 text-slate-600 dark:text-slate-400'>Nội dung đang được cập nhật. Vui lòng quay lại sau.</p>
          <Link href='/dashboard' className='mt-6 inline-block text-primary hover:underline'>
            Quay về Dashboard
          </Link>
        </div>
      </div>
    )
  }

  // Determine active lesson
  let activeLesson = lessons[0]
  if (typeof lessonSlug === 'string') {
    const found = lessons.find((l) => l.slug === lessonSlug)
    if (found) activeLesson = found
  }

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 pt-20 dark:bg-slate-950 lg:flex-row lg:overflow-hidden'>
      {/* Sidebar: Lesson List */}
      <aside className='w-full border-b border-slate-200 bg-white dark:border-white/10 dark:bg-slate-900 lg:w-80 lg:shrink-0 lg:border-b-0 lg:border-r lg:overflow-y-auto'>
        <div className='p-6'>
          <Link href='/dashboard' className='mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-primary dark:text-slate-400'>
            <Icon icon='solar:arrow-left-line-duotone' className='text-lg' />
            Quay lại Dashboard
          </Link>
          <h2 className='text-lg font-bold text-slate-900 dark:text-white'>{course.title}</h2>
          <p className='mt-1 text-sm text-slate-500 dark:text-slate-400'>
            {lessons.length} bài học
          </p>
        </div>
        <nav className='px-4 pb-6'>
          <ul className='space-y-2'>
            {lessons.map((lesson, index) => {
              const isActive = activeLesson.id === lesson.id
              return (
                <li key={lesson.id}>
                  <Link
                    href={`/courses/${course.slug}/lessons?lesson=${lesson.slug}`}
                    className={`flex items-start gap-3 rounded-lg p-3 transition ${
                      isActive
                        ? 'bg-primary/10 text-primary dark:bg-primary/20'
                        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}>
                    <div className='mt-0.5 shrink-0'>
                      {isActive ? (
                        <Icon icon='solar:play-circle-bold-duotone' className='text-xl' />
                      ) : (
                        <span className='flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-medium dark:bg-slate-700'>
                          {index + 1}
                        </span>
                      )}
                    </div>
                    <span className='text-sm font-medium'>{lesson.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content: Lesson Detail */}
      <main className='flex-1 lg:overflow-y-auto'>
        <div className='mx-auto max-w-4xl p-6 lg:p-10'>
          {activeLesson.videoUrl ? (
            <div className='mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg'>
              <iframe
                src={activeLesson.videoUrl}
                title={activeLesson.title}
                className='h-full w-full border-0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              ></iframe>
            </div>
          ) : (
             <div className='mb-8 aspect-video w-full overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800 shadow-lg flex items-center justify-center flex-col text-slate-500 dark:text-slate-400'>
               <Icon icon='solar:video-frame-line-duotone' className='text-6xl mb-4' />
               <p>Bài học này chỉ có nội dung văn bản</p>
             </div>
          )}

          <h1 className='mb-6 text-3xl font-bold text-slate-900 dark:text-white'>
            {activeLesson.title}
          </h1>

          <div
            className='prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-a:text-primary'
            dangerouslySetInnerHTML={{ __html: activeLesson.content }}
          />
        </div>
      </main>
    </div>
  )
}

export default LessonsPage
