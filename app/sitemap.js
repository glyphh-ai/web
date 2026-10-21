// The live pages only: during the private beta (2026-10-21) the site is the home page and the legal pages; every
// other address comes home (middleware.js). At launch, list the use cases, pricing, FAQ and the blog again.
const SITE = 'https://glyphh.ai';

export default function sitemap() {
  return [
    ['/', 1.0],
    ['/terms', 0.2],
    ['/privacy', 0.2],
    ['/refund', 0.2],
  ].map(([path, priority]) => ({ url: `${SITE}${path === '/' ? '' : path}`, changeFrequency: 'weekly', priority }));
}
