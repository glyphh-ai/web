import { Code, Row, GlyphFlow, GlyphDistance, GlyphTree, Traits, LlmVsGlyphh } from './ui';
import { REFERENCE_GROUPS, MODEL_PAGES } from './pages';
import { DOCS } from './base';

// The docs, written from the code: rrotor (the runtime and its API), the
// kernel, glyphh-ai/glyphh (the plugin and the SDKs) and the server's
// docs/pricing.md. When the product changes, the page changes in the same push.

const glyphh = [
  {
    slug: 'introduction',
    title: 'Introduction',
    lede: 'Glyphh is a platform and runtimes. Your Ada models live and run in your own runtime, called by Claude and by your software.',
    body: (
      <>
        <div className="dx-table">
          <table>
            <thead><tr><th>Part</th><th>What it is</th><th>Where</th></tr></thead>
            <tbody>
              <tr><td><strong>The platform</strong></td><td>Sign in, your runtimes and their keys, approvals, billing, your org</td><td><a href="https://platform.glyphh.ai">platform.glyphh.ai</a></td></tr>
              <tr><td><strong>A runtime</strong></td><td>Where your models live and run. Hosted by Glyphh, or run on your own infrastructure. Nothing of Glyphh’s is between your callers and it</td><td><code>https://&lt;machine&gt;.glyphh.app</code> or <code>https://&lt;host&gt;</code></td></tr>
              <tr><td><strong>Ada</strong></td><td>A typed spec and a precedent store: a new case is answered from the cases closest to it, with the precedents it stands on</td><td>In your runtime, on every plan</td></tr>
              <tr><td><strong>The <code>glyphh</code> plugin</strong></td><td>For Claude Code: your account, the Ada skill and the file ledger</td><td><a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a></td></tr>
              <tr><td><strong>The SDKs</strong></td><td>Ada for Python (<code>glyphh</code>) and TypeScript (<code>@glyphh-ai/glyphh</code>)</td><td><a href="https://github.com/glyphh-ai/glyphh">github.com/glyphh-ai/glyphh</a></td></tr>
            </tbody>
          </table>
        </div>
        <h2>Next steps</h2>
        <ol>
          <li><a href={`${DOCS}/quick-start`}>Quick start</a>: a runtime, Claude connected, a first model.</li>
          <li><a href={`${DOCS}/ada-introduction`}>What Ada is</a>: why it measures instead of generating.</li>
          <li><a href={`${DOCS}/ada`}>A model</a>: the three files and how a version is deployed.</li>
          <li><a href={`${DOCS}/runtimes`}>Runtimes</a>: hosted or self-hosted.</li>
        </ol>
      </>
    ),
  },
  {
    slug: 'quick-start',
    title: 'Quick start',
    lede: 'A runtime, Claude connected to it, and a first model built with Claude.',
    body: (
      <>
        <h2>1. Sign up</h2>
        <p>
          Open <a href="https://platform.glyphh.ai">platform.glyphh.ai</a> and continue with Google or GitHub.
        </p>
        <h2>2. Get a runtime</h2>
        <Row k="Hosted">On Pro, Team and Enterprise. <strong>Machines</strong>, New machine: a name and a size. The platform shows its connector URL, <code>https://&lt;machine&gt;.glyphh.app/mcp</code></Row>
        <Row k="Self-hosted">On every plan, Free included. <strong>Getting started</strong>: register the runtime with its public host, then deploy it with Docker Compose, Helm or Terraform. Its connector URL is <code>https://&lt;host&gt;/mcp</code></Row>
        <p>More: <a href={`${DOCS}/runtimes`}>Runtimes</a>.</p>
        <h2>3. Connect Claude</h2>
        <p>
          In Claude, <strong>Settings → Connectors</strong>, add a custom connector with the runtime’s connector
          URL and click Allow. You sign in with your Glyphh account; there is no key to type.
        </p>
        <h2>4. Install the plugin (Claude Code)</h2>
        <Code>{`/plugin marketplace add glyphh-ai/glyphh
/plugin install glyphh@glyphh`}</Code>
        <p>Its Ada skill tells Claude how to write, deploy and call a model on your runtime.</p>
        <h2>5. Build a model</h2>
        <p>Ask in plain words:</p>
        <Code>{`Build me an Ada model of our incidents: record the last twenty with the fix
that worked, then tell me the fix for this new error and why.`}</Code>
        <p>
          Claude writes the model’s three files, pushes them to your GitHub repo, deploys the commit and calls it.
          See <a href={`${DOCS}/ada`}>A model</a> and the <a href={`${DOCS}/ada-guide-incidents`}>guide</a>.
        </p>
      </>
    ),
  },
];

