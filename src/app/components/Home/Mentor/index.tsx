import Image from 'next/image'
import Link from 'next/link'
import withBasePath from '@/utils/basePath'
import { mentors } from '@/data/mentors'

const Mentor = () => {
    return (
        <section id='mentors-section'>
            <div className='container'>
                <div className='flex flex-col sm:flex-row gap-5 justify-between sm:items-center mb-12'>
                    <h2 className='font-bold tracking-tight'>Gặp gỡ Mentor của chúng tôi</h2>
                    <Link
                        href='/mentors'
                        className='bg-transparent inline-flex cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300'>
                        Khám phá hơn 10 Mentor
                    </Link>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  xl:gap-8'>
                    {mentors.map((item) => (
                            <Link
                                key={item.slug}
                                href={`/mentors/${item.slug}`}
                                className='group relative overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
                                <div className='relative h-80 w-full overflow-hidden bg-gray-100 dark:bg-slate-800'>
                                    <Image
                                        src={withBasePath(item.imageSrc)}
                                        alt={item.imageAlt}
                                        width={700}
                                        height={700}
                                        className='h-full w-full object-cover object-center transition duration-500 group-hover:scale-105'
                                    />
                                    <div className='pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/12 to-transparent' />
                                </div>
                                <div className='px-5 pb-6 pt-5'>
                                    <div className='flex flex-col items-center text-center'>
                                        <div className='inline-flex max-w-full items-center justify-center rounded-full border border-primary/15 bg-primary/8 px-4 py-2 shadow-mentorShadow dark:border-primary/20 dark:bg-primary/10'>
                                            <span className='line-clamp-1 text-sm font-medium text-gray-700 dark:text-slate-200'>
                                                {item.name}
                                            </span>
                                        </div>
                                        <p className='mt-4 text-2xl font-semibold text-black/80 dark:text-white/90'>
                                            {item.role}
                                        </p>
                                        <p className='mt-2 text-sm leading-6 text-black/60 dark:text-slate-300'>
                                            {item.shortBio}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Mentor
