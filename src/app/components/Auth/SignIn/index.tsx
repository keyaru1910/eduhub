'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Logo from '@/app/components/Layout/Header/Logo'
import Loader from '@/app/components/Common/Loader'
import SocialSignIn from '@/app/components/Auth/SocialSignIn'
import { useAuthModal } from '@/app/components/Auth/AuthModalContext'

const Signin = () => {
    const router = useRouter()
    const { switchToSignUp, closeAllModals } = useAuthModal()

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        checkboxToggle: false,
    })
    const [loading, setLoading] = useState(false)

    const getErrorMessage = (error?: string) => {
        if (error === 'INVALID_CREDENTIALS') {
            return 'Email hoặc mật khẩu không đúng.'
        }

        if (error === 'DATABASE_NOT_CONFIGURED') {
            return 'Hệ thống chưa được cấu hình database.'
        }

        return error || 'Đăng nhập thất bại.'
    }

    const loginUser = (e: any) => {
        e.preventDefault()

        setLoading(true)
        signIn('credentials', { ...loginData, redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error(getErrorMessage(callback.error))
                    setLoading(false)
                    return
                }

                if (callback?.ok && !callback?.error) {
                    toast.success('Đăng nhập thành công')
                    setLoading(false)
                    closeAllModals()
                    router.push('/')
                }
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.message)
                toast.error(err.message)
            })
    }

    return (
        <>
            <div className='mb-8 text-center mx-auto inline-block max-w-[160px]'>
                <Logo />
            </div>

            <form onSubmit={loginUser}>
                <div className='mb-[18px]'>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                        }
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[18px]'>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                        }
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-5'>
                    <button
                        type='submit'
                        className='bg-primary w-full py-3 rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'>
                        Đăng nhập {loading && <Loader />}
                    </button>
                </div>
            </form>

            <div className='relative my-5 text-center'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-200 dark:border-white/10'></div>
                </div>
                <div className='relative flex justify-center text-xs'>
                    <span className='bg-white px-3 text-slate-500 uppercase tracking-wider dark:bg-slate-900 dark:text-slate-400'>
                        Hoặc tiếp tục với
                    </span>
                </div>
            </div>

            <div className='mb-5'>
                <SocialSignIn />
            </div>

            <Link
                href='/forgot-password'
                className='mb-2 inline-block text-sm text-primary hover:underline'>
                Quên mật khẩu?
            </Link>
            <p className='text-body-secondary text-sm text-black dark:text-slate-300'>
                Chưa có tài khoản?{' '}
                <button
                    type='button'
                    onClick={switchToSignUp}
                    className='font-semibold text-primary hover:underline hover:cursor-pointer'>
                    Đăng ký
                </button>
            </p>
        </>
    )
}

export default Signin
