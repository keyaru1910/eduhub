'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import { Icon } from '@iconify/react'
import Signin from '@/app/components/Auth/SignIn'
import SignUp from '@/app/components/Auth/SignUp'

/**
 * Kiểu dữ liệu ngữ cảnh điều khiển khung (modal) xác thực người dùng
 */
interface AuthModalContextType {
  isSignInOpen: boolean
  isSignUpOpen: boolean
  openSignInModal: () => void
  openSignUpModal: () => void
  closeSignInModal: () => void
  closeSignUpModal: () => void
  switchToSignIn: () => void
  switchToSignUp: () => void
  closeAllModals: () => void
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined)

/**
 * Hook truy xuất trạng thái và các hành động mở/đóng modal xác thực
 */
export const useAuthModal = () => {
  const context = useContext(AuthModalContext)
  if (!context) {
    throw new Error('useAuthModal phải được sử dụng bên trong AuthModalProvider')
  }
  return context
}

/**
 * Provider quản lý modal đăng nhập và đăng ký dùng chung cho toàn bộ ứng dụng
 */
export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)

  const signInDialogRef = useRef<HTMLDivElement>(null)
  const signUpDialogRef = useRef<HTMLDivElement>(null)

  const openSignInModal = useCallback(() => {
    setIsSignUpOpen(false)
    setIsSignInOpen(true)
  }, [])

  const openSignUpModal = useCallback(() => {
    setIsSignInOpen(false)
    setIsSignUpOpen(true)
  }, [])

  const closeSignInModal = useCallback(() => {
    setIsSignInOpen(false)
  }, [])

  const closeSignUpModal = useCallback(() => {
    setIsSignUpOpen(false)
  }, [])

  const switchToSignIn = useCallback(() => {
    setIsSignUpOpen(false)
    setIsSignInOpen(true)
  }, [])

  const switchToSignUp = useCallback(() => {
    setIsSignInOpen(false)
    setIsSignUpOpen(true)
  }, [])

  const closeAllModals = useCallback(() => {
    setIsSignInOpen(false)
    setIsSignUpOpen(false)
  }, [])

  // Tự động mở khung đăng ký/đăng nhập nếu URL có query param (?auth=signup hoặc ?auth=signin)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const authType = params.get('auth')

    if (authType === 'signup') {
      setIsSignUpOpen(true)
      setIsSignInOpen(false)
      const cleanUrl = new URL(window.location.href)
      cleanUrl.searchParams.delete('auth')
      window.history.replaceState(
        {},
        '',
        cleanUrl.pathname + (cleanUrl.search ? cleanUrl.search : '') + cleanUrl.hash
      )
    } else if (authType === 'signin') {
      setIsSignInOpen(true)
      setIsSignUpOpen(false)
      const cleanUrl = new URL(window.location.href)
      cleanUrl.searchParams.delete('auth')
      window.history.replaceState(
        {},
        '',
        cleanUrl.pathname + (cleanUrl.search ? cleanUrl.search : '') + cleanUrl.hash
      )
    }
  }, [])

  // Khóa cuộn trang khi đang hiển thị popup modal
  useEffect(() => {
    if (isSignInOpen || isSignUpOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isSignInOpen, isSignUpOpen])

  // Lắng nghe phím ESC để đóng modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllModals()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeAllModals])

  return (
    <AuthModalContext.Provider
      value={{
        isSignInOpen,
        isSignUpOpen,
        openSignInModal,
        openSignUpModal,
        closeSignInModal,
        closeSignUpModal,
        switchToSignIn,
        switchToSignUp,
        closeAllModals,
      }}>
      {children}

      {/* Khung (Modal) Đăng nhập */}
      {isSignInOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs'
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSignInModal()
          }}
          role='dialog'
          aria-modal='true'
          aria-label='Khung đăng nhập'>
          <div
            ref={signInDialogRef}
            className='relative mx-auto max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 pt-12 text-center shadow-2xl sm:p-8 sm:pt-14 dark:bg-slate-900 border border-black/10 dark:border-white/10'>
            <button
              onClick={closeSignInModal}
              className='absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-black dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white hover:cursor-pointer transition duration-200'
              aria-label='Đóng khung đăng nhập'>
              <Icon icon='material-symbols:close-rounded' className='text-2xl' />
            </button>
            <Signin />
          </div>
        </div>
      )}

      {/* Khung (Modal) Đăng ký */}
      {isSignUpOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs'
          onClick={(e) => {
            if (e.target === e.currentTarget) closeSignUpModal()
          }}
          role='dialog'
          aria-modal='true'
          aria-label='Khung đăng ký'>
          <div
            ref={signUpDialogRef}
            className='relative mx-auto max-h-[92vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 pt-12 text-center shadow-2xl sm:p-8 sm:pt-14 dark:bg-slate-900 border border-black/10 dark:border-white/10'>
            <button
              onClick={closeSignUpModal}
              className='absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-black dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white hover:cursor-pointer transition duration-200'
              aria-label='Đóng khung đăng ký'>
              <Icon icon='material-symbols:close-rounded' className='text-2xl' />
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </AuthModalContext.Provider>
  )
}
