'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from './ThemeProvider'
import { AuthModalProvider } from '@/app/components/Auth/AuthModalContext'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
        <AuthModalProvider>
          {children}
          <Toaster position="top-right" />
        </AuthModalProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}

export default AppProviders
