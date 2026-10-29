import { Architecture, Code, Row, Table } from './ui';
import { PLUGIN_PAGES, SDK_PAGES } from './pages';
import { DOCS } from './base';

// The docs explain Ada Cloud: what it is, getting started, the API, tuning, Ada versions, data in and out, the plugin, the SDKs and
// the plans. Every fact is checked against the server's docs/specs/ada-cloud.md, docs/architecture.md and
// src/glyphh_ada (origin/main, 2026-10-22), and glyphh-ai/glyphh (sdk/*/README.md, plugins/glyphh/skills/ada).
// Each fact once.

const API = 'https://ada.glyphh.ai';

const cloud = [
  {
    slug: 'introduction',
    title: 'Architecture',
    lede: 'Ada answers new cases from the cases you have already decided, and says when a person should decide instead. Glyphh runs it for you, at one address.',
    body: (
      <>
        <Architecture />
        <h2>The parts</h2>
        <Table
          head={['Part', 'What it is', 'Where']}
          rows={[
            [<strong key="a">Ada Cloud</strong>, 'Ada as an API: make a model from a spec, load its precedents, ask', <code key="b">{API}</code>],
            [<strong key="a">The platform</strong>, 'Sign in; Models (spec, settings, import, try it, backtest, export), API Keys, Usage, Billing', <a key="b" href="https://platform.glyphh.ai">platform.glyphh.ai</a>],
            [<strong key="a">The connector</strong>, 'Claude’s way in: one URL, a Glyphh sign-in, the ada_* tools', <code key="b">https://api.glyphh.ai/mcp</code>],
            [<strong key="a">The plugin</strong>, 'For Claude Code: sign-in and the Ada skill', <a key="b" href={`${DOCS}/plugin`}>The plugin</a>],
            [<strong key="a">The SDKs</strong>, 'Python (glyphh) and TypeScript (@glyphh-ai/glyphh), 3.2', <a key="b" href={`${DOCS}/sdks`}>The SDKs</a>],
          ]}
        />
        <p>There is nothing to install, deploy or host, and no code to write for a model.</p>

        <h2>A model is a spec</h2>
        <p>
          A model is a JSON spec plus its precedents. The spec says what a case looks like (layers of segments of roles),
          what the outcomes are, and what each mistake costs. Glyphh stores it and versions it; no customer code runs.
          The format is on <a href={`${DOCS}/getting-started#the-spec`}>Getting started</a>.
        </p>
        <h2>Precedents</h2>
        <p>
          A precedent is a past case with its outcome. Ada stores each one as it reads it (a number’s bin, a text’s
          words, an id made from its key parts) with an encoded form for search. It never keeps the raw request it came
          in, which is why a role’s reading cannot be changed later (<code>E_SPEC_READING</code>).
        </p>
        <h2>How a read works</h2>
        <ol>
          <li><strong>The API</strong> resolves your key or sign-in to your organisation, checks the plan’s rate and monthly reads, counts the read, and queues the call.</li>
          <li><strong>A worker</strong> takes it and opens the model: its active spec and what it learned.</li>
          <li><strong>Under 1,000 precedents</strong> the worker reads every precedent and scores them exactly.</li>
          <li><strong>Above that</strong>, Postgres shortlists the 1,000 nearest (pgvector, by Hamming distance), and Ada re-ranks the shortlist exactly with the spec’s weights and your clearance. The setting <code>shortlist</code> changes the 1,000 (0 reads every precedent).</li>
          <li><strong>Over 100,000 precedents</strong>, a question that gives fewer than half the roles that vote is refused (<code>422 E_FEW_ROLES</code>) rather than answered from a poor shortlist.</li>
          <li><strong>The answer</strong> is the outcome of least expected cost, calibrated probabilities, whether to ask a person, and the precedents it stands on. The same question gets the same answer.</li>
        </ol>
        <p>Reads time out at 10 seconds (<code>504 E_TIMEOUT</code>). Learning, calibration, imports, exports, backtests and re-encodes run as jobs.</p>
        <h2>Tenancy</h2>
        <ul>
          <li>Each organisation’s data is its own Postgres schema. Every table in it has row-level security that fails closed: a session not set to your organisation sees none of its rows.</li>
          <li>The organisation comes from the key or the sign-in, never from the request body.</li>
          <li>A model learns only from its own precedents. Nothing is shared between organisations except fixed public word lists (WordNet 3.0, Moby), read-only.</li>
          <li>No language model is in the path. Ada Cloud does not send your data to one.</li>
          <li>It runs in Fly.io’s <code>iad</code> region (United States).</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'getting-started',
    title: 'Getting started',
    lede: 'Sign in, make a key, create a model, load your history, ask, and connect Claude.',
    body: (
      <>
        <h2>1. Sign in</h2>
        <p>Go to <a href="https://platform.glyphh.ai">platform.glyphh.ai</a> and sign in with Google or GitHub. Your account belongs to an organisation; invite others from Settings.</p>
        <h2>2. Make an API key</h2>
        <p>
          On the <strong>API Keys</strong> page: a name, an expiry (1 to 365 days, or never) and a clearance (0 to 1,
          default 1). The key (<code>glyphh_ak_…</code>) is shown once; keep it as a secret, for example in{' '}
          <code>GLYPHH_API_KEY</code>. Send it as <code>Authorization: Bearer &lt;key&gt;</code>. A revoked key stops
          working within 10 seconds. From a terminal, <code>glyphh login</code> keeps it for the machine (
          <a href={`${DOCS}/cli`}>The command</a>), and every step below is one <code>glyphh</code> command too.
        </p>
        <h2>3. Create a model</h2>
        <p>On the platform: <strong>Models → New</strong>, starting from an example. Or by API:</p>
        <Code lang="bash">{`curl ${API}/v1/models \\
  -H "Authorization: Bearer $GLYPHH_API_KEY" -H "content-type: application/json" \\
  -d @- <<'EOF'
{"name": "tickets", "spec": {
  "name": "tickets",
  "layers": [{"name": "ticket", "segments": [{"name": "what", "roles": [
    {"name": "plan"},
    {"name": "age_days", "numeric_config": {"min_value": 0, "max_value": 30, "bin_width": 3}},
    {"name": "text", "text_encoding": "bag_of_words"},
    {"name": "ref", "key_part": true, "similarity_weight": 0}
  ]}]}],
  "output": {"costs": {"refund": {"keep": 3}, "keep": {"refund": 1}}, "ask_below": 0.6}
}}
EOF`}</Code>
        <p>A model name is lower-case letters, digits and <code>_ . -</code>, starting with a letter or digit, at most 63 characters.</p>

        <h3 id="the-spec">The spec</h3>
        <Table
          head={['A role is', 'Write', 'Reads']}
          rows={[
            ['An exact value', <code key="c">{'{"name": "plan"}'}</code>, 'Equal or not; a list is a set of values'],
            ['Free text', <code key="c">{'{"name": "text", "text_encoding": "bag_of_words"}'}</code>, 'Its words, through the lexicon; learning weighs the telling words'],
            ['A number on a scale', <code key="c">{'{"numeric_config": {"min_value", "max_value", "bin_width"}}'}</code>, 'Its bin: near numbers are near'],
            ['An id', <code key="c">{'{"key_part": true, "similarity_weight": 0}'}</code>, 'Not compared: makes the case’s id, so the same id replaces its precedent'],
          ]}
        />
        <Row k="similarity_weight">A role’s, segment’s or layer’s voice, 0 to 1. Learning sets the real weights</Row>
        <Row k="security_weight">The clearance a reader needs to see it, 0 to 1</Row>
        <Row k="output.costs">{'{decided: {true outcome: cost}}'}: what each mistake costs. Unset, every mistake costs 1</Row>
        <Row k="output.ask, ask_below">Ask a person when every choice costs more than asking, or when the top probability is under the bar</Row>
        <Row k="output.report">The paths a fact tree shows, each still cut by clearance</Row>
        <Row k="outputs">Named outputs, when one case answers several questions: {'{"team": {"values": [...], "costs": {...}}}'}</Row>
        <Row k="outputs.kind">On ada-1-2-beta, what the answer is: choice (the default), score (ordered levels: the answer adds level), noul (yes or no: p), number ({'{"number": {"min", "max", "step"}}'}: value) or many (a list of values)</Row>
        <Row k="outputs.when">On ada-1-2-beta, a discriminated union: {'{"when": {"output": "kind", "in": ["bug"]}}'} asks the output only on that branch; deciding every output answers a branch not taken {'{"outcome": null, "applies": false}'}</Row>
        <Row k="interactions">Pairs of roles always read together (learning also finds them)</Row>
        <Row k="seed, dimension">The encoding: default 42 and 4,096, at most 8,192</Row>
        <p>
          A case is sent in the same shape: <code>{'{"ticket": {"what": {"plan": "pro", "text": "charged twice"}}}'}</code>. A
          role it leaves out weighs nothing. A path names a role as <code>layer.segment.role</code>.{' '}
          <strong>Choose each role’s reading once:</strong> whether it is exact, text, a number (and its bins) or a key
          part cannot change once cases are stored.
        </p>

        <h2>4. Load your history</h2>
        <p>A CSV or JSON Lines file, as an import: on the platform’s <strong>Import</strong> tab, or by API.</p>
        <Code lang="bash">{`# Start the import: answers the job, with a one-hour upload link
curl ${API}/v1/models/tickets/imports \\
  -H "Authorization: Bearer $GLYPHH_API_KEY" -H "content-type: application/json" \\
  -d '{"format": "csv", "mapping": {"Plan": "ticket.what.plan", "Result": "outcome", "Notes": null}}'

# Send the file to the upload link (no key: the link is the credential)
curl -sS -T history.csv "<upload link>"

# Follow the job until it is done
curl ${API}/v1/jobs/<job id> -H "Authorization: Bearer $GLYPHH_API_KEY"`}</Code>
        <p>The import learns and calibrates at its end. Smaller loads can use <code>record_many</code> (<a href={`${DOCS}/data`}>Data in and out</a>).</p>

        <h2>5. Decide</h2>
        <Code lang="bash">{`curl ${API}/v1/decide \\
  -H "Authorization: Bearer $GLYPHH_API_KEY" -H "content-type: application/json" \\
  -d '{"model": "tickets", "data": {"ticket": {"what": {"plan": "pro", "text": "charged twice"}}}}'`}</Code>
        <Code lang="json">{`{"outcome": "refund",
 "probabilities": {"refund": 0.82, "keep": 0.18},
 "expected_cost": 0.54,
 "ask": false,
 "receipts": [{"id": "T-0881", "sim": 0.71, "outcome": "refund", "hash": "…", "author": "…"}],
 "model": "tickets", "version": 1}`}</Code>
        <p>
          When <code>ask</code> is true, a person should decide: <code>outcome</code> is only the best guess. Record
          their answer (<code>POST /v1/models/tickets/record</code>) and the next case learns from it.
        </p>

        <h2>6. Connect Claude</h2>
        <ol>
          <li>In Claude, <strong>Settings → Connectors</strong>, add a custom connector: <code>https://api.glyphh.ai/mcp</code>.</li>
          <li>Sign in with your Glyphh account and click Allow. No key is typed.</li>
          <li>In Claude Code, install the plugin for the Ada skill (<a href={`${DOCS}/plugin`}>The plugin</a>), then ask in plain words.</li>
        </ol>
      </>
    ),
  },
];

const build = [
  {
    slug: 'api',
    title: 'The API',
    lede: `Every call, at ${API}, with an API key or a Glyphh sign-in.`,
    body: (
      <>
        <h2>Auth</h2>
        <ul>
          <li><code>Authorization: Bearer glyphh_ak_…</code>: an API key, acting in its organisation with the clearance it was made with.</li>
          <li>A Glyphh sign-in (the platform, the connector) acts with full clearance.</li>
          <li>A request may send <code>clearance</code> lower than the caller’s, never higher. Roles above it are cut from what it reads and do not vote.</li>
          <li>Keys are made, listed and revoked by a signed-in person, not by a key: <code>POST /v1/keys {'{name, expires_in_days?, clearance?}'}</code>, <code>GET /v1/keys</code>, <code>DELETE /v1/keys/{'{id}'}</code>.</li>
        </ul>
        <h2>Models</h2>
        <Table
          head={['Call', 'Does']}
          rows={[
            [<code key="c">GET /v1/models</code>, 'Every model: name, active version, precedents held'],
            [<code key="c">POST /v1/models {'{name, spec}'}</code>, '201: a model at version 1, empty'],
            [<code key="c">GET /v1/models/{'{name}'}</code>, 'Its active spec and version, and precedents held'],
            [<code key="c">DELETE /v1/models/{'{name}'}?confirm={'{name}'}</code>, 'Deletes it and everything it holds, at once. Not undone'],
          ]}
        />
        <h2>Cases</h2>
        <Table
          head={['Call', 'Does']}
          rows={[
            [<code key="c">POST …/{'{name}'}/record {'{data, outcome?, outcomes?, ts?}'}</code>, 'One case: {id, precedents}'],
            [<code key="c">POST …/{'{name}'}/record_many {'{cases}'}</code>, 'Up to 1,000 in one transaction, all or none: {ids, added, replaced, precedents}'],
            [<code key="c">POST …/{'{name}'}/grade {'{id, value, output?}'}</code>, 'An outcome on a case already recorded (null takes it away)'],
            [<code key="c">DELETE …/{'{name}'}/precedents/{'{id}'}</code>, 'Forget one case and its outcomes'],
          ]}
        />
        <p>
          <code>…</code> is <code>/v1/models</code>. Every write takes an <code>Idempotency-Key</code> header: the same
          key and body answer the first answer and write nothing again (another body: <code>409 E_IDEMPOTENCY</code>).
        </p>
        <h2>Reads</h2>
        <Table
          head={['Call', 'Answers']}
          rows={[
            [<code key="c">POST /v1/decide {'{model, data, output?, outputs?, include?, clearance?}'}</code>, '{outcome, probabilities, expected_cost, ask, receipts, model, version}; include: ["facts"] adds the nearest fact tree; outputs decides several at once'],
            [<code key="c">POST …/{'{name}'}/decide</code>, 'The same, the model in the path'],
            [<code key="c">POST …/{'{name}'}/query</code>, 'The raw vote: {sufficient, confidence, support, count, top, outcomes, receipts}'],
            [<code key="c">POST …/{'{name}'}/probabilities</code>, 'Calibrated probabilities per outcome'],
            [<code key="c">POST …/{'{name}'}/facts {'{data, top?, min_score?}'}</code>, 'The nearest fact trees (top at most 50)'],
          ]}
        />
        <p>Each takes <code>{'{data, output?, clearance?}'}</code>. A read is what your plan counts; <code>decide</code> with <code>outputs</code> counts once per output.</p>
        <h2>Jobs</h2>
        <Table
          head={['Call', 'Does']}
          rows={[
            [<code key="c">POST …/{'{name}'}/learn</code>, 'Weights from the precedents, then calibration'],
            [<code key="c">POST …/{'{name}'}/calibrate</code>, 'The temperature alone'],
            [<code key="c">POST …/{'{name}'}/backtest</code>, <a key="a" href={`${DOCS}/tuning#backtest`}>Tuning</a>],
            [<code key="c">POST …/{'{name}'}/imports</code>, <a key="a" href={`${DOCS}/data`}>Data in and out</a>],
            [<code key="c">POST …/{'{name}'}/export {'{format}'}</code>, <a key="a" href={`${DOCS}/data#export`}>Data in and out</a>],
            [<code key="c">GET /v1/jobs/{'{id}'}</code>, '{id, model, kind, state, percent, result, error, download, upload}; state is awaiting, queued, running, done or failed'],
          ]}
        />
        <p>A job answers <code>202</code> with the job; poll it until <code>done</code> or <code>failed</code>.</p>
        <h2>Tuning</h2>
        <Row k="PUT …/{name}/spec">{'{spec, note?, backtest?}'}: a new version: {'{version, active, job}'}</Row>
        <Row k="GET, PATCH …/{name}/settings">Every lever; {'{changes, note?, backtest?}'} makes a new version</Row>
        <Row k="GET …/{name}/versions">Every version, who made it and why</Row>
        <Row k="POST …/{name}/versions/{n}/activate">Roll back (or forward)</Row>
        <h2>Usage</h2>
        <p><code>GET /v1/usage</code>: <code>{'{plan, month, resets_at, models, precedents: {used, max}, requests: {used, max, over, overage}, requests_per_second}'}</code>. A <code>max</code> of null means no cap (by contract).</p>
        <h2>Compatibility</h2>
        <p><code>POST /v1/runs {'{model, function, inputs, clearance?}'}</code> answers SDK 3.0’s call shape for <code>record</code>, <code>query</code>, <code>facts</code>, <code>probabilities</code>, <code>decide</code>, <code>learn</code> and <code>settings</code>. New code should use the routes above.</p>

        <h2 id="limits">Limits per request</h2>
        <Row k="Body">1 MB; record_many 5 MB; an import with its file in the body 5 MB of file</Row>
        <Row k="Timeouts">Reads 10 s; record_many, making and deleting a model 30 s (send again with the same Idempotency-Key)</Row>
        <Row k="Spec">64 KB of JSON, 64 roles, 20 named outputs, 200 values an output, k at most 200, dimension at most 8,192</Row>
        <Row k="Strings">No string may hold NUL (\u0000): 400 E_INVALID</Row>

        <h2 id="errors">Errors</h2>
        <p>Every refusal is <code>{'{"error": {"code", "message", "trace_id", ...}}'}</code> with a stable code. Say what it means and what to do; never retry a refusal unchanged.</p>
        <Table
          head={['Code', 'Status', 'Means']}
          rows={[
            ['E_AUTH', '401', 'No key, or one that is unknown, expired or revoked'],
            ['E_FORBIDDEN', '403', 'Needs a signed-in person (making keys)'],
            ['E_LIMIT', '403', 'Past the plan: reason precedents (a write or import would pass the cap) or requests (Free past its month), with used, max, plan, upgrade and resets_at. 413 with reason cases: over 1,000 in record_many'],
            ['E_RATE', '429', 'More calls a second than the plan allows; wait as Retry-After says'],
            ['E_INVALID', '400, 422', 'The request is malformed'],
            ['E_TOO_LARGE', '413', 'The body is over its bound'],
            ['E_SPEC', '422', 'The spec, or a case, does not fit: path says where'],
            ['E_SPEC_LIMIT', '413, 422', 'The spec is past a cloud bound: limit and max'],
            ['E_SPEC_READING', '422', 'A new spec reads a role differently (exact, text, number bins, key part). Make a new model and import'],
            ['E_FEW_ROLES', '422', 'Over 100,000 precedents and under half the voting roles given: names the roles given and those it could take. Ask with more of the case'],
            ['E_MAPPING', '422', 'An import’s header the spec cannot take'],
            ['E_MODEL_MISSING, E_PRECEDENT_MISSING, E_JOB_MISSING, E_VERSION_MISSING', '404', 'Not there'],
            ['E_BUSY', '409', 'An import or re-encode is already running on the model'],
            ['E_NOT_READY', '409', 'That version is still being made'],
            ['E_NO_CHANGE', '409', 'The change changes nothing'],
            ['E_IDEMPOTENCY', '409', 'The same Idempotency-Key with another body'],
            ['E_VERSION_GONE', '410', 'That version’s store was dropped (7 days unused)'],
            ['E_TIMEOUT', '504', 'Not answered in time; a write is made once, so send it again with the same key'],
            ['E_UNAVAILABLE', '503', 'The service cannot take it for a moment'],
            ['E_INTERNAL', '500', 'Our fault; trace_id helps us find it'],
          ]}
        />
      </>
    ),
  },
  {
    slug: 'tuning',
    title: 'Tuning',
    lede: 'Every lever is a setting or part of the spec, every change is a version, and a backtest tells you before it goes live.',
    body: (
      <>
        <h2>Settings</h2>
        <Table
          head={['Setting', 'Default', 'What it does', 'A change is']}
          rows={[
            ['k', '15', 'Nearest precedents a vote is over (at most 200)', 'Live'],
            ['min_sim', '0.10', 'Similarity a precedent needs to vote: higher says nothing rather than guess', 'Live'],
            ['word_evidence', '2', 'How much a case’s words weigh on the vote (0 to 5)', 'Live'],
            ['word_weights', 'true', 'Learn a weight per word of a text role', 'Re-encoded'],
            ['word_floor', '0.35', 'The least a learned word weighs', 'Re-encoded'],
            ['interactions, max_interactions', 'true, 5', 'Learn pairs of roles that tell more together (0 to 50)', 'Re-encoded'],
            ['rare', '5', 'Values, words and pairs seen fewer times are not learned from', 'Re-encoded'],
            ['word_pairs, max_word_pairs', 'false, 20', 'Learn pairs of words, for intents that are phrases (0 to 200)', 'Re-encoded'],
            ['lexicon', 'true', 'Read words through WordNet and Moby, so related words correlate', 'Re-encoded'],
            ['calibrate_by', 'loss', 'loss: probabilities that mean what they say; cost: that decide best by the costs', 'Live, then recalibrated'],
            ['calibrate_sample', '200', 'The newest precedents a calibration holds out', 'Live'],
            ['refresh_every', 'none', 'Learn again every so many precedents, as a job', 'Live'],
            ['shortlist', '1,000', 'Candidates a big model’s read re-ranks exactly (0: every precedent; else 100 to 10,000)', 'Live'],
          ]}
        />
        <p>
          In the spec, weights, security weights, costs, <code>ask</code>, <code>ask_below</code> and <code>report</code>{' '}
          are live; roles added or taken away, declared interactions, <code>seed</code> and <code>dimension</code> are
          re-encoded; a role’s reading cannot change (<code>E_SPEC_READING</code>).
        </p>
        <p>
          <strong>Live</strong> is active at once on the same precedents. <strong>Re-encoded</strong> is a job: the
          precedents are restated for the new version into a store of its own, which learns before it goes live, while
          the old version answers. One import or re-encode runs at a time on a model (<code>E_BUSY</code>).
        </p>
        <h2>Versions</h2>
        <ul>
          <li>Every spec or settings change is a new version, kept with who made it, the note and the backtest that chose it.</li>
          <li><code>POST …/versions/{'{n}'}/activate</code> rolls back, with what that version had learned. To a version on the same store it is at once; to one on another store it is a job that brings that store up to date, so no write is lost.</li>
          <li>A store no version has read for 7 days is dropped; its versions can no longer be activated (<code>410 E_VERSION_GONE</code>).</li>
        </ul>
        <h2 id="backtest">Backtest</h2>
        <Code lang="json">{`POST /v1/models/tickets/backtest
{"candidates": [{"settings": {"word_evidence": 0}, "name": "no word evidence"},
                {"spec_version": 2},
                {"spec": {"...": "..."}}],
 "holdout": {"newest": 200},
 "output": "default"}`}</Code>
        <ul>
          <li>Up to 10 candidates. The live version is always scored too, as <code>active</code>.</li>
          <li><code>holdout</code>: the newest <code>n</code> graded precedents (default 200), or <code>{'{"fraction": 0.2, "seed": 7}'}</code>.</li>
          <li>Each learns and calibrates on the rest, then decides every held-out case. The live model is never touched.</li>
          <li>The answer, per candidate: <code>accuracy</code>, <code>top_accuracy</code> (the plain vote), <code>log_loss</code>, <code>cost</code> and <code>cost_mean</code>, <code>ask_rate</code> and <code>accuracy_answered</code>, <code>coverage</code>, <code>calibration_error</code>, <code>mistakes</code> and, for a candidate, <code>change</code> against <code>active</code>.</li>
          <li>Pass the job’s id as <code>backtest</code> when you apply the change, so the version records why.</li>
        </ul>
        <h2>What usually helps</h2>
        <ul>
          <li>Text decides the case: <code>word_evidence</code> up (2 to 3), <code>word_pairs</code> on for phrase-like intents.</li>
          <li>Few, noisy precedents: <code>rare</code> up, <code>k</code> up.</li>
          <li>It guesses where it should not: <code>min_sim</code> up, or <code>ask_below</code> up.</li>
          <li>Costs matter more than being right: <code>calibrate_by: cost</code>.</li>
        </ul>
        <p>One change at a time, each backtested. What needs code is not a lever: a derived field (a ratio, a weekday) is computed by the caller and sent as a role; a business rule is applied around the answer.</p>
      </>
    ),
  },
  {
    slug: 'ada-versions',
    title: 'Ada versions',
    lede: 'Every model version is answered by the Ada it was made with; moving to another is your choice, backtested first.',
    body: (
      <>
        <h2>What a version is</h2>
        <p>
          A change to Ada’s maths can change what a model answers. So Ada versions have names, like{' '}
          <code>ada-1-0</code> or <code>ada-1-1-beta</code>, and each model version carries the Ada it was made and
          learned with. It is always answered by that Ada, never another.
        </p>
        <Table
          head={['Version', 'Status', 'What changes']}
          rows={[
            ['ada-1-0', 'Stable, the default', 'The launch version'],
            ['ada-1-2-beta', 'Beta', 'Time can weigh: a model whose answers drift gives its newer precedents more say. Typed outputs and unions (outputs.kind and outputs.when in the spec). Includes ada-1-1-beta’s change'],
            ['ada-1-1-beta', 'Deprecated, ends 2026-11-24', 'A pair of roles’ value the model never learned no longer votes, so the roles’ own weights decide. Within noise of ada-1-0 on German Credit'],
          ]}
        />
        <p>Release notes for each version are on the platform’s <strong>Ada</strong> page.</p>
        <h2>Stable and beta</h2>
        <ul>
          <li><strong>Stable</strong>: the latest stable is the default. With no <code>ada</code> given, a new model, an upgrade or a backtest uses it.</li>
          <li><strong>Beta</strong>: opt in by name, never the default, and labelled Beta everywhere.</li>
          <li>An unknown or retired name is refused, naming the latest stable as the fix (<code>422 E_ADA_UNKNOWN</code>, <code>410 E_ADA_RETIRED</code>). It is never silently swapped for another.</li>
        </ul>
        <h2>Which version a model runs</h2>
        <Row k="Platform">The model’s header, and an Ada column on its Versions tab</Row>
        <Row k="API">ada on GET /v1/models/{'{name}'} and on each of its versions</Row>
        <Row k="Every answer">The Glyphh-Ada header</Row>
        <h2>Upgrade</h2>
        <p>Backtest against the new version first, then upgrade:</p>
        <Code lang="json">{`POST /v1/models/tickets/backtest
{"ada": "ada-1-2-beta"}

POST /v1/models/tickets/upgrade
{"ada": "ada-1-2-beta"}`}</Code>
        <Code lang="python">{`tickets.backtest(ada="ada-1-2-beta")
tickets.upgrade(ada="ada-1-2-beta")`}</Code>
        <p>Or ask Claude through the connector: “backtest tickets on ada-1-2-beta, and upgrade it if it does better”.</p>
        <ul>
          <li>An upgrade makes a new model version on a store of its own, as a job; the old version answers until the job ends and the new one goes live.</li>
          <li>Any supported version can be chosen, an older one included (a downgrade).</li>
          <li>To roll back, activate the previous version (<a href={`${DOCS}/tuning`}>Tuning</a>).</li>
        </ul>
        <h2>Support policy</h2>
        <ul>
          <li>At most three versions are kept: the latest stable, the stable before it while it is deprecated, and one beta.</li>
          <li>A new stable deprecates the one before it, which ends 180 days later. A beta superseded by another ends 30 days later.</li>
          <li>A deprecated version keeps answering, with a notice (the <code>Glyphh-Ada-Notice</code> header, and warnings on the platform, the SDKs and the plugin). It cannot be chosen for a new model or an upgrade.</li>
          <li>At its end date, every model on it is moved to the latest stable automatically, with a note on the new version. No model is left unanswerable. Versions on a retired Ada stay listed but cannot be made live again.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'data',
    title: 'Data in and out',
    lede: 'Load history in bulk, get everything back at any time, and delete what you want gone.',
    body: (
      <>
        <h2>Three ways in</h2>
        <Row k="record_many">Up to 1,000 cases a request, 5 MB, one transaction. A spec with key parts is idempotent by itself: the same id replaces its precedent</Row>
        <Row k="An import">A file, as a job: CSV, JSON Lines, a model’s own export, or an Ada SQLite store. Up to 200 MB</Row>
        <Row k="From Claude">The Ada skill maps your file to the spec with you, then sends it in chunks or as an import</Row>
        <h2>Imports</h2>
        <p><code>POST /v1/models/{'{name}'}/imports {'{format, mapping?, partial?, learn?, content?, content_base64?}'}</code></p>
        <ul>
          <li><code>format</code>: <code>csv</code>, <code>jsonl</code> or <code>ada_sqlite</code>.</li>
          <li>Without the file, it answers the job waiting for it and a one-hour upload link: <code>PUT</code> the file there (<code>curl -T</code>). The link is its own credential.</li>
          <li>With the file in the body (<code>content</code> as text, or <code>content_base64</code>), up to 5 MB, it is queued at once.</li>
          <li><strong>JSON Lines:</strong> one <code>{'{data, outcome?, outcomes?, ts?, id?}'}</code> a line.</li>
          <li><strong>CSV:</strong> a header names a role by its path (<code>ticket.what.plan</code>), or <code>mapping</code> maps it; <code>outcome</code> (or <code>outcome.&lt;output&gt;</code>) names the outcome; <code>null</code> skips a column. An empty cell is nothing; a bad number refuses its row; a header the spec cannot take refuses the import (<code>E_MAPPING</code>).</li>
          <li>The job checks every row and counts the new ids against your plan’s cap first. Past it, the import is refused whole (<code>E_LIMIT</code>), unless <code>partial: true</code>, which records up to the cap.</li>
          <li>Refused rows are named (the first 100) and the rest go in. Then the model learns and calibrates once (<code>learn: false</code> skips it).</li>
          <li><code>GET /v1/models/{'{name}'}/imports/{'{id}'}</code> or <code>GET /v1/jobs/{'{id}'}</code>: <code>state</code>, <code>percent</code>, and the result: rows, recorded, added, replaced, refused.</li>
          <li>The uploaded file is kept only until its import ends.</li>
        </ul>
        <h2 id="export">Export</h2>
        <p><code>POST /v1/models/{'{name}'}/export {'{format}'}</code>, a job, on every plan. When done, the job carries a one-hour download link.</p>
        <Row k="jsonl">A zip: the precedents as stored ({'{id, situation, outcome, outcomes, ts, author}'}), every spec version and what was learned. Imported into a model of the same spec, it answers exactly as the original</Row>
        <Row k="ada_sqlite">An Ada SQLite store, with its encoded precedents, outcomes, learned weights and calibration</Row>
        <p>An export holds cases as Ada read them, not as you sent them. To change how a role reads, import your original file into a new model.</p>
        <h2>Deletion</h2>
        <Row k="One case">DELETE /v1/models/{'{name}'}/precedents/{'{id}'}: gone from the store at once; what was learned from it stays until the next learn</Row>
        <Row k="A model">DELETE /v1/models/{'{name}'}?confirm={'{name}'}: every store, version, learned weight, job and file, at once, in one transaction</Row>
        <Row k="An organisation">Ask support@glyphh.ai: its whole schema is dropped</Row>
        <p>Deleted data leaves the database’s backups when they age out (<a href="https://glyphh.ai/privacy">Privacy Policy</a>).</p>
      </>
    ),
  },
];

const plans = [
  {
    slug: 'plans',
    title: 'Plans and limits',
    lede: 'Plans sell precedents held and reads a month. Never seats, models or keys.',
    body: (
      <>
        <Table
          head={['', 'Price', 'Precedents', 'Reads a month', 'Past the month', 'Calls a second']}
          rows={[
            ['Free', '$0', '1,000', '5,000', 'Refused until the month turns', '5'],
            ['Basic', '$20 a month', '10,000', '50,000', '$1 per 10,000', '10'],
            ['Pro', '$99 a month', '100,000', '1,000,000', '$1 per 10,000', '50'],
            ['Team', '$299 a month', '1,000,000', '5,000,000', '$1 per 10,000', '200'],
            ['Enterprise', 'By contract', 'By contract', 'By contract', 'By contract', 'By contract'],
          ]}
        />
        <p>Models, members and keys are unlimited on every plan. Backtests, versions and export are on every plan.</p>
        <h2>What counts</h2>
        <ul>
          <li><strong>Precedents</strong>: the organisation’s total across its models’ live stores. A store kept only for rollback does not count. A write or import past the cap is refused whole (<code>E_LIMIT</code> <code>precedents</code>); an import with <code>partial</code> records up to it.</li>
          <li><strong>Reads</strong>: each <code>decide</code>, <code>query</code>, <code>probabilities</code> and <code>facts</code>; a <code>decide</code> with <code>outputs</code> once per output. Counted when received. The month is the calendar month, UTC.</li>
          <li><strong>Not counted as reads</strong>: writes, imports, exports, learning, backtests. They are bounded by the cap and the rate.</li>
          <li><strong>Rate</strong>: every call, job polls included, against the plan’s calls a second (<code>429 E_RATE</code>, <code>Retry-After</code>).</li>
          <li><strong>Past the month</strong>: Free is refused (<code>403 E_LIMIT</code> <code>requests</code>, naming the plan that lifts it and when the month turns); Basic, Pro and Team go on, and the reads past are billed at $1 per 10,000 on a later invoice.</li>
        </ul>
        <p>See your use on the platform’s Usage page, with <code>GET /v1/usage</code>, or from the SDKs’ <code>usage()</code>. Billing and cancellation: <a href="https://glyphh.ai/terms">Terms</a> and <a href="https://glyphh.ai/refund">Refund Policy</a>.</p>
      </>
    ),
  },
];

export const GROUPS = [
  { title: 'Ada Cloud', pages: cloud },
  { title: 'Building models', pages: build },
  { title: 'Claude and code', pages: [...PLUGIN_PAGES, ...SDK_PAGES] },
  { title: 'Plans', pages: plans },
];
export const PAGES = GROUPS.flatMap((g) => g.pages);
export const hrefOf = (p) => (p.slug === 'introduction' ? DOCS : `${DOCS}/${p.slug}`);
