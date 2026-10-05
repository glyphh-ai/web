import Art from './Art';

/**
 * HowItWorks — the section above Quick Start (site refactor 2026-09-22):
 * what Glyphh is, in six tiles — Desktop, Router, Connect, Semantic Apps,
 * Tasks, Rrotor (his copy, 2026-09-22). A kicker row, then a 3 × 2 grid;
 * each tile is an icon, a mono title, a one-line headline, a paragraph, and
 * a link to that thing's docs page. Same frame and look as Quick Start.
 * The minimal cut (2026-10-05): the deck's picture of each thing heads its
 * tile; the letter field and the stroke icons came off.
 */

const TILES = [
  {
    href: 'https://docs.glyphh.ai/install',
    title: 'Desktop',
    art: 'desktop',
    head: 'A universal desktop harness',
    body:
      'Windows, Mac, Linux, and CLI — runs on your machine. Frontier models where they count, open weights through the router for the rest.',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8" /><path d="M12 17v4" />
      </>
    ),
  },
  {
    href: 'https://docs.glyphh.ai/gateway',
    title: 'Router',
    art: 'router',
    head: 'Every model we run, governed by you',
    body:
      'Based on LiteLLM — extend your frontier harness with cross-vendor models or open weights. Teams, budgets, governance, and semantic routing maximize your AI spend.',
    icon: (
      <>
        <path d="M4 21v-7" /><path d="M4 10V3" /><path d="M12 21v-9" /><path d="M12 8V3" />
        <path d="M20 21v-5" /><path d="M20 12V3" /><path d="M2 14h4" /><path d="M10 8h4" /><path d="M18 16h4" />
      </>
    ),
  },
  {
    href: 'https://docs.glyphh.ai/connections',
    title: 'Connect',
    art: 'connect',
    head: '3,500+ MCP tools give you reach',
    body:
      'Pipedream Connect powers our connector framework, extended to your organization via the router. Govern who can connect to what, and what tools they can use.',
    icon: (
      <>
        <path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" />
        <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
      </>
    ),
  },
  {
    href: 'https://docs.glyphh.ai/skills',
    title: 'Semantic Apps',
    art: 'semantic',
    head: 'Stop using inference, use data',
    body:
      'The desktop ships with a database, vector DB, and semantic knowledge graph harness. Your build agents create deterministic apps your teams review, approve, and distribute.',
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" /><path d="M8 6h.01" /><path d="M11 6h.01" />
      </>
    ),
  },
  {
    href: 'https://docs.glyphh.ai/tasks',
    title: 'Tasks',
    art: 'tasks',
    head: 'Multi-step process definition',
    body:
      'Use Connect to pull data into apps on a schedule — 95% deterministic, reasoning only if needed. Your team benefits instantly from data sources that don’t cost your org money to constantly query.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  },
  {
    href: 'https://docs.glyphh.ai/gateway',
    title: 'Rrotor',
    art: 'rrotor',
    head: 'Patent pending memory substrate',
    body:
      'Semantic memory and recursive model routing on the desktop — data is local and never leaves the machine. Memory extends to everything you do across every model or app you touch, governed at the org level.',
    icon: (
      <>
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="M12 7a5 5 0 1 0 5 5" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="hiw" id="how-it-works">
      <div className="qs-head">
        <span className="qs-kicker">How it works</span>
        <a href="https://docs.glyphh.ai" className="qs-more">Read the docs &rarr;</a>
      </div>
      <div className="hv-grid">
        {TILES.map((t) => (
          <a key={t.title} href={t.href} className="hv-tile">
            <span className="hv-tile-art"><Art name={t.art} /></span>
            <h3 className="hv-tile-title">{t.title}</h3>
            <p className="hv-tile-head">{t.head}</p>
            <p className="hv-tile-body">{t.body}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
