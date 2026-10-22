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
  // Building a model: getting started (the spec) and tuning.
  'ada-typed': to('getting-started'), 'ada-time': to('getting-started'), 'ada-tuning': to('tuning'),
  'ada-guide-incidents': to('getting-started'), 'ada-guide-tickets': to('getting-started'),
  'ada-guide-churn': to('getting-started'),
  // Connecting Claude: the plugin, which now carries the Ada skill.
  'ada-install': to('plugin'), 'ada-skill': to('plugin'),
  // Answers and calling from code: the SDKs and the API.
  'fact-trees': to('api'), 'ada-act': to('sdks'), 'ada-sdk': to('sdks'),
  'ada-tools': to('plugin'), mcp: to('plugin'), 'mcp-servers': to('plugin'),
  // Ada Cloud replaced rrotor (2026-10-22): its pages land on the nearest cloud page.
  'quick-start': to('getting-started'), quickstart: to('getting-started'), runtimes: to('getting-started'),
  rrotor: to('getting-started'), 'self-hosting': to('getting-started'), 'run-rrotor': to('getting-started'),
  compose: to('getting-started'), 'docker-compose': to('getting-started'), kubernetes: to('getting-started'),
  helm: to('getting-started'), terraform: to('getting-started'),
  clusters: DOCS, 'run-a-cluster': DOCS,
  licensing: to('plans'), seats: to('plans'), 'billing-admin': to('plans'),
  logs: to('data'),
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
