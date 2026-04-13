'use client'
import { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import Image from 'next/image'
import { CourseDetailType } from '@/app/types/coursedetail'
import withBasePath from '@/utils/basePath'
import CourseDetailSkeleton from '../../Skeleton/CourseDetail'
import Link from 'next/link'

interface Name {
    imageSrc: string
    course: string
    price: string
    profession: string
    category:
    | 'webdevelopment'
    | 'mobiledevelopment'
    | 'datascience'
    | 'cloudcomputing'
    slug?: string
}

const formatVndPrice = (price: string) =>
    `${new Intl.NumberFormat('vi-VN').format(Number(price))}\u00A0đ`

const NamesList = ({ items }: { items: CourseDetailType[] }) => {

    const [selectedButton, setSelectedButton] = useState<
        | 'mobiledevelopment'
        | 'webdevelopment'
        | 'datascience'
        | 'cloudcomputing'
        | 'all'
        | null
    >('webdevelopment')
    const mobileDevelopment = items.filter(
        (name) => name.category === 'mobiledevelopment'
    )
    const webDevelopment = items.filter(
        (name) => name.category === 'webdevelopment'
    )
    const dataScience = items.filter(
        (name) => name.category === 'datascience'
    )
    const cloudComputing = items.filter(
        (name) => name.category === 'cloudcomputing'
    )

    let selectedNames: Name[] = []
    if (selectedButton === 'mobiledevelopment') {
        selectedNames = mobileDevelopment
    } else if (selectedButton === 'webdevelopment') {
        selectedNames = webDevelopment
    } else if (selectedButton === 'datascience') {
        selectedNames = dataScience
    } else if (selectedButton === 'cloudcomputing') {
        selectedNames = cloudComputing
    }

    const nameElements = selectedNames.map((name, index) => (
        <div id='Courses' key={index} className='group flex rounded-xl border border-black/5 bg-white shadow-lg dark:border-white/10 dark:bg-slate-900 dark:shadow-black/20'>
            <div className='py-5 lg:py-0 flex flex-col'>
                <div className='overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800'>
                    <Image
                        src={withBasePath(name.imageSrc)}
                        alt={name.course}
                        width={700}
                        height={700}
                        className='h-full w-full object-cover object-center group-hover:scale-125 transition duration-300 ease-in-out'
                    />
                </div>
                <div className='p-4 flex flex-col justify-between gap-5 flex-1'>
                    <div className="flex flex-col gap-5">
                        <div className='flex items-center justify-between'>
                            <p className='block font-normal text-gray-900 dark:text-white line-clamp-2 pr-2'>{name.course}</p>
                            <div className='shrink-0 whitespace-nowrap text-lg font-semibold text-success border-solid border-2 border-success rounded-md px-2 py-0.5'>
                                <p>{formatVndPrice(name.price)}</p>
                            </div>
                        </div>
                        <Link href={name.slug ? `/courses/${name.slug}` : '/'}>
                            <p
                                aria-hidden='true'
                                className='text-xl font-semibold group-hover:cursor-pointer group-hover:text-primary dark:text-white line-clamp-2'>
                                {name.profession}
                            </p>
                        </Link>
                    </div>
                    <div className='flex justify-between rounded-md border-2 border-solid p-2 dark:border-white/10 dark:text-slate-300'>
                        <p>12 buổi học</p>
                        <div className='flex flex-row space-x-4'>
                            <div className='flex'>
                                <Image
                                    src={withBasePath('/images/courses/account.svg')}
                                    width={18}
                                    height={20}
                                    alt='circle'
                                />
                                <p className='text-lightgrey ml-1'>120</p>
                            </div>
                            <div className='flex'>
                                <Image
                                    src={withBasePath('/images/courses/Star.svg')}
                                    width={18}
                                    height={20}
                                    alt='star'
                                />
                                <p className='ml-1'>4.5</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))

    return (
        <section id='courses-section'>
            <div className='container mx-auto max-w-7xl px-4'>
                <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-5 mb-4'>
                    <h2 className='font-bold tracking-tight text-slate-950 dark:text-white'>Khóa học nổi bật</h2>
                    <Link
                        href='/courses'
                        className='bg-transparent inline-flex cursor-pointer hover:bg-primary text-primary font-medium hover:text-white py-3 px-4 border border-primary hover:border-transparent rounded-sm duration-300'>
                        Khám phá lớp học
                    </Link>
                </div>
                <div className='mb-4 flex nowhitespace space-x-5 overflow-x-auto rounded-xl bg-white p-1 dark:bg-slate-900'>
                    {/* FOR DESKTOP VIEW */}
                    <button
                        onClick={() => setSelectedButton('webdevelopment')}
                        className={
                            'bg-white dark:bg-slate-900 ' +
                            (selectedButton === 'webdevelopment'
                                ? 'text-black dark:text-white border-b-2 border-yellow-200'
                                : 'text-black/40 dark:text-white/40') +
                            ' pb-2 text-lg hidden sm:block hover:cursor-pointer'
                        }>
                        Web Development
                    </button>
                    <button
                        onClick={() => setSelectedButton('mobiledevelopment')}
                        className={
                            'bg-white dark:bg-slate-900 ' +
                            (selectedButton === 'mobiledevelopment'
                                ? 'text-black dark:text-white border-b-2 border-yellow-200'
                                : 'text-black/40 dark:text-white/40') +
                            ' pb-2 text-lg hidden sm:block hover:cursor-pointer'
                        }>
                        Mobile Development
                    </button>
                    <button
                        onClick={() => setSelectedButton('datascience')}
                        className={
                            'bg-white dark:bg-slate-900 ' +
                            (selectedButton === 'datascience'
                                ? 'text-black dark:text-white border-b-2 border-yellow-200'
                                : 'text-black/40 dark:text-white/40') +
                            ' pb-2 text-lg hidden sm:block hover:cursor-pointer'
                        }>
                        Data Science
                    </button>
                    <button
                        onClick={() => setSelectedButton('cloudcomputing')}
                        className={
                            'bg-white dark:bg-slate-900 ' +
                            (selectedButton === 'cloudcomputing'
                                ? 'text-black dark:text-white border-b-2 border-yellow-200'
                                : 'text-black/40 dark:text-white/40') +
                            ' pb-2 text-lg hidden sm:block hover:cursor-pointer'
                        }>
                        Cloud Computing
                    </button>

                    {/* FOR MOBILE VIEW */}
                    <Icon
                        icon='solar:global-line-duotone'
                        onClick={() => setSelectedButton('webdevelopment')}
                        className={
                            'text-5xl sm:hidden block ' +
                            (selectedButton === 'webdevelopment'
                                ? 'border-b-2 border-yellow-200'
                                : 'text-gray-400')
                        }
                    />

                    <Icon
                        icon='solar:smartphone-line-duotone'
                        onClick={() => setSelectedButton('mobiledevelopment')}
                        className={
                            'text-5xl sm:hidden block ' +
                            (selectedButton === 'mobiledevelopment'
                                ? 'border-b-2 border-yellow-200'
                                : 'text-gray-400')
                        }
                    />

                    <Icon
                        icon='solar:database-line-duotone'
                        onClick={() => setSelectedButton('datascience')}
                        className={
                            'text-5xl sm:hidden block ' +
                            (selectedButton === 'datascience'
                                ? 'border-b-2 border-yellow-200'
                                : 'text-gray-400')
                        }
                    />

                    <Icon
                        icon='solar:cloud-line-duotone'
                        onClick={() => setSelectedButton('cloudcomputing')}
                        className={
                            'text-5xl sm:hidden block ' +
                            (selectedButton === 'cloudcomputing'
                                ? 'border-b-2 border-yellow-200'
                                : 'text-gray-400')
                        }
                    />
                </div>
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
                        {items.length === 0 ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <CourseDetailSkeleton key={i} />
                            ))
                        ) : nameElements.length > 0 ? (
                            nameElements
                        ) : (
                            <p className='dark:text-slate-300'>Không có dữ liệu để hiển thị</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NamesList
