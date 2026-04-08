import withBasePath from '@/utils/basePath'
import Image from 'next/image'
import Link from 'next/link'

const Newsletter = () => {
    return (
        <section id='join-section' className='-mb-64'>
            <div className='relative z-10'>
                <div className='mx-auto max-w-2xl rounded-lg bg-orange bg-newsletter bg-contain bg-no-repeat bg-right-bottom px-4 py-16 sm:px-6 md:max-w-7xl md:py-24 lg:px-24 dark:bg-slate-900'>
                    <div className='grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 xl:gap-x-8'>
                        <div>
                            <h3 className='mb-3 text-5xl font-bold dark:text-white'> Đăng ký nhận Newsletter </h3>
                            <h4 className='mb-7 text-lg font-medium dark:text-slate-300'>
                                Nhận ưu đãi, promo và nhiều cập nhật mới nhất từ chúng tôi.
                            </h4>
                            <div className='flex gap-2'>
                                <input
                                    type='email'
                                    name='q'
                                    className='w-full rounded-lg bg-white px-4 py-4 pl-4 text-base transition-all duration-500 focus:border-primary focus:outline-1 dark:border dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400'
                                    placeholder='Nhập email của bạn'
                                    autoComplete='off'
                                />
                                <Link
                                    href='/register'
                                    className='bg-primary inline-flex items-center cursor-pointer hover:bg-transparent border border-primary hover:text-primary text-white font-medium py-2 px-4 rounded-sm'>
                                    Đăng ký
                                </Link>
                            </div>
                        </div>
                        <div className='hidden sm:block'>
                            <div className='float-right -mt-32'>
                                <Image
                                    src={withBasePath('/images/newsletter/Free.svg')}
                                    alt='bgimg'
                                    width={64}
                                    height={64}
                                    className='w-auto'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
