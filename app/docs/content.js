import { Note, Row, Code, Cast } from './Mascot';

// The docs, written from the source on 2026-09-18. Every page names what the
// code does today, not what a plan says. When the app changes, this changes.

const start = [
  {
    slug: 'install',
    title: 'Install and sign in',
    lede: 'Get the desktop, sign in once, and let the app keep itself current.',
    mascot: 'scout',
    body: (
      <>
        <h2>Download</h2>
        <p>
          Get the installer from the <a href="/#download">download section</a> of this site, or from the
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
    slug: 'desktop',
    title: 'The desktop',
    lede: 'The wall, the dock, the command center, and where Settings lives.',
    mascot: 'post',
    body: (
      <>
        <h2>The wall</h2>
        <p>
          Glyphh opens on the wall: tiles for the agent, your tabs, your tools, and your workspaces. Open one and it
          covers the wall. The wall is one keystroke away the whole time.
        </p>
        <h2>The dock</h2>
        <p>The dock carries five tiles: New session, New tab, Command center, Settings, and Close all.</p>
        <h2>The command center</h2>
        <p>
          Press <code>⌘⇧Space</code> anywhere on your machine to bring Glyphh forward and open the command center.
          It is the fastest route to any panel, workspace, or tab by name.
        </p>
        <h2>Panels</h2>
        <p>
          Everything opens as a panel beside the agent. When the Glyphh agent is open, the next panel opens to its
          right, never underneath it. Drag headers to rearrange, drag edges to resize. A workspace remembers an
          arrangement so you can bring it back in one click.
        </p>
        <h2>Settings</h2>
        <p>Settings is a modal over the wall. Its groups:</p>
        <ul>
          <li><strong>Build</strong>: Skills, Artifacts, Connections, Plugins.</li>
          <li><strong>Customize</strong>: Tabs, Workspaces, Drips, Schedules.</li>
          <li><strong>Settings</strong>: General, Appearance, Usage, MCP Server.</li>
          <li><strong>Organization</strong>: Usage and Billing, for admins.</li>
          <li><strong>Help</strong>: Support.</li>
        </ul>
        <p>Your account, About, and Log out are in the account menu at the bottom of the rail.</p>
      </>
    ),
  },
  {
    slug: 'shortcuts',
    title: 'Keyboard and commands',
    lede: 'The global keys, the dot commands, and the slash menu.',
    mascot: 'byte',
    body: (
      <>
        <h2>Global keys</h2>
        <p>These work from anywhere on the system, even when Glyphh is behind another app.</p>
        <Row k="⌘⇧Space">Bring Glyphh forward and open the command center</Row>
        <Row k="⌘Y">Show or hide the app</Row>
        <Row k="⌘⇧.">Stop every playing drip effect</Row>
        <h2>In the app</h2>
        <Row k="⌘⇧N">New session</Row>
        <Row k="⌘W">Close the top panel. With nothing open, close the window</Row>
        <Row k="Shift+Tab">Cycle the agent&rsquo;s permission mode</Row>
        <Row k="Enter">Send. During a run, queue a note for the next turn</Row>
        <Row k="Esc">Close the current overlay. In a fullscreen Settings, the first Esc leaves fullscreen</Row>
        <h2>Dot commands</h2>
        <p>
          Dot commands work from the agent composer and from any input in any panel. The text is intercepted before
          the panel sees it.
        </p>
        <Row k=".dip <name>">Open a panel, workspace, tab, or URL by name. Matching is by substring</Row>
        <Row k=".dip split a b">Open each, side by side</Row>
        <Row k=".dip grid a b">Open each in an even grid</Row>
        <Row k=".dip add <url>">Open a URL as a panel</Row>
        <Row k=".dip close <name>">Close one panel</Row>
        <Row k=".dip clear">Close every panel</Row>
        <Row k=".dip list">What is open and which workspaces exist</Row>
        <Row k=".dip refresh">Reload the panel on top</Row>
        <Row k=".dip back">Back to the wall</Row>
        <Row k=".drip [name]">Play a full-screen effect. Bare is fireworks</Row>
        <Row k=".remember <fact>">Save a fact to the agent&rsquo;s persistent memory</Row>
        <Note kind="warn" title="Compaction rides the CLI">
          There is no <code>.compact</code>. The loop underneath owns its context. Open the Terminal view and use
          the CLI&rsquo;s own compact command.
        </Note>
        <h2>The slash menu</h2>
        <p>
          Type <code>/</code> at the start of a word in the composer and a picker opens with your enabled skills.
          Arrow keys move, Enter picks, and the skill&rsquo;s slug lands in the composer.
        </p>
      </>
    ),
  },
];

const agent = [
  {
    slug: 'sessions',
    title: 'Sessions and modes',
    lede: 'Chat, co-work, and code. How far the agent goes without you.',
    mascot: 'scout',
    body: (
      <>
        <h2>Three modes</h2>
        <p>
          A session is a chat, a co-work, or a code session. A layout with a dev panel opens as code. Everything
          else opens as co-work. The difference is which panels and tools sit beside the agent, not which model runs.
        </p>
        <h2>Permission modes</h2>
        <p>The mode chip in the composer decides what the agent may do on its own. <code>Shift+Tab</code> cycles it.</p>
        <Row k="ask">Every action waits for your approval</Row>
        <Row k="plan">Read-only. The agent outlines what it would do and runs nothing</Row>
        <Row k="acceptEdits">File edits run on their own. Commands still ask</Row>
        <Row k="auto">No gates. The agent acts and you watch the receipts</Row>
        <p>
          Each mode maps to the flag the loop underneath understands. Claude Code gets its permission mode, Codex
          its sandbox level, Gemini its approval mode. You pick once; the app translates.
        </p>
        <Note kind="note" title="Only Claude Code can ask mid-run">
          In ask mode, Claude Code stops and waits for you. The other loops do not support an interactive prompt,
          so ask behaves like plan for them.
        </Note>
        <h2>Talking while it works</h2>
        <p>
          Type during a run and Enter queues your message as a note on the turn. It sends as the next turn when the
          run ends.
        </p>
        <h2>Working folder</h2>
        <p>
          Every session is rooted in a folder. Files, Terminal, Diff, and Editor all point there. The source chip in
          the agent header changes it, and can connect GitHub to pick a repo.
        </p>
      </>
    ),
  },
  {
    slug: 'loops',
    title: 'Loops',
    lede: 'The coding CLIs Glyphh drives, and what changes when the gateway is on.',
    mascot: 'tally',
    body: (
      <>
        <p>
          A loop is a vendor CLI that Glyphh runs for you: Claude Code, Codex, Gemini, Copilot, or Cursor, plus a
          custom command of your own. The desktop is the harness. It owns the composer, the panels, the skills, and
          the connections. The loop is the engine that runs the turn.
        </p>
        <h2>What a loop carries</h2>
        <ul>
          <li>Which CLI to run and its starting model.</li>
          <li>Its working folder.</li>
          <li>Whether Glyphh&rsquo;s tools and connections are attached to it.</li>
          <li>A key of its own, if you want that loop to bill its own vendor account.</li>
        </ul>
        <h2>Capabilities differ</h2>
        <p>
          Each CLI declares what it can do: run headless, resume the last session, resume by id, take a model flag,
          speak MCP, and accept a base URL. The composer only offers what the current loop supports.
        </p>
        <Note kind="wire" title="Gateway on means two loops">
          When your organization routes through the Glyphh gateway, only Claude Code and Codex are offered. Gemini
          validates model names against Google&rsquo;s own list, and Copilot and Cursor have no base URL to point at
          the gateway. With the gateway on, the model is pinned to the first chat model in your org&rsquo;s roster.
        </Note>
        <h2>Bring your own key</h2>
        <p>
          Give a loop a key and a variable name, for example <code>GEMINI_API_KEY</code>, and that loop calls the
          vendor directly with it. A loop with its own key keeps it even when the gateway is on.
        </p>
      </>
    ),
  },
  {
    slug: 'models',
    title: 'Models',
    lede: 'Where the model list comes from and how the picker resolves.',
    mascot: 'sage',
    body: (
      <>
        <h2>The list is whatever the endpoint says</h2>
        <p>The model list has three sources, and the app never keeps its own:</p>
        <Row k="gateway">Your org&rsquo;s gateway, scoped by your minted key. You see the org&rsquo;s allow-list</Row>
        <Row k="byok">The vendor&rsquo;s endpoint, with the loop&rsquo;s own key</Row>
        <Row k="login">The CLI&rsquo;s own login. The configured model plus what its flag accepts</Row>
        <p>The list is cached for a minute. Each entry is the raw model id the CLI&rsquo;s model flag accepts.</p>
        <h2>The picker</h2>
        <p>
          The picker&rsquo;s shape comes from the loop. One model slot is one dropdown. Choices, the resolved
          default, and where each choice came from are decided on the server and shown as-is. Each choice carries
          its context window, output limit, and price per million tokens in dollars, the vendor&rsquo;s own rate on your keys.
        </p>
        <h2>On-device</h2>
        <p>
          The desktop does not run chat models locally. What runs on device is embeddings: the vector store embeds
          text with an on-device model and no key. Apps built on Glyphh get SQLite, vector search, and a knowledge
          graph without a model call.
        </p>
      </>
    ),
  },
  {
    slug: 'panels',
    title: 'Panels and tools',
    lede: 'Everything that can open beside the agent.',
    mascot: 'post',
    body: (
      <>
        <h2>Dev tools</h2>
        <Row k="Files">The working folder&rsquo;s tree</Row>
        <Row k="Editor">A Monaco editor over the tree</Row>
        <Row k="Terminal">A real shell in the working folder</Row>
        <Row k="Diff">What changed as the agent works</Row>
        <Row k="Browser">Tabs and an address bar. Desktop only</Row>
        <Row k="Plan">The agent&rsquo;s plan, live</Row>
        <Row k="Transcript">The full turn log</Row>
        <Row k="Scheduled Tasks">Every schedule and run</Row>
        <h2>Work panels</h2>
        <Row k="Slides">Decks the agent writes with you</Row>
        <Row k="Drive">Folders and pointers over your files</Row>
        <Row k="Design">Design documents and assets</Row>
        <Row k="Image · Video · Sounds">Generated media</Row>
        <h2>Apps and tabs</h2>
        <p>
          A tab is a web app opened as a live panel: signed-in sessions, notifications, everything. Dot commands
          typed into a tab drive the workspace without leaking into the page. A Glyphh app is a panel built on the
          Glyphh runtime with its own data store.
        </p>
        <Note kind="note" title="When a page does not load">
          A browser panel that fails shows one of the cast on this page with a plain reason: offline, not found,
          signed out, their server broke. The badge tells you whose fault it is.
        </Note>
      </>
    ),
  },
];

const build = [
  {
    slug: 'skills',
    title: 'Skills',
    lede: 'A folder with a SKILL.md at its root. Read by every loop.',
    mascot: 'byte',
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
          member&rsquo;s lands in review. See <a href="/docs/hub">the org hub</a>.
        </Note>
      </>
    ),
  },
  {
    slug: 'tasks',
    title: 'Tasks and schedules',
    lede: 'A program the desktop runs on a clock, with a checkpoint journal.',
    mascot: 'tally',
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
    slug: 'artifacts',
    title: 'Artifacts and tabs',
    lede: 'Files the agent makes for you, and the web apps you keep as panels.',
    mascot: 'post',
    body: (
      <>
        <h2>Artifacts</h2>
        <p>
          An artifact is a file the agent produced for you: code, text, markdown, an image, a PDF. They sit in a
          folder under your Glyphh home, and the folder is the index. Nothing else to sync. Build &rarr; Artifacts
          shows them as a grid with previews or as a table.
        </p>
        <p>
          <strong>New artifact</strong> opens the default agent with a prompt already typed and not yet sent. Say
          what you want and send.
        </p>
        <h2>Tabs</h2>
        <p>
          A tab is a web app you keep: a name, a URL, an icon. It opens as a live panel beside the agent with its
          own signed-in session. The registry is local, one folder per tab.
        </p>
        <p>
          <strong>New tab</strong> in the dock opens Customize &rarr; Tabs with the add form. Right-click a page in
          the Browser panel to save it as a tab.
        </p>
      </>
    ),
  },
  {
    slug: 'hub',
    title: 'The org hub',
    lede: 'Publish, review, approve. What runs on every desktop is what the org signed off on.',
    mascot: 'sage',
    body: (
      <>
        <p>
          The hub is where an organization shares skills, apps, tasks, and plugins. It lives in the console under AI
          Hub, and Discover in the desktop reads from it.
        </p>
        <h2>Publishing</h2>
        <ol>
          <li>A member publishes a bundle from its page. The bundle is capped at 1 MiB.</li>
          <li>If the publisher is an org admin, the version goes live at once.</li>
          <li>If the publisher is a member, the version lands in <strong>pending</strong> and appears on the admin&rsquo;s review desk.</li>
          <li>An admin approves or rejects. Approved versions are mirrored to the gateway so every desktop can install them.</li>
        </ol>
        <p>A member sees the status of their own submissions on the AI Hub page in the console.</p>
        <h2>The review model</h2>
        <p>
          An admin can set a review model under Settings &rarr; Organization. Every pending version is read by that
          model, which files a verdict beside the submission. The admin still decides.
        </p>
        <h2>Categories</h2>
        <p>
          Bundles are classified into one of twenty categories from their name, description, and keywords, so the
          hub can be browsed by what a thing does.
        </p>
        <Note kind="admin" title="The public catalog is a separate lane">
          An org can submit a bundle to the Glyphh public catalog. That queue is reviewed by Glyphh, and a
          submission can be withdrawn at any time before a decision.
        </Note>
      </>
    ),
  },
];

