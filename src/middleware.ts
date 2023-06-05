import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const AUTH_PAGES = ['/login', '/register']

const isAuthPages = (url: string) =>
  AUTH_PAGES.some((page) => page.startsWith(url))

export function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request
  const { value: token } = cookies.get('token') ?? { value: null }

  // redirect to dashboard admin page when hit only host/admin
  if (nextUrl.pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', url))
  }

  // console.log(request.nextUrl)

  return NextResponse.next()
}
