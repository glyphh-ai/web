import { Architecture, Code, Row } from './ui';
import { PLUGIN_PAGES, SDK_PAGES } from './pages';
import { DOCS } from './base';

// The docs explain the architecture and how to run rrotor, the plugin and the
// SDKs: nothing else. Every fact is checked against rrotor's docs/architecture.md
// and docs/self-hosting, the server's docs/architecture.md and pricing.md, and
// glyphh-ai/glyphh (README, sdk/*/README.md, the Ada skill). Each fact once.

const SELF_HOSTING = 'https://github.com/glyphh-ai/rrotor/tree/main/docs/self-hosting';

const architecture = [
  {
    slug: 'introduction',
    title: 'Architecture',
    lede: 'The parts, how a call flows, and where the data lives.',
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
              <tr><td><strong>The platform</strong></td><td>Sign in, register a runtime (Getting started), API Keys, Models, Settings (Licence, Logs)</td><td><a href="https://platform.glyphh.ai">platform.glyphh.ai</a></td></tr>
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
        <h2>Where the data lives</h2>
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
          <li><code>&lt;payload&gt;.&lt;signature&gt;</code>, Ed25519, checked on the node with no network request. The payload carries <code>tier</code>, <code>max_nodes</code>, <code>max_precedents</code>, <code>cluster_sync_enabled</code>, <code>issued_at</code> and <code>expires_at</code>.</li>
          <li>It expires at the end of the paid month; the next arrives over the link or the heartbeat. Past expiry it holds for 14 days’ grace, then the node runs as Community.</li>
          <li>A bad key is logged and the node runs as Community. Nothing a licence does stops rrotor or refuses a run: the worst case is Community’s limits.</li>
          <li><code>GET /v1/licence</code> (and <code>/v1/health</code>) shows the key held, its <code>state</code> (<code>live</code>, <code>grace</code>, <code>expired</code>, <code>bad</code>, <code>none</code>), the limits that apply and <code>precedents {'{held, cap, over}'}</code>.</li>
        </ul>
        <p>Giving a node its key: <a href={`${DOCS}/run-rrotor#the-licence-key`}>Run rrotor</a>.</p>
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
        <Row k="Audit log">Enterprise: an event per call, deploy, key change, licence change, refusal (401, 403) and cluster change, with who did it. Kept in <code>/data/audit</code> (90 days, 1 GB), read with <code>GET /v1/audit</code> or <code>audit_query</code>; in a cluster, the head keeps every node’s. Below Enterprise the events are log lines and <code>GET /v1/audit</code> is 403 <code>E_NOT_IN_PLAN</code></Row>
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
              <tr><td><code>RROTOR_DRAIN_SIGNALS</code></td><td><code>logs,metrics,traces,audit</code></td><td>What the drain sends</td></tr>
              <tr><td><code>RROTOR_DRAIN_AT</code></td><td><code>head</code></td><td>In a cluster: by the head, or <code>node</code>, each node itself</td></tr>
              <tr><td><code>RROTOR_LOG_PAYLOADS</code></td><td><code>off</code></td><td><code>on</code>: inputs and results (4 KB each) in your drain only; never sent to Glyphh</td></tr>
              <tr><td><code>RROTOR_SERVER_LOGS</code></td><td><code>off</code></td><td><code>on</code>: server-side logging</td></tr>
              <tr><td><code>RROTOR_LOG_LEVEL</code></td><td><code>INFO</code></td><td>The log level</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The full list, the metrics and the buffering:{' '}
          <a href={`${SELF_HOSTING}#logs-audit-and-drains`}>rrotor’s self-hosting docs</a>.
        </p>
      </>
    ),
  },
];

