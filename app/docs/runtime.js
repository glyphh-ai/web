import { Code, Row, Table } from './ui';
import { DOCS } from './base';

// rrotor, the runtime a person runs: its programs, its CLIs and the SDKs' Runtime client. Every fact from
// glyphh-ai/rrotor origin/main (README.md, docs/architecture.md, docs/specs/cli-server.md, examples/, src/rrotord)
// and glyphh-ai/glyphh origin/main (README.md, deploy/compose, sdk/*/README.md, plugins/glyphh/skills/rrotor*),
// 2026-10-31. Programs are not Ada models: rrotor runs no Ada.

const MANIFEST = `{
  "name": "daily_sales",
  "description": "A day's sales, added up, converted to euros, and written to its ledger once approved",
  "python": "3.13",
  "functions": {
    "start": {
      "description": "Read a day's export, add it up, write the total to the ledger (asks approval first)",
      "inputs": { "type": "object", "properties": { "day": { "type": "string", "pattern": "^\\\\d{4}-\\\\d{2}-\\\\d{2}$" } }, "additionalProperties": false },
      "approvals": ["write"],
      "writes": true
    },
    "summary": { "description": "The ledger", "inputs": { "type": "object", "additionalProperties": false }, "writes": false }
  },
  "hosts": ["api.frankfurter.dev"],
  "secrets": [],
  "databases": ["sqlite"],
  "limits": { "seconds": 60, "memory_mb": 256 },
  "schedules": [{ "function": "start", "cron": "15 6 * * *", "tz": "UTC", "name": "each_morning" }]
}`;

const PROGRAM = `from rrotor import Ctx, Result

RATES = "https://api.frankfurter.dev/v1/latest"


def start(ctx: Ctx, inputs: dict) -> Result:
    day = inputs.get("day") or ctx.yesterday()
    export = ctx.files / "sales" / f"{day}.csv"
    if not export.is_file():
        return Result.failed("read", f"There is no sales export for {day}.")
    total = add_up(export)
    rate = ctx.checkpoint(f"rate:{day}", lambda: ctx.http.get(RATES, params={"from": "USD", "to": "EUR"}).json()["rates"]["EUR"])
    if not ctx.ask_approval("write", f"Write {day}'s total, \${total}, to the ledger?"):
        return Result.done({"day": day, "total_usd": str(total), "written": False})
    with ctx.db:                                         # committed at the block's end
        ctx.db.execute("create table if not exists ledger (day text primary key, total_usd text)")
        ctx.db.execute("insert or replace into ledger values (?, ?)", (day, str(total)))
    ctx.log("written", day=day)
    return Result.done({"day": day, "total_usd": str(total), "written": True})`;

const GH = `{
  "name": "github",
  "kind": "cli",
  "description": "GitHub's gh",
  "cli": {
    "install": { "url": "https://github.com/cli/cli/releases/download/v2.62.0/gh_2.62.0_linux_amd64.tar.gz", "sha256": "<its 64-hex checksum>" },
    "command": "gh",
    "allow": ["pr *", "issue *", "repo view *", "api repos/*"],
    "approvals": ["pr merge *", "pr close *", "issue close *"],
    "env": { "GH_TOKEN": "secret:GH_TOKEN", "GH_PROMPT_DISABLED": "1" },
    "home": true
  },
  "hosts": ["api.github.com", "github.com"],
  "secrets": ["GH_TOKEN"],
  "limits": { "seconds": 120, "memory_mb": 512 }
}`;

