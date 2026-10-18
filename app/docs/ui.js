import { DOCS } from './base';
// The docs' three building blocks: a callout, a key/value row, a code block.

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

// A screenshot of the app. The files are under public/docs, served at /docs/<file>
// on both hosts (middleware.js passes a path with an extension straight
// through). They are taken at 2x, so `width` is the CSS width to show them at.
export function Shot({ file, alt, width, caption }) {
  return (
    <figure className="dx-shot">
      <img src={`/docs/${file}`} alt={alt} loading="lazy" style={width ? { maxWidth: width } : undefined} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// The four steps as one picture: define and encode on the way in, a like
// glyph as the question, fact trees on the way out.
export function GlyphFlow() {
  return (
    <figure className="dx-flow" role="img" aria-label="Define the glyph space and encode your data into the Ada model. Send a like glyph. Receive fact trees. Your code branches, ranks and routes.">
      <svg viewBox="0 0 920 250" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="dx-flow-head" />
          </marker>
        </defs>

        <rect className="dx-flow-box" x="8" y="34" width="176" height="64" />
        <text className="dx-flow-title" x="96" y="62">spec + data</text>
        <text className="dx-flow-sub" x="96" y="81">layers &rsaquo; segments &rsaquo; roles</text>

        <rect className="dx-flow-box" x="8" y="152" width="176" height="64" />
        <text className="dx-flow-title" x="96" y="180">a like glyph</text>
        <text className="dx-flow-sub" x="96" y="199">the question, same shape</text>

        <path className="dx-flow-line" d="M184 66 H318" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="251" y="56">1 define &middot; 2 encode</text>
        <path className="dx-flow-line" d="M184 184 H318" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="251" y="174">3 send</text>

        <rect className="dx-flow-model" x="320" y="14" width="244" height="222" />
        <text className="dx-flow-title" x="442" y="42">Ada model</text>
        <rect className="dx-flow-box" x="344" y="60" width="196" height="150" />
        <text className="dx-flow-title" x="442" y="94">glyph space</text>
        <text className="dx-flow-sub" x="442" y="122">every object a glyph</text>
        <text className="dx-flow-sub" x="442" y="146">distance measured</text>
        <text className="dx-flow-sub" x="442" y="164">at every level</text>
        <text className="dx-flow-sub" x="442" y="188">ranked</text>

        <path className="dx-flow-line" d="M564 125 H658" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="611" y="115">4 receive</text>

        <rect className="dx-flow-box" x="660" y="76" width="118" height="98" />
        <text className="dx-flow-title" x="719" y="106">fact trees</text>
        <text className="dx-flow-sub" x="719" y="128">what is near</text>
        <text className="dx-flow-sub" x="719" y="145">how near</text>
        <text className="dx-flow-sub" x="719" y="162">and why</text>

        <path className="dx-flow-line" d="M778 125 H802" markerEnd="url(#dx-arrow)" />

        <rect className="dx-flow-box" x="804" y="88" width="108" height="74" />
        <text className="dx-flow-title" x="858" y="118">your code</text>
        <text className="dx-flow-sub" x="858" y="138">branch, rank,</text>
        <text className="dx-flow-sub" x="858" y="154">route</text>
      </svg>
    </figure>
  );
}

// "Calculated at multiple dimensions, ranked, and rationalized": the same two
// glyphs compared at every level, the records ordered by it, and the top one
// explained. The numbers are an example.
export function GlyphDistance() {
  return (
    <figure className="dx-flow" role="img" aria-label="Two glyphs compared at every level of their hierarchy, the records ranked by that distance, and the top record explained as a fact tree.">
      <svg viewBox="0 0 920 262" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="dx-flow-head" />
          </marker>
        </defs>
        <text className="dx-flow-step dx-flow-l" x="8" y="22">CALCULATED AT MULTIPLE DIMENSIONS</text>
        <text className="dx-flow-sub dx-flow-l" x="8" y="46">your glyph</text>
        <text className="dx-flow-sub dx-flow-l" x="262" y="46">a record</text>
        <rect className="dx-flow-box" x="8" y="62" width="118" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="18" y="79">glyph</text>
        <rect className="dx-flow-box" x="262" y="62" width="118" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="272" y="79">glyph</text>
        <path className="dx-flow-dash" d="M126 75 H262" />
        <rect className="dx-flow-chip" x="172.0" y="65" width="44" height="20" />
        <text className="dx-flow-score" x="194.0" y="79">0.91</text>
        <rect className="dx-flow-box" x="22" y="100" width="104" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="32" y="117">issue</text>
        <rect className="dx-flow-box" x="276" y="100" width="104" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="286" y="117">issue</text>
        <path className="dx-flow-dash" d="M126 113 H276" />
        <rect className="dx-flow-chip" x="179.0" y="103" width="44" height="20" />
        <text className="dx-flow-score" x="201.0" y="117">0.91</text>
        <rect className="dx-flow-box" x="36" y="138" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="46" y="155">title</text>
        <rect className="dx-flow-box" x="290" y="138" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="300" y="155">title</text>
        <path className="dx-flow-dash" d="M126 151 H290" />
        <rect className="dx-flow-chip" x="186.0" y="141" width="44" height="20" />
        <text className="dx-flow-score" x="208.0" y="155">0.80</text>
        <rect className="dx-flow-box" x="36" y="176" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="46" y="193">component</text>
        <rect className="dx-flow-box" x="290" y="176" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="300" y="193">component</text>
        <path className="dx-flow-dash" d="M126 189 H290" />
        <rect className="dx-flow-chip" x="186.0" y="179" width="44" height="20" />
        <text className="dx-flow-score" x="208.0" y="193">1.00</text>
        <rect className="dx-flow-box" x="36" y="214" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="46" y="231">severity</text>
        <rect className="dx-flow-box" x="290" y="214" width="90" height="26" />
        <text className="dx-flow-sub dx-flow-l" x="300" y="231">severity</text>
        <path className="dx-flow-dash" d="M126 227 H290" />
        <rect className="dx-flow-chip" x="186.0" y="217" width="44" height="20" />
        <text className="dx-flow-score" x="208.0" y="231">0.93</text>

        <path className="dx-flow-line" d="M392 138 H420" markerEnd="url(#dx-arrow)" />

        <text className="dx-flow-step dx-flow-l" x="436" y="22">RANKED</text>
        <text className="dx-flow-sub dx-flow-l" x="436" y="46">every record, nearest first</text>
        <text className="dx-flow-sub dx-flow-l" x="436" y="88">K-1</text>
        <rect className="dx-flow-bar dx-flow-bar-top" x="470" y="74" width="150" height="20" />
        <text className="dx-flow-score dx-flow-l" x="628" y="88">0.91</text>
        <text className="dx-flow-sub dx-flow-l" x="436" y="132">K-7</text>
        <rect className="dx-flow-bar" x="470" y="118" width="122" height="20" />
        <text className="dx-flow-score dx-flow-l" x="600" y="132">0.74</text>
        <text className="dx-flow-sub dx-flow-l" x="436" y="176">K-3</text>
        <rect className="dx-flow-bar" x="470" y="162" width="69" height="20" />
        <text className="dx-flow-score dx-flow-l" x="547" y="176">0.42</text>

        <path className="dx-flow-line" d="M648 138 H676" markerEnd="url(#dx-arrow)" />

        <text className="dx-flow-step dx-flow-l" x="692" y="22">RATIONALIZED</text>
        <text className="dx-flow-sub dx-flow-l" x="692" y="46">why K-1 is nearest</text>
        <text className="dx-flow-title dx-flow-l" x="692" y="82">K-1</text>
        <text className="dx-flow-score dx-flow-l" x="868" y="82">0.91</text>
        <path className="dx-flow-line" d="M694 90 V112 H708" />
        <text className="dx-flow-sub dx-flow-l" x="714" y="116">title</text>
        <text className="dx-flow-sub dx-flow-l" x="800" y="116">0.80 &times; 1</text>
        <text className="dx-flow-score dx-flow-l" x="868" y="116">0.27</text>
        <path className="dx-flow-line" d="M694 112 V146 H708" />
        <text className="dx-flow-sub dx-flow-l" x="714" y="150">component</text>
        <text className="dx-flow-sub dx-flow-l" x="800" y="150">1.00 &times; 1</text>
        <text className="dx-flow-score dx-flow-l" x="868" y="150">0.33</text>
        <path className="dx-flow-line" d="M694 146 V180 H708" />
        <text className="dx-flow-sub dx-flow-l" x="714" y="184">severity</text>
        <text className="dx-flow-sub dx-flow-l" x="800" y="184">0.93 &times; 1</text>
        <text className="dx-flow-score dx-flow-l" x="868" y="184">0.31</text>
        <text className="dx-flow-sub dx-flow-l" x="714" y="222">score &times; weight</text>
        <text className="dx-flow-sub dx-flow-l" x="868" y="222">share</text>
      </svg>
      <figcaption>Example values. The shares of the parts add up to the score of the whole.</figcaption>
    </figure>
  );
}

// A glyph drawn as what it is: glyphs inside glyphs. Each box is a glyph; a
// leaf is a role bound to its value.
function G({ name, kind, weight, children }) {
  return (
    <div className="dx-g">
      <div className="dx-g-head">
        <span className="dx-g-mark" aria-hidden="true" />
        <span className="dx-g-name">{name}</span>
        <span className="dx-g-kind">{kind}</span>
        {weight ? <span className="dx-g-weight">weight {weight}</span> : null}
      </div>
      <div className="dx-g-body">{children}</div>
    </div>
  );
}

function Leaf({ role, value, type }) {
  return (
    <div className="dx-g-leaf">
      <span className="dx-g-mark" aria-hidden="true" />
      <span className="dx-g-name">{role}</span>
      <span className="dx-g-bind" aria-hidden="true">&#8855;</span>
      <span className="dx-g-value">{value}</span>
      <span className="dx-g-type">{type}</span>
    </div>
  );
}

export function GlyphTree() {
  return (
    <figure className="dx-glyph">
      <G name="ticket" kind="glyph">
        <G name="issue" kind="layer" weight="1.0">
          <G name="body" kind="segment">
            <Leaf role="title" value="&quot;pods crash on boot&quot;" type="words" />
            <Leaf role="component" value="&quot;kubelet&quot;" type="symbol" />
            <Leaf role="severity" value="7" type="number" />
          </G>
        </G>
        <G name="meta" kind="layer" weight="0.2">
          <G name="time" kind="segment">
            <Leaf role="opened" value="2026-10-01" type="time" />
          </G>
        </G>
      </G>
      <figcaption>Every box is a glyph. A role is bound (&#8855;) to its value, roles bundle into their segment, segments into their layer, layers into the whole.</figcaption>
    </figure>
  );
}

const TRAITS = [
  ['Hierarchical', 'Meaning has parts, and the parts have parts. Compare two whole glyphs, one branch, or one role.', <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M12 7v5M12 12l-6 5M12 12l6 5" /></>],
  ['Weighted', 'Every level carries a weight: its voice in the level above.', <><path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" /><circle cx="16" cy="6" r="2" /><circle cx="10" cy="12" r="2" /><circle cx="18" cy="18" r="2" /></>],
  ['Typed', 'A plain value, a set, text and a number are each encoded their own way, so near numbers score as near.', <><path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 3-2 3 1 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 3 2 3-1 0-2 1.5-2 3v2c0 2-1 3-3 3" /></>],
  ['Temporal', 'Every glyph is stamped with its time, and a sequence folds into one glyph in which recent items count most.', <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>],
  ['Universal', 'One primitive for any state of any shape. What it stands for is yours to decide.', <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>],
];

export function Traits() {
  return (
    <div className="dx-traits">
      {TRAITS.map(([name, text, icon]) => (
        <div key={name} className="dx-trait">
          <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
          <div className="dx-trait-name">{name}</div>
          <p>{text}</p>
        </div>
      ))}
    </div>
  );
}

// Glyphh in one picture: the primitive at the base, the first model on it,
// the products that run on both, and what they share down the side.
export function GlyphhStack() {
  return (
    <figure className="dx-flow" role="img" aria-label="The glyph is the base. Ada is the first model built on it. Glyphh Desktop, the Model Router and Connect run on top, sharing one account, one plan and one set of rules.">
      <svg viewBox="0 0 920 330" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="dx-flow-head" />
          </marker>
        </defs>
        <text className="dx-flow-step dx-flow-l" x="8" y="20">PRODUCTS</text>
        <rect className="dx-flow-box" x="8" y="32" width="222" height="76" />
        <text className="dx-flow-title" x="119" y="64">Glyphh Desktop</text>
        <text className="dx-flow-sub" x="119" y="86">agent, skills, tasks, apps</text>
        <rect className="dx-flow-box" x="246" y="32" width="222" height="76" />
        <text className="dx-flow-title" x="357" y="64">Model Router</text>
        <text className="dx-flow-sub" x="357" y="86">one endpoint, every model</text>
        <rect className="dx-flow-box" x="484" y="32" width="222" height="76" />
        <text className="dx-flow-title" x="595" y="64">Connect</text>
        <text className="dx-flow-sub" x="595" y="86">your apps as tools, over MCP</text>

        <path className="dx-flow-line" d="M119 108 V134" markerEnd="url(#dx-arrow)" />
        <path className="dx-flow-line" d="M357 108 V134" markerEnd="url(#dx-arrow)" />
        <path className="dx-flow-line" d="M595 108 V134" markerEnd="url(#dx-arrow)" />

        <text className="dx-flow-step dx-flow-l" x="8" y="130">MODEL</text>
        <rect className="dx-flow-model" x="8" y="138" width="698" height="76" />
        <text className="dx-flow-title" x="357" y="170">Ada</text>
        <text className="dx-flow-sub" x="357" y="192">the first model on the glyph: define a space, encode data, send like glyphs, receive fact trees</text>

        <path className="dx-flow-line" d="M357 214 V240" markerEnd="url(#dx-arrow)" />

        <text className="dx-flow-step dx-flow-l" x="8" y="236">PRIMITIVE</text>
        <rect className="dx-flow-base" x="8" y="244" width="698" height="76" />
        <text className="dx-flow-title" x="357" y="276">the glyph</text>
        <text className="dx-flow-sub" x="357" y="298">a mathematical structure that carries state: hierarchical, weighted, typed, temporal</text>

        <text className="dx-flow-step dx-flow-l" x="734" y="20">SHARED</text>
        <rect className="dx-flow-box" x="734" y="32" width="178" height="288" />
        <text className="dx-flow-title" x="823" y="92">one account</text>
        <text className="dx-flow-sub" x="823" y="112">your org, plan and role</text>
        <text className="dx-flow-title" x="823" y="172">one plan</text>
        <text className="dx-flow-sub" x="823" y="192">never per seat or per model</text>
        <text className="dx-flow-title" x="823" y="252">one set of rules</text>
        <text className="dx-flow-sub" x="823" y="272">models, tools, teams</text>
      </svg>
    </figure>
  );
}

// "AI at build time, not runtime": the two lanes.
export function BuildRun() {
  return (
    <figure className="dx-flow" role="img" aria-label="At build time, models read, write and plan, and produce a typed structure. At run time, your data and questions go through that structure and come back as measured answers, with no model in the path.">
      <svg viewBox="0 0 920 236" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="dx-flow-head" />
          </marker>
        </defs>
        <text className="dx-flow-step dx-flow-l" x="8" y="20">BUILD TIME &middot; models do the thinking, once</text>
        <rect className="dx-flow-box" x="8" y="32" width="200" height="64" />
        <text className="dx-flow-title" x="108" y="60">models</text>
        <text className="dx-flow-sub" x="108" y="79">frontier and open weights</text>
        <path className="dx-flow-line" d="M208 64 H300" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="254" y="54">read, write, plan</text>
        <rect className="dx-flow-box" x="302" y="32" width="200" height="64" />
        <text className="dx-flow-title" x="402" y="60">you review</text>
        <text className="dx-flow-sub" x="402" y="79">validate, approve, distribute</text>
        <path className="dx-flow-line" d="M502 64 H594" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="548" y="54">produces</text>
        <rect className="dx-flow-model" x="596" y="32" width="316" height="184" />
        <text className="dx-flow-title" x="754" y="62">a typed structure</text>
        <text className="dx-flow-sub" x="754" y="84">glyph spaces, skills, tasks, apps</text>
        <rect className="dx-flow-box" x="620" y="104" width="268" height="88" />
        <text className="dx-flow-title" x="754" y="134">measured, not generated</text>
        <text className="dx-flow-sub" x="754" y="156">the same input, the same answer</text>
        <text className="dx-flow-sub" x="754" y="174">with its reasons</text>

        <text className="dx-flow-step dx-flow-l" x="8" y="140">RUN TIME &middot; no model in the path</text>
        <rect className="dx-flow-box" x="8" y="152" width="200" height="64" />
        <text className="dx-flow-title" x="108" y="180">your data</text>
        <text className="dx-flow-sub" x="108" y="199">and your questions</text>
        <path className="dx-flow-line" d="M208 172 H618" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="413" y="164">in</text>
        <path className="dx-flow-line" d="M618 196 H210" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="413" y="212">answers, on your budget</text>
      </svg>
    </figure>
  );
}

const DOORS = [
  [`${DOCS}/ada-introduction`, 'Ada', 'The first model on the glyph. Define a space, encode your data, and get answers as fact trees.', <><path d="M12 3v6" /><path d="M12 9 6 15" /><path d="M12 9l6 6" /><circle cx="12" cy="3" r="1.5" /><circle cx="6" cy="17" r="2" /><circle cx="18" cy="17" r="2" /></>],
  [`${DOCS}/install`, 'Glyphh Desktop', 'The agent, skills, tasks and tools on your machine, with every frontier model and open weights.', <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>],
  [`${DOCS}/gateway`, 'Model Router', 'One endpoint in front of every model, with your budgets and roles.', <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M2 14h4M10 8h4M18 16h4" /></>],
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

// A fact tree, drawn: one record explained against the question. Every row is
// a node; the bar is how well that part matched; the share is what it added.
const FACTS = [
  { key: 'issue', depth: 0, score: 0.91, weight: '1', share: '0.91', status: 'both' },
  { key: 'title', depth: 1, score: 0.8, weight: '1', share: '0.27', status: 'both' },
  { key: 'component', depth: 1, score: 1, weight: '1', share: '0.33', status: 'both' },
  { key: 'severity', depth: 1, score: 0.93, weight: '1', share: '0.31', status: 'both' },
  { key: 'reporter', depth: 0, score: 0, weight: '0', share: '0.00', status: 'record only' },
];

export function FactTreeFig() {
  return (
    <figure className="dx-ft">
      <div className="dx-ft-head">
        <div>
          <span className="dx-ft-label">record</span>
          <span className="dx-ft-id">K-1</span>
          <span className="dx-ft-arrow" aria-hidden="true">&rarr;</span>
          <span className="dx-ft-outcome">route_to_platform</span>
        </div>
        <div className="dx-ft-stats">
          <span><b>0.91</b> score</span>
          <span><b>0.84</b> probability</span>
          <span>by ana &middot; 2026-09-28</span>
        </div>
      </div>
      <div className="dx-ft-cols" aria-hidden="true">
        <span>key</span><span>score</span><span>weight</span><span>share</span><span>status</span>
      </div>
      {FACTS.map((f) => (
        <div key={f.key} className={`dx-ft-row${f.depth ? ' dx-ft-child' : ''}${f.score ? '' : ' dx-ft-off'}`}>
          <span className="dx-ft-key"><i aria-hidden="true" />{f.key}</span>
          <span className="dx-ft-score">
            <span className="dx-ft-bar"><span style={{ width: `${f.score * 100}%` }} /></span>
            {f.score.toFixed(2)}
          </span>
          <span className="dx-ft-num">&times; {f.weight}</span>
          <span className="dx-ft-num dx-ft-share">{f.share}</span>
          <span className="dx-ft-status">{f.status}</span>
        </div>
      ))}
      <figcaption>Example values. The shares of title, component and severity add up to the 0.91 of issue, which is the score of the record.</figcaption>
    </figure>
  );
}

// The answer a query sums the records into, and the one line of code it feeds.
export function AnswerFig() {
  return (
    <figure className="dx-ans">
      <div className="dx-ans-card">
        <span className="dx-ft-label">top</span>
        <div className="dx-ans-top">route_to_platform</div>
        <div className="dx-ans-stats">
          <div><b>0.82</b><span>confidence</span></div>
          <div><b>6</b><span>records</span></div>
          <div><b>0.12</b><span>nearest failure</span></div>
        </div>
        <div className="dx-ans-gauge" aria-hidden="true"><span style={{ width: '82%' }} /><i style={{ left: '50%' }} /></div>
        <div className="dx-ans-scale" aria-hidden="true"><span>0</span><span>act at 0.5</span><span>1</span></div>
      </div>
      <div className="dx-ans-then" aria-hidden="true">&rarr;</div>
      <div className="dx-ans-card dx-ans-act">
        <span className="dx-ft-label">act</span>
        <div className="dx-ans-true">true</div>
        <p>sufficient, confident, and no recorded failure rules it out</p>
        <pre>{`if (answer.act) route(answer.top)
else askAPerson()`}</pre>
      </div>
    </figure>
  );
}

// The same question, two machines. A language model generates a response; a
// glyph space measures and reports.
export function LlmVsGlyphh() {
  return (
    <figure className="dx-flow" role="img" aria-label="A language model takes text in, predicts the next token by sampling, and always returns generated text. Glyphh takes typed state in, measures its distance to what is known in glyph space, and returns a fact tree, or says nothing is near.">
      <svg viewBox="0 0 920 344" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="dx-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" className="dx-flow-head" />
          </marker>
        </defs>

        <text className="dx-flow-step dx-flow-l dx-flow-dim" x="8" y="20">A LANGUAGE MODEL &middot; generates</text>
        <rect className="dx-flow-box" x="8" y="32" width="190" height="104" />
        <text className="dx-flow-title" x="103" y="80">text in</text>
        <text className="dx-flow-sub" x="103" y="100">a prompt, in words</text>
        <path className="dx-flow-line" d="M198 84 H368" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step dx-flow-dim" x="283" y="74">ask</text>

        <rect className="dx-flow-box" x="370" y="32" width="206" height="104" />
        <text className="dx-flow-title" x="473" y="56">predict the next token</text>
        <rect className="dx-flow-tok" x="386" y="72" width="38" height="22" /><text className="dx-flow-sub" x="405" y="87">the</text>
        <rect className="dx-flow-tok" x="430" y="72" width="44" height="22" /><text className="dx-flow-sub" x="452" y="87">next</text>
        <rect className="dx-flow-tok" x="480" y="72" width="48" height="22" /><text className="dx-flow-sub" x="504" y="87">token</text>
        <rect className="dx-flow-tok dx-flow-tok-q" x="534" y="72" width="28" height="22" /><text className="dx-flow-sub" x="548" y="87">?</text>
        <text className="dx-flow-sub" x="473" y="120">sampled from a distribution</text>

        <path className="dx-flow-line" d="M576 84 H690" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step dx-flow-dim" x="633" y="74">always</text>
        <rect className="dx-flow-box" x="692" y="32" width="220" height="104" />
        <text className="dx-flow-title" x="802" y="58">generated text</text>
        <path className="dx-flow-squig" d="M712 76 h180 M712 90 h150 M712 104 h168 M712 118 h96" />

        <text className="dx-flow-sub dx-flow-l" x="8" y="158">&bull; answers whether or not it knows</text>
        <text className="dx-flow-sub dx-flow-l" x="318" y="158">&bull; can differ from one run to the next</text>
        <text className="dx-flow-sub dx-flow-l" x="648" y="158">&bull; its reasons are not part of the answer</text>

        <path className="dx-flow-rule" d="M8 180 H912" />

        <text className="dx-flow-step dx-flow-l" x="8" y="206">GLYPHH &middot; measures</text>
        <rect className="dx-flow-box" x="8" y="218" width="190" height="104" />
        <text className="dx-flow-title" x="103" y="266">state in</text>
        <text className="dx-flow-sub" x="103" y="286">typed, as a glyph</text>
        <path className="dx-flow-line" d="M198 270 H368" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="283" y="260">send</text>

        <rect className="dx-flow-model" x="370" y="218" width="206" height="104" />
        <text className="dx-flow-title" x="473" y="238">glyph space</text>
        <rect className="dx-flow-dot" x="395" y="253" width="6" height="6" transform="rotate(45 398 256)" />
        <rect className="dx-flow-dot" x="427" y="285" width="6" height="6" transform="rotate(45 430 288)" />
        <rect className="dx-flow-dot" x="517" y="255" width="6" height="6" transform="rotate(45 520 258)" />
        <rect className="dx-flow-dot" x="545" y="277" width="6" height="6" transform="rotate(45 548 280)" />
        <rect className="dx-flow-dot" x="411" y="301" width="6" height="6" transform="rotate(45 414 304)" />
        <rect className="dx-flow-dot" x="537" y="301" width="6" height="6" transform="rotate(45 540 304)" />
        <rect className="dx-flow-dot" x="447" y="305" width="6" height="6" transform="rotate(45 450 308)" />
        <path className="dx-flow-dash" d="M470 276 L486 270" />
        <rect className="dx-flow-dot dx-flow-dot-near" x="482.5" y="266.5" width="7" height="7" transform="rotate(45 486 270)" />
        <path className="dx-flow-dash" d="M470 276 L462 250" />
        <rect className="dx-flow-dot dx-flow-dot-near" x="458.5" y="246.5" width="7" height="7" transform="rotate(45 462 250)" />
        <path className="dx-flow-dash" d="M470 276 L500 296" />
        <rect className="dx-flow-dot dx-flow-dot-near" x="496.5" y="292.5" width="7" height="7" transform="rotate(45 500 296)" />
        <rect className="dx-flow-dot dx-flow-dot-q" x="465" y="271" width="10" height="10" transform="rotate(45 470 276)" />

        <path className="dx-flow-line" d="M576 252 H690" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="633" y="242">something near</text>
        <rect className="dx-flow-box" x="692" y="218" width="220" height="68" />
        <text className="dx-flow-title" x="802" y="240">a fact tree</text>
        <rect className="dx-flow-bar dx-flow-bar-top" x="712" y="252" width="150" height="7" />
        <rect className="dx-flow-bar" x="712" y="264" width="112" height="7" />
        <rect className="dx-flow-bar" x="712" y="276" width="64" height="7" />
        <text className="dx-flow-score dx-flow-l" x="872" y="260">0.91</text>

        <path className="dx-flow-line" d="M576 307 H690" markerEnd="url(#dx-arrow)" />
        <text className="dx-flow-step" x="633" y="299">nothing near</text>
        <rect className="dx-flow-box" x="692" y="292" width="220" height="30" />
        <text className="dx-flow-sub" x="802" y="311">&ldquo;nothing is close enough&rdquo;</text>

        <text className="dx-flow-sub dx-flow-l" x="8" y="340">&bull; the same input, the same answer</text>
        <text className="dx-flow-sub dx-flow-l" x="318" y="340">&bull; cites the records it stands on</text>
        <text className="dx-flow-sub dx-flow-l" x="648" y="340">&bull; score, weight and share at every level</text>
      </svg>
    </figure>
  );
}
