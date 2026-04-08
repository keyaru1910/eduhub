'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import SocialSignUp from '../SocialSignUp'
import Logo from '@/app/components/Layout/Header/Logo'
import { useState } from 'react'
import Loader from '@/app/components/Common/Loader'
const SignUp = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        setLoading(true)
        const data = new FormData(e.currentTarget)
        const value = Object.fromEntries(data.entries())
        const finalData = { ...value }

        // Simulate registration (static site)
        new Promise((resolve) => setTimeout(resolve, 200))
            .then(() => {
                toast.success('Successfully registered')
                setLoading(false)
                router.push('/signin')
            })
            .catch((err) => {
                toast.error(err?.message || 'Registration failed')
                setLoading(false)
            })
    }

    return (
        <>
            <div className='mb-10 text-center mx-auto inline-block max-w-[160px]'>
                <Logo />
            </div>

            <SocialSignUp />

            <span className="z-1 relative my-8 block text-center before:content-[''] before:absolute before:h-px before:w-[40%] before:bg-black/20 before:left-0 before:top-3 after:content-[''] after:absolute after:h-px after:w-[40%] after:bg-black/20 after:top-3 after:right-0 dark:before:bg-white/15 dark:after:bg-white/15">
                <span className='text-body-secondary relative z-10 inline-block px-3 text-base text-black dark:text-slate-200'>
                    HOẶC
                </span>
            </span>

            <form onSubmit={handleSubmit}>
                <div className='mb-[22px]'>
                    <input
                        type='text'
                        placeholder='Họ và tên'
                        name='name'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[22px]'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[22px]'>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        name='password'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-9'>
                    <button
                        type='submit'
                        className='flex w-full items-center text-18 font-medium justify-center rounded-md  text-white bg-primary px-5 py-3 text-darkmode transition duration-300 ease-in-out hover:bg-transparent hover:text-primary border-primary border hover:cursor-pointer'>
                        Đăng ký {loading && <Loader />}
                    </button>
                </div>
            </form>

            <p className='text-body-secondary mb-4 text-base text-black dark:text-slate-200'>
                Bằng việc tạo tài khoản, bạn đồng ý với{' '}
                <Link href='/#' className='text-primary hover:underline'>
                    Chính sách riêng tư
                </Link>{' '}
                và{' '}
                <Link href='/#' className='text-primary hover:underline'>
                    Điều khoản
                </Link>
            </p>

            <p className='text-body-secondary text-base text-black dark:text-slate-200'>
                Đã có tài khoản?
                <Link href='/' className='pl-2 text-primary hover:underline'>
                    Đăng nhập
                </Link>
            </p>
        </>
    )
}

export default SignUp
