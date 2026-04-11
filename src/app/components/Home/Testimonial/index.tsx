'use client'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TestimonialType } from '@/app/types/testimonial'
import withBasePath from '@/utils/basePath'
import Link from 'next/link'

// CAROUSEL SETTINGS

const Testimonial = ({ items }: { items: TestimonialType[] }) => {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }
    return (
        <section id='testimonial-section' className='bg-cream dark:bg-slate-950'>
            <div className='container'>
                <div className='flex flex-col sm:flex-row gap-5 justify-between sm:items-center mb-6'>
                    <h2 className='font-bold tracking-tight dark:text-white'>
                        Học viên nói gì <br /> về chúng tôi
                    </h2>
                    <Link
                        href='/testimonials'
                        className='bg-transparent inline-flex cursor-pointer hover:bg-primary text-primary font-semibold hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300'>
                        Gửi đánh giá
                    </Link>
                </div>
                <p className='mb-6 text-lg font-medium dark:text-slate-300'>
                    Xây dựng kỹ năng cùng khóa học và Mentor <br /> từ các công ty
                    hàng đầu thế giới.
                </p>
                <Slider {...settings} className='testimonial-slider'>
                    {items.map((items, i) => (
                            <div key={i} className='h-full'>
                                <div className='m-4 flex h-full flex-col rounded-lg bg-white px-12 pb-10 pt-8 text-center dark:bg-slate-900 dark:text-white'>
                                    <div className={`relative z-0 flex justify-center items-center before:absolute before:bg-[url('/images/testimonial/greenpic.svg')] before:h-6 before:w-6 before:bottom-0 before:z-10 before:left-54%`}>
                                        <Image
                                            src={withBasePath(items.imgSrc)}
                                            alt='gaby'
                                            width={64}
                                            height={64}
                                            className='inline-block rounded-full ring-2 ring-white relative'
                                        />
                                    </div>
                                    <p className='pb-2 pt-4 text-sm dark:text-slate-300'>{items.profession}</p>
                                    <p className='pb-3 text-2xl font-semibold dark:text-white'>{items.name}</p>
                                    <Image
                                        src={withBasePath(items.starimg)}
                                        alt='stars-img'
                                        className='m-auto pb-6 w-[30%]'
                                        width={32}
                                        height={32}
                                    />
                                    <p className='flex-1 text-lg font-medium leading-7 dark:text-slate-200'>
                                        {items.detail}
                                    </p>
                                </div>
                            </div>
                        ))}
                </Slider>
            </div>
        </section>
    )
}

export default Testimonial
