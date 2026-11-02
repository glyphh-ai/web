// Three diagrams in the site's cut, white and grey lines on black, no accent: how an app, a CLI and a program sit
// on rrotor. Each is what the architecture says (glyphh-ai/rrotor docs/architecture.md 5.7, 5.8; the server's
// docs/specs/apps.md), drawn as boxes and arrows. The canvas is 720 wide: three columns, 180 / 260 / 190.

const F = { fontFamily: 'var(--font-mono)', fontSize: 11.5, letterSpacing: '0.02em' };
const L = 0, LW = 180, M = 230, MW = 260, R = 530, RW = 190;

function Box({ x, y, w, h, title, lines = [], dashed = false, light = false }) {
  return (
    <g>
      <rect x={x + 0.5} y={y + 0.5} width={w - 1} height={h - 1} fill={light ? '#0d0d0d' : '#000'} stroke={dashed ? '#7a7a7a' : '#eaeaea'} strokeWidth="1" strokeDasharray={dashed ? '4 3' : undefined} />
      <text x={x + 10} y={y + 16} fill={dashed ? '#c8c8c8' : '#fff'} style={{ ...F, fontWeight: 600, fontSize: 10.5, letterSpacing: '0.1em' }}>{title}</text>
      {lines.map((l, i) => (
        <text key={i} x={x + 10} y={y + 34 + i * 15} fill="#c8c8c8" style={F}>{l}</text>
      ))}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label, dashed = false }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={dashed ? '#7a7a7a' : '#eaeaea'} strokeWidth="1" strokeDasharray={dashed ? '4 3' : undefined} markerEnd={dashed ? undefined : 'url(#pr-arrow)'} />
      {label ? <text x={(x1 + x2) / 2} y={Math.min(y1, y2) - 6} fill="#909090" textAnchor="middle" style={{ ...F, fontSize: 10.5 }}>{label}</text> : null}
    </g>
  );
}

function Svg({ children, h = 250, label }) {
  return (
    <svg className="pr-diagram" viewBox={`0 0 720 ${h}`} role="img" aria-label={label}>
      <defs>
        <marker id="pr-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M0,0.5 L7,4 L0,7.5" fill="none" stroke="#eaeaea" strokeWidth="1" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

export function AppDiagram() {
  return (
    <Svg h={260} label="An app: an agent session publishes a page to rrotor; a reviewer approves it; your people open it by role; Glyphh keeps only the catalogue entry">
      <Box x={L} y={62} w={LW} h={78} title="Agent session" lines={['Claude, Codex, Gemini…', 'writes index.html', 'publish to my org']} />
      <Arrow x1={LW + 1} y1={100} x2={M - 2} y2={100} />
      <Box x={M} y={30} w={MW} h={140} title="rrotor · your host" light lines={['deploy-failures  version 3', 'draft  →  approved', '/apps/deploy-failures/', 'roles: engineering', 'calls run as the viewer']} />
      <Box x={R} y={30} w={RW} h={60} title="Reviewer" lines={['admin, reviewer groups', 'approve · reject']} />
      <Arrow x1={R - 1} y1={60} x2={M + MW + 2} y2={60} label="approves" />
      <Box x={R} y={110} w={RW} h={60} title="Your people" lines={['a browser, signed in', 'only the roles named']} />
      <Arrow x1={M + MW + 1} y1={140} x2={R - 2} y2={140} label="serves" />
      <Box x={M} y={200} w={MW} h={58} title="Glyphh · the catalogue" dashed lines={['title · version · state', 'never the page itself']} />
      <Arrow x1={M + MW / 2} y1={170} x2={M + MW / 2} y2={199} dashed />
    </Svg>
  );
}

export function CliDiagram() {
  return (
    <Svg h={250} label="A CLI: an agent asks rrotor to run one gh command in a sandbox; a matching approval waits for the person; only the declared host is reachable; the person's own machine is untouched">
      <Box x={L} y={30} w={LW} h={62} title="Agent" lines={['cli_run github', 'pr merge 42']} />
      <Arrow x1={LW + 1} y1={61} x2={M - 2} y2={61} />
      <Box x={M} y={30} w={MW} h={160} title="rrotor · sandbox" light lines={['gh 2.62.0, pinned, checksummed', 'allow      pr *, issue *', 'approvals  pr merge *  →  waits', 'HOME  /homes/chris  (as chris)', 'no network but the hosts named']} />
      <Box x={R} y={30} w={RW} h={60} title="Person" lines={['approve · refuse', 'on record, by name']} />
      <Arrow x1={R - 1} y1={60} x2={M + MW + 2} y2={60} label="approves" />
      <Box x={R} y={130} w={RW} h={60} title="api.github.com" lines={['the one host declared', 'via the egress proxy']} />
      <Arrow x1={M + MW + 1} y1={160} x2={R - 2} y2={160} />
      <Box x={L} y={130} w={LW} h={60} title="Your machine" dashed lines={['untouched: no tool,', 'no key, no file of yours']} />
    </Svg>
  );
}

export function ProgramDiagram() {
  return (
    <Svg h={250} label="A program: a commit of glyphh.json and program.py deployed to rrotor, which keeps its vault, schedule, database and audit; a person approves the write; the declared host is the only network; every call answers a Result">
      <Box x={L} y={62} w={LW} h={78} title="Your repo" lines={['glyphh.json', 'program.py, tests', 'commit e41c88a']} />
      <Arrow x1={LW + 1} y1={100} x2={M - 2} y2={100} label="deploy" />
      <Box x={M} y={18} w={MW} h={185} title="rrotor · daily_sales" light lines={['vault     LEDGER_TOKEN', 'schedule  15 6 * * *  UTC', 'db        sqlite, its own file', 'approvals write  →  waits', 'hosts     api.frankfurter.dev', 'audit     run.call · run.end']} />
      <Box x={R} y={18} w={RW} h={55} title="Person" lines={['approves the write', '06:15, from the phone']} />
      <Arrow x1={R - 1} y1={45} x2={M + MW + 2} y2={45} label="approves" />
      <Box x={R} y={88} w={RW} h={50} title="api.frankfurter.dev" lines={['the one host declared']} />
      <Arrow x1={M + MW + 1} y1={113} x2={R - 2} y2={113} />
      <Box x={R} y={153} w={RW} h={60} title="Result" lines={['done, needs_approval,', 'failed, with its data']} />
      <Arrow x1={M + MW + 1} y1={183} x2={R - 2} y2={183} />
    </Svg>
  );
}
