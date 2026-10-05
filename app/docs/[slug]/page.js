import { notFound, permanentRedirect } from 'next/navigation';
import DocArticle from '../DocArticle';
import { PAGES } from '../content';
import { DOCS } from '../base';

const LISTED = PAGES.filter((p) => p.slug !== 'introduction');

// Pages the short docs dropped: an old address lands on the page that covers it now.
const MOVED = {
  introduction: DOCS,
  // The agent page became Work and Code; the folder and model pieces got their own pages (2026-10-04).
  loops: `${DOCS}/work-and-code`, agent: `${DOCS}/work-and-code`,
  // Cloud terminals and streamed panels left the product: terminals run on your desktop, the web is the agent (2026-10-05).
  'cloud-terminals': `${DOCS}/terminals`, 'streamed-panels': `${DOCS}/web-app`,
  desktop: `${DOCS}/install`, panels: `${DOCS}/install`, sessions: `${DOCS}/install`, shortcuts: `${DOCS}/install`, artifacts: `${DOCS}/install`,
  router: `${DOCS}/gateway`, models: `${DOCS}/gateway`, 'model-catalog': `${DOCS}/gateway`, 'org-models': `${DOCS}/gateway`, rrotor: `${DOCS}/gateway`,
  connect: `${DOCS}/connections`, 'mcp-servers': `${DOCS}/mcp`,
  seats: `${DOCS}/plans`, 'billing-admin': `${DOCS}/plans`,
  sso: `${DOCS}/security`, 'org-settings': `${DOCS}/security`, domain: `${DOCS}/security`,
  review: `${DOCS}/skills`, hub: `${DOCS}/skills`, 'ai-hub': `${DOCS}/skills`, 'org-agents': `${DOCS}/skills`,
  'semantic-apps': `${DOCS}/install`, 'built-on': DOCS, brand: DOCS, console: DOCS, 'the-cast': DOCS,
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
