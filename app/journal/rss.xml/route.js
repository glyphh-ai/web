import { POSTS } from '../posts';
import { SITE } from '../../lib/site';

// /journal/rss.xml: the journal as an RSS 2.0 feed, built once at build time from posts.js.
export const dynamic = 'force-static';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const items = POSTS.map((p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/journal/${p.slug}</link>
      <guid isPermaLink="true">${SITE}/journal/${p.slug}</guid>
      <pubDate>${new Date(`${p.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
    </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Glyphh Journal</title>
    <link>${SITE}/journal</link>
    <atom:link href="${SITE}/journal/rss.xml" rel="self" type="application/rss+xml" />
    <description>An engineering notebook from the Glyphh studio: experiments, decisions, observations and lessons.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'content-type': 'application/rss+xml; charset=utf-8' } });
}
