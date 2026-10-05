import { Note, Row, Code, Shot } from './ui';
import { DOCS } from './base';

// The docs, kept short. Each page is written from the source; when the product
// changes, the page changes in the same push. The desktop is where you build
// and install; app.glyphh.ai is how you reach it (his direction, 2026-10-05).

const desktop = [
  {
    slug: 'install',
    title: 'Sign in and install',
    lede: 'One account. The desktop is where you build; app.glyphh.ai drives it.',
    body: (
      <>
        <h2>Install the desktop</h2>
        <p>
          The desktop is where you build: your folders, your installed apps and skills, your CLIs. Get it from
          the <a href="https://glyphh.ai/#download">Download section</a> of glyphh.ai, or from the card on the
          sign-in page. macOS 12 and up on Apple Silicon and Intel, Windows 10 and up, and Linux x64 as an
          AppImage.
        </p>
        <p>
          The desktop signs in with a device flow. It opens your browser on the sign-in page, you approve the
          device, and the app picks up the session. Sign in once and stay signed in. Log out from the account
          menu and this device is signed out, no other.
        </p>
        <h2>Sign in on the web</h2>
        <p>
          Open <a href="https://app.glyphh.ai">app.glyphh.ai</a>. Sign in with your email and the magic link it
          sends, or with Google. It is the same account as the desktop, made to drive it: your sessions, files
          and apps when the desktop is on and remote control is switched on, and a chat when it is not. See{' '}
          <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.
        </p>
        <Shot file="sign-in.png" alt="The sign-in page at app.glyphh.ai: Continue with Google, or an email address for a magic link." width={760} caption="app.glyphh.ai. A magic link to your email, or Google." />
        <p>
          The first person from a new email domain gets a new organization. Everyone invited after that joins
          it. An organization that requires SSO refuses magic links for its domain.
        </p>
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
        <p>Next: <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.</p>
      </>
    ),
  },
  {
    slug: 'web-app',
    title: 'app.glyphh.ai',
    lede: 'The same account in a browser, built to reach your desktop. Without one, a chat.',
    body: (
      <>
        <p>
          app.glyphh.ai is the Glyphh agent beside the rail: your sessions, a search, a filter, the composer.
          Nothing for building is there. You build and install on the desktop; the web is how you reach it.
        </p>
        <Shot file="web-agent.png" alt="app.glyphh.ai: the left rail with the Work and Code switch, New, Artifacts and Recents grouped by folder, and the Glyphh agent filling the page with its composer at the bottom." width={1000} caption="app.glyphh.ai. The rail, the agent, the composer." />
        <h2>With your desktop online</h2>
        <p>
          Turn remote control on in the desktop under <strong>Settings &rarr; Remote control</strong> and grant
          folders. Then, on the web, a new Code session starts in one of those folders. The Files, Editor and
          Diff panels and the Agents panel read that desktop over remote control, fenced to the granted folders.
          Its installed apps open on the desktop. See{' '}
          <a href={`${DOCS}/devices`}>Devices and remote control</a>.
        </p>
        <h2>The &#8942; menu</h2>
        <p>
          The agent has one menu, top right. A section is there only when it has something to show, so the menu
          is never empty.
        </p>
        <Row k="Apps">The apps installed on your attached desktop. A click opens the app on the desktop, and the web says <em>Opened on &lt;machine&gt;</em>. With no desktop the section is disabled: <em>Connect your desktop to open apps</em>, with a link to Settings &rarr; Devices</Row>
        <Row k="Agents / CLIs">Claude Code, Codex, Gemini, Copilot, Cursor and the Glyphh CLI, each in a terminal. With a desktop attached, its live sessions in each CLI are listed underneath; a click resumes that session on the desktop</Row>
        <Row k="Panels">The panels for this session&rsquo;s kind. Code: Files, Terminal, Editor, Diff, Plan, Agents. Work: Agents</Row>
        <Row k="Session">Rename, Pin, New agent panel, Delete. Only for an open session</Row>
        <Shot file="agent-menu.png" alt="The agent's menu open on the web: Apps with No apps installed on this desktop, Agents / CLIs listing Claude, Codex, Gemini, Copilot, Cursor and Glyphh CLI, and Panels listing Files, Terminal, Editor, Diff, Plan and Agents." width={281} caption="The one menu. Apps, Agents / CLIs, Panels." />
        <h2>With no desktop online</h2>
        <p>
          A chat still runs. A shared worker in Glyphh&rsquo;s cloud runs the model turn with your connections
          and memory. It holds no files and installs nothing. The transcript lands under your account, and the
          moment your desktop is back the same chat is there. See{' '}
          <a href={`${DOCS}/where-a-session-works`}>Where a session works</a>.
        </p>
        <h2>Settings on the web</h2>
        <p>
          General, Appearance, Memory, Privacy, Devices, Artifacts, Usage, MCP Server, Connections, Billing and
          Support. The Build and Customize pages are the desktop&rsquo;s: skills, agents, apps, tasks, tabs,
          workspaces, drips and schedules are made there.
        </p>
        <Shot file="settings-general.png" alt="Settings on the web, General: the Default model row, Default workspace and Interface sounds. The rail lists General, Appearance, Memory, Privacy, Devices, Artifacts, Usage, MCP Server, Connections, Billing and Support." width={900} caption="Settings → General on the web. No Build, no Customize." />
        <Note kind="note" title="The desktop is the only door">
          An app or a skill loads only through the desktop. The web runs a chat with your connections and
          memory, and reaches your desktop&rsquo;s apps; it installs nothing.
        </Note>
      </>
    ),
  },
  {
    slug: 'where-a-session-works',
    title: 'Where a session works',
    lede: 'A session works in a folder on your desktop. app.glyphh.ai reaches it over remote control.',
    body: (
      <>
        <p>
          A session works in one folder. The folder chip on the composer names it. Click the chip and the
          menu <strong>Where this session works</strong> opens.
        </p>
        <Shot file="session-place.png" alt="The folder chip's menu on the web, titled Where this session works: a search box, then a section for the attached desktop, Christopher's Mac Studio, with the folders web and sdk and a Browse row under /Users/you/projects." width={340} caption="The folder chip on the web. The attached desktop and the folders it granted." />
        <h2>The places</h2>
        <Row k="On this desktop">A folder on the machine you are sitting at. The desktop app</Row>
        <Row k="On <your machine>">The same folders from app.glyphh.ai, over remote control. The desktop lists the folders it granted, and <strong>Browse</strong> goes under one of them</Row>
        <p>
          Only folders inside a grant are offered. The desktop grants them under{' '}
          <strong>Settings &rarr; Remote control</strong>. See{' '}
          <a href={`${DOCS}/devices`}>Devices and remote control</a>.
        </p>
        <h2>The lock and the grant card</h2>
        <p>
          A desktop session whose folder is not granted shows a lock in the rail. Opening it shows a grant
          card instead of running: add the folder on the desktop and open the session again.
        </p>
        <Shot file="grant-card.png" alt="The grant card: Grant this folder in Remote control on your desktop. This session works in /Users/you/other/notes, which the desktop has not granted for remote control. Open Settings → Remote control on your desktop and add the folder, then open the session again." width={420} caption="The grant card. Nothing runs until the folder is granted." />
        <h2>The default</h2>
        <p>
          With a desktop attached, a new session on the web starts in a folder on it: your last pick when it is
          still granted, else your most recent folder, else the first granted one. With nothing granted there
          is no folder a Code turn could use: grant one first.
        </p>
        <h2>No desktop online</h2>
        <p>
          A chat still runs. A Work session needs no folder: a shared worker runs the turn with your
          connections and memory and touches no files. Its transcript is kept under your account, so the
          desktop shows it later. A Code session works on a desktop; start one when yours is back.
        </p>
        <h2>A place is fixed at birth</h2>
        <p>
          A session&rsquo;s place is set by its first turn and never changes. A desktop session stays on that
          desktop. A chat started with no desktop stays a chat; open it on the desktop and it is the same
          transcript, still without a folder.
        </p>
        <h2>In the rail</h2>
        <p>
          Recents groups desktop sessions by folder. Chats that ran with no desktop sit under one{' '}
          <strong>Cloud</strong> heading. The glyph at the start of a row says where it ran: a monitor for a
          desktop, a cloud for the worker. A lock marks a folder the desktop has not granted.
        </p>
        <Shot file="rail-recents.png" alt="The Recents list on the web: folder headings web, sdk and notes, each with a desktop session; the notes session is dimmed with a lock." width={279} caption="Recents on the web: one group per desktop folder. A lock on a folder that is not granted." />
        <p>
          The funnel beside the search box filters by loop and by place: <strong>All places</strong>,{' '}
          <strong>This desktop</strong>, or <strong>Cloud</strong>. The same filter runs in the agent
          panel&rsquo;s recents menu.
        </p>
        <Shot file="recents-filter.png" alt="The recents filter menu: All loops with Glyphh, Glyphh CLI, Claude, Codex, Gemini, Copilot and Cursor beneath it, then All places, This desktop and Cloud." width={465} caption="The recents filter: a loop, and a place." />
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
        <Row k="Work">The model, your connections, your memory and Glyphh&rsquo;s own tools. No files, no shell. Runs anywhere, in the browser too</Row>
        <Row k="Code">Everything in Work, plus a folder on your desktop: files, terminals and the CLIs, confined to the folder the session works in</Row>
        <p>A session is born one kind and stays it: its transcript was written with that toolbelt.</p>
        <Shot file="composer.png" alt="The composer: the folder chip reading web, No git, the prompt field Describe what to build or fix, Ask mode, the model chip and the effort chip." width={890} caption="The Code composer. The folder, the prompt, the model, the effort." />
        <h2>The folder is the sandbox</h2>
        <p>
          A Code session works in one folder and nowhere else. File tools refuse any path outside it, reads
          included. On macOS the shell runs under the system sandbox with writes allowed only inside that folder,
          temp space and package caches. From app.glyphh.ai the folder is on your desktop, reached over remote
          control, and only a granted folder can be picked.
        </p>
        <h2>Sub-agents</h2>
        <p>
          The agent can hand work to sub-agents you define on the desktop under{' '}
          <strong>Settings &rarr; Build &rarr; Agents</strong>: a name, a brief and a model of their own. They
          run the same loop in parallel and report back. The Agents panel shows each one working, on the
          desktop and on the web.
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
    slug: 'terminals',
    title: 'Terminals and the CLIs',
    lede: 'A shell on your desktop, in the session’s folder. The CLIs beside the agent.',
    body: (
      <>
        <h2>The terminal</h2>
        <p>
          The Terminal panel of a Code session is a shell on the desktop the session works on, in its folder.
          On the desktop that is the machine you are sitting at. From app.glyphh.ai it is your desktop&rsquo;s
          shell, reached over remote control. Tabs, resize and close work the same in both. A Work session has
          no terminal.
        </p>
        <h2>The CLIs</h2>
        <Row k="Claude Code">claude</Row>
        <Row k="Codex">codex</Row>
        <Row k="Gemini">gemini</Row>
        <Row k="Copilot">copilot</Row>
        <Row k="Cursor">cursor-agent</Row>
        <Row k="Glyphh CLI">glyphh</Row>
        <p>
          On the desktop they are the CLIs installed on your machine, each in its own agent window beside the
          Glyphh agent. On the web they are the <strong>Agents / CLIs</strong> section of the agent&rsquo;s
          &#8942; menu: with your desktop attached, its live sessions list under each CLI and a click resumes
          that session on the desktop. In a chat with no desktop they run on the worker.
        </p>
        <p>
          Claude Code, Codex, Gemini and the Glyphh CLI can be pointed at your organization&rsquo;s Router with
          a key from the console on a paid plan, so their turns are paid from the same budget and show in the
          same logs. Copilot and Cursor always use their own login. See{' '}
          <a href={`${DOCS}/own-cli`}>Use your own CLI</a>.
        </p>
        <Note kind="note" title="The honest card">
          When there is nothing to run on, signed out, no desktop, the tile says so in one line and offers a
          retry. It never pretends.
        </Note>
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
          until you turn it on, it is off by default, and an org admin can turn it off for everyone.
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
          With a desktop attached, the folder chip offers its folders, a new session starts in one of them, and
          its installed apps open from the agent&rsquo;s &#8942; menu. See{' '}
          <a href={`${DOCS}/where-a-session-works`}>Where a session works</a> and{' '}
          <a href={`${DOCS}/web-app`}>app.glyphh.ai</a>.
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
          it. The web reads them through the server. Make one on the desktop and the web lists it within a sync
          interval.
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
          A <strong>task</strong> that touches only its own data and your connections fires on the cloud clock,
          in UTC, and runs with your laptop closed. A task that syncs into an app&rsquo;s data runs on your
          desktop, because the app and its data live there: while the desktop is off its runs wait, and it
          catches up when the desktop is back. A <strong>skill</strong> schedule fires on your desktop, where
          its agent lives. Write the time the way you mean it: a skill at <em>9am</em> is 9am on the desktop; a
          cloud task at <em>9am</em> is 09:00 UTC.
        </p>
        <p>
          <strong>Run now</strong> and the run history come from the desktop. On the web the Schedules page is
          not shown; schedules are made and watched on the desktop.
        </p>
      </>
    ),
  },
  {
    slug: 'apps',
    title: 'Apps',
    lede: 'Build and install on your desktop. Publish to your organization. Open from the web.',
    body: (
      <>
        <p>
          An app is a skill bundle with an <code>app.json</code>: a page the agent can open as a work panel
          and call as a tool. The app reads the type from the bundle, never from its name. See{' '}
          <a href={`${DOCS}/skills`}>Skills</a> for what a bundle is.
        </p>
        <h2>Build it</h2>
        <p>
          <strong>New</strong> on <strong>Settings &rarr; Build &rarr; Apps</strong> opens a session rooted at
          your apps folder with a starter prompt already typed and not yet sent. Edit it, send it, and the
          agent scaffolds the bundle.
        </p>
        <h2>Install it</h2>
        <p>Three doors, one result, all on the desktop:</p>
        <Row k="Settings → Build → Apps">Import a bundle</Row>
        <Row k="Drop a .glyphh file">Onto the app</Row>
        <Row k="Ask the agent">It calls <code>app_install</code></Row>
        <p>
          The app installs on your desktop, and that is where it runs, with its data on your machine.
        </p>
        <h2>Your organization&rsquo;s library</h2>
        <p>
          An organization can publish an app to its library with access by team, and members install it on
          their own desktops in one click. Each install is that member&rsquo;s own copy, on their machine.
        </p>
        <h2>Open it</h2>
        <p>
          On the desktop an app opens as a work panel, and the agent&rsquo;s app tools,{' '}
          <code>app_list_tools</code> and <code>app_call_tool</code>, reach it. On{' '}
          <a href="https://app.glyphh.ai">app.glyphh.ai</a> the agent&rsquo;s &#8942; menu lists the apps
          installed on your attached desktop; a click opens the app on the desktop, and the web says{' '}
          <em>Opened on &lt;machine&gt;</em>. The web does not run apps itself. With no desktop the section is
          disabled: <em>Connect your desktop to open apps</em>.
        </p>
        <Note kind="note" title="The desktop is the only door">
          An app loads only through the desktop. The web reaches your desktop&rsquo;s apps; it installs nothing.
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
        <Row k="/remote-control">Turn remote control on for this machine, the same switch as the desktop&rsquo;s</Row>
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
          A chat you start in the terminal shows in the desktop&rsquo;s left rail and at app.glyphh.ai; switch to
          the Glyphh view on the desktop and the conversation is there, and the desktop can hand the same chat
          back to a terminal.
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
          Your skills live under your Glyphh home on the desktop and are linked into each CLI&rsquo;s own skills
          directory:
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
        <Note kind="note" title="Skills load through the desktop">
          A skill is made, installed and enabled on the desktop. A chat on app.glyphh.ai with no desktop runs with
          your connections and memory; it loads no skills.
        </Note>
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
    lede: 'A program on a clock, with a checkpoint journal.',
    body: (
      <>
        <p>
          A task is a skill folder with a <code>task.json</code> and a <code>run.js</code>. It runs in a
          separate process, on a schedule or on demand, and journals every step so a run can pick up where it
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
          Settings &rarr; Customize &rarr; Schedules on the desktop is one table for everything on a clock. A row
          is a task or a skill. Write the schedule as five-field cron or in plain words, for example{' '}
          <em>weekdays at 9am</em>. A skill on a schedule needs an agent to run it in. Every row shows when it
          fires next and how the last run went, with the full run history behind it.
        </p>
        <h2>Where it runs</h2>
        <p>
          A task that touches only its own data and your connections fires on the cloud clock, in UTC, and runs
          with your laptop closed. A task that syncs into an app&rsquo;s data runs on your desktop, where the
          app and its data live: while the desktop is off its runs wait, and it catches up when the desktop is
          back. A skill schedule fires on your desktop. Schedules are library records: see{' '}
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
          server so no project keys ever reach your machine. A connection works in every session, on the desktop
          and in a chat on app.glyphh.ai with no desktop.
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
