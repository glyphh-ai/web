import { POSTS } from './journal/posts';
import { PROJECTS } from './projects/projects';
import { SITE } from './lib/site';
import { publishedPeople } from './lib/people';

// The live pages only: what a search engine should index on glyphh.ai. The docs have their own host
// (docs.glyphh.ai) and are not listed here.
export default function sitemap() {
  const pages = [
    ['/', 1.0],
    ['/projects', 0.9],
    ['/work-with-us', 0.9],
    ['/journal', 0.8],
    ['/labs', 0.8],
    ['/about', 0.7],
    ['/submit-a-problem', 0.6],
    ['/terms', 0.2],
    ['/privacy', 0.2],
  ].map(([path, priority]) => ({ url: `${SITE}${path === '/' ? '' : path}`, changeFrequency: 'weekly', priority }));
  const projects = PROJECTS.map((p) => ({
    url: `${SITE}/projects/${p.slug}`,
    lastModified: new Date(`${p.updated}T12:00:00Z`),
    changeFrequency: 'monthly',
    priority: p.featured ? 0.8 : 0.5,
  }));
  const posts = POSTS.map((p) => ({
    url: `${SITE}/journal/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00Z`),
    changeFrequency: 'yearly',
    priority: 0.4,
  }));
  const people = publishedPeople().map((p) => ({ url: `${SITE}/about/${p.slug}`, changeFrequency: 'monthly', priority: 0.5 }));
  return [...pages, ...people, ...projects, ...posts];
}
