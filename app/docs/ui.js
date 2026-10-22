// The docs' building blocks: a key/value row, a code block and the
// architecture figure.

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

export function Table({ head, rows }) {
  return (
    <div className="dx-table">
      <table>
        <thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
        <tbody>
          {rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function Box({ x, y, w, h, title, sub }) {
  return (
    <g>
      <rect className="dx-arch-box" x={x} y={y} width={w} height={h} rx="6" />
      <text className="dx-arch-title" x={x + w / 2} y={y + h / 2 - (sub ? 4 : -4)}>{title}</text>
      {sub && <text className="dx-arch-sub" x={x + w / 2} y={y + h / 2 + 14}>{sub}</text>}
    </g>
  );
}

// Ada Cloud (server docs/specs/ada-cloud.md section 3): callers, the API, the queue, the workers, the database.
export function Architecture() {
  return (
    <figure className="dx-arch" role="img" aria-label="Claude through the Glyphh connector with a Glyphh sign-in, and your software through the SDKs or REST with an API key, call Glyphh's API. The API checks the caller and the plan, and puts each call on a queue. Ada workers take calls from the queue and answer them from your organisation's own schema in Postgres, where precedents are indexed with pgvector. The platform uses the same API.">
      <svg viewBox="0 0 920 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="dx-arch-head" />
          </marker>
        </defs>

        <rect className="dx-arch-zone" x="196" y="16" width="708" height="328" rx="10" />
        <text className="dx-arch-zone-label" x="214" y="40">Glyphh · Fly.io iad</text>

        <Box x={16} y={56} w={150} h={64} title="Claude" sub="connector · sign-in" />
        <Box x={16} y={148} w={150} h={64} title="Your software" sub="SDK or REST · key" />
        <Box x={16} y={240} w={150} h={64} title="You" sub="platform.glyphh.ai" />

        <rect className="dx-arch-box dx-arch-strong" x="226" y="70" width="200" height="220" rx="8" />
        <text className="dx-arch-title" x="326" y="100">The API</text>
        <text className="dx-arch-sub" x="326" y="120">ada.glyphh.ai</text>
        <text className="dx-arch-sub" x="326" y="138">api.glyphh.ai/mcp</text>
        <text className="dx-arch-note" x="326" y="180">who is calling, which org</text>
        <text className="dx-arch-note" x="326" y="198">plan limits and rate</text>
        <text className="dx-arch-note" x="326" y="216">counts reads</text>

        <Box x={460} y={130} w={110} h={100} title="Queue" sub="Redis" />

        <rect className="dx-arch-box dx-arch-strong" x="604" y="60" width="130" height="110" rx="8" />
        <text className="dx-arch-title" x="669" y="100">Ada workers</text>
        <text className="dx-arch-sub" x="669" y="120">reads, writes</text>
        <Box x={604} y={190} w={130} h={100} title="Job workers" sub="import · learn" />

        <rect className="dx-arch-box dx-arch-strong" x="764" y="100" width="124" height="160" rx="8" />
        <text className="dx-arch-title" x="826" y="146">Postgres</text>
        <text className="dx-arch-sub" x="826" y="166">a schema per org</text>
        <text className="dx-arch-sub" x="826" y="184">pgvector</text>
        <text className="dx-arch-note" x="826" y="216">specs, precedents,</text>
        <text className="dx-arch-note" x="826" y="232">what was learned</text>

        <line className="dx-arch-line" x1="166" y1="88" x2="224" y2="120" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="166" y1="180" x2="224" y2="180" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="166" y1="272" x2="224" y2="240" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="426" y1="180" x2="458" y2="180" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="570" y1="160" x2="602" y2="120" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="570" y1="200" x2="602" y2="240" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="734" y1="115" x2="762" y2="140" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="734" y1="240" x2="762" y2="220" markerEnd="url(#dx-arch-arrow)" />
      </svg>
      <figcaption>Every call goes through the API, which checks it and queues it; workers answer from your organisation’s own schema. No language model is in the path.</figcaption>
    </figure>
  );
}
