import { Doors, Shot, Row } from './ui';
import { PRODUCT_GROUPS } from './pages';
import { DOCS } from './base';

const glyphh = [
  {
    slug: 'quick-start',
    title: 'Quick start',
    lede: 'Sign in, pick a place, pick a model, say what to build. Four steps.',
    body: (
      <>
        <h2>1. Sign in</h2>
        <p>
          Open <a href="https://app.glyphh.ai">app.glyphh.ai</a>. Sign in with your email and the magic link
          it sends, or with Google. Or install the desktop and sign in there with the same account.
        </p>
        <Shot file="sign-in.png" alt="The sign-in page at app.glyphh.ai: Continue with Google, or an email address for a magic link." width={760} caption="app.glyphh.ai. The same account as the desktop." />
        <p>More: <a href={`${DOCS}/install`}>Sign in and install</a>.</p>
        <h2>2. Pick where the session works</h2>
        <p>
          Click the folder chip on the composer. Pick a folder on your desktop, or a cloud folder.{' '}
          <strong>New cloud folder</strong> makes a fresh one. The place is set by the first turn and stays.
        </p>
        <Shot file="session-place.png" alt="The folder chip's menu, titled Where this session works: a section for the attached desktop with its granted folders, and a section for the cloud with cloud folders and New cloud folder." width={340} caption="Where this session works: your desktop, or the cloud." />
        <p>More: <a href={`${DOCS}/where-a-session-works`}>Where a session works</a>.</p>
        <h2>3. Pick a model</h2>
        <p>
          The model chip reads <strong>Default</strong> and the model&rsquo;s name. Default is your
          team&rsquo;s model. Click the chip to pick another from what your team allows. The chip beside it is
          the effort dial.
        </p>
        <Shot file="model-picker.png" alt="The model menu over the composer: a search box, Default with a check, then claude-sonnet-4-5, gemini-2.5-pro and gpt-5 with their providers." width={410} caption="The model chip. Default is your team's model." />
        <p>More: <a href={`${DOCS}/pick-a-model`}>Pick a model</a>.</p>
        <h2>4. Say what to build</h2>
        <p>Type it and press Enter. The agent works in the folder you picked, on the model you picked.</p>
        <Shot file="composer.png" alt="The composer: the folder chip reading web, No git, the prompt field Describe what to build or fix, Ask mode, the model chip and the effort chip." width={890} caption="The composer. Folder, prompt, model, effort." />
        <h2>Work or Code</h2>
        <Row k="Work">The model, your tools and your memory. No files</Row>
        <Row k="Code">A folder: files, terminals and the CLIs</Row>
        <p>
          The switch at the top of the rail picks the kind. A session is born one kind and stays it. More:{' '}
          <a href={`${DOCS}/work-and-code`}>Work and Code</a>.
        </p>
      </>
    ),
  },
  {
    slug: 'introduction',
    title: 'Introduction',
    lede: 'Glyphh Desktop is the vendor-neutral desktop for frontier AI. The Model Router puts every model behind one endpoint. One account, one budget, one set of rules.',
    body: (
      <>
        <h2>Glyphh Desktop</h2>
        <p>
          Glyphh Desktop runs on Mac, Windows and Linux, with a CLI that shares its history. It is the open
          desktop client for Claude, ChatGPT, Gemini and open-weight models: chat, work and code on your
          machine, beside the apps you already use. The agent, skills, tasks and your connections are in the
          room, and the loop you run reaches all of them.
        </p>
        <p>
          The same app runs on the web at <a href="https://app.glyphh.ai">app.glyphh.ai</a>. A session works
          in a folder on your desktop or in a folder in the cloud, and your library is the same on both. Start
          with the <a href={`${DOCS}/quick-start`}>quick start</a>.
        </p>
        <p>
          A workspace names a loop, the model for each of its slots, the panels around it and the tools those
          panels expose. Open the name and all of it is there. Switch in a keystroke.
        </p>
        <h2>The Model Router</h2>
        <p>
          Point any client at one base URL: Claude Code, Codex, Cursor, your own agents, or the desktop. The
          Router carries every model your organization approved, with roles that decide who gets what and one
          budget that every token is paid from, at a published rate per model per plan.
        </p>
        <ul>
          <li><strong>Any client.</strong> The desktop is one client, not a requirement.</li>
          <li><strong>Frontier where it counts.</strong> Spend frontier models on the hard turns and open weights on the rest.</li>
          <li><strong>Governed by you.</strong> Approve models, set budgets, and gate tools by team. Every token is accounted for.</li>
        </ul>
        <h2>The products</h2>
        <Doors />
        <h2>Next steps</h2>
        <ol>
          <li><a href={`${DOCS}/quick-start`}>Quick start</a>: sign in, pick a place, pick a model, build.</li>
          <li><a href={`${DOCS}/install`}>Sign in and install</a>: the web app, the desktop, the console.</li>
          <li><a href={`${DOCS}/work-and-code`}>Work and Code</a>: the agent and its two kinds of session.</li>
          <li><a href={`${DOCS}/gateway`}>Model Router</a>: one endpoint, every model, your budgets.</li>
          <li><a href={`${DOCS}/own-cli`}>Your own CLI</a>: point Claude Code or Codex at the Router.</li>
          <li><a href={`${DOCS}/connections`}>Connections</a>: your apps as tools, over MCP.</li>
        </ol>
        <p>
          The code is at <a href="https://github.com/glyphh-ai">github.com/glyphh-ai</a>.
        </p>
      </>
    ),
  },
];

export const GROUPS = [{ title: 'Glyphh', pages: glyphh }, ...PRODUCT_GROUPS];
export const PAGES = GROUPS.flatMap((g) => g.pages);
export const hrefOf = (p) => (p.slug === 'introduction' ? DOCS : `${DOCS}/${p.slug}`);