const connect = [
  {
    slug: 'connections',
    title: 'Connections',
    lede: '3,500+ services as tools, with org-shared or personal auth.',
    mascot: 'post',
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
    mascot: 'byte',
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
    title: 'The gateway',
    lede: 'How a loop gets routed through your org, and what the app writes to make it happen.',
    mascot: 'tally',
    body: (
      <>
        <p>
          When your organization turns the gateway on, Claude Code and Codex call your org&rsquo;s endpoint instead
          of the vendor. The org&rsquo;s roles, budgets, and allow-lists apply, and every token is accounted for
          in the console.
        </p>
        <h2>What the app does</h2>
        <ol>
          <li>It asks the server for a member key. The key is minted once per user and reused.</li>
          <li>It writes that key and the gateway base URL into an env file for each loop, readable only by you.</li>
          <li>It sources that file when it launches the CLI. Nothing is typed into a visible terminal, nothing lands in the CLI&rsquo;s own config.</li>
        </ol>
        <Row k="Claude Code">ANTHROPIC_BASE_URL and ANTHROPIC_AUTH_TOKEN</Row>
        <Row k="Codex">OPENAI_BASE_URL and OPENAI_API_KEY</Row>
        <Row k="Gemini">GOOGLE_GEMINI_BASE_URL and GEMINI_API_KEY, when the gateway is off</Row>
        <p>
          The file is rewritten whole on every launch, so a stale base URL cannot linger. A loop with its own key
          keeps it. Log out and every variable is removed from every loop.
        </p>
        <h2>Gateway off</h2>
        <p>
          When the gateway is off, the member key still authenticates your MCP access, and the CLI rides its own
          login or the loop&rsquo;s own key.
        </p>
        <h2>Turn it on, step by step</h2>
        <ol>
          <li>In the console, open <strong>Settings &rarr; Organization</strong> and switch <strong>Gateway lane</strong> on. Paid plans only.</li>
          <li>On the desktop, nothing. Within a minute every member&rsquo;s Claude Code and Codex loops route through the org. A restart makes it immediate.</li>
          <li>Send a turn and watch it land on the console&rsquo;s <strong>Logs</strong> page.</li>
        </ol>
        <p>
          For a CLI outside the desktop, see <a href="/docs/own-cli">Use your own CLI</a>.
        </p>
        <h2>Two ways to route</h2>
        <Row k="Burn down">Each vendor stays direct while its own allowance lasts. When it runs dry, that vendor&rsquo;s traffic moves onto the proxy, on the org&rsquo;s own keys at the vendor&rsquo;s price</Row>
        <Row k="Reserved">The vendor&rsquo;s heavy models, Opus and Fable, stay on the member&rsquo;s own subscription, with that spend tracked off the proxy. Everything lighter rides the proxy</Row>
        <Note kind="note" title="Cached tokens count">
          Through the proxy, cache reads and writes are priced at the vendor&rsquo;s cache rates. Off the proxy, the
          desktop reports them too, so the allowance counts them.
        </Note>
      </>
    ),
  },
  {
    slug: 'own-cli',
    title: 'Use your own CLI',
    lede: 'Point a plain Claude Code or Codex install at the gateway from a terminal.',
    mascot: 'byte',
    body: (
      <>
        <p>
          You do not need the desktop to use the gateway. Mint a virtual key on the console&rsquo;s Virtual Keys
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
          gateway enforces that at the edge. Your code just makes requests.
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
          Add the gateway&rsquo;s MCP endpoint to Claude Code, Codex, Cursor, or claude.ai with your virtual
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
          An agent your admin registered on the console&rsquo;s Agents page is a model on the gateway. Send a
          chat request with <strong>model: a2a/&lt;name&gt;</strong> and the gateway forwards it over A2A. The
          name is on the agent&rsquo;s hub page.
        </p>
      </>
    ),
  },
  {
    slug: 'budgets',
    title: 'Budgets and limits',
    lede: 'Every org has a ceiling. Roles narrow it from there.',
    mascot: 'sage',
    body: (
      <>
        <h2>Two budgets, two units never mixed</h2>
        <p>
          Your organization&rsquo;s spend budget on the gateway is yours: set it in dollars on the organization, a
          team or a key, and it caps what your own vendor keys may spend. Glyphh never writes it.
        </p>
        <p>
          The budget is what Glyphh funds: your plan&rsquo;s price each month, dollar for dollar, never
          less than one dollar, plus any funds you add. Connector calls draw on it and stop when it runs out.
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

const console_ = [
  {
    slug: 'console',
    title: 'The console',
    lede: 'The web console at api.glyphh.ai/ui. What each role sees.',
    mascot: 'tally',
    body: (
      <>
        <p>
          The console is the organization&rsquo;s control room. Sign in with the same account as the desktop.
        </p>
        <h2>A member sees six pages</h2>
        <Row k="Dashboard">Usage by day, MCP and model lanes</Row>
        <Row k="Downloads">The desktop installers</Row>
        <Row k="Virtual Keys">Their own keys</Row>
        <Row k="AI Hub">The org catalog, and the status of their submissions</Row>
        <Row k="Usage">Their spend</Row>
        <Row k="Logs">Their requests</Row>
        <h2>An org admin also gets</h2>
        <Row k="Billing">Plan, seats, budget, invoices, the next invoice amount and date</Row>
        <Row k="Models">Which models the org supports and any BYOK keys</Row>
        <Row k="Teams · Internal Users">Membership, invites, roles</Row>
        <Row k="Loops · MCP Servers">Org-shared loops and MCP connections</Row>
        <Row k="Settings">Organization, Domain, Security, Router, Logging</Row>
        <Note kind="admin" title="Plans is super-admin only">
          The Plans page under Settings edits the plan catalog for every org. Only a Glyphh platform admin sees it.
        </Note>
      </>
    ),
  },
  {
    slug: 'ai-hub',
    title: 'AI Hub and branding',
    lede: 'The org catalog, on your own domain, in your colors.',
    mascot: 'post',
    body: (
      <>
        <h2>The external hub</h2>
        <p>
          The AI Hub is a page the org can publish outside the console: its models, its skills, and its apps, in
          the shape of the desktop&rsquo;s Discover page. Settings &rarr; Domain serves it on
          <code> &lt;org&gt;.glyphh.app</code> with no DNS, or on <code>hub.&lt;yourdomain&gt;</code> with one
          CNAME. It is always private to the org, and it can require the org&rsquo;s SSO.
        </p>
        <h2>Branding</h2>
        <p>
          From the AI Hub page, <strong>Brand</strong> sets the logo and the theme. The theme is light or dark,
          chosen by the org, not the viewer. The hub reads it on every load.
        </p>
        <h2>Domain check</h2>
        <p>
          The Domain page checks two things and shows both: whether the name resolves, and whether it resolves to
          Glyphh. Internal and private addresses are refused.
        </p>
      </>
    ),
  },
  {
    slug: 'plans',
    title: 'Plans and pricing',
    lede: 'What each tier includes, and what the budget pays for.',
    mascot: 'sage',
    body: (
      <>
        <h2>Tiers</h2>
        <div className="dx-table">
          <table>
            <thead><tr><th>Tier</th><th>Price</th><th>Monthly budget</th><th>Seats</th><th>Governance</th><th>SSO</th></tr></thead>
            <tbody>
              <tr><td>Free</td><td>$0</td><td>$1</td><td>1</td><td>no</td><td>no</td></tr>
              <tr><td>Basic</td><td>$40 / seat / month</td><td>$40 / seat</td><td>up to 25</td><td>no</td><td>no</td></tr>
              <tr><td>Pro</td><td>$150 / seat / month</td><td>$150 / seat</td><td>up to 100</td><td>roles and budgets</td><td>no</td></tr>
              <tr><td>Enterprise</td><td>custom</td><td>custom</td><td>unlimited</td><td>yes</td><td>yes</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The live catalog is served from the same table the console edits, so this site&rsquo;s
          <a href="/pricing"> pricing page</a> and the desktop&rsquo;s Billing page always agree.
        </p>
        <h2>Budget</h2>
        <p>
          Plans are dollars per month, dollar for dollar: a paid plan includes its price as budget, per seat, every
          month, and Free includes one dollar. Every Glyphh product draws on that one budget. Today it pays for
          connector calls, metered on the tokens each call sends and returns at a published per-token price, the
          same way a model is priced. Plan-included budget resets each month.
        </p>
        <p>
          Your own model calls are not on the budget. They run on your keys at the vendor&rsquo;s price, shown per
          million tokens in the picker, and Glyphh never marks them up.
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
    slug: 'seats',
    title: 'Seats and invoices',
    lede: 'Adding a seat bills now. Removing one drops at the next cycle.',
    mascot: 'tally',
    body: (
      <>
        <p>
          The subscription&rsquo;s quantity is the org&rsquo;s active seat count, re-synced on every membership
          change.
        </p>
        <ul>
          <li><strong>Invite someone</strong> and the quantity goes up now, prorated onto the next invoice.</li>
          <li><strong>Remove someone</strong> and the quantity drops when the next invoice is created. There is no refund for the rest of the cycle.</li>
          <li>The billing date never moves.</li>
        </ul>
        <h2>The next invoice</h2>
        <p>
          The Billing page shows the next invoice&rsquo;s amount and date, read from a preview of the upcoming
          invoice. Proration lines are marked as such.
        </p>
        <Note kind="admin" title="Billing is an admin page">
          Only an org admin sees Billing. Members see their own usage.
        </Note>
      </>
    ),
  },
  {
    slug: 'security',
    title: 'Sign-in and security',
    lede: 'Magic link, Google, SSO, device flow. What the server refuses.',
    mascot: 'patch',
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
          <li>A gateway request for another org.</li>
        </ul>
        <h2>Sessions</h2>
        <p>
          Sessions are short-lived and refreshed under the hood. Logging out signs out this device and no other.
        </p>
        <h2>On your machine</h2>
        <ul>
          <li>Gateway credentials live in an env file only you can read, and are removed at logout.</li>
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


const admin = [
  {
    slug: 'org-settings',
    title: 'Organization settings',
    lede: 'The five switches that shape how your org uses Glyphh.',
    mascot: 'tally',
    body: (
      <>
        <p>In the console, open <strong>Settings &rarr; Organization</strong>. Every row saves as you change it.</p>
        <Row k="Governance">On: the servers on the MCP Servers page are the only apps members may connect. Off: members connect any app for themselves. Pro and Enterprise</Row>
        <Row k="Gateway lane">On: members&rsquo; Claude Code and Codex traffic routes through the org, on the org&rsquo;s own keys and capped by budgets. Paid plans</Row>
        <Row k="Auto only">On: members pick no model. Every turn goes to the org&rsquo;s auto-router</Row>
        <Row k="Terminal access">Off: members cannot drop from the chat into the loop&rsquo;s own CLI</Row>
        <Row k="Review model">The model that reads every submission to the hub and files a verdict for you</Row>
        <Note kind="admin" title="Who sees this page">
          Org admins and platform admins. A member never sees Settings.
        </Note>
      </>
    ),
  },
  {
    slug: 'domain',
    title: 'Your hub on your domain',
    lede: 'Serve the AI Hub on the org subdomain, or on a host you own with one CNAME.',
    mascot: 'post',
    body: (
      <>
        <p>
          Your hub is already live on your org&rsquo;s Glyphh subdomain with nothing to set up. To serve it on a
          host you own, such as <code>hub.yourcompany.com</code>:
        </p>
        <ol>
          <li>Open <strong>Settings &rarr; Domain</strong>.</li>
          <li>Switch <strong>Hub on your own domain</strong> on and type the host.</li>
          <li>Add the CNAME the page shows at your DNS provider. The steps listed on the page name the exact record.</li>
          <li>Press <strong>Check status</strong>. It tells you two things: whether the name resolves, and whether it resolves to Glyphh.</li>
        </ol>
        <p>
          To require your identity provider on the hub, set up <a href="/docs/sso">single sign-on</a> first, then
          turn on <strong>Require single sign-on</strong> on the same page. The hub is always private to the org.
        </p>
        <Note kind="warn" title="Private addresses are refused">
          The check rejects internal and private hosts. Use a public name.
        </Note>
      </>
    ),
  },
  {
    slug: 'brand',
    title: 'Brand the hub',
    lede: 'Your logo, your accent, light or dark.',
    mascot: 'byte',
    body: (
      <>
        <ol>
          <li>Open <strong>AI Hub</strong> in the console.</li>
          <li>Press <strong>Brand this hub</strong>.</li>
          <li>Upload the logo, pick the accent color, and choose <strong>Light</strong> or <strong>Dark</strong>. The theme is the org&rsquo;s choice. Every visitor gets it.</li>
          <li>Save. Clear a field to go back to the default.</li>
        </ol>
        <p>The hub reads the brand on every load, so the change is live at once, on the console&rsquo;s hub URL and on your own domain.</p>
      </>
    ),
  },
  {
    slug: 'sso',
    title: 'Single sign-on',
    lede: 'Connect your identity provider and, if you want, make it the only way in.',
    mascot: 'tally',
    body: (
      <>
        <p>Glyphh signs in through any OpenID Connect provider: Okta, Entra, Google Workspace, and the rest.</p>
        <ol>
          <li>In your provider, create an OpenID Connect application with this redirect URL: <code>https://api.glyphh.ai/api/auth/sso/callback</code></li>
          <li>Open <strong>Settings &rarr; Security</strong>.</li>
          <li><strong>Issuer URL</strong>: the provider&rsquo;s base URL, for example <code>https://yourcompany.okta.com</code>. Glyphh reads its discovery document from there.</li>
          <li><strong>Client ID</strong> and <strong>Client secret</strong> from the application you created. The secret is never shown again. Leave it blank later to keep it.</li>
          <li><strong>Email domains</strong>: the domains your people sign in with, comma separated.</li>
          <li>Save. The page reports whether your provider answered.</li>
          <li>Sign in once yourself through the provider. Then switch <strong>Require single sign-on</strong> on. From then on, magic links are refused for your domains.</li>
        </ol>
        <Note kind="admin" title="Enterprise plan">
          SSO is an Enterprise feature. Sign in as an org admin to see the page.
        </Note>
      </>
    ),
  },
  {
    slug: 'review',
    title: 'Review and approve',
    lede: 'What a member publishes waits for you. What you publish goes live.',
    mascot: 'sage',
    body: (
      <>
        <p>Open <strong>AI Hub</strong> in the console. Three lists:</p>
        <Row k="Your organization">Everything live on the org hub, with installs and version</Row>
        <Row k="Your submissions">What you sent up yourself, and its status</Row>
        <Row k="Publish to Glyphh">Items you have offered to the public Glyphh catalog</Row>
        <h2>Approving a submission</h2>
        <ol>
          <li>A pending item shows at the top of the org list. Press <strong>Review</strong>.</li>
          <li>The review opens with the same tabs the desktop shows a bundle: Overview, Contents, Skills, and Connections for an app, plus <strong>Agent review</strong> if a review model is set. The agent&rsquo;s verdict is advice. You decide.</li>
          <li>Press <strong>Approve</strong> or <strong>Reject</strong>. An approved version is mirrored to the gateway and every desktop can install it.</li>
        </ol>
        <h2>Who can see an item</h2>
        <p>
          On any item, <strong>Everyone in the organization</strong> is the default. Turn it off to name specific
          members. Under governance, members only see what you allow.
        </p>
        <h2>Categories</h2>
        <p>
          <strong>Categories</strong> on an item corrects the shelves it sits on. <strong>Add a category</strong> makes
          one of your own. Keywords help the hub file new shares automatically.
        </p>
        <h2>Offering something to Glyphh</h2>
        <p>
          <strong>Publish to Glyphh</strong> sends an item to the public catalog queue. Glyphh reviews it. <strong>Withdraw
          from Glyphh</strong> takes it back at any time before a decision.
        </p>
      </>
    ),
  },
  {
    slug: 'org-models',
    title: 'Models and keys',
    lede: 'Pick what the org may use of Glyphh&rsquo;s models, or run your own deployment on your own key.',
    mascot: 'sage',
    body: (
      <>
        <p>Open <strong>Models</strong> in the console. As an org admin the page is scoped to your org.</p>
        <h2>Glyphh models</h2>
        <p>
          The <strong>Glyphh models</strong> tab lists what Glyphh runs. Turn on what your org may use. That
          list is what members see in the desktop&rsquo;s picker and what the gateway allows on their keys.
        </p>
        <h2>Your own deployment</h2>
        <ol>
          <li>Press <strong>Add model</strong>.</li>
          <li>Pick the provider and the model, and paste your provider key. The key is stored encrypted and scoped to your org&rsquo;s team. No other org can see or ride it.</li>
          <li>Save. Calls to that model use your key and are invoiced to you by the vendor. They still count in the org&rsquo;s usage and logs.</li>
        </ol>
        <h2>The auto-router</h2>
        <p>
          <strong>Auto-routers</strong> lets you define a route that picks the model per request. Turn on
          <strong> Auto only</strong> in Organization settings and members pick nothing else.
        </p>
        <Note kind="warn" title="Keys stay in the console">
          A provider key is entered here and nowhere else. No agent, tool, or skill can read it back.
        </Note>
      </>
    ),
  },
  {
    slug: 'mcp-servers',
    title: 'MCP servers and connections',
    lede: 'The servers the org shares, and the connections every member gets.',
    mascot: 'post',
    body: (
      <>
        <h2>An MCP server for the org</h2>
        <ol>
          <li>Open <strong>MCP Servers</strong> in the console and add one.</li>
          <li>Name it, paste the URL, and pick the transport.</li>
          <li>Under <strong>Authentication</strong>, choose the server&rsquo;s auth. OAuth servers walk each member through their own sign-in the first time.</li>
          <li>Save. The server&rsquo;s tools join every member&rsquo;s toolkit.</li>
        </ol>
        <h2>Org-shared connections</h2>
        <p>
          On the desktop&rsquo;s Connections page, an org admin connects a service as <strong>org</strong>: one shared
          account every member can use without doing their own auth. A member connects the same service as
          <strong> personal</strong> for their own account.
        </p>
        <h2>Governance</h2>
        <p>
          With <strong>Governance</strong> on in Organization settings, the servers on this page are the only apps
          members may connect, and the desktop&rsquo;s picker shows just those.
        </p>
      </>
    ),
  },
  {
    slug: 'org-agents',
    title: 'Agents',
    lede: 'Register the agents your organization runs. Members find them on the hub and call them as models.',
    mascot: 'byte',
    body: (
      <>
        <ol>
          <li>Open <strong>Agents</strong> in the console and press <strong>Add agent</strong>.</li>
          <li>Name it and paste its A2A endpoint. If the agent publishes a card at <strong>/.well-known/agent-card.json</strong>, the description, version and skills come from there.</li>
          <li>If the endpoint needs a header, set the header name and value. It is stored on the gateway and never shown again.</li>
          <li>Save. The agent is on the AI Hub for every member, with the model id <strong>a2a/&lt;org&gt;-&lt;name&gt;</strong>.</li>
        </ol>
        <p>
          A member calls it like any other model through the gateway, from the desktop or from their own
          tools. Only your organization&rsquo;s keys can see it or reach it. Remove it from the same page.
        </p>
        <Note kind="note" title="One name space">
          Agent names are global on the gateway, so yours are prefixed with your organization. Two orgs can each
          have a <strong>sales-bot</strong>.
        </Note>
      </>
    ),
  },
  {
    slug: 'billing-admin',
    title: 'Billing',
    lede: 'Plan, seats, budget, invoices, and the card on file.',
    mascot: 'tally',
    body: (
      <>
        <p>Open <strong>Billing</strong> in the console. Org admins only.</p>
        <Row k="Current plan">Your tier, seats in use, and the next invoice&rsquo;s amount and date</Row>
        <Row k="Budget">What the org holds this month, what it has spent, and what remains, in dollars</Row>
        <Row k="Add funds">Add dollars now, dollar for dollar. Purchased funds never expire</Row>
        <Row k="Auto-reload">Press <strong>Configure</strong>: a threshold and an amount, in dollars. When the remaining budget falls below the threshold, the card on file is charged and the funds land at once</Row>
        <Row k="Invoices">Every invoice, with proration lines marked</Row>
        <Row k="Manage in Stripe">The card, the billing address, and receipts, on Stripe&rsquo;s portal</Row>
        <Row k="Sync with Stripe">If a seat count or a plan looks stale, this re-reads the subscription</Row>
        <p>
          Adding a member raises the seat count now and prorates onto the next invoice. Removing one drops it at the
          next cycle. See <a href="/docs/seats">seats and invoices</a>.
        </p>
      </>
    ),
  },
];

const about = [
  {
    slug: 'the-cast',
    title: 'The cast',
    lede: 'The six cousins of the Glyphh mark, and where each one turns up.',
    mascot: 'scout',
    body: (
      <>
        <p>
          The Glyphh mark is a one-eyed alien. These six are its cousins. They front the desktop&rsquo;s
          error pages, so each one means something when you meet it, and they front the callouts in
          these docs the same way.
        </p>
        <Cast size={72} />
        <h2>Who does what</h2>
        <Row k="Scout">Not found. A page, a file, a name that does not resolve. Also the plain note in these docs</Row>
        <Row k="Byte">Certificates, embedding refused, and anything for developers</Row>
        <Row k="Post">Connection trouble: offline, refused, a bad gateway, a desktop that is not connected</Row>
        <Row k="Patch">Something broke: a server error, a panel that did not load, a warning worth reading</Row>
        <Row k="Sage">Waiting: timeouts, too many requests, and the tips in these docs</Row>
        <Row k="Tally">Locked: sign-in required, forbidden, admin only</Row>
      </>
    ),
  },
  {
    slug: 'built-on',
    title: 'Built on',
    lede: 'What Glyphh is built on, named plainly, and what Glyphh adds on top.',
    mascot: 'sage',
    body: (
      <>
        <p>
          Glyphh is built on open source and on partners we name. Nothing here is hidden, and nothing
          here is the product. The product is the layer on top: the desktop, the loops, the skills, the
          org model, the hub, and the governance.
        </p>
        <h2>LiteLLM</h2>
        <p>
          The router is a fork of <a href="https://github.com/BerriAI/litellm">LiteLLM</a>, the
          OpenAI-compatible proxy. It provides the endpoint, the model catalog, virtual keys, teams,
          budgets, and the spend logs. Glyphh adds organizations, sign-in, the hub, billing, plans,
          and the desktop&rsquo;s gateway path. The fork is private. The upstream
          core is used under the MIT license, copyright 2023 Berri AI, and the license text ships with
          the software. For settings we did not change, such as the config file syntax and the
          per-model parameters, the <a href="https://docs.litellm.ai">upstream reference</a> is the
          source of truth. It describes LiteLLM, not Glyphh, so use it for those settings only.
        </p>
        <h2>Pipedream Connect</h2>
        <p>
          Connections run on <a href="https://pipedream.com/connect">Pipedream Connect</a>: the OAuth
          flows and the tool surface for 3,500+ services. Glyphh holds the org&rsquo;s connections,
          decides org-shared versus personal, and governs which tools may run and when.
        </p>
        <h2>Stripe</h2>
        <p>Subscriptions, seats, invoices, and added funds are billed through Stripe.</p>
        <h2>The vendor CLIs</h2>
        <p>
          Claude Code, Codex, Gemini, Copilot, and Cursor are their vendors&rsquo; own tools. Glyphh
          runs them and does not modify them.
        </p>
        <Note kind="note" title="The same answer everywhere">
          The console&rsquo;s About page reads the same feed as this page, with the build you are running on.
        </Note>
      </>
    ),
  },
];

export const GROUPS = [
  { title: 'Start here', lede: 'Install, the desktop, and the keys worth learning on day one.', pages: start },
  { title: 'The agent', lede: 'Sessions, the loops underneath, models, and panels.', pages: agent },
  { title: 'Build', lede: 'Skills, tasks, artifacts, and the org hub.', pages: build },
  { title: 'Connect', lede: 'Connections and MCP, both directions.', pages: connect },
  { title: 'The gateway', lede: 'Routing, your own CLI, budgets.', pages: router },
  { title: 'Console and billing', lede: 'Roles, the hub, plans, seats, security.', pages: console_ },
  { title: 'Org admin', lede: 'Step by step: the domain, the brand, SSO, review, models, MCP servers, agents, billing.', pages: admin },
  { title: 'About', lede: 'What Glyphh is built on.', pages: about },
];

export const PAGES = GROUPS.flatMap((g) => g.pages);
