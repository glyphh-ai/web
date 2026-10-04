import { DOCS } from './base';
// The docs' building blocks: a callout, a key/value row, a code block, and
// the doors on the introduction, one per product.

const KINDS = {
  note: { tone: 'info', label: 'Note' },
  tip: { tone: 'ok', label: 'Tip' },
  warn: { tone: 'warn', label: 'Watch out' },
  admin: { tone: 'warn', label: 'Admin only' },
  wire: { tone: 'info', label: 'Wiring' },
  code: { tone: 'info', label: 'For developers' },
};

export function Note({ kind = 'note', title, children }) {
  const k = KINDS[kind] || KINDS.note;
  return (
    <aside className={`dx-note dx-note-${k.tone}`}>
      <span className="dx-pill">{k.label}</span>
      {title && <div className="dx-note-title">{title}</div>}
      <div className="dx-note-detail">{children}</div>
    </aside>
  );
}

export function Row({ k, children }) {
  return (
    <div className="dx-row">
      <code>{k}</code>
      <span>{children}</span>
    </div>
  );
}

export function Code({ children, lang }) {
  return <pre className="dx-code" data-lang={lang}>{children}</pre>;
}

const DOORS = [
  [`${DOCS}/install`, 'Glyphh Desktop', 'The agent, skills, tasks and tools on your machine, with every frontier model and open weights.', <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>],
  [`${DOCS}/gateway`, 'Model Router', 'One endpoint in front of every model, with your budgets, roles and published rates.', <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4" /></>],
  [`${DOCS}/connections`, 'Connect', 'Your apps as tools for any agent, over MCP, governed by team.', <><path d="M12 22v-5M9 8V2M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" /></>],
];

export function Doors() {
  return (
    <div className="dx-traits">
      {DOORS.map(([href, name, text, icon]) => (
        <a key={name} href={href} className="dx-trait dx-door">
          <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
          <div className="dx-trait-name">{name}</div>
          <p>{text}</p>
          <span className="dx-door-go">Start here &rarr;</span>
        </a>
      ))}
    </div>
  );
}

