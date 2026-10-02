import { notFound, permanentRedirect } from 'next/navigation';
import DocArticle from '../DocArticle';
import { PAGES } from '../content';

const LISTED = PAGES.filter((p) => p.slug !== 'introduction');

// Pages the short docs dropped: an old address lands on the page that covers it now.
const MOVED = {
  introduction: '/docs',
  desktop: '/docs/install', panels: '/docs/install', sessions: '/docs/install', shortcuts: '/docs/install', artifacts: '/docs/install',
  router: '/docs/gateway', models: '/docs/gateway', 'model-catalog': '/docs/gateway', 'org-models': '/docs/gateway', rrotor: '/docs/gateway',
  connect: '/docs/connections', 'mcp-servers': '/docs/mcp',
  seats: '/docs/plans', 'billing-admin': '/docs/plans',
  sso: '/docs/security', 'org-settings': '/docs/security', domain: '/docs/security',
  review: '/docs/skills', hub: '/docs/skills', 'ai-hub': '/docs/skills', 'org-agents': '/docs/skills',
  'semantic-apps': '/docs/ada', 'built-on': '/docs', brand: '/docs', console: '/docs', 'the-cast': '/docs',
};

export function generateStaticParams() {
  return LISTED.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = LISTED.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.lede } : {};
}

export default async function DocPage({ params }) {
  const { slug } = await params;
  if (MOVED[slug]) permanentRedirect(MOVED[slug]);
  if (!LISTED.some((x) => x.slug === slug)) notFound();
  return <DocArticle slug={slug} />;
}