const ideas = [
  {
    slug: 'ada-introduction',
    title: 'What Ada is',
    lede: 'A typed spec and a precedent store. A new case is answered from the precedents closest to it.',
    body: (
      <>
        <p>
          Each case you record with its outcome becomes a precedent. Ask about a new case and Ada answers with the
          leading outcome, how sure it is, and the precedents it stands on. The same question always gets the same
          answer, no language model is in the path, and Ada says when nothing is close enough.
        </p>
        <ol>
          <li><strong>Define the space.</strong> The spec: the layers, segments and roles a case has, and what each one weighs.</li>
          <li><strong>Record.</strong> Each case, with its outcome, is encoded as a glyph in that space.</li>
          <li><strong>Ask.</strong> A question is a case of the same shape.</li>
          <li><strong>Read the answer.</strong> What is near, how near, and why, as fact trees.</li>
        </ol>
        <GlyphFlow />
        <p>The distance between two cases is calculated at every level of the spec, ranked, and explained.</p>
        <GlyphDistance />
        <h2>Measured, not generated</h2>
        <LlmVsGlyphh />
        <div className="dx-table">
          <table>
            <thead><tr><th></th><th>A language model</th><th>Ada</th></tr></thead>
            <tbody>
              <tr><td><strong>Returns</strong></td><td>Generated text</td><td>A measurement: what is near, how near, and why</td></tr>
              <tr><td><strong>Same input twice</strong></td><td>May differ</td><td>The same answer</td></tr>
              <tr><td><strong>When it does not know</strong></td><td>Answers anyway</td><td><code>sufficient: false</code>: nothing is close enough</td></tr>
              <tr><td><strong>Evidence</strong></td><td>None by default</td><td>The precedents it stands on, by id</td></tr>
              <tr><td><strong>Learns by</strong></td><td>Training</td><td>Recording. A new precedent counts on the next question</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Use a language model to read, write and plan. Use Ada for what your software decides more than once and
          must decide the same way: a route, a class, a fix, a policy. Claude builds the model; your software calls
          it.
        </p>
      </>
    ),
  },
  {
    slug: 'glyph',
    title: 'The glyph',
    lede: 'The primitive under Ada, and the five operations that build it.',
    body: (
      <>
        <p>
          A glyph is a case as a vector: hierarchical, weighted and typed. A value is a glyph, a role bound to its
          value is a glyph, a segment of those is a glyph, and so on up to the whole case. Every operation returns a
          glyph, so they nest to any depth.
        </p>
        <GlyphTree />
        <Traits />
        <h2>The five operations</h2>
        <p>
          Ada is a vector-symbolic architecture (hyperdimensional computing). Every glyph is a vector of one fixed
          dimension, 4,096 unless the spec says otherwise.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Operation</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td><strong>Symbol</strong></td><td>A name or a value becomes a glyph. The same input and seed give the identical glyph on any machine</td></tr>
              <tr><td><strong>Bind</strong></td><td>Ties a role to its value. The result resembles neither, so the same value in another role is another thing</td></tr>
              <tr><td><strong>Bundle</strong></td><td>Superposes glyphs, each with a weight, into one that resembles all of them. This makes the hierarchy</td></tr>
              <tr><td><strong>Roll</strong></td><td>Rotates a glyph to mark depth or position, which keeps paths apart</td></tr>
              <tr><td><strong>Compare</strong></td><td>The similarity of two glyphs, at whichever level you compare</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Values, by type</h2>
        <Row k="value">A symbol: exact match. An array is a set of symbols</Row>
        <Row k="text">With <code>text_encoding: &quot;bag_of_words&quot;</code>, the set of its words, read through the lexicon so related words correlate</Row>
        <Row k="number">With <code>numeric_config</code>, every bin edge at or below it, so 7 and 8 share most of their bins and 7 and 70 do not</Row>
        <p>
          The glyphs find the nearest precedents. The fact tree that explains each one is computed exactly, value
          by value: see <a href={`${DOCS}/fact-trees`}>Answers</a>.
        </p>
      </>
    ),
  },
];

const practice = [
  {
    slug: 'patterns',
    title: 'Patterns',
    lede: 'One model shape, used as the things programs are made of.',
    body: (
      <>
        <p>The move is always the same: record cases with what they resolved to, ask with a new case, act on the answer.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Pattern</th><th>You record</th><th>A question returns</th></tr></thead>
            <tbody>
              <tr><td><strong>Switch</strong></td><td>The cases, each with the branch to take</td><td>The nearest case’s branch, or nothing close enough</td></tr>
              <tr><td><strong>Classifier</strong></td><td>Examples, each with its label</td><td>The label, with the examples behind it</td></tr>
              <tr><td><strong>Router</strong></td><td>Work, each with who handled it</td><td>Where this piece of work should go</td></tr>
              <tr><td><strong>Precedent</strong></td><td>What happened, and the fix that worked</td><td>The fix, and the case it comes from</td></tr>
              <tr><td><strong>Policy</strong></td><td>Decisions, with <code>output.costs</code> for each mistake</td><td>The cheapest decision, or <code>ask</code> a person</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Shaping cases</h2>
        <ul>
          <li><strong>Give only what should decide,</strong> as short canonical values, with the same keys every time.</li>
          <li><strong>An absent value is not a zero.</strong> Record only what a case has. A field at 0 on every case agrees with every question.</li>
          <li><strong>A profile is a set, not a row of numbers.</strong> Encode each part as a token by its size (<code>orange1 … orange8</code>) in an array: two cases then score by what they share.</li>
          <li><strong>A number needs its scale.</strong> <code>bin_width</code> is the difference that counts as near. Too fine and nothing is near; too coarse and everything is.</li>
          <li><strong>Identity is a key part with weight 0.</strong> A later record with the same key replaces the earlier one.</li>
          <li><strong>Let it learn the weights.</strong> <code>learn</code> weighs every role by what the precedents say. A role learned to 0 tells nothing about the outcome.</li>
          <li><strong>Read the fact tree when an answer is off.</strong> The right precedents with the wrong vote is a weighting problem; the wrong precedents is a shape problem.</li>
          <li><strong>Record only confirmed outcomes.</strong> Never a guess.</li>
        </ul>
      </>
    ),
  },
];

const ADA = [...ideas, ...MODEL_PAGES, ...practice];

export const GROUPS = [{ title: 'Glyphh', pages: glyphh }, { title: 'Ada', pages: ADA }, ...REFERENCE_GROUPS];
export const PAGES = GROUPS.flatMap((g) => g.pages);
export const hrefOf = (p) => (p.slug === 'introduction' ? DOCS : `${DOCS}/${p.slug}`);
