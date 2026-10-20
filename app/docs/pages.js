import { Note, Row, Code, FactTreeFig, AnswerFig } from './ui';
import { DOCS } from './base';

// The reference pages: a model, its spec, its answers, tuning, the guide; the
// runtime and how it is called; the account. Each one written from the code
// (rrotor, the kernel, glyphh-ai/glyphh, the server's docs/pricing.md).

const RUNTIME = 'https://<machine>.glyphh.app';

export const MODEL_PAGES = [
  {
    slug: 'ada',
    title: 'A model',
    lede: 'A GitHub repo with three files. A version is a commit, deployed to your runtime.',
    body: (
      <>
        <div className="dx-table">
          <table>
            <thead><tr><th>File</th><th>What it is</th></tr></thead>
            <tbody>
              <tr><td><code>glyphh.json</code></td><td>The manifest: the model’s name, <code>&quot;needs&quot;: [&quot;ada&quot;]</code>, <code>&quot;data&quot;: true</code>, and its functions, each with a JSON Schema of its inputs</td></tr>
              <tr><td><code>spec.json</code></td><td>What a case looks like: see <a href={`${DOCS}/ada-typed`}>The spec</a></td></tr>
              <tr><td><code>model.py</code></td><td>The functions. <code>load</code> opens the model; each function calls the kernel and answers a <code>Result</code></td></tr>
            </tbody>
          </table>
        </div>
        <Code lang="python">{`from rrotor import Result, ada

def load(ctx):
    ada.open(ctx)                      # the spec and the precedent store, on ctx.ada

def record(ctx, inputs):
    return Result.done({"id": ctx.ada.record(inputs["data"], inputs.get("outcome"))})

def query(ctx, inputs):
    return Result.done(ctx.ada.query(inputs["data"], clearance=ctx.clearance).to_json())`}</Code>
        <h2>The functions</h2>
        <p>
          A model has the functions its manifest names. The examples in{' '}
          <a href="https://github.com/glyphh-ai/rrotor/tree/main/examples">rrotor’s <code>examples/</code></a> have these:
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Function</th><th>Inputs</th><th>Answers</th></tr></thead>
            <tbody>
              <tr><td><code>record</code></td><td><code>{'{data, outcome?}'}</code></td><td>Keeps a case, with its outcome when known: a precedent</td></tr>
              <tr><td><code>query</code></td><td><code>{'{data}'}</code></td><td>The leading outcome, its confidence and the precedents behind it</td></tr>
              <tr><td><code>facts</code></td><td><code>{'{data, top?}'}</code></td><td>The closest precedents, best first, as fact trees</td></tr>
              <tr><td><code>probabilities</code></td><td><code>{'{data}'}</code></td><td>P(outcome | case) over the nearest precedents</td></tr>
              <tr><td><code>decide</code></td><td><code>{'{data}'}</code></td><td>The outcome when confident; else asks a person (<code>needs_input</code>) and records the answer</td></tr>
              <tr><td><code>learn</code></td><td><code>{'{sample?, by?}'}</code></td><td>Weighs the roles from the precedents and calibrates: see <a href={`${DOCS}/ada-tuning`}>Learning and tuning</a></td></tr>
              <tr><td><code>settings</code></td><td><code>{'{changes?}'}</code></td><td>Reads or changes the model’s levers, live</td></tr>
              <tr><td><code>start</code></td><td><code>{'{}'}</code></td><td>How many precedents the model holds. The function called when none is named</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          <code>ctx.ada</code> is the kernel’s model: <code>record</code>, <code>query</code>, <code>facts</code>,{' '}
          <code>probabilities</code>, <code>learn</code>, <code>calibrate</code>, <code>refresh</code>,{' '}
          <code>decide</code>. Pass <code>clearance=ctx.clearance</code> to every read so each caller sees only what
          they may.
        </p>
        <h2>Deploying</h2>
        <ol>
          <li>Commit the three files and push to a GitHub repo.</li>
          <li>Deploy the commit: <code>model_deploy {'{repo, commit, token?}'}</code> from Claude, or <code>POST /v1/models/deploy</code>. A private repo needs a token. The runtime answers <code>{'{model, version, commit_sha}'}</code>.</li>
          <li>The new version is active. The precedent store, <code>precedents.sqlite</code> in the model’s data folder, outlives every version.</li>
        </ol>
        <ul>
          <li>A manifest with an unknown key, a <code>name</code> that differs from the model’s, or a function not in <code>model.py</code> is refused.</li>
          <li>A changed <code>seed</code> or <code>dimension</code> re-encodes the store on deploy. If that fails, the deploy is refused (<code>E_ADA_ENCODING</code>) and the version before stays active.</li>
          <li>Each run is sandboxed, limited by the manifest’s <code>limits</code> (<code>seconds</code>, <code>memory_mb</code>), and reaches no network but the <code>hosts</code> its manifest declares.</li>
        </ul>
        <h2>Size</h2>
        <p>
          About 16 KB of memory per precedent. A hosted runtime holds up to the plan’s managed precedents, all its
          models together: a <code>record</code> past them fails with <code>E_LIMIT_PRECEDENTS</code>. A
          self-hosted runtime has no cap. See <a href={`${DOCS}/plans`}>Plans</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-typed',
    title: 'The spec',
    lede: 'spec.json: layers of segments of roles. Every case is data in that shape.',
    body: (
      <>
        <Code lang="json">{`{
  "name": "tickets",
  "seed": 42,
  "dimension": 4096,
  "temporal_source": "meta.time.opened",
  "settings": { "min_sim": 0.35 },
  "layers": [
    { "name": "issue", "segments": [
      { "name": "body", "roles": [
        { "name": "title", "text_encoding": "bag_of_words" },
        { "name": "component", "lexicons": ["area"] },
        { "name": "severity", "numeric_config": { "min_value": 0, "max_value": 10, "bin_width": 1 } },
        { "name": "labels" },
        { "name": "id", "key_part": true, "similarity_weight": 0 }
      ] }
    ] },
    { "name": "meta", "security_weight": 0.8, "segments": [
      { "name": "time", "roles": [ { "name": "opened" } ] },
      { "name": "owner", "roles": [ { "name": "team" } ] }
    ] }
  ]
}`}</Code>
        <p>A case in that model is the same shape, by name:</p>
        <Code lang="json">{`{ "issue": { "body": { "title": "pods crash on boot", "component": "kubelet", "severity": 7, "id": "K-1" } },
  "meta": { "time": { "opened": "2026-10-01T12:00:00Z" }, "owner": { "team": "platform" } } }`}</Code>
        <h2>A role</h2>
        <Row k="(plain)">A value, matched exactly. An array is a set of values</Row>
        <Row k="text_encoding">&quot;bag_of_words&quot;: text, as the set of its words, read through the lexicon</Row>
        <Row k="numeric_config">{'{min_value, max_value, bin_width}'}: a number on a scale; numbers a bin or two apart are near</Row>
        <Row k="key_part">true: the case’s identity. A later record with the same key replaces the earlier one. Give it similarity_weight 0</Row>
        <Row k="lexicons">Other names the role answers to in data</Row>
        <Row k="value_weights">How much each value says, 0 to 1 (a number by its bin’s lower edge). Usually learned</Row>
        <h2>Weights and clearance</h2>
        <Row k="similarity_weight">On a layer, segment or role: how much it counts when two cases are compared. Default 1. Usually learned</Row>
        <Row k="security_weight">On a layer, segment or role, 0 to 1: the clearance a caller needs to see it. Below it, it scores nothing and is cut from the answer</Row>
        <p>
          A caller’s <code>clearance</code> comes with the call (<code>model_call</code> or <code>POST /v1/runs</code>),
          1 unless given. Put owners, causes and internal notes behind a <code>security_weight</code>, and call with
          a lower clearance for a bot or a customer-facing assistant.
        </p>
        <h2>The rest of the spec</h2>
        <Row k="temporal_source">The role that is the case’s time: a timestamp beside the glyph, never part of it</Row>
        <Row k="seed, dimension">Fix the encoding (defaults 42 and 4096). Changing either re-encodes the store on deploy</Row>
        <Row k="output.report">The paths kept in the fact trees that come back (layer, layer.segment or layer.segment.role). Empty: everything the caller may see</Row>
        <Row k="output.costs">The cost of deciding one outcome when another is true: {'{"good": {"bad": 5}, "bad": {"good": 1}}'}. Unset, every mistake costs 1</Row>
        <Row k="output.ask">The cost of asking a person, in the same units. Set, decide asks wherever every outcome costs more</Row>
        <Row k="settings">The model’s levers: see <a href={`${DOCS}/ada-tuning`}>Learning and tuning</a></Row>
        <p>
          The spec is checked exactly: an unknown field, a missing one or a value of the wrong kind is refused,
          naming where. A question scores only the roles it gives.
        </p>
      </>
    ),
  },
  {
    slug: 'fact-trees',
    title: 'Answers',
    lede: 'What query, facts, probabilities and decide answer, and when to act on it.',
    body: (
      <>
        <h2>query</h2>
        <AnswerFig />
        <Row k="sufficient">Whether any precedent was close enough (min_sim) to answer at all</Row>
        <Row k="top">The leading outcome; null when not sufficient</Row>
        <Row k="confidence">The similarity-weighted share of the vote for top, 0 to 1. Not a probability</Row>
        <Row k="support">How close the voting precedents are: their mean similarity</Row>
        <Row k="count">How many precedents voted</Row>
        <Row k="outcomes">The vote, outcome by outcome</Row>
        <Row k="receipts">The precedents behind it: id, sim, outcome, hash, author</Row>
        <Note kind="warn" title="Act on top only when">
          <code>sufficient</code> is true, <code>confidence</code> clears your bar (the examples use 0.6) and{' '}
          <code>count</code> is more than one or two. A consensus of one is not consensus.
        </Note>
        <h2>facts</h2>
        <p>The closest precedents, best first, each explained against the question and cut to what the caller may see.</p>
        <FactTreeFig />
        <Row k="id, hash">The precedent, to cite</Row>
        <Row k="outcome">What it resolved to</Row>
        <Row k="score">The exact weighted match of the whole case</Row>
        <Row k="probability">P(this outcome | the question), calibrated</Row>
        <Row k="author, ts">Who recorded it, and when</Row>
        <Row k="tree">A node per layer, segment and role: key, score, weight, share, status (both, query_only, record_only), and at a leaf the two values</Row>
        <p>A node’s children’s shares add up to its score. A leaf’s score is exact: two different values score 0.</p>
        <h2>probabilities</h2>
        <p>P(outcome | case) over the nearest precedents, at the temperature <code>learn</code> calibrated.</p>
        <h2>decide</h2>
        <p>
          The kernel’s <code>ctx.ada.decide(data)</code> answers <code>{'{outcome, expected_cost, probabilities, ask}'}</code>:
          the outcome with the least expected cost under <code>output.costs</code>, and <code>ask</code> true when a
          person should answer instead (nothing known, or every outcome costs more than <code>output.ask</code>).
          A model’s own <code>decide</code> function asks with <code>ctx.needs_input(prompt)</code>; the run waits
          (<code>needs_input</code>) until <code>model_continue</code> answers it, and records the answer as a new
          precedent.
        </p>
        <h2>The Result</h2>
        <p>Every call answers a Result; the function’s answer is its <code>data</code>.</p>
        <Code lang="json">{`{ "run_id": "…", "model": "tickets", "version": 3, "function": "query",
  "status": "done", "data": { … }, "step": null, "prompt": null, "seconds": 0.04 }`}</Code>
        <Row k="status">done, needs_input, needs_approval, failed, expired (no answer within 15 minutes), cancelled</Row>
        <Row k="prompt">What a waiting run asks</Row>
        <p>
          The JSON Schemas of the Result and of a query’s answer are in{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/contract">glyphh-ai/glyphh <code>contract/</code></a>.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-tuning',
    title: 'Learning and tuning',
    lede: 'learn weighs the roles from the precedents. The settings are the levers.',
    body: (
      <>
        <h2>learn</h2>
        <p>
          <code>learn</code> weighs every role by how much it tells about the outcome, and every word and value by
          how far it moves it; finds pairs of roles that tell more together; and calibrates the probabilities. It
          needs ten precedents with an outcome, of two outcomes. The learned weights are kept with the store, over
          the spec’s, and answered: they say what your cases turn on.
        </p>
        <p>
          With <code>refresh_every</code> set, the model learns and calibrates again every so many graded records,
          with no redeploy. With past cases before the first commit, learn up front:{' '}
          <code>Spec.from_json(spec).learned([(data, outcome), …]).to_json()</code>, written back to{' '}
          <code>spec.json</code>.
        </p>
        <h2>The settings</h2>
        <p>
          Declared in the spec’s <code>settings</code>; changed live with <code>model_call settings {'{changes: {…}}'}</code>,
          kept with the store until changed again. <code>settings {'{}'}</code> reads them all. Moving a learning
          lever relearns at once.
        </p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Setting</th><th>Default</th><th>What it does</th></tr></thead>
            <tbody>
              <tr><td><code>k</code></td><td>15</td><td>How many nearest precedents a query votes over</td></tr>
              <tr><td><code>min_sim</code></td><td>0.10</td><td>The similarity a precedent needs to vote. Higher: say nothing rather than guess</td></tr>
              <tr><td><code>word_weights</code></td><td>true</td><td>Learn a weight per word of a text role</td></tr>
              <tr><td><code>word_floor</code></td><td>0.35</td><td>The least a learned word weighs</td></tr>
              <tr><td><code>interactions</code></td><td>true</td><td>Learn pairs of roles that tell more together than apart</td></tr>
              <tr><td><code>max_interactions</code></td><td>5</td><td>At most this many pairs</td></tr>
              <tr><td><code>rare</code></td><td>5</td><td>A value, word or pair seen fewer times is not learned from</td></tr>
              <tr><td><code>calibrate_by</code></td><td>loss</td><td><code>loss</code>: probabilities that mean what they say; <code>cost</code>: that decide best by <code>output.costs</code></td></tr>
              <tr><td><code>calibrate_sample</code></td><td>200</td><td>The newest precedents a calibration holds out</td></tr>
              <tr><td><code>refresh_every</code></td><td>none</td><td>Learn and calibrate again every so many graded records</td></tr>
              <tr><td><code>lexicon</code></td><td>true</td><td>Read a text role’s words through the kernel’s lexicon (WordNet and the Moby list), so related words correlate</td></tr>
              <tr><td><code>word_pairs</code></td><td>false</td><td>Learn pairs of words that tell more together (“top” and “up”)</td></tr>
              <tr><td><code>max_word_pairs</code></td><td>20</td><td>At most this many word pairs per text role</td></tr>
              <tr><td><code>word_evidence</code></td><td>2</td><td>How much a case’s words weigh on the vote, by what each says of every outcome (0: not at all)</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Tuning honestly</h2>
        <p>
          Hold some cases out. Change one lever, <code>learn</code>, score the held-out cases, keep what helped.
          Never score on the cases the model learned from. The benchmarks in{' '}
          <a href="https://github.com/glyphh-ai/rrotor/tree/main/benchmarks">rrotor’s <code>benchmarks/</code></a>{' '}
          (credit, Banking77) show the method and what each lever did.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-guide-incidents',
    title: 'Guide: remember incidents',
    lede: 'Each error recorded with the fix that worked. A new error gets the fix, and the cause and owner for a caller cleared to see them.',
    body: (
      <>
        <p>
          The model is{' '}
          <a href="https://github.com/glyphh-ai/rrotor/tree/main/examples/ada_incidents"><code>examples/ada_incidents</code></a>{' '}
          in rrotor. Copy it to a repo of your own.
        </p>
        <h2>1. The case</h2>
        <Code lang="json">{`{
  "error": {
    "where": { "service": "api", "endpoint": "/v1/checkout", "region": "iad", "version": "2.14.0" },
    "what": { "class": "TimeoutError", "message": "upstream payment gateway timed out after 30s", "status": 504, "id": "inc-1041" },
    "when": { "opened": "2026-10-16T09:12:00Z" }
  },
  "impact": { "scale": { "users": 1200, "tier": "pro" } },
  "resolution": { "fix": { "cause": "gateway rate limit hit on retry storm", "owner": "payments",
                           "runbook": "RB-12 back off retries, raise circuit breaker" } }
}`}</Code>
        <p>
          The outcome is the fix: <code>rollback</code>, <code>scale up</code>, <code>rotate credentials</code>,{' '}
          <code>raise circuit breaker</code>, <code>hotfix</code>. <code>message</code> is text, <code>status</code>{' '}
          and <code>users</code> are numbers on a scale, <code>id</code> is the key. The <code>resolution</code>{' '}
          layer has <code>security_weight</code> 0.7: a caller below that clearance gets the fix, never the cause,
          owner or runbook.
        </p>
        <h2>2. Deploy</h2>
        <p>Push the repo, then ask Claude:</p>
        <Code>{`Deploy commit <sha> of acme/incidents to my Glyphh runtime.`}</Code>
        <h2>3. Record</h2>
        <p>Record past incidents with the fix that resolved each one, ten to fifty to start, then <code>learn</code>.</p>
        <Code lang="python">{`from glyphh import Ada

incidents = Ada().model("incidents")      # GLYPHH_RUNTIME_URL, GLYPHH_RUNTIME_KEY

for case, fix in past_incidents:
    incidents.record(case, outcome=fix)
incidents.learn()`}</Code>
        <h2>4. Decide</h2>
        <Code lang="python">{`r = incidents.decide({"error": {"what": {"class": "TimeoutError",
                                         "message": "payment gateway timed out", "status": 504}}})
if r.done:
    apply(r.data["fix"])                  # r.data["last_time"]: the cause, owner and runbook
elif r.waiting:                           # nothing close enough: r.prompt asks how it was fixed
    r = incidents.resume(r.run_id, ask_on_call(r.prompt))`}</Code>
        <p>
          <code>decide</code> answers <code>{'{fix, confidence, from, last_time}'}</code> when the confidence is at
          least 0.6. Otherwise it asks, and records the answer as a new precedent. A status bot calls with{' '}
          <code>clearance=0.5</code> and gets an empty <code>last_time</code>.
        </p>
      </>
    ),
  },
];

const runtime = [
  {
    slug: 'runtimes',
    title: 'Runtimes',
    lede: 'Where your models live and run: hosted by Glyphh, or on your own infrastructure.',
    body: (
      <>
        <div className="dx-table">
          <table>
            <thead><tr><th></th><th>Hosted</th><th>Self-hosted</th></tr></thead>
            <tbody>
              <tr><td><strong>Address</strong></td><td><code>{RUNTIME}</code></td><td><code>https://&lt;host&gt;</code>, yours</td></tr>
              <tr><td><strong>Plans</strong></td><td>Pro (3 machines), Team (10), Enterprise</td><td>Every plan, Free included</td></tr>
              <tr><td><strong>Cost</strong></td><td>Per second while running, at the <a href="https://glyphh.ai/pricing">published rates</a>, plus the disk</td><td>Free</td></tr>
              <tr><td><strong>Precedents</strong></td><td>Up to the plan’s managed precedents</td><td>Unlimited</td></tr>
              <tr><td><strong>On the platform</strong></td><td>Machines: a name and a size (small, medium, large)</td><td>Getting started: register its name and public host, then deploy it</td></tr>
              <tr><td><strong>Runs on</strong></td><td>Fly.io</td><td>Docker Compose, Helm or Terraform (AWS, Google Cloud)</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Either way it is the same image, <code>ghcr.io/glyphh-ai/rrotor</code>, and nothing of Glyphh’s is
          between your callers and it. The runtime keeps a link out to <code>api.glyphh.ai</code> for its licence,
          its keys and deploys; no call, input or answer goes up it.
        </p>
        <h2>Hosted</h2>
        <ul>
          <li>Make, start, stop, restart or delete a machine on the platform’s Machines page. Deleting one deletes its disk.</li>
          <li>A stopped machine starts when a request reaches its address.</li>
          <li>To move to Free, delete your hosted machines first.</li>
        </ul>
        <h2>Self-hosted</h2>
        <ul>
          <li>One container, one <code>/data</code> volume, one public host, TLS ended in front of it. No high availability.</li>
          <li>The platform shows the runtime’s id and token once, with the settings for the way you deploy it.</li>
          <li>It renews its licence over the link and a daily heartbeat, with 14 days’ grace.</li>
          <li>Air-gapped (<code>RROTOR_LINK=off</code>): an offline licence, on Enterprise, and runtime keys only.</li>
        </ul>
        <p>
          The guides: <a href="https://github.com/glyphh-ai/rrotor/tree/main/docs/self-hosting">rrotor <code>docs/self-hosting</code></a>.
        </p>
        <h2>Runtime keys</h2>
        <p>
          Software calls a runtime with a runtime key as the bearer. Make one on the platform’s Keys page: a name,
          an expiry of 1 to 365 days or never, and one runtime or every hosted machine. It is shown once; revoke it
          there. The Usage page shows each key’s calls.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-install',
    title: 'Connect Claude',
    lede: 'Your runtime as a connector in Claude, and the glyphh plugin for Claude Code.',
    body: (
      <>
        <h2>The runtime’s connector</h2>
        <ol>
          <li>Copy the connector URL from the platform: <code>{RUNTIME}/mcp</code>, or <code>https://&lt;host&gt;/mcp</code> self-hosted.</li>
          <li>In Claude, <strong>Settings → Connectors</strong>, add a custom connector with that URL.</li>
          <li>Sign in with your Glyphh account and click Allow.</li>
        </ol>
        <p>
          Any MCP client works the same way, or with a runtime key as the bearer. The tools are in{' '}
          <a href={`${DOCS}/ada-tools`}>MCP tools and API</a>.
        </p>
        <h2>The glyphh plugin</h2>
        <Code>{`/plugin marketplace add glyphh-ai/glyphh
/plugin install glyphh@glyphh`}</Code>
        <Row k="The Ada skill">Tells Claude how to write a model’s files with you, deploy a commit and call it through your runtime’s connector</Row>
        <Row k="The account">/glyphh opens the account, org, plan and billing panels; “sign in to Glyphh” shows the sign-in card</Row>
        <Row k="The file ledger">What Claude last changed in each file and why, kept on your machine</Row>
        <p>
          The panels need <code>CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1</code>; the skill and the ledger work without it.
        </p>
        <h2>The Glyphh connector</h2>
        <p>
          Your account from Claude, at <code>https://api.glyphh.ai/mcp</code>: who you are, the plan and usage,
          machines, runtime keys, installs, members and invites. It does not call models; the runtime’s connector
          does.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-tools',
    title: 'MCP tools and API',
    lede: 'The runtime’s own MCP server and REST API, at its own address.',
    body: (
      <>
        <h2>MCP</h2>
        <p><code>POST {RUNTIME}/mcp</code> (Streamable HTTP), with a Glyphh sign-in or a runtime key.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Arguments</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>models_list</code></td><td></td><td>The models: versions, the active one, its functions</td></tr>
              <tr><td><code>model_deploy</code></td><td><code>repo, commit, token?</code></td><td>A commit of a model’s GitHub repo (<code>owner/name</code>) as its next version</td></tr>
              <tr><td><code>model_call</code></td><td><code>model, function?, inputs?, version?, clearance?</code></td><td>Runs a function (<code>start</code> by default); the first Result</td></tr>
              <tr><td><code>model_continue</code></td><td><code>run_id, answer</code></td><td>Answers a run waiting for input or an approval; the next Result</td></tr>
              <tr><td><code>model_cancel</code></td><td><code>run_id</code></td><td>Stops a run</td></tr>
              <tr><td><code>run_status</code></td><td><code>run_id</code></td><td>A run’s status, timing and last Result</td></tr>
              <tr><td><code>run_log</code></td><td><code>run_id</code></td><td>A run’s log lines</td></tr>
              <tr><td><code>approvals</code></td><td></td><td>The runs waiting for your approval</td></tr>
            </tbody>
          </table>
        </div>
        <h2>REST</h2>
        <p>At the same address, <code>Authorization: Bearer &lt;runtime key&gt;</code>, JSON in and out.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Call</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>POST /v1/runs</code></td><td><code>{'{model, function, inputs, version?, clearance?}'}</code>: opens a run, answers its first Result</td></tr>
              <tr><td><code>POST /v1/runs/{'{id}'}/continue</code></td><td><code>{'{answer}'}</code>: the next Result</td></tr>
              <tr><td><code>POST /v1/runs/{'{id}'}/cancel</code></td><td>Stops it</td></tr>
              <tr><td><code>GET /v1/runs/{'{id}'}</code></td><td>Status, function, times, seconds, the last Result</td></tr>
              <tr><td><code>GET /v1/runs/{'{id}'}/log</code></td><td>The run’s log lines</td></tr>
              <tr><td><code>GET /v1/approvals</code></td><td>Runs waiting for approval</td></tr>
              <tr><td><code>GET /v1/models</code></td><td>Each model, its versions, the active one, its functions</td></tr>
              <tr><td><code>POST /v1/models/deploy</code></td><td><code>{'{repo, commit, token?}'}</code>: answers <code>{'{model, version, commit_sha}'}</code></td></tr>
              <tr><td><code>GET /v1/health</code></td><td>Version, the link, the sandbox, the licence</td></tr>
              <tr><td><code>GET /healthz</code></td><td>Open: whether the process is up</td></tr>
            </tbody>
          </table>
        </div>
        <Code lang="bash">{`curl ${RUNTIME}/v1/runs \\
  -H "Authorization: Bearer $GLYPHH_RUNTIME_KEY" \\
  -H "content-type: application/json" \\
  -d '{"model": "tickets", "function": "query",
       "inputs": {"data": {"issue": {"body": {"component": "kubelet", "severity": 7}}}}}'`}</Code>
        <p>
          A refusal is <code>{'{"error": {"code", "message"}}'}</code> with a stable code. A run that waits for an
          answer expires after 15 minutes.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-sdk',
    title: 'SDKs',
    lede: 'Ada for Python and TypeScript: your runtime’s address and a runtime key.',
    body: (
      <>
        <Row k="Python">pip install glyphh, then from glyphh import Ada</Row>
        <Row k="TypeScript">npm install @glyphh-ai/glyphh, then import {'{ Ada }'} from &quot;@glyphh-ai/glyphh&quot;</Row>
        <p>
          Both read <code>GLYPHH_RUNTIME_URL</code> (<code>{RUNTIME}</code> or <code>https://&lt;host&gt;</code>) and{' '}
          <code>GLYPHH_RUNTIME_KEY</code>, or take them as arguments. Source:{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/sdk">glyphh-ai/glyphh <code>sdk/</code></a> (MIT).
        </p>
        <Code lang="python">{`from glyphh import Ada

tickets = Ada().model("tickets")              # or Ada(url, key)
tickets.record(case, outcome="platform")
r = tickets.query(case, clearance=0.5)
if r.done and r.data["sufficient"]:
    route(r.data["top"])`}</Code>
        <Code lang="javascript">{`import { Ada } from "@glyphh-ai/glyphh";

const tickets = new Ada().model("tickets");   // or new Ada({ url, key })
let r = await tickets.decide(ticket);
if (r.status === "needs_input") r = await tickets.resume(r.run_id, await askSomeone(r.prompt));`}</Code>
        <h2>Methods</h2>
        <Row k="Ada">models(), deploy(repo, commit), model(name), run(run_id), log(run_id), resume(run_id, answer), cancel(run_id)</Row>
        <Row k="model">call(function, inputs, version, clearance), record, query, facts, probabilities, decide, learn, resume</Row>
        <p>
          Each answers a <a href={`${DOCS}/fact-trees`}>Result</a>. A refusal raises (Python) or throws (TypeScript){' '}
          <code>AdaError</code> with <code>code</code>, <code>message</code> and <code>status</code>:{' '}
          <code>E_AUTH</code>, <code>E_LIMIT</code>, <code>E_MODEL_MISSING</code>, <code>E_RUN_MISSING</code>,{' '}
          <code>E_BAD_REQUEST</code>, <code>E_UNREACHABLE</code>. On a hosted runtime, a <code>record</code> past
          the plan’s managed precedents is a <code>failed</code> run whose <code>data.code</code> is{' '}
          <code>E_LIMIT_PRECEDENTS</code>.
        </p>
      </>
    ),
  },
];

const account = [
  {
    slug: 'plans',
    title: 'Plans',
    lede: 'Never per seat, per model or per install. Ada is in every plan.',
    body: (
      <>
        <div className="dx-table">
          <table>
            <thead><tr><th>Plan</th><th>Price</th><th>Managed precedents</th><th>Hosted machines</th></tr></thead>
            <tbody>
              <tr><td>Free</td><td>$0</td><td>none</td><td>0</td></tr>
              <tr><td>Pro</td><td>$99 a month, flat</td><td>100,000</td><td>3</td></tr>
              <tr><td>Team</td><td>$299 a month, flat</td><td>1,000,000</td><td>10</td></tr>
              <tr><td>Enterprise</td><td>By contract</td><td>Unlimited</td><td>Unlimited</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Members, installs, models and self-hosted runtimes are unlimited on every plan.</li>
          <li>Managed precedents cap each hosted runtime, all its models together. Self-hosted runtimes have no cap.</li>
          <li>Hosted machines are billed per second while running, and their disks by the GB, on top of the plan, at the rates on the <a href="https://glyphh.ai/pricing">pricing page</a>. Enterprise rates are set in the contract.</li>
          <li>Offline licences, for air-gapped runtimes, are on Enterprise.</li>
          <li>Pro and Team are bought on the platform’s Billing page; Stripe prorates a change between them. To move to Free, delete your hosted machines first. For Enterprise, write to <a href="mailto:sales@glyphh.ai">sales@glyphh.ai</a>.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Sign-in and security',
    lede: 'How you sign in, how callers reach a runtime, and what Glyphh never sees.',
    body: (
      <>
        <h2>Signing in</h2>
        <Row k="The platform">Continue with Google or GitHub</Row>
        <Row k="Claude Code">“Sign in to Glyphh”: a code to approve on the platform</Row>
        <Row k="A connector">OAuth: Glyphh signs you in for that runtime’s address, with one Allow click</Row>
        <h2>Reaching a runtime</h2>
        <ul>
          <li>A runtime takes a runtime key, or a Glyphh sign-in issued for its own address. Nothing else gets in.</li>
          <li>The runtime holds only each key’s SHA-256. A key is shown once, and can expire.</li>
          <li>Each run is sandboxed: its own namespaces, a seccomp filter, and no network but the hosts its manifest declares.</li>
          <li><code>clearance</code> cuts what each caller sees, layer by layer, in every answer.</li>
        </ul>
        <h2>What Glyphh never sees</h2>
        <p>
          Calls go straight to your runtime. Its link to <code>api.glyphh.ai</code> carries the licence, keys,
          deploys, each run’s status and seconds, and how many calls each key made: never a model’s inputs or
          answers, and never your data.
        </p>
        <Note kind="warn" title="Report a problem">
          Write to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>.
        </Note>
      </>
    ),
  },
];

export const REFERENCE_GROUPS = [
  { title: 'Your runtime', pages: runtime },
  { title: 'Account', pages: account },
];
