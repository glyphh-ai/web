import { NextResponse } from 'next/server';

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://platform.glyphh.ai';

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

// The docs are their own host (his order: docs.glyphh.ai). This app serves
// them from app/docs, so on that host /ada is the page at /docs/ada, and an
// old /docs/ada address there loses its prefix.
const DOCS_HOST = 'docs.glyphh.ai';
const hostOf = (request) =>
  (request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.hostname).split(':')[0].toLowerCase();
const isFile = (pathname) => pathname.startsWith('/_next') || pathname.startsWith('/api/') || /\.[a-z0-9]+$/i.test(pathname);

function docsHost(request) {
  const { pathname } = request.nextUrl;
  if (isFile(pathname)) return NextResponse.next();
  if (pathname === '/docs' || pathname.startsWith('/docs/')) {
    return NextResponse.redirect(new URL((pathname.slice('/docs'.length) || '/') + request.nextUrl.search, `https://${DOCS_HOST}`), 308);
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? '/docs' : `/docs${pathname}`;
  return NextResponse.rewrite(url);
}

const SITE_HOSTS = ['glyphh.ai', 'www.glyphh.ai'];

export function middleware(request) {
  const host = hostOf(request);
  if (host === DOCS_HOST) return docsHost(request);
  const { pathname } = request.nextUrl;
  // The docs moved to their own host: an old glyphh.ai/docs address follows them.
  if (SITE_HOSTS.includes(host) && (pathname === '/docs' || pathname.startsWith('/docs/'))) {
    return NextResponse.redirect(new URL((pathname.slice('/docs'.length) || '/') + request.nextUrl.search, `https://${DOCS_HOST}`), 308);
  }

  // Admin routes require server-side auth check
  if (pathname.startsWith('/admin')) {
    const loggedIn = request.cookies.get('yo_logged_in');
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/auth/login', PLATFORM_URL));
    }
  }

  const response = NextResponse.next();

  const source = sourceOf(request.nextUrl);
  if (source) {
    // Behind the proxy, nextUrl names the machine, not the site: the Host the
    // visitor asked for is in the forwarded header.
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
