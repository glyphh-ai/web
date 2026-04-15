import { NextResponse } from 'next/server';

const VALID_HASH = 'ccf4c8b4b159cb52423a146f45ac1fdf15e5dea2e5674da0f4c701ad3b743ead';

async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(req) {
  const auth = req.headers.get('authorization');

  if (auth) {
    const [, encoded] = auth.split(' ');
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(':');
    const userHash = await sha256(user);
    const passHash = await sha256(pass);

    if (userHash === VALID_HASH && passHash === VALID_HASH) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm=".Yo"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
