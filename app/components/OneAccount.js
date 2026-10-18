/**
 * OneAccount: what the two products share (2026-10-01 mock). The same
 * four-card pattern as the pitch, with no hero behind it.
 */

const POINTS = [
  ['One sign-in', 'A Glyphh account carries your organization, plan and role into the desktop, the router, and any MCP client.'],
  ['One plan', 'Never per seat, per model or per install. One flat plan covers the desktop, the router and every client.'],
  ['Any client', 'Claude Code, Codex, Cursor, your own agents. The desktop is one client, not a requirement.'],
  ['Governed by you', 'Approve models, set budgets, and gate tools by team. Every token accounted for.'],
];

export default function OneAccount() {
  return (
    <section className="hiw hv-pitch" id="platform">
      <div className="qs-head">
        <span className="qs-kicker">One platform</span>
        <a href="/pricing" className="qs-more">Pricing &rarr;</a>
      </div>
      <h2 className="ix-h2 lt-h2">Two products. One account, one plan, one set of rules.</h2>
      <ul className="oshero-points">
        {POINTS.map(([title, body]) => (
          <li key={title}><span>{title}</span>{body}</li>
        ))}
      </ul>
    </section>
  );
}
