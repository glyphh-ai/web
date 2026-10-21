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

// Early access (2026-10-21): the notice at the top of the docs home and the
// Run rrotor pages. The plugin, the SDKs and rrotor are not public for now.
export const EARLY_ACCESS_HREF = 'mailto:sales@glyphh.ai?subject=Glyphh%20early%20access';

export function EarlyAccess({ children }) {
  return (
    <div className="dx-note">
      <div className="dx-note-body">
        <p className="dx-note-title">Early access</p>
        <div className="dx-note-detail">
          <p>
            {children} <a href={EARLY_ACCESS_HREF}>Request early access</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export function Code({ children, lang }) {
  return <pre className="dx-code" data-lang={lang}>{children}</pre>;
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

// Who calls rrotor, what runs inside it, and its one line out to Glyphh.
export function Architecture() {
  return (
    <figure className="dx-arch" role="img" aria-label="Claude over MCP with the Glyphh sign-in, and your software over REST or an SDK with a runtime key, call rrotor in your infrastructure. rrotor deploys models by commit, runs each call in its own sandbox and keeps everything on its /data volume; followers replicate from the head and logs drain to your collector. rrotor's only line to Glyphh is an outbound link to api.glyphh.ai, which the platform uses.">
      <svg viewBox="0 0 920 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" className="dx-arch-head" />
          </marker>
        </defs>

        <rect className="dx-arch-zone" x="196" y="16" width="452" height="368" rx="10" />
        <text className="dx-arch-zone-label" x="214" y="40">Your infrastructure</text>
        <rect className="dx-arch-zone" x="680" y="16" width="224" height="368" rx="10" />
        <text className="dx-arch-zone-label" x="698" y="40">Glyphh</text>

        <Box x={16} y={78} w={150} h={64} title="Claude" sub="MCP · Glyphh sign-in" />
        <Box x={16} y={218} w={150} h={64} title="Your software" sub="REST or SDK · key" />

        <rect className="dx-arch-box dx-arch-strong" x="226" y="60" width="392" height="232" rx="8" />
        <text className="dx-arch-title" x="422" y="88">rrotor</text>
        <text className="dx-arch-sub" x="422" y="106">https://&lt;host&gt; · REST and /mcp</text>
        <Box x={244} y={130} w={110} h={64} title="Models" sub="repo @ commit" />
        <Box x={367} y={130} w={110} h={64} title="Sandbox" sub="one per run" />
        <Box x={490} y={130} w={110} h={64} title="/data" sub="precedents" />
        <text className="dx-arch-sub" x="422" y="226">Ada answers from the nearest precedents</text>
        <text className="dx-arch-sub" x="422" y="244">and learns from each graded case</text>
        <text className="dx-arch-note" x="422" y="272">the head node: in a cluster, the one writer</text>

        <Box x={226} y={312} w={186} h={52} title="Followers" sub="replicate from the head" />
        <Box x={432} y={312} w={186} h={52} title="Your collector" sub="OpenTelemetry logs" />

        <Box x={706} y={96} w={172} h={76} title="api.glyphh.ai" sub="accounts · keys · licence" />
        <Box x={706} y={232} w={172} h={64} title="platform.glyphh.ai" sub="sign in · keys · models" />

        <line className="dx-arch-line" x1="166" y1="110" x2="224" y2="130" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="166" y1="250" x2="224" y2="230" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="319" y1="294" x2="319" y2="310" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-line" x1="525" y1="294" x2="525" y2="310" markerEnd="url(#dx-arch-arrow)" />
        <line className="dx-arch-dash" x1="620" y1="134" x2="704" y2="134" markerEnd="url(#dx-arch-arrow)" />
        <text className="dx-arch-note" x="662" y="124">link</text>
        <text className="dx-arch-note" x="662" y="152">outbound</text>
        <line className="dx-arch-line" x1="792" y1="230" x2="792" y2="174" markerEnd="url(#dx-arch-arrow)" />
      </svg>
      <figcaption>Calls go from the caller to rrotor and back. Only the outbound link reaches Glyphh, and it never carries a call’s inputs or answers.</figcaption>
    </figure>
  );
}
