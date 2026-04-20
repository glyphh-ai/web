import { NextResponse } from 'next/server';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.yosup.dev';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes require server-side auth check
  if (pathname.startsWith('/admin')) {
    const loggedIn = request.cookies.get('yo_logged_in');
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/auth/login', PLATFORM_URL));
    }
  }

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
