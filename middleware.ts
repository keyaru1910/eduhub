import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  (request) => {
    const token = request.nextauth.token

    if (!token) {
      return NextResponse.redirect(new URL('/signin', request.url))
    }

    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true,
    },
  },
)

export const config = {
  matcher: ['/admin/:path*'],
}
