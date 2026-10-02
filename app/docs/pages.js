import { Note, Row, Code } from './ui';

// The docs, kept short. Each page is written from the source; when the product
// changes, the page changes in the same push.

export const ada = [
  {
    slug: 'ada',
    title: 'Ada models',
    lede: 'Typed models your agents build, feed and query, with every answer a fact tree.',
    body: (
      <>
        <p>
          An Ada model holds records: a situation, the outcome that was tried, and whether it worked. Ask it about a
          new situation and it answers with the outcome that worked in situations like it, how confident it is, and
          the records it stands on. Ada runs on Glyphh&rsquo;s servers and is reached over MCP, at{' '}
          <code>POST /ada</code>, or as a chat model.
        </p>
        <h2>Current model</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Model</th><th>Pricing</th><th>Situation size</th><th>Outcome label</th><th>Input</th></tr></thead>
            <tbody>
              <tr><td><code>glyphh-ada-1.0</code></td><td>Per token, in and out</td><td>Up to 16 KB of JSON</td><td>Up to 200 characters</td><td>JSON</td></tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li><strong>Pricing.</strong> Every Ada call is metered per input and output token on the <code>glyphh-ada-1.0</code> row and paid from your organization&rsquo;s monthly budget, at your plan&rsquo;s rate. The current rate is in the <a href="https://glyphh.ai/integrations/models">model catalog</a>.</li>
          <li><strong>Budget.</strong> A call meets the same budget wall as any model call: without a plan, or over budget, it is refused before it runs.</li>
          <li><strong>Situations.</strong> A situation is JSON of any shape. Arrays are treated as sets.</li>
          <li><strong>One id per call.</strong> Every call names a <code>model_id</code> (<code>am_</code> and 12 hex digits). An organization can have many models.</li>
        </ul>
        <h2>Where records live</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Storage</th><th>Records are kept</th><th>Needs</th></tr></thead>
            <tbody>
              <tr><td><code>cloud</code></td><td>With Glyphh, in your organization&rsquo;s own schema</td><td>Nothing</td></tr>
              <tr><td><code>local</code></td><td>On a device your organization registered</td><td>That device online when the model is used</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          A model&rsquo;s configuration always lives on the server: its name, where its records live, its weights
          and its calibration. Only the records themselves can live on a device. Register one with{' '}
          <code>glyphh ada register</code>, then create the model with <code>storage: &quot;local&quot;</code> and
          that device&rsquo;s id.
        </p>
        <h2>Customizing a model</h2>
        <ul>
          <li><strong>Weights.</strong> Say how much each key decides: <code>{'{"risk": 1, "team": 0.1}'}</code>. A number weighs a key; an object weighs inside it. Unlisted keys weigh 1. Set defaults on the model, or pass weights on one call.</li>
          <li><strong>Calibration.</strong> Once a model has 10 or more wins, <code>ada_calibrate</code> fits its probabilities to its own records. The result is saved with the model.</li>
          <li><strong>Learned weights.</strong> Once a model has 10 or more wins, an org admin can run <code>ada_learn</code>. It works out which keys decide by holding records out and predicting them from the rest, saves those weights as the model&rsquo;s defaults, calibrates it, and reports how often the model predicts its own held-out records before and after.</li>
          <li><strong>Clearance.</strong> An org admin sets each team&rsquo;s clearance on a model from 0 to 1. A team with no setting has full clearance.</li>
        </ul>
        <h2>Values said another way</h2>
        <p>
          A query does not have to use the same word a record used. When a cloud model records a value it has not
          seen, Ada works out once how else that value is said and keeps it with the model, so a query for{' '}
          <code>production</code> reaches records that say <code>prod</code>. Nothing changes in the calls you make.
        </p>
        <ul>
          <li><strong>No model runs when you query.</strong> The lexicon is built when a record is written, and a query only reads it.</li>
          <li><strong>A match by lexicon is never exact.</strong> It scores at most 0.95, so it needs three records and 0.7 confidence to act, like any other near match.</li>
          <li><strong>Recorded values stay distinct.</strong> Two values your records use are never treated as the same.</li>
          <li><strong>Fact trees show it.</strong> The key&rsquo;s leaf shows your word, the record&rsquo;s word and the score.</li>
          <li><strong>What is sent.</strong> To build the lexicon, a cloud model&rsquo;s short text values are sent to the language model that fronts Ada. A local model&rsquo;s values are never sent, so a local model matches exact values only. Keys with more than 200 distinct values, such as ids, are left out.</li>
        </ul>
        <h2>When Ada says to act</h2>
        <p>
          A query returns <code>act</code>, true only when the answer is sufficient, its confidence is at least
          0.7, three or more records stand behind it, and the outcome is not vetoed by a recorded failure. A
          record that matches the situation exactly is the answer and acts alone. Records less than 0.40 similar
          to the situation are not counted. An answer is marked <code>calibrated</code> once the model has been
          calibrated.
        </p>
        <Note kind="warn" title="A single record is not consensus">
          Ada cites what it stands on. Read <code>count</code> and <code>receipts</code> before acting on a thin
          answer.
        </Note>
        <h2>Listing models</h2>
        <p>Over MCP, call <code>ada_models</code>. Over HTTP, the same call is an <code>op</code>:</p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{"op": "models"}'`}</Code>
        <Code lang="python">{`import os, requests

r = requests.post(
    "https://api.glyphh.ai/ada",
    headers={"x-glyphh-api-key": f"Bearer {os.environ['GLYPHH_API_KEY']}"},
    json={"op": "models"},
)
models = r.json()["data"]`}</Code>
        <Code lang="javascript">{`const r = await fetch("https://api.glyphh.ai/ada", {
  method: "POST",
  headers: {
    "x-glyphh-api-key": \`Bearer \${process.env.GLYPHH_API_KEY}\`,
    "content-type": "application/json",
  },
  body: JSON.stringify({ op: "models" }),
});
const { data: models } = await r.json();`}</Code>
        <p>
          Each model comes back with its <code>id</code>, <code>name</code>, <code>storage</code>, default{' '}
          <code>weights</code>, and whether it is <code>calibrated</code>. Pass a <code>model_id</code> to get one
          model with its record counts.
        </p>
      </>
    ),
  },
  {
    slug: 'ada-install',
    title: 'Install',
    lede: 'Connect an agent to Ada: the Claude Code plugin, any MCP client, or an API key.',
    body: (
      <>
        <h2>Claude Code</h2>
        <p>The plugin installs the Ada connection and the <code>ada</code> skill, which tells Claude when to reach for Ada.</p>
        <Code lang="bash">{`claude plugin marketplace add glyphh-ai/ada
claude plugin install ada@glyphh-ai`}</Code>
        <p>
          Then run <code>/mcp</code> in Claude Code, pick <code>ada</code> and choose <strong>Authenticate</strong>.
          Your browser opens and you sign in with your Glyphh account. There is no key to create.
        </p>
        <h2>Claude and other clients that sign in</h2>
        <p>Add a custom connector or remote MCP server with this URL, and sign in with your Glyphh account when asked:</p>
        <Code>{`https://api.glyphh.ai/mcp`}</Code>
        <p>
          Ada sends its own usage guidance when a client connects, so these clients use it well without the skill.
        </p>
        <h2>Other agents</h2>
        <p>Install the skill with skills.sh, then add the URL above as an MCP server in that agent.</p>
        <Code lang="bash">{`npx skills add glyphh-ai/ada --skill ada`}</Code>
        <h2>API key</h2>
        <p>
          For CI, a headless agent, or a client that cannot open a browser, create a key on the console&rsquo;s
          Virtual Keys page and send it as a header.
        </p>
        <Code lang="bash">{`claude mcp add --transport http ada https://api.glyphh.ai/mcp \\
  --header "x-glyphh-api-key: Bearer $GLYPHH_API_KEY"`}</Code>
        <Code lang="json">{`{
  "mcpServers": {
    "ada": {
      "type": "http",
      "url": "https://api.glyphh.ai/mcp",
      "headers": { "x-glyphh-api-key": "Bearer sk-…" }
    }
  }
}`}</Code>
        <h2>What the agent sees</h2>
        <p>
          The <code>ada_*</code> tools, plus <code>mcp_tool_search</code> and <code>mcp_tool_call</code> for your
          organization&rsquo;s other connected tools. Connected tools are found by search and are not listed one by
          one.
        </p>
        <Note title="Use it">
          Ask in plain words: &ldquo;Use Ada to remember how we fixed this deploy failure, and check it before the
          next deploy.&rdquo; In Claude Code, <code>/ada:ada</code> invokes the skill directly.
        </Note>
      </>
    ),
  },
  {
    slug: 'ada-tools',
    title: 'Ada tools and API',
    lede: 'Every Ada call, over MCP or POST /ada, and what comes back.',
    body: (
      <>
        <p>
          The same calls answer in three places: as <code>ada_*</code> tools on your organization&rsquo;s MCP
          endpoint, as <code>op</code> values at <code>POST /ada</code>, and behind the{' '}
          <code>glyphh-ada-1.0</code> chat model, which turns plain language into these calls.
        </p>
        <h2>Ask and explain</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Returns</th></tr></thead>
            <tbody>
              <tr><td><code>ada_query</code></td><td><code>model_id</code>, <code>situation</code>, optional <code>weights</code></td><td>The top outcome, its confidence, the records behind it, and <code>act</code></td></tr>
              <tr><td><code>ada_facts</code></td><td><code>model_id</code>, <code>situation</code>, optional <code>weights</code>, <code>top</code> (1 to 50, default 3)</td><td>The nearest wins and failures, each as a fact tree</td></tr>
              <tr><td><code>ada_check</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code></td><td>How close the nearest win and failure of that outcome are</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Record</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Takes</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>ada_record</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code></td><td>Records a win: this outcome worked here</td></tr>
              <tr><td><code>ada_veto</code></td><td><code>model_id</code>, <code>situation</code>, <code>outcome</code></td><td>Records a failure: this outcome failed or was rejected here</td></tr>
              <tr><td><code>ada_calibrate</code></td><td><code>model_id</code></td><td>Fits the model&rsquo;s probabilities to its records (10 or more wins)</td></tr>
              <tr><td><code>ada_learn</code></td><td><code>model_id</code></td><td>Learns which keys decide from the model&rsquo;s wins (10 or more), saves them as its default weights and calibrates it (org admins)</td></tr>
            </tbody>
          </table>
        </div>
        <Note kind="warn" title="Record what the world graded">
          Record an outcome only once it is known, and only when the user or the world confirmed it. An agent should
          never grade its own work as a win.
        </Note>
        <h2>Models, records and devices</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tool</th><th>Who</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td><code>ada_models</code></td><td>Any member</td><td>Lists the organization&rsquo;s models, or one with its record counts</td></tr>
              <tr><td><code>ada_records</code></td><td>Any member</td><td>Browses a model&rsquo;s records, newest first, by store (<code>wins</code> or <code>vetoes</code>)</td></tr>
              <tr><td><code>ada_devices</code></td><td>Any member</td><td>Lists registered devices and whether each is online</td></tr>
              <tr><td><code>ada_create_model</code></td><td>Org admins</td><td>Creates a model with <code>name</code> and <code>storage</code> (<code>cloud</code> or <code>local</code>)</td></tr>
              <tr><td><code>ada_update_model</code></td><td>Org admins</td><td>Renames a model or sets its default weights</td></tr>
              <tr><td><code>ada_delete_model</code></td><td>Org admins</td><td>Deletes a model and its records, wherever they live</td></tr>
              <tr><td><code>ada_edit_record</code></td><td>Org admins</td><td>Corrects a record&rsquo;s situation or outcome</td></tr>
              <tr><td><code>ada_delete_record</code></td><td>Org admins</td><td>Deletes one record</td></tr>
            </tbody>
          </table>
        </div>
        <h2>Describing a situation</h2>
        <p>
          Give only the attributes that should decide, as short canonical values, and use the same keys every time
          for the same kind of situation. Leave out ids, paths, names and timestamps: they make unrelated situations
          look alike.
        </p>
        <Code lang="json">{`{ "task": "deploy_service", "constraint": "canary_required" }`}</Code>
        <h2>POST /ada</h2>
        <p>
          One endpoint, on a gateway key. The <code>op</code> is the tool name without <code>ada_</code>; the rest
          of the body is that tool&rsquo;s arguments.
        </p>
        <Code lang="bash">{`curl https://api.glyphh.ai/ada \\
  -H "x-glyphh-api-key: Bearer $GLYPHH_API_KEY" \\
  -H "content-type: application/json" \\
  -d '{
    "op": "query",
    "model_id": "am_0123456789ab",
    "situation": { "task": "deploy_service", "constraint": "canary_required" }
  }'`}</Code>
        <p>A query answers with:</p>
        <Row k="top">The outcome that worked most in situations like this one.</Row>
        <Row k="confidence">How strongly the records agree on it, 0 to 1.</Row>
        <Row k="count">How many records stand behind the answer.</Row>
        <Row k="outcomes">Every outcome found, with its share.</Row>
        <Row k="receipts">The records cited: id, similarity, outcome, author.</Row>
        <Row k="veto_match">How close the nearest recorded failure of the top outcome is.</Row>
        <Row k="act">True when it is safe to act; <code>reason</code> says why or why not.</Row>
        <Row k="calibrated">True once three or more records stand behind the answer.</Row>
        <p>
          A success is <code>{'{"data": …}'}</code>. A refusal is <code>{'{"error": {"code", "message"}}'}</code>{' '}
          with a 400.
        </p>
        <h2>As a chat model</h2>
        <p>
          Pick <code>glyphh-ada-1.0</code> like any other model and talk to it in plain language or JSON. It answers
          only by calling the tools above, and replies with the answer, whether it is safe to act, and the records
          it cites.
        </p>
      </>
    ),
  },
];

