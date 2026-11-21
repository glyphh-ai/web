/**
 * QuestionCard — a question as Ada holds it (his order, 2026-10-26: "maybe a The Question section?"), drawn from
 * the real model launch-demo-expenses: its spec's fields, its two outcomes, its 75% bar and its 40 past expenses.
 * Beside it, the other questions the site has an experiment or an example for.
 */

const FIELDS = ['department', 'category', 'amount, $0 to $3,000', 'receipt', 'policy check', 'description'];

const OTHERS = [
  { q: 'Which team owns this ticket?', from: '10,003 past bank messages, 77 teams', href: '/use-cases/support-routing' },
  { q: 'Approve this loan?', from: '800 past loans, priced by what each mistake costs', href: '/use-cases/loan-decisions' },
  { q: 'What fixes this alert?', from: 'past incidents, with their cause, owner and runbook', href: '#answer' },
];

export default function QuestionCard() {
  return (
    <div className="qn">
      <div className="qn-card hv-panel">
        <span className="qn-k">The question</span>
        <p className="qn-q">Should we approve this expense?</p>
        <dl className="qn-rows">
          <div>
            <dt>Asked about</dt>
            <dd className="qn-chips">{FIELDS.map((f) => <span key={f}>{f}</span>)}</dd>
          </div>
          <div>
            <dt>Answers</dt>
            <dd className="qn-chips"><span className="on">approve</span><span className="on">reject</span></dd>
          </div>
          <div>
            <dt>Asks a person</dt>
            <dd>below 75% sure</dd>
          </div>
          <div>
            <dt>Learns from</dt>
            <dd>40 past expenses, and every one decided after</dd>
          </div>
        </dl>
      </div>
      <ul className="qn-list hv-panel" aria-label="Other questions">
        {OTHERS.map((o) => (
          <li key={o.q}>
            <a href={o.href}>
              <span className="qn-lq">{o.q}</span>
              <span className="qn-lf">{o.from}</span>
              <span className="qn-go" aria-hidden="true">&rarr;</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
