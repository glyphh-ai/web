import { Code, Row } from './ui';
import { DOCS } from './base';

// Running rrotor: the hub, then a page per package. Checked against rrotor's
// docs/self-hosting (README, compose, helm, terraform). The packages are in
// glyphh-ai/glyphh under deploy/. Each fact once.

const REPO = 'https://github.com/glyphh-ai/glyphh';
// The Helm chart, packaged on a release of glyphh-ai/glyphh: helm installs it from its address.
const CHART = 'https://github.com/glyphh-ai/glyphh/releases/download/rrotor-chart-0.2.0/rrotor-0.2.0.tgz';
const RAW = 'https://raw.githubusercontent.com/glyphh-ai/glyphh/main/deploy/compose';

const hub = {
  slug: 'run-rrotor',
  title: 'Run rrotor',
  lede: 'One image on your own machine, cluster or cloud, at your own address. Glyphh does not host it.',
  body: (
    <>
      <p>
        rrotor is one image, <code>ghcr.io/glyphh-ai/rrotor:&lt;version&gt;</code> (and <code>:latest</code>), with Ada
        built in; the licence key, not the image, sets its limits. It is one box (one container, one{' '}
        <code>/data</code>, one public host) unless you make it a <a href={`${DOCS}/run-a-cluster`}>cluster</a>. A
        second copy of the same runtime outside a cluster is not a replica: it takes the link over from the first.
        There is no autoscaling.
      </p>
      <h2>Start</h2>
      <ol>
        <li><strong>Register the runtime</strong> on the platform’s Getting started: a name and the public host it will answer at, e.g. <code>rrotor.acme.com</code>. The platform shows the runtime id and token once, and the settings for the way you deploy.</li>
        <li><strong>Deploy</strong> with those settings, one of three ways (below).</li>
        <li><strong>Check it:</strong> <code>curl https://&lt;host&gt;/healthz</code>. Then add <code>https://&lt;host&gt;/mcp</code> as a connector in Claude (<a href={`${DOCS}/plugin`}>The plugin</a>), or make a runtime key for your software (<a href={`${DOCS}/api`}>API and MCP</a>).</li>
      </ol>
      <h2>Choose a way</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th>Way</th><th>What runs</th><th>What it needs</th></tr></thead>
          <tbody>
            <tr><td><a href={`${DOCS}/docker-compose`}><strong>Docker</strong></a></td><td>One command: rrotor and Caddy (HTTPS) on one machine; or a cluster, a node per machine</td><td>A Linux machine with Docker and Compose v2, ports 80 and 443 reachable, a DNS name pointing at it</td></tr>
            <tr><td><a href={`${DOCS}/helm`}><strong>Helm</strong></a></td><td>A StatefulSet of one replica with its own volume, a Service and an Ingress; or a cluster of them</td><td>Kubernetes 1.33 or later that allows the sandbox’s privileges (below), an Ingress controller, a storage class; cert-manager if it is to issue the certificate</td></tr>
            <tr><td><a href={`${DOCS}/terraform`}><strong>Terraform</strong></a></td><td>A VM on AWS or Google Cloud running the Compose package, <code>/data</code> on its own disk; or several behind the cloud’s load balancer</td><td>An AWS account or a Google Cloud project, and a DNS zone (Route 53 or Cloud DNS) or a name you point yourself</td></tr>
          </tbody>
        </table>
      </div>
      <p>The packages are in <a href={`${REPO}/tree/main/deploy`}>glyphh-ai/glyphh, under <code>deploy/</code></a>.</p>
      <h2>Settings</h2>
      <p>Each package sets these from the platform’s settings.</p>
      <div className="dx-table">
        <table>
          <thead><tr><th>Variable</th><th>Meaning</th></tr></thead>
          <tbody>
            <tr><td><code>RROTOR_MODE=self</code></td><td>A self-hosted rrotor. Required</td></tr>
            <tr><td><code>RROTOR_RUNTIME_ID</code>, <code>RROTOR_RUNTIME_TOKEN</code></td><td>From registering the runtime. The token is its identity to Glyphh: keep it secret; rotate it on the platform if lost or exposed</td></tr>
            <tr><td><code>RROTOR_PUBLIC_HOST</code></td><td>The exact host it answers at. Any other <code>Host</code> is 421 <code>E_HOST</code></td></tr>
            <tr><td><code>RROTOR_SERVER</code></td><td>Default <code>https://api.glyphh.ai</code></td></tr>
            <tr><td><code>GLYPHH_LICENSE_KEY</code></td><td>The licence key, when it does not come over the link (<a href={`${DOCS}/licensing#where-the-key-goes`}>Licensing</a>)</td></tr>
            <tr><td><code>RROTOR_LINK</code></td><td>Default <code>on</code>; <code>off</code> for air-gapped: no link, no heartbeat, no Glyphh sign-in</td></tr>
            <tr><td><code>RROTOR_KEYS_SHA256</code></td><td>Air-gapped: the SHA-256 of each runtime key that may call it, comma-separated (<code>printf %s &quot;$KEY&quot; | sha256sum</code>). With the link on, keys come down the link</td></tr>
            <tr><td><code>RROTOR_DATA</code></td><td>Default <code>/data</code>. One rrotor writes it, never two</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        A setting missing or malformed stops rrotor at start with <code>E_CONFIG</code>, naming it. Logs and drains:{' '}
        <a href={`${DOCS}/logs`}>Logs and drains</a>. A cluster’s: <a href={`${DOCS}/run-a-cluster`}>Run a cluster</a>.
      </p>
      <h2>In front of it</h2>
      <ul>
        <li>rrotor listens on <strong>7777</strong>, plain HTTP. End TLS in front (Caddy, an Ingress, a load balancer) and pass the <code>Host</code> header through.</li>
        <li>Open: <code>GET /healthz</code> (the process is up) and <code>GET /readyz</code> (this node may take traffic). <code>GET /v1/health</code>, authenticated, reports the link, each sandbox layer, the licence, each drain and whether server-side logging is on.</li>
        <li>Nothing connects in but your callers on 443 (and 80 for the certificate and the redirect) and, in a cluster, the other nodes on 7778. The Glyphh server never connects in: everything it sends comes down the link rrotor opened.</li>
      </ul>
      <h2>What it reaches, outbound</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th>To</th><th>Why</th><th>When</th></tr></thead>
          <tbody>
            <tr><td><code>api.glyphh.ai:443</code></td><td>The link (a WebSocket, outbound only), the daily licence heartbeat, checking a Glyphh sign-in</td><td><code>RROTOR_LINK=on</code></td></tr>
            <tr><td><code>ghcr.io:443</code></td><td>Pulling the image</td><td>Installing and upgrading</td></tr>
            <tr><td><code>acme-v02.api.letsencrypt.org:443</code></td><td>Caddy’s certificate</td><td>Compose and Terraform, unless you bring your own</td></tr>
            <tr><td><code>github.com:443</code></td><td>Fetching a model’s commit</td><td>Deploys from git</td></tr>
            <tr><td>The hosts a model declares</td><td>A run’s own egress, port 443 only, through rrotor’s proxy</td><td>Runs whose manifest asks for them</td></tr>
            <tr><td>Your OpenTelemetry collector</td><td>The drain</td><td><code>OTEL_EXPORTER_OTLP_ENDPOINT</code> set</td></tr>
            <tr><td><code>api.glyphh.ai:443</code> (<code>/v1/otlp/v1/…</code>)</td><td>Server-side logging</td><td><code>RROTOR_SERVER_LOGS=on</code></td></tr>
          </tbody>
        </table>
      </div>
      <h2>The container’s privileges</h2>
      <p>
        Every run is sandboxed inside rrotor: bubblewrap gives it its own user, mount, PID and network namespaces,
        Landlock limits the files it can touch, a seccomp filter refuses the dangerous system calls, and an egress
        proxy is its only way out. Making namespaces and mounting a fresh <code>/proc</code> inside a container is
        what a container runtime’s defaults forbid, so three of them are lifted. The packages set all of this.
      </p>
      <div className="dx-table">
        <table>
          <thead><tr><th>Setting</th><th>Docker</th><th>Kubernetes</th><th>Why</th></tr></thead>
          <tbody>
            <tr><td>seccomp unconfined</td><td><code>--security-opt seccomp=unconfined</code></td><td><code>seccompProfile: Unconfined</code></td><td>The default profile refuses <code>unshare</code> and <code>clone</code> with new namespaces</td></tr>
            <tr><td>AppArmor unconfined</td><td><code>--security-opt apparmor=unconfined</code></td><td><code>appArmorProfile: Unconfined</code></td><td>The default profile refuses mounts, which the run’s filesystem needs</td></tr>
            <tr><td><code>/proc</code> unmasked</td><td><code>--security-opt systempaths=unconfined</code></td><td><code>procMount: Unmasked</code> with <code>hostUsers: false</code></td><td>With parts of <code>/proc</code> masked, the kernel refuses a new <code>/proc</code> for the run’s PID namespace</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        On Ubuntu 23.10 and later the host also needs <code>kernel.apparmor_restrict_unprivileged_userns=0</code> (or
        an AppArmor profile that lets the container make user namespaces); without it the sandbox cannot bring up the
        run’s loopback.
      </p>
      <p>
        Not asked for: <code>--privileged</code>, added capabilities, the host network, host paths. rrotor runs as an
        unprivileged user (uid 10001) on a read-only root, and its own seccomp filter, set with{' '}
        <code>no_new_privs</code>, holds each run more tightly than the runtime’s default would. If a layer cannot
        work, <code>/v1/health</code> names it and runs are refused (<code>E_SANDBOX_UNAVAILABLE</code>) rather than run
        unsandboxed.
      </p>
      <h2 id="upgrades">Upgrades</h2>
      <p>
        A new version is a new image tag; <code>/data</code> carries over. Pin a version rather than following{' '}
        <code>latest</code>, back up <code>/data</code> first, and upgrade when nothing is running: a run in flight does
        not survive the restart. Go forwards only: to go back, restore the backup. Each package’s command is on its
        page.
      </p>
      <h2 id="backups">Backups</h2>
      <p>
        Everything rrotor keeps is on <code>/data</code> (<a href={`${DOCS}#where-the-data-lives`}>what is there</a>).
        Back it up and you can rebuild rrotor anywhere.
      </p>
      <ul>
        <li><strong>The simplest consistent copy:</strong> stop rrotor, copy the volume, start it (Compose below).</li>
        <li><strong>Disk snapshots:</strong> an EBS or Compute Engine snapshot of the data disk, or a CSI VolumeSnapshot of the claim. A snapshot of a running rrotor is crash-consistent: the link replays what was not acknowledged, and a run in flight is lost. In a cluster, back up the head’s: every node holds the same, and a new node takes its copy from the head.</li>
        <li><strong>A backup holds the runtime token.</strong> Keep it as you keep the token. Restored on a second machine while the first still runs, it makes two of the same runtime: the newer link takes over and the older stops (<code>replaced</code>).</li>
      </ul>
      <Code lang="bash">{`docker compose stop rrotor
docker run --rm -v rrotor_rrotor-data:/data:ro -v "$PWD":/out debian:trixie-slim tar czf /out/rrotor-data.tar.gz -C /data .
docker compose start rrotor`}</Code>
    </>
  ),
};