const desktop = [
  {
    slug: 'install',
    title: 'Install and sign in',
    lede: 'Get the desktop, sign in once, and let the app keep itself current.',
    body: (
      <>
        <h2>Download</h2>
        <p>
          Get the installer from the <a href="https://glyphh.ai/#download">download section</a> of glyphh.ai, or from the
          Downloads page of your organization&rsquo;s console. Releases are published privately and served
          through the console, so a download link is short-lived and made for you when you click it.
        </p>
        <h2>Sign in</h2>
        <p>
          The desktop signs you in with a device flow. It opens your browser on the sign-in page, you approve the
          device, and the app picks up the session. Sign-in itself is a magic link to your email, Google, or your
          organization&rsquo;s SSO. An organization that requires SSO refuses magic links for its domain.
        </p>
        <p>
          The first person from a new email domain gets a new organization. Everyone invited after that joins it.
        </p>
        <p>Sign in once and stay signed in. Log out from the account menu and this device is signed out.</p>
        <h2>Updates</h2>
        <p>
          When a new version is ready, a dot appears next to <strong>About</strong> in the account menu. Open
          About to install it. Automatic download is a preference; it never installs while you are working.
        </p>
      </>
    ),
  },
  {
    slug: 'loops',
    title: 'The agent',
    lede: 'One agent loop, two kinds of session, and the folder it works in.',
    body: (
      <>
        <p>
          Glyphh runs one agent loop: the same engine in the desktop&rsquo;s agent panel and in the{' '}
          <a href="/docs/cli">glyphh CLI</a>. It speaks the Messages API and MCP, calls every model through your
          organization&rsquo;s <a href="/docs/gateway">Router</a>, and runs any model your team allows.
        </p>
        <h2>Two kinds of session</h2>
        <Row k="Work">Chat and act: your apps, connections, memory, and Glyphh&rsquo;s own tools. No file system or shell</Row>
        <Row k="Code">Everything in Work, plus files and a shell, confined to the folder the session works in</Row>
        <p>A session is born one kind and stays it: its transcript was written with that toolbelt.</p>
        <h2>The folder is the sandbox</h2>
        <p>
          A Code session works in one folder and nowhere else. File tools refuse any path outside it, reads
          included, and on macOS the shell runs under the system sandbox with writes allowed only inside that
          folder, temp space, and package caches. Change the folder and the session keeps the new one.
        </p>
        <h2>Sub-agents</h2>
        <p>
          The agent can hand work to sub-agents you define under Settings &rarr; Build &rarr; Agents: a name, a
          brief, and a model of their own. They run the same loop in parallel and report back; the Agents panel
          shows each one working.
        </p>
        <h2>What it costs</h2>
        <p>
          Every turn is a model call paid from your organization&rsquo;s budget at your plan&rsquo;s rate for that
          model. Without a plan, everything works except model calls.
        </p>
      </>
    ),
  },
  {
    slug: 'cli',
    title: 'The Glyphh CLI',
    lede: 'Install the glyphh command, sign in to your org, and run the loop in any terminal.',
    body: (
      <>
        <p>
          The <code>glyphh</code> command is the Glyphh loop in your terminal: the same engine the desktop&rsquo;s
          agent panel runs, through your organization&rsquo;s Router, on any model your team allows. It signs in to
          your org on its first screen and keeps one conversation history with the desktop.
        </p>
        <h2>Install</h2>
        <p>It is an npm package. You need Node.js 18 or newer.</p>
        <Code lang="bash">{`npm i -g @glyphh-ai/cli
glyphh`}</Code>
        <h2>Sign in</h2>
        <p>
          The first screen is a device login. Open the link it prints, sign in with your Glyphh account, and the
          terminal picks up the session. It lives in <code>~/.glyphh/session.json</code>, separate from the
          desktop&rsquo;s own login, so signing out of one does not sign out the other.
        </p>
        <Note kind="wire" title="Model calls need a paid plan">
          The CLI signs in and works on Free, but a model call is refused until an org admin chooses Solo, Basic or
          Pro on Billing.
        </Note>
        <h2>The first run in a folder</h2>
        <p>
          Like the other agent CLIs, <code>glyphh</code> asks once whether it may work in the folder you started it
          in. Answer yes and it remembers; <code>--trust</code> skips the question for scripts and launchers.
        </p>
        <h2>Day to day</h2>
        <Row k="/model">Pick a model from the org&rsquo;s roster with the arrow keys or a number</Row>
        <Row k="/permissions">Default, accept edits, plan, or bypass. Shift+Tab cycles the first three</Row>
        <Row k="/resume">Reopen an earlier conversation, yours from the desktop included</Row>
        <Row k="--continue">Start on your most recent conversation</Row>
        <Row k="--resume <id>">Start on one conversation by id</Row>
        <Row k="--model <name>">Start on a model</Row>
        <Row k="--permission <mode>">Start in a permission mode: default, acceptEdits, plan, bypass</Row>
        <p>
          Type <code>/</code> for the command menu; <code>?</code> on an empty line is help. Ctrl+C clears the
          line, and a second press within two seconds quits.
        </p>
        <h2>One history with the desktop</h2>
        <p>
          Conversations are stored per user under <code>~/.glyphh/users/</code>, the same file the desktop reads.
          A chat you start in the terminal shows in the desktop&rsquo;s left rail; switch to the Glyphh view on
          the desktop and the conversation is there, and the desktop can hand the same chat back to a terminal.
        </p>
        <h2>Your own server</h2>
        <p>
          The CLI talks to <code>https://api.glyphh.ai</code>. To point it elsewhere set{' '}
          <code>GLYPHH_SERVER_URL</code>, or write a <code>server</code> field in{' '}
          <code>~/.glyphh/config.json</code>. <code>/config</code> shows which one is in effect.
        </p>
        <h2>Update and remove</h2>
        <Code lang="bash">{`npm i -g @glyphh-ai/cli@latest   # update
npm rm -g @glyphh-ai/cli          # remove`}</Code>
        <p>
          To keep Claude Code or Codex and point it at the gateway instead, see{' '}
          <a href="/docs/own-cli">Use your own CLI</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'skills',
    title: 'Skills',
    lede: 'A folder with a SKILL.md at its root. Read by every loop.',
    body: (
      <>
        <p>
          A skill is a directory with a <code>SKILL.md</code> at its root, plus whatever scripts and references it
          needs. That is the Agent Skills standard, the one Claude Code, Codex, and Gemini already read. Nothing to
          convert when you change loops.
        </p>
        <h2>Where they live</h2>
        <p>
          Your skills live under your Glyphh home and are linked into each CLI&rsquo;s own skills directory:
        </p>
        <Code>{`~/.glyphh/<user>/skills/<name>/     the skill
~/.claude/skills/<name>            linked for Claude Code
~/.codex/skills/<name>             linked for Codex
~/.gemini/skills/<name>            linked for Gemini`}</Code>
        <p>
          Disabling a skill moves the folder out of the CLI directories. There is no flag for a CLI to ignore, so
          off means off.
        </p>
        <h2>What a bundle is</h2>
        <p>The app reads the type from the bundle, never from its name:</p>
        <Row k="SKILL.md only">A skill</Row>
        <Row k="+ app.json">An app</Row>
        <Row k="+ task.json">A task</Row>
        <Row k="+ plugin marker">A plugin</Row>
        <h2>Making one</h2>
        <p>
          <strong>New</strong> on the Skills page opens a session rooted at your skills folder with a starter prompt
          already typed and not yet sent. Edit it, send it, and the agent scaffolds the folder. The same door exists
          on Apps, Tasks, Plugins, and Artifacts.
        </p>
        <h2>Using one</h2>
        <p>
          Type <code>/</code> in the composer and pick from your enabled skills. Or just ask: the loop reads the
          skill&rsquo;s description and reaches for it when it fits.
        </p>
        <Note kind="tip" title="Share it with the org">
          Publish a skill from its page and it goes to the org hub. An admin&rsquo;s publish goes live at once. A
          member&rsquo;s lands in review. See the org hub.
        </Note>
      </>
    ),
  },
  {
    slug: 'tasks',
    title: 'Tasks and schedules',
    lede: 'A program the desktop runs on a clock, with a checkpoint journal.',
    body: (
      <>
        <p>
          A task is a skill folder with a <code>task.json</code> and a <code>run.js</code>. The desktop runs it in
          a separate process, on a schedule or on demand, and journals every step so a run can pick up where it
          stopped.
        </p>
        <h2>The manifest</h2>
        <Code lang="task.json">{`{
  "name": "inbox-to-store",
  "program": "run.js",
  "slots": { "reader": { "model": "claude-haiku-4-5" } },
  "schedule": "*/15 * * * *",
  "dependencies": { "connections": ["gmail"] },
  "timeoutMs": 1800000
}`}</Code>
        <h2>The program</h2>
        <p>The program exports one function. It gets a context and the input, and returns the result.</p>
        <Code lang="run.js">{`export async function run(ctx, input) {
  const threads = await ctx.checkpoint("threads", () =>
    ctx.connections.gmail.call("list_threads", { newerThan: "15m" }));
  const facts = await ctx.agents.reader.run(
    "Extract people, orgs, and dates from these threads as JSON.",
    { schema: FactsSchema });
  await ctx.data("inbox").exec(
    "insert into facts(json) values (?)", [JSON.stringify(facts)]);
  ctx.log("stored", { count: facts.length });
  return { count: facts.length };
}`}</Code>
        <h2>The context</h2>
        <Row k="ctx.agents.<slot>.run(prompt, opts)">One headless turn on the slot&rsquo;s model. Pass a schema for typed output</Row>
        <Row k="ctx.connections.<app>.call(tool, args)">Call a connected service&rsquo;s tool</Row>
        <Row k="ctx.data(repo).exec(sql, params)">Read or write the task&rsquo;s SQLite store</Row>
        <Row k="ctx.checkpoint(key, fn)">Get-or-compute. Journaled, so a resumed run skips it</Row>
        <Row k="ctx.log(message, detail)">A line in the run feed</Row>
        <Note kind="admin" title="Unattended calls need Always allow">
          A task may only call a connection it declared, and only a tool set to <strong>Always allow</strong> on the
          Connections page. Ask and Never both refuse, because nobody is there to answer.
        </Note>
        <h2>The journal</h2>
        <p>
          Every agent call, connection call, data statement, checkpoint, and log line is written to the run as it
          happens. A run that was still going when the app quit resumes from its last checkpoint at the next
          launch. The default timeout is thirty minutes.
        </p>
        <h2>Schedules</h2>
        <p>
          Settings &rarr; Customize &rarr; Schedules is one table for everything on a clock. A row is a task or a
          skill. Write the schedule as five-field cron or in plain words, for example <em>weekdays at 9am</em>. A
          skill on a schedule needs an agent to run it in. Every row shows when it fires next and how the last run
          went, with the full run history behind it.
        </p>
      </>
    ),
  },
  {
    slug: 'connections',
    title: 'Connections',
    lede: '3,500+ services as tools, with org-shared or personal auth.',
    body: (
      <>
        <p>
          A connection gives the agent, your tasks, and your apps an authenticated tool surface into a service:
          Gmail, Slack, Salesforce, GitHub, Notion, and thousands more. The connect flow runs through Glyphh&rsquo;s
          server so no project keys ever reach your machine.
        </p>
        <h2>Two scopes</h2>
        <Row k="org">An admin connects one shared account. Every member uses it without doing their own auth</Row>
        <Row k="personal">Each member connects their own account. Only they can use it</Row>
        <p>The tool is the same either way. The scope decides whose credentials it carries.</p>
        <h2>Tool modes</h2>
        <p>
          Every tool on every connection has a mode: <strong>Ask</strong>, <strong>Always allow</strong>, or
          <strong> Never</strong>. The agent obeys it in a session and the task runner obeys it unattended. One rule,
          both places.
        </p>
        <Note kind="admin" title="Connections are a paid feature">
          Connections are available on paid plans. Each call is metered on the tokens it sends and returns and
          billed against your plan&rsquo;s monthly budget in dollars.
        </Note>
      </>
    ),
  },
  {
    slug: 'mcp',
    title: 'MCP in both directions',
    lede: 'Add any MCP server as a connection. Expose Glyphh as one.',
    body: (
      <>
        <h2>As a client: custom MCP servers</h2>
        <p>
          Point a connection at any MCP server and its tools join the agent&rsquo;s toolkit. Give it a URL and the
          app tries streamable HTTP, then falls back to SSE. Give it a command with no scheme and it runs the server
          over stdio.
        </p>
        <p>
          Auth is MCP&rsquo;s own OAuth 2.1 flow, with a loopback listener for the callback. Custom headers are
          write-only once saved. Secrets are stored on your machine with owner-only permissions.
        </p>
        <h2>As a server: drive Glyphh from other tools</h2>
        <p>
          Settings &rarr; MCP Server can start a local MCP endpoint on <code>127.0.0.1:7860</code>. It is off by
          default. Turn it on, mint a token, and any MCP-capable client on your machine can open panels, run your
          installed tools, and read your artifacts.
        </p>
        <Code lang="json">{`{
  "mcpServers": {
    "glyphh": {
      "url": "http://127.0.0.1:7860/mcp",
      "headers": { "Authorization": "Bearer <token from Settings → MCP Server>" }
    }
  }
}`}</Code>
        <p>Tokens are hashed at rest and expire after ninety days. Revoke one from the same page.</p>
        <Note kind="wire" title="Same registry as the cloud relay">
          The local server dispatches through the same tool registry the hosted relay uses. Pipedream connectors
          are deliberately not exposed on the local endpoint.
        </Note>
      </>
    ),
  },
];

const router = [
  {
    slug: 'gateway',
    title: 'The Router',
    lede: 'How a turn reaches a model, and what it costs.',
    body: (
      <>
        <p>
          Every model call goes through your organization&rsquo;s Router: the desktop&rsquo;s agent, your own CLI,
          and anything that speaks the OpenAI or Anthropic API. Your org&rsquo;s roles, budgets, and models apply,
          and every token is accounted for in the console.
        </p>
        <h2>What the app does</h2>
        <ol>
          <li>It asks the server for a member key. The key is minted once per user and reused.</li>
          <li>The agent sends each turn to the Router with that key. The key carries your team, its models, and its budget.</li>
          <li>Log out and the key is gone from the machine.</li>
        </ol>
        <h2>What it costs</h2>
        <p>
          Each call is paid from your organization&rsquo;s monthly budget at your plan&rsquo;s published rate for
          that model. The bigger the plan, the better the rate. There are no provider keys to bring. Without a
          plan, everything works except model calls. See the rates on the <a href="https://glyphh.ai/pricing#rates">pricing page</a>.
        </p>
        <h2>Auto-routers</h2>
        <p>
          An auto-router picks the model per request: frontier models for the hard turns, open weights for the
          rest. Your admin builds them on the console&rsquo;s <strong>Models</strong> page, from any model the org
          has access to.
        </p>
        <Note kind="note" title="Cached tokens count">
          Cache reads and writes are priced at their own rates, so a cached turn costs less.
        </Note>
        <p>
          For a CLI outside the desktop, see <a href="/docs/own-cli">Use your own CLI</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'own-cli',
    title: 'Use your own CLI',
    lede: 'Point a plain Claude Code or Codex install at the Router from a terminal.',
    body: (
      <>
        <p>
          You do not need the desktop to use the Router. Mint a virtual key on the console&rsquo;s Virtual Keys
          page, then set two variables in the shell that runs the CLI.
        </p>
        <h2>Claude Code</h2>
        <Code lang="bash">{`export ANTHROPIC_BASE_URL="https://api.glyphh.ai"
export ANTHROPIC_AUTH_TOKEN="sk-…"   # a virtual key from the console
claude`}</Code>
        <h2>Codex</h2>
        <Code lang="bash">{`export OPENAI_BASE_URL="https://api.glyphh.ai"
export OPENAI_API_KEY="sk-…"
codex`}</Code>
        <h2>Anything that speaks OpenAI</h2>
        <Code lang="python">{`client = OpenAI(
    base_url = "https://api.glyphh.ai",
    api_key  = "sk-…",
)`}</Code>
        <p>
          The key carries its governance with it: which models it may call, how fast, and on whose budget. The
          Router enforces that at the edge. Your code just makes requests.
        </p>
        <Note kind="warn" title="Use the org&rsquo;s base URL">
          The base URL is the one shown on your console&rsquo;s Virtual Keys page. It is the same host your
          console runs on.
        </Note>
        <h2>Your org&rsquo;s skills, in Claude Code</h2>
        <p>
          Every skill and plugin approved on the org hub is a Claude Code plugin. Open the AI Hub in the
          console, press <strong>Use in Claude Code</strong>, and paste the two lines it shows:
        </p>
        <Code lang="bash">{`/plugin marketplace add https://api.glyphh.ai/api/hub/<org>/claude-code/<token>.git
/plugin install <name>@glyphh-<org>`}</Code>
        <p>
          The hub is served as a plugin marketplace, so <strong>/plugin marketplace update</strong> picks up
          what admins approve later. The link is private to your organization. Nothing has to live in a git
          repository.
        </p>
        <h2>Your accounts, from any MCP client</h2>
        <p>
          Add the Router&rsquo;s MCP endpoint to Claude Code, Codex, Cursor, or claude.ai with your virtual
          key, and three tools are there beside the search tool:
        </p>
        <Row k="glyphh_connections">Your connected accounts, the apps the org shares, and what is ready</Row>
        <Row k="glyphh_connect">Returns a link. Open it, authorize the app, and its tools are searchable</Row>
        <Row k="glyphh_disconnect">Drop one account, or every one of yours with <strong>all</strong></Row>
        <Code lang="bash">{`claude mcp add --transport http glyphh https://api.glyphh.ai/mcp \
  --header "Authorization: Bearer sk-…"`}</Code>
        <p>
          Ask the agent to connect Gmail. It calls the tool, hands you the link, and once you have signed in
          the Gmail tools answer to <strong>mcp_tool_search</strong>. The same accounts show up on the desktop
          if you install it later.
        </p>
        <h2>Your org&rsquo;s agents</h2>
        <p>
          An agent your admin registered on the console&rsquo;s Agents page is a model on the Router. Send a
          chat request with <strong>model: a2a/&lt;name&gt;</strong> and the Router forwards it over A2A. The
          name is on the agent&rsquo;s hub page.
        </p>
      </>
    ),
  },
  {
    slug: 'budgets',
    title: 'Budgets and limits',
    lede: 'Every org has a ceiling. Roles narrow it from there.',
    body: (
      <>
        <h2>One budget</h2>
        <p>
          Your organization&rsquo;s dollars are your plan&rsquo;s price each month, dollar for dollar, plus any
          funds you add. Every model call and connector tool draws on them at your plan&rsquo;s published rates,
          and stops when they run out.
        </p>
        <p>
          An org admin may cap the month lower with a spend limit on the organization, never below the
          plan&rsquo;s price, and set budgets per team or key beneath it.
        </p>
        <h2>Roles and keys</h2>
        <p>
          Inside the ceiling, a role decides what a key may do: its models, its rate limits, and its own budget.
          Virtual keys are minted against a role. Roles are a Pro feature.
        </p>
        <h2>Rate limits at sign-in</h2>
        <p>
          Sign-in starts are throttled per address and per IP. Over the limit, the server answers with a rate-limit
          error for five minutes.
        </p>
        <Note kind="note" title="Where to watch it">
          The console&rsquo;s Dashboard shows MCP and model spend by day, and a click on a day drills into hours.
          Usage and Logs show every request.
        </Note>
      </>
    ),
  },
];

const org = [
  {
    slug: 'plans',
    title: 'Plans and pricing',
    lede: 'What each tier includes, and what the budget pays for.',
    body: (
      <>
        <h2>Tiers</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tier</th><th>Price</th><th>Monthly budget</th><th>Seats</th><th>Governance</th><th>SSO</th></tr></thead>
            <tbody>
              <tr><td>Free</td><td>$0</td><td>$1, for connections</td><td>1</td><td>no</td><td>no</td></tr>
              <tr><td>Solo</td><td>$20 / month</td><td>$20</td><td>1</td><td>no</td><td>no</td></tr>
              <tr><td>Basic</td><td>$40 / seat / month</td><td>$40 / seat</td><td>up to 25</td><td>no</td><td>no</td></tr>
              <tr><td>Pro</td><td>$150 / seat / month</td><td>$150 / seat</td><td>up to 100</td><td>roles and budgets</td><td>no</td></tr>
              <tr><td>Enterprise</td><td>custom</td><td>custom</td><td>unlimited</td><td>yes</td><td>yes</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The live catalog is served from the same table the console edits, so this site&rsquo;s
          <a href="https://glyphh.ai/pricing"> pricing page</a> and the desktop&rsquo;s Billing page always agree.
        </p>
        <h2>Budget</h2>
        <p>
          Plans are dollars per month, dollar for dollar: a paid plan includes its price as budget, per seat, every
          month. Free is $0 and includes $1 a month for the organization, spent on connector tools; it runs your
          own CLI and connected services, and makes no Glyphh model call. Every Glyphh product draws on that one
          budget: model calls at your plan&rsquo;s published rate for each model, and connector tools at their
          published per-token price. Plan-included budget resets each month.
        </p>
        <p>
          Every plan runs every model; the bigger the plan, the better the rate. There are no provider keys to bring:
          every call runs on Glyphh. On Free, everything works except Glyphh model calls, memory included. See the
          rates on the{' '}
          <a href="https://glyphh.ai/pricing#rates">pricing page</a>.
        </p>
        <h2>Add funds</h2>
        <p>
          Add dollars to the budget from the Billing page, dollar for dollar. There are no tiers and no discounts.
          Purchased funds never expire.
        </p>
        <h2>Auto-reload</h2>
        <p>Auto-reload can be configured from the Billing page: a threshold and an amount, both in dollars.</p>
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Sign-in and security',
    lede: 'Magic link, Google, SSO, device flow. What the server refuses.',
    body: (
      <>
        <h2>Ways in</h2>
        <Row k="Magic link">An email with a one-time link</Row>
        <Row k="Google">Sign in with a Google account</Row>
        <Row k="SSO">The org&rsquo;s identity provider. An org can make it mandatory</Row>
        <Row k="Device flow">How the desktop signs in: approve the device in the browser</Row>
        <h2>What the server refuses</h2>
        <ul>
          <li>A sign-in redirect to anywhere but the desktop, the console, a Glyphh domain, or the org&rsquo;s own hub domain.</li>
          <li>Repeated sign-in attempts from one address.</li>
          <li>A magic link for an org that requires SSO.</li>
          <li>A Router request for another org.</li>
        </ul>
        <h2>Sessions</h2>
        <p>
          Sessions are short-lived and refreshed under the hood. Logging out signs out this device and no other.
        </p>
        <h2>On your machine</h2>
        <ul>
          <li>Router credentials stay on your machine, readable only by you, and are removed at logout.</li>
          <li>MCP connection secrets are stored owner-only.</li>
          <li>The last identity is mirrored locally so the app can boot offline. It scopes local state only, never authorization.</li>
          <li>The shell&rsquo;s privileged bridge is granted only to the app&rsquo;s own home page, matched exactly.</li>
        </ul>
        <Note kind="warn" title="Report a problem">
          Found something? Write to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>. We answer.
        </Note>
      </>
    ),
  },
];

export const PRODUCT_GROUPS = [
  { title: 'Glyphh Desktop', pages: desktop },
  { title: 'Model Router', pages: router },
  { title: 'Organization', pages: org },
];
