import { NextResponse } from 'next/server';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.dotyo.dev';

// Hero message variants: campaign paths render the SAME home page with a
// different hero. The path selects the message; page.js canonicalizes back to
// glyphh.ai so nothing fragments. Add a path here (and a matching entry in
// app/heroes.js) to launch a new test — no other change needed.
const HERO_VARIANTS = {
  '/chat': 'chat',
  '/code': 'code',
  '/work': 'work',
  '/dream': 'dream',
};

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes require server-side auth check
  if (pathname.startsWith('/admin')) {
    const loggedIn = request.cookies.get('yo_logged_in');
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/auth/login', PLATFORM_URL));
    }
  }

  // A page cached before 2026-09-19 (a year, immutable) still asks for the
  // stylesheet of the build that made it. That file is gone after a deploy,
  // so the page painted bare. Every chunk stylesheet is answered by the css
  // route, which serves the named file when it exists and today's CSS when
  // it does not (/api/css/all).
  if (pathname.startsWith('/_next/static/chunks/') && pathname.endsWith('.css')) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/css/asset';
    url.searchParams.set('f', pathname.slice('/_next/static/chunks/'.length));
    return NextResponse.rewrite(url);
  }

  let response;
  const heroVariant = HERO_VARIANTS[pathname];
  if (heroVariant) {
    // Rewrite to the home route (URL bar keeps /code or /work) and pass the
    // chosen variant along as a request header for page.js to read.
    const url = request.nextUrl.clone();
    url.pathname = '/';
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hero-variant', heroVariant);
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  } else {
    response = NextResponse.next();
  }

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)', '/_next/static/chunks/:name*.css'],
};
