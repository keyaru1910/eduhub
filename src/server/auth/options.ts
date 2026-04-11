import CredentialsProvider from 'next-auth/providers/credentials'
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
          role: user.role === 'ADMIN' ? 'admin' : 'student',
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.sub = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub
        session.user.role = token.role === 'admin' ? 'admin' : 'student'
      }

      return session
    },
  },
}
