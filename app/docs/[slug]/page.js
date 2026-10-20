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
const to = (slug) => `${DOCS}/${slug}`;
const MOVED = {
  ...Object.fromEntries(GONE.map((slug) => [slug, DOCS])),
  introduction: DOCS,
  // What Ada is, concepts, security: the architecture.
  primer: DOCS, 'semantic-apps': DOCS, 'ada-introduction': DOCS, glyph: DOCS, patterns: DOCS, ada: DOCS,
  'ada-edges': DOCS, 'ada-graph': DOCS, 'ada-gql': DOCS, 'ada-procedures': DOCS,
  security: DOCS, sso: DOCS, 'org-settings': DOCS, domain: DOCS,
  // Building a model: the Ada skill.
  'ada-typed': to('ada-skill'), 'ada-time': to('ada-skill'), 'ada-tuning': to('ada-skill'),
  'ada-guide-incidents': to('ada-skill'), 'ada-guide-tickets': to('ada-skill'), 'ada-guide-churn': to('ada-skill'),
  // Connecting Claude: the plugin.
  'ada-install': to('plugin'),
  // Answers and calling from code: the SDKs and the API.
  'fact-trees': to('sdks'), 'ada-act': to('sdks'), 'ada-sdk': to('sdks'),
  'ada-tools': to('api'), mcp: to('api'), 'mcp-servers': to('api'),
  // Getting a runtime: running rrotor.
  'quick-start': to('run-rrotor'), quickstart: to('run-rrotor'), runtimes: to('run-rrotor'), rrotor: to('run-rrotor'),
  'self-hosting': to('run-rrotor'), compose: to('docker-compose'), kubernetes: to('helm'),
  // Plans: licensing, which links to the prices.
  plans: to('licensing'), seats: to('licensing'), 'billing-admin': to('licensing'),
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
