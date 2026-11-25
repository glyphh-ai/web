import { NextResponse } from 'next/server';

// The docs are their own host (docs.glyphh.ai). This app serves them from
// app/docs, so on that host /ada is the page at /docs/ada, and an old
// /docs/ada address there loses its prefix. Since 2026-11-25 they are the
// Labs documentation of the decision engine, kept as written.
const DOCS_HOST = 'docs.glyphh.ai';
const SITE_HOSTS = ['glyphh.ai', 'www.glyphh.ai'];
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

// The pages a press release may show in a frame, and the sites it is shown on: EIN Presswire's own pages and the
// news sites it syndicates to through them. Every other page stays DENY.
const FRAMED_BY_PRESS = new Set(['/journal/introducing-ada']);
const PRESS_FRAMERS = 'https://www.einpresswire.com https://*.einpresswire.com';

export function proxy(request) {
  const host = hostOf(request);
  if (host === DOCS_HOST) return docsHost(request);
  const { pathname } = request.nextUrl;
  // The docs moved to their own host: an old glyphh.ai/docs address follows them.
  if (SITE_HOSTS.includes(host) && (pathname === '/docs' || pathname.startsWith('/docs/'))) {
    return NextResponse.redirect(new URL((pathname.slice('/docs'.length) || '/') + request.nextUrl.search, `https://${DOCS_HOST}`), 308);
  }

  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  if (FRAMED_BY_PRESS.has(pathname)) {
    response.headers.set('Content-Security-Policy', `frame-ancestors 'self' ${PRESS_FRAMERS}`);
  } else {
    response.headers.set('X-Frame-Options', 'DENY');
  }
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