const compose = {
  slug: 'docker-compose',
  title: 'Docker',
  lede: 'One command on a Linux machine: the public image with Caddy in front, which obtains and renews the HTTPS certificate by itself.',
  body: (
    <>
      <h2>What you need</h2>
      <ul>
        <li>A Linux machine (amd64 or arm64) with Docker Engine and Compose v2, of the size below.</li>
        <li>A DNS name, e.g. <code>rrotor.acme.com</code>, with an A (or AAAA) record pointing at the machine.</li>
        <li>Ports 80 and 443 open to it from the internet: 443 for callers, 80 for Let’s Encrypt’s check and the redirect to HTTPS.</li>
        <li>Outbound HTTPS to <code>api.glyphh.ai</code>, <code>ghcr.io</code> and Let’s Encrypt.</li>
        <li>On Ubuntu 23.10 or later (24.04 included), user namespaces allowed:</li>
      </ul>
      <Code lang="bash">{`echo 'kernel.apparmor_restrict_unprivileged_userns = 0' | sudo tee /etc/sysctl.d/60-rrotor-userns.conf
sudo sysctl --system`}</Code>
      <div className="dx-table">
        <table>
          <thead><tr><th>Size</th><th>In <code>.env</code></th><th>The machine</th><th><code>/data</code></th></tr></thead>
          <tbody>
            <tr><td>small</td><td><code>RROTOR_CPUS=1</code>, <code>RROTOR_MEMORY=1g</code></td><td>1 CPU, 2 GiB</td><td>3 GiB</td></tr>
            <tr><td>medium</td><td><code>RROTOR_CPUS=2</code>, <code>RROTOR_MEMORY=4g</code></td><td>2 CPU, 8 GiB</td><td>10 GiB</td></tr>
            <tr><td>large</td><td><code>RROTOR_CPUS=2</code>, <code>RROTOR_MEMORY=8g</code></td><td>2 CPU, 16 GiB</td><td>20 GiB</td></tr>
          </tbody>
        </table>
      </div>
      <h2>Start</h2>
      <p>
        Register the runtime on the platform (Getting started, Docker): it shows this one line with your runtime id,
        token and host filled in, and the token only once. Run it on the machine.
      </p>
      <Code lang="bash">{`curl -fsSL https://glyphh.ai/install.sh | \\
  RROTOR_RUNTIME_ID=<id> RROTOR_RUNTIME_TOKEN=<token> RROTOR_PUBLIC_HOST=rrotor.acme.com sh`}</Code>
      <p>
        It puts <code>docker-compose.yml</code>, <code>Caddyfile</code> and <code>.env</code> in <code>./rrotor</code>,
        pulls the image and starts it. <code>RROTOR_SIZE=medium</code> (or <code>large</code>) picks a size; run it again
        to change a setting. Then check it: <code>curl https://&lt;host&gt;/healthz</code> answers, and add{' '}
        <code>https://&lt;host&gt;/mcp</code> as a connector in Claude.
      </p>
      <p><strong>By hand</strong>, the same in four lines:</p>
      <Code lang="bash">{`mkdir rrotor && cd rrotor
curl -fsSLO ${RAW}/docker-compose.yml -fsSLO ${RAW}/Caddyfile
printf 'RROTOR_RUNTIME_ID=<id>\\nRROTOR_RUNTIME_TOKEN=<token>\\nRROTOR_PUBLIC_HOST=rrotor.acme.com\\n' > .env && chmod 600 .env
docker compose up -d`}</Code>
      <h2 id="docker-run">HTTPS already in front</h2>
      <p>
        If a load balancer, an Ingress or a tunnel already ends TLS for the host and passes <code>Host</code> through,
        run the image alone and point it at port 7777:
      </p>
      <Code lang="bash">{`docker run -d --name rrotor --restart unless-stopped \\
  --security-opt seccomp=unconfined --security-opt apparmor=unconfined --security-opt systempaths=unconfined \\
  --read-only --tmpfs /tmp:exec,mode=1777 -v rrotor-data:/data -p 7777:7777 \\
  -e RROTOR_MODE=self -e RROTOR_RUNTIME_ID=<id> -e RROTOR_RUNTIME_TOKEN=<token> -e RROTOR_PUBLIC_HOST=rrotor.acme.com \\
  ghcr.io/glyphh-ai/rrotor:latest`}</Code>
      <h2>The files</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th>File</th><th>What</th></tr></thead>
          <tbody>
            <tr><td><code>docker-compose.yml</code></td><td>rrotor (<code>.env</code>, <code>/data</code> on the volume <code>rrotor-data</code>, the three security options, a read-only root with a tmpfs <code>/tmp</code>, restart unless stopped, a health check on <code>/healthz</code>) and Caddy (ports 80 and 443, its certificates on <code>caddy-data</code>). Logs kept by Docker, 10 MB a file, five files</td></tr>
            <tr><td><code>Caddyfile</code></td><td>Serve <code>RROTOR_PUBLIC_HOST</code> over HTTPS and pass every request to <code>rrotor:7777</code></td></tr>
            <tr><td><code>.env.example</code></td><td>The runtime id and token, the public host, the version, the size; commented, the drain and logging settings (<a href={`${DOCS}/logs`}>Logs and drains</a>)</td></tr>
            <tr><td><code>docker-compose.airgap.yml</code>, <code>Caddyfile.airgap</code></td><td>The air-gapped overlay</td></tr>
            <tr><td><code>docker-compose.cluster.yml</code>, <code>Caddyfile.cluster</code></td><td>Three nodes and Caddy on one machine, to try a cluster</td></tr>
            <tr><td><code>docker-compose.node.yml</code></td><td>One node of a cluster across machines</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        rrotor’s port is not published: only Caddy reaches it. To put your own load balancer or reverse proxy in front
        instead, remove the <code>caddy</code> service and publish 7777 to it on a private address; it must end TLS and
        pass <code>Host</code> through.
      </p>
      <h2 id="air-gapped">Air-gapped</h2>
      <p>No route to Glyphh, Let’s Encrypt or a registry: rrotor runs on its licence key with the link off, and Caddy serves a certificate you supply.</p>
      <ol>
        <li><strong>Bring the images in.</strong> On a machine with access, save them (below); carry the archive and the files in <code>./rrotor</code> across, <code>docker load &lt; rrotor-images.tar.gz</code>, and set <code>RROTOR_VERSION=&lt;version&gt;</code> in <code>.env</code> (not <code>latest</code>).</li>
        <li><strong>The licence key</strong> from the platform, in <code>.env</code> as <code>GLYPHH_LICENSE_KEY</code> (<a href={`${DOCS}/licensing#air-gapped`}>Licensing</a>).</li>
        <li><strong>The certificate</strong> for the public host: its full chain in <code>certs/tls.crt</code>, its key in <code>certs/tls.key</code>.</li>
        <li><strong>Start with the overlay</strong>, which sets <code>RROTOR_LINK=off</code> and points Caddy at <code>certs/</code>. Callers use runtime keys.</li>
      </ol>
      <Code lang="bash">{`docker pull ghcr.io/glyphh-ai/rrotor:<version> && docker pull caddy:2
docker save ghcr.io/glyphh-ai/rrotor:<version> caddy:2 | gzip > rrotor-images.tar.gz

# on the air-gapped machine
docker compose -f docker-compose.yml -f docker-compose.airgap.yml up -d`}</Code>
      <h2 id="a-cluster">A cluster</h2>
      <p>
        Both cluster files reuse <code>docker-compose.yml</code>’s rrotor and need a licence key with sync and the
        secret in <code>.env</code>. Settings and commands: <a href={`${DOCS}/run-a-cluster`}>Run a cluster</a>.
      </p>
      <Code lang="bash">{`echo "RROTOR_CLUSTER_SECRET=$(openssl rand -base64 32)" >> .env`}</Code>
      <p>
        <strong>To try one, on one machine:</strong> <code>docker-compose.cluster.yml</code> runs <code>rrotor-0</code>,{' '}
        <code>rrotor-1</code> and <code>rrotor-2</code>, each with its own volume, <code>rrotor-0</code> the head; Caddy
        sends only to the nodes whose <code>/readyz</code> answers 200. One machine is still one failure, so this is not
        high availability. Give it three times rrotor’s memory.
      </p>
      <Code lang="bash">{`docker compose -f docker-compose.cluster.yml up -d`}</Code>
      <p>
        <strong>A node per machine:</strong> <code>docker-compose.node.yml</code> on each (rrotor alone, 7777 and 7778
        published), the same <code>.env</code> on each but for the machine’s id and private address. Open{' '}
        <strong>7778 between the machines only</strong>, and put a load balancer in front of 7777 on every machine that
        ends TLS, passes <code>Host</code> through and health-checks <code>/readyz</code>. A missing setting stops
        Compose with its name. Upgrade one node at a time.
      </p>
      <Code lang="bash">{`RROTOR_NODE_ID=rrotor-0
RROTOR_CLUSTER_ADVERTISE=10.0.1.10:7778
RROTOR_CLUSTER_PEERS=10.0.1.10:7778,10.0.2.10:7778,10.0.3.10:7778
RROTOR_CLUSTER_HEAD=rrotor-0     # optional

docker compose -f docker-compose.node.yml up -d`}</Code>
      <h2>Upgrade, back up, remove</h2>
      <Row k="Upgrade">Set RROTOR_VERSION in .env, then docker compose pull && docker compose up -d</Row>
      <Row k="Back up">The volume rrotor_rrotor-data (<a href={`${DOCS}/run-rrotor#backups`}>Backups</a>)</Row>
      <Row k="Remove">docker compose down keeps the volumes; down -v deletes /data and Caddy’s certificates too. Then delete the runtime on the platform</Row>
    </>
  ),
};

