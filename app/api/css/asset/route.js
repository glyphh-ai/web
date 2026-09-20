// A chunk stylesheet by name. Middleware sends every /_next/static/chunks/*.css
// request here: an existing file is served as the immutable asset it is; a
// name from an older build (a page a browser cached before pages stopped
// caching) is sent to /api/css/all, so the cached page paints in today's
// styles rather than none.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const DIR = path.join(process.cwd(), '.next', 'static', 'chunks');

export async function GET(request) {
  const name = new URL(request.url).searchParams.get('f') || '';
  if (!name.endsWith('.css') || path.basename(name) !== name) return new Response('', { status: 404 });
  try {
    const body = await readFile(path.join(DIR, name));
    return new Response(body, { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
  } catch {
    return Response.redirect(new URL('/api/css/all', request.url), 307);
  }
}
