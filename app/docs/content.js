import { Code, Row, Shot, GlyphFlow, GlyphDistance, GlyphTree, Traits, GlyphhStack, BuildRun, Doors, FactTreeFig, AnswerFig, LlmVsGlyphh } from './ui';
import { PRODUCT_GROUPS, ada } from './pages';
import { DOCS } from './base';

// The introduction's Ada opening (cut 2026-10-04, back 2026-10-06 behind the
// one switch): the search for a primitive, the glyph, the stack, build time
// over runtime. With Ada off the page is today's, word for word.
const ADA_INTRO = (
  <>
    <h2>A search for a cognitive primitive</h2>
    <p>
      Deep learning got us here. We believe the next layer is memory, structure, and the machinery agents run
      on: a mathematical primitive that models can use as a cognitive substrate.
    </p>
    <p>
      Ours is the glyph. A glyph is a mathematical structure that carries state: hierarchical, weighted,
      typed, temporal, and a universal primitive. Two glyphs can be compared with arithmetic, at any level of
      their structure, and the comparison explains itself.
    </p>
    <GlyphhStack />
    <p>
      Everything Glyphh ships sits on that base. Ada is the first model to use the glyph directly. The
      desktop, the router and connections are how your team reaches models, tools and Ada under one account.
    </p>
    <h2>AI at build time, not runtime</h2>
    <p className="dx-pull">
      Productivity doesn&rsquo;t come from prompting. It comes from <em>building</em>.
    </p>
    <p>
      Use blended AI models to build predictable applications that run on your data deterministically:
      validated, distributed, and governed by your teams. A model does the thinking once, when the thing is
      built. After that, the structure answers.
    </p>
    <BuildRun />
  </>
);

