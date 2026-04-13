'use client'

import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import Signin from '@/app/components/Auth/SignIn'
import SignUp from '@/app/components/Auth/SignUp'
import ThemeToggler from './ThemeToggler'
import { Icon } from '@iconify/react/dist/iconify.js'
import { headerLinks } from '@/server/marketing-data'
import { signOut, useSession } from 'next-auth/react'

const Header: React.FC = () => {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const [sticky, setSticky] = useState(false)
    const [isSignInOpen, setIsSignInOpen] = useState(false)
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const { data: session } = useSession()

    const navbarRef = useRef<HTMLDivElement>(null)
    const signInRef = useRef<HTMLDivElement>(null)
    const signUpRef = useRef<HTMLDivElement>(null)
    const mobileMenuRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        setSticky(window.scrollY >= 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            signInRef.current &&
            !signInRef.current.contains(event.target as Node)
        ) {
            setIsSignInOpen(false)
        }
        if (
            signUpRef.current &&
            !signUpRef.current.contains(event.target as Node)
        ) {
            setIsSignUpOpen(false)
        }
        if (
            mobileMenuRef.current &&
            !mobileMenuRef.current.contains(event.target as Node) &&
            navbarOpen
        ) {
            setNavbarOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [navbarOpen, isSignInOpen, isSignUpOpen])

    useEffect(() => {
        if (isSignInOpen || isSignUpOpen || navbarOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [isSignInOpen, isSignUpOpen, navbarOpen])

    return (
        <header
            className={`fixed top-0 z-40 w-full transition-all duration-300 ${sticky ? 'bg-white py-4 shadow-lg dark:bg-slate-950' : 'py-4 shadow-none'
                }`}>
            <div>
                <div className='container mx-auto max-w-7xl px-4 flex items-center justify-between'>
                    <Logo />
                    <nav className='hidden lg:flex grow items-center gap-8 justify-start ml-14'>
                        {headerLinks.map((item, index) => (
                            <HeaderLink key={index} item={item} />
                        ))}
                    </nav>
                    <div className='flex items-center gap-4'>
                        {session?.user ? (
                            <>
                                {session.user.role === 'admin' && (
                                    <a
                                        href='/admin'
                                        className='hidden rounded-lg border border-primary bg-transparent px-6 py-2 text-primary duration-300 hover:cursor-pointer hover:bg-primary hover:text-white lg:block'>
                                        Admin
                                    </a>
                                )}
                                <a
                                    href='/dashboard'
                                    className='hidden rounded-lg border border-primary bg-primary px-6 py-2 text-white font-medium duration-300 hover:cursor-pointer hover:bg-transparent hover:text-primary lg:block'>
                                    Học tập
                                </a>
                                <button
                                    className='hidden rounded-lg border border-primary bg-transparent px-6 py-2 text-primary duration-300 hover:cursor-pointer hover:bg-primary hover:text-white lg:block'
                                    onClick={() => signOut({ callbackUrl: '/' })}>
                                    Đăng xuất
                                </button>
                            </>
                        ) : (
                            <button
                                className='hidden rounded-lg border border-primary bg-transparent px-6 py-2 text-primary duration-300 hover:cursor-pointer hover:bg-primary hover:text-white lg:block'
                                onClick={() => {
                                    setIsSignInOpen(true)
                                }}>
                                Đăng nhập
                            </button>
                        )}
                        {isSignInOpen && (
                            <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
                                <div
                                    ref={signInRef}
                                    className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 pb-8 pt-14 text-center backdrop-blur-md dark:bg-slate-900'>
                                    <button
                                        onClick={() => setIsSignInOpen(false)}
                                        className='absolute top-0 right-0 mr-8 mt-8 dark:invert'
                                        aria-label='Close Sign In Modal'>
                                        <Icon
                                            icon='material-symbols:close-rounded'
                                            width={24}
                                            height={24}
                                            className='text-black hover:text-primary inline-block hover:cursor-pointer'
                                        />
                                    </button>
                                    <Signin />
                                </div>
                            </div>
                        )}
                        {!session?.user && (
                            <button
                                className='hidden rounded-lg border border-primary bg-primary px-6 py-2 text-base font-medium text-white duration-300 hover:bg-transparent hover:text-primary hover:cursor-pointer lg:block'
                                onClick={() => {
                                    setIsSignUpOpen(true)
                                }}>
                                Đăng ký
                            </button>
                        )}
                        <div className='hidden lg:flex items-center rounded-full border border-black/10 bg-white/90 px-1.5 py-1 shadow-sm dark:border-white/15 dark:bg-slate-900/90'>
                            <ThemeToggler />
                        </div>
                        {isSignUpOpen && (
                            <div className='fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
                                <div
                                    ref={signUpRef}
                                    className='relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 pb-8 pt-14 text-center backdrop-blur-md dark:bg-slate-900'>
                                    <button
                                        onClick={() => setIsSignUpOpen(false)}
                                        className='absolute top-0 right-0 mr-8 mt-8 dark:invert'
                                        aria-label='Close Sign Up Modal'>
                                        <Icon
                                            icon='material-symbols:close-rounded'
                                            width={24}
                                            height={24}
                                            className='text-black hover:text-primary inline-block hover:cursor-pointer'
                                        />
                                    </button>
                                    <SignUp />
                                </div>
                            </div>
                        )}
                        <button
                            onClick={() => setNavbarOpen(!navbarOpen)}
                            className='block rounded-lg p-2 lg:hidden'
                            aria-label='Toggle mobile menu'>
                            <span className='block h-0.5 w-6 bg-black dark:bg-white'></span>
                            <span className='mt-1.5 block h-0.5 w-6 bg-black dark:bg-white'></span>
                            <span className='mt-1.5 block h-0.5 w-6 bg-black dark:bg-white'></span>
                        </button>
                    </div>
                </div>
                {navbarOpen && (
                    <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
                )}
                <div
                    ref={mobileMenuRef}
                    className={`fixed top-0 right-0 h-full w-full max-w-xs transform bg-white shadow-lg transition-transform duration-300 dark:bg-slate-950 lg:hidden ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
                        } z-50`}>
                    <div className='flex items-center justify-between p-4'>
                        <h2 className='text-lg font-bold text-midnight_text dark:text-white'>
                            <Logo />
                        </h2>
                        {/*  */}
                        <button
                            onClick={() => setNavbarOpen(false)}
                            className='bg-black/30 rounded-full p-1 text-white'
                            aria-label='Close menu Modal'>
                            <Icon
                                icon={'material-symbols:close-rounded'}
                                width={24}
                                height={24}
                            />
                        </button>
                    </div>
                    <nav className='flex flex-col items-start p-4'>
                        {headerLinks.map((item, index) => (
                            <MobileHeaderLink
                                key={index}
                                item={item}
                                onNavigate={() => setNavbarOpen(false)}
                            />
                        ))}
                        <div className='mt-4 flex flex-col gap-4 w-full'>
                            <div className='flex items-center justify-between rounded-lg border border-black/10 px-4 py-3 dark:border-white/10'>
                                <span className='text-sm font-medium text-black dark:text-white'>
                                    Giao diện
                                </span>
                                <ThemeToggler />
                            </div>
                            {session?.user ? (
                                <>
                                    <a
                                        href='/dashboard'
                                        className='bg-primary text-center text-white px-4 py-2 rounded-lg border border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'>
                                        Không gian học tập
                                    </a>
                                    <button
                                        className='bg-primary text-white px-4 py-2 rounded-lg border border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                                        onClick={() => signOut({ callbackUrl: '/' })}>
                                        Đăng xuất
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className='bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                                        onClick={() => {
                                            setIsSignInOpen(true)
                                            setNavbarOpen(false)
                                        }}>
                                        Đăng nhập
                                    </button>
                                    <button
                                        className='bg-primary text-white px-4 py-2 rounded-lg border  border-primary hover:text-primary hover:bg-transparent hover:cursor-pointer transition duration-300 ease-in-out'
                                        onClick={() => {
                                            setIsSignUpOpen(true)
                                            setNavbarOpen(false)
                                        }}>
                                        Đăng ký
                                    </button>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header
