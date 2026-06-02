/**
 * AdaL — Glyphh's hyperdimensional memory substrate.
 *
 * This is the differentiator: not a vector database, not a RAG chunker.
 * A working HDC substrate that consolidates what you do into stable
 * glyphs, with a dream loop that runs in the background to strengthen
 * what matters and decay what doesn't. Lands very early on the page so
 * the "AI workspace" claim has the memory story behind it.
 */

import { styledText } from './cmd-style';

const pillars = [
  {
    title: 'Hyperdimensional encoding',
    desc: '10,000-dimensional glyphs over a binary substrate. Composable, bindable, superposable — semantic closeness maps to glyph-space distance. Built on the HDC primitives the academic literature actually uses.',
  },
  {
    title: 'Background consolidation',
    desc: 'A worker thread walks the substrate on a fixed cadence: frequently-used thoughts strengthen, stale ones decay, related thoughts bind together. The store stays focused instead of growing unbounded.',
  },
  {
    title: 'Automatic capture',
    desc: 'Every panel, conversation, and tool result feeds the substrate as you work. No tagging, no curation step. The agent searches the store on every turn before falling back to asking you.',
  },
  {
    title: 'Bounded, gated recall',
    desc: 'Relevance-gated retrieval, with strength and recency clamped so a loud thought can\'t crowd out the rest. What lands in the prompt is what\'s actually relevant to the question — not the top-k vectors.',
  },
];

export default function AdaL() {
  return (
    <section className="adal" id="adal">
      <div className="container">
        <div className="adal-mark reveal">
          <span className="adal-glyph">a<span className="adal-dot">.</span>L</span>
        </div>
        <div className="section-label reveal">{'{'}
          <span className="accent">ADAL — HDC MEMORY SUBSTRATE</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          Built-in memory.<br/>Not bolted-on RAG.
        </h2>
        <p className="adal-lede reveal">
          adaL is Glyphh&apos;s memory layer — a hyperdimensional computing
          substrate the agent shares across every conversation, panel,
          and tool. Persistent on disk, consolidated in the background,
          and queried before the agent asks you to repeat yourself.
        </p>
        <div className="adal-grid">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{styledText(p.title)}</h3>
              <p>{styledText(p.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
