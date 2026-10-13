import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions } from 'next-auth'
import { ensureCoreServerEnv } from '../env'
import { AppError } from '../errors'
import { authService } from '../services/auth'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        ensureCoreServerEnv()

        const email = credentials?.email?.trim().toLowerCase()
        const password = credentials?.password?.trim()

        if (!email || !password) {
          throw new Error('INVALID_CREDENTIALS')
        }

        let user

        try {
          user = await authService.authorizeCredentials(email, password)
        } catch (error) {
          if (error instanceof AppError) {
            throw new Error(error.code)
          }

          throw error
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatarUrl,
          role: user.role === 'ADMIN' ? 'admin' : 'student',
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const email = user.email?.trim().toLowerCase()
          if (!email) {
            return false
          }

          const dbUser = await authService.xuLyDangNhapGoogle({
            name: user.name?.trim() || email.split('@')[0],
            email,
            avatarUrl: user.image || undefined,
          })

          user.id = dbUser.id
          user.role = dbUser.role === 'ADMIN' ? 'admin' : 'student'
          return true
        } catch (error) {
          console.error('Lỗi khi đăng nhập bằng Google:', error)
          return false
        }
      }
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.sub = user.id
        if (user.image) {
          token.picture = user.image
        }
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role === 'admin' ? 'admin' : 'student'
        if (token.picture) {
          session.user.image = token.picture
        }
      }

      return session
    },
  },
}
