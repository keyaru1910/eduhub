'use client'

import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MentorType } from '@/app/types/mentor'
import withBasePath from '@/utils/basePath'

const Mentor = ({ items }: { items: MentorType[] }) => {
    const settings = {
        dots: false,
        infinite: items.length > 3,
        slidesToShow: Math.min(items.length, 3),
        slidesToScroll: 1,
        arrows: false,
        autoplay: items.length > 1,
        speed: 5000,
        autoplaySpeed: 0,
        cssEase: 'linear' as const,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: Math.min(items.length, 2),
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <section id='mentors-section'>
            <div className='container'>
                <div className='mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-center'>
                    <h2 className='font-bold tracking-tight text-slate-950 dark:text-white'>Gặp gỡ Mentor của chúng tôi</h2>
                    <Link
                        href='/mentors'
                        className='inline-flex cursor-pointer rounded-sm border border-primary bg-transparent px-4 py-3 font-medium text-primary duration-300 hover:border-transparent hover:bg-primary hover:text-white'>
                        Khám phá những Mentor
                    </Link>
                </div>

                <div className='-mx-3'>
                    <Slider {...settings}>
                        {items.map((item) => (
                            <div key={item.slug} className='px-3 pb-2'>
                                <Link
                                    href={`/mentors/${item.slug}`}
                                    className='group relative block overflow-hidden rounded-xl border border-black/5 bg-white shadow-lg shadow-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
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
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Mentor