const glyphh = [
  {
    slug: 'introduction',
    title: 'Introduction',
    lede: 'Glyphh Desktop is the vendor-neutral desktop for frontier AI. app.glyphh.ai is the same account in a browser, built to drive it. The Model Router puts every model behind one endpoint.',
    body: (
      <>
        {ADA_INTRO}
        <h2>Glyphh Desktop</h2>
        <p>
          Glyphh Desktop runs on Mac, Windows and Linux, with a CLI that shares its history. It is the open
          desktop client for Claude, ChatGPT, Gemini and open-weight models: chat, work and code on your
          machine, beside the apps you already use. The agent, skills, tasks and your connections are in the
          room, and the loop you run reaches all of them.
        </p>
        <p>
          The desktop is where you build: your folders, your installed apps and skills, your CLIs. A session
          works in a folder on it and nowhere else. Start with the{' '}
          <a href={`${DOCS}/quick-start`}>quick start</a>.
        </p>
        <p>
          A workspace names a loop, the model for each of its slots, the panels around it and the tools those
          panels expose. Open the name and all of it is there. Switch in a keystroke.
        </p>
        <h2>app.glyphh.ai</h2>
        <p>
          The same account in a browser, made to drive your desktop: your sessions, files and apps, when it is
          on and remote control is switched on. With no desktop online it still runs a chat with your
          connections and memory. The only way to load an app or a skill is through the desktop. See{' '}
          <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.
        </p>
        <h2>The Model Router</h2>
        <p>
          Point any client at one base URL: Claude Code, Codex, Cursor, your own agents, or the desktop. The
          Router carries every model your organization approved, with roles that decide who gets what and one
          budget that every token is paid from, at a published rate per model per plan.
        </p>
        <ul>
          <li><strong>Any client.</strong> The desktop is one client, not a requirement.</li>
          <li><strong>Frontier where it counts.</strong> Spend frontier models on the hard turns and open weights on the rest.</li>
          <li><strong>Governed by you.</strong> Approve models, set budgets, and gate tools by team. Every token is accounted for.</li>
        </ul>
        <h2>The products</h2>
        <Doors />
        <h2>Next steps</h2>
        <ol>
          <li><a href={`${DOCS}/ada-introduction`}>Ada</a>: the model, how it works, and the four steps.</li>
          <li><a href={`${DOCS}/glyph`}>The glyph</a>: the primitive and the five operations that build it.</li>
          <li><a href={`${DOCS}/quick-start`}>Quick start</a>: install, pick a folder, pick a model, build.</li>
          <li><a href={`${DOCS}/install`}>Sign in and install</a>: the desktop, the web app, the console.</li>
          <li><a href={`${DOCS}/web-app`}>app.glyphh.ai</a>: the web, built to reach your desktop.</li>
          <li><a href={`${DOCS}/work-and-code`}>Work and Code</a>: the agent and its two kinds of session.</li>
          <li><a href={`${DOCS}/gateway`}>Model Router</a>: one endpoint, every model, your budgets.</li>
          <li><a href={`${DOCS}/own-cli`}>Your own CLI</a>: point Claude Code or Codex at the Router.</li>
          <li><a href={`${DOCS}/connections`}>Connections</a>: your apps as tools, over MCP.</li>
        </ol>
        <p>
          The code is at <a href="https://github.com/glyphh-ai">github.com/glyphh-ai</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'quick-start',
    title: 'Quick start',
    lede: 'Install, pick a folder, pick a model, say what to build. Four steps.',
    body: (
      <>
        <h2>1. Install and sign in</h2>
        <p>
          <a href="https://glyphh.ai/#download">Download the desktop</a> and sign in: it opens your browser,
          you approve the device, and the app picks up the session. The desktop is where you build. Or open{' '}
          <a href="https://app.glyphh.ai">app.glyphh.ai</a> and sign in with your email and the magic link it
          sends, or with Google: the same account, in a browser, made to drive your desktop.
        </p>
        <Shot file="sign-in.png" alt="The sign-in page at app.glyphh.ai: Continue with Google, or an email address for a magic link." width={760} caption="app.glyphh.ai. The same account as the desktop." />
        <p>More: <a href={`${DOCS}/install`}>Sign in and install</a>.</p>
        <h2>2. Pick where the session works</h2>
        <p>
          Click the folder chip on the composer and pick a folder on your desktop. From app.glyphh.ai the chip
          lists the folders your desktop granted for remote control; turn it on there under{' '}
          <strong>Settings &rarr; Remote control</strong>. A folder that is not granted shows a lock. With no
          desktop online you can still chat; a Code session needs a folder on a desktop. The place is set by
          the first turn and stays.
        </p>
        <Shot file="session-place.png" alt="The folder chip's menu on the web, titled Where this session works: a search box, then a section for the attached desktop, Christopher's Mac Studio, with the folders web and sdk and a Browse row under /Users/you/projects." width={340} caption="Where this session works: a folder on your desktop." />
        <p>More: <a href={`${DOCS}/where-a-session-works`}>Where a session works</a>.</p>
        <h2>3. Pick a model</h2>
        <p>
          The model chip reads <strong>Default</strong> and the model&rsquo;s name. Default is your
          team&rsquo;s model. Click the chip to pick another from what your team allows. The chip beside it is
          the effort dial.
        </p>
        <Shot file="model-picker.png" alt="The model menu over the composer: a search box, Default with a check, then claude-sonnet-4-5, gemini-2.5-pro and gpt-5 with their providers." width={410} caption="The model chip. Default is your team's model." />
        <p>More: <a href={`${DOCS}/pick-a-model`}>Pick a model</a>.</p>
        <h2>4. Say what to build</h2>
        <p>Type it and press Enter. The agent works in the folder you picked, on the model you picked.</p>
        <Shot file="composer.png" alt="The composer: the folder chip reading web, No git, the prompt field Describe what to build or fix, Ask mode, the model chip and the effort chip." width={890} caption="The composer. Folder, prompt, model, effort." />
        <h2>Work or Code</h2>
        <Row k="Work">The model, your connections and your memory. No files. Runs anywhere, in the browser too</Row>
        <Row k="Code">A folder on your desktop: files, terminals and the CLIs</Row>
        <p>
          The switch at the top of the rail picks the kind. A session is born one kind and stays it. More:{' '}
          <a href={`${DOCS}/work-and-code`}>Work and Code</a>.
        </p>
      </>
    ),
  },
];

const start = [
  {
    slug: 'ada-introduction',
    title: 'Introduction',
    lede: 'A glyph is a mathematical structure that carries state: hierarchical, weighted, typed, temporal, and a universal primitive.',
    body: (
      <>
        <p>
          Ada is Glyphh AI&rsquo;s first model to use it. The loop is four steps:
        </p>
        <ol>
          <li><strong>Define the glyph space.</strong> The layers, segments and roles your data has, and what each one weighs.</li>
          <li><strong>Encode your data.</strong> Each object becomes a glyph in that space.</li>
          <li><strong>Send like glyphs.</strong> A query is a glyph of the same shape.</li>
          <li><strong>Receive fact trees.</strong> What is near it, how near, and why.</li>
        </ol>
        <GlyphFlow />
        <p>
          The distance between two objects in glyph space can be calculated at multiple dimensions, ranked, and
          rationalized.
        </p>
        <GlyphDistance />
        <p>
          When we ask a large language model (LLM) a question, we are pushing text into a model designed to
          return a response, intrinsic to the expectation it was built to serve. It answers whether or not it
          knows. A glyph space does not respond. It measures: how far apart two things are, at every level, and
          why. When nothing is close, it says so.
        </p>
        <LlmVsGlyphh />
        {/* The glyph, any-type, math, lattice and products sections are off this page (his order, 2026-10-01); the glyph, math and patterns live on their own pages. Hidden, not deleted. */}
        {false && (
          <>
        <h2>The glyph</h2>
        <p>
          <strong>A glyph is meaning as a mathematical structure.</strong> It carries state, and it is
          hierarchical, weighted, typed and temporal. It is a universal primitive: the one thing every gated
          data substrate is stored in.
        </p>
        <p>
          The structure is hierarchical. A glyph is made of glyphs: a value is a glyph, a role bound to its value
          is a glyph, a group of those is a glyph, and a group of groups is a glyph. Every operation returns the
          type it takes, so a glyph nests to any depth, and the whole and every part of it are the same kind of
          thing.
        </p>
        <Code>{`ticket                                        a glyph
  issue                                       a glyph
    body                                      a glyph
      title       "pods crash on boot"        a glyph
      component   "kubelet"                   a glyph
      severity    7                           a glyph
  meta                                        a glyph
    time                                      a glyph
      opened      2026-10-01                  a glyph`}</Code>
        <Row k="Hierarchical">Meaning has parts, and the parts have parts. You can compare two whole glyphs, one branch, or one role. The same value at a different place in the hierarchy is a different thing.</Row>
        <Row k="Weighted">Every level carries a weight: its voice in the level above. Weights say which parts decide, and they can be set on the model or on a single query.</Row>
        <Row k="Typed">State goes in as typed JSON. A plain value, a set, text and a number are each encoded their own way, so near numbers score as near and unrelated values do not.</Row>
        <Row k="Temporal">Every glyph is stamped with its time, and a sequence folds into one glyph in which order matters and recent items count most. What was true, and when, stays in the record.</Row>
        <Row k="Gated">Every level carries the clearance a reader needs to see it. Below that clearance the part scores nothing and is cut from the answer, so one substrate serves readers with different access.</Row>
        <Row k="Universal">One primitive for any state of any shape. What it stands for is yours to decide; the language does not assume a use.</Row>
        <p>
          An answer keeps the shape: a fact tree with the same hierarchy as the glyph, and at every node its
          score, its weight, and its share of the node above.
        </p>
        <p>
          Comparing two glyphs is arithmetic. The same two states always give the same number. Nothing is
          generated and nothing is sampled, and there is no model in the read path.
        </p>
        <h2>One primitive, any type</h2>
        <p>The same primitive expresses the things programs are made of. A few of them:</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>As a</th><th>The glyphs are</th><th>A query returns</th></tr></thead>
            <tbody>
              <tr><td><strong>Switch statement</strong></td><td>The cases, each with the branch to take</td><td>The nearest case, and how sure it is</td></tr>
              <tr><td><strong>Classifier</strong></td><td>Labelled examples</td><td>The label, with the examples behind it</td></tr>
              <tr><td><strong>Router</strong></td><td>What each agent, tool or model is for</td><td>Where this piece of work should go</td></tr>
              <tr><td><strong>Memory</strong></td><td>Facts, in the shape you gave them</td><td>The facts that match, exactly</td></tr>
              <tr><td><strong>Precedent</strong></td><td>What was tried, and whether it worked</td><td>What to do, and what to avoid</td></tr>
              <tr><td><strong>Code primitive</strong></td><td>Any typed value your program holds</td><td>A match your code branches on</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          In each case the answer is the same kind of thing: a typed result with a confidence, and a fact tree
          that says why. Your code reads it and decides.
        </p>
        <h2>The math</h2>
        <p>
          The model is a vector-symbolic architecture, also called hyperdimensional computing. Every glyph, at
          every level, is a vector of one fixed dimension, in the thousands. Five operations build and read
          them, and each one returns a glyph.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Operation</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td><strong>Symbol</strong></td><td>A name or a value becomes a glyph. The same input gives the identical glyph on any machine. Unrelated symbols are almost exactly orthogonal, so they do not interfere.</td></tr>
              <tr><td><strong>Bind</strong></td><td>Ties a role to its value (<code>severity</code> to <code>7</code>). The result resembles neither input, so the same value in a different role is a different thing.</td></tr>
              <tr><td><strong>Bundle</strong></td><td>Superposes glyphs into one that resembles all of them, each with a weight. The result is a glyph, so bundles nest and weights live at every level. This is what makes the hierarchy.</td></tr>
              <tr><td><strong>Roll</strong></td><td>Rotates a glyph to mark depth, position or order. A child is rolled before it binds into its parent, which keeps paths apart.</td></tr>
              <tr><td><strong>Compare</strong></td><td>The similarity of two glyphs. It tracks the weighted share of what they have in common, at whichever level you compare.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Values are encoded by type. A plain value is a symbol. A list is a set. Text can be the set of its
          words. A number becomes every step at or below it, so 7 and 8 share most of their steps and score as
          near, while 7 and 70 do not. A sequence where order matters folds into one glyph in which recent items
          count most.
        </p>
        <h2>The layered lattice</h2>
        <p>
          A model names its hierarchy as a lattice: <strong>layers</strong>, each made of{' '}
          <strong>segments</strong>, each made of <strong>roles</strong>. Roles bundle into their segment&rsquo;s
          glyph, segments into their layer&rsquo;s, layers into the model&rsquo;s. Every level carries two
          weights.
        </p>
        <Code lang="json">{`{
  "name": "tickets",
  "layers": [
    { "name": "issue", "similarity_weight": 1.0, "segments": [
      { "name": "body", "roles": [
        { "name": "title", "text_encoding": "bag_of_words" },
        { "name": "component" },
        { "name": "severity", "numeric_config": { "min_value": 0, "max_value": 10, "bin_width": 1 } }
      ] }
    ] },
    { "name": "meta", "security_weight": 0.8, "segments": [
      { "name": "time", "roles": [ { "name": "opened" } ] }
    ] }
  ]
}`}</Code>
        <Row k="similarity_weight">How much that layer, segment or role counts when two glyphs are compared.</Row>
        <Row k="security_weight">The clearance a reader needs to see it. Below that clearance, the part scores nothing and is cut from the answer.</Row>
        <p>
          A query scores only the roles it gives. Ask with a title and a severity and the answer is decided by
          those two, wherever they sit in the lattice.
        </p>
        <h2>What you build on it</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Product</th><th>What it is</th><th>Start at</th></tr></thead>
            <tbody>
              <tr><td><strong>Ada</strong></td><td>The language, served. Define a typed model, load data in that shape, and query it from any agent or program.</td><td><a href={`${DOCS}/ada`}>Ada models</a></td></tr>
              <tr><td><strong>Glyphh Desktop</strong></td><td>The agent, skills, tasks and tools on your machine, with any model.</td><td><a href={`${DOCS}/install`}>Install and sign in</a></td></tr>
              <tr><td><strong>Model Router</strong></td><td>One endpoint for every model, with your organization&rsquo;s budgets and rates.</td><td><a href={`${DOCS}/gateway`}>The Router</a></td></tr>
              <tr><td><strong>Connect</strong></td><td>Your apps as tools over MCP, governed by team.</td><td><a href={`${DOCS}/connections`}>Connections</a></td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The position in one line: <strong>AI at build time, not runtime.</strong> Use models to build typed,
          predictable programs, then run them on your data without a model in the path.
        </p>
          </>
        )}
        <h2>Next steps</h2>
        <ol>
          <li><a href={`${DOCS}/ada-install`}>Install</a>: connect Claude Code or any MCP client, or use an API key.</li>
          <li><a href={`${DOCS}/quickstart`}>Quickstart</a>: create a model, record into it, and query it.</li>
          <li><a href={`${DOCS}/primer`}>Primer</a>: why Ada measures meaning instead of generating text.</li>
          <li><a href={`${DOCS}/glyph`}>The glyph</a>: the primitive, and the five operations that build it.</li>
          <li><a href={`${DOCS}/fact-trees`}>Fact trees</a>: how Ada reports what it found and how sure it is, and how to build on that.</li>
          <li><a href={`${DOCS}/patterns`}>Patterns</a>: a switch, a classifier, a router, memory, precedent.</li>
        </ol>
      </>
    ),
  },
  {
    slug: 'quickstart',
    title: 'Quickstart',
    lede: 'Create a typed model, record into it, and query it.',
    body: (
      <>
        <p>
          You need a Glyphh account and one client connected: see <a href={`${DOCS}/ada-install`}>Install</a>. Every call
          below is a tool your agent can call, and the same call as an <code>op</code> at <code>POST /ada</code>.
        </p>
        <h2>1. Create a model</h2>
        <p>
          An org admin creates a model once, with a spec that gives every field a type. It gets an id that every
          later call names.
        </p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "op": "create_model", "name": "tickets", "storage": "cloud",
    "spec": {
      "name": "tickets",
      "layers": [ { "name": "ticket", "segments": [ { "name": "issue", "roles": [
        { "name": "component", "type": "category" },
        { "name": "symptom", "type": "category" },
        { "name": "severity", "type": "number",
          "numeric_config": { "min_value": 0, "max_value": 10, "bin_width": 1 } }
      ] } ] } ]
    }
  }'`}</Code>
        <p>
          A spec nests layers, segments and roles. The types are <code>category</code>, <code>set</code>,{' '}
          <code>number</code>, <code>text</code>, <code>boolean</code> and <code>time</code>: see{' '}
          <a href={`${DOCS}/ada-typed`}>Typed models</a>.
        </p>
        <h2>2. Record</h2>
        <p>Send data in the spec&rsquo;s shape, and what it resolved to.</p>
        <Code lang="json">{`{
  "op": "record",
  "model_id": "am_0123456789ab",
  "situation": { "ticket": { "issue": { "component": "kubelet", "symptom": "crash_on_boot", "severity": 7 } } },
  "outcome": "route_to_platform"
}`}</Code>
        <p>Data that does not fit its type is refused, and nothing is stored. A severity of <code>&quot;high&quot;</code> answers:</p>
        <Code lang="json">{`{ "error": { "code": "E_VALIDATION",
  "message": "situation: ticket.issue.severity: a numeric role takes a finite number" } }`}</Code>
        <h2>3. Query</h2>
        <p>Send a like object with the roles you are asking about. Only those are scored.</p>
        <Code lang="json">{`{
  "op": "query",
  "model_id": "am_0123456789ab",
  "situation": { "ticket": { "issue": { "component": "kubelet", "symptom": "crash_on_boot" } } }
}`}</Code>
        <p>The answer gives your code one thing to branch on:</p>
        <Code lang="json">{`{ "act": true, "reason": "reflex", "top": "route_to_platform",
  "exact": true, "confidence": 1.0, "count": 1, "unseen": [] }`}</Code>
        <p>
          Ask about a component the model was never shown. Ada still returns the closest match, and says not to
          act on it alone:
        </p>
        <Code lang="json">{`{ "act": false, "reason": "unseen", "top": "route_to_platform",
  "exact": false, "unseen": ["ticket.issue.component=etcd"] }`}</Code>
        <p>
          <code>top</code> and the records behind it come back either way. <code>act</code> is a separate yes or
          no for code that branches without reading the answer, and you choose per model whether a best guess is
          enough. <a href={`${DOCS}/ada-act`}>When Ada acts</a> covers every case in detail.
        </p>
        <h2>4. Ask why</h2>
        <p>
          The same question with <code>&quot;op&quot;: &quot;facts&quot;</code> returns the nearest records as{' '}
          <a href={`${DOCS}/fact-trees`}>fact trees</a>: which parts matched, how closely, and how much each counted.
          Asked about a kubelet ticket at severity 9, the record at severity 7 scores 0.9: the component is the
          same (1.0) and the severity is two bins of ten apart (0.8).
        </p>
        <h2>Without a spec</h2>
        <p>
          Leave <code>spec</code> out and the model is flat: it takes JSON of any shape and weighs its keys. That
          is quick for an agent trying an idea. Nothing is checked on the way in, so give a model a spec before
          software depends on it.
        </p>
        <h2>From an agent</h2>
        <p>With the plugin or connector installed, ask in plain words:</p>
        <Code>{`Use Ada. Create a model called tickets, record how we routed the last
five incidents, then tell me where this new one should go and why.`}</Code>
      </>
    ),
  },
  {
    slug: 'primer',
    title: 'Primer',
    lede: 'Why Ada measures meaning instead of generating text.',
    body: (
      <>
        <p>
          When we ask a large language model (LLM) a question, we are pushing text into a model designed to
          return a response, intrinsic to the expectation it was built to serve. It answers whether or not it
          knows, and the same question can get a different answer tomorrow.
        </p>
        <p>
          Ada does not respond. It measures. Your data is encoded as glyphs in a space you define, a question is
          a glyph of the same shape, and the answer is the distance between them.
        </p>
        <LlmVsGlyphh />
        <div className="dx-table">
          <table>
            <thead><tr><th></th><th>A language model</th><th>Ada</th></tr></thead>
            <tbody>
              <tr><td><strong>Returns</strong></td><td>Generated text</td><td>A measurement: what is near, how near, and why</td></tr>
              <tr><td><strong>Same input twice</strong></td><td>May differ</td><td>The same answer</td></tr>
              <tr><td><strong>When it does not know</strong></td><td>Answers anyway</td><td>Says nothing is close enough, or names what it was never shown</td></tr>
              <tr><td><strong>Evidence</strong></td><td>None by default</td><td>The records it stands on, by id</td></tr>
              <tr><td><strong>Learns by</strong></td><td>Training</td><td>Recording. A new record counts on the next query</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Where each one belongs</h2>
        <p>
          Use a language model to read, write and plan. Use Ada for anything your program decides more than
          once and needs to decide the same way: a route, a class, a branch, a lookup. The model asks Ada, reads
          the measurement, and acts on it.
        </p>
        <p>
          This is what we mean by <strong>AI at build time, not runtime</strong>: models help build the typed
          structure, and the structure answers without a model in the path.
        </p>
      </>
    ),
  },
  {
    slug: 'glyph',
    title: 'The glyph',
    lede: 'The primitive, and the five operations that build it.',
    body: (
      <>
        <p>
          <strong>A glyph is meaning as a mathematical structure.</strong> It carries state, and it is
          hierarchical, weighted, typed and temporal. It is a universal primitive.
        </p>
        <p>
          A glyph is made of glyphs: a value is a glyph, a role bound to its value is a glyph, a group of those
          is a glyph, and a group of groups is a glyph. Every operation returns the type it takes, so a glyph
          nests to any depth.
        </p>
        <GlyphTree />
        <Traits />
        <h2>The five operations</h2>
        <p>
          The model is a vector-symbolic architecture, also called hyperdimensional computing. Every glyph, at
          every level, is a vector of one fixed dimension, in the thousands.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Operation</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td><strong>Symbol</strong></td><td>A name or a value becomes a glyph. The same input gives the identical glyph on any machine.</td></tr>
              <tr><td><strong>Bind</strong></td><td>Ties a role to its value. The result resembles neither input, so the same value in a different role is a different thing.</td></tr>
              <tr><td><strong>Bundle</strong></td><td>Superposes glyphs into one that resembles all of them, each with a weight. Bundles nest, which is what makes the hierarchy.</td></tr>
              <tr><td><strong>Roll</strong></td><td>Rotates a glyph to mark depth, position or order, which keeps paths apart.</td></tr>
              <tr><td><strong>Compare</strong></td><td>The similarity of two glyphs: the weighted share of what they have in common, at whichever level you compare.</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Weights</h2>
        <p>Weights mirror the data. A number weighs a key; an object weighs inside it. Unlisted keys weigh 1.</p>
        <Code lang="json">{`{ "severity": 2, "component": 1, "reporter": 0 }`}</Code>
        <p>Set them on the model as defaults, or pass them on one query.</p>
      </>
    ),
  },
  {
    slug: 'fact-trees',
    title: 'Fact trees',
    lede: 'How Ada reports what it found and how sure it is, and how to build on that.',
    body: (
      <>
        <p>
          Every answer comes with its reasons. A fact tree has the same hierarchy as the glyph, and at every node
          it says how well that part matched and how much it counted.
        </p>
        <FactTreeFig />
        <h2>A node</h2>
        <Row k="key">The part of the glyph this node is about.</Row>
        <Row k="score">How well that part matched, 0 to 1.</Row>
        <Row k="weight">How much that part counts.</Row>
        <Row k="share">Its contribution to the node above. The shares of the parts add up to the score of the whole.</Row>
        <Row k="status">Whether the part was in both glyphs, only the query, or only the record.</Row>
        <Row k="match">At a leaf both carry, how the two values compare: <code>same</code>, <code>lexical</code> (another way to say it), <code>partial</code> (two sets or texts that share some items), <code>near</code> (two numbers some bins apart) or <code>different</code>.</Row>
        <p>A leaf&rsquo;s score is exact. Two different values score 0, never a small accidental number.</p>
        <h2>A record</h2>
        <p>
          Each situation that comes back carries its tree and its citation. A situation recorded many times with
          one outcome is one tree, counted.
        </p>
        <Row k="id">The newest record of it, so you can look it up.</Row>
        <Row k="key">The situation&rsquo;s identity. Records that share it are the same situation at different times.</Row>
        <Row k="outcome">What it resolved to.</Row>
        <Row k="score">The weighted match of the whole situation.</Row>
        <Row k="count, first, latest">How many times it was recorded, and when first and last.</Row>
        <Row k="probability">The chance of that outcome given the question, across the records that are close enough.</Row>
        <Row k="author, ts">Who recorded it, and when.</Row>
        <h2>The answer</h2>
        <p>A query sums the records up, and gives your code one thing to branch on:</p>
        <AnswerFig />
        <Row k="top">The leading outcome.</Row>
        <Row k="confidence">How strongly the nearest records agree on it.</Row>
        <Row k="count">How many records stand behind it.</Row>
        <Row k="sufficient">Whether anything was close enough to answer at all.</Row>
        <Row k="unseen">What the question carries that the model was never shown.</Row>
        <Row k="act">True when the answer is confident, nothing in the question is new, and no newer recorded failure rules it out.</Row>
        <Row k="reason">Why <code>act</code> is what it is. Each value is explained in <a href={`${DOCS}/ada-act`}>When Ada acts</a>.</Row>
        <h2>Building on it</h2>
        <ul>
          <li><strong>Gate on <code>act</code>.</strong> Branch when it is true. When it is false, read <code>reason</code>, fall back to a person or a model, and record what they decide. <a href={`${DOCS}/ada-act`}>When Ada acts</a> has each case.</li>
          <li><strong>Read <code>count</code>.</strong> One record is not consensus, unless it is the same situation (<code>exact</code>).</li>
          <li><strong>Hold the shape.</strong> <code>{'{"op": "contract"}'}</code> returns the JSON Schema of every answer, so your program&rsquo;s types come from the source.</li>
          <li><strong>Show the tree.</strong> When someone asks why, the shares are the explanation. No second call to a model is needed.</li>
          <li><strong>Calibrate.</strong> Once a model has ten or more records with outcomes, calibration fits its probabilities to its own history.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'patterns',
    title: 'Patterns',
    lede: 'One primitive, used as the things programs are made of.',
    body: (
      <>
        <p>
          In every pattern the move is the same: record objects with what they resolve to, send a like object,
          and branch on the answer.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Pattern</th><th>You record</th><th>A query returns</th></tr></thead>
            <tbody>
              <tr><td><strong>Switch</strong></td><td>The cases, each with the branch to take</td><td>The nearest case, and whether to act on it</td></tr>
              <tr><td><strong>Classifier</strong></td><td>Examples, each with its label</td><td>The label, with the examples behind it</td></tr>
              <tr><td><strong>Router</strong></td><td>What each agent, tool or model is for</td><td>Where this piece of work should go</td></tr>
              <tr><td><strong>Memory</strong></td><td>Facts, in the shape you gave them</td><td>The facts that match</td></tr>
              <tr><td><strong>Precedent</strong></td><td>What was tried, and whether it worked</td><td>What to do, and what to avoid</td></tr>
              <tr><td><strong>A thing over time</strong></td><td>Each version of a deal, a ticket, a device</td><td>What changed, where it is heading, and its next version</td></tr>
            </tbody>
          </table>
        </div>
        <h2>A switch</h2>
        <p>Record each case once. The outcome is the branch.</p>
        <Code lang="json">{`{ "situation": { "intent": "refund", "amount_band": "under_50" }, "outcome": "auto_approve" }
{ "situation": { "intent": "refund", "amount_band": "over_500" }, "outcome": "send_to_human" }`}</Code>
        <p>
          Your code queries and branches on <code>top</code> when <code>act</code> is true. A case that was never
          recorded, such as a new intent, comes back with <code>act</code> false and <code>reason</code>{' '}
          <code>unseen</code>: the switch has a default branch. A router that should take the nearest destination
          anyway sets <code>unseen: true</code> in its scale (<a href={`${DOCS}/ada-act`}>When Ada acts</a>).
        </p>
        <h2>A router</h2>
        <p>Record what each destination handles. The outcome is the destination.</p>
        <Code lang="json">{`{ "situation": { "domain": "billing", "needs": ["ledger", "stripe"] }, "outcome": "billing_agent" }
{ "situation": { "domain": "infra", "needs": ["kubectl"] }, "outcome": "platform_agent" }`}</Code>
        <h2>Precedent</h2>
        <p>
          Record a win when something worked and a failure when it did not. A recorded failure of an outcome
          close to the question blocks <code>act</code>, however many wins agree.
        </p>
        <h2>A thing over time</h2>
        <p>
          In a <a href={`${DOCS}/ada-typed`}>typed model</a>, mark the roles that identify a thing as key parts and
          record it each time it changes. <a href={`${DOCS}/ada-time`}>Versions and time</a> covers reading its
          history, its trend and its next version.
        </p>
        <h2>Keep situations clean</h2>
        <ul>
          <li>Give only the attributes that should decide, as short canonical values.</li>
          <li>Use the same keys every time for the same kind of object.</li>
          <li>Leave out ids, paths, names and timestamps, or weigh them 0.</li>
        </ul>
        <h2>The data is the model</h2>
        <p>
          Ada compares exactly, by type. So the shape you give a record is the model, and a wrong shape shows
          in the fact tree the first time you ask. Learned building a colour classifier from pixels, where it
          took three shapes to get one that worked:
        </p>
        <ul>
          <li><strong>An absent value is not a zero.</strong> Record only what a thing has. A field at 0 on every record agrees with every question, and the vote fills with records that share nothing real. Twelve hue bins, ten of them 0, made every image look alike.</li>
          <li><strong>A histogram or a profile is a set, not a row of numbers.</strong> Encode each part as tokens by its size (<code>orange1 … orange8</code>, <code>red1</code>) in a <code>set</code> role: two things then score by what they share over what either has. As twelve independent numbers, a 1% trace scored 0 against a missing value, and agreeing on small bins counted as much as agreeing on the big one.</li>
          <li><strong>Drop traces before you compare,</strong> and do it the same way on the record and in the question.</li>
          <li><strong>A number needs the right scale.</strong> <code>bin_width</code> is the difference that counts as near. Too fine and nothing is near; too coarse and everything is.</li>
          <li><strong>A category that may grow is open</strong> (no <code>values</code>): a new value is <code>unseen</code>, the model says so and a person decides. One that must not grow lists its values and refuses the rest.</li>
          <li><strong>Identity is a key part with weight 0.</strong> A thing that changes is recorded again under the same key parts: versions, not new things.</li>
          <li><strong>Roles that only mean something together</strong> share a segment with <code>together</code>.</li>
          <li><strong>Weigh what decides.</strong> At ten or more wins, <code>ada_calibrate</code> fits the vote and <code>ada_learn</code> finds the weights from the records. Read what it learned: a role at 0 no longer guards <code>unseen</code>.</li>
          <li><strong>When an answer is off, the fact tree says which kind of wrong.</strong> The right nearest records with a wrong vote is a weighting problem. The wrong nearest records is a representation problem. <code>unseen</code> on something that is not new is a threshold, or a category that should be open.</li>
          <li><strong>Test what the model must refuse</strong> as well as what it must answer, with a few records, before you load them all. A spec is fixed after the first record, bar its weights.</li>
        </ul>
      </>
    ),
  },
];


const byslug = Object.fromEntries([...start, ...ada].map((p) => [p.slug, p]));
const ADA = ['ada-introduction', 'ada-install', 'quickstart', 'primer', 'glyph', 'fact-trees', 'patterns', 'ada', 'ada-act', 'ada-typed', 'ada-time', 'ada-edges', 'ada-graph', 'ada-gql', 'ada-procedures', 'ada-tools', 'ada-sdk', 'ada-guide-tickets', 'ada-guide-churn'].map((x) => byslug[x]);

// The Ada group is listed only with Ada on; off, its pages are not pages (404).
export const GROUPS = [{ title: 'Glyphh', pages: glyphh }, { title: 'Ada', pages: ADA }, ...PRODUCT_GROUPS];
export const PAGES = GROUPS.flatMap((g) => g.pages);
export const hrefOf = (p) => (p.slug === 'introduction' ? DOCS : `${DOCS}/${p.slug}`);