const run = [
  {
    slug: 'run-rrotor',
    title: 'Run rrotor',
    lede: 'One image on your own machine, cluster or cloud, at your own address.',
    body: (
      <>
        <h2>Start</h2>
        <ol>
          <li><strong>Register the runtime</strong> on the platform’s Getting started: a name and the public host it will answer at, e.g. <code>rrotor.acme.com</code>. The platform shows the runtime id and token once, and the settings for the way you deploy.</li>
          <li><strong>Deploy</strong> one of three ways (below).</li>
          <li><strong>Check it:</strong> <code>curl https://&lt;host&gt;/healthz</code>. Then add <code>https://&lt;host&gt;/mcp</code> as a connector in Claude (<a href={`${DOCS}/plugin`}>The plugin</a>), or make a runtime key for your software (<a href={`${DOCS}/api`}>API and MCP</a>).</li>
        </ol>
        <div className="dx-table">
          <table>
            <thead><tr><th>Way</th><th>What runs</th><th>Start</th></tr></thead>
            <tbody>
              <tr><td><strong>Docker Compose</strong></td><td>rrotor and Caddy (HTTPS) on one Linux machine, files in <code>deploy/compose/</code></td><td><code>docker compose up -d</code></td></tr>
              <tr><td><strong>Helm</strong></td><td>A StatefulSet, a Service and an Ingress on Kubernetes 1.33 or later, chart in <code>deploy/helm/rrotor/</code></td><td><code>helm install rrotor deploy/helm/rrotor -n rrotor --set publicHost=… --set existingSecret=…</code></td></tr>
              <tr><td><strong>Terraform</strong></td><td>A VM on AWS or Google Cloud running the Compose package, <code>/data</code> on its own disk; modules <code>deploy/terraform/aws</code> and <code>deploy/terraform/gcp</code></td><td><code>terraform apply</code></td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Each guide, step by step, with sizes, backups and upgrades:{' '}
          <a href={SELF_HOSTING}>rrotor <code>docs/self-hosting</code></a>.
        </p>
        <h2>Settings</h2>
        <p>Each package sets these from the platform’s snippet.</p>
        <div className="dx-table">
          <table>
            <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>RROTOR_MODE=self</code></td><td>A self-hosted rrotor. Required</td></tr>
              <tr><td><code>RROTOR_RUNTIME_ID</code>, <code>RROTOR_RUNTIME_TOKEN</code></td><td>From registering the runtime. The token is its identity to Glyphh: keep it secret; rotate it on the platform if lost</td></tr>
              <tr><td><code>RROTOR_PUBLIC_HOST</code></td><td>The exact host it answers at. Any other <code>Host</code> is 421 <code>E_HOST</code></td></tr>
              <tr><td><code>RROTOR_SERVER</code></td><td>Default <code>https://api.glyphh.ai</code></td></tr>
              <tr><td><code>GLYPHH_LICENSE_KEY</code></td><td>The licence key (below)</td></tr>
              <tr><td><code>RROTOR_LINK</code></td><td>Default <code>on</code>; <code>off</code> for air-gapped</td></tr>
              <tr><td><code>RROTOR_KEYS_SHA256</code></td><td>Air-gapped: the SHA-256 of each runtime key that may call it, comma-separated (<code>printf %s &quot;$KEY&quot; | sha256sum</code>). With the link on, keys come down the link</td></tr>
              <tr><td><code>RROTOR_DATA</code></td><td>Default <code>/data</code>. One rrotor writes it, never two</td></tr>
            </tbody>
          </table>
        </div>
        <p>A setting missing or malformed stops rrotor at start with <code>E_CONFIG</code>, naming it.</p>
        <h2>In front of it</h2>
        <ul>
          <li>rrotor listens on <strong>7777</strong>, plain HTTP. End TLS in front (Caddy, an Ingress, a load balancer) and pass the <code>Host</code> header through.</li>
          <li>Open: <code>GET /healthz</code> (the process is up) and <code>GET /readyz</code> (this node may take traffic). <code>GET /v1/health</code>, authenticated, reports the link, each sandbox layer, the licence and the drains.</li>
          <li>Outbound it reaches <code>api.glyphh.ai</code> (the link), <code>github.com</code> (deploys from git), <code>ghcr.io</code> (the image) and the hosts a model declares.</li>
        </ul>
        <h2>The container’s privileges</h2>
        <p>
          The sandbox makes namespaces and mounts its own <code>/proc</code>, which a container’s defaults forbid. The
          packages set all of this.
        </p>
        <Row k="Docker">--security-opt seccomp=unconfined --security-opt apparmor=unconfined --security-opt systempaths=unconfined</Row>
        <Row k="Kubernetes">seccompProfile: Unconfined, appArmorProfile: Unconfined, procMount: Unmasked with hostUsers: false</Row>
        <Row k="Ubuntu 23.10+">The host’s kernel.apparmor_restrict_unprivileged_userns=0</Row>
        <p>
          No <code>--privileged</code>, no added capabilities, no host network. rrotor runs as uid 10001 on a read-only
          root, and its own seccomp filter holds each run. If a layer cannot work, <code>/v1/health</code> names it and
          the fix, and runs are refused (<code>E_SANDBOX_UNAVAILABLE</code>).
        </p>
        <h2 id="the-licence-key">The licence key</h2>
        <p>
          A linked rrotor gets its key over the link and the heartbeat: nothing to do. Air-gapped, or to set one by
          hand, copy it from the platform’s Settings → Licence into <code>GLYPHH_LICENSE_KEY</code> (read at start) or
          the file <code>/etc/rrotor/license.key</code> (read at start, every hour and on <code>SIGHUP</code>). Compose,
          air-gapped:
        </p>
        <Code lang="bash">{`docker compose -f docker-compose.yml -f docker-compose.airgap.yml up -d`}</Code>
        <p>What the key does: <a href={`${DOCS}/licensing`}>Licensing</a>.</p>
        <h2>Upgrades and backups</h2>
        <p>
          A new version is a new image tag; <code>/data</code> carries over. Pin a version, back up <code>/data</code>{' '}
          first, and upgrade when nothing is running. Everything rrotor keeps is on <code>/data</code>, including the
          runtime token: keep a backup as you keep the token.
        </p>
      </>
    ),
  },
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
        <Row k="Compose, to try">docker compose -f docker-compose.cluster.yml up -d: three nodes and Caddy on one machine</Row>
        <Row k="Compose, per machine">docker compose -f docker-compose.node.yml up -d on each machine, behind your load balancer</Row>
        <Row k="Helm">--set cluster.enabled=true --set replicas=3: the secret made on install and kept, or cluster.existingSecret</Row>
        <Row k="Terraform">node_count: nodes across zones behind an AWS NLB or Google’s HTTPS load balancer, the secret in the cloud’s secret store</Row>
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
          A member unseen for 24 hours (<code>RROTOR_CLUSTER_EVICT_AFTER</code>) is removed and may join again. Run
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