const helm = {
  slug: 'helm',
  title: 'Helm',
  lede: 'One rrotor per release: a StatefulSet of one replica with its own volume, a Service, an Ingress at your public host and a Secret for the token.',
  body: (
    <>
      <p>
        The chart refuses more replicas unless you make it a <a href="#a-cluster">cluster</a>. There is no
        autoscaling. For a second rrotor, register a second runtime and install a second release.
      </p>
      <h2>What the cluster must allow</h2>
      <p>
        The sandbox needs seccomp and AppArmor unconfined and an unmasked <code>/proc</code> (<a href={`${DOCS}/run-rrotor`}>why</a>).
        Kubernetes allows an unmasked <code>/proc</code> only in a pod with its own user namespace, so the pod sets:
      </p>
      <Code lang="yaml">{`hostUsers: false                 # uid 0 inside is not root on the node
securityContext:
  seccompProfile: {type: Unconfined}
  appArmorProfile: {type: Unconfined}
  procMount: Unmasked
  readOnlyRootFilesystem: true
  allowPrivilegeEscalation: false
  capabilities: {drop: ["ALL"]}`}</Code>
      <ul>
        <li><strong>Kubernetes 1.33 or later</strong>, where <code>UserNamespacesSupport</code> and <code>ProcMountType</code> are on by default. On 1.30 to 1.32 turn both feature gates on, on the API server and every kubelet.</li>
        <li><strong>Nodes with user namespaces for pods:</strong> Linux 6.3 or later with idmapped mounts on the volume’s filesystem, and containerd 2.0 or later or CRI-O 1.25 or later.</li>
        <li><strong>Admission that allows it:</strong> Pod Security’s <code>baseline</code> and <code>restricted</code> refuse it, so the namespace needs <code>privileged</code> (below). A policy engine (Kyverno, Gatekeeper) needs the same exception.</li>
        <li><strong>Ubuntu 23.10 or later nodes:</strong> <code>kernel.apparmor_restrict_unprivileged_userns=0</code>, set in the node image or its bootstrap (it is not a namespaced sysctl).</li>
      </ul>
      <p>
        GKE Autopilot refuses it: on GKE use a Standard cluster; on EKS and AKS, node groups that meet the points
        above. If the pod is admitted but the sandbox still cannot start, <code>/v1/health</code> says which layer
        and why.
      </p>
      <Code lang="bash">{`kubectl create namespace rrotor
kubectl label namespace rrotor pod-security.kubernetes.io/enforce=privileged`}</Code>
      <h2>Install</h2>
      <p>Register the runtime on the platform (Getting started, Helm) for its id and token, then:</p>
      <Code lang="bash">{`helm install rrotor ${CHART} -n rrotor \\
  --set publicHost=rrotor.acme.com \\
  --set runtime.id=<runtime id> \\
  --set runtime.token=<runtime token> \\
  --set ingress.className=nginx \\
  --set ingress.certManagerClusterIssuer=letsencrypt`}</Code>
      <p>The notes print the connector, <code>https://rrotor.acme.com/mcp</code>. Point the host’s DNS at the Ingress’s address. To keep the token out of Helm’s values, make the Secret yourself:</p>
      <Code lang="bash">{`kubectl -n rrotor create secret generic rrotor-runtime \\
  --from-literal=RROTOR_RUNTIME_ID=<runtime id> --from-literal=RROTOR_RUNTIME_TOKEN=<runtime token>
helm install rrotor ${CHART} -n rrotor --set publicHost=rrotor.acme.com --set existingSecret=rrotor-runtime`}</Code>
      <h2>Values</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th>Value</th><th>Default</th><th>What</th></tr></thead>
          <tbody>
            <tr><td><code>publicHost</code></td><td>Required</td><td>The exact host rrotor answers at</td></tr>
            <tr><td><code>runtime.id</code>, <code>runtime.token</code></td><td></td><td>The runtime, unless <code>existingSecret</code> is set</td></tr>
            <tr><td><code>existingSecret</code></td><td></td><td>A Secret with <code>RROTOR_RUNTIME_ID</code>, <code>RROTOR_RUNTIME_TOKEN</code> and optionally <code>GLYPHH_LICENSE_KEY</code></td></tr>
            <tr><td><code>runtime.licenseKey</code></td><td></td><td>The licence key, into the Secret as <code>GLYPHH_LICENSE_KEY</code> (air-gapped; normally it comes over the link)</td></tr>
            <tr><td><code>runtime.keysSha256</code></td><td><code>[]</code></td><td>Air-gapped: the SHA-256 of each runtime key that may call it</td></tr>
            <tr><td><code>image.repository</code>, <code>image.tag</code></td><td><code>ghcr.io/glyphh-ai/rrotor</code>, the chart’s <code>appVersion</code></td><td>The image</td></tr>
            <tr><td><code>pullSecrets</code></td><td><code>[]</code></td><td>Image pull secrets, for a mirror</td></tr>
            <tr><td><code>server</code></td><td><code>https://api.glyphh.ai</code></td><td>The Glyphh server</td></tr>
            <tr><td><code>link</code></td><td><code>on</code></td><td><code>off</code> for air-gapped</td></tr>
            <tr><td><code>size</code></td><td><code>small</code></td><td><code>small</code>: 1 CPU (250m requested), 1 GiB, 3 GiB disk; <code>medium</code>: 2 CPU, 4 GiB, 10 GiB; <code>large</code>: 2 CPU, 8 GiB, 20 GiB</td></tr>
            <tr><td><code>resources</code></td><td></td><td>Requests and limits, replacing the size’s</td></tr>
            <tr><td><code>persistence.storageClass</code>, <code>persistence.size</code></td><td>The default class, the size’s</td><td>The volume for <code>/data</code> (<code>ReadWriteOnce</code>)</td></tr>
            <tr><td><code>ingress.enabled</code>, <code>ingress.className</code></td><td><code>true</code></td><td>The Ingress</td></tr>
            <tr><td><code>ingress.certManagerClusterIssuer</code></td><td></td><td>cert-manager issues the certificate</td></tr>
            <tr><td><code>ingress.tls.enabled</code>, <code>ingress.tls.secretName</code></td><td><code>true</code>, <code>&lt;release&gt;-rrotor-tls</code></td><td>The certificate’s Secret</td></tr>
            <tr><td><code>ingress.annotations</code></td><td></td><td>More annotations, for your controller</td></tr>
            <tr><td><code>podDisruptionBudget.enabled</code></td><td><code>false</code></td><td>One replica: <code>minAvailable: 1</code>, so a node drain waits until you move rrotor. A cluster always has <code>maxUnavailable: 1</code></td></tr>
            <tr><td><code>cluster.*</code>, <code>replicas</code></td><td></td><td><a href="#a-cluster">A cluster</a></td></tr>
            <tr><td><code>nodeSelector</code>, <code>tolerations</code>, <code>affinity</code></td><td></td><td>Where it runs: e.g. a node group that meets the requirements</td></tr>
            <tr><td><code>drain.endpoint</code>, <code>drain.headers</code></td><td></td><td>Your OpenTelemetry collector (<code>OTEL_EXPORTER_OTLP_ENDPOINT</code>) and its headers, into the Secret. Empty: no drain</td></tr>
            <tr><td><code>drain.resourceAttributes</code>, <code>drain.serviceName</code>, <code>drain.tracesSampler</code>, <code>drain.tracesSamplerArg</code></td><td></td><td>The matching <code>OTEL_*</code> variables</td></tr>
            <tr><td><code>drain.signals</code>, <code>drain.buffer</code>, <code>drain.at</code>, <code>drain.payloads</code></td><td>rrotor’s</td><td><code>RROTOR_DRAIN_SIGNALS</code>, <code>RROTOR_DRAIN_BUFFER</code>, <code>RROTOR_DRAIN_AT</code>, <code>RROTOR_LOG_PAYLOADS</code></td></tr>
            <tr><td><code>serverLogs</code></td><td><code>off</code></td><td><code>RROTOR_SERVER_LOGS</code>; refused with <code>link: &quot;off&quot;</code></td></tr>
            <tr><td><code>audit.retentionDays</code>, <code>audit.maxMb</code></td><td><code>90</code>, <code>1024</code></td><td>The audit log (Enterprise)</td></tr>
            <tr><td><code>extraEnv</code></td><td></td><td>More environment, e.g. <code>RROTOR_LOG_LEVEL</code> or other <code>OTEL_*</code> variables</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        The probes check <code>/healthz</code> (startup, liveness) and <code>/readyz</code> (readiness). The Ingress
        must pass <code>Host</code> through and keep a stream open: for ingress-nginx,{' '}
        <code>nginx.ingress.kubernetes.io/proxy-read-timeout: &quot;3600&quot;</code> keeps long MCP streams from being
        cut. Without an Ingress, put your own load balancer in front of the Service on port 80; it must end TLS and pass{' '}
        <code>Host</code> through.
      </p>
      <h2 id="a-cluster">A cluster</h2>
      <p>For a licence key with sync. Settings and commands: <a href={`${DOCS}/run-a-cluster`}>Run a cluster</a>.</p>
      <Code lang="bash">{`helm install rrotor ${CHART} -n rrotor --set publicHost=rrotor.acme.com \\
  --set existingSecret=rrotor-runtime --set cluster.enabled=true --set replicas=3`}</Code>
      <ul>
        <li><strong>The pods</strong> <code>rrotor-0..2</code> start together, each with its own claim (<code>data-rrotor-&lt;n&gt;</code>), spread across machines and zones where the scheduler can. They find each other at the headless Service; <code>rrotor-0</code> makes the cluster and is its head.</li>
        <li><strong>Traffic</strong> reaches ready pods only: <code>/readyz</code> keeps a pod joining, catching up or refused out.</li>
        <li><strong>The NetworkPolicy</strong> lets 7778 in from the release’s own pods only; it needs a CNI that enforces policy.</li>
        <li><strong>To shrink,</strong> <code>rrotord cluster leave</code> the highest pods first, then lower <code>replicas</code>; their claims stay until you delete them. A cluster of one is allowed, to grow later.</li>
      </ul>
      <div className="dx-table">
        <table>
          <thead><tr><th>Value</th><th>Default</th><th>What</th></tr></thead>
          <tbody>
            <tr><td><code>cluster.enabled</code>, <code>replicas</code></td><td><code>false</code>, 3</td><td>A cluster of <code>replicas</code> nodes; <code>replicas</code> above 1 without it is refused</td></tr>
            <tr><td><code>cluster.secret</code>, <code>cluster.secretPrevious</code></td><td>Made on install</td><td>The cluster secret, kept across upgrades and uninstall. To roll it: the new one in <code>secret</code>, the old in <code>secretPrevious</code>, upgrade, then drop the old</td></tr>
            <tr><td><code>cluster.existingSecret</code></td><td></td><td>A Secret of yours with <code>RROTOR_CLUSTER_SECRET</code> (and optionally <code>_PREVIOUS</code>)</td></tr>
            <tr><td><code>cluster.head</code></td><td><code>&lt;release&gt;-rrotor-0</code></td><td>The pod that makes the cluster the first time</td></tr>
            <tr><td><code>cluster.evictAfter</code>, <code>cluster.logKeep</code></td><td><code>24h</code>, <code>1g</code></td><td><code>RROTOR_CLUSTER_EVICT_AFTER</code>, <code>RROTOR_CLUSTER_LOG_KEEP</code></td></tr>
            <tr><td><code>cluster.port</code>, <code>cluster.clusterDomain</code></td><td><code>7778</code>, <code>cluster.local</code></td><td>The cluster’s port, and the DNS domain for the headless Service</td></tr>
            <tr><td><code>cluster.networkPolicy.enabled</code>, <code>cluster.antiAffinity</code></td><td><code>true</code>, <code>true</code></td><td>The NetworkPolicy; the spread across machines and zones (not with <code>affinity</code> set)</td></tr>
          </tbody>
        </table>
      </div>
      <h2 id="air-gapped">Air-gapped</h2>
      <p>
        Mirror the image into your registry (<code>image.repository</code>, <code>image.tag</code>,{' '}
        <code>pullSecrets</code>), install with <code>link=off</code> and the licence key in the Secret
        (<code>runtime.licenseKey</code>, or <code>GLYPHH_LICENSE_KEY</code> in <code>existingSecret</code>), and take
        the certificate from your own issuer or a TLS Secret you make (<code>ingress.tls.secretName</code>).
      </p>
      <h2>Upgrade, back up, remove</h2>
      <Row k="Upgrade">helm upgrade rrotor {CHART} -n rrotor --reuse-values --set image.tag=&lt;version&gt;. The pod is replaced and the volume stays; in a cluster, one pod at a time, the highest first</Row>
      <Row k="From chart 0.1">Once, before upgrading: kubectl -n rrotor delete statefulset rrotor --cascade=orphan (the pod and volume stay; the upgrade adopts them)</Row>
      <Row k="Back up">A VolumeSnapshot of the claim data-rrotor-0, or scale to 0, copy the volume, and scale back to 1 (<a href={`${DOCS}/run-rrotor#backups`}>Backups</a>)</Row>
      <Row k="Remove">helm uninstall rrotor -n rrotor keeps the claim, and so /data; delete data-rrotor-0 to remove it. Then delete the runtime on the platform</Row>
    </>
  ),
};

