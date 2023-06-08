import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { NAVIGATION_LINK } from 'utils/link'

const AUTH_PAGES = [NAVIGATION_LINK.Login, NAVIGATION_LINK.Signup]

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url))

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request
  const { value: token } = cookies.get('token') ?? { value: null }

  // redirect to dashboard admin page when hit only host/admin
  if (nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', url))
  }

  // check auth pages
  if (
    nextUrl.pathname === NAVIGATION_LINK.Login ||
    nextUrl.pathname === NAVIGATION_LINK.Signup
  ) {
    // const hasVerifiedToken = token && (await verifyJwtToken(token))
    const hasVerifiedToken = token

    const isAuthPageRequested = isAuthPages(nextUrl.pathname)

    if (isAuthPageRequested) {
      if (!hasVerifiedToken) {
        const response = NextResponse.next()
        response.cookies.delete('token')
        return response
      }

      const response = NextResponse.redirect(new URL(`/`, url))
      return response
    }

    // if (!hasVerifiedToken) {
    //   const searchParams = new URLSearchParams(nextUrl.searchParams)
    //   searchParams.set('next', nextUrl.pathname)

    //   const response = NextResponse.redirect(
    //     new URL(`/auth/login?${searchParams}`, url)
    //   )
    //   response.cookies.delete('token')

    //   return response
    // }
  }

  return NextResponse.next()
}
