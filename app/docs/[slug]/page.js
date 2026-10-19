import { notFound, permanentRedirect } from 'next/navigation';
import DocArticle from '../DocArticle';
import { PAGES } from '../content';
import { DOCS } from '../base';

const LISTED = PAGES.filter((p) => p.slug !== 'introduction');

// Old addresses: each lands on the page that covers it, or on the docs home
// when what it described is not part of Glyphh.
const GONE = [
  'install', 'web-app', 'where-a-session-works', 'pick-a-model', 'work-and-code', 'terminals', 'devices',
  'library-sync', 'apps', 'cli', 'skills', 'tasks', 'connections', 'connect', 'loops', 'agent', 'cloud-terminals',
  'streamed-panels', 'desktop', 'panels', 'sessions', 'shortcuts', 'artifacts', 'gateway', 'own-cli', 'budgets',
  'router', 'models', 'model-catalog', 'org-models', 'review', 'hub', 'ai-hub', 'org-agents', 'built-on', 'brand',
  'console', 'the-cast',
];
const MOVED = {
  ...Object.fromEntries(GONE.map((slug) => [slug, DOCS])),
  introduction: DOCS,
  quickstart: `${DOCS}/quick-start`,
  primer: `${DOCS}/ada-introduction`,
  'semantic-apps': `${DOCS}/ada-introduction`,
  'ada-act': `${DOCS}/fact-trees`,
  'ada-time': `${DOCS}/ada-typed`,
  'ada-edges': `${DOCS}/ada`, 'ada-graph': `${DOCS}/ada`, 'ada-gql': `${DOCS}/ada`, 'ada-procedures': `${DOCS}/ada`,
  'ada-guide-tickets': `${DOCS}/ada-guide-incidents`, 'ada-guide-churn': `${DOCS}/ada-guide-incidents`,
  mcp: `${DOCS}/ada-tools`, 'mcp-servers': `${DOCS}/ada-tools`,
  rrotor: `${DOCS}/runtimes`,
  seats: `${DOCS}/plans`, 'billing-admin': `${DOCS}/plans`,
  sso: `${DOCS}/security`, 'org-settings': `${DOCS}/security`, domain: `${DOCS}/security`,
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
