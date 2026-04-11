'use client'

import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from './ThemeProvider'

type AppProvidersProps = {
  children: React.ReactNode
}

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SessionProvider>
        {children}
        <Toaster position="top-right" />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default AppProviders
