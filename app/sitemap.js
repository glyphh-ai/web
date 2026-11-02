import { POSTS } from './blog/posts';

// The live pages only: what a search engine should index on glyphh.ai. The
// docs have their own host (docs.glyphh.ai) and are not listed here.
const SITE = 'https://glyphh.ai';

export default function sitemap() {
  const pages = [
    ['/', 1.0],
    ['/products', 0.8],
    ['/products/rrotor', 0.9],
    ['/use-cases', 0.9],
    ['/use-cases/support-routing', 0.9],
    ['/use-cases/loan-decisions', 0.9],
    ['/pricing', 0.8],
    ['/faq', 0.7],
    ['/blog', 0.6],
    ['/contact', 0.5],
    ['/terms', 0.2],
    ['/privacy', 0.2],
    ['/refund', 0.2],
  ].map(([path, priority]) => ({ url: `${SITE}${path === '/' ? '' : path}`, changeFrequency: 'weekly', priority }));
  const posts = POSTS.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.4,
  }));
  return [...pages, ...posts];
}
