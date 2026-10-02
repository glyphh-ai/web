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

// Where a visitor came from (2026-10-02): the tags on the link they arrived on
// (utm_*, and the ad platform's click id) are kept for 90 days in a first-party
// cookie on .glyphh.ai, so sign-up on platform.glyphh.ai can read it and the
// server can store it on the new account (glyphh_auth/attribution.py). The
// latest tagged link wins. HttpOnly: only the server ever reads it.
const SOURCE_COOKIE = 'glyphh_src';
const SOURCE_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'rdt_cid', 'gclid'];
const SOURCE_DAYS = 90;

function sourceOf(url) {
  const found = {};
  for (const key of SOURCE_KEYS) {
    const value = (url.searchParams.get(key) || '').trim().slice(0, 200);
    if (value) found[key] = value;
  }
  if (Object.keys(found).length === 0) return null;
  return { ...found, landing: url.pathname.slice(0, 200) };
}

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Admin routes require server-side auth check
  if (pathname.startsWith('/admin')) {
    const loggedIn = request.cookies.get('yo_logged_in');
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/auth/login', PLATFORM_URL));
    }
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

  const source = sourceOf(request.nextUrl);
  if (source) {
    const host = request.nextUrl.hostname;
    response.cookies.set(SOURCE_COOKIE, JSON.stringify(source), {
      path: '/',
      maxAge: SOURCE_DAYS * 24 * 60 * 60,
      sameSite: 'lax',
      httpOnly: true,
      secure: host !== 'localhost',
      ...(host === 'glyphh.ai' || host.endsWith('.glyphh.ai') ? { domain: '.glyphh.ai' } : {}),
    });
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
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
