'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import Logo from '@/app/components/Layout/Header/Logo'
import Loader from '@/app/components/Common/Loader'

const Signin = () => {
    const router = useRouter()

    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        checkboxToggle: false,
    })
    const [loading, setLoading] = useState(false)

    const getErrorMessage = (error?: string) => {
        if (error === 'INVALID_CREDENTIALS') {
            return 'Email hoac mat khau khong dung.'
        }

        if (error === 'DATABASE_NOT_CONFIGURED') {
            return 'He thong chua duoc cau hinh database.'
        }

        return error || 'Dang nhap that bai.'
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
                    toast.success('Dang nhap thanh cong')
                    setLoading(false)
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
            <div className='mb-10 text-center mx-auto inline-block max-w-[160px]'>
                <Logo />
            </div>

            <form onSubmit={loginUser}>
                <div className='mb-[22px]'>
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) =>
                            setLoginData({ ...loginData, email: e.target.value })
                        }
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[22px]'>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        onChange={(e) =>
                            setLoginData({ ...loginData, password: e.target.value })
                        }
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-9'>
                    <button
                        type='submit'
                        className='bg-primary w-full py-3 rounded-lg text-18 font-medium border text-white border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'>
                        Đăng nhập {loading && <Loader />}
                    </button>
                </div>
            </form>

            <Link
                href='/forgot-password'
                className='mb-2 inline-block text-base text-primary hover:underline'>
                Quên mật khẩu?
            </Link>
            <p className='text-body-secondary text-base text-black dark:text-slate-200'>
                Chưa có tài khoản?{' '}
                <Link href='/signup' className='text-primary hover:underline'>
                    Đăng ký
                </Link>
            </p>
        </>
    )
}

export default Signin
