import { NextResponse } from 'next/server';
import { GAMES, pageOf } from './public/games.js';

// glyphh.ai is the games site: plain pages in public/ (the front page and a folder per game) and the legal pages
// in app/. Next does not answer a folder with its index.html, so this does: `/` is public/index.html and
// `/<game>/` is public/<game>/index.html, for every game public/games.js links. Everything the site no longer has
// is answered by app/[...gone]/route.js.

// A game's address, without its closing slash: '/free-fall-frank'.
const GAME_PATHS = new Set(GAMES.filter(pageOf).map((g) => g.href.replace(/\/$/, '')));

// The docs had a host of their own, served by this app. They are gone: the host leads to the site.
const DOCS_HOST = 'docs.glyphh.ai';
const SITE = 'https://glyphh.ai/';

const hostOf = (request) =>
  (request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.hostname).split(':')[0].toLowerCase();

function secure(response) {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  return response;
}

function at(request, pathname) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return url;
}

export function proxy(request) {
  if (hostOf(request) === DOCS_HOST) return secure(NextResponse.redirect(SITE, 302));

  const { pathname, search } = request.nextUrl;
  if (pathname === '/') return secure(NextResponse.rewrite(at(request, '/index.html')));
  // A game's address without its slash goes to the one with it, on the host the visitor asked for (behind Fly,
  // nextUrl names the machine). The Location is sent as written (skipProxyUrlNormalize in next.config.mjs): Next
  // would take the slash off again.
  if (GAME_PATHS.has(pathname)) {
    const scheme = request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || request.nextUrl.protocol.replace(':', '');
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || request.nextUrl.host;
    return secure(NextResponse.redirect(`${scheme}://${host}${pathname}/${search}`, 308));
  }
  if (pathname.endsWith('/') && GAME_PATHS.has(pathname.slice(0, -1))) return secure(NextResponse.rewrite(at(request, `${pathname}index.html`)));

  return secure(NextResponse.next());
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
