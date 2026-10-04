import { Doors } from './ui';
import { PRODUCT_GROUPS } from './pages';
import { DOCS } from './base';

const glyphh = [
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
          <li><a href={`${DOCS}/install`}>Glyphh Desktop</a>: install it and sign in.</li>
          <li><a href={`${DOCS}/loops`}>Loops</a>: the agent, and the loops the desktop runs beside its own.</li>
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
