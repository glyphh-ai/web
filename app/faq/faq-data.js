// The FAQ (his order, 2026-10-04), written from what the product does today.
// Two or three sentences each, plain words, nothing that is not built. The
// home page shows HOME_FAQ; /faq shows every group. Answers are strings or,
// when they carry a link, { html }.

const APP = 'https://app.glyphh.ai';

export const FAQ_GROUPS = [
  {
    title: 'The app',
    items: [
      {
        id: 'what-is-glyphh',
        q: 'What is Glyphh?',
        a: 'Glyphh is one app for every frontier model and every coding CLI, not tied to one vendor. It runs as a desktop on macOS, Windows and Linux, and as the same app in your browser at app.glyphh.ai, on one account.',
      },
      {
        id: 'desktop-or-browser',
        q: 'Desktop or app.glyphh.ai: which one do I use?',
        a: { html: `The desktop is where you build: your folders, your installed apps and skills, your CLIs. <a href="${APP}">app.glyphh.ai</a> is the same account in a browser, made to drive your desktop: your threads, files and apps, when it is on and remote control is switched on. With no desktop online it still runs a chat with your connections and memory.` },
      },
      {
        id: 'platforms',
        q: 'Which platforms does the desktop run on?',
        a: { html: 'macOS 12 and up on Apple Silicon and Intel, Windows 10 and up, and Linux x64 as an AppImage. Every build is in the <a href="/#download">Download section</a>; the app tells you when a new version is ready and installs it when you say so.' },
      },
      {
        id: 'work-vs-code',
        q: 'What is the difference between a Work session and a Code session?',
        a: 'A Work session chats and acts with your connections, memory and Glyphh’s own tools, with no file system or shell, and runs anywhere, in the browser too. A Code session has all of that plus files, a shell and the CLIs, confined to a folder on your desktop; from app.glyphh.ai it drives that folder over remote control. A session is born one kind and stays it.',
      },
    ],
  },
  {
    title: 'Sessions and files',
    items: [
      {
        id: 'local-or-cloud',
        q: 'Where do my files live: on my machine or in the cloud?',
        a: 'On your machine. A session works in a folder on your desktop and reads and writes only that folder; app.glyphh.ai reaches it over remote control. A chat started with no desktop online touches no files at all; its transcript is kept under your account so the desktop shows it later.',
      },
      {
        id: 'cloud-session',
        q: 'What runs a chat when my desktop is off?',
        a: 'A shared worker in Glyphh’s cloud runs the model turn with your connections and memory. It holds no files and installs nothing; the transcript lands under your account, and the moment your desktop is back the same chat is there.',
      },
      {
        id: 'remote-control',
        q: 'Can app.glyphh.ai or my phone work on my desktop?',
        a: 'Yes, when you turn remote control on for that machine, in the desktop’s Settings or with the glyphh CLI. Only the folders you grant are reachable, and switching it off ends it. It is off by default.',
      },
      {
        id: 'history',
        q: 'Do my chats follow me between the desktop and the browser?',
        a: 'Yes. Every session is indexed under your account, so the left rail shows the same list on the desktop and at app.glyphh.ai, each marked with where it runs. Chats you start in the glyphh CLI appear there too.',
      },
    ],
  },
  {
    title: 'CLIs and models',
    items: [
      {
        id: 'which-clis',
        q: 'Which CLIs ride along?',
        a: 'Claude Code, Codex, Gemini, Copilot, Cursor and the Glyphh CLI, each in its own agent window beside the Glyphh agent. On the desktop they are the CLIs installed on your machine; in a cloud session they run on the worker.',
      },
      {
        id: 'cli-gateway',
        q: 'Do the CLIs go through Glyphh’s gateway?',
        a: 'The Glyphh agent always does: every model call goes through your org’s Router on your own member key, so your org’s models, budgets and logs apply. Claude Code, Codex, Gemini and the Glyphh CLI can be pointed at the Router with a key from the console; Copilot and Cursor always use their own login.',
      },
      {
        id: 'which-models',
        q: 'Which models can I use?',
        a: 'Every model your organization allows, frontier and open weights, from one list in the composer. Glyphh never charges per model: no plan prices a model, and Ada is in every plan.',
      },
      {
        id: 'default-model',
        q: 'What is the Default model?',
        a: 'The model your team’s admin set as the team default on the console. Leave the picker on Default and your sessions follow that choice; the admin changes it once and everyone on the team moves with it.',
      },
      {
        id: 'free-plan',
        q: 'Is there a free plan?',
        a: { html: 'Yes. Free is $0, for good: unlimited local and self-hosted runtimes, unlimited precedents on your own machines, Ada included, and unlimited members and installs. The paid plans add managed precedents, hosted machines and sync. See <a href="/pricing">pricing</a>.' },
      },
    ],
  },
  {
    title: 'Apps, connections and memory',
    items: [
      {
        id: 'apps',
        q: 'What happens to the apps I build?',
        a: 'You build and install apps on your desktop, and that is where they run, with their data on your machine. An organization can publish an app to its library with access by team, and members install it on their own desktops in one click. app.glyphh.ai opens your desktop’s apps on the desktop; it does not run them itself.',
      },
      {
        id: 'connections',
        q: 'What are connections?',
        a: '3,500 services as tools: Gmail, Slack, Drive, Notion, Salesforce, GitHub and the rest, powered by Pipedream Connect. Sign in to a service once and any session, task or app can use it. An admin can share one account with the whole org, or each person connects their own.',
      },
      {
        id: 'tool-approval',
        q: 'Who approves what a connection does?',
        a: 'Every tool on every connection has a mode: Ask, Always allow, or Never. A session obeys it with you in the room and a scheduled task obeys it unattended. One rule, both places.',
      },
      {
        id: 'memory',
        q: 'Does Glyphh remember?',
        a: 'Yes. The agent keeps the facts it learns about you and your work, and you can browse and curate them on the Memory page. Memory runs through the Router.',
      },
    ],
  },
  {
    title: 'Your organization',
    items: [
      {
        id: 'console',
        q: 'What is the platform console?',
        a: 'platform.glyphh.ai is your organization’s console: members and teams, the models each team may use, budgets, keys, usage and logs. You reach it from inside the app, under Settings → Platform.',
      },
      {
        id: 'teams',
        q: 'Does it work for teams?',
        a: 'Yes. One org, one bill, one set of rules: share connections, skills and apps across the org, set models and budgets per team, and see usage per member and per model. Enterprise adds SSO.',
      },
      {
        id: 'pricing',
        q: 'What does it cost?',
        a: { html: 'Free is $0. Pro is $99 a month and Team $299 a month, flat; Enterprise is from $10k a year, by contract. Never per seat, per model or per install: members and installs are unlimited on every plan. Hosted machines are billed per second on top, at the rates on the <a href="/pricing">pricing page</a>.' },
      },
    ],
  },
  {
    title: 'Data and security',
    items: [
      {
        id: 'data',
        q: 'Where is my data, and who can see it?',
        a: 'What Glyphh keeps in the cloud, your chats and your library, is stored under your org’s own prefix, encrypted at rest, and a Router request for another org is refused. On the desktop, a session never leaves its folder, and apps and their data stay on your machine.',
      },
      {
        id: 'credentials',
        q: 'What stays on my machine?',
        a: 'Your Router credential, readable only by you and removed at logout, and the secrets of any custom MCP server you add. Connections are authorized through Glyphh’s server, so no service keys land on your machine.',
      },
      {
        id: 'sign-in',
        q: 'How do I sign in?',
        a: { html: 'A magic link to your email, a Google account, or your organization’s SSO; the desktop signs in with a device flow you approve in the browser. Logging out signs out that device and no other. Found a problem? Write to <a href="mailto:security@glyphh.ai">security@glyphh.ai</a>.' },
      },
    ],
  },
];

export const FAQ_ALL = FAQ_GROUPS.flatMap((g) => g.items);

// The short list on the home page, in this order.
const HOME_IDS = ['desktop-or-browser', 'local-or-cloud', 'which-clis', 'default-model', 'free-plan', 'apps', 'data'];
export const HOME_FAQ = HOME_IDS.map((id) => FAQ_ALL.find((i) => i.id === id)).filter(Boolean);
