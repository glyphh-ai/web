// Crawl everything; the sitemap lists the live pages.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://glyphh.ai/sitemap.xml',
    host: 'https://glyphh.ai',
  };
}
