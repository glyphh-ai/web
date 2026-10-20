import { Code, Row } from './ui';
import { DOCS } from './base';

// The plugin and the SDKs, from glyphh-ai/glyphh (README.md,
// plugins/glyphh/README.md and skills/ada/SKILL.md, sdk/*/README.md,
// contract/contract.json) and rrotor's docs/architecture.md section 7.

export const PLUGIN_PAGES = [
  {
    slug: 'plugin',
    title: 'Install and sign in',
    lede: 'The glyphh plugin for Claude Code: the account panel, the Ada skill and the file ledger.',
    body: (
      <>
        <Code>{`/plugin marketplace add glyphh-ai/glyphh
/plugin install glyphh@glyphh`}</Code>
        <p>
          The account panel needs <code>CLAUDE_CODE_ENABLE_FUNCTION_HOOKS=1</code> (function hooks are early access in
          Claude Code); the Ada skill, the sign-in card and the ledger work without it. After the plugin adds a
          command, the desktop app may need <strong>View › Reload</strong>.
        </p>
        <h2>Sign in</h2>
        <Row k="/glyphh signin">Shows a code and a link; approve it on the platform with Google or GitHub. /glyphh signout signs this machine out</Row>
        <Row k="“sign in to Glyphh”">Ask Claude: a sign-in card in the chat, the same flow</Row>
        <p>The install’s token is kept in <code>~/.glyphh/install.json</code> (mode 0600). Signing in again on the same machine reuses its install.</p>
        <h2>The account panel</h2>
        <p><code>/glyphh [section]</code> (or <code>/glyphh-account</code> where another command has the name):</p>
        <Row k="Account">Your name, email, sign-in providers and installs; sign out</Row>
        <Row k="Org">Members and invites</Row>
        <Row k="Plan">The plan, its use and this machine’s licence</Row>
        <Row k="Billing">Admin only: change plan, card and invoices (Stripe)</Row>
        <h2>The file ledger</h2>
        <p>
          What Claude last changed in each file and why, handed back when it reads the file again, and the files this
          session changed in its last three turns. Kept in <code>~/.glyphh/ledger/ledger.sqlite</code>, sent nowhere.
          Needs <code>python3</code>.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-skill',
    title: 'The Ada skill',
    lede: 'Claude builds, deploys and calls Ada models through your runtime’s connector.',
    body: (
      <>
        <h2>Connect the runtime</h2>
        <ol>
          <li>In Claude, <strong>Settings → Connectors</strong>, add a custom connector: <code>https://&lt;host&gt;/mcp</code>.</li>
          <li>Sign in with your Glyphh account and click Allow. No key is typed.</li>
        </ol>
        <p>Its tools are in <a href={`${DOCS}/api#mcp`}>API and MCP</a>. Then ask in plain words:</p>
        <Code>{`Build me an Ada model of our incidents: record the last twenty with the fix
that worked, then tell me the fix for this new error and why.`}</Code>
        <h2>What the skill does</h2>
        <ol>
          <li><strong>Agrees the case with you:</strong> its fields (exact, text, numbers on a scale, secret), the outcome, and who will call.</li>
          <li><strong>Writes the model</strong> and its tests (on <code>rrotor.testing.Harness</code>), starting from rrotor’s <code>examples/ada_incidents</code>.</li>
          <li><strong>Commits and pushes</strong> to your GitHub repo, then <code>model_deploy {'{repo, commit, token?}'}</code> (a token for a private repo).</li>
          <li><strong>Records</strong> past cases with their outcomes (<code>model_call record</code>), then <code>learn</code>: it needs ten graded precedents of two outcomes.</li>
          <li><strong>Calls it:</strong> <code>query</code>, <code>decide</code> and <code>facts</code> for why. When <code>decide</code> asks (<code>needs_input</code>), your answer goes back with <code>model_continue</code> and is recorded as a new precedent.</li>
        </ol>
        <h2>A model</h2>
        <Row k="glyphh.json">The manifest: the name, "needs": ["ada"], "data": true, and each function with a JSON Schema of its inputs and "writes"</Row>
        <Row k="spec.json">What a case looks like: layers of segments of roles</Row>
        <Row k="model.py">from rrotor import Result, ada; load(ctx) calls ada.open(ctx), each function calls ctx.ada and answers a Result</Row>
        <p>
          The example’s functions: <code>record</code>, <code>query</code>, <code>facts</code>,{' '}
          <code>probabilities</code>, <code>decide</code>, <code>learn</code>, <code>settings</code> and{' '}
          <code>start</code>. A redeploy keeps the precedent store; one that changes the spec’s <code>seed</code> or{' '}
          <code>dimension</code> re-encodes it, or is refused (<code>E_ADA_ENCODING</code>) and the version before stays
          active. A manifest Claude gets wrong is refused with <code>E_MANIFEST</code>.
        </p>
      </>
    ),
  },
];

export const SDK_PAGES = [
  {
    slug: 'sdks',
    title: 'Python and TypeScript',
    lede: 'Call your runtime from software, at its address, with a runtime key.',
    body: (
      <>
        <Row k="Python 3.9+">pip install glyphh, then from glyphh import Ada. Pin glyphh&gt;=3: versions up to 2.6.7 are a different library</Row>
        <Row k="Node 18+">npm i @glyphh-ai/glyphh, then import {'{ Ada }'} from &quot;@glyphh-ai/glyphh&quot;</Row>
        <p>
          Both are 3.1.0, MIT, with no dependencies, in{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/sdk">glyphh-ai/glyphh <code>sdk/</code></a>.
        </p>
        <h2>A client</h2>
        <p>
          <code>GLYPHH_RUNTIME_URL</code> is <code>https://&lt;host&gt;</code>; <code>GLYPHH_RUNTIME_KEY</code> a
          runtime key (<a href={`${DOCS}/api#runtime-keys`}>made on the platform</a>). Or pass them. Missing either is{' '}
          <code>E_CONFIG</code>.
        </p>
        <Code lang="python">{`from glyphh import Ada

incidents = Ada().model("incidents")          # or Ada(url, key)

incidents.record({"error": {...}}, outcome="raise circuit breaker")

r = incidents.decide({"error": {"what": {"class": "TimeoutError", "message": "payment gateway timed out"}}})
if r.done:
    apply(r.data["fix"])
elif r.waiting:                               # needs_input or needs_approval: r.prompt says what
    r = incidents.resume(r.run_id, ask_someone(r.prompt))

bot = incidents.query({...}, clearance=0.5)   # a caller who may not see the secured layers`}</Code>
        <Code lang="javascript">{`import { Ada } from "@glyphh-ai/glyphh";

const incidents = new Ada().model("incidents");   // or new Ada({ url, key })

let r = await incidents.decide({ error: { what: { class: "TimeoutError" } } });
if (r.status === "needs_input") r = await incidents.resume(r.run_id, await askSomeone(r.prompt));`}</Code>
        <h2>Methods</h2>
        <Row k="Ada">models(), deploy(repo, commit, token), model(name), run(run_id): a run’s status, log(run_id), resume(run_id, answer): continue, cancel(run_id)</Row>
        <Row k="Model">record(data, outcome), query, facts(top), probabilities, decide, learn(sample), each with clearance; call(function, inputs, version, clearance) for any function; resume(run_id, answer)</Row>
        <Row k="TypeScript">The same names, with runId and options objects: facts(data, {'{ top }'}), learn({'{ sample }'}), query(data, {'{ clearance }'}), call(fn, inputs, {'{ version, clearance }'})</Row>
        <Row k="Result">run_id, model, version, function, status, data, step, prompt, seconds, limit_exceeded; in Python also done, waiting and ended</Row>
        <p>
          <code>status</code> is <code>done</code>, <code>needs_input</code>, <code>needs_approval</code>,{' '}
          <code>failed</code>, <code>expired</code> (no continue within 15 minutes) or <code>cancelled</code>. A{' '}
          <code>query</code>’s data is <code>{'{sufficient, confidence, support, count, top, outcomes, receipts}'}</code>.
          The JSON Schemas are in{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/contract"><code>contract/</code></a>.
        </p>
        <h2>The precedent cap</h2>
        <p>
          A <code>record</code> past the licence key’s cap is <code>done</code> with <code>limit_exceeded</code> true:
          nothing was indexed and <code>data</code> says why. It is not raised and not a <code>failed</code> run (
          <a href={`${DOCS}/licensing`}>Licensing</a>).
        </p>
        <h2>Errors</h2>
        <p>
          A refusal raises (Python) or throws (TypeScript) <code>AdaError</code>: <code>code</code>,{' '}
          <code>message</code>, <code>status</code>, <code>detail</code>, <code>retry_after</code> (<code>retryAfter</code>).
          The code is the runtime’s (<code>E_AUTH</code>, <code>E_LIMIT</code>, <code>E_MODEL_MISSING</code>,{' '}
          <code>E_RUN_MISSING</code>, <code>E_BAD_REQUEST</code>, …), or <code>E_UNREACHABLE</code> or{' '}
          <code>E_CONFIG</code>. In a cluster, each an <code>AdaError</code>:
        </p>
        <Row k="NoHeadError">E_NO_HEAD, 503: no head for a moment. Retried first; raised once retries are spent</Row>
        <Row k="HeadLostError">E_HEAD_LOST, 503: the head went with the write, which may have been applied. Never retried: check before resending</Row>
        <Row k="NotCommittedError">E_NOT_COMMITTED, 503: the write is kept and commits when most voters return. Do not resend it</Row>
        <Row k="RunLostError">E_RUN_LOST, 410: the run’s node left the cluster</Row>
        <Row k="ReadOnlyError">E_READ_ONLY: a function marked "writes": false wrote on a follower; the store is untouched</Row>
        <h2>In a cluster</h2>
        <ul>
          <li><strong>Retries:</strong> <code>E_NO_HEAD</code>, and a read the runtime could not answer, with backoff and <code>Retry-After</code>, for up to <code>retry_deadline</code> (<code>retryDeadline</code>) seconds: default 30, 0 never. A write that may have been applied is never sent again.</li>
          <li><strong>Read-your-writes:</strong> the highest <code>Rrotor-Cluster-Seq</code> seen is sent as <code>Rrotor-Min-Seq</code>, so a read sees the client’s writes on any node. <code>read_your_writes=False</code> (<code>readYourWrites: false</code>) turns it off; <code>cluster_seq</code> (<code>clusterSeq</code>) shows it.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'api',
    title: 'API and MCP',
    lede: 'The runtime’s own REST API and MCP server, at its own address.',
    body: (
      <>
        <h2 id="runtime-keys">Runtime keys</h2>
        <p>
          Make one on the platform’s API Keys page: a name, one runtime, and an expiry of 1 to 365 days or never. It is
          shown once; revoke it there. Send it as <code>Authorization: Bearer &lt;key&gt;</code>. Claude uses a Glyphh
          sign-in instead.
        </p>
        <h2>REST</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Route</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>POST /v1/runs</code></td><td><code>{'{model, function?, inputs?, version?, clearance?}'}</code> (<code>function</code> defaults to <code>start</code>, <code>clearance</code> to 1): opens a run, answers its first Result</td></tr>
              <tr><td><code>POST /v1/runs/{'{id}'}/continue</code></td><td><code>{'{answer}'}</code>: the next Result</td></tr>
              <tr><td><code>POST /v1/runs/{'{id}'}/cancel</code></td><td>Stops it</td></tr>
              <tr><td><code>GET /v1/runs/{'{id}'}</code></td><td>Status, function, times, seconds, the last Result</td></tr>
              <tr><td><code>GET /v1/runs/{'{id}'}/log</code></td><td>The run’s log lines</td></tr>
              <tr><td><code>GET /v1/approvals</code></td><td>Runs waiting for approval</td></tr>
              <tr><td><code>GET /v1/models</code></td><td>Each model, its versions, the active one, its functions</td></tr>
              <tr><td><code>POST /v1/models/deploy</code></td><td><code>{'{repo, commit, token?}'}</code> (<code>commit</code> the full SHA): <code>201 {'{model, version, commit_sha, deployed_at}'}</code></td></tr>
              <tr><td><code>GET /v1/licence</code></td><td>The key held, its state and the limits that apply</td></tr>
              <tr><td><code>GET /v1/cluster</code></td><td>The cluster: head, term, members, the nodes refused</td></tr>
              <tr><td><code>GET /v1/audit</code></td><td>The audit log, newest first (Enterprise)</td></tr>
              <tr><td><code>GET /v1/health</code></td><td>Version, the link, the sandbox, the licence, the cluster, the drains</td></tr>
              <tr><td><code>GET /healthz</code>, <code>GET /readyz</code></td><td>Open: the process is up; this node may take traffic</td></tr>
            </tbody>
          </table>
        </div>
        <Code lang="bash">{`curl https://<host>/v1/runs \\
  -H "Authorization: Bearer $GLYPHH_RUNTIME_KEY" \\
  -H "content-type: application/json" \\
  -d '{"model": "incidents", "function": "query",
       "inputs": {"data": {"error": {"what": {"class": "TimeoutError"}}}}}'`}</Code>
        <p>
          A refusal is <code>{'{"error": {"code", "message"}}'}</code> with a stable code. In a cluster every answer
          carries <code>Rrotor-Cluster-Seq</code> and a request may send <code>Rrotor-Min-Seq</code> (
          <a href={`${DOCS}/clusters`}>Clusters</a>).
        </p>
        <h2 id="mcp">MCP</h2>
        <p><code>POST https://&lt;host&gt;/mcp</code>, Streamable HTTP, with a Glyphh sign-in or a runtime key. A refusal is a tool error carrying the same <code>{'{error}'}</code>.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Arguments</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>models_list</code></td><td></td><td><code>GET /v1/models</code></td></tr>
              <tr><td><code>model_deploy</code></td><td><code>repo, commit, token?</code></td><td><code>POST /v1/models/deploy</code></td></tr>
              <tr><td><code>model_call</code></td><td><code>model, function?, inputs?, version?, clearance?</code></td><td><code>POST /v1/runs</code></td></tr>
              <tr><td><code>model_continue</code></td><td><code>run_id, answer</code></td><td><code>POST /v1/runs/{'{id}'}/continue</code></td></tr>
              <tr><td><code>model_cancel</code></td><td><code>run_id</code></td><td><code>POST /v1/runs/{'{id}'}/cancel</code></td></tr>
              <tr><td><code>run_status</code>, <code>run_log</code></td><td><code>run_id</code></td><td><code>GET /v1/runs/{'{id}'}</code>, <code>/log</code></td></tr>
              <tr><td><code>approvals</code></td><td></td><td><code>GET /v1/approvals</code></td></tr>
              <tr><td><code>audit_query</code></td><td><code>since?, until?, kind?, model?, run_id?, limit?</code></td><td><code>GET /v1/audit</code></td></tr>
              <tr><td><code>cluster_status</code></td><td></td><td><code>GET /v1/cluster</code></td></tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
];
