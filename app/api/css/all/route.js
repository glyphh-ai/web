// Every stylesheet of the current build, for a page cached from an older one.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const DIR = path.join(process.cwd(), '.next', 'static', 'chunks');

export async function GET() {
  try {
    const names = (await readdir(DIR)).filter((n) => n.endsWith('.css')).sort();
    const parts = await Promise.all(names.map((n) => readFile(path.join(DIR, n), 'utf8')));
    return new Response(parts.join('\n'), { headers: { 'Content-Type': 'text/css; charset=utf-8' } });
  } catch {
    return new Response('', { status: 404 });
  }
}
