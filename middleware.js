import { NextResponse } from 'next/server';
import { observe, COOKIE_NAME, SESSION_IDLE_MS } from './app/lib/gate.js';

// Where a visitor came from (2026-10-02): the tags on the link they arrived on
// (utm_*, and the ad platform's click id) are kept for 90 days in a first-party
// cookie on .glyphh.ai, so sign-up on platform.glyphh.ai can read it: the
// platform's sign-in callback (its server/app.ts) sends it to the server's
// POST /v1/me/source, which stores it on an account made within the last day
// and the org it made (server: glyphh_server/ops/attribution.py); staff see
// sign-ups and paid conversions by source at platform.glyphh.ai/admin/marketing.
// The latest tagged link wins. HttpOnly: only the platform's and the API's
// servers ever read it.
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

// The Ada gate (2026-10-25, app/lib/gate.js): every request is kept against its
// session, and at its 5th, 20th and 60th request Ada Cloud is asked whether the
// session behaves like a person or a robot. Off without GLYPHH_API_KEY; shadow
// (log and an x-ada-gate header, enforce nothing) by default; ADA_GATE=enforce
// answers 403 to a session Ada has decided is a bot, from its next request.
export async function middleware(request, event) {
  const host = hostOf(request);
  const gate = await observe(request, (promise) => event?.waitUntil?.(promise));
  if (gate.blocked) return new NextResponse('Blocked.', { status: 403, headers: { 'x-ada-gate': 'block' } });
  const response = route(request, host);
  if (gate.setCookie) {
    response.cookies.set(COOKIE_NAME, gate.setCookie, {
      path: '/',
      maxAge: SESSION_IDLE_MS / 1000,
      sameSite: 'lax',
      httpOnly: true,
      secure: host !== 'localhost',
    });
  }
  if (gate.header) response.headers.set('x-ada-gate', gate.header);
  return response;
}

function route(request, host) {
  if (host === DOCS_HOST) return docsHost(request);
  const { pathname } = request.nextUrl;
  // The docs moved to their own host: an old glyphh.ai/docs address follows them.
  if (SITE_HOSTS.includes(host) && (pathname === '/docs' || pathname.startsWith('/docs/'))) {
    return NextResponse.redirect(new URL((pathname.slice('/docs'.length) || '/') + request.nextUrl.search, `https://${DOCS_HOST}`), 308);
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
