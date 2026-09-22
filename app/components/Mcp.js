import RouterStage from './RouterStage';

/**
 * THE CALLOUT (his order, 2026-09-18): Glyphh in the middle. The loops on the
 * left, Glyphh Connect streaming in above, Glyphh Router on the right. This is
 * the pitch drawn once, and it sits directly under the hero.
 *
 * OFF the home page since 2026-09-21 (his order): the stage moved into the
 * hero (RouterStage) and the four cards came off. Kept in the tree, hidden.
 */

const pillars = [
  {
    title: 'Any loop drives it',
    desc: 'Claude Code, Codex, Gemini, or the Glyphh loop. The desktop, the tools, the skills, and the connections are the same whichever one is in the seat. Swap mid-task.',
  },
  {
    title: 'Glyphh Connect',
    desc: '3,500+ services as tools: Gmail, Slack, Salesforce, GitHub, Notion, and the rest, with org-shared or personal auth. Every loop can call them. RPA reaches what has no API.',
  },
  {
    title: 'Glyphh Router',
    desc: 'One endpoint in front of every model, and a choice of how to spend. Burn down: your vendor subscriptions first, the proxy when they run dry. Reserved: the heavy models stay on your subscriptions, everything lighter rides the proxy. Roles decide who gets what; every token, cached or not, is accounted for.',
  },
  {
    title: 'Local by default',
    desc: 'Apps, files, memory, and keys stay on the machine. The router is the only thing in the cloud, and only when the org turns it on.',
  },
];

export default function Mcp() {
  return (
    <section className="adal" id="mcp">
      <div className="container">
        <div className="section-label reveal">{'{'}
          <span className="accent">THE HARNESS</span>
          {'}'}</div>
        {/* The title + lede moved UP into the hero (his order, 2026-09-21):
            "The AI Router for the enterprise." now heads the page, so the
            callout is the picture alone. Hidden, not deleted. */}
        {false && (
          <>
            <h2 className="section-title reveal">The AI Router for the enterprise.</h2>
            <p className="adal-lede reveal">
              Put your whole AI stack behind one key. See who is driving spend, cap it
              before it runs away, and send every request to the model that should
              handle it.
            </p>
          </>
        )}

        {/* Marketecture: every LLM (left) ⇄ one relay (mascot) ⇄ everything
            you build (right). Two-way pulses = tool call out, result back.
            Shares the apx-* visual language from the PUBLISH graphic. */}
        <RouterStage className="reveal" />

        <div className="adal-grid">
          {pillars.map((p, i) => (
            <div key={i} className="adal-pillar reveal">
              <div className="adal-pillar-bullet" aria-hidden="true">·</div>
              <h3>{p.title}{p.badge && <span className="feature-badge">{p.badge}</span>}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
