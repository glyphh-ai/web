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
    title: 'Hyperdimensional, not vector-dump',
    desc: 'Each thought becomes a 10K-dimensional glyph — composable, bindable, and superposable. Closeness in glyph-space means semantic closeness; binding two glyphs gives you a third that carries both meanings. The math does the work a vector DB only approximates.',
  },
  {
    title: 'A dream loop that consolidates',
    desc: 'Every few minutes a background worker walks the substrate, strengthens what gets reused, decays what doesn\'t, and binds related thoughts together. Memory gets sharper while you sleep, not just bigger.',
  },
  {
    title: 'Memory is automatic',
    desc: 'You don\'t curate what to remember — the substrate captures as you work. Conversations, captures, code, dashboards. The agent searches your glyphs before it asks you to repeat yourself.',
  },
  {
    title: 'Recall is grounded, not greedy',
    desc: 'A relevance gate keeps recall from dumping the whole store into the agent\'s context. Strength and recency are bounded so one loud thought can\'t crowd out the rest. What lands in the prompt actually matters to the question.',
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
          <span className="accent">ADAL — HYPERDIMENSIONAL MEMORY</span>
          {'}'}</div>
        <h2 className="section-title reveal">
          Your workspace doesn&apos;t just hold context.
          <br/>It <em>remembers</em>.
        </h2>
        <p className="adal-lede reveal">
          adaL is Glyphh&apos;s HDC substrate — a living memory layer the agent
          shares across every conversation, panel, and tool. Built on
          hyperdimensional computing, not similarity search. Always on,
          always consolidating, always grounded.
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
