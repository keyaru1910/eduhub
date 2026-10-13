'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/Layout/Header/Logo'
import { useActionState } from 'react'
import Loader from '@/app/components/Common/Loader'
import { signupAction } from '@/server/actions'
import { initialActionState } from '@/server/action-state'
import SocialSignUp from '@/app/components/Auth/SocialSignUp'
import { useAuthModal } from '@/app/components/Auth/AuthModalContext'

const SignUp = () => {
    const router = useRouter()
    const { switchToSignIn } = useAuthModal()
    const [state, formAction, pending] = useActionState(signupAction, initialActionState)

    return (
        <>
            <div className='mb-8 text-center mx-auto inline-block max-w-[160px]'>
                <Logo />
            </div>

            <form action={formAction}>
                <div className='mb-[18px]'>
                    <input
                        type='text'
                        placeholder='Họ và tên'
                        name='name'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[18px]'>
                    <input
                        type='email'
                        placeholder='Email'
                        name='email'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-[18px]'>
                    <input
                        type='password'
                        placeholder='Mật khẩu'
                        name='password'
                        required
                        className='w-full rounded-md border border-solid border-gray-200 bg-transparent px-5 py-3 text-base text-black outline-hidden transition placeholder:text-black/30 focus:border-primary focus-visible:shadow-none dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-400'
                    />
                </div>
                <div className='mb-5'>
                    <button
                        type='submit'
                        className='flex w-full items-center text-18 font-medium justify-center rounded-md text-white bg-primary px-5 py-3 text-darkmode transition duration-300 ease-in-out hover:bg-transparent hover:text-primary border-primary border hover:cursor-pointer'>
                        Đăng ký {pending && <Loader />}
                    </button>
                </div>
            </form>
            {state.message && (
                <div
                    className={`mb-4 rounded-lg p-3 text-sm ${
                        state.success
                            ? 'border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-300'
                            : 'border border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300'
                    }`}>
                    <p>{state.message}</p>
                    {state.success && (
                        <button
                            type='button'
                            onClick={switchToSignIn}
                            className='mt-2.5 inline-flex items-center gap-1 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-primary/90 hover:cursor-pointer'>
                            <span>Đăng nhập ngay</span>
                        </button>
                    )}
                </div>
            )}

            <div className='relative my-5 text-center'>
                <div className='absolute inset-0 flex items-center'>
                    <div className='w-full border-t border-gray-200 dark:border-white/10'></div>
                </div>
                <div className='relative flex justify-center text-xs'>
                    <span className='bg-white px-3 text-slate-500 uppercase tracking-wider dark:bg-slate-900 dark:text-slate-400'>
                        Hoặc đăng ký nhanh với
                    </span>
                </div>
            </div>

            <div className='mb-5'>
                <SocialSignUp />
            </div>

            <p className='text-body-secondary mb-3 text-sm text-black dark:text-slate-300'>
                Bằng việc tạo tài khoản, bạn đồng ý với{' '}
                <Link href='/#' className='text-primary hover:underline'>
                    Chính sách riêng tư
                </Link>{' '}
                và{' '}
                <Link href='/#' className='text-primary hover:underline'>
                    Điều khoản
                </Link>
            </p>

            <p className='text-body-secondary text-sm text-black dark:text-slate-300'>
                Đã có tài khoản?
                <button
                    type='button'
                    onClick={switchToSignIn}
                    className='pl-2 font-semibold text-primary hover:underline hover:cursor-pointer'>
                    Đăng nhập
                </button>
            </p>
        </>
    )
}

export default SignUp
