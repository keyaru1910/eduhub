import Link from 'next/link'
import Dropdownone from './Dropdownone'
import Dropdowntwo from './Dropdowntwo'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import withBasePath from '@/utils/basePath'
import { CourseType } from '@/app/types/course'
import { Hourtype } from '@/app/types/hour'

const heroReviewAvatars = [
    '/images/testimonial/user-5.jpg',
    '/images/testimonial/user-6.jpg',
    '/images/testimonial/user-7.jpg',
    '/images/testimonial/user-8.jpg',
    '/images/testimonial/user-9.jpg',
]

const fullStars = Array.from({ length: 4 })

const Banner = ({
    courseOptions,
    hourOptions,
}: {
    courseOptions: CourseType[]
    hourOptions: Hourtype[]
}) => {
    return (
        <section
            id='Home'
            className='relative overflow-hidden bg-banner-image pt-28 pb-20 dark:bg-slate-950'>
            <div className='absolute inset-0 hidden dark:block'>
                <div className='absolute inset-0 bg-slate-950/82' />
                <div className='absolute inset-x-0 top-0 h-48 bg-linear-to-b from-slate-950 via-slate-950/80 to-transparent' />
            </div>
            <div className='relative px-6 lg:px-8'>
                <div className='container relative'>
                    <div className='flex flex-col gap-4 text-center relative z-10'>
                        {/* DECORATIVE ICONS */}
                        <div className='absolute -top-12 -right-4 md:right-8 animate-bounce-slow opacity-30 md:opacity-100'>
                            <Icon icon='logos:java' className='text-4xl md:text-6xl' />
                        </div>
                        <div className='absolute top-24 -left-6 md:left-4 animate-float opacity-30 md:opacity-100'>
                            <Icon icon='logos:kotlin-icon' className='text-3xl md:text-5xl' />
                        </div>
                        <div className='absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-20'>
                            <div className='flex gap-2 scale-75 md:scale-100'>
                                <div className='w-4 h-4 bg-orange-500 rounded-sm' />
                                <div className='w-4 h-4 bg-green-500 rounded-sm' />
                            </div>
                        </div>

                        <h1 className='mx-auto max-w-4xl leading-tight font-bold tracking-tight dark:text-white'>
                            {'Nâng cao kỹ năng kỹ thuật với các khóa học của chúng tôi'}
                        </h1>
                        <p className='text-lg leading-8 text-black dark:text-slate-300'>
                            {'Xây dựng kỹ năng cùng khóa học và Mentor từ các công ty hàng đầu thế giới.'}
                        </p>
                        <div className='mx-auto w-fit rounded-2xl border border-white/30 bg-white/35 px-5 py-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-black/30'>
                            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6'>
                                <div className='hidden sm:flex -space-x-3 rounded-full bg-slate-950/18 px-2 py-1.5 ring-1 ring-white/30 dark:bg-white/5 dark:ring-white/10'>
                                    {heroReviewAvatars.map((src, index) => (
                                        <div
                                            key={src}
                                            className='relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/90 bg-white shadow-sm dark:border-slate-900'>
                                            <Image
                                                className='h-full w-full object-cover'
                                                src={withBasePath(src)}
                                                alt={`review-user-${index + 1}`}
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className='text-center sm:text-left'>
                                    <div className='flex items-center justify-center gap-2 sm:justify-start'>
                                        <h3 className='text-3xl font-semibold tracking-tight text-slate-950 dark:text-white'>4.6</h3>
                                        <div
                                            aria-label='4.6 out of 5 stars'
                                            className='flex items-center gap-0.5 text-lg leading-none'>
                                            {fullStars.map((_, index) => (
                                                <Icon
                                                    key={index}
                                                    icon='tabler:star-filled'
                                                    aria-hidden='true'
                                                    className='text-amber-400 dark:text-amber-300'
                                                />
                                            ))}
                                            <span
                                                aria-hidden='true'
                                                className='relative inline-block text-slate-300 dark:text-slate-600'>
                                                <Icon icon='tabler:star-filled' />
                                                <span
                                                    className='absolute inset-0 overflow-hidden text-amber-400 dark:text-amber-300'
                                                    style={{ width: '60%' }}>
                                                    <Icon icon='tabler:star-filled' />
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-sm font-medium text-slate-800 dark:text-slate-300'>
                                            {'Được 25k người đánh giá trên Google.'}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DROPDOWN BUTTONS */}

                    <div className='boxshadow relative mx-auto mt-12 max-w-4xl rounded-lg bg-white p-6 dark:border dark:border-white/10 dark:bg-slate-900/95 dark:shadow-black/30 lg:max-w-4xl lg:px-8'>
                        {/* MORE ICONS */}
                        <div className='absolute -bottom-6 -right-6 hidden lg:block'>
                            <Icon icon='logos:python' className='text-5xl' />
                        </div>
                        <div className='absolute -top-8 left-1/2 -translate-x-1/2 md:left-10 md:translate-x-0'>
                            <Icon icon='logos:microsoft-icon' className='text-3xl md:text-4xl opacity-50 md:opacity-100' />
                        </div>

                        <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8'>
                            <div className='col-span-3'>
                                <Dropdownone options={courseOptions} />
                            </div>
                            <div className='col-span-3'>
                                <Dropdowntwo options={hourOptions} />
                            </div>
                            <div className='col-span-3 sm:col-span-2 mt-2'>
                                <Link
                                    href='/courses'
                                    className='bg-primary inline-flex w-full items-center justify-center hover:bg-transparent hover:text-primary duration-300 border border-primary text-white font-bold py-4 px-3 rounded-sm hover:cursor-pointer'>
                                    {'Bắt đầu'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Banner
