import { NextResponse } from 'next/server';

export function middleware(request) {
  // All routes are public — auth is handled client-side via JWT in localStorage
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.svg).*)'],
};
