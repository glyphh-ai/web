import { Architecture, Code, Row } from './ui';
import { PLUGIN_PAGES, SDK_PAGES } from './pages';
import { RUN_HUB, RUN_PACKAGES } from './run';
import { DOCS } from './base';

// The docs explain the architecture and how to run rrotor, the plugin and the
// SDKs: nothing else. Every fact is checked against rrotor's docs/architecture.md
// and docs/self-hosting, the server's docs/architecture.md and pricing.md, and
// glyphh-ai/glyphh (README, sdk/*/README.md, the Ada skill). Each fact once.

const architecture = [
  {
    slug: 'introduction',
    title: 'Architecture',
    lede: 'Glyphh Ada answers from the cases you have already graded, and asks when it is unsure. Here are its parts, how a call flows, and where the data lives.',
    body: (
      <>
        <Architecture />
        <h2>The parts</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Part</th><th>What it is</th><th>Where</th></tr></thead>
            <tbody>
              <tr><td><strong>Ada</strong></td><td>Typed models that learn from precedents. Record graded cases; a new case is answered from its nearest precedents with calibrated probabilities, a person is asked when it is unsure, and the model learns its own weights. A model is a GitHub repo; a version is a commit</td><td>Inside rrotor</td></tr>
              <tr><td><strong>rrotor</strong></td><td>The runtime: deploys a model by commit, runs each call in a sandbox, answers over REST and MCP. You run it; Glyphh does not host it</td><td><code>ghcr.io/glyphh-ai/rrotor</code>, at <code>https://&lt;host&gt;</code></td></tr>
              <tr><td><strong>The server</strong></td><td>Accounts, runtime keys and runtime tokens, the signed licence key, the Glyphh sign-in, the runtime’s link. Never on the data path</td><td><code>https://api.glyphh.ai</code></td></tr>
              <tr><td><strong>The platform</strong></td><td>Sign in, Runtimes (add one, its token and licence), API Keys, Usage, Logs, Licence, Models</td><td><a href="https://platform.glyphh.ai">platform.glyphh.ai</a></td></tr>
              <tr><td><strong>The plugin</strong></td><td>For Claude Code: the account panel, the Ada skill, the file ledger</td><td><a href={`${DOCS}/plugin`}>The plugin</a></td></tr>
              <tr><td><strong>The SDKs</strong></td><td>Python (<code>glyphh</code>) and TypeScript (<code>@glyphh-ai/glyphh</code>), 3.1.0</td><td><a href={`${DOCS}/sdks`}>The SDKs</a></td></tr>
            </tbody>
          </table>
        </div>
        <h2>How a call flows</h2>
        <ol>
          <li><strong>Claude</strong> adds <code>https://&lt;host&gt;/mcp</code> as a custom connector. rrotor is an OAuth protected resource whose authorization server is <code>api.glyphh.ai</code>, so Claude signs in to Glyphh with one Allow click and no key; rrotor checks the token with the server and keeps the answer a minute.</li>
          <li><strong>Software</strong> sends <code>Authorization: Bearer &lt;runtime key&gt;</code>. rrotor holds only each key’s SHA-256.</li>
          <li><strong>A deploy</strong> (<code>{'{repo, commit, token?}'}</code>) fetches exactly that commit from GitHub, checks its manifest, installs its pinned dependencies and makes it the active version.</li>
          <li><strong>A call</strong> opens a run in its own sandbox (bubblewrap, Landlock, seccomp; no network but the hosts its manifest declares): <code>load</code>, the function, <code>end</code>. It answers a Result. A run that asks (<code>needs_input</code>, <code>needs_approval</code>) waits up to 15 minutes for a continue.</li>
        </ol>
        <p>The call goes from the caller to rrotor and back. Nothing of Glyphh’s sees its inputs or its answer.</p>
        <h2>The link</h2>
        <p>
          rrotor connects out to <code>api.glyphh.ai</code> over a WebSocket; the server never connects in. Down it
          come the licence key, the runtime keys’ hashes and deploys. Up it go each deploy (model, version, commit) and,
          at most once a minute, each key’s call count and the runtime’s precedent total: never a call’s inputs or
          outputs. A daily heartbeat (<code>POST /v1/license/verify</code>) fetches the newest licence key for networks
          that block WebSockets. With <code>RROTOR_LINK=off</code> (air-gapped) there is no link, no heartbeat and no
          Glyphh sign-in: runtime keys are the only way in.
        </p>
        <h2 id="where-the-data-lives">Where the data lives</h2>
        <p>Everything rrotor keeps is on its one volume, <code>/data</code>:</p>
        <Row k="models/<name>/versions/<commit>/">Each deployed version: the checkout and its venv, immutable</Row>
        <Row k="models/<name>/data/">The model’s data: an Ada model’s <code>precedents.sqlite</code>, which outlives every version</Row>
        <Row k="runs/<run_id>/">Each run’s record and its log</Row>
        <Row k="runtime.json, access.json">The runtime’s id and token; the runtime keys’ SHA-256s</Row>
        <Row k="licence.json">The licence key held</Row>
        <Row k="audit/">The audit log (Enterprise)</Row>
        <p>
          Glyphh keeps your account, your keys, the record of each model and version (by commit), each key’s call
          count, the precedent total and the heartbeat. Never a model’s code, its precedents, its inputs or its answers.
        </p>
      </>
    ),
  },
  {
    slug: 'clusters',
    title: 'Clusters',
    lede: 'Several rrotors as one runtime: a head, followers, and failover by plan.',
    body: (
      <>
        <p>
          A cluster is several self-hosted rrotors of one runtime, each with its own <code>/data</code>, behind your
          load balancer. One is the <strong>head</strong>; the rest join it as <strong>followers</strong>, up to the
          licence key’s <code>max_nodes</code>.
        </p>
        <ul>
          <li><strong>The head is the only writer</strong> of what syncs: each Ada model’s precedent store, the deployed versions, the runtime keys and the licence key, shipped to every follower as one ordered log.</li>
          <li><strong>Followers serve reads</strong> from their own copy and forward writes to the head: a function marked <code>{'"writes": true'}</code>, a deploy, and anything about a run another node holds (a run id is <code>&lt;node id&gt;~&lt;uuid&gt;</code>).</li>
          <li><strong>The head also</strong> holds the runtime’s link, exports the cluster’s logs and keeps its audit log, and holds the precedent cap on the synced store: a Pro cluster holds 50,000 precedents across its nodes, not on each.</li>
          <li><strong>Read-your-writes:</strong> every answer carries <code>Rrotor-Cluster-Seq</code>; a request with <code>Rrotor-Min-Seq</code> is answered from a node at least that far, and a follower that forwarded a write answers once it has applied it (up to 2 seconds). The SDKs do this for you.</li>
        </ul>
        <h2>By plan</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th></th><th>Nodes</th><th>Sync</th><th>When the head is lost</th></tr></thead>
            <tbody>
              <tr><td>Free (no key)</td><td>1</td><td>No</td><td>One node, no cluster</td></tr>
              <tr><td>Pro</td><td>3</td><td>Yes</td><td>Failover by command: the head restarts, or you promote a node</td></tr>
              <tr><td>Team</td><td>10</td><td>Yes</td><td>Failover by command</td></tr>
              <tr><td>Enterprise</td><td>Unlimited</td><td>Yes</td><td>High availability: a new head is elected in 1.5 to 3 seconds</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>While there is no head,</strong> reads go on and writes answer 503 <code>E_NO_HEAD</code> with <code>Retry-After: 2</code>.</li>
          <li><strong>Failover by command</strong> (Pro, Team): <code>rrotord cluster promote &lt;node&gt;</code> makes a node head once most members answer, it is not behind another member, and the old head answers or you confirm it is down. Terms fence the old head: when it comes back it steps down and takes the new head’s copy.</li>
          <li><strong>Elected heads</strong> (Enterprise): the first five members vote, the rest are learners. A write is answered once most voters hold it, so no acknowledged write is lost; not within 5 seconds, it answers 503 <code>E_NOT_COMMITTED</code> and is kept. In a partition the side without a majority serves reads and refuses writes. Run three or more voters, an odd number: two nodes behave like Pro.</li>
          <li><strong>Without a key that allows sync,</strong> the nodes never connect, so exactly one serves rather than letting the load balancer spread callers across separate stores. The others answer 503 <code>E_LICENCE_CLUSTER</code> (and <code>/readyz</code> <code>unlicensed</code>) until a key with sync arrives; they then cluster within seconds.</li>
        </ul>
        <p>Running one: <a href={`${DOCS}/run-a-cluster`}>Run a cluster</a>.</p>
      </>
    ),
  },
  {
    slug: 'licensing',
    title: 'Licensing',
    lede: 'A signed key per paid month sets a node’s limits. With no key, rrotor runs as Community.',
    body: (
      <>
        <div className="dx-table">
          <table>
            <thead><tr><th>Key</th><th>Nodes in a cluster</th><th>Precedents per node</th><th>Sync</th></tr></thead>
            <tbody>
              <tr><td>None (Community, Free)</td><td>1</td><td>5,000</td><td>No</td></tr>
              <tr><td>Pro</td><td>3</td><td>50,000</td><td>Yes</td></tr>
              <tr><td>Team</td><td>10</td><td>500,000</td><td>Yes</td></tr>
              <tr><td>Enterprise</td><td>Unlimited</td><td>Unlimited</td><td>Yes, with high availability</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Enterprise also keeps the audit log and has air-gapped keys. Plans and prices:{' '}
          <a href="https://glyphh.ai/pricing">glyphh.ai/pricing</a>.
        </p>
        <h2>The key</h2>
        <ul>
          <li><code>&lt;payload&gt;.&lt;signature&gt;</code>, each base64url: a JSON payload and an Ed25519 signature over its exact bytes, made by the Glyphh server. rrotor checks it with Glyphh’s public key, which is in its code, not its environment: no network request, a key changed by one byte is refused, and no setting can make rrotor trust another signer.</li>
          <li>The payload carries <code>license_id</code>, <code>tier</code>, <code>max_nodes</code>, <code>max_precedents</code>, <code>cluster_sync_enabled</code>, <code>issued_at</code>, <code>expires_at</code> and <code>customer_id</code> (the server’s id, no name or address). Nothing else.</li>
          <li><code>GET /v1/licence</code> (and <code>/v1/health</code>) shows the key held, where it came from, its <code>state</code> (<code>live</code>, <code>grace</code>, <code>expired</code>, <code>bad</code>, <code>none</code>) with the days left, the limits that apply, <code>ha</code> (Enterprise) and <code>precedents {'{held, cap, over}'}</code>.</li>
        </ul>
        <p>To read a key you hold:</p>
        <Code lang="bash">{`printf %s "$GLYPHH_LICENSE_KEY" | cut -d. -f1 | tr '_-' '/+' | base64 -d 2>/dev/null | python3 -m json.tool`}</Code>
        <h2 id="where-the-key-goes">Where the key goes</h2>
        <p>A linked rrotor needs nothing: each new key arrives over the link or the heartbeat. rrotor reads every source:</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Source</th><th>Read</th></tr></thead>
            <tbody>
              <tr><td><code>GLYPHH_LICENSE_KEY</code> (or <code>RROTOR_LICENCE</code>)</td><td>At start</td></tr>
              <tr><td>The file <code>/etc/rrotor/license.key</code> (or <code>/data/licence.token</code>)</td><td>At start, every hour and on <code>SIGHUP</code></td></tr>
              <tr><td>The heartbeat’s answer</td><td>At boot and every 24 hours, with the link on</td></tr>
              <tr><td>The link’s welcome</td><td>Each time the link connects</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>Of the keys that check out, rrotor holds the one <strong>issued last</strong> that is not more than 14 days past its expiry, so a change of plan takes effect at the next payment and an older key left in a file cannot override a newer one. The key held is kept in <code>/data/licence.json</code>, so a restart keeps it.</li>
          <li>A key that does not check out is logged at error, with its source, at every start and hourly re-read, and the node runs as Community. Nothing a licence does stops rrotor or refuses a run: the worst case is Community’s limits.</li>
          <li><code>PUT /v1/licence</code> is refused on a self-hosted rrotor (403 <code>E_LOCAL_ONLY</code>), so a runtime key cannot hand it a key.</li>
        </ul>
        <h2 id="air-gapped">Air-gapped</h2>
        <ol>
          <li>Copy the key from the platform’s Settings → Licence.</li>
          <li>Give it to rrotor in <code>GLYPHH_LICENSE_KEY</code> or the file <code>/etc/rrotor/license.key</code>, and set <code>RROTOR_LINK=off</code>: rrotor then makes no request to Glyphh at all, and callers use runtime keys.</li>
          <li>Each month, put the next key in the file and send rrotor <code>SIGHUP</code> (<code>docker compose kill -s HUP rrotor</code>), or wait up to an hour. Nothing restarts.</li>
        </ol>
        <p>
          Each package’s steps: <a href={`${DOCS}/docker-compose#air-gapped`}>Docker Compose</a>,{' '}
          <a href={`${DOCS}/helm#air-gapped`}>Helm</a>; Terraform takes the key as <code>license_key</code>.
        </p>
        <h2>Grace</h2>
        <ul>
          <li><strong>Until <code>expires_at</code></strong> (the end of the paid month) a key is current. A new one comes with each payment, so a running subscription never lapses.</li>
          <li><strong>For 14 days past it,</strong> everything runs on the key’s limits; the health says <code>grace</code> with the days left, and rrotor logs a warning daily.</li>
          <li><strong>After that,</strong> Community’s limits: precedents past 5,000 stay and are served, and new ones are refused (below). Nothing is deleted, no model is refused, and a new key from any source lifts the limits at once.</li>
          <li>A key cannot be called back once issued: it holds until <code>expires_at</code> plus 14 days.</li>
        </ul>
        <h2>The heartbeat</h2>
        <p>
          At boot and every 24 hours, with the link on: <code>POST https://api.glyphh.ai/v1/license/verify</code> with
          the runtime token. The answer is the newest key for your subscription; if the call fails, rrotor keeps the key
          it has and tries again. The body, whole:
        </p>
        <Row k="machine">SHA-256 of the runtime id and the host’s machine id (or a random id kept in /data): tells apart two machines running one runtime, and cannot be read back</Row>
        <Row k="licence_id">The key held, or null</Row>
        <Row k="version">rrotor’s version</Row>
        <Row k="active_runs">How many runs are in progress, a number</Row>
        <Row k="node_id, cluster_id, role">The node’s name, its cluster and its role (standalone, head or follower), to count nodes</Row>
        <Row k="precedents">How many precedents the node holds, a number</Row>
        <p>
          Never sent: IP addresses, hostnames, prompts, model inputs or outputs, model code, files, secrets, anything
          about your users. The server keeps the body and when it came, not the caller’s address.
        </p>
        <h2>The caps</h2>
        <Row k="Precedents">Per node, across all its Ada models; in a cluster, held by the head on the synced store. A <code>record</code> past the cap indexes nothing and the run ends <code>done</code>, never <code>failed</code>, with data <code>{'{"status": "limit_exceeded", "indexed": false, "message", "precedents", "cap"}'}</code>. Earlier records stay. A store over the cap after a downgrade keeps every precedent and answers; only growth is refused</Row>
        <Row k="Nodes">Held by the head at join: a node past <code>max_nodes</code> is refused (<code>E_CLUSTER_FULL</code>), answers 503 and asks again every minute. A key with a smaller cap removes the nodes that joined last</Row>
      </>
    ),
  },
  {
    slug: 'logs',
    title: 'Logs and drains',
    lede: 'Everything stays on rrotor unless you send it somewhere.',
    body: (
      <>
        <Row k="Log lines">JSON on stdout, tokens masked; each names the node (and in a cluster <code>cluster_id</code> and <code>role</code>), the run and the trace. A run’s own <code>ctx.log</code> lines stay in its log, <code>GET /v1/runs/{'{id}'}/log</code></Row>
        <Row k="Audit log">Enterprise: an event per call, deploy, key change, licence change, refusal (401, 403) and cluster change, with who did it. Kept in <code>/data/audit</code>, a file a day, read with <code>GET /v1/audit</code> or <code>audit_query</code>; in a cluster, the head keeps every node’s. Below Enterprise the events are log lines and <code>GET /v1/audit</code> is 403 <code>E_NOT_IN_PLAN</code></Row>
        <Row k="A drain">Logs, metrics, traces and audit events by OpenTelemetry (OTLP over HTTP, protobuf) to your own collector, never through Glyphh. In a cluster the followers send theirs to the head, which exports for every node: one endpoint, one egress</Row>
        <Row k="Server-side logging">Opt-in: the same signals also go to Glyphh, shown on the platform’s Settings → Logs and kept 7 days. rrotor says so at every start. Not with the link off; in a cluster only the head sends</Row>
        <p>
          Never logged or sent anywhere: a model’s inputs and outputs, <code>ctx.log</code>’s fields, secrets, tokens,
          keys, request bodies. The link’s usage and the heartbeat are licensing, with fixed fields.
        </p>
        <h2>Settings</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Variable</th><th>Default</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>OTEL_EXPORTER_OTLP_ENDPOINT</code></td><td></td><td>Your collector, e.g. <code>http://otel-collector:4318</code>. Unset: no drain. OpenTelemetry’s other <code>OTEL_EXPORTER_OTLP_*</code> variables mean what it says; <code>grpc</code> is refused at start (<code>E_CONFIG</code>)</td></tr>
              <tr><td><code>OTEL_RESOURCE_ATTRIBUTES</code>, <code>OTEL_SERVICE_NAME</code></td><td>, <code>rrotor</code></td><td>Added to every signal, beside rrotor’s own (version, node id, runtime id, cluster id, role)</td></tr>
              <tr><td><code>OTEL_TRACES_SAMPLER</code>, <code>OTEL_TRACES_SAMPLER_ARG</code></td><td><code>parentbased_always_on</code></td><td><code>always_on</code>, <code>always_off</code>, <code>traceidratio</code> or their <code>parentbased_</code> forms, and the ratio</td></tr>
              <tr><td><code>RROTOR_DRAIN_SIGNALS</code></td><td><code>logs,metrics,traces,audit</code></td><td>What the drain sends</td></tr>
              <tr><td><code>RROTOR_DRAIN_BUFFER</code></td><td><code>10000</code></td><td>Records held per signal while the collector is down; past it the oldest are dropped and counted. Audit events are never dropped: the drain reads them from <code>/data/audit</code></td></tr>
              <tr><td><code>RROTOR_DRAIN_AT</code></td><td><code>head</code></td><td>In a cluster: by the head, or <code>node</code>, each node itself</td></tr>
              <tr><td><code>RROTOR_LOG_PAYLOADS</code></td><td><code>off</code></td><td><code>on</code>: inputs and results (4 KB each) in your drain only; never sent to Glyphh</td></tr>
              <tr><td><code>RROTOR_SERVER_LOGS</code></td><td><code>off</code></td><td><code>on</code>: server-side logging</td></tr>
              <tr><td><code>RROTOR_AUDIT_RETENTION_DAYS</code></td><td><code>90</code></td><td>Days of audit log kept (Enterprise)</td></tr>
              <tr><td><code>RROTOR_AUDIT_MAX_MB</code></td><td><code>1024</code></td><td>The most the audit log may take; past it the oldest day goes, never today’s</td></tr>
              <tr><td><code>RROTOR_LOG_LEVEL</code></td><td><code>INFO</code></td><td>The log level</td></tr>
            </tbody>
          </table>
        </div>
        <Row k="Metrics">rrotor.runs, rrotor.run.seconds, rrotor.precedents, rrotor.precedents.cap, rrotor.link.state, rrotor.drain.dropped; in a cluster rrotor.cluster.term and rrotor.cluster.lag</Row>
        <Row k="Traces">A span per API request (your traceparent honoured), the sandbox’s start and the function under it; in a cluster, one trace across the forward to the head and the head’s work</Row>
      </>
    ),
  },
];

