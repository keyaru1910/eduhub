'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/app/components/Layout/Header/Logo'
import { useActionState, useEffect } from 'react'
import Loader from '@/app/components/Common/Loader'
import { signupAction } from '@/server/actions'
import { initialActionState } from '@/server/action-state'
const SignUp = () => {
    const router = useRouter()
    const [state, formAction, pending] = useActionState(signupAction, initialActionState)

    useEffect(() => {
        if (state.success) {
            router.push('/signin')
        }
    }, [router, state.success])

    return (
        <>
            <div className='mb-10 text-center mx-auto inline-block max-w-[160px]'>
                <Logo />
            </div>

            <form action={formAction}>
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
                        Đăng ký {pending && <Loader />}
                    </button>
                </div>
            </form>
            {state.message && (
                <p className={`mb-4 text-sm ${state.success ? 'text-green-600' : 'text-red-500'}`}>
                    {state.message}
                </p>
            )}

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
                <Link href='/signin' className='pl-2 text-primary hover:underline'>
                    Đăng nhập
                </Link>
            </p>
        </>
    )
}

export default SignUp
