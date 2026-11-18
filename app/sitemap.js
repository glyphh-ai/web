import { GAMES } from '../public/games.js';

// What a search engine should index on glyphh.ai: the front page, each live game's page, the legal pages.
const SITE = 'https://glyphh.ai';

export default function sitemap() {
  return [
    ['/', 1.0],
    ...GAMES.filter((g) => g.href).map((g) => [g.href, 0.9]),
    ['/terms', 0.2],
    ['/privacy', 0.2],
    ['/refund', 0.2],
  ].map(([path, priority]) => ({ url: `${SITE}${path}`, changeFrequency: 'weekly', priority }));
}