const run = [
  RUN_HUB,
  ...RUN_PACKAGES,
  {
    slug: 'run-a-cluster',
    title: 'Run a cluster',
    lede: 'The settings, the packages and the commands.',
    body: (
      <>
        <p>How a cluster works: <a href={`${DOCS}/clusters`}>Clusters</a>. It needs a licence key with sync on every node.</p>
        <h2>Settings</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Variable</th><th>Default</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>RROTOR_CLUSTER</code></td><td><code>off</code></td><td><code>on</code>: join or make a cluster</td></tr>
              <tr><td><code>RROTOR_NODE_ID</code></td><td>The hostname</td><td>This node’s name, <code>[a-z0-9-]{'{1,63}'}</code></td></tr>
              <tr><td><code>RROTOR_CLUSTER_PEERS</code></td><td></td><td><code>host:port,…</code> of every node, the same on each. Or:</td></tr>
              <tr><td><code>RROTOR_CLUSTER_DNS</code></td><td></td><td>A name whose records are the nodes (a headless Service)</td></tr>
              <tr><td><code>RROTOR_CLUSTER_PORT</code></td><td><code>7778</code></td><td>Node to node only: open it between the nodes and never behind the public load balancer</td></tr>
              <tr><td><code>RROTOR_CLUSTER_SECRET</code></td><td></td><td>Required: <code>openssl rand -base64 32</code>, the same on every node. The nodes derive mutual TLS from it; anyone with it can join</td></tr>
              <tr><td><code>RROTOR_CLUSTER_SECRET_PREVIOUS</code></td><td></td><td>Trusted too while a new secret rolls out</td></tr>
              <tr><td><code>RROTOR_CLUSTER_HEAD</code></td><td>The lowest node id</td><td>The node that makes the cluster the first time</td></tr>
              <tr><td><code>RROTOR_CLUSTER_ADVERTISE</code></td><td><code>&lt;node id&gt;:&lt;port&gt;</code></td><td>How the other nodes reach this one</td></tr>
            </tbody>
          </table>
        </div>
        <h2>The packages</h2>
        <p>Each sets these for you; you choose the number of nodes (at most the key’s <code>max_nodes</code>) and keep the secret.</p>
        <Row k="Compose">Three nodes and Caddy on one machine to try it, or a node per machine behind your load balancer (<a href={`${DOCS}/docker-compose#a-cluster`}>Docker Compose</a>)</Row>
        <Row k="Helm">cluster.enabled and replicas, found at the headless Service, the secret made on install and kept (<a href={`${DOCS}/helm#a-cluster`}>Helm</a>)</Row>
        <Row k="Terraform">node_count, nodes across zones behind an AWS NLB or Google’s HTTPS load balancer, the secret in the cloud’s secret store (<a href={`${DOCS}/terraform#a-cluster`}>Terraform</a>)</Row>
        <ul>
          <li>Point the load balancer’s health check at <code>/readyz</code> (503 with <code>joining</code>, <code>catching_up</code>, <code>no_cluster</code>, <code>refused</code> or <code>unlicensed</code>) and liveness at <code>/healthz</code>.</li>
          <li>Every node runs the same image on the same CPU architecture (<code>E_CLUSTER_ARCH</code> otherwise).</li>
          <li>Mark each function that only reads <code>{'"writes": false'}</code> in its manifest (an Ada model’s <code>query</code>, <code>facts</code>, <code>probabilities</code>) so every node answers it; the rest run on the head. One marked <code>false</code> that writes fails <code>E_READ_ONLY</code>.</li>
          <li><code>GET /v1/cluster</code> or the MCP tool <code>cluster_status</code>: the head, every member and its lag, the nodes refused.</li>
        </ul>
        <h2>The commands</h2>
        <p>Run on a node, authenticated by the cluster secret. Not on the API: no runtime key can change the cluster.</p>
        <Code lang="bash">{`docker compose exec rrotor rrotord cluster promote rrotor-1   # make rrotor-1 head
docker compose exec rrotor rrotord cluster leave rrotor-2     # remove a node
docker compose exec rrotor rrotord cluster join               # on a removed node: ask to join again
kubectl exec rrotor-1 -- rrotord cluster promote rrotor-1`}</Code>
        <Row k="promote refuses">E_CLUSTER_QUORUM: most members do not answer. E_CLUSTER_LAG: the node is behind another (--force promotes it and loses the writes it lacks; refused on Enterprise, E_CLUSTER_HA). E_CLUSTER_CONFIRM: the head does not answer (confirm at the terminal, or --yes). E_CLUSTER_VOTES: run it again</Row>
        <Row k="leave refuses">E_CLUSTER_HEAD: the head cannot leave; promote another node first</Row>
        <p>
          A member unseen for 24 hours (<code>RROTOR_CLUSTER_EVICT_AFTER</code>) is removed and may join again. The head
          keeps 1 GB of its log for catch-up (<code>RROTOR_CLUSTER_LOG_KEEP</code>); a node further behind takes a
          snapshot. Run
          three or more nodes: with two, a membership change needs both.
        </p>
      </>
    ),
  },
];

export const GROUPS = [
  { title: 'Architecture', pages: architecture },
  { title: 'Run rrotor', pages: run },
  { title: 'The plugin', pages: PLUGIN_PAGES },
  { title: 'The SDKs', pages: SDK_PAGES },
];
export const PAGES = GROUPS.flatMap((g) => g.pages);
export const hrefOf = (p) => (p.slug === 'introduction' ? DOCS : `${DOCS}/${p.slug}`);
