import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Breadcrumb from '@/app/components/Common/Breadcrumb'
import { getMentorBySlug } from '@/server/content/service'
import withBasePath from '@/utils/basePath'

type MentorDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({
  params,
}: MentorDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const mentor = await getMentorBySlug(slug)

  if (!mentor) {
    return {
      title: 'Mentor không tồn tại | Edu Hub',
    }
  }

  return {
    title: `${mentor.name} | Edu Hub`,
    description: mentor.shortBio,
  }
}

export const dynamic = 'force-dynamic'

const MentorDetailPage = async ({ params }: MentorDetailPageProps) => {
  const { slug } = await params
  const mentor = await getMentorBySlug(slug)

  if (!mentor) {
    notFound()
  }

  return (
    <>
      <Breadcrumb pageName={mentor.name} pageDescription={mentor.title} />
      <section className='pb-20'>
        <div className='container mx-auto max-w-6xl px-4'>
          <div className='grid gap-8 rounded-[28px] border border-primary/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20 lg:grid-cols-[0.9fr_1.1fr] lg:p-8'>
            <div className='overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-800'>
              <Image
                src={withBasePath(mentor.image)}
                alt={`Ảnh mentor ${mentor.name}`}
                width={900}
                height={1000}
                className='h-full w-full object-cover'
              />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-sm font-semibold uppercase tracking-[0.2em] text-primary'>
                Hồ sơ mentor
              </p>
              <h1 className='mt-3 text-4xl font-bold tracking-tight text-black dark:text-white'>
                {mentor.name}
              </h1>
              <p className='mt-3 text-xl font-medium text-black/70 dark:text-slate-200'>
                {mentor.title}
              </p>
              <p className='mt-5 text-base leading-8 text-black/70 dark:text-slate-300'>
                {mentor.bio}
              </p>

              <div className='mt-6 flex flex-wrap gap-3'>
                <div className='rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary'>
                {mentor.yearsOfExperience}+ năm kinh nghiệm
                </div>
                {mentor.expertise.map((item) => (
                  <div
                    key={item}
                    className='rounded-full border border-black/10 px-4 py-2 text-sm text-black/70 dark:border-white/10 dark:text-slate-200'>
                    {item}
                  </div>
                ))}
              </div>

              <div className='mt-8 flex flex-wrap gap-3'>
                <Link
                  href='/contact'
                  className='rounded-lg border border-primary bg-primary px-5 py-3 font-medium text-white transition duration-300 hover:bg-transparent hover:text-primary'>
                  Liên hệ để học với mentor này
                </Link>
                <Link
                  href='/courses'
                  className='rounded-lg border border-primary px-5 py-3 font-medium text-primary transition duration-300 hover:bg-primary hover:text-white'>
                  Xem khóa học phù hợp
                </Link>
              </div>
            </div>
          </div>

          <div className='mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
            <div className='rounded-[28px] border border-primary/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
              <h2 className='text-2xl font-bold tracking-tight text-black dark:text-white'>
                Tiểu sử
              </h2>
              <p className='mt-4 text-base leading-8 text-black/70 dark:text-slate-300'>
                {mentor.shortBio}
              </p>
              <p className='mt-4 text-base leading-8 text-black/70 dark:text-slate-300'>
                Mentor này phù hợp với học viên muốn học theo hướng thực chiến, có người theo sát tiến độ và định hướng cách áp dụng kỹ năng vào dự án cụ thể.
              </p>
            </div>

            <div className='rounded-[28px] border border-primary/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
              <h2 className='text-2xl font-bold tracking-tight text-black dark:text-white'>
                Kinh nghiệm nổi bật
              </h2>
              <ul className='mt-5 space-y-4'>
                {mentor.experience.map((item) => (
                  <li
                    key={item}
                    className='rounded-2xl border border-black/5 bg-slate-50 px-4 py-4 text-base leading-7 text-black/70 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MentorDetailPage