export const RUNTIME_PAGES = [
  {
    slug: 'runtime',
    title: 'The runtime',
    lede: 'rrotor is a runtime you run yourself, a container on your machine or your servers, driven from Claude. It hosts your apps, your CLIs and your programs, each in a sandbox.',
    body: (
      <>
        <h2>What it is</h2>
        <p>
          One locked-down Linux image, <code>ghcr.io/glyphh-ai/rrotor</code>, with everything it keeps on one volume. It
          hosts three things, under one contract:
        </p>
        <Row k="Apps">A kind of program (&quot;kind&quot;: &quot;app&quot;): a page Claude wrote, published from Claude to your organisation’s rrotor, approved by a reviewer and served to your people at /apps/&lt;name&gt;/ (<a href={`${DOCS}/apps`}>Apps</a>)</Row>
        <Row k="CLIs">A kind of program (&quot;kind&quot;: &quot;cli&quot;): a pinned command-line tool such as gh or the glyphh command, run one command at a time (<a href={`${DOCS}/clis`}>CLIs</a>)</Row>
        <Row k="Programs">A folder with a glyphh.json manifest and program.py, deployed by commit, with a local secrets vault, cron schedules the runtime fires itself, a SQLite database and approvals that wait for a person (<a href={`${DOCS}/programs`}>Programs</a>)</Row>
        <p>
          Claude reaches it over MCP, with rrotor’s own tools; your software through REST or the SDKs’{' '}
          <a href={`${DOCS}/runtime-sdk`}>Runtime client</a>.
        </p>
        <h2>Not Ada Cloud</h2>
        <ul>
          <li>Programs are not Ada models, and rrotor runs no Ada. Ada models live in <a href={DOCS}>Ada Cloud</a>, which Glyphh runs.</li>
          <li>Nothing of a program goes through Glyphh’s server: its code, runs, secrets, schedules and database stay on the runtime. The server only grants the runtime its licence.</li>
          <li>Glyphh does not host runtimes for you: you run rrotor on your own machine, servers or cloud.</li>
        </ul>
        <h2>Install it from Claude</h2>
        <p>With the <a href={`${DOCS}/plugin`}>glyphh plugin</a> in Claude Code, ask:</p>
        <Code>{`install rrotor`}</Code>
        <p>The plugin’s rrotor skill:</p>
        <ol>
          <li>Finds a container runtime: Apple’s <code>container</code> (macOS 26 on Apple silicon), then OrbStack, then Docker. If there is none it names what to install; you install it.</li>
          <li>Makes a local token once, kept 0600 in <code>~/.glyphh/rrotor/token</code> and never printed. The container gets only its SHA-256.</li>
          <li>Pulls the image the plugin pins and runs it as <code>glyphh-rrotor</code>, on <code>127.0.0.1:7777</code> only, with the volume <code>glyphh-rrotor-data</code> and the security options its sandbox needs.</li>
          <li>Waits for rrotor to answer and checks the token, then adds rrotor’s MCP server to Claude Code for you (below).</li>
        </ol>
        <p>
          Restart Claude Code (or open <code>/mcp</code>) so rrotor’s tools load. Running the install again changes
          nothing that is right; a new token or image makes the container again and keeps the volume. The skill also
          says <strong>status</strong>, <strong>start</strong>, <strong>stop</strong> and <strong>uninstall</strong>{' '}
          (which keeps the volume unless you ask it to purge everything).
        </p>
        <h2>Or with Docker Compose</h2>
        <p>
          The same container by hand: <code>deploy/compose/docker-compose.local.yml</code> in{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/deploy/compose">glyphh-ai/glyphh</a>. Use one or the
          other: both are <code>glyphh-rrotor</code> on <code>glyphh-rrotor-data</code>.
        </p>
        <Code lang="bash">{`curl -fsSLO https://raw.githubusercontent.com/glyphh-ai/glyphh/main/deploy/compose/docker-compose.local.yml
mkdir -p ~/.glyphh/rrotor && (umask 077; openssl rand -hex 32 > ~/.glyphh/rrotor/token)
export RROTOR_LOCAL_TOKEN_SHA256="$(tr -d ' \\n' < ~/.glyphh/rrotor/token | shasum -a 256 | cut -d' ' -f1)"
docker compose -f docker-compose.local.yml up -d`}</Code>
        <h2>Connect Claude Code</h2>
        <Code lang="bash">{`claude mcp add --transport http --scope user rrotor http://127.0.0.1:7777/mcp \\
  --header "Authorization: Bearer $(cat ~/.glyphh/rrotor/token)"`}</Code>
        <p>
          The token is read from its file, never typed into the chat. rrotor’s tools then show as{' '}
          <code>mcp__rrotor__*</code>. An <code>E_AUTH</code> means the token in Claude’s entry is not rrotor’s: connect
          again.
        </p>
        <h2>The tools</h2>
        <Table
          head={['Tool', 'Does']}
          rows={[
            ['programs_list', 'Programs and CLIs, their versions, the active one, functions'],
            ['program_deploy {repo, commit, token?}', 'A commit of a GitHub repo as the next version'],
            ['program_call {program, function?, inputs?, version?, clearance?}', 'Opens a run: the first Result'],
            ['program_continue {run_id, answer}', 'Answers a waiting run: an approval or an input'],
            ['program_cancel, run_status, run_log {run_id}', 'Stop a run; its state and last Result; its log'],
            ['approvals', 'Runs waiting for a person'],
            ['secrets_list, secret_set, secret_delete', 'A program’s secrets: names back, never a value'],
            ['schedules_list, schedule_pause, schedule_resume', 'The schedules rrotor fires itself'],
            ['clis_list, cli_run {cli, args, stdin?, files?}', 'The CLIs; one command'],
            ['audit_query, cluster_status', 'The audit log (Enterprise); a cluster’s state'],
          ]}
        />
        <p>
          The same operations are REST on the same port with the same bearer: <code>/v1/programs</code>,{' '}
          <code>/v1/runs</code>, <code>/v1/approvals</code>, <code>/v1/schedules</code>, <code>/v1/clis</code>,{' '}
          <code>/v1/licence</code>, <code>/v1/health</code>. A refusal is <code>{'{"error": {"code", "message"}}'}</code>{' '}
          with a stable code.
        </p>
        <h2>The sandbox</h2>
        <ul>
          <li>Every run is its own process under bubblewrap (new namespaces, a network with only loopback), Landlock, a seccomp filter and resource limits.</li>
          <li>Its only network is an egress proxy that lets through HTTPS on 443 to the hosts its manifest names, and refuses loopback, private and link-local addresses.</li>
          <li>Each layer is checked at start and shown in <code>GET /v1/health</code>. A layer that cannot work makes rrotor refuse runs (<code>E_SANDBOX_UNAVAILABLE</code>, naming it and why); nothing is skipped silently.</li>
          <li>On Linux hosts on Ubuntu 23.10 or later, first run <code>sudo sysctl -w kernel.apparmor_restrict_unprivileged_userns=0</code> (kept in <code>/etc/sysctl.d/</code>), or the sandbox cannot start.</li>
        </ul>
        <h2>On your servers</h2>
        <p>
          A self-hosted rrotor is the same image in <code>self</code> mode, behind whatever ends TLS. Register it on the
          platform’s <strong>Runtimes</strong> page, which shows its id and token once, then start it with Docker
          Compose (rrotor and Caddy for HTTPS), the Helm chart or the Terraform modules in{' '}
          <a href="https://github.com/glyphh-ai/glyphh/tree/main/deploy">glyphh-ai/glyphh/deploy</a>; air-gapped and
          cluster setups are there too.
        </p>
        <ul>
          <li>Claude adds it as a custom connector at <code>https://&lt;public host&gt;/mcp</code> and signs in to Glyphh with one Allow click.</li>
          <li>Apps call it with a runtime key, made on the platform; rrotor holds only the keys’ SHA-256s.</li>
          <li>It answers only its own public host. It connects out to Glyphh’s server for its licence and keys; the server never connects in, and an air-gapped rrotor turns that link off.</li>
        </ul>
        <h2 id="licence">Licence</h2>
        <ul>
          <li>With no key, rrotor runs as <strong>Community</strong>: one node, no cluster sync. No licence is needed to install or run it.</li>
          <li>A signed licence key, checked on the node with no network request, lifts those limits to its own: its node cap, cluster sync, and on Enterprise high availability and the audit log.</li>
          <li>A key is read from <code>GLYPHH_LICENSE_KEY</code> or <code>/etc/rrotor/license.key</code>, arrives from Glyphh’s server, or is handed to a local rrotor with <code>PUT /v1/licence</code>. A key past its expiry keeps its limits for 14 days, then rrotor falls back to Community.</li>
          <li><strong>Nothing a licence does refuses a run:</strong> the worst case is Community’s limits. <code>GET /v1/licence</code> says the key held, its state and the limits that apply.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'programs',
    title: 'Programs',
    lede: 'A program is a git repo with a manifest and Python functions, deployed to your rrotor by commit and run in a sandbox, with secrets, schedules, a SQLite database and approvals.',
    body: (
      <>
        <h2>What a program is</h2>
        <p>A git repo (a folder with its own <code>git init</code> is enough); a version is a commit.</p>
        <Row k="glyphh.json">The manifest</Row>
        <Row k="program.py">The functions; load and end are optional hooks, never functions</Row>
        <Row k="requirements.lock">Optional: Python dependencies pinned with hashes, binary wheels only, installed at deploy, never at run</Row>
        <Row k="files/">Optional: seed files, copied into the program’s folder on its first deploy</Row>
        <Row k="tests/">Its own tests, with rrotor.testing (no sandbox needed)</Row>
        <p>
          With the plugin, ask Claude for what you want run (“each morning, post yesterday’s sales to the ledger”): it
          agrees with you the hosts it may reach, the steps that need your approval and the secrets it reads, writes it,
          tests it, commits and deploys it.
        </p>
        <h2>The manifest</h2>
        <Code lang="json">{MANIFEST}</Code>
        <Table
          head={['Key', 'What']}
          rows={[
            ['name', <>Matches <code key="c">{'^[a-z][a-z0-9_]{0,62}$'}</code>; the program’s name on the runtime</>],
            ['kind', 'program (the default) or cli (CLIs)'],
            ['description, python', 'Free text; python must be 3.13'],
            ['version', 'Optional, 1 or more'],
            ['functions', 'At least one, each with description, inputs (a JSON Schema the call is checked against, E_INPUTS), approvals (every step that may ask the person) and writes'],
            ['hosts', 'The only hosts a run may reach, HTTPS on 443 (*.example.com allowed). Everything else is blocked'],
            ['secrets', <>The secret names it reads, <code key="c">{'^[A-Z][A-Z0-9_]{0,63}$'}</code></>],
            ['databases', '["sqlite"]: a SQLite database in its data folder, ctx.db'],
            ['data', 'true: a persistent folder outside git, ctx.data'],
            ['limits', 'seconds (1 to 3600, default 300) and memory_mb (64 to 8192, default 512) per run'],
            ['schedules', 'Functions the runtime calls by itself: {function, cron, tz?, input?, name?}'],
          ]}
        />
        <p>A deploy refuses (<code>E_MANIFEST</code>, saying where and why) a manifest with an unknown key, a bad value, or a function <code>program.py</code> does not define, read from its syntax tree: no program code runs outside the sandbox.</p>
        <h2>program.py</h2>
        <Code lang="python">{PROGRAM}</Code>
        <ul>
          <li>A function is <code>def name(ctx, inputs) -&gt; Result</code>, answering <code>Result.done(data)</code>, <code>Result.failed(step, reason)</code>, <code>Result.needs_input(prompt, schema=None, options=None)</code> or <code>Result.needs_approval(step, prompt)</code>. A crash is a <code>failed</code> Result with the error and the step, never an exception to the caller.</li>
          <li><code>ctx.http</code> (HTTPS to the declared hosts; any library works too, as <code>HTTPS_PROXY</code> is set), <code>ctx.files</code> (its folder), <code>ctx.data</code>, <code>ctx.db</code>, <code>ctx.secrets</code>, <code>ctx.log(message, **detail)</code>, <code>ctx.today()</code>, <code>ctx.yesterday()</code>, <code>ctx.caller</code> (<code>claude</code> or <code>schedule</code>), <code>ctx.clearance</code>.</li>
          <li>The <code>rrotor</code> package is in the sandbox already: never install it or list it in <code>requirements.lock</code>.</li>
          <li>Tests use <code>rrotor.testing.Harness</code>: inputs, answers, a folder, an <code>http</code> that answers what the test says, <code>secrets={'{...}'}</code> and <code>database=&lt;a file&gt;</code>.</li>
        </ul>
        <h2 id="approvals">Approvals and inputs</h2>
        <ul>
          <li><code>ctx.ask_approval(step, prompt)</code> makes the run wait with <code>needs_approval</code>; it returns True once approved, False if declined. A step not named in the function’s <code>approvals</code> fails the run (<code>E_STEP_UNDECLARED</code>).</li>
          <li>A continue (<code>program_continue</code> with <code>{'{"approved": true}'}</code> or <code>false</code>, or the value for an input) calls the same function again with the same inputs. Wrap anything done once, a fetch or a charge, in <code>ctx.checkpoint(key, fn)</code>.</li>
          <li>Approvals are the person’s: Claude shows the prompt word for word and continues only with what you said. A waiting run expires after 15 minutes; <code>approvals</code> lists every one waiting.</li>
        </ul>
        <h2 id="secrets">Secrets</h2>
        <ul>
          <li>The manifest declares the name (<code>{'"secrets": ["ANALYTICS_KEY"]'}</code>); you set the value on the runtime, never in the repo, with <code>secret_set</code> (or <code>PUT /v1/programs/{'{name}'}/secrets/{'{secret}'}</code>). The program reads <code>ctx.secrets["ANALYTICS_KEY"]</code>.</li>
          <li>Values are encrypted at rest (AES-256-GCM) with the runtime’s own key, made on first use and never sent anywhere. Listing answers each name, whether it is declared and whether it is set: never a value.</li>
          <li>Only a run gets a value. A declared secret not set stops the run before it loads (<code>E_SECRET_MISSING</code>, naming it), so Claude knows what to ask you for. A value a program prints or logs is masked as <code>[secret]</code>.</li>
          <li>Secrets go from you to the runtime, never through Glyphh.</li>
        </ul>
        <h2 id="schedules">Schedules</h2>
        <Code lang="json">{`"schedules": [
  { "function": "start", "cron": "15 6 * * *" },
  { "function": "summary", "cron": "0 9 * * MON-FRI", "tz": "Europe/Amsterdam", "input": {}, "name": "weekdays" }
]`}</Code>
        <ul>
          <li>Five-field cron, or <code>@hourly</code>, <code>@daily</code>, <code>@weekly</code>, <code>@monthly</code> and the like; <code>tz</code> an IANA zone, default UTC; <code>input</code> checked against the function’s schema at deploy. Two schedules of one function need names.</li>
          <li>The runtime fires them itself, with no Claude and no server involved, as normal runs with <code>ctx.caller</code> <code>schedule</code>. An approval waits like any other run’s.</li>
          <li>A schedule whose last run has not ended is skipped that time, and the skip is kept. Fires missed while rrotor was down are not made up.</li>
          <li><code>schedules_list</code> shows each one’s next and last run; <code>schedule_pause</code> and <code>schedule_resume</code> keep across restarts and new versions.</li>
        </ul>
        <h2 id="sqlite">SQLite</h2>
        <p>
          <code>{'"databases": ["sqlite"]'}</code> gives the program <code>ctx.db</code>, the standard library’s{' '}
          <code>sqlite3.Connection</code> on <code>db.sqlite3</code> in its data folder, opened on first use and closed
          when the run ends: <code>with ctx.db:</code> commits, and what is not committed is rolled back. A program that
          does not declare it gets <code>E_DATABASE_UNDECLARED</code>.
        </p>
        <h2 id="deploy">Deploy</h2>
        <Row k="A folder on this machine">Commit, then the rrotor skill’s deploy (or the SDK’s deploy(path)): a git bundle of that commit, nothing else of the machine</Row>
        <Row k="program_deploy">{'{repo, commit, token?}'}: repo is owner/name on GitHub, commit the full 40-character SHA, token for a private repo</Row>
        <Row k="POST /v1/programs/deploy">{'{repo, commit, token?}'} or {'{bundle, commit}'}, a git bundle in base64 up to 64 MB</Row>
        <p>
          rrotor fetches exactly that commit, checks its SHA and the manifest, makes a venv from{' '}
          <code>requirements.lock</code> (no package’s setup runs outside the sandbox) and makes the version active.
          Versions are kept, so a new deploy rolls back like any commit.
        </p>
        <h2 id="call">Call</h2>
        <Code lang="json">{`program_call     {"program": "daily_sales", "function": "start", "inputs": {"day": "2026-10-30"}}
→ {"run_id": "…", "status": "needs_approval", "step": "write", "prompt": "Write 2026-10-30's total, $1240.00, to the ledger?"}

program_continue {"run_id": "…", "answer": {"approved": true}}
→ {"run_id": "…", "status": "done", "data": {"day": "2026-10-30", "total_usd": "1240.00", "written": true}}`}</Code>
        <ul>
          <li><code>function</code> defaults to <code>start</code>. One run can take many calls: each continue resumes it while it waits.</li>
          <li>A run ends <code>done</code>, <code>failed</code>, <code>expired</code> or <code>cancelled</code>; the program’s <code>end</code> hook always runs. Past <code>limits.seconds</code> it fails <code>E_LIMIT_SECONDS</code>.</li>
          <li><code>run_status</code> and <code>run_log</code> read any run; seconds count time running, not waiting.</li>
        </ul>
      </>
    ),
  },
  {
    slug: 'clis',
    title: 'CLIs',
    lede: 'A CLI is a kind of program: a pinned command-line tool installed into your rrotor and run one command at a time in the sandbox, so Claude can use it without touching your machine.',
    body: (
      <>
        <h2>The manifest</h2>
        <p>
          Same repo, deploy, sandbox, vault, egress proxy, approvals, limits and audit as a program, with no{' '}
          <code>program.py</code>, functions, schedules or databases: <code>{'"kind": "cli"'}</code> and a{' '}
          <code>cli</code> block instead.
        </p>
        <Code lang="json">{GH}</Code>
        <Row k="install">One source, pinned, with the sha256 of what is downloaded (below)</Row>
        <Row k="command">What runs: a path or a name in the install, npm’s bin, PyPI’s console script, or the image’s binary. There is no shell</Row>
        <Row k="allow">Glob patterns over the joined arguments; none means any arguments</Row>
        <Row k="approvals">Patterns whose commands wait for the person first</Row>
        <Row k="env">The process’s environment; secret:NAME takes a declared secret from the vault</Row>
        <Row k="home">true: a private HOME kept across calls (the tool’s config, a login it keeps); otherwise the run’s own /tmp</Row>
        <Row k="interactive">Only false: interactive sessions are not built yet (true is refused, E_MANIFEST)</Row>
        <h2>Install sources</h2>
        <Table
          head={['Source', 'Write', 'Hosts the install also reaches']}
          rows={[
            ['A release asset', <code key="c">{'{"url": "https://…", "sha256": "…"}'}</code>, 'The URL’s own host; for github.com also objects.githubusercontent.com and release-assets.githubusercontent.com'],
            ['npm', <code key="c">{'{"npm": "name@1.2.3", "sha256": "…"}'}</code>, 'registry.npmjs.org'],
            ['PyPI', <code key="c">{'{"pypi": "name==1.2.3", "sha256": "…"}'}</code>, 'pypi.org and files.pythonhosted.org'],
            ['The image', <code key="c">{'{"image": "git"}'}</code>, 'None: nothing is downloaded, and no checksum is needed'],
          ]}
        />
        <ul>
          <li>The manifest’s <code>hosts</code> are allowed too. Every redirect is checked against the same list, HTTPS on 443 to public addresses only, 512 MB at most (<code>E_CLI_INSTALL</code> otherwise).</li>
          <li>The SHA-256 is checked <strong>before anything is unpacked</strong> (<code>E_CLI_CHECKSUM</code>, naming the one it got). No code of the CLI runs at install. Get the real checksum from the release’s published checksums or PyPI’s files page.</li>
          <li><strong>url</strong>: a tarball, a zip or a bare binary; pick the Linux build for the runtime’s architecture.</li>
          <li><strong>npm</strong>: an exact version, run with the image’s node. No install scripts run and no dependency is fetched: a package whose dependencies are not all bundled is refused.</li>
          <li><strong>pypi</strong>: an exact version whose wheel the runtime can import (<code>py3-none-any</code>, or CPython 3.13 on Linux); its dependencies come from a hashed <code>requirements.lock</code> beside <code>glyphh.json</code>.</li>
          <li>A new version is a new deploy, and rolls back like any program.</li>
        </ul>
        <h2>cli_run</h2>
        <Code lang="json">{`cli_run {"cli": "github", "args": ["pr", "list", "--state", "open"]}
→ {"run_id": "…", "status": "done",
   "data": {"exit_code": 0, "stdout": "…", "stderr": "", "stdout_bytes": 412, "stderr_bytes": 0,
            "truncated": false, "files": {}, "files_skipped": []}}`}</Code>
        <ul>
          <li>Takes <code>{'{cli, args, stdin?, files?}'}</code> (REST: <code>POST /v1/clis/{'{name}'}/run</code>). <code>files</code> are written to a fresh working folder for the call, the command’s current folder; the files the command makes or changes there come back in <code>files</code>.</li>
          <li>A nonzero exit is still <code>done</code>, with its <code>exit_code</code>. stdout and stderr each come back up to their first 64 KB; all of each goes to the run’s log.</li>
          <li>Every call is a run: <code>run_status</code>, <code>run_log</code> (the command line, secrets masked) and the audit log. <code>program_call</code> on a CLI is refused <code>E_NOT_PROGRAM</code>, <code>cli_run</code> on a program <code>E_NOT_CLI</code>.</li>
        </ul>
        <h2>Allow and approval patterns</h2>
        <ul>
          <li>The arguments are joined as a shell would quote them and matched against the patterns. With <code>allow</code> set, one must match, or the call is refused 403 <code>E_CLI_DENIED</code> (an audit event, never a run).</li>
          <li>A pattern matches the whole line, so a trailing <code>*</code> also takes further flags: <code>api repos/x -X DELETE</code> matches <code>api repos/*</code>. Write narrower patterns for what must not pass.</li>
          <li>A command matching <code>approvals</code> waits with <code>needs_approval</code> at step <code>cli</code>, the command line in its prompt. <code>program_continue</code> with <code>{'{"approved": true}'}</code> runs it; <code>false</code> ends it <code>E_CLI_DECLINED</code>. It expires after 15 minutes.</li>
        </ul>
        <h2>Secrets as environment</h2>
        <p>
          <code>{'"GH_TOKEN": "secret:GH_TOKEN"'}</code> passes a declared secret from the vault (set it with{' '}
          <code>secret_set</code>, as for a <a href={`${DOCS}/programs#secrets`}>program</a>). It is never written to
          disk, and its value is masked as <code>[secret]</code> in the run’s log, its Result and the audit log.{' '}
          <code>PATH</code>, <code>HOME</code>, <code>TMPDIR</code>, <code>LANG</code>, the proxy variables and any{' '}
          <code>LD_*</code> are rrotor’s and cannot be set.
        </p>
        <h2>Limits</h2>
        <Row k="Arguments">At most 256, of 8,192 characters each</Row>
        <Row k="stdin">Up to 1 MB of text</Row>
        <Row k="files">Up to 64 files of 1 MB each, in and out; past that, out ones are only named in files_skipped</Row>
        <Row k="Time and memory">The manifest’s limits.seconds (past it, E_LIMIT_SECONDS) and limits.memory_mb, per process</Row>
        <Row k="Install">512 MB downloaded, 1 GB unpacked</Row>
        <ul>
          <li>A CLI’s run executes only the system, its install and its venv: nothing it may write (its working folder, <code>/tmp</code>, its HOME).</li>
          <li>Not enforced by rrotor: what the command itself does with the arguments it was allowed. A pattern is only as narrow as it is written.</li>
          <li>One-shot commands only: interactive sessions are not built yet.</li>
        </ul>
        <h2>The glyphh command as a CLI</h2>
        <Code lang="json">{`{
  "name": "glyphh",
  "kind": "cli",
  "cli": {
    "install": { "pypi": "glyphh==<version>", "sha256": "<the wheel's>" },
    "command": "glyphh",
    "env": { "GLYPHH_API_KEY": "secret:GLYPHH_API_KEY" },
    "home": true
  },
  "hosts": ["ada.glyphh.ai", "platform.glyphh.ai"],
  "secrets": ["GLYPHH_API_KEY"],
  "limits": { "seconds": 120, "memory_mb": 256 }
}`}</Code>
        <p>Claude then calls Ada Cloud through <a href={`${DOCS}/cli`}>the glyphh command</a> in the sandbox, its API key kept in the runtime’s vault.</p>
      </>
    ),
  },
  {
    slug: 'apps',
    title: 'Apps',
    lede: 'An app is a page Claude wrote, published from Claude to your organisation’s rrotor, approved by a reviewer and opened by your people at your own host, by role.',
    body: (
      <>
        <h2>What an app is</h2>
        <p>
          A Claude Code artifact: one self-contained <code>.html</code> or <code>.md</code> file (styles and scripts
          inline, libraries from the five CDN hosts artifacts use, fonts from Google Fonts) and any files beside it.
          Claude Code’s own publish puts it on claude.ai; <strong>this</strong> publish puts it on your rrotor instead,
          as a program of <code>&quot;kind&quot;: &quot;app&quot;</code>: the same deploy, versions, sandbox, vault,
          hosts, CLIs and audit as any program. The page never passes through Glyphh’s server: it goes from the
          session to the rrotor, and the server keeps only the catalogue entry (title, description, version, roles,
          who published it, its review state).
        </p>
        <h2>Publish it from Claude</h2>
        <p>With the <a href={`${DOCS}/plugin`}>glyphh plugin</a> and your rrotor connected, say:</p>
        <Code>{`publish this to my org`}</Code>
        <p>The plugin’s publish skill:</p>
        <ol>
          <li>Finds the page: the session’s latest artifact, or the file you name.</li>
          <li>Agrees the name (kebab-case, the address <code>/apps/&lt;name&gt;/</code>; a new version of the same name replaces the old), a title, a one-line description and the roles that may open it (default: everyone in the organisation).</li>
          <li>Replaces what cannot run on rrotor: a section that pulled live data through a claude.ai connector becomes a function in <code>program.py</code> the page calls, using <code>ctx.http</code> to the hosts the manifest declares, or a CLI the manifest names.</li>
          <li>Calls <code>app_publish</code> with the files. rrotor writes the manifest, commits the files in a scratch repo (the commit is the version), deploys the version and answers its address and state.</li>
        </ol>
        <h2>Review</h2>
        <ul>
          <li>A new version is a <strong>draft</strong> until a reviewer approves it: the organisation’s admin, or a member of a reviewer group (platform, Settings → Auth). The approved version keeps serving until the next one is approved; a rejected one is never served.</li>
          <li>Reviewers see the ones awaiting review, with Approve and Reject, on the platform’s Apps page and in Claude through the Glyphh connector (<code>artifacts</code>, <code>artifact_approve</code>, <code>artifact_reject</code>, <code>artifact_retire</code>). A reviewer can open any version of any app at the rrotor, to review a draft.</li>
          <li>Your people find the approved ones in the same list, with Open, and open each at the rrotor it lives on.</li>
          <li>Air-gapped (the link off), there is no catalogue: the deploy is the approval and the manifest’s roles decide.</li>
        </ul>
        <h2>Who opens it</h2>
        <ul>
          <li>A browser at <code>https://&lt;host&gt;/apps/&lt;name&gt;/</code> is sent to the Glyphh sign-in (rrotor is an OAuth client of the Glyphh server) and comes back with a session cookie; rrotor checks it with the server as it checks a bearer.</li>
          <li><strong>Roles</strong> are your identity provider’s groups, read at every single sign-on (Okta or Entra ID over OIDC), plus Glyphh’s <code>admin</code> and <code>member</code>. An app with no roles opens to everyone in the organisation. Google and GitHub sign-ins have no groups.</li>
          <li>A local rrotor (<code>127.0.0.1:7777</code>) serves its apps to the browser on its own machine with no sign-in: they are yours.</li>
          <li>A runtime key is never served a page: keys call programs, not pages.</li>
        </ul>
        <h2>A page that calls the runtime</h2>
        <p>
          A page calls <code>POST /apps/&lt;name&gt;/call/&lt;function&gt;</code> with the inputs as JSON, and gets a
          Result back as any run does (<code>done</code>, <code>needs_input</code>, <code>needs_approval</code>,
          <code>failed</code>); a waiting run continues at <code>POST /apps/&lt;name&gt;/runs/&lt;run_id&gt;/continue</code>.
          The run is the viewer’s: its CLIs run in their own signed-in home, and the audit names them.
        </p>
        <Code lang="js">{`const r = await fetch("/apps/deploy-failures/call/failures", {
  method: "POST", headers: { "content-type": "application/json" },
  body: JSON.stringify({ days: 7 }),
}).then((x) => x.json());
if (r.status === "done") render(r.data);`}</Code>
        <h2>Routes and tools</h2>
        <Table
          head={['Route', 'MCP tool', 'Does']}
          rows={[
            ['POST /v1/apps', 'app_publish', 'Publish a version: {name, title, description?, roles?, files, entry?, functions?, program?, hosts?, secrets?, clis?, limits?}'],
            ['GET /v1/apps', 'apps_list', 'Each app: name, title, description, version, active, roles, functions, state, url'],
            ['GET /apps/{name}/', '', 'The page, to a signed-in viewer whose roles allow it, once approved'],
            ['POST /apps/{name}/call/{function}', '', 'A run of one of the app’s functions, as the viewer'],
          ]}
        />
      </>
    ),
  },
  {
    slug: 'runtime-sdk',
    title: 'The Runtime client',
    lede: 'Runtime, in both SDKs from 3.6.0: your rrotor’s programs, approvals, secrets, schedules, CLIs and licence, from code.',
    body: (
      <>
        <p>
          <code>Runtime</code> ships in the same packages as the <a href={`${DOCS}/sdks`}>Ada client</a> (
          <code>pip install glyphh</code>, <code>npm install @glyphh-ai/glyphh</code>) and shares nothing else with Ada
          Cloud. It reads <code>RROTOR_URL</code> (default <code>http://127.0.0.1:7777</code>) and{' '}
          <code>RROTOR_TOKEN</code> (default the file <code>~/.glyphh/rrotor/token</code>, the one the rrotor skill
          made).
        </p>
        <h2>Python</h2>
        <Code lang="python">{`from glyphh import Runtime

rt = Runtime()                                    # RROTOR_URL or http://127.0.0.1:7777; RROTOR_TOKEN or ~/.glyphh/rrotor/token
rt.deploy("./daily_sales")                        # the folder's HEAD commit, as a git bundle (or repo=, commit=)
run = rt.call("daily_sales", "start", {"day": "2026-10-30"})
if run.needs_approval:                            # show the person run.prompt; only on their yes:
    run = rt.approve(run.run_id)                  # or rt.approve(run.run_id, False)
print(run.status, run.data)

rt.set_secret("github", "GH_TOKEN", token)       # kept encrypted on the runtime; never read back
out = rt.run_cli("github", ["pr", "list"])        # out.exit_code, out.stdout, out.stderr`}</Code>
        <Row k="Runtime">programs(), program(name), deploy(path, commit=) / deploy(repo=, commit=, token=) / deploy(bundle=, commit=); call(program, function, inputs, version=, clearance=), resume(run_id, answer), approve(run_id, approved=True), cancel(run_id), run(run_id), log(run_id), approvals(); secrets(program), set_secret, delete_secret; schedules(), pause_schedule, resume_schedule; clis(), run_cli(cli, args, stdin=, files=); licence(), set_licence(key), health()</Row>
        <Row k="Run">run_id, program, version, function, status, data, step, prompt, seconds; done, waiting, needs_approval, needs_input, failed, ended; a CLI command’s exit_code, stdout, stderr, files</Row>
        <Row k="The rest">Program, ProgramVersion, RunInfo, Approval, Secret (name, declared, set: never a value), Schedule, Cli, Licence: the API’s answers, typed (body keeps each one’s JSON)</Row>
        <h2>TypeScript</h2>
        <Code lang="javascript">{`import { Runtime } from "@glyphh-ai/glyphh";

const rt = new Runtime();                          // RROTOR_URL or http://127.0.0.1:7777; RROTOR_TOKEN or ~/.glyphh/rrotor/token
await rt.deploy({ path: "./daily_sales" });         // the folder's HEAD commit (Node), or { repo, commit, token? }
let run = await rt.call("daily_sales", "start", { day: "2026-10-30" });
if (run.status === "needs_approval") run = await rt.approve(run.run_id);   // only on the person's yes
await rt.setSecret("github", "GH_TOKEN", token);   // kept encrypted on the runtime; never read back
const out = await rt.runCli("github", ["pr", "list"]);   // out.data.exit_code, stdout, stderr`}</Code>
        <p>
          The same calls in camelCase with options objects: <code>deploy({'{ path, commit? }'} | {'{ repo, commit, token? }'} | {'{ bundle, commit }'})</code>,{' '}
          <code>call(program, fn, inputs, {'{ version, clearance }'})</code>, <code>setSecret</code>,{' '}
          <code>deleteSecret</code>, <code>pauseSchedule</code>, <code>resumeSchedule</code>,{' '}
          <code>runCli(cli, args, {'{ stdin, files }'})</code>, <code>setLicence(key)</code>.
        </p>
        <h2>A self-hosted rrotor</h2>
        <Code lang="python">{`rt = Runtime("https://rrotor.example.com", "<a runtime key>")`}</Code>
        <Code lang="javascript">{`const rt = new Runtime({ url: "https://rrotor.example.com", token: "<a runtime key>" });`}</Code>
        <h2>Errors and retries</h2>
        <p>
          A refusal raises (Python) or throws (TypeScript) an <code>RrotorError</code>, which is an{' '}
          <code>AdaError</code> too, typed by code: <code>RrotorAuthError</code>, <code>RrotorForbiddenError</code>,{' '}
          <code>LocalOnlyError</code>, <code>ProgramMissingError</code>, <code>FunctionMissingError</code>,{' '}
          <code>RunMissingError</code>, <code>ScheduleMissingError</code>, <code>ManifestError</code>,{' '}
          <code>DeployError</code>, <code>InputsError</code>, <code>RunStateError</code>, <code>NotProgramError</code>,{' '}
          <code>NotCliError</code>, <code>CliDeniedError</code>, <code>NotHeadError</code>, <code>LicenceError</code>,{' '}
          <code>NotInPlanError</code>; <code>E_UNREACHABLE</code> when rrotor is not running.
        </p>
        <p>Reads are sent again while rrotor is unreachable for a moment; a write never is.</p>
      </>
    ),
  },
];
