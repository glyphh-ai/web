import { Note, Row, Code, Shot } from './ui';
import { DOCS } from './base';

// The docs, kept short. Each page is written from the source; when the product
// changes, the page changes in the same push.

const desktop = [
  {
    slug: 'install',
    title: 'Sign in and install',
    lede: 'One account for the web app, the desktop and the console.',
    body: (
      <>
        <h2>Sign in on the web</h2>
        <p>
          Open <a href="https://app.glyphh.ai">app.glyphh.ai</a>. Sign in with your email and the magic link it
          sends, or with Google. That lands you in the command center: the same app the desktop runs.
        </p>
        <Shot file="sign-in.png" alt="The sign-in page at app.glyphh.ai: Continue with Google, or an email address for a magic link." width={760} caption="app.glyphh.ai. A magic link to your email, or Google." />
        <p>
          The first person from a new email domain gets a new organization. Everyone invited after that joins
          it. An organization that requires SSO refuses magic links for its domain.
        </p>
        <h2>Install the desktop</h2>
        <p>
          The desktop runs sessions on your own machine, in your own folders. Get it from the{' '}
          <a href="https://glyphh.ai/#quick-start">download section</a> of glyphh.ai, or from the card on the
          sign-in page. macOS, Windows and Linux.
        </p>
        <p>
          The desktop signs in with a device flow. It opens your browser on the sign-in page, you approve the
          device, and the app picks up the session. It is the same account as the web app, so your sessions,
          skills and settings are the same in both.
        </p>
        <p>Sign in once and stay signed in. Log out from the account menu and this device is signed out.</p>
        <h2>The console</h2>
        <p>
          Your organization is run from the console at{' '}
          <a href="https://platform.glyphh.ai">platform.glyphh.ai</a>: members, teams, models, budgets and
          billing. Open it from <strong>Settings &rarr; Platform</strong> in the app.
        </p>
        <h2>Updates</h2>
        <p>
          When a new desktop version is ready, a dot appears next to <strong>About</strong> in the account menu.
          Open About to install it. It never installs while you are working. The web app is always current.
        </p>
        <p>Next: <a href={`${DOCS}/where-a-session-works`}>where a session works</a>.</p>
      </>
    ),
  },
  {
    slug: 'where-a-session-works',
    title: 'Where a session works',
    lede: 'Every session has a place: a folder on a desktop, or a folder in the cloud.',
    body: (
      <>
        <p>
          A session works in one folder. The folder chip on the composer names it. Click the chip and the
          menu <strong>Where this session works</strong> opens.
        </p>
        <Shot file="session-place.png" alt="The folder chip's menu, titled Where this session works: a section for the attached desktop with its granted folders, and a section for the cloud with cloud folders and New cloud folder." width={340} caption="The folder chip. One section per place." />
        <h2>The places</h2>
        <Row k="On this desktop">A folder on the machine you are sitting at. The desktop app only</Row>
        <Row k="On <your machine>">A folder on your desktop, reached from the web over remote control. The desktop lists the folders it granted</Row>
        <Row k="In the cloud">A cloud folder: a workspace on a Glyphh worker, kept in your organization&rsquo;s storage. <strong>New cloud folder</strong> makes a fresh one</Row>
        <p>
          A desktop folder that is not granted shows a lock. Opening a session there shows a grant card instead
          of running: grant the folder on the desktop under <strong>Settings &rarr; Remote control</strong> and
          try again. See <a href={`${DOCS}/devices`}>Devices and remote control</a>.
        </p>
        <h2>The default</h2>
        <p>
          With a desktop attached, a new session starts in a folder on it: your last pick when it is still
          granted, else your most recent folder, else the first granted one. With no desktop attached, a new
          session starts in the cloud.
        </p>
        <h2>A place is fixed at birth</h2>
        <p>
          A session&rsquo;s place is set by its first turn and never changes. A cloud session stays in the
          cloud. A desktop session stays on that desktop. The menu still lists the other place, but its rows say
          why they cannot be picked.
        </p>
        <h2>In the rail</h2>
        <p>
          Recents groups cloud sessions under one <strong>Cloud</strong> heading and desktop sessions by folder.
          The glyph at the start of a row says where it runs: a monitor for a desktop, a cloud for the cloud.
        </p>
        <Shot file="rail-recents.png" alt="The Recents list: a Cloud heading with one session, then two folder headings, web and sdk, each with a desktop session." width={275} caption="Recents: one Cloud group, then one group per desktop folder." />
        <p>
          The funnel beside the search box filters by loop and by place: <strong>All places</strong>,{' '}
          <strong>This desktop</strong>, or <strong>Cloud</strong>. The same filter runs in the agent
          panel&rsquo;s recents menu.
        </p>
        <Shot file="recents-filter.png" alt="The recents filter menu: All loops with the loops beneath it, then All places, This desktop and Cloud." width={460} caption="The recents filter: a loop, and a place." />
        <Note kind="note" title="Terminals follow the place">
          A cloud session&rsquo;s terminals and CLIs run on its worker. A desktop session&rsquo;s run on that
          desktop. See <a href={`${DOCS}/cloud-terminals`}>Terminals and the CLIs in the cloud</a>.
        </Note>
      </>
    ),
  },
  {
    slug: 'pick-a-model',
    title: 'Pick a model',
    lede: 'The model chip on the composer, and the effort dial beside it.',
    body: (
      <>
        <p>
          The chip reads <strong>Model: Default &middot; &lt;name&gt;</strong>. Click it and the models your
          team allows are listed. Pick one and every turn of the session runs on it.
        </p>
        <Shot file="model-picker.png" alt="The model menu over the composer: a search box, Default with a check, then claude-sonnet-4-5, gemini-2.5-pro and gpt-5 with their providers." width={410} caption="The model chip. Default is your team's model." />
        <h2>What Default means</h2>
        <p>
          Default is the model your team is flagged to. Without a team flag it is the organization&rsquo;s
          default. Your admin sets both on the console&rsquo;s Models page. Pick a model yourself under{' '}
          <strong>Settings &rarr; General &rarr; Default model</strong> and a new session opens on that instead.
        </p>
        <h2>Who sees what</h2>
        <p>
          The list is what your team allows. A team with no list of its own sees every model the organization
          approved. On the Free plan the list is the models Glyphh flags for Free.
        </p>
        <h2>Effort</h2>
        <p>
          The chip beside the model is the effort dial, from <strong>Low</strong> to <strong>Ultra</strong>.
          Higher effort means more thorough answers, but takes longer and uses your budget faster. It is one
          preference for every turn, sent to the model as its reasoning effort. The chip dims when the model on
          the chip takes one effort only.
        </p>
        <Shot file="effort.png" alt="The effort dial open over the composer: Effort Medium, a slider from Faster to Smarter." width={315} caption="The effort dial. Medium is the default." />
        <h2>What it costs</h2>
        <p>
          Every turn is a model call paid from your organization&rsquo;s budget at your plan&rsquo;s rate for
          that model. See <a href={`${DOCS}/gateway`}>The Router</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'work-and-code',
    title: 'Work and Code',
    lede: 'Two kinds of session. One agent loop.',
    body: (
      <>
        <p>
          Glyphh runs one agent loop: the same engine in the desktop, on the web and in the{' '}
          <a href={`${DOCS}/cli`}>glyphh CLI</a>. It speaks the Messages API and MCP, calls every model through
          your organization&rsquo;s <a href={`${DOCS}/gateway`}>Router</a>, and runs any model your team allows.
          The switch at the top of the rail picks the kind of session.
        </p>
        <Row k="Work">The model, your tools and your memory. Connections, apps and Glyphh&rsquo;s own tools. No files, no shell</Row>
        <Row k="Code">Everything in Work, plus a folder: files, terminals and the CLIs, confined to the folder the session works in</Row>
        <p>A session is born one kind and stays it: its transcript was written with that toolbelt.</p>
        <Shot file="composer.png" alt="The composer: the folder chip reading web, No git, the prompt field Describe what to build or fix, Ask mode, the model chip and the effort chip." width={890} caption="The Code composer. The folder, the prompt, the model, the effort." />
        <h2>The folder is the sandbox</h2>
        <p>
          A Code session works in one folder and nowhere else. File tools refuse any path outside it, reads
          included. On macOS the shell runs under the system sandbox with writes allowed only inside that folder,
          temp space and package caches. In the cloud the folder is the worker&rsquo;s workspace.
        </p>
        <h2>Sub-agents</h2>
        <p>
          The agent can hand work to sub-agents you define under <strong>Settings &rarr; Build &rarr; Agents</strong>:
          a name, a brief and a model of their own. They run the same loop in parallel and report back. The
          Agents panel shows each one working.
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
    slug: 'cloud-terminals',
    title: 'Terminals and the CLIs in the cloud',
    lede: 'A cloud session has a shell. It runs on the worker, in the session’s folder.',
    body: (
      <>
        <h2>The terminal</h2>
        <p>
          Open the Terminal tile on a cloud session and you get a shell on the session&rsquo;s worker, in its
          cloud folder. Tabs, resize and close work as they do for a local shell. On a desktop session the
          terminal is that desktop&rsquo;s shell, reached over remote control from the web.
        </p>
        <h2>The CLIs</h2>
        <p>The CLI tiles run on the worker too:</p>
        <Row k="Claude Code">claude</Row>
        <Row k="Codex">codex</Row>
        <Row k="Gemini">gemini</Row>
        <Row k="Copilot">copilot</Row>
        <Row k="Cursor">cursor-agent</Row>
        <Row k="Glyphh CLI">glyphh</Row>
        <p>
          Each one calls its models through your organization&rsquo;s Router on your own key, so the turns are
          paid from the same budget and show in the same logs. Your skills are there, and the Glyphh tools are
          there.
        </p>
        <Note kind="note" title="The honest card">
          When there is nothing to run on, signed out, no worker, no desktop, the tile says so in one line
          and offers a retry. It never pretends.
        </Note>
      </>
    ),
  },
  {
    slug: 'streamed-panels',
    title: 'Streamed panels',
    lede: 'On the web, a URL panel can be a real browser streamed from a worker. Off by default.',
    body: (
      <>
        <p>
          A URL app and the Browser panel open a web page. On the desktop that is a window of your own machine.
          On <a href="https://app.glyphh.ai">app.glyphh.ai</a> there is no such window, so those panels can
          instead run on a cloud browser and stream the page to you.
        </p>
        <h2>Turning it on</h2>
        <p>
          <strong>Settings &rarr; General &rarr; Streamed web panels</strong>. It is off by default. Turning
          it on shows a warning first:
        </p>
        <Note kind="warn" title="Before it goes on">
          Streams a real browser from a worker to this page. Experimental: slower, costs more, and some sites
          block it. You can turn it off any time.
        </Note>
        <Shot file="settings-general.png" alt="Settings, General: the Default model row, the Streamed web panels switch, Default workspace and Interface sounds." width={900} caption="Settings → General. The switch is off until you turn it on." />
        <p>Off, a URL panel shows a card that says why, with a link to the setting. Turning it off is immediate.</p>
        <h2>Your logins stay yours</h2>
        <p>
          The cloud browser keeps a profile per member, encrypted. Sign in to a site once in a streamed panel and
          you are still signed in next time. Nobody else in the organization shares it.
        </p>
      </>
    ),
  },
  {
    slug: 'devices',
    title: 'Devices and remote control',
    lede: 'Your desktops, attached to Glyphh. Turn it on there; manage it here.',
    body: (
      <>
        <h2>On the desktop</h2>
        <p>
          <strong>Settings &rarr; Remote control</strong> on the desktop app. Turn on{' '}
          <strong>Allow remote control on this computer</strong> and grant folders. A remote session can only
          work inside those folders and the folders under them. Your approvals still apply. Nothing attaches
          until you turn it on, and an org admin can turn it off for everyone.
        </p>
        <p>The CLI does the same: <code>glyphh remote-control</code>.</p>
        <h2>On the web</h2>
        <p>
          <strong>Settings &rarr; Devices</strong> lists the computers attached to your account: the app and
          version, when it attached, and the folders it granted.
        </p>
        <Shot file="settings-devices.png" alt="Settings, Devices: one computer, Christopher's Mac Studio, Glyphh Desktop 1.4.17, attached 2h ago, granting /Users/you/projects, with a Disconnect button." width={900} caption="Settings → Devices. One attached desktop and its granted folder." />
        <Row k="Disconnect">Closes the connection now. The desktop stops reconnecting</Row>
        <Row k="Allow">Lets a disconnected desktop attach again, once remote control is turned on there</Row>
        <p>
          With a desktop attached, the folder chip offers its folders and a new session starts in one of them.
          See <a href={`${DOCS}/where-a-session-works`}>Where a session works</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'library-sync',
    title: 'Your library syncs',
    lede: 'Drips, schedules, skills, tasks, agents, workspaces and tabs are one library, on every surface.',
    body: (
      <>
        <p>
          These are records in your member library. The server holds them. The desktop keeps a copy and syncs
          it. The web reads and writes them through the server. Make one anywhere and it is on the other
          surface within a sync interval.
        </p>
        <Row k="Drips">Effect recipes: the visual effects the agent can play, and the presets you build</Row>
        <Row k="Schedules">Anything on a clock: a task or a skill, written in words or five-field cron</Row>
        <Row k="Skills">A folder with a SKILL.md. See <a href={`${DOCS}/skills`}>Skills</a></Row>
        <Row k="Tasks">A program with a task.json and a run.js. See <a href={`${DOCS}/tasks`}>Tasks</a></Row>
        <Row k="Agents">Sub-agents: a name, a brief, a model</Row>
        <Row k="Workspaces">A named arrangement of panels, with the loop and the model for each slot</Row>
        <Row k="Tabs">The apps you keep as tabs on the rail. Their local settings stay on the machine</Row>
        <h2>Where a schedule fires</h2>
        <p>
          A <strong>task</strong> schedule fires on the cloud clock, in UTC, and runs on your worker. A{' '}
          <strong>skill</strong> schedule fires on your desktop, where its agent lives. Write the time the way
          you mean it: a skill at <em>9am</em> is 9am on the desktop; a task at <em>9am</em> is 09:00 UTC.
        </p>
        <p>
          <strong>Run now</strong> and the run history still come from the desktop. On the web the Schedules
          page says so in one line.
        </p>
      </>
    ),
  },
  {
    slug: 'apps',
    title: 'Apps',
    lede: 'A bundle with an app.json. It opens as a panel beside the agent.',
    body: (
      <>
        <p>
          An app is a skill bundle with an <code>app.json</code>: a page the agent can open as a work panel
          and call as a tool. The app reads the type from the bundle, never from its name. See{' '}
          <a href={`${DOCS}/skills`}>Skills</a> for what a bundle is.
        </p>
        <h2>Today</h2>
        <p>
          Apps are installed on the desktop. They live under your Glyphh home on that machine, and the Apps
          page, the command palette and the agent&rsquo;s tool list all read the same rows. Open one and it is a
          panel in the workbench.
        </p>
        <Note kind="note" title="Coming: apps in your organization">
          Installing an app into your organization, so it opens from the desktop and from app.glyphh.ai alike,
          is in progress. This page changes when it ships.
        </Note>
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
          <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
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
        <p>
          A task schedule fires on the cloud clock, in UTC, and runs on your worker. A skill schedule fires on
          your desktop. Schedules are library records, the same on the desktop and the web: see{' '}
          <a href={`${DOCS}/library-sync`}>Your library syncs</a>.
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
          For a CLI outside the desktop, see <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
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
  { title: 'The app', pages: desktop },
  { title: 'Model Router', pages: router },
  { title: 'Organization', pages: org },
];