const terraform = {
  slug: 'terraform',
  title: 'Terraform',
  lede: 'One VM on AWS or Google Cloud running the Compose package, /data on a disk of its own; or a cluster of them behind the cloud’s load balancer.',
  body: (
    <>
      <p>
        The modules are <code>deploy/terraform/aws</code> and <code>deploy/terraform/gcp</code>, each with examples in{' '}
        <code>examples/basic/</code> and <code>examples/cluster/</code>.
      </p>
      <h2>What each makes</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th></th><th>AWS (<code>aws</code>)</th><th>Google Cloud (<code>gcp</code>)</th></tr></thead>
          <tbody>
            <tr><td>Network</td><td>A VPC with one public subnet, or your <code>vpc_id</code> and <code>subnet_id</code></td><td>A network and subnetwork, or your <code>network</code> and <code>subnetwork</code></td></tr>
            <tr><td>Firewall</td><td>443 (TCP and UDP) and 80 in from <code>ingress_cidrs</code>, all out</td><td>The same in; the default rule lets all out</td></tr>
            <tr><td>The VM</td><td>EC2, Ubuntu 24.04, IMDSv2 only, an encrypted 20 GiB root</td><td>Compute Engine, Ubuntu 24.04, Shielded VM, a 20 GB root</td></tr>
            <tr><td><code>/data</code></td><td>A separate encrypted gp3 EBS volume</td><td>A separate balanced persistent disk</td></tr>
            <tr><td>Address</td><td>An Elastic IP</td><td>A static external address</td></tr>
            <tr><td>Identity</td><td>An IAM role with <code>AmazonSSMManagedInstanceCore</code> only</td><td>A service account that writes logs and metrics only</td></tr>
            <tr><td>A shell</td><td>Session Manager; no SSH key, no port 22</td><td>OS Login over Identity-Aware Proxy, with <code>allow_iap_ssh</code></td></tr>
            <tr><td>DNS, optional</td><td>An A record in <code>route53_zone_id</code></td><td>An A record in <code>dns_managed_zone</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        On first boot cloud-init installs Docker, sets <code>kernel.apparmor_restrict_unprivileged_userns=0</code>,
        formats the data disk (the first time only) and mounts it, writes the Compose files and <code>.env</code> (root
        only) to <code>/opt/rrotor</code>, and runs <code>docker compose up -d</code>. rrotor’s <code>/data</code> and
        Caddy’s certificates are both on the data disk.
      </p>
      <h2>Sizes</h2>
      <div className="dx-table">
        <table>
          <thead><tr><th><code>size</code></th><th>rrotor’s limit</th><th><code>/data</code></th><th>AWS</th><th>Google Cloud</th></tr></thead>
          <tbody>
            <tr><td><code>small</code></td><td>1 CPU, 1 GiB</td><td>3 GiB (10 GB on Google Cloud)</td><td><code>t3.small</code></td><td><code>e2-small</code></td></tr>
            <tr><td><code>medium</code></td><td>2 CPU, 4 GiB</td><td>10 GiB</td><td><code>t3.large</code></td><td><code>e2-standard-2</code></td></tr>
            <tr><td><code>large</code></td><td>2 CPU, 8 GiB</td><td>20 GiB</td><td><code>r7i.large</code></td><td><code>e2-highmem-2</code></td></tr>
          </tbody>
        </table>
      </div>
      <p><code>instance_type</code> (or <code>machine_type</code>) and <code>data_disk_gb</code> override the size’s.</p>
      <h2>Use</h2>
      <p>Register the runtime on the platform (Getting started, Terraform) for its id and token, then, for AWS:</p>
      <Code lang="hcl">{`module "rrotor" {
  source = "github.com/glyphh-ai/glyphh//deploy/terraform/aws"

  public_host     = "rrotor.acme.com"
  runtime_id      = var.runtime_id
  runtime_token   = var.runtime_token # sensitive
  size            = "small"
  rrotor_version  = "<version>"
  route53_zone_id = "Z0123456789EXAMPLE" # optional
}

output "connector_url" { value = module.rrotor.connector_url }`}</Code>
      <p>
        For Google Cloud, the same with <code>//deploy/terraform/gcp</code>, <code>project</code>, <code>region</code>,{' '}
        <code>zone</code> and, optionally, <code>dns_managed_zone</code>. Add <code>?ref=&lt;commit&gt;</code> to the
        source to pin it. The modules read <code>deploy/compose/</code> and <code>deploy/terraform/shared/</code> by
        relative path, so use them from the repo, not copied out alone.
      </p>
      <p>
        <code>terraform apply</code>, then point the host at <code>public_ip</code> if you gave no DNS zone. Caddy
        obtains the certificate once the name resolves; the first boot takes a few minutes.
      </p>
      <Row k="connector_url">https://&lt;host&gt;/mcp, for Claude or any MCP client</Row>
      <Row k="public_ip">The Elastic IP or static address</Row>
      <Row k="instance_id">The VM</Row>
      <Row k="data_volume_id, data_disk">The disk holding /data, to snapshot (AWS, Google Cloud)</Row>
      <h2>Inputs</h2>
      <p>Each variable’s description is in the module’s <code>variables.tf</code>.</p>
      <Row k="Required">public_host, runtime_id, runtime_token</Row>
      <Row k="Both">license_key (written as GLYPHH_LICENSE_KEY), rrotor_version (default latest: pin one), server, size, data_disk_gb, ingress_cidrs (default anywhere: 80 must stay reachable by Let’s Encrypt), name</Row>
      <Row k="AWS">vpc_id, subnet_id, vpc_cidr, instance_type, route53_zone_id, tags</Row>
      <Row k="Google Cloud">project, region, zone, network, subnetwork, subnetwork_cidr, machine_type, dns_managed_zone, allow_iap_ssh, labels</Row>
      <Row k="A cluster">node_count (default 1), cluster_secret; AWS adds subnet_ids and certificate_arn, Google Cloud zones</Row>
      <Row k="Logs and drains">otel_endpoint (empty: no drain), otel_headers (sensitive), otel_resource_attributes, server_logs, log_payloads, audit_retention_days, and in a cluster drain_at. Any other setting can be added to the VM’s .env</Row>
      <h2 id="a-cluster">A cluster</h2>
      <p>
        <code>node_count</code> above 1, at most the licence key’s <code>max_nodes</code>, with a key that allows sync.
        Settings and commands: <a href={`${DOCS}/run-a-cluster`}>Run a cluster</a>.
      </p>
      <div className="dx-table">
        <table>
          <thead><tr><th></th><th>AWS</th><th>Google Cloud</th></tr></thead>
          <tbody>
            <tr><td>The nodes</td><td><code>rrotor-0</code> the head, over up to three zones (a subnet each, or your <code>subnet_ids</code>), each at a fixed private address (<code>.10</code>, <code>.11</code>, … of its subnet: keep them free) with its own <code>/data</code></td><td>The same, over <code>zones</code> (default the region’s first three), each at a reserved internal address</td></tr>
            <tr><td>On each</td><td colSpan={2}><code>docker-compose.node.yml</code> (rrotor alone) with its node id, address and peers in <code>.env</code></td></tr>
            <tr><td>The secret</td><td><code>cluster_secret</code> (empty: made), in Secrets Manager, read at first boot with the node’s role</td><td>In Secret Manager (its API on), read with the node’s service account</td></tr>
            <tr><td>Port 7778</td><td>From the nodes’ security group only</td><td>From the nodes’ network tag only</td></tr>
            <tr><td>In front</td><td>A Network Load Balancer: TLS on 443 with an ACM certificate (<code>certificate_arn</code>, or made in <code>route53_zone_id</code>), to 7777, health-checking <code>/readyz</code></td><td>Google’s external HTTPS load balancer with a managed certificate, to 7777, health-checking <code>/readyz</code>. <code>ingress_cidrs</code> does not apply: use Cloud Armor</td></tr>
            <tr><td>DNS</td><td>An alias in <code>route53_zone_id</code></td><td>An A record in <code>dns_managed_zone</code></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Outputs added: <code>load_balancer_dns</code> (AWS), <code>instance_ids</code> or <code>instance_names</code>,{' '}
        <code>data_volume_ids</code> or <code>data_disks</code>, and the secret’s id. Any change to the first-boot
        configuration replaces every node at once; to roll it, apply one node at a time
        (<code>-target=&apos;module.rrotor.aws_instance.rrotor[2]&apos;</code>, the head, <code>[0]</code>, last).
        Growing <code>node_count</code> changes every node’s peers and so replaces them too: grow when nothing is
        running.
      </p>
      <h2>Where the token lives</h2>
      <p>
        The runtime token reaches the VM in its first-boot configuration, so it is in the Terraform state (sensitive:
        keep the state in an encrypted backend with access as tight as the token’s), in the instance’s user data or
        metadata, and in <code>/opt/rrotor/.env</code> (root only). If any is exposed, rotate the token on the platform
        and apply with the new one. A cluster’s secret is in the state and the cloud’s secret store, not the user data.
      </p>
      <h2>Upgrade, back up, remove</h2>
      <Row k="Upgrade">Set rrotor_version and apply. A change to the first-boot configuration (version, size, token) replaces the VM; the data disk moves to the new one, unformatted. A newer Ubuntu image alone does not</Row>
      <Row k="Back up">Snapshot the data disk: an AWS Backup or Data Lifecycle Manager policy, or a Compute Engine snapshot schedule</Row>
      <Row k="Remove">terraform destroy deletes the VM and the data disk: snapshot it first to keep /data. Then delete the runtime on the platform</Row>
    </>
  ),
};

export const RUN_HUB = hub;
export const RUN_PACKAGES = [compose, helm, terraform];
